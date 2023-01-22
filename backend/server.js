const express = require("express");
const cors = require("cors");
require("dotenv").config();

const api = require("./routes/api");

const mongoConnect = require("./services/mongoDB");

const app = express();

const PORT = process.env.PORT || 7866;

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1", api);

app.get("/", async (req, res) => {
  res.send("Hello from DALL-E!");
});

const startServer = async () => {
  try {
    await mongoConnect();
    app.listen(PORT, () => {
      console.log(`Server listening to port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
