class MasterMind {
  #hasWon;
  #isGameOver;
  #attemptsLeft;
  #numberOfAttempts;
  #secretColorCombination;

  constructor(secretColorCombination, numberOfAttempts = 10) {
    this.#hasWon = false;
    this.#isGameOver = false;
    this.#attemptsLeft = numberOfAttempts;
    this.#numberOfAttempts = numberOfAttempts;
    this.#secretColorCombination = secretColorCombination;
  }

  #extractColorDetails(colorCombination) {
    return [...colorCombination.toUpperCase()].map(color => {
      return { color, isMatched: false };
    });
  }

  #analyseGuessColorCombination(colorCombination) {
    const result = { R: 0, W: 0 };
    const secretColorCombination = this.#extractColorDetails(
      this.#secretColorCombination
    );

    secretColorCombination.forEach((colorDetails, i) => {
      const isColorMatched = colorDetails.color === colorCombination[i];
      if (isColorMatched) {
        result.R += 1;
        colorDetails.isMatched = true;
      }
    });

    secretColorCombination.forEach(colorDetails => {
      const isColorPresent = colorCombination.includes(colorDetails.color);
      if (!colorDetails.isMatched && isColorPresent) {
        result.W += 1;
        colorDetails.isMatched = true;
      }
    });

    return result;
  }

  validateGuess(guessColorCombination) {
    this.#attemptsLeft -= 1;
    if (this.#attemptsLeft === 0) this.#isGameOver = true;

    const colorCombination = guessColorCombination.toUpperCase();
    const result = this.#analyseGuessColorCombination(colorCombination);
    if (result.R === 5) {
      this.#hasWon = true;
      this.#isGameOver = true;
    }

    return result;
  }

  gameStats() {
    const stats = {
      isGameOver: this.#isGameOver,
      hasWon: this.#hasWon,
      numberOfAttempts: this.#numberOfAttempts,
      attemptsLeft: this.#attemptsLeft,
    };

    if (this.#isGameOver)
      stats.secretColorCombination = this.#secretColorCombination;

    return stats;
  }
}

module.exports = MasterMind;
