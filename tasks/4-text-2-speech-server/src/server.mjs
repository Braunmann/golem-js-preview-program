// I kave changed server to expressJS becouse is the most popular framework, but it is just cosmetic change
import express from "express";
import tts from "./tts.mjs";
import * as uuid from "uuid";
import path from "path";

function buildServer() {
  const app = express();
  // I have removed the heartbeat endpoint, it was no the part of the task
  app.use("/tts", async (req, res) => {
    const query = req.query;
    let text = query.q;
    if (!text) {
      return res.status(400).json({ error: "Missing query parameter 'q'" });
    }

    // generate a uuid for the filename
    const id = uuid.v4();
    const filepath = path.join('output', `result-${id}.mp3`);
    // I have added the error handling
    try {
      await tts(text, filepath);
      // I have changed the response with id after generation file to, then this file
      return res.download(path.join(filepath));
    } catch (e) {
      return res.status(500).json({ error: "Error occurred during generating mp3 file" });
    }
  });

  app.use((req, res) => {
    res.status(500).json({ message: "Internal server error" });
  });

  return app;
}

export default buildServer;
