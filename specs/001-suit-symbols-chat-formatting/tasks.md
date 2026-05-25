---

description: "Task list for Suit Symbols Chat Formatting implementation"
---

# Tasks: Suit Symbols Chat Formatting

**Input**: Design documents from `/specs/001-suit-symbols-chat-formatting/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), checklists/requirements.md

**Tests**: Unit tests for `src/core.js` using Bun are REQUIRED to maintain 100% coverage.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Ensure `src/core.js` and `test/core.test.js` are ready for Bun execution
- [x] T002 Export `sanitizeChatMessage` placeholder from `src/core.js`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [x] T003 Define the core transformation pipeline structure in `src/core.js`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Suit Symbol Conversion (Priority: P1) 🎯 MVP

**Goal**: Convert emoji suits (♠️, ♣️, ❤️, ♦️) to plain text (♠, ♣, ♥, ♦)

**Independent Test**: Call `sanitizeChatMessage` with suit emojis and verify they return plain text symbols

### Tests for User Story 1 (REQUIRED)

- [x] T004 [P] [US1] Add unit tests for suit symbol conversion in `test/core.test.js`

### Implementation for User Story 1

- [x] T005 [US1] Implement suit symbol detection and replacement logic in `src/core.js`

**Checkpoint**: User Story 1 functional and testable independently

---

## Phase 4: User Story 2 - Variation Selector Stripping (Priority: P1)

**Goal**: Remove `\uFE0F` variation selectors from all text

**Independent Test**: Call `sanitizeChatMessage` with text containing `\uFE0F` and verify it's removed

### Tests for User Story 2 (REQUIRED)

- [x] T006 [P] [US2] Add unit tests for `\uFE0F` stripping in `test/core.test.js`

### Implementation for User Story 2

- [x] T007 [US2] Implement regex to remove all `\uFE0F` characters in `src/core.js`

**Checkpoint**: User Story 2 functional and testable independently

---

## Phase 5: User Story 3 - Preserve Other Emojis (Priority: P1)

**Goal**: Ensure non-suit emojis remain untouched

**Independent Test**: Call `sanitizeChatMessage` with standard emojis (e.g., 🃏, ⭐) and verify they are unchanged

### Tests for User Story 3 (REQUIRED)

- [x] T008 [P] [US3] Add unit tests for emoji preservation in `test/core.test.js`

### Implementation for User Story 3

- [x] T009 [US3] Verify and adjust transformation logic to preserve non-suit emojis in `src/core.js`

**Checkpoint**: User Story 3 functional and testable independently

---

## Phase 6: User Story 4 - Paste Trigger Integration (Priority: P1)

**Goal**: Automatically trigger sanitization when text is pasted into chat input

**Independent Test**: Manually paste text into a mock `textarea:last-child` and verify `sanitizeChatMessage` is called

### Implementation for User Story 4

- [x] T010 [US4] Add paste event listener to `textarea:last-child` in `src/content.js`
- [x] T011 [US4] Implement clipboard data retrieval and sanitization call in `src/content.js`
- [x] T012 [US4] Update chat input with sanitized text in `src/content.js`

**Checkpoint**: User Story 4 functional and testable independently

---

## Phase 7: User Story 5 - Error Handling & Fallback (Priority: P2)

**Goal**: Handle unexpected errors gracefully by logging and falling back to original text

**Independent Test**: Mock an error in `sanitizeChatMessage` and verify it returns original text

### Tests for User Story 5 (REQUIRED)

- [x] T013 [P] [US5] Add unit tests for error cases in `test/core.test.js`

### Implementation for User Story 5

- [x] T014 [US5] Wrap sanitization logic in try-catch with error logging and fallback in `src/core.js`

**Checkpoint**: All user stories complete and robust

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final quality checks and performance verification

- [x] T015 Run `bun test` and ensure 100% code coverage for `src/core.js`
- [x] T016 Perform manual integration test in a browser with the extension loaded (Ready for validation)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on T001-T002
- **User Stories (Phases 3-5)**: Can be implemented in parallel or sequentially once Phase 2 is done.
- **Integration (Phase 6)**: Depends on `sanitizeChatMessage` (US1-US3) being defined.
- **Error Handling (Phase 7)**: Can be added at any point but best after core logic.
- **Polish (Phase 8)**: Depends on all implementation tasks being complete.

### Parallel Opportunities

- Unit tests for US1, US2, US3, and US5 can be written in parallel in `test/core.test.js`.
- Integration (US4) in `src/content.js` can start as soon as the interface for `sanitizeChatMessage` is defined in `src/core.js` (T002).

---

## Parallel Example: Core Logic Tests

```bash
# Launch all unit tests for core logic together:
Task: "Add unit tests for suit symbol conversion in test/core.test.js"
Task: "Add unit tests for \uFE0F stripping in test/core.test.js"
Task: "Add unit tests for emoji preservation in test/core.test.js"
```

---

## Implementation Strategy

### MVP First (US1, US2, US3)

1. Complete Setup and Foundation.
2. Implement and test the core `sanitizeChatMessage` logic (US1, US2, US3).
3. Validate with unit tests.

### Incremental Integration

1. Once core logic is validated, integrate it into `src/content.js` (US4).
2. Add robustness with error handling (US5).
3. Final polish and coverage verification.

---

## Notes

- All changes to `src/core.js` must be accompanied by tests in `test/core.test.js`.
- Use regex for efficient string manipulation in `src/core.js`.
- Ensure `src/content.js` remains efficient and doesn't block the UI thread.
