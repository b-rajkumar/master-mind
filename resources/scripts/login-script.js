const showInvalidCredentials = () => {
  const loginErrorBox = document.querySelector("#login-error");
  loginErrorBox.classList.toggle("hide");
};

const handleResponse = res => {
  if (res.ok) return window.location.assign("/");
  showInvalidCredentials();
};

const handleLogin = (name, password) => {
  if (name && password) {
    fetch("/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, password }),
    }).then(handleResponse);
  }
};

const setupLogInButton = () => {
  const logInButton = document.querySelector("#login-btn");
  const nameBox = document.querySelector("input[name=name]");
  const passwordBox = document.querySelector("input[name=password]");

  logInButton.onclick = event => {
    event.preventDefault();

    const name = nameBox.value.trim();
    const password = passwordBox.value.trim();
    handleLogin(name, password);
  };
};

const main = () => {
  setupLogInButton();
};

window.onload = main;
