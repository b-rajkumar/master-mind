const extractCookies = cookiesData => {
  if (cookiesData === "") return {};
  const cookiePairs = cookiesData.split("; ").map(kv => kv.split("="));

  return Object.fromEntries(cookiePairs);
};

const displayPlayername = () => {
  const usernameContainer = document.querySelector("#username");
  const cookies = extractCookies(document.cookie);
  usernameContainer.innerText = cookies.name;
};

const setupStartButton = () => {
  const startButton = document.querySelector("#start-btn");
  startButton.onclick = () => {
    window.location.assign("/game");
  };
};

const main = () => {
  displayPlayername();
  setupStartButton();
};

window.onload = main;
