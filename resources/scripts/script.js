const setupStartButton = () => {
  const startButton = document.querySelector("#start-btn");
  startButton.onclick = () => {
    window.location.assign("/game");
  };
};

const extractCookies = cookiesData => {
  if (cookiesData === "") return {};
  const cookiePairs = cookiesData.split("; ").map(kv => kv.split("="));

  return Object.fromEntries(cookiePairs);
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
  loginControlsContainer.prepend(`Welcome ${displayName}`);
};

const displayTableRow = ({
  id,
  secretCombination,
  numberOfAttempts,
  attemptsLeft,
  hasWon,
}) => {
  const attemptsTaken = numberOfAttempts - attemptsLeft;
  const gameStatus = hasWon ? "won" : "lost";
  const trElement = document.createElement("tr");

  const rowTemplate = ` 
          <td>${id}</td>
          <td>${secretCombination}</td>
          <td>${numberOfAttempts}</td>
          <td>${attemptsTaken}</td>
          <td>${gameStatus}</td>`;

  trElement.innerHTML = rowTemplate;

  return trElement;
};

const renderStats = tableData => {
  const statsContainer = document.querySelector("#player-stats");
  const rowElements = tableData.map((rowData, i) =>
    displayTableRow({ ...rowData, id: i + 1 })
  );
  statsContainer.append(...rowElements);
};

const displayNoStatsMsg = () => {
  const statsTable = document.querySelector("#player-stats-table");
  statsTable.classList.add("hide");

  const noStatsMsgContainer = document.querySelector("#player-stats-msg");
  noStatsMsgContainer.classList.remove("hide");
};

const displayPlayerStats = name => {
  fetch(`/player-stats/${name}`)
    .then(res => res.json())
    .then(({ games }) => {
      if (games) return renderStats(games);

      displayNoStatsMsg();
    });
};

const displayPlayerDetails = () => {
  const cookies = extractCookies(document.cookie);
  const name = cookies.name;
  if (name) displayLogoutControls(name);

  displayPlayerStats(name);
};

const main = () => {
  setupStartButton();
  displayPlayerDetails();
};

window.onload = main;
