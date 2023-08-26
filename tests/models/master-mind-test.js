const { describe, it, beforeEach } = require("node:test");
const assert = require("assert");
const MasterMind = require("../../src/models/master-mind");

describe("MasterMind", () => {
  let masterMind;
  beforeEach(() => {
    const secretColorCombination = "RGBYW";
    const numberOfAttempts = 5;
    masterMind = new MasterMind(secretColorCombination, numberOfAttempts);
  });

  describe("gameStats", () => {
    it("should give the stats of the game", () => {
      const expectedGameStats = {
        isGameOver: false,
        hasWon: false,
        numberOfAttempts: 5,
        attemptsLeft: 5,
      };

      assert.deepStrictEqual(masterMind.gameStats(), expectedGameStats);
    });
  });

  describe("validateGuess", () => {
    it("should validate the given guess and give the analysis of guess", () => {
      const guessColorCombination = "ABCDE";
      const expectedGameStats = {
        isGameOver: false,
        hasWon: false,
        numberOfAttempts: 5,
        attemptsLeft: 4,
      };
      const guessResult = masterMind.validateGuess(guessColorCombination);

      assert.deepStrictEqual(guessResult, { R: 0, W: 1 });
      assert.deepStrictEqual(masterMind.gameStats(), expectedGameStats);
    });

    it("should give R count as 5 when the guess is correct", () => {
      const guessColorCombination = "RGBYW";
      const expectedGameStats = {
        secretColorCombination: "RGBYW",
        isGameOver: true,
        hasWon: true,
        numberOfAttempts: 5,
        attemptsLeft: 4,
      };
      const guessResult = masterMind.validateGuess(guessColorCombination);

      assert.deepStrictEqual(guessResult, { R: 5, W: 0 });
      assert.deepStrictEqual(masterMind.gameStats(), expectedGameStats);
    });

    it("should mark the colors matched in same position first", () => {
      const guessColorCombination = "GGGGG";
      const expectedGameStats = {
        isGameOver: false,
        hasWon: false,
        numberOfAttempts: 5,
        attemptsLeft: 4,
      };
      const guessResult = masterMind.validateGuess(guessColorCombination);

      assert.deepStrictEqual(guessResult, { R: 1, W: 0 });
      assert.deepStrictEqual(masterMind.gameStats(), expectedGameStats);
    });
  });

  it(`should reveal the secret color combination, if the user failed to 
  guess in given attempts`, () => {
    const guessColorCombination = "WRGBW";
    const expectedGameStats = {
      secretColorCombination: "RGBYW",
      isGameOver: true,
      hasWon: false,
      numberOfAttempts: 5,
      attemptsLeft: 0,
    };

    for (let i = 0; i < 5; i++) masterMind.validateGuess(guessColorCombination);

    assert.deepStrictEqual(masterMind.gameStats(), expectedGameStats);
  });
});
