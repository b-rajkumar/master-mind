const { describe, it } = require("node:test");
const assert = require("assert");
const MasterMind = require("../../src/models/master-mind");

describe("MasterMind", () => {
  it("should consider 10 attempts as default attempts count", () => {
    const masterMind = new MasterMind("RGBYW");
    const expectedGameStats = {
      isGameOver: false,
      hasWon: false,
      numberOfAttempts: 10,
      attemptsLeft: 10,
      guesses: [],
    };

    assert.deepStrictEqual(masterMind.gameStats(), expectedGameStats);
  });

  it("should reveal the color combination, if the user failed to guess", () => {
    const masterMind = new MasterMind("RGBYW", 5);
    const guessColorCombination = "WRGBW";
    const expectedGameStats = {
      secretColorCombination: "RGBYW",
      isGameOver: true,
      hasWon: false,
      numberOfAttempts: 5,
      attemptsLeft: 0,
      guesses: [
        {
          guessColorCombination: "WRGBW",
          result: { R: 1, W: 3 },
        },
        {
          guessColorCombination: "WRGBW",
          result: { R: 1, W: 3 },
        },
        {
          guessColorCombination: "WRGBW",
          result: { R: 1, W: 3 },
        },
        {
          guessColorCombination: "WRGBW",
          result: { R: 1, W: 3 },
        },
        {
          guessColorCombination: "WRGBW",
          result: { R: 1, W: 3 },
        },
      ],
    };

    for (let i = 0; i < 5; i++) masterMind.validateGuess(guessColorCombination);

    assert.deepStrictEqual(masterMind.gameStats(), expectedGameStats);
  });

  describe("gameStats", () => {
    it("should give the stats of the game", () => {
      const masterMind = new MasterMind("RGBYW", 5);
      masterMind.validateGuess("RGNOW");
      masterMind.validateGuess("YWBGR");

      const expectedGameStats = {
        isGameOver: false,
        hasWon: false,
        numberOfAttempts: 5,
        attemptsLeft: 3,
        guesses: [
          {
            guessColorCombination: "RGNOW",
            result: {
              R: 3,
              W: 0,
            },
          },
          {
            guessColorCombination: "YWBGR",
            result: {
              R: 1,
              W: 4,
            },
          },
        ],
      };

      assert.deepStrictEqual(masterMind.gameStats(), expectedGameStats);
    });
  });

  describe("validateGuess", () => {
    it("should validate the given guess and give the analysis of guess", () => {
      const masterMind = new MasterMind("RGBYW", 5);
      const guessColorCombination = "NRNOO";
      const guessResult = masterMind.validateGuess(guessColorCombination);

      assert.deepStrictEqual(guessResult, {
        R: 0,
        W: 1,
        isGameOver: false,
        hasWon: false,
      });
    });

    it("should give R count as 5 when the guess is correct", () => {
      const masterMind = new MasterMind("RGBYW", 5);
      const guessColorCombination = "RGBYW";
      const guessResult = masterMind.validateGuess(guessColorCombination);

      assert.deepStrictEqual(guessResult, {
        R: 5,
        W: 0,
        isGameOver: true,
        hasWon: true,
      });
    });

    it("should mark the colors matched in same position first", () => {
      const masterMind = new MasterMind("RGBYW", 5);
      const guessColorCombination = "GGGGG";
      const guessResult = masterMind.validateGuess(guessColorCombination);

      assert.deepStrictEqual(guessResult, {
        R: 1,
        W: 0,
        isGameOver: false,
        hasWon: false,
      });
    });

    it("should give the game over stats, if the attempts left is 0", () => {
      const masterMind = new MasterMind("RGBYW", 1);
      const guessColorCombination = "GGGGG";
      masterMind.validateGuess(guessColorCombination);
      const guessResult = masterMind.validateGuess(guessColorCombination);

      assert.deepStrictEqual(guessResult, {
        isGameOver: true,
        hasWon: false,
      });
    });
  });
});
