# Tasks: Editable Chat Input Support

**Input**: Design documents from `/specs/003-editable-chat-input/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Tests**: Tests are requested for core logic sanitization. Manual verification for DOM integration.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Update extension manifest or configuration if needed (No changes expected for MV3)
- [X] T002 Ensure development environment is ready (Bun for tests)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [X] T003 Refactor input selection logic in `src/content.js` to support multiple selector types
- [X] T004 Implement helper function in `src/content.js` to identify if an element is a standard input or editable container

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Support for Rich Text Chat Inputs (Priority: P1) 🎯 MVP

**Goal**: Automatically detect and send dice results to `contenteditable` chat inputs.

**Independent Test**: Use a mock `contenteditable` container, trigger a roll, and verify the text is inserted and "sent".

### Implementation for User Story 1

- [X] T005 [P] [US1] Update `sendToMeetChat` in `src/content.js` to use the expanded selector: `textarea:last-child, [contenteditable="true"]:last-child`
- [X] T006 [US1] Implement text insertion logic for `contenteditable` elements using `.innerText` in `src/content.js`
- [X] T007 [US1] Update event dispatching in `src/content.js` to trigger `input` events for `contenteditable` elements
- [X] T008 [US1] Ensure `KeyboardEvent` (Enter) is correctly dispatched to `contenteditable` elements in `src/content.js`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently.

---

## Phase 4: User Story 2 - Sanitized Paste in Editable Inputs (Priority: P2)

**Goal**: Automatically convert suit symbols when pasting into `contenteditable` inputs.

**Independent Test**: Paste "heart" into a `contenteditable` container and verify it converts to "♥".

### Implementation for User Story 2

- [X] T009 [P] [US2] Update `paste` event listener in `src/content.js` to match both `textarea` and `contenteditable` selectors
- [X] T010 [US2] Implement `contenteditable`-specific paste handling in `src/content.js` using `Selection` and `Range` APIs to insert sanitized text at cursor
- [X] T011 [P] [US2] Verify `sanitizeChatMessage` from `src/core.js` is correctly called for all input types
- [X] T012 [US2] Add unit tests in `test/core.test.js` to verify sanitization logic remains correct for various input strings

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T013 [P] Update `README.md` to reflect support for `contenteditable` chat inputs
- [X] T014 [P] Code cleanup and optimization in `src/content.js` to remove any redundant selector calls
- [X] T015 Run `quickstart.md` validation steps to ensure feature completeness

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### Parallel Opportunities

- T005 [US1] and T009 [US2] can potentially be started in parallel after Phase 2, but since they both touch `src/content.js`, sequential implementation is recommended to avoid merge conflicts.
- Documentation and unit tests (T012, T013) can run in parallel with implementation.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 & 2.
2. Complete Phase 3 (User Story 1).
3. **VALIDATE**: Verify dice rolls are sent to `contenteditable` inputs.

### Incremental Delivery

1. Foundation ready.
2. Add US1 → Test independently.
3. Add US2 → Test independently.
4. Polish and Final Validation.
