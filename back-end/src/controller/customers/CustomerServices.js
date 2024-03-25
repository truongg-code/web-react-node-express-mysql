// sendEmail.js
const nodemailer = require("nodemailer");

const sendEmail = (userEmail, orderDetails) => {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.HOST_EMAIL,
        pass: process.env.HOST_PASS,
      },
    });

    let mailOptions = {
      from: process.env.HOST_EMAIL,
      to: userEmail,
      subject: "Order Confirmation",
      text: `Thank you for your order! Details: ${orderDetails}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email send" + info.response);
      }
    });
  });
};

module.exports = sendEmail;
