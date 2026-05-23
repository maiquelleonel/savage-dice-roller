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

  const mockRandomSequence = (values) => {
    let i = 0;
    mockMathRandom.mockImplementation(() => {
      if (i < values.length) {
        return values[i++];
      }
      return 0.5;
    });
  };

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
      const res = rollExplodingDie(6);
      expect(res.total).toBe(3);
      expect(res.rolls).toEqual([3]);
    });

    test("should explode and sum results if max is rolled", () => {
      // 0.9 * 6 = 5.4 -> 6 (explode)
      // 0.1 * 6 = 0.6 -> 1
      // Total 7
      mockMathRandom.mockReturnValueOnce(0.9).mockReturnValueOnce(0.1);
      const res = rollExplodingDie(6);
      expect(res.total).toBe(7);
      expect(res.rolls).toEqual([6, 1]);
    });
  });

  describe("rollDice (Characteristic + Wild Die)", () => {
    test("should roll characteristic (d8) and wild die (d6) and return highest when includeWildDie is true", () => {
      // Char d8: 0.5 * 8 = 4 -> 5
      // Wild d6: 0.3 * 6 = 1.8 -> 2
      // Final: 5
      mockMathRandom.mockReturnValueOnce(0.5).mockReturnValueOnce(0.3);
      const result = rollDice("d8", true);
      expect(result.characteristic.total).toBe(5);
      expect(result.wild.total).toBe(2);
      expect(result.final).toBe(5);
    });

    test("should roll only characteristic die when includeWildDie is false", () => {
      mockRandomSequence([0.7]); // 0.7 * 8 = 5.6 -> 6
      const result = rollDice("d8", false);
      expect(result.characteristic.total).toBe(6);
      expect(result.wild.total).toBe(0);
      expect(result.final).toBe(6);
    });

    test("should return highest even if Wild Die explodes and beats Characteristic", () => {
      // Cenário: d10 tira 8 | Wild tira 6, explode e tira 5 (Total 11)
      // d10: (8-1+0.5)/10 = 0.75
      // Wild 1: (6-1+0.5)/6 = 0.916... (ou use 0.9)
      // Wild 2: (5-1+0.5)/6 = 0.75
      mockRandomSequence([0.75, 0.9, 0.75]);

      const result = rollDice("d10", true);

      expect(result.characteristic.total).toBe(8);
      expect(result.wild.total).toBe(11);
      expect(result.final).toBe(11);
      expect(result.wild.rolls).toEqual([6, 5]);
    });
  });
});

describe("Message Formatting Functions", () => {
  test("formatDiceResultMessage should format correctly with Wild Die (no explosion)", () => {
    const rollResult = {
      characteristic: { total: 5, rolls: [5] },
      wild: { total: 3, rolls: [3] },
      final: 5,
    };
    expect(formatDiceResultMessage(rollResult, "d8", true)).toBe(
      "5 (d8)\nW: 3 (d6)\nFinal: 5",
    );
  });

  test("formatDiceResultMessage should format correctly with explosions", () => {
    const rollResult = {
      characteristic: { total: 14, rolls: [8, 6] },
      wild: { total: 3, rolls: [3] },
      final: 14,
    };
    expect(formatDiceResultMessage(rollResult, "d8", true)).toBe(
      "14 = (d8 8 + d8 6)\nW: 3 (d6)\nFinal: 14",
    );
  });

  test("formatDiceResultMessage should format correctly with wild die explosion", () => {
    const rollResult = {
      characteristic: { total: 2, rolls: [2] },
      wild: { total: 11, rolls: [6, 5] },
      final: 11,
    };
    expect(formatDiceResultMessage(rollResult, "d4", true)).toBe(
      "2 (d4)\nW: 11 = (d6 6 + d6 5)\nFinal: 11",
    );
  });

  test("formatDiceResultMessage should format correctly without Wild Die", () => {
    const rollResult = {
      characteristic: { total: 7, rolls: [7] },
      wild: { total: 0, rolls: [] },
      final: 7,
    };
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
