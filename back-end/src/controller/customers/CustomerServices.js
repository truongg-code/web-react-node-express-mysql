// sendEmail.js
const nodemailer = require("nodemailer");

const sendEmail = (userEmail, orderDetails) => {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        type: "login", // default
        user: "truonggforlearncode@gmail.com",
        pass: "qcko ssra aynh zjqy",
      },
    });

    let mailOptions = {
      from: "truonggforlearncode@gmail.com",
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
