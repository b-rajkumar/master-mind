const isUserPresent = (req, res, next) => {
  const users = req.app.masterMindDB.getUsers();
  const username = req.cookies.name;
  if (users.includes(username) || req.url === "/login") return next();

  res.redirect(302, "/login");
};

module.exports = { isUserPresent };
