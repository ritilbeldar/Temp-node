require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const path = require("path");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

// db connection

require("./models/database").connectDatabase();

// cors
const cors = require("cors");
app.use(cors({ credentials: true, origin: true }));

// logger
const logger = require("morgan");
app.use(logger("tiny"));

// bodyparser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// session and cookie
const session = require("express-session");
const cookieparser = require("cookie-parser");
const flash = require("connect-flash");

app.use(cookieparser());
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

// express file-upload
const fileupload = require("express-fileupload");
app.use(fileupload());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// routes

app.use("/", require("./routes/indexRoutes"));


// error handling with createError
const createError = require("http-errors");
app.use((req, res, next) => {
  next(createError(404));
});

// custom error handling
const ErorrHandler = require("./utils/ErrorHandler");
const { genetatedErrors } = require("./middlewares/errors");
app.all("*", (req, res, next) => {
  next(new ErorrHandler(`Requested URL Not Found ${req.url}`, 404));
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.redirect("/admin");
  } else {
    // Handle other errors here...
    res.status(err.status || 500).send(err.message);
  }
});

app.use(genetatedErrors);

app.listen(
  process.env.PORT,
  console.log(`server running on port ${process.env.PORT}`)
);
