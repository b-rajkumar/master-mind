const serveRegisterPage = (_, res) => {
  res.sendFile(`${process.env.PWD}/private/register-page.html`);
};

const getUserDetails = (name, req) => {
  const masterMindDB = req.app.masterMindDB;
  const users = masterMindDB.getUsers();
  const userDetails = users.find(user => user.name === name);

  return userDetails;
};

const registerUser = (req, res) => {
  const name = req.body.name;
  const password = req.body.password;

  if (!(name && password)) {
    return res
      .status(400)
      .end("The name and password must be passed in json format");
  }

  const userDetails = getUserDetails(name, req);
  if (!userDetails) {
    req.app.masterMindDB.registerUser(name, password);
    return res.redirect("/login");
  }

  res.status(400).end("User already registered");
};
module.exports = { serveRegisterPage, registerUser };
