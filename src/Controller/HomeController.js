const updateStatus = () =>{
    document.getElementById("status").innerHTML("actif");
}
const HomeView = (req,res) => {
    res.render('Home',{
        updateStatus : updateStatus
    })
}
module.exports = {
    HomeView
}