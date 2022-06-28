//Initialiser le server
const express = require("express"),
      body_parser = require("body-parser"),
      PORT  = process.env.PORT || 5050,
      app = new express(),
      cookieParser = require("cookie-parser"),
      http = require('http').Server(app),
      io = require("socket.io")(http);
//
//Middleware
app.use(express.json());
app.use(body_parser.json());
app.use(body_parser.urlencoded());
//parser le cookies des requete HTTP;
app.use(cookieParser());
//
//Moteur de template
app.set("view engine","ejs");
app.set("views","./src/Views")
//Mes imports
app.use("/image",express.static("./src/Views/Assets/Image"));
app.use("/icon",express.static("./src/Views/Assets/Icon"));
app.use("/style",express.static("./src/Views/Assets/Styles"));
app.use("/script",express.static("./src/Views/Assets/Scripts"))
//
//Mes Routes
/*Injection d'utilisateur*/
app.use((req,res,next)=>{
    //Recuperer les donnees dans les cookies
    const authToken = req.cookies['AuthToken'];
    //Injecter l'utilisateur dans les requetes
    console.log(authToken);
    req.user = authToken;
    next()
})

/* app.use("/",require('./src/Router/Home')); */
app.use("/",require("./src/Router/Login"));
//-> Gestion d'erreur <-//
app.use((req,res)=>{
    res.status(404).render("404Error.ejs",{
        //variable a transmettre
    });
})
//

//Socket io
io.on("connection",(socket)=>{
    let status = "connected"
    socket.emit("__Status__",status);
    socket.on("disconnect",()=>{
        status = "disconnected"
        socket.emit("__Status__",status);
    });
    socket.on("chat message",(msg)=>{
        console.log(`message recu : ${msg}`);
        io.emit("chat message",msg,socket.id)
    })
})
//
http.listen(PORT,() =>{
    console.log(`Your app is start on http://localhost:${PORT}`);
})