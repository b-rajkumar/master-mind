const isUserPresent = (req, res, next) => {
  const users = req.app.masterMindDB.getUsers();
  const name = req.cookies.name;
  const token = req.cookies.token;

  const userDetails = users.find(user => {
    return user.token === token && user.name === name;
  });

  if (userDetails && name && token) return next();

  res.redirect(302, "/login");
};

module.exports = { isUserPresent };
