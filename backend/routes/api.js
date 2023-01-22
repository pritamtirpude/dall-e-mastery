const { postRouter } = require("./postRoutes");
const { dalleRouter } = require("./dalleRoutes");

const express = require("express");

const api = express.Router();

api.use("/post", postRouter);
api.use("/dalle", dalleRouter);

module.exports = api;
