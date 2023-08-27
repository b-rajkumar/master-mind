const setupStartButton = () => {
  const startButton = document.querySelector("#start-btn");
  startButton.onclick = () => {
    window.location.assign("http://localhost:9090/game");
  };
};

const main = () => {
  setupStartButton();
};

window.onload = main;
