const jwtVerify = require("./Common/jwtVerification");

const updateStatus = () =>{
    document.getElementById("status").innerHTML("actif");
}
const HomeView = (req,res) => {
    console.log(req.cookies);
    if(jwtVerify(req.cookies)){
        res.render('Home',{
        updateStatus : updateStatus
    })
    }else{
        res.redirect("/");
    }
    
}
module.exports = {
    HomeView
}