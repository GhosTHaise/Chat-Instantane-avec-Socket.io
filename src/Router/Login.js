const express = require("express");
const Router = express.Router();
const {LoginView,LoginValidate,LogOut} = require("../Controller/LoginController");

Router.get("/",LoginView);
Router.post("/login_validate",LoginValidate);
Router.post("/log-out-user",LogOut);

//Renvoyer le router
module.exports = Router;