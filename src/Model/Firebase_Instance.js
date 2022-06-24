const config = require("./Firebase_config");
const firebase = require("firebase");
//Model de reference
const db = firebase.initializeApp(config.firebaseConfig);

module.exports = db;