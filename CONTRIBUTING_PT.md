# Contributing to Savage Worlds Dice Roller

Primeiramente, obrigado por se interessar em contribuir! Este projeto visa ser uma ferramenta essencial para mestres e jogadores de Savage Worlds.

## 🛠️ Desenvolvimento Local

1.  Faça um **Fork** do repositório.
2.  Instale o [Bun](https://bun.sh).
3.  Instale as dependências:
    ```bash
    bun install
    ```
4.  Crie uma branch para sua modificação: `git checkout -b feat/minha-nova-feature`.

## 📐 Arquitetura e Regras de Ouro

Para manter o projeto organizado, seguimos estas diretrizes:

-   **Lógica de RPG:** Deve morar em `src/core.js` e ser testada em `test/core.test.js`.
-   **UI e DOM:** Deve morar em `src/content.js`.
-   **Agnosticismo:** Tente manter seletores DOM genéricos (como `textarea:last-child`) para manter a compatibilidade universal com outros chats.
-   **IA Friendly:** Se estiver usando agentes de IA para codar, peça para eles lerem o arquivo `AGENTS.md`.

## 🧪 Testes e Build

Temos um **Quality Gate** (Git Hook). O commit será bloqueado se os testes falharem.
-   Rode os testes manualmente: `bun test`
-   Sempre gere o build antes de testar no navegador: `bun run build`

## 📬 Enviando seu PR

1.  Faça o push para sua branch: `git push origin feat/minha-nova-feature`.
2.  Abra um **Pull Request** detalhando suas mudanças.
3.  Aguarde a revisão (prometemos ser rápidos! 🎲).

---
**Siga as regras e tenha um bom jogo!** \o/ :hangloose:
