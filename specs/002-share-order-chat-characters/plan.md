# Implementation Plan: share-order-chat-characters

**Branch**: `002-share-order-chat-characters` | **Date**: 2026-05-24 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/002-share-order-chat-characters/spec.md`

## Summary

This feature replaces all *suits* emojis in shared initiative messages with text characters or non-emoji Unicode symbols (♠, ♣, ♥, ♦). This ensures the initiative order is readable in all chat clients regardless of theme or emoji support. The implementation will focus on refactoring the formatting logic in `src/core.js` and ensuring `src/content.js` utilizes these emoji-free formatters.

## Technical Context

**Language/Version**: JavaScript (ES6+)

**Primary Dependencies**: None (Vanilla JS)

**Storage**: localStorage (existing, for persistent settings)

**Testing**: Bun (`bun test`) using `test/core.test.js`

**Target Platform**: Google Meet (Browser Extension)

**Project Type**: Browser Extension

**Performance Goals**: Zero impact on chat latency; lightweight string transformations.

**Constraints**: Offline-capable, zero external API calls, 100% local processing.

**Scale/Scope**: Modifying formatting logic in `core.js` and call sites in `content.js`.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **I. Logic Separation**: Is all business logic isolated from DOM dependencies in `src/core.js`? (Formatting logic will be centralized here)
- [x] **II. Host Agnostic**: Does the integration rely on generic selectors rather than platform-specific IDs? (Yes, `textarea:last-child`)
- [x] **III. Privacy**: Are all calculations performed locally? (Yes)
- [x] **IV. Rule Integrity**: Is 100% test coverage planned for all new RPG mechanics in `src/core.js`? (Tests will be added for the new formatters)
- [x] **V. Performance**: Is the feature designed for on-demand injection to minimize host page impact? (Yes)
- [x] **VI. AI-Augmented Engineering**: Does the plan ensure AI agents follow the `AGENTS.md` guidelines for state verification and testing? (Yes)

## Project Structure

### Documentation (this feature)

```text
specs/002-share-order-chat-characters/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (N/A)
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
src/
├── core.js              # Business logic & formatting (Target)
├── content.js           # UI & DOM interaction (Target)
└── background.js        # Extension entry point

test/
└── core.test.js         # Unit tests (Target)
```

**Structure Decision**: Single project structure as per existing layout. No changes to the overall structure.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

(No violations)
