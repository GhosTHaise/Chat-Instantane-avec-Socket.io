//Initialiser le server
const express = require("express"),
      body_parser = require("body-parser"),
      io = require("socket.io"),
      PORT  = process.env.PORT || 5050,
      app = new express();
//
//Middleware
app.use(express.json());
app.use(body_parser.json());
app.use(body_parser.urlencoded());
//
//Moteur de template
app.set("view engine","ejs");
app.set("views","./src/Views")
//Mes imports
app.use("/icon",express.static("./src/Views/Assets/Icon"));
app.use("/style",express.static("./src/Views/Assets/Styles"));
//
//Mes Routes
app.use("/",require('./src/Router/Home'));
//

app.listen(PORT,() =>{
    console.log(`Your app is start on http://localhost:${PORT}`);
})