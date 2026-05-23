# Guia para Agentes de IA

Este projeto utiliza uma arquitetura híbrida de Extensão Chrome + Bun. Siga estas diretrizes para evitar perda de contexto e erros de sincronização:

## 1. Verificação de Estado antes de Editar
**Sempre** utilize o comando `read_file` no arquivo alvo antes de qualquer edição (`edit_file`). Não confie no histórico da conversa para o conteúdo exato do arquivo, pois versões podem ter sido sobrescritas ou revertidas.

## 2. Fluxo de Importação/Exportação
- Lógica de RPG vai no `src/core.js` usando `export`.
- Interação com Navegador/DOM vai no `src/content.js` usando `import`.
- **Nunca** use `import` em arquivos que não serão processados pelo Bun (build), pois o Chrome lançará erros de módulo em Content Scripts simples.

## 3. Processo de Edição Granular
Para evitar falhas de "text match" em arquivos grandes:
- Faça edições pequenas e incrementais.
- Verifique se a indentação e os caracteres especiais (emojis de naipes) no seu `old_text` correspondem exatamente ao que foi lido no passo 1.

## 4. Manutenção dos Testes
Qualquer alteração em `core.js` **exige** a execução e atualização dos testes em `test/core.test.js` usando `bun test`.
- Use `spyOn(Math, "random")` do Bun para simular rolagens de dados previsíveis.
- Lembre-se que o resultado de `rollSingleDie(6)` é `Math.floor(random * 6) + 1`. Calcule seus mocks estáticos baseados nisso.

## 5. Ciclo de Build
Sempre que editar o código fonte em `src/`, informe ao usuário que ele deve rodar `bun run build` para atualizar a pasta `dist/` antes de testar no navegador.
