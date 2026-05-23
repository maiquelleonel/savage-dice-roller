// savage-dice-roller/src/core.js

export let deck = [];
export const suits = ["♣️", "♦️", "♥️", "♠️"];
export const ranks = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "Jack",
  "Queen",
  "King",
  "Ace",
];

export function createDeck() {
  deck = [];
  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push(`${rank} of ${suit}`);
    }
  }
  deck.push("🃏", "🃏"); // Add two Jokers
  shuffleDeck();
}

export function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap
  }
}

export function drawCard() {
  if (deck.length === 0) {
    return "No cards left"; // Indicate that deck is empty
  }
  return deck.pop();
}

export function rollSingleDie(size) {
  return Math.floor(Math.random() * size) + 1;
}

export function rollExplodingDie(size) {
  let total = 0;
  let roll = 0;
  do {
    roll = rollSingleDie(size);
    total += roll;
  } while (roll === size);
  return total;
}

export function rollDice(dieType, includeWildDie = true) {
  const dieSize = parseInt(dieType.substring(1));
  const characteristicRoll = rollExplodingDie(dieSize);
  let wildDieRoll = 0;

  if (includeWildDie) {
    wildDieRoll = rollExplodingDie(6); // Wild Die is always a d6
  }

  const finalResult = Math.max(characteristicRoll, wildDieRoll);

  return {
    characteristic: characteristicRoll,
    wild: wildDieRoll,
    final: finalResult,
  };
}

export function formatDiceResultMessage(rollResult, dieType, includeWildDie) {
  const dieSize = parseInt(dieType.substring(1));
  if (includeWildDie) {
    return `${rollResult.final} = (${rollResult.characteristic} || ${rollResult.wild})`;
  } else {
    return `${rollResult.final} (d${dieSize})`;
  }
}
