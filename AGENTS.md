# AI Agents Guide

This project uses a hybrid architecture of Chrome Extension + Bun. Follow these guidelines to avoid context loss and synchronization errors:

## 1. State Verification before Editing
**Always** use the `read_file` command on the target file before any editing (`edit_file`). Do not trust the conversation history for the exact content of the file, as versions may have been overwritten or reverted.

## 2. Import/Export Flow
- RPG logic goes into `src/core.js` using `export`.
- Browser/DOM interaction goes into `src/content.js` using `import`.
- **Never** use `import` in files that will not be processed by Bun (build), as Chrome will throw module errors in simple Content Scripts.

## 3. Granular Editing Process
To avoid "text match" failures in large files:
- Make small and incremental edits.
- Verify that the indentation and special characters (suit emojis) in your `old_text` correspond exactly to what was read in step 1.

## 4. Test Maintenance
Any change in `core.js` **requires** running and updating tests in `test/core.test.js` using `bun test`.
- Use Bun's `spyOn(Math, "random")` to simulate predictable dice rolls.
- Remember that the result of `rollSingleDie(6)` is `Math.floor(random * 6) + 1`. Calculate your static mocks based on this.

## 5. Coding Standards
- Methods, variables, test names, and comments **must** follow the standard JS `camelCase`.
- All code identifiers and comments **must** be in English.

## 6. Card Naming Convention
Cards must use only the first letter for face cards (A, K, Q, J) and normal numbers for the rest (e.g., "A of ♠️" instead of "Ace of ♠️"). The tests in `core.test.js` strictly depend on this reduced nomenclature.
