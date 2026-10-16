# SPEC-003: Persistência do Estado do Baralho via chrome.storage

## Objective
Implementar a persistência do baralho e das cartas já tiradas entre sessões utilizando a API `chrome.storage.local`. A funcionalidade garante que o mestre e os jogadores não percam o progresso das cartas sacadas ao recarregar a página ou reabrir a extensão.

## Target Files
- `src/core.js`: Implementação das funções `saveDeckState` e `loadDeckState`.
- `manifest.json`: Adição da permissão `"storage"`.
- `test/core.test.js`: Testes unitários Bun com 100% de cobertura.
- `tests/acceptance/test_spec_003.py`: Testes de aceitação determinísticos SDD.

## Contracts

### Card Object
```typescript
interface Card {
  name: string;
  weight: number;
  charName?: string;
}
```

### DeckState
```typescript
interface DeckState {
  deck: Card[];
  drawnCards: Card[];
}
```

### saveDeckState
```typescript
function saveDeckState(
  deck: Card[],
  drawnCards?: Card[],
  callback?: () => void
): void;
```
- Salva o estado atual `{ deck, drawnCards }` em `chrome.storage.local`.
- Se `chrome.storage.local` não estiver disponível, executa o callback em modo gracioso sem lançar exceções.

### loadDeckState
```typescript
function loadDeckState(
  callback?: (state: DeckState) => void
): void;
```
- Recupera `{ deck, drawnCards }` de `chrome.storage.local`.
- Fallback para baralho novo (54 cartas: 52 padrão + 2 Jokers embaralhados e `drawnCards: []`) caso:
  - Não exista estado gravado no storage;
  - `chrome` ou `chrome.storage.local` não estejam definidos;
  - Ocorra erro na recuperação (`chrome.runtime.lastError`);
  - O estado recuperado seja inválido.
- Invoca o `callback` passando o estado carregado ou fallback.

## Acceptance Criteria

### Scenario 1: Salvar estado do baralho no storage
- **Given** um baralho com cartas restantes e uma lista de cartas tiradas
- **When** a função `saveDeckState(deck, drawnCards)` for executada
- **Then** os dados de `deck` e `drawnCards` devem ser salvos em `chrome.storage.local`
- **And** o callback opcional deve ser executado.

### Scenario 2: Carregar estado existente do storage
- **Given** um estado persistido previamente no `chrome.storage.local` com baralho e cartas tiradas
- **When** a função `loadDeckState(callback)` for executada
- **Then** o baralho e as cartas tiradas devem ser restaurados
- **And** o callback deve receber `{ deck, drawnCards }`.

### Scenario 3: Fallback para baralho novo quando storage vazio ou inexistente
- **Given** que o `chrome.storage.local` não possui dados salvos ou a API não está disponível
- **When** a função `loadDeckState(callback)` for executada
- **Then** um baralho novo de 54 cartas (incluindo 2 Jokers) deve ser gerado
- **And** a lista de cartas tiradas deve ser inicializada vazia `[]`
- **And** o callback deve receber o novo baralho e a lista vazia.
