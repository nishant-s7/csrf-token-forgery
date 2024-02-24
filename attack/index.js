const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");

app.use(express.static("client"));
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/client"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

const html = `
    <div>
      <form action="http://localhost:8000/users/delete" method="post">
        <input value="Confirm to delete" name="typetext" type="hidden" />
        <p>Please don't reply to this mail and follow the button below</p>
        <button type = "submit" style="background-color: #222; color: white; padding: 8px 16px;
            border-radius: 5px; cursor: pointer;">
          Click on this button to verify your account
        </button>
      </form>
    </div>
`;

app.get("/mail/:email", async (req, res) => {
  console.log("send Verify Email Otp");

  const email = req.params.email;

  // sending a mail with nodemailer
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "stockhub.pvt.ltd@gmail.com",
      pass: "ldtygrlfvrvoougf",
    },
  });

  let mailOptions = {
    from: "stockhub.pvt.ltd@gmail.com",
    to: email,
    subject: "Verify your account",
    html: html,
  };

  transporter.sendMail(mailOptions, (err, success) => {
    if (err) {
      console.log("Mail not sent.", err);
    } else {
      console.log("Success, email has been sent.", success);
    }
  });

  return res.status(200).json({ message: "Otp sent" });
});

app.listen(9000, () => {
  console.log("server started successfully!");
});
