require("dotenv").config();
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/", router);

const transport = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
};
const transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take messages");
  }
});

router.post("/send", (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  const content = `name: ${name} \n email: ${email} \n message: ${message} `;

  const mail = {
    from: name,
    to: "clusmsyknight@gmail.com",
    subject: `New Message from Contact Form By ${name}`,
    text: content,
  };
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: "fail",
      });
    } else {
      res.json({
        status: "success",
      });

      transporter.sendMail(
        {
          from: "clusmsyknight@gmail.com",
          to: email,
          subject: "Submission was successful",
          text: `Thank you for contacting me!\n\nForm details\nName: ${name}\nEmail: ${email}\nMessage: ${message}\n\nI'll try to get back to you ASAP.\n\n- Clumsyknight`,
        },
        function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Message sent: " + info.response);
          }
        }
      );
    }
  });
});

app.listen(process.env.PORT || 5000);
