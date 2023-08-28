const handleResponse = res => {
  const registerContainer = document.querySelector("#register-container");
  registerContainer.classList.remove("hide");

  if (res.ok) {
    registerContainer.innerText = "Registered Successfully";
    registerContainer.classList.add("green");
    return setTimeout(() => window.location.assign("/login"), 1000);
  }

  registerContainer.innerText = "Username already exists";
  registerContainer.classList.add("red");
};

const handleRegister = (name, password) => {
  if (name && password) {
    fetch("/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, password }),
    }).then(handleResponse);
  }
};

const setupRegisterButton = () => {
  const registerButton = document.querySelector("#register-btn");
  const nameBox = document.querySelector("input[name=name]");
  const passwordBox = document.querySelector("input[name=password]");

  registerButton.onclick = event => {
    event.preventDefault();

    const name = nameBox.value.trim();
    const password = passwordBox.value.trim();
    handleRegister(name, password);
  };
};

const main = () => {
  setupRegisterButton();
};

window.onload = main;
