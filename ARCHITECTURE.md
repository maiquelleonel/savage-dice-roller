# Arquitetura do Projeto - Savage Worlds Dice Roller

## Visão Geral
Esta é uma extensão do Chrome projetada para integrar funcionalidades de RPG (Savage Worlds) diretamente no navegador, com foco inicial no Google Meet.

## Estrutura de Diretórios
- `src/core.js`: Lógica pura de negócio (regras de Savage Worlds, dados, baralho). **Sem dependências de DOM.**
- `src/content.js`: Camada de UI e Integração. Manipula o DOM da página e se comunica com o `core.js`.
- `src/background.js`: Gerencia eventos da extensão (clique no ícone) e injeção dinâmica de scripts.
- `dist/`: Código transpilado e bundleado pelo Bun para consumo do navegador.
- `test/`: Testes unitários utilizando o runner nativo do Bun (`bun:test`).

## ADR (Architectural Decision Records)

### ADR 1: Separação de Lógica e UI
- **Contexto:** Extensões do Chrome têm ambientes de execução restritos (Content Scripts).
- **Decisão:** Manter a lógica de RPG em um arquivo separado (`core.js`) que usa módulos ES (`export`).
- **Consequência:** Facilita testes unitários no terminal e mantém a UI desacoplada das regras.

### ADR 2: Uso do Bun como Bundler e Test Runner
- **Contexto:** O navegador não suporta `import` direto em Content Scripts sem configuração complexa. O Jest tem dificuldades com cobertura em módulos ES nativos sem Babel.
- **Decisão:** Usar o Bun para fazer o `build` (agrupar dependências em um único arquivo) e usar `bun test` para execução rápida de testes.
- **Consequência:** Build extremamente rápido e ambiente de teste simplificado.

### ADR 3: Injeção Dinâmica via `background.js`
- **Contexto:** Queremos que a extensão funcione em qualquer página e possa ser ligada/desligada.
- **Decisão:** Remover o carregamento automático do `manifest.json` e usar `chrome.action.onClicked` para injetar o script apenas quando solicitado.
- **Consequência:** Melhor performance do navegador e controle total sobre a visibilidade da UI.
