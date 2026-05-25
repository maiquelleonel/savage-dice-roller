# Data Model: Editable Chat Input Support

## Entities

### ChatInput (Virtual)

Represents the abstract target for message delivery.

- **Type**: `String` (One of: `TEXTAREA`, `CONTENTEDITABLE`)
- **Element**: `HTMLElement` (The DOM node)
- **State**:
    - `isFocused`: Boolean
    - `currentContent`: String

## Logic & Transitions

### Detection

1. Query DOM for `textarea:last-child, [contenteditable="true"]:last-child`.
2. Identify element type based on `tagName` or presence of `contenteditable` attribute.

### Insertion

- **If TEXTAREA**:
    - Update `.value`.
    - Dispatch `input` event.
- **If CONTENTEDITABLE**:
    - Update `.innerText`.
    - Dispatch `input` event.

### Paste Interception

1. Listen for `paste` event on matching elements.
2. If match:
    - Prevent default.
    - Sanitize text via `core.js`.
    - **TEXTAREA path**: Use `selectionStart`/`selectionEnd` to slice and update `.value`.
    - **CONTENTEDITABLE path**: Use `window.getSelection()` and `range.insertNode()` (or text manipulation) to update content at cursor.
