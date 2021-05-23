/* eslint-disable no-console */
require("dotenv").config();

const nodemailer = require("nodemailer");

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
exports.transporter = transporter;

transporter.verify((error, success) => {
  if (error) {
    console.log("Error authenticating:", error);
  } else {
    console.log("Server is ready to take messages", success);
  }
});
