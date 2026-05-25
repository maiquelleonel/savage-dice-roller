# Spec 001: Suit Symbols Chat Formatting

## Objective
Ensure that suit symbols (♠, ♣, ♥, ♦) are rendered correctly in web-based chats (like Google Meet) regardless of the chat's background (Dark Mode vs Light Mode).

## Contract
- The `sanitizeChatMessage(text)` function MUST be used before any string is sent to the chat input (`textarea:last-child`).
- The trigger for `sanitizeChatMessage` MUST be attached to any DOM element matching the `textarea:last-child` selector.
- Emojis with variation selectors (\uFE0F) MUST be stripped to ensure platform-agnostic rendering.

## Clarifications
### Session 2026-05-24
- Q: What is the specific requirement for "rendered correctly" to ensure suit symbol visibility in both Dark and Light modes? → A: Plain text characters that inherit default text color (black/white)
- Q: Which "special items" must be preserved as emojis, and how should new ones be handled? → A: Preserve ALL emojis EXCEPT the four specific suit emojis
- Q: In what order should the transformations be applied to ensure the most reliable detection and conversion of suit symbols? → A: Replace emoji suits -> Strip remaining \uFE0F
- Q: What is the primary scope of the sanitizeChatMessage(text) function? → A: Strictly limited to suit symbol and emoji formatting.
- Q: When should the sanitization be triggered in the user interface? → A: Only when text is pasted.
- Q: Should the user be notified when formatting is applied? → A: Silently apply without notification.
- Q: How should errors during the sanitization process be handled? → A: Log error and allow original text.
- Q: What is the target DOM element for the formatting trigger? → A: Any input matching `textarea:last-child`.

## Functional Requirements
- The `sanitizeChatMessage` function MUST focus strictly on suit symbol and emoji formatting, excluding broader security or HTML sanitization.
- The formatting transformation MUST be triggered automatically when text is pasted into the target chat input.
- Transformations MUST be applied silently without requiring user confirmation or displaying notifications.

## Implementation Details
- Detect and replace specifically the four emoji-based suit symbols with their plain-text counterparts (♠, ♣, ♥, ♦).
- Strip any remaining `\uFE0F` from the text to ensure standard rendering for all other items.
- Pass through all other emojis (e.g., 🃏, ⚔️, ⭐, 💥) without modification.

## Edge Cases & Error Handling
- **Sanitization Failure:** If the `sanitizeChatMessage` function encounters an unexpected error, it MUST log the error for debugging and return the original, unmodified text to ensure the user's communication is not blocked.
- **Empty Paste:** If the clipboard content is empty, the trigger MUST NOT execute any transformations.
