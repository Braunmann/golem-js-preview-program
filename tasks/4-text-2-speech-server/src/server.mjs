// Golem Network Image ID: 1e88943d64a9175ab9855ebb2d628b4728b6656b2730541899d15b63

import express from "express";
import tts from "./tts.mjs";
import * as uuid from "uuid";
import path from "path";

function buildServer() {
  const app = express();
  app.use("/tts", async (req, res) => {
    const query = req.query;
    let text = query.q;
    if (!text) {
      return res.status(400).json({ error: "Missing query parameter 'q'" });
    }

    // generate a uuid for the filename
    const id = uuid.v4();
    const filepath = path.join('output', `result-${id}.mp3`);
    try {
      await tts(text, filepath);
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
