const getUserDetails = (token, req) => {
  const users = req.app.masterMindDB.getUsers();
  const userDetails = users.find(user => user.token === token);

  return userDetails;
};

const isUserPresent = (req, res, next) => {
  const userDetails = getUserDetails(req.cookies.token, req);
  if (userDetails) return next();

  res.redirect(302, "/login");
};

module.exports = { isUserPresent };
