const parseCookies = (req, res, next) => {
  const rawCookies = req.headers.cookie;
  if (!rawCookies) {
    req.cookies = {};
    next();
    return;
  }
  const cookiePairs = rawCookies.split("; ").map(kv => kv.split("="));
  req.cookies = Object.fromEntries(cookiePairs);

  next();
};

module.exports = { parseCookies };
