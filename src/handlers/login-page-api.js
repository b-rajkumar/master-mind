const serveLoginPage = (req, res) => {
  res.sendFile(`${process.env.PWD}/resources/login.html`);
};

const registerUser = (req, res) => {
  const masterMindDB = req.app.masterMindDB;
  const users = masterMindDB.getUsers();
  const username = req.body.name;

  if (username) {
    if (!users.includes(username)) masterMindDB.registerUser(username);

    return res.cookie("name", username).redirect("/");
  }

  res
    .status(400)
    .end("Expected 'name=username' in urlencoded format as Request body");
};

module.exports = { serveLoginPage, registerUser };
