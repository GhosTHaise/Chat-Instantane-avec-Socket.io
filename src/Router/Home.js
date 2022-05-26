const express = require('express');
const Router = express.Router();
const {HomeView} = require("../Controller/HomeController");

Router.get('/',HomeView);

module.exports = Router;