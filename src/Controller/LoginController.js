const db = require("../Model/Firebase_Instance");
const firebase = require("firebase");
const auth = firebase.auth(db); 
const LoginView = (req,res) =>{
    res.render("Login",{
        //variable a transmettre
    });
}
const LoginValidate = (req,res) => {
    auth.signInWithEmailAndPassword(req.body.username,req.body.password).then((result) => {
        res.redirect("/");
    }).catch((err)=>{
        console.log("Une erreru s'est produite .");
        res.render("404Error",{
            //variable a trnsmettre
        })
    });
}

module.exports = {
    LoginView,
    LoginValidate
}