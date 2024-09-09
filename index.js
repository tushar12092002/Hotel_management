const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
const Person_Routes = require("./routes/person_routes");
const Menu_Routes = require("./routes/menu_routes");
const passport = require("./auth");

// Middleware Function
const logRequest = (req, res, next) => {
  console.log(
    ` ${new Date().toLocaleString()} Request Made to ${req.originalUrl}  `
  );
  next();
};
app.use(logRequest); //now this will show time and date in all routes

app.use(passport.initialize());
const local_auth_middleware = passport.authenticate("local", {
  session: false,
});

app.use(bodyParser.json()); //stores in req.body  and we have to directly use it

app.get("/", (req, res) => {
  //if you want logReq in this route only then ('/' , logRequest ,(req,res))
  res.send("Hello World");
});

app.use("/person", local_auth_middleware, Person_Routes); //if you want logReq in person route only then ('/person' , logRequest ,(req,res))
app.use("/menu", Menu_Routes);
app.listen(3000);
