require("dotenv").config();

const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const forms = require("./routes");

const app = express();

app.use(express.static("client"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/client"));

app.get("/", (req, res) => {
    if (req.cookies.victo_id) {
        res.render("./home.ejs", {
            isLoggedIn: true,
        });
    } else {
        res.render("./home.ejs", {
            isLoggedIn: false,
        });
    }
});

app.use("/users", forms);

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(5000);
        console.log("Server listening at 5000");
    })
    .catch((err) => {
        console.log(err);
    });
