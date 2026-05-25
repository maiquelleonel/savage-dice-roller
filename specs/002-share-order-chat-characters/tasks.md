# Tasks: share-order-chat-characters

**Input**: Design documents from `/specs/002-share-order-chat-characters/`

**Prerequisites**: plan.md, spec.md, research.md

**Tests**: 100% unit test coverage for `src/core.js` logic is required by SC-003.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify project state

- [x] T001 Verify project structure and environment (`bun --version`, `bun test`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core formatting logic in `core.js`

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T002 Implement `formatCardName(card, useEmoji)` helper in `src/core.js`
- [x] T003 [P] Add unit tests for `formatCardName` in `test/core.test.js`
- [x] T004 Update `sanitizeChatMessage` in `src/core.js` to handle both emoji conversion and VS16 stripping consistently

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Text-based Initiative Report (Priority: P1) 🎯 MVP

**Goal**: Share initiative report without suit emojis to chat.

**Independent Test**: Click "Share Order" and verify chat input contains suit symbols (♠/♣/♥/♦) instead of emojis.

### Implementation for User Story 1

- [x] T005 [US1] Refactor `formatInitiativeReport` in `src/core.js` to support an optional `useEmoji` flag (defaulting to true)
- [x] T006 [P] [US1] Add unit tests for `formatInitiativeReport(activeInitiative, false)` in `test/core.test.js`
- [x] T007 [US1] Update `shareInitiativeToChat` in `src/content.js` to call `formatInitiativeReport(activeInitiative, false)`

**Checkpoint**: User Story 1 functional and verified with unit tests.

---

## Phase 4: User Story 2 - Text-based Quick Draw Message (Priority: P2)

**Goal**: Automatically send individual card draw messages without suit emojis.

**Independent Test**: Click "Draw Card" and verify the automatic "Initiative: ..." chat message uses suit symbols.

### Implementation for User Story 2

- [x] T008 [US2] Update `addInitiativeCard` in `src/content.js` to use `formatCardName(card, false)` for the `sendToMeetChat` message
- [x] T009 [P] [US2] Add unit tests in `test/core.test.js` for individual card formatting without emojis

**Checkpoint**: Both user stories functional.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final verification and cleanup

- [x] T010 [P] Run full test suite with `bun test` to ensure 100% coverage for new logic
- [x] T011 Verify visual consistency between UI (emojis) and Chat (symbols)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Setup.
- **User Stories (Phase 3+)**: All depend on Foundational (Phase 2).
- **Polish (Final Phase)**: Depends on all user stories.

### User Story Dependencies

- **User Story 1 (P1)**: Independent of US2.
- **User Story 2 (P2)**: Independent of US1.

### Parallel Opportunities

- T003 and T004 can run in parallel (if logic in T004 is independent of card name formatting).
- US1 and US2 can be implemented in parallel once Phase 2 is complete.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Foundational formatting in `core.js`.
2. Implement US1: `formatInitiativeReport` and its integration in `content.js`.
3. Validate "Share Order" functionality.

### Incremental Delivery

1. Foundation ready.
2. Add US1 → Test independently.
3. Add US2 → Test independently.
4. Final verify.
