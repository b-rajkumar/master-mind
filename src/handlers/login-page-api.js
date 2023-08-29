const isUserPresent = req => {
  const users = req.app.masterMindDB.getUsers();
  const name = req.cookies.name;
  const token = req.cookies.token;

  const userDetails = users.find(user => {
    return user.token === token && user.name === name;
  });

  return userDetails;
};

const serveLoginPage = (req, res) => {
  if (isUserPresent(req)) return res.redirect(302, "/");

  res.sendFile(`${process.env.PWD}/private/login-page.html`);
};

const getUserDetails = (name, password, req) => {
  const masterMindDB = req.app.masterMindDB;
  const users = masterMindDB.getUsers();
  const userDetails = users.find(user => {
    return user.name === name && user.password === password;
  });

  return userDetails;
};

const logInUser = (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const userDetails = getUserDetails(name, password, req);

  if (userDetails) {
    return res
      .cookie("token", userDetails.token)
      .cookie("name", name)
      .redirect("/");
  }

  res.status(400).send({ message: "User login credentials not found" });
};

const logOutUser = (req, res) => {
  const name = req.cookies.name;
  const token = req.cookies.token;

  return res
    .clearCookie("token", token)
    .clearCookie("name", name)
    .redirect("/login");
};

module.exports = { serveLoginPage, logInUser, logOutUser };
