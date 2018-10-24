const express = require("express");
const app = express();
const appConfig = require("./config/main-config.js");
const routeConfig = require("./config/route-config.js");
const secretKey = process.env.SECRET_STRIPE_API_KEY;

appConfig.init(app, express);
routeConfig.init(app);


module.exports = app;
