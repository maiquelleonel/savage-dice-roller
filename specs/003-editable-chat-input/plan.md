# Implementation Plan: Editable Chat Input Support

**Branch**: `003-editable-chat-input` | **Date**: 2026-05-25 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/003-editable-chat-input/spec.md`

## Summary

The extension will expand its "Universal Chat Integration" to support modern chat platforms that use `contenteditable` elements instead of standard `textarea` inputs. This includes expanding the default selectors, implementing specialized content setting logic for rich-text containers, and ensuring paste sanitization (suit symbols) works across all supported input types.

## Technical Context

**Language/Version**: JavaScript (ES6+), Chrome Extension Manifest V3

**Primary Dependencies**: None (Vanilla JS)

**Storage**: N/A (Local computation)

**Testing**: Bun test (for core), manual/automation testing (for content scripts)

**Target Platform**: Google Chrome / Chromium-based browsers

**Project Type**: Browser Extension (Content Script focus)

**Performance Goals**: Minimal overhead on host page (Meet, etc.)

**Constraints**: <100ms latency for message injection; must be host-agnostic

**Scale/Scope**: Support for `textarea` and `contenteditable="true"` inputs

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **I. Logic Separation**: Is all business logic isolated from DOM dependencies in `src/core.js`? (Yes, input handling is in `content.js`, sanitization is in `core.js`)
- [x] **II. Host Agnostic**: Does the integration rely on generic selectors rather than platform-specific IDs? (Yes, uses `textarea:last-child` and `[contenteditable="true"]:last-child`)
- [x] **III. Privacy**: Are all calculations performed locally? (Yes, no remote APIs)
- [x] **IV. Rule Integrity**: Is 100% test coverage planned for all new RPG mechanics in `src/core.js`? (N/A, this is a UI/Integration feature, but existing `core.js` tests must pass)
- [x] **V. Performance**: Is the feature designed for on-demand injection to minimize host page impact? (Yes, standard extension behavior)
- [x] **VI. AI-Augmented Engineering**: Does the plan ensure AI agents follow the `AGENTS.md` guidelines? (Yes, including state verification)

## Project Structure

### Documentation (this feature)

```text
specs/003-editable-chat-input/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── checklists/
    └── requirements.md  # Spec validation
```

### Source Code (repository root)

```text
src/
├── background.js        # Message routing
├── content.js           # DOM interaction (Target of changes)
├── core.js              # Business logic (Sanitization)
├── popup.html/css       # Extension UI
└── styles.css           # Global styles

test/
└── core.test.js         # Unit tests
```

**Structure Decision**: Single project (Extension) structure. Primary changes will occur in `src/content.js` to handle different input types and update selectors.

## Complexity Tracking

*No Constitution Check violations.*
