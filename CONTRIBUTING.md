# Contributing to Savage Worlds Dice Roller

*Leia este documento em [Português](./CONTRIBUTING_PT.md).*

First of all, thank you for your interest in contributing! This project aims to be an essential tool for Savage Worlds game masters and players.

## 🛠️ Local Development

1.  **Fork** the repository.
2.  Install [Bun](https://bun.sh).
3.  Install dependencies:
    ```bash
    bun install
    ```
4.  Create a branch for your modification: `git checkout -b feat/my-new-feature`.

## 📐 Architecture and Golden Rules

To keep the project organized, we follow these guidelines:

-   **RPG Logic:** Must live in `src/core.js` and be tested in `test/core.test.js`.
-   **UI and DOM:** Must live in `src/content.js`.
-   **Agnosticism:** Try to keep DOM selectors generic (like `textarea:last-child`) to maintain universal compatibility with other chats.
-   **AI Friendly:** If using AI agents to code, ask them to read the `AGENTS.md` file.

## 🧪 Tests and Build

We have a **Quality Gate** (Git Hook). Commits will be blocked if tests fail.
-   Run tests manually: `bun test`
-   Always generate the build before testing in the browser: `bun run build`

## 📬 Submitting your PR

1.  Push to your branch: `git push origin feat/my-new-feature`.
2.  Open a **Pull Request** detailing your changes.
3.  Wait for review (we promise to be fast! 🎲).

---
**Follow the rules and have a great game!** \o/ :hangloose:
