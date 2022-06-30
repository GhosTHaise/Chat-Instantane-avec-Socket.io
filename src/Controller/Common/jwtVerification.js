require("dotenv").config();
const jwt = require("jsonwebtoken"),
      {JWT_KEY} = process.env;
//jwt verification

const jwtVerify = (cookies,recuperation) =>{
    if(typeof cookies == "undefined"){
        return false;
    }
    try{
        const decoded = jwt.verify(cookies.JWT,JWT_KEY);
        //traaitement necessaire
        console.log(decoded);
        recuperation = decoded.jti;
        return true;
    }catch(err){
        console.log("Erreur innatendu : "+err);
        return false;
    }
} 

module.exports = jwtVerify;