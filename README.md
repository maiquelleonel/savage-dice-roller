# Savage Worlds Dice Roller - Chrome Extension

*Leia este documento em [Português](./README_PT.md).*

[![codecov](https://codecov.io/gh/maiquelleonel/savage-dice-roller/graph/badge.svg?token=O44YV78F5O)](https://codecov.io/gh/maiquelleonel/savage-dice-roller)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://www.buymeacoffee.com/maiquelleonel)
![License](https://img.shields.io/badge/license-MIT-green)
![Build](https://img.shields.io/badge/built%20with-Bun-f9f2f4)

A lightweight and powerful extension for **Savage Worlds RPG** players and game masters. Originally designed for Google Meet, but built with an agnostic architecture that makes it compatible with almost any web chat.

## 🚀 Features

- **Real Savage Worlds Mechanics:** Support for exploding dice (Aces) and optional Wild Die (d6).
- **Automatic Initiative:** Card drawing with official sorting (Rank + Suit: ♠️ > ♥️ > ♦️ > ♣️).
- **Universal Chat Integration:** Automatically detects chat fields (`textarea:last-child`) and sends results without the need to copy and paste.
- **Game Master Mode (Secret Roll):** Perform private rolls that appear only in your interface, without notifying the chat.
- **Initiative Report:** Generate a formatted turn order report for all players with one click.

## 🤝 Contributing

Contributions are super welcome! If you have an idea for improvement or found a bug, check out our [Contribution Guide](./CONTRIBUTING.md).

## 🛠️ Architecture and Technologies

This project was built following **Principal Engineering** principles, focusing on resilience and low coupling:

- **Bun:** Used as an ultra-fast Bundler and Test Runner.
- **Extension/ESM Hybrid:** Business logic isolated in `src/core.js` for full testability via ES modules.
- **Dynamic Injection:** Background script that injects resources on demand, optimizing browser performance.
- **Quality Gate:** Git Hook implementation to ensure no code breaks unit tests before a commit.

## 📦 How to Install (Development)

1. Make sure you have [Bun](https://bun.sh) installed.
2. Clone the repository.
3. Install dependencies:
   ```bash
   bun install
   ```
4. Generate the build:
   ```bash
   bun run build
   ```
5. In Chrome, go to `chrome://extensions/`.
6. Enable "Developer mode".
7. Click "Load unpacked" and select the root folder of this project.

## 🧪 Tests

The integrity of Savage Worlds rules is guaranteed by a robust test suite:

```bash
bun test
```

## 🗺️ Roadmap (Future)

- [ ] **GM Dashboard:** A dedicated area in a separate tab for scene management.
- [ ] **Extras Management:** Control NPCs and minions directly through the extension.
- [ ] **Character Sheet:** Interface for players to fill in attributes and derive rolls automatically.
- [ ] **State Synchronization:** Data persistence between sessions using `chrome.storage`.

## 🎨 Credits and License

- **Dice (SVGs):** Dice icons were created by **Skoll** and **Delapouite**, available at [Game-icons.net](https://game-icons.net/), under the **CC BY 3.0** license.
- **Software:** This project is under the [MIT](./LICENSE) license.

---
Developed with ☕ and 🎲 by [Maiquel Leonel](https://maiquelleonel.com.br).
