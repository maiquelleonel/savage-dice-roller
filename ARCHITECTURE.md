# Project Architecture - Savage Worlds Dice Roller

*Leia este documento em [Português](./ARCHITECTURE_PT.md).*

## Governance
This project is governed by the [Constitution](.specify/memory/constitution.md), which defines the core principles and architectural constraints that must be followed.

## Overview
This is a Chrome extension designed to integrate RPG (Savage Worlds) features directly into the browser, with an initial focus on Google Meet.

## Directory Structure
- `src/core.js`: Pure business logic (Savage Worlds rules, dice, deck). **No DOM dependencies.**
- `src/content.js`: UI and Integration layer. Manipulates the page DOM and communicates with `core.js`.
- `src/background.js`: Manages extension events (icon click) and dynamic script injection.
- `dist/`: Code transpiled and bundled by Bun for browser consumption.
- `test/`: Unit tests using Bun's native runner (`bun:test`).

## ADR (Architectural Decision Records)

### ADR 4: Normalization Policy
- **Context:** Chat platforms (like Google Meet) render Unicode differently based on whether characters are "emoji-like" or "plain-text".
- **Decision:** All chat-bound strings MUST be processed by `core.js`'s `sanitizeChatMessage` to strip variation selectors and convert suit emojis to plain text.
- **Consequence:** Guaranteed legibility across all platforms, including Dark Mode.

### ADR 1: Separation of Logic and UI
- **Context:** Chrome extensions have restricted execution environments (Content Scripts).
- **Decision:** Keep RPG logic in a separate file (`core.js`) using ES modules (`export`).
- **Consequence:** Facilitates unit testing in the terminal and keeps the UI decoupled from the rules.

### ADR 2: Use of Bun as Bundler and Test Runner
- **Context:** Browsers do not support direct `import` in Content Scripts without complex configuration. Jest has difficulties with coverage in native ES modules without Babel.
- **Decision:** Use Bun for the `build` (grouping dependencies into a single file) and use `bun test` for fast test execution.
- **Consequence:** Extremely fast build and simplified testing environment.

### ADR 3: Dynamic Injection via `background.js`
- **Context:** We want the extension to work on any page and be able to be toggled on/off.
- **Decision:** Remove automatic loading from `manifest.json` and use `chrome.action.onClicked` to inject the script only when requested.
- **Consequence:** Better browser performance and full control over UI visibility.
