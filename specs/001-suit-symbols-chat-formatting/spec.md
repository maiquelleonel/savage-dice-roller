# Spec 001: Dark Mode Chat Formatting

## Objective
Ensure that suit symbols (♠, ♣, ♥, ♦) are rendered correctly in web-based chats (like Google Meet) regardless of the chat's background (Dark Mode vs Light Mode).

## Contract
- The `sanitizeChatMessage(text)` function MUST be used before any string is sent to the chat input (`textarea:last-child`).
- Emojis with variation selectors (\uFE0F) MUST be stripped to ensure platform-agnostic rendering.

## Implementation Details
- Strip `\uFE0F`.
- Replace emoji-based suits with their plain-text counterparts.
- Maintain emoji for special items (e.g., 🃏, ⚔️, ⭐).
