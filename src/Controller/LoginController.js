const db = require("../Model/Firebase_Instance");
const firebase = require("firebase");
const crypto = require("crypto");
const auth = firebase.auth(db); 
const jwt = require("jsonwebtoken");
require("dotenv").config();

//JWT variable
const { JWT_KEY ,
        JWT_ISS ,
        JWT_AUD ,
        JWT_ALGO } = process.env;
//Login View
const LoginView = (req,res) =>{
    res.render("Login",{
        //variable a transmettre
    });
}
//Generer des tokens -> utliser jwt a la place
const generateToken = () => {
    return crypto.randomBytes(15).toString("hex");
}

//recuperer le timestamp actuel
const actuel_timestamp = (date = Date()) => {
    return Math.floor(date / 1000);
}
//Generer JWt token
const jwtSign = (email) => {
    return jwt.sign({
        //Obligatoire
        iat : actuel_timestamp(),
        nbr : actuel_timestamp(),
        exp : actuel_timestamp() + 3600,//valide pour seulement 1h => test release,
        jti : generateToken(),
        iss : JWT_ISS,//Le proprietaire de l'appli
        aud : JWT_AUD,//Audience -> site
        //Autre que nous voulons mettre
        data : {email : email}
    },JWT_KEY,{algorithm : JWT_ALGO});
}

//Login validation
const LoginValidate = (req,res) => {
    auth.signInWithEmailAndPassword(req.body.username,req.body.password).then((result) => {
        const token = generateToken();
        const authTokens = {};
        authTokens[token] = {username : req.body.username};
        //envoyer les donnees dana les cookies
        res.cookie('AuthToken',authTokens);
        res.redirect("/home-after-login");
    }).catch((err)=>{
        console.log("Une erreur s'est produite .");
        res.render("Login",{
            message : "Invalid username or password"
        });
        console.log(err);
    });
}

module.exports = {
    LoginView,
    LoginValidate
}