const express = require('express');
const bodyParser = require("body-parser");
var session = require('express-session');

 const login = require("./routes/login");
 const home = require("./routes/home");
 const app = express();

 app.use(session({
  secret: '1234',
  resave: true,
  saveUninitialized: false,
  rolling: true,
  //cookie:{maxAge:500 }
}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
 //app.use(bodyParser.json());
 //app.use(bodyParser.urlencoded({extended: true}));

 app.use('/api/home' , home)
 app.use('/api/login' , login);
 
 app.listen(3080, () => {
    console.log("Server started in port 3080!");
  });


  