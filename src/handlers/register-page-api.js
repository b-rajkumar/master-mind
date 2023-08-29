const isUserPresent = req => {
  const users = req.app.masterMindDB.getUsers();
  const name = req.cookies.name;
  const token = req.cookies.token;

  const userDetails = users.find(user => {
    return user.token === token && user.name === name;
  });

  return userDetails;
};

const serveRegisterPage = (req, res) => {
  if (isUserPresent(req)) return res.redirect(302, "/");

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
      .send({ message: "The name and password must be passed in json format" });
  }

  const userDetails = getUserDetails(name, req);

  if (!userDetails) {
    const token = req.app.masterMindDB.registerUser(name, password);
    return res.cookie("token", token).cookie("name", name).redirect("/");
  }

  return res.status(400).send({ message: "Username already taken" });
};
module.exports = { serveRegisterPage, registerUser };
