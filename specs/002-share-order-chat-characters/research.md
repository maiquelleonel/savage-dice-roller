# Research: share-order-chat-characters

## Investigation: Unicode Suit Symbol Compatibility

### Goal
Determine if the non-emoji Unicode suit symbols (♠, ♣, ♥, ♦) are reliably rendered as text in Google Meet chat.

### Findings
- **Unicode Range**: The characters U+2660 (♠), U+2663 (♣), U+2665 (♥), and U+2666 (♦) are standard text-style symbols.
- **Variation Selector**: Many platforms auto-render these as emojis if followed by `\uFE0F` (VS16). Stripping this character or ensuring it is not present defaults them to text-style rendering.
- **Theme Compatibility**: Text-style symbols inherit the font color of the surrounding text (black in light mode, white/off-white in dark mode), solving the visibility issue reported in earlier features.

### Decision
Use the plain Unicode symbols (♠, ♣, ♥, ♦) and explicitly strip `\uFE0F` from all shared messages.

---

## Investigation: Centralizing Initiative Formatting

### Goal
Identify all code locations that generate initiative-related messages sent to chat to ensure 100% coverage.

### Findings
- **Location 1**: `formatInitiativeReport` in `src/core.js` - Used for the "Share Order" button. Currently uses ⚔️ and ⭐.
- **Location 2**: `addInitiativeCard` in `src/content.js` - Directly sends `Initiative: ${cardNameSafe}` to chat.
- **Location 3**: `displayMessage` in `src/content.js` - Sends dice roll results to chat. (While the spec focuses on initiative, this is a potential future scope or consistency target).

### Decision
- Introduce a new helper in `src/core.js`, e.g., `formatCardName(card, useEmoji = true)`, to centralize card name formatting.
- Call `formatCardName(card, false)` when sending messages to chat.
- Call `formatCardName(card, true)` when rendering the UI (retaining emojis for visual appeal where they work).

---

## Summary of Decisions

1. **Suit Representation**: Use ♠, ♣, ♥, ♦.
2. **Header Replacement**: do nothing.
3. **Joker Replacement**: do nothing.
4. **Implementation Strategy**: Centralize all formatting in `core.js` and update `content.js` to use the non-emoji versions for chat.
