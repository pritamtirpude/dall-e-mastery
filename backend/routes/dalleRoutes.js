const express = require("express");
const { Configuration, OpenAIApi } = require("openai");

require("dotenv").config();

const dalleRouter = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openAI = new OpenAIApi(configuration);

dalleRouter.get("/", (req, res) => {
  res.send("Hello from DALLE");
});

dalleRouter.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openAI.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const image = aiResponse.data.data[0].b64_json;

    res.status(200).json({ photo: image });
  } catch (error) {
    console.log(error);
    res.send(500).send(error?.response.data.error.message);
  }
});
module.exports = { dalleRouter };
