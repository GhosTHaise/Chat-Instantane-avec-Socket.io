const express = require("express");
const Router = express.Router();
const {LoginView} = require("../Controller/LoginController");

Router.get("/Login",LoginView);

//Renvoyer le router
module.exports = Router;