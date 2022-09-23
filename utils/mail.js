const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "parasgoyal26@gmail.com",
    pass: "Passwordgmail@26",
  },
});

function sendMail(subject,body) {
  let message = {
    from: "parasgoyal26@gmail.com",
    to: "hi.sharma2029@gmail.com",
    subject: subject,
    html: `<h1>${body}</h1>`,
  };

  transporter.sendMail(message, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
}

module.exports = { sendMail };
