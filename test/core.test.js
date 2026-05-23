import { describe, test, expect, spyOn, afterEach, beforeEach } from "bun:test";
import {
  rollSingleDie,
  rollExplodingDie,
  rollDice,
  createDeck,
  shuffleDeck,
  drawCard,
  deck,
  suits,
  ranks,
  formatDiceResultMessage,
} from "../src/core.js";

describe("Dice Rolling Functions", () => {
  const mockMathRandom = spyOn(Math, "random");

  afterEach(() => {
    mockMathRandom.mockClear();
  });

  test("rollSingleDie should return a number between 1 and size (inclusive)", () => {
    // Para obter 4 em d6: Math.random() = 0.5 -> floor(0.5 * 6) + 1 = 3 + 1 = 4
    mockMathRandom.mockReturnValue(0.5);
    expect(rollSingleDie(6)).toBe(4);

    // Para obter 6 em d10: Math.random() = 0.5 -> floor(0.5 * 10) + 1 = 5 + 1 = 6
    mockMathRandom.mockReturnValue(0.5);
    expect(rollSingleDie(10)).toBe(6);

    // Para obter o valor máximo (6 em d6): Math.random() = 0.99 -> floor(5.94) + 1 = 6
    mockMathRandom.mockReturnValue(0.99);
    expect(rollSingleDie(6)).toBe(6);

    // Para obter o valor mínimo (1 em d6): Math.random() = 0.01 -> floor(0.06) + 1 = 1
    mockMathRandom.mockReturnValue(0.01);
    expect(rollSingleDie(6)).toBe(1);
  });

  describe("rollExplodingDie", () => {
    test("should roll once if no explosion occurs", () => {
      // 0.4 * 6 = 2.4 -> floor(2.4) + 1 = 3
      mockMathRandom.mockReturnValueOnce(0.4);
      expect(rollExplodingDie(6)).toBe(3);
    });

    test("should explode and sum results if max is rolled", () => {
      // 0.9 * 6 = 5.4 -> 6 (explode)
      // 0.1 * 6 = 0.6 -> 1
      // Total 7
      mockMathRandom.mockReturnValueOnce(0.9).mockReturnValueOnce(0.1);
      expect(rollExplodingDie(6)).toBe(7);
    });
  });

  describe("rollDice (Characteristic + Wild Die)", () => {
    test("should roll characteristic (d8) and wild die (d6) and return highest when includeWildDie is true", () => {
      // Char d8: 0.5 * 8 = 4 -> 5
      // Wild d6: 0.3 * 6 = 1.8 -> 2
      // Final: 5
      mockMathRandom.mockReturnValueOnce(0.5).mockReturnValueOnce(0.3);
      const result = rollDice("d8", true);
      expect(result.characteristic).toBe(5);
      expect(result.wild).toBe(2);
      expect(result.final).toBe(5);
    });

    test("should roll only characteristic die when includeWildDie is false", () => {
      mockMathRandom.mockReturnValueOnce(0.7); // 0.7 * 8 = 5.6 -> 6
      const result = rollDice("d8", false);
      expect(result.characteristic).toBe(6);
      expect(result.wild).toBe(0);
      expect(result.final).toBe(6);
    });
  });
});

describe("Message Formatting Functions", () => {
  test("formatDiceResultMessage should format correctly with Wild Die", () => {
    const rollResult = { characteristic: 5, wild: 3, final: 5 };
    expect(formatDiceResultMessage(rollResult, "d8", true)).toBe(
      "5 = (5 || 3)",
    );
  });

  test("formatDiceResultMessage should format correctly without Wild Die", () => {
    const rollResult = { characteristic: 7, wild: 0, final: 7 };
    expect(formatDiceResultMessage(rollResult, "d10", false)).toBe("7 (d10)");
  });
});

describe("Deck Management Functions", () => {
  beforeEach(() => {
    createDeck();
  });

  test("createDeck should initialize a deck with 54 cards (52 + 2 Jokers)", () => {
    expect(deck).toHaveLength(54);
    expect(deck).toContain("Ace of ♠️");
  });

  test("shuffleDeck should change the order of cards", () => {
    const originalDeck = [...deck];
    shuffleDeck();
    expect(deck).toHaveLength(54);
    // Nota: há uma chance ínfima de o shuffle resultar na mesma ordem,
    // mas para testes unitários isso é aceitável.
    expect(deck).not.toEqual(originalDeck);
  });

  test("drawCard should remove a card from the deck", () => {
    const initialLength = deck.length;
    const card = drawCard();
    expect(typeof card).toBe("string");
    expect(deck).toHaveLength(initialLength - 1);
  });

  test('drawCard should return "No cards left" when the deck is empty', () => {
    while (deck.length > 0) {
      drawCard();
    }
    expect(drawCard()).toBe("No cards left");
  });
});
