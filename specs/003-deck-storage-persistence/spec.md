# Feature Specification: deck-storage-persistence

**Feature Branch**: `task/issue-3-featstorage-persist-deck-state-and-drawn`

**Created**: 2026-10-16

**Status**: Draft

**Input**: User description: "Persist deck state and drawn cards across sessions via chrome.storage.local"

## Objective
Implement persistence for the deck and drawn cards across sessions using the `chrome.storage.local` API. This functionality ensures that the Game Master and players do not lose track of remaining and drawn cards upon reloading the page or reopening the extension.

## Target Files
- `src/core.js`: Implementation of `saveDeckState` and `loadDeckState` functions.
- `manifest.json`: Addition of `"storage"` permission.
- `test/core.test.js`: Bun unit and acceptance tests with 100% coverage.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Save Deck State to Storage (Priority: P1)

As a Game Master, I want the current state of remaining cards and drawn cards to be persisted automatically, so that progress is not lost across sessions or reloads.

**Why this priority**: Core functionality needed to maintain initiative and deck state integrity across browser page reloads.

**Independent Test**: Can be tested by invoking `saveDeckState(deck, drawnCards)` and verifying that the data is stored in `chrome.storage.local`.

**Acceptance Scenarios**:

1. **Given** a deck with remaining cards and a list of drawn cards, **When** `saveDeckState(deck, drawnCards)` is executed, **Then** `deck` and `drawnCards` are persisted to `chrome.storage.local`, **And** the optional callback is invoked.

---

### User Story 2 - Load Persisted Deck State from Storage (Priority: P1)

As a Game Master, I want the extension to restore the previous deck state and drawn cards when initialized, so that game sessions can resume seamlessly.

**Why this priority**: Ensures continuity of the game session without requiring manual recreation of the card order.

**Independent Test**: Can be tested by seeding `chrome.storage.local` with a saved state and invoking `loadDeckState(callback)`.

**Acceptance Scenarios**:

1. **Given** a previously persisted state in `chrome.storage.local` containing `deck` and `drawnCards`, **When** `loadDeckState(callback)` is executed, **Then** the deck and drawn cards are restored, **And** the callback receives `{ deck, drawnCards }`.

---

### User Story 3 - Graceful Fallback on Missing or Empty Storage (Priority: P2)

As a Game Master, I want the extension to safely initialize a fresh 54-card deck if no persisted state exists or if the storage API is unavailable, so that the extension never throws unhandled errors.

**Why this priority**: Vital for first-time use, reset scenarios, and runtime environments where `chrome.storage` is unavailable.

**Independent Test**: Can be tested by invoking `loadDeckState(callback)` with empty storage or when `chrome.storage` is undefined.

**Acceptance Scenarios**:

1. **Given** `chrome.storage.local` has no saved data or the API is unavailable, **When** `loadDeckState(callback)` is executed, **Then** a fresh deck of 54 cards (52 standard + 2 Jokers, shuffled) is generated, **And** `drawnCards` is initialized to `[]`, **And** the callback receives the new deck and empty list.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST persist `deck` and `drawnCards` to `chrome.storage.local`.
- **FR-002**: System MUST restore `deck` and `drawnCards` from `chrome.storage.local`.
- **FR-003**: System MUST fall back to a fresh 54-card deck (52 standard cards + 2 Jokers, shuffled) and empty `drawnCards` (`[]`) when:
  - No saved state exists in storage;
  - `chrome` or `chrome.storage.local` is undefined;
  - An error occurs during retrieval (`chrome.runtime.lastError`);
  - The retrieved state is invalid or both `deck` and `drawnCards` are empty.
- **FR-004**: System MUST handle environments where `chrome` or `chrome.storage.local` is unavailable gracefully without throwing uncaught exceptions.
- **FR-005**: System MUST include the `"storage"` permission in `manifest.json`.

### Key Entities

- **Card**: Object representing a playing card:
  - `name`: string (e.g., `"A of ♠️"`, `"Joker (Red)"`)
  - `weight`: number (initiative sorting weight)
  - `charName`?: string (optional character identifier)
- **DeckState**: Object containing the deck status:
  - `deck`: Card[] (remaining cards in deck)
  - `drawnCards`: Card[] (cards drawn so far)

### Contracts

#### `saveDeckState`
```typescript
function saveDeckState(
  deck?: Card[],
  drawnCards?: Card[] | (() => void),
  callback?: () => void
): Promise<void> | void;
```
- Saves the state `{ deck, drawnCards }` to `chrome.storage.local`.
- Defaults `deck` to the module-level `deck` if omitted or null.
- Defaults `drawnCards` to `[]` if omitted or if a callback is passed as second parameter.
- If `chrome.storage.local` is unavailable, executes the callback gracefully without throwing errors.
- Returns a Promise resolving when the save operation completes.

#### `loadDeckState`
```typescript
function loadDeckState(
  callback?: (state: DeckState, drawnCards?: Card[]) => void
): Promise<DeckState> | void;
```
- Retrieves `{ deck, drawnCards }` from `chrome.storage.local`.
- Falls back to a fresh 54-card deck (52 standard cards + 2 Jokers, shuffled) and `drawnCards: []` if:
  - No saved state exists in storage;
  - `chrome` or `chrome.storage.local` is undefined;
  - An error occurs (`chrome.runtime.lastError`);
  - The retrieved state is invalid or both `deck` and `drawnCards` are empty.
- Invokes the callback with the loaded or fallback state (supporting both single-argument `{ deck, drawnCards }` and two-argument `(deck, drawnCards)` callbacks).
- Returns a Promise resolving to `{ deck, drawnCards }`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of deck states are accurately persisted and restored across sessions when `chrome.storage.local` is available.
- **SC-002**: 100% unit test coverage for `saveDeckState` and `loadDeckState` in `test/core.test.js`.
- **SC-003**: ZERO unhandled exceptions or crashes when running in environments where `chrome.storage` is undefined.
