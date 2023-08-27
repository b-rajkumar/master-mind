class MasterMind {
  #hasWon;
  #guesses;
  #isGameOver;
  #currentAttempt;
  #numberOfAttempts;
  #secretColorCombination;

  constructor(secretColorCombination, numberOfAttempts = 10) {
    this.#guesses = [];
    this.#hasWon = false;
    this.#isGameOver = false;
    this.#currentAttempt = 0;
    this.#numberOfAttempts = numberOfAttempts;
    this.#secretColorCombination = secretColorCombination;
  }

  #getGuesses() {
    return this.#guesses.map(({ guess, result }) => {
      return { guess, result };
    });
  }

  #extractColorDetails(colorCombination) {
    return [...colorCombination.toUpperCase()].map(color => {
      return { color, isMatched: false };
    });
  }

  #analyseGuess(guess) {
    const colorCombination = guess.toUpperCase();
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

  #generateGameOverResult() {
    return {
      hasWon: this.#hasWon,
      isGameOver: this.#isGameOver,
      secretCombination: this.#secretColorCombination,
    };
  }

  #generateGuessResult(R, W) {
    const result = {
      R,
      W,
      hasWon: this.#hasWon,
      isGameOver: this.#isGameOver,
      attempt: this.#currentAttempt,
    };
    if (this.#isGameOver)
      result.secretCombination = this.#secretColorCombination;

    return result;
  }

  validateGuess(guess) {
    if (this.#isGameOver) return this.#generateGameOverResult();

    this.#currentAttempt += 1;
    const { R, W } = this.#analyseGuess(guess);

    if (this.#currentAttempt === this.#numberOfAttempts)
      this.#isGameOver = true;

    if (R === 5) {
      this.#hasWon = true;
      this.#isGameOver = true;
    }

    this.#guesses.push({ guess, result: { R, W } });
    const result = this.#generateGuessResult(R, W);

    return result;
  }

  gameStats() {
    const stats = {
      isGameOver: this.#isGameOver,
      hasWon: this.#hasWon,
      numberOfAttempts: this.#numberOfAttempts,
      attemptsLeft: this.#numberOfAttempts - this.#currentAttempt,
      guesses: this.#getGuesses(),
    };

    if (this.#isGameOver)
      stats.secretColorCombination = this.#secretColorCombination;

    return stats;
  }

  isGameOver() {
    return this.#isGameOver;
  }
}

module.exports = MasterMind;
