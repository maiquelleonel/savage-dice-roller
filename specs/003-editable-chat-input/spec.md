# Feature Specification: Editable Chat Input Support

**Feature Branch**: `003-editable-chat-input`

**Created**: 2026-05-25

**Status**: Draft

**Input**: User description: "003 add contenteditable=true as option of textarea:last-child selector to send text messages to chat"

## Clarifications

### Session 2026-05-25

- Q: Should the selector be hardcoded or configurable? → A: Hardcoded (Option A).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Support for Rich Text Chat Inputs (Priority: P1)

As a user of a chat platform that uses `contenteditable` elements instead of `textarea` (like modern Google Meet or other chat apps), I want the extension to automatically detect the message input field so that I can send my dice roll results directly to the chat without manual copying.

**Why this priority**: This expands the extension's "Universal Chat Integration" promise to platforms that have moved away from standard textareas, ensuring the tool remains useful across different host applications.

**Independent Test**: Open a page with a `div[contenteditable="true"]:last-child`, perform a dice roll, and verify the result appears in that element and is "sent" (via Enter key or send button).

**Acceptance Scenarios**:

1. **Given** a chat interface where the message input is a `div` with `contenteditable="true"` as the last child of its container, **When** I perform a dice roll, **Then** the message should be inserted into the `contenteditable` element.
2. **Given** a `contenteditable` chat input, **When** the message is inserted, **Then** the extension should trigger a "send" action (e.g., dispatching an Enter key event).

---

### User Story 2 - Sanitized Paste in Editable Inputs (Priority: P2)

As a user, I want suit symbols and other special formatting to be automatically converted when I paste text into a `contenteditable` chat input, just as it currently works for `textarea` inputs.

**Why this priority**: Consistency in user experience across different input types.

**Independent Test**: Paste text containing suit symbols (e.g., "heart") into a `contenteditable` input and verify it is converted to the corresponding symbol (e.g., "♥").

**Acceptance Scenarios**:

1. **Given** a `contenteditable` chat input, **When** I paste text with suit keywords, **Then** the text should be intercepted, sanitized, and the symbols should be inserted at the cursor position.

---

### Edge Cases

- **Multiple Inputs**: What happens if both a `textarea:last-child` and a `[contenteditable="true"]:last-child` exist on the page?
- **Nested Elements**: How does the system handle `contenteditable` elements that contain nested HTML (rich text) versus plain text?
- **Event Dispatching**: Does `contenteditable` require different events (e.g., `input` vs `change`) to notify the host application of the update?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST expand the default chat input selector to include `[contenteditable="true"]:last-child` as an alternative to `textarea:last-child`.
- **FR-002**: The system MUST detect if the selected element is a standard text input field or an editable rich-text container to determine the correct way to set its content.
- **FR-003**: The system MUST use a hardcoded set of generic selectors (including `textarea:last-child` and `[contenteditable="true"]:last-child`) to identify the chat input.
- **FR-004**: The system MUST attach paste event listeners to both standard text inputs and editable containers that match the selector.
- **FR-005**: When inserting text into an editable container, the system SHOULD "send" messages in the same way that currently work.

### Key Entities

- **Chat Input**: An interactive area where users type messages. Can be a standard multi-line text input or a container that allows rich-text editing.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can send dice roll results to `contenteditable` chat inputs with 100% success rate on supported platforms (e.g. Google Meet).
- **SC-002**: Paste sanitization works correctly in 100% of tested `contenteditable` scenarios.
- **SC-003**: The extension's core logic handles both `textarea` and `contenteditable` without crashing or console errors.
- **SC-004**: No regressions in existing `textarea` support.

## Assumptions

- **A-001**: The `:last-child` heuristic remains a valid way to identify the primary chat input across most platforms.
- **A-002**: `contenteditable` elements will respond to standard keyboard events (like Enter) for sending messages, similar to textareas.
- **A-003**: `innerText` or `textContent` is sufficient for setting the message content without needing to handle complex HTML structures within the `contenteditable` container.
