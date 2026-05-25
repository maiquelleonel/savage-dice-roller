# Research: Editable Chat Input Support

## Decisions

- **Decision 1: Selector Strategy**: Use a hardcoded comma-separated selector: `textarea:last-child, [contenteditable="true"]:last-child`.
- **Decision 2: Content Manipulation**: Use `.value` for `textarea` and `.innerText` (or `.textContent`) for `contenteditable` elements.
- **Decision 3: Event Simulation**: Dispatch `input` and `change` events for both types, and a `KeyboardEvent` (Enter) for `contenteditable` if a "Send" button is not found.
- **Decision 4: Selection/Cursor Handling**: Use `Selection` and `Range` APIs for `contenteditable` to insert text at the cursor position during paste.

## Rationale

- **Rationale 1**: Comma-separated selectors allow `document.querySelector` to find the first matching element of either type efficiently.
- **Rationale 2**: `innerText` is better than `innerHTML` for `contenteditable` to avoid security issues and unexpected HTML formatting when sending plain text messages.
- **Rationale 3**: Many modern frameworks (React, Angular) used in chat apps rely on `input` events to sync internal state.
- **Rationale 4**: Standard `textarea` properties like `selectionStart` are not available on `contenteditable` elements, necessitating the use of the `Selection` API.

## Alternatives Considered

- **Alternative 1: Configurable Selectors**: Rejected to maintain zero-configuration UX as per specification clarification.
- **Alternative 2: `execCommand('insertText')`**: Considered for `contenteditable` as it handles undo history better, but it is technically deprecated (though still widely supported). `.innerText` manipulation is more reliable for simple text replacement.
