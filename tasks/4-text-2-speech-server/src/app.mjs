import buildServer from "./server.mjs";

const PORT = 3000;

const server = buildServer();

(async function () {
  try {
    server.listen(PORT, () => {
      console.info(`Server started on port ${PORT}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
