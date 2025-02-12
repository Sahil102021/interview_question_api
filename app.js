var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var categoryRouter = require("./routes/category");
var iqRouter = require("./routes/iq");
var bannerRouter = require("./routes/banner");


const mongoose = require("mongoose");
let MONGODB_CONECT_URL = "mongodb+srv://sahilramani2021:sahil@cluster0.n0ton.mongodb.net/interviewQuestion";

mongoose
  .connect(
    MONGODB_CONECT_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
    }
  )
  .then(() => console.log("Connected!"))
  .catch((err) => console.log(err.message));

var app = express();

app.use(cors()); // Allows frontend to access the API

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/category", categoryRouter);
app.use("/iq", iqRouter);
app.use("/banner", bannerRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
