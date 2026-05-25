<!--
SYNC IMPACT REPORT
- Version change: 1.0.0 → 1.1.0
- List of modified principles: None
- Added sections:
    - Principle VI. AI-Augmented Engineering
- Removed sections: None
- Templates requiring updates:
    - .specify/templates/plan-template.md (✅ updated)
- Follow-up TODOs: None
-->

# Savage Dice Roller Constitution

## Core Principles

### I. Separation of Logic (Core-First)
Business logic (Savage Worlds rules, dice rolling, deck management) must reside in `src/core.js` and remain entirely free of DOM dependencies. This separation ensures high testability via terminal-based runners and portability across different integration layers.

### II. Host-Agnostic Integration
The extension MUST interact with host pages (e.g., Google Meet) via generic, configurable DOM selectors (such as `textarea:last-child`) rather than hard-coded, platform-specific IDs. This ensures the extension remains compatible with various web chats with minimal adjustment.

### III. Local-First Calculation
All dice results, card draws, and initiative states MUST be computed and stored locally within the browser context. External APIs, tracking, or remote servers are prohibited to ensure maximum player privacy, zero latency, and offline capability.

### IV. Rule Integrity via Testing
The accuracy of Savage Worlds mechanics (Aces/Exploding Dice, Wild Die integration, Card Suit sorting) is non-negotiable. 100% unit test coverage for `src/core.js` is mandatory, verified via `bun test` before any deployment or merge.

### V. On-Demand Injection
To maintain optimal browser performance and respect user resources, the extension's UI components and logic MUST be injected into the host page only upon explicit user activation (via the `background.js` click handler).

### VI. AI-Augmented Engineering
AI agents used for development MUST adhere to the guidance in `AGENTS.md`. This includes mandatory state verification before editing, strict adherence to the import/export flow between `core.js` and `content.js`, and maintaining 100% test coverage for all core logic changes.

## Performance & Scalability
- The extension MUST NOT degrade the frame rate or responsiveness of the host page (especially during video calls).
- UI elements MUST be lightweight, utilizing Vanilla CSS and minimal DOM nodes.
- Memory usage MUST be managed by properly cleaning up event listeners when the extension is toggled off.

## Development Workflow
- **Bundler & Testing**: Bun is the primary tool for transpilation, bundling, and test execution.
- **Branching Strategy**: All new features and bug fixes MUST occur on dedicated feature branches (`###-feature-name`).
- **Atomic Commits**: Commits SHOULD be small, atomic, and follow the Conventional Commits specification.

## Governance
The Constitution is the supreme architectural authority for the Savage Dice Roller project. All implementation plans and pull requests must be validated against these principles.

- All Pull Requests MUST maintain or improve the current test coverage percentage.
- Any deviation from the Core Principles requires an Architectural Decision Record (ADR) and a corresponding update to this Constitution.
- Use `README.md` and `ARCHITECTURE.md` for project-wide guidance.

**Version**: 1.1.0 | **Ratified**: 2026-05-24 | **Last Amended**: 2026-05-24
