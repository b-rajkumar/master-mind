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

const displayLoginInfo = () => {
  const cookies = extractCookies(document.cookie);
  const name = cookies.name;
  if (name) displayLogoutControls(name);
};

const main = () => {
  displayLoginInfo();
  setupStartButton();
};

window.onload = main;
