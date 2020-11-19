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
  const website = req.body.website;
  const content = `name: ${name}\n email: ${email}\n message: ${message} `;
  const colors = {
    heading: "cyan",
    signature: "#4dff79",
    link: "#00ffbf",
    text: "aquamarine",
    info: "#42babd",
  };
  const fonts = { text: "16px", signature: "19px", info: "12px" };
  const selfHTML = `
  <body style="background-color: black; padding: 10px;">
    <h1 style="width: 100%; text-align: center; color:${colors.heading};">
      New Email from <a href="${website}" target="_blank" title=${website} style="color: ${colors.link}; text-decoration: none;"> here</a>
    </h1>
    <p style="color: ${colors.text}; font-size: ${fonts.text}"><b>Name: </b> ${name}</p>
    <p style="color: ${colors.text}; font-size: ${fonts.text}"><b>Email: </b><span style="color: ${colors.link}; text-decoration: none;">${email}</span></p>
    <p style="color: ${colors.text}; font-size: ${fonts.text};white-space: pre;"><b>Message: </b> ${message}</p>
  </body>`;

  const userHTML = `
  <div style="padding: 20px;background-color: black;">
    <h1 style="width: 100%; text-align: center; color:${colors.heading}; margin-bottom: 5px;">Thank you for contacting me!</h1>
    <div style="margin-top: 30px;">
    <h2 style="color: azure;">Form Details: </h2>
    <p style="color: ${colors.text}; font-size: ${fonts.text}"><b>Name: </b> ${name}</p>
    <p style="color: ${colors.text}; font-size: ${fonts.text}"><b>Email: </b><span style="color: ${colors.link}; text-decoration: none;">${email}</span></p>
    <p style="color: ${colors.text}; font-size: ${fonts.text};white-space: pre;"><b>Message: </b> ${message}</p>

    <p style="color: ${colors.signature}; font-size: ${fonts.signature}; width: 100%; text-align: right">I'll try to get back to you ASAP<br/> - <em>Rishabh Pathak</em></p>

    </div>
    <div style="color:${colors.info}; font-size: ${fonts.info}; width: 100%; text-align: center; margin-top: 40px;">I apologise If you haven't filled any form and yet received this email.<br/> There might be someone else who has used your email (by mistake).
    <br/><br/>
    Form address: <a href="${website}" target="_blank" title="Email has sent after filling this form"style=" color: ${colors.link}; text-decoration: none;"> ${website}</a>
    </div>
    </div>`;

  const mail = {
    from: name,
    to: "clusmsyknight@gmail.com",
    subject: `New Message from Contact Form By ${name}`,
    text: content,
    html: selfHTML,
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
          html: userHTML,
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
