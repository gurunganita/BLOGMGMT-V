"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "gurunganita982@gmail.com",
    pass: "bhlx cwly cfpe apkq ",
  },
});

const mailer = async () => {
  const info = await transporter.sendMail({
    from: '"Anita Gurung"<gurunganita982@gmail.com>', // sender address
    to: "gurunganita982@gmail.com", // list of receivers
    subject: "nodemailer!!", // Subject line
    text: "Registration Successful", // plain text body
    html: "<b>User sign up</b>", // html body
  });

  return info.messageId;
};
module.exports = { transporter };
