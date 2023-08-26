const logRequest = (req, res, next) => {
  // eslint-disable-next-line no-console
  console.log({ method: req.method, url: req.url });
  next();
};

module.exports = { logRequest };
