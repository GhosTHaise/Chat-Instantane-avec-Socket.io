const db = require("../Model/Firebase_Instance"),
        firebase = require("firebase"),
        crypto = require("crypto"),
        auth = firebase.auth(db),
        jwt = require("jsonwebtoken"),
        jwtVerify = require("./Common/jwtVerification");

//dotenv
require("dotenv").config();

//JWT variable
const { JWT_KEY ,
        JWT_ISS ,
        JWT_AUD ,
        JWT_ALGO } = process.env;

//Generer des tokens -> utliser jwt a la place
const generateToken = () => {
    return crypto.randomBytes(15).toString("hex");
}

//recuperer le timestamp actuel
const actuel_timestamp = (date = Date.now()) => {
    return Math.floor(date / 1000);
}
//Generer JWt token
const jwtSign = (email) => {
    console.log(actuel_timestamp());
    return jwt.sign({
        //Obligatoire
        iat : actuel_timestamp(),
        nbr : actuel_timestamp(),
        exp : (actuel_timestamp() + 3600),//valide pour seulement 1h => test release,
        jti : generateToken(),
        iss : JWT_ISS,//Le proprietaire de l'appli
        aud : JWT_AUD,//Audience -> site
        //Autre que nous voulons mettre
        data : {email : email}
    },JWT_KEY,{algorithm : JWT_ALGO});
}

/* Mes fonctions de login_rooter */
//Login View
const LoginView = (req,res) =>{
    console.log(req.cookies)
    if(req.cookies){
        if(jwtVerify(req.cookies)){
             res.redirect("/home-after-login");
        }else{
             res.clearCookie();
        }
    }
    res.render("Login",{
        //variable a transmettre
    });
}

//Login validation
const LoginValidate = (req,res) => {
    auth.signInWithEmailAndPassword(req.body.username,req.body.password).then((result) => {
        //envoyer les donnees dana les cookies
        res.cookie('JWT',jwtSign(req.body.username));
        res.redirect("/home-after-login");
    }).catch((err)=>{
        console.log("Une erreur s'est produite ."+err);
        res.redirect("/"); 
    });
}

module.exports = {
    LoginView,
    LoginValidate
}