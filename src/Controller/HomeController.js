const jwtVerify = require("./Common/jwtVerification");
const fetch = require("node-fetch");
const updateStatus = () =>{
    document.getElementById("status").innerHTML("actif");
}
const LogOut_User = (res) => {
    /* fetch("http://localhost:5050/log-out-user",{method : "POST"}).then((res)=>{
        
        
    }); */
}
const HomeView = (req,res) => {
    console.log(req.cookies);
    let uic = "";
    if(jwtVerify(req.cookies,uic)){
        res.render('Home',{
        updateStatus : updateStatus,
        uic : uic,
        LogOut_User : LogOut_User
    })
    }else{
        res.redirect("/");
    }
    
}
module.exports = {
    HomeView
}