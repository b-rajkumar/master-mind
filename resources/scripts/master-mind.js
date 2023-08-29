const colorMapping = {
  R: "#b30000",
  G: "#009900",
  B: "#0055cc",
  W: "#dddddd",
  O: "#e66f00",
  P: "#9200cc",
  Y: "#cbb100",
  N: "#994f1a",
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
    box.innerHTML = generateCircle(colorName, 20);
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
    box.innerHTML = generateCircle(colorName, 15);
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

const setupInput = () => {
  const inputTextBox = document.querySelector("#input-box");
  inputTextBox.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      const guess = inputTextBox.value.toUpperCase();
      const validInputPattern = /[RGBWYOPN]{5}/;

      if (validInputPattern.test(guess)) {
        inputTextBox.value = "";
        inputTextBox.focus();
        submitResult(guess);
      }
    }
  });
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

const sendLogoutReq = () => {
  fetch("/logout", { method: "POST" }).then(res => {
    if (res.ok) window.location.assign("/login");
  });
};

const displayLogoutControls = name => {
  const loginControlsContainer = document.querySelector("#login-controls");
  const logoutButton = document.querySelector("#logout-btn");
  logoutButton.onclick = sendLogoutReq;
  const displayName = name[0].toUpperCase() + name.slice(1).toLowerCase();
  loginControlsContainer.prepend(displayName);
};

const displayLoginInfo = () => {
  const cookies = extractCookies(document.cookie);
  const name = cookies.name;
  if (name) displayLogoutControls(name);
};

const generateBoxElement = (boxType, radius) => {
  return `<div class="${boxType}">
 <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"
viewBox="0 0 40 40" fill="none">
 <g filter="url(#filter0_i_109_219)">
   <g filter="url(#filter1_i_109_219)">
     <circle cx="20" cy="20" r="${radius}" fill="#474646" />
   </g>
 </g>
 <defs>
   <filter id="filter0_i_109_219" x="0" y="0" width="40" height="40"
    filterUnits="userSpaceOnUse"
     color-interpolation-filters="sRGB">
     <feFlood flood-opacity="0" result="BackgroundImageFix" />
     <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" 
     result="shape" />
     <feColorMatrix in="SourceAlpha" type="matrix" 
     values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
       result="hardAlpha" />
     <feOffset dy="5" />
     <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
       <feColorMatrix type="matrix"
  values="0 0 0 0 0.0666667 0 0 0 0 0.0666667 0 0 0 0 0.0666667 0 0 0 0.4 0" />
  <feBlend mode="normal" in2="shape" result="effect1_innerShadow_109_219" />
     </filter>
     <filter id="filter1_i_109_219" x="0" y="0" width="40"
      height="44" filterUnits="userSpaceOnUse"
       color-interpolation-filters="sRGB">
       <feFlood flood-opacity="0" result="BackgroundImageFix" />
       <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" 
       result="shape" />
       <feColorMatrix in="SourceAlpha" type="matrix"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
         result="hardAlpha" />
       <feOffset dy="4" />
       <feGaussianBlur stdDeviation="2" />
       <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
       <feColorMatrix type="matrix"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
       <feBlend mode="normal" in2="shape"
        result="effect1_innerShadow_109_219" />
     </filter>
   </defs>
 </svg>
</div>`;
};

const generateRowElement = (boxType, radius) => {
  const rowElement = document.createElement("div");
  rowElement.classList.add("row");

  const boxElement = generateBoxElement(boxType, radius);
  rowElement.innerHTML = boxElement.repeat(5);

  return rowElement;
};

const renderRows = (attemptsContainer, boxType, radius) => {
  for (let i = 0; i < 10; i++) {
    const rowElement = generateRowElement(boxType, radius);
    attemptsContainer.append(rowElement);
  }
};

const renderBoard = () => {
  const attemptsContainer = document.querySelector("#attempts");
  const resultContainer = document.querySelector("#result");

  renderRows(attemptsContainer, "box", 20);
  renderRows(resultContainer, "small-box", 15);
};

const setupHelpButton = () => {
  const helpButton = document.querySelector("#help-btn");
  helpButton.onclick = () => {
    const gameRulesContainer = document.querySelector("#game-rules");
    gameRulesContainer.classList.toggle("hide");
  };
};

const main = () => {
  renderBoard();
  startGame();
  displayLoginInfo();
  setupInput();
  setupHelpButton();
};

window.onload = main;
