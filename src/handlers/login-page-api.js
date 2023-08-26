const serveLoginPage = (req, res) => {
  res.sendFile(`${process.env.PWD}/resources/login.html`);
};

const registerUser = (req, res) => {
  const users = req.app.users;
  const username = req.body.name;
  if (username && !users.includes(username)) {
    req.app.users.push(username);
    return res.redirect("/");
  }

  res
    .status(400)
    .end("Expected 'name=username' in urlencoded way as Request body");
};

module.exports = { serveLoginPage, registerUser };
