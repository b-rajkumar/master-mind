const colorMapping = {
  R: "red",
  G: "green",
  B: "blue",
  W: "white",
  O: "orange",
  P: "purple",
  Y: "yellow",
  N: "brown",
};

const displayResult = (hasWon, secretCombination) => {
  const resultBox = document.querySelector("#result-box");
  if (hasWon) {
    resultBox.innerText = "You Won!";
    return;
  }

  resultBox.innerText = `You failed to guess "${secretCombination}"`;
};

const extractCookies = cookiesData => {
  if (cookiesData === "") return {};
  const cookiePairs = cookiesData.split("; ").map(kv => kv.split("="));

  return Object.fromEntries(cookiePairs);
};

const updateAttempts = (rowNumber, guess) => {
  const attemptsContainer = document.querySelector("#attempts");
  const row = attemptsContainer.querySelectorAll(".row")[rowNumber - 1];
  const boxes = row.children;

  Array.from(guess).forEach((color, i) => {
    const colorName = colorMapping[color];
    const box = boxes[i];
    box.classList.add(colorName);
  });
};

const updateResult = (rowNumber, R, W) => {
  const resultContainer = document.querySelector("#result");
  const row = resultContainer.querySelectorAll(".row")[rowNumber - 1];
  const boxes = row.children;
  const colorCombination = "R".repeat(R) + "W".repeat(W);

  Array.from(colorCombination).forEach((color, i) => {
    const colorName = colorMapping[color];
    const box = boxes[i];
    box.classList.add(colorName);
  });
};

const submitResult = guess => {
  const cookies = extractCookies(document.cookie);
  const name = cookies.name;

  fetch("/game/validate-guess", {
    method: "POST",
    body: JSON.stringify({ guess }),
    headers: {
      cookie: `name=${name}`,
      "content-type": "application/json",
    },
  })
    .then(res => res.json())
    .then(
      ({ attempt: rowNumber, R, W, isGameOver, hasWon, secretCombination }) => {
        updateAttempts(rowNumber, guess);
        updateResult(rowNumber, R, W);
        if (isGameOver) displayResult(hasWon, secretCombination);
      }
    );
};

const setupSubmitButton = () => {
  const submitButton = document.querySelector("#submit-btn");
  const inputBox = document.querySelector("#input-box");

  submitButton.onclick = () => {
    const guess = inputBox.value;
    if (guess.length !== 5) return;

    submitResult(guess.toUpperCase());
    inputBox.value = "";
  };
};

const startGame = () => {
  fetch("/game/start")
    .then(res => res.json())
    .then(({ guesses }) => {
      guesses.forEach(({ guess, result }, i) => {
        const rowNumber = i + 1;
        updateAttempts(rowNumber, guess);
        updateResult(rowNumber, result.R, result.W);
      });
    });
};

const main = () => {
  setupSubmitButton();
  startGame();
};

window.onload = main;
