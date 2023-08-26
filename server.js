const createApp = require("./src/app");

const main = () => {
  const port = 9090;
  const app = createApp();

  app.listen(port, () => {
    const date = Date();
    // eslint-disable-next-line no-console
    console.log("Listening on", port, date);
  });
};

main();
