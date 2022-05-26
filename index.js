//Initialiser le server
const express = require("express"),
      body_parser = require("body-parser"),
      PORT  = process.env.PORT || 5050,
      app = new express(),
      http = require('http').Server(app),
      io = require("socket.io")(http);
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
//Socket io
io.on("connection",(socket)=>{
    console.log("You are connected !");
    socket.on("disconnect",()=>{
        console.log("You are disconnected !")
    });
    socket.on("chat message",(msg)=>{
        console.log(`message recu : ${msg}`);
        socket.emit("chat message",msg)
    })
})
//
http.listen(PORT,() =>{
    console.log(`Your app is start on http://localhost:${PORT}`);
})