const colorMapping = {
  R: "red",
  G: "green",
  B: "blue",
  W: "#dddddd",
  O: "orange",
  P: "purple",
  Y: "yellow",
  N: "brown",
};

const generateCircle = (color, radius) => {
  return `<svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
  >
    <circle cx="20" cy="20" r="${radius}" fill=${color} />
  </svg>`;
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
    box.innerHTML = generateCircle(colorName, 18);
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
    box.innerHTML = generateCircle(colorName, 12);
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

const displayPlayername = () => {
  const usernameContainer = document.querySelector("#username");
  const cookies = extractCookies(document.cookie);
  usernameContainer.innerText = cookies.name;
};

const main = () => {
  startGame();
  displayPlayername();
  setupSubmitButton();
};

window.onload = main;
