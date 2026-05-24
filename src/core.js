// savage-dice-roller/src/core.js

export let deck = [];
export const suits = ["♣️", "♦️", "♥️", "♠️"]; // Clubs, Diamonds, Hearts, Spades (Emoji versions)
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
  "J",
  "Q",
  "K",
  "A",
];

const rankWeights = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
  Joker: 15,
};

const suitWeights = {
  "♣️": 0,
  "♦️": 1,
  "♥️": 2,
  "♠️": 3,
};

export function createDeck() {
  deck = [];
  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({
        name: `${rank} of ${suit}`,
        weight: rankWeights[rank] * 10 + suitWeights[suit],
      });
    }
  }
  deck.push({ name: "🃏 Joker", weight: rankWeights["Joker"] * 10 + 4 }); // Weight higher than any Ace
  deck.push({ name: "🃏 Joker", weight: rankWeights["Joker"] * 10 + 4 });
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
  let rolls = [];
  let currentRoll = 0;
  do {
    currentRoll = rollSingleDie(size);
    rolls.push(currentRoll);
  } while (currentRoll === size);

  const total = rolls.reduce((a, b) => a + b, 0);
  return { total, rolls };
}

export function rollDice(dieType, includeWildDie = true) {
  const dieSize = parseInt(dieType.substring(1));
  const charResult = rollExplodingDie(dieSize);
  let wildResult = { total: 0, rolls: [] };

  if (includeWildDie) {
    wildResult = rollExplodingDie(6);
  }

  const finalResult = Math.max(charResult.total, wildResult.total);

  return {
    characteristic: charResult,
    wild: wildResult,
    final: finalResult,
  };
}

export function formatDiceResultMessage(rollResult, dieType, includeWildDie) {
  const dieSize = parseInt(dieType.substring(1));

  const formatDieGroup = (res, size, label = "") => {
    let detail = "";
    if (res.rolls.length > 1) {
      detail = `${res.total} = (${res.rolls.map((r) => `d${size} ${r}`).join(" + ")})`;
    } else {
      detail = `${res.total} (d${size})`;
    }
    return label ? `${label}${detail}` : detail;
  };

  const charPart = formatDieGroup(rollResult.characteristic, dieSize);

  let raiseText = "";
  if (rollResult.final >= 8) {
    const raises = Math.floor((rollResult.final - 4) / 4);
    raiseText = ` [${raises} Raise${raises > 1 ? "s" : ""}]`;
  }

  if (includeWildDie) {
    const wildPart = formatDieGroup(rollResult.wild, 6, "W: ");
    return `${charPart}\n${wildPart}\nFinal: ${rollResult.final}${raiseText}`;
  } else {
    return `${charPart}${raiseText}`;
  }
}
