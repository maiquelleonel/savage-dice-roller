# Implementation Plan: Suit Symbols Chat Formatting

**Branch**: `001-suit-symbols-chat-formatting` | **Date**: 2026-05-24 | **Spec**: [specs/001-suit-symbols-chat-formatting/spec.md](specs/001-suit-symbols-chat-formatting/spec.md)

**Input**: Feature specification from `/specs/001-suit-symbols-chat-formatting/spec.md`

## Summary

This feature ensures that suit symbols (♠, ♣, ♥, ♦) are rendered as plain text characters in web-based chats to maintain visibility across both Light and Dark modes. The technical approach involves detecting specifically the emoji versions of these symbols, replacing them with their plain-text counterparts, and stripping variation selectors (`\uFE0F`) to ensure platform-agnostic rendering.

## Technical Context

**Language/Version**: JavaScript (ES6+)

**Primary Dependencies**: None (Vanilla JavaScript)

**Storage**: N/A

**Testing**: Bun (unit tests for `src/core.js`)

**Target Platform**: Web Browser (Chrome/Firefox Extension)

**Project Type**: Browser Extension

**Performance Goals**: Zero degradation of host page responsiveness; efficient string transformation before sending chat messages.

**Constraints**: Must maintain 100% test coverage for `src/core.js`. Must preserve all other emojis.

**Scale/Scope**: Focused update to the chat sanitization logic within `src/core.js`.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **I. Logic Separation**: Is all business logic isolated from DOM dependencies in `src/core.js`? (Yes, `sanitizeChatMessage` will live in `core.js`)
- [x] **II. Host Agnostic**: Does the integration rely on generic selectors rather than platform-specific IDs? (Yes, uses `textarea:last-child` as per spec)
- [x] **III. Privacy**: Are all calculations performed locally? (Yes, local string transformation)
- [x] **IV. Rule Integrity**: Is 100% test coverage planned for all new RPG mechanics in `src/core.js`? (Yes, mandatory for `sanitizeChatMessage`)
- [x] **V. Performance**: Is the feature designed for on-demand injection to minimize host page impact? (Yes, existing extension architecture)
- [x] **VI. AI-Augmented Engineering**: Does the plan ensure AI agents follow the `AGENTS.md` guidelines for state verification and testing? (Yes)

## Project Structure

### Documentation (this feature)

```text
specs/001-suit-symbols-chat-formatting/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output (generated later)
```

### Source Code (repository root)

```text
src/
├── background.js
├── content.js
├── core.js              # Target for sanitizeChatMessage
├── popup.css
├── popup.html
└── styles.css

test/
└── core.test.js         # Target for unit tests
```

**Structure Decision**: Single project structure as the extension is relatively small and already follows this layout.

## Complexity Tracking

*No violations detected.*
