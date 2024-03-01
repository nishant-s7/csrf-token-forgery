require("dotenv").config();

const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");

const forms = require("./routes");

const app = express();

app.use(express.static("client"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/client"));

app.get("/", (req, res) => {
  if (req.cookies.victo_id) {
    res.render("./home.ejs", { isLoggedIn: true, csrfToken: req.csrfToken() });
  } else {
    res.render("./home.ejs", { isLoggedIn: false, csrfToken: req.csrfToken() });
  }
});

app.use("/users", forms);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(8000);
    console.log("Server running on port 8000");
  })
  .catch((err) => {
    console.log(err);
  });
