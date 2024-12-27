const express = require("express");
const route = express.Router();
const voteControllerr = require("../controllers/vote");
const { jwtAuthMiddleware,voterMiddleware } = require("../middlewares/roleMiddleware");

route.post("/vote", jwtAuthMiddleware,voterMiddleware, voteControllerr.vote);

module.exports = route;