# Quickstart: Editable Chat Input Support

## Feature Overview

This feature enables the extension to work with modern chat interfaces (like newer Google Meet layouts) that use `contenteditable` elements for message input.

## Key Files

- `src/content.js`: Updated to handle detection and text insertion for both `textarea` and `contenteditable`.
- `specs/003-editable-chat-input/spec.md`: Feature specification.

## Development Setup

1. Load the extension in `chrome://extensions/` (Developer Mode).
2. Open a test page or Google Meet.
3. If testing `contenteditable`, ensure the chat input matches the `[contenteditable="true"]:last-child` selector.

## Verification Steps

### Automatic Injection
1. Perform a dice roll using the extension popup.
2. Verify the result is automatically sent to the chat if a `contenteditable` input is present.

### Paste Sanitization
1. Copy a string with suit keywords (e.g., "spade").
2. Paste into a `contenteditable` chat input.
3. Verify it is converted to "♠".
