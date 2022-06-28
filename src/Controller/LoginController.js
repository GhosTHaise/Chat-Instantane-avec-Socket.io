const db = require("../Model/Firebase_Instance");
const firebase = require("firebase");
const crypto = require("crypto");
const auth = firebase.auth(db); 
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
        console.log(err)
    });
}

module.exports = {
    LoginView,
    LoginValidate
}