//server-dependencies
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");

//initialize Express app
var express = require("express");
var app = express();

app.use(logger("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(express.static(process.cwd() + "/public"));
//Require set up handlebars
var exphbs = require("express-handlebars");
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

//connecting to MongoDB
//mongoose.connect("mongodb://localhost/designscrape");
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/designscrape";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Mongoose Bike Riding!");
});

var routes = require("./controller/controller.js");
app.use("/", routes);
//Create localhost port
var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("You're TOO LOUD on PORT " + port);
});