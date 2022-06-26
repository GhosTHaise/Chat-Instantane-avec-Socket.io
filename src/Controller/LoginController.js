const db = require("../Model/Firebase_Instance");
const firebase = require("firebase");
const crypto = require("crypto");
const auth = firebase.auth(db); 
const authTokens = {};
const LoginView = (req,res) =>{
    res.render("Login",{
        //variable a transmettre
    });
}
//Generer des tokens -> utliser jwt a la place
const generateToken = () => {
    return crypto.randomBytes(40).toString("hex");
}
const LoginValidate = (req,res) => {
    auth.signInWithEmailAndPassword(req.body.username,req.body.password).then((result) => {
        const token = generateToken();
        authTokens[token] = {username : req.body.username};
        //envoyer les donnees dana les cookies
        res.cookie('AuthToken',authTokens);
        res.redirect("/home-after-login");
    }).catch((err)=>{
        console.log("Une erreur s'est produite .");
        console.log(generateToken());
        res.render("Login",{
            message : "Invalid username or password"
        })
    });
}

module.exports = {
    LoginView,
    LoginValidate
}