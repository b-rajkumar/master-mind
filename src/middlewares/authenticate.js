const isUserPresent = (req, res, next) => {
  const users = req.app.masterMindDB.getUsers();
  const username = req.cookies.name;
  const validExtensions = ["html", "css", "js"];
  const extension = req.url.split(".").pop();
  const isExtensionValid = validExtensions.includes(extension);
  if (users.includes(username) || req.url === "/login" || isExtensionValid)
    return next();

  res.redirect(302, "/login");
};

module.exports = { isUserPresent };
