const isUserPresent = (req, res, next) => {
  const users = req.app.users;
  const username = req.cookies.name;
  if (users.includes(username)) {
    next();
    return;
  }

  res.redirect(302, "/login");
};

module.exports = { isUserPresent };
