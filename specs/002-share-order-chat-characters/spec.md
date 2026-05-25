# Feature Specification: share-order-chat-characters

**Feature Branch**: `002-share-order-chat-characters`

**Created**: 2026-05-24

**Status**: Draft

**Input**: User description: "002 shere order into chat must have characters insteas emoji"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Text-based Initiative Report (Priority: P1)

As a GM, I want to share the initiative order to the chat using only plain text characters of *suit* instead of emojis, so that the order is readable in all chat clients regardless of emoji support or theme (dark/light mode).

**Why this priority**: High value for compatibility and readability.

**Independent Test**: Can be tested by clicking "Share Order" and verifying the chat message contains no emojis (no swords, no stars, no suit emojis).

**Acceptance Scenarios**:

1. **Given** an active initiative order, **When** I click "Share Order", **Then** the message sent to chat must NOT contain suits emoji.
2. **Given** an active initiative order with a Joker, **When** I click "Share Order", **Then** the Joker entry must NOT contain suits emoji.
3. **Given** any card in the initiative, **When** I click "Share Order", **Then** the suit must be represented by suit symbols (♠/♣/♥/♦) instead of a suit emoji.

---

### User Story 2 - Text-based Quick Draw Message (Priority: P2)

As a GM, I want the automatic "Initiative: [Card]" message sent when drawing a card to also use *suit* text characters instead of emojis.

**Why this priority**: Ensures consistency across all shared initiative messages.

**Independent Test**: Can be tested by clicking "Draw Card" and verifying the automatic chat message is emoji-free.

**Acceptance Scenarios**:

1. **Given** a card is drawn, **When** the automatic message is sent to chat, **Then** it must NOT contain suit emojis.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The Initiative Report left intact.
- **FR-002**: Joker entries in the Initiative Report left intact.
- **FR-003**: All suit representations in the shared Initiative Report MUST be converted from emojis to suit symbols (♠/♣/♥/♦).

### Key Entities *(include if feature involves data)*

- **Initiative Report**: The string representation of the current initiative order formatted for chat.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of shared initiative messages (Report and Quick Draw) contain ZERO *suit* emoji characters.
- **SC-002**: Initiative order remains correctly sorted and readable in the chat output.
- **SC-003**: 100% unit test coverage for the updated formatting logic in `src/core.js`.

## Assumptions

- "Characters" in the user request refers to standard ASCII or Unicode text characters that are widely supported and do not render as colorful emojis.
- The user wants a complete removal of emojis from shared initiative messages to ensure maximum compatibility.
- The UI (internal display) can still use emojis; only the *shared* text (sent to chat) is affected.
- The existing `sanitizeChatMessage` logic can be leveraged or extended to ensure consistency.
