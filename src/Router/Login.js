const express = require("express");
const Router = express.Router();
const {LoginView,LoginValidate} = require("../Controller/LoginController");

Router.get("/",LoginView);
Router.post("/login_validate",LoginValidate);
//Renvoyer le router
module.exports = Router;