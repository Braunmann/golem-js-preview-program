import buildServer from "./server.mjs";

// I like conception that server, tts and app are separated across files
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
