const express = require("express");
const { resumeRoutes } = require("./resume.routes");
const { authRoutes } = require("./auth.routes");

const router = express.Router();

function appRouterV1() {
  authRoutes(router);
  resumeRoutes(router);
  return router;
}

module.exports = { appRouterV1 };
