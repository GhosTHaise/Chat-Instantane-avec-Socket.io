const express = require('express');
const Router = express.Router();
const {HomeView} = require("../Controller/HomeController");

Router.get('/home-after-login',HomeView);

module.exports = Router;