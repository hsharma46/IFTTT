const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "parasgoyal26@gmail.com",
    pass: "rlntzcdhbjrsmtap",
  },
});

const sendMail = async(subject,body) =>{
  let message = {
    from: "parasgoyal26@gmail.com",
    to: "trigger@applet.ifttt.com",
    subject: subject,
    html: `<h1>${body}</h1>`,
  };

  await transporter.sendMail(message);
}

module.exports = { sendMail };
