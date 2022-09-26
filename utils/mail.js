const nodemailer = require("nodemailer");
const constant = require("./constant");
const db = require("./db");

let transporter = undefined;
let _mailConfig = undefined;
const initializeTransport =
  (transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: _mailConfig.user,
      pass: _mailConfig.pass,
    },
  }));

const sendMail = async (subject, body) => {
  let message = {
    from: constant.MAIL.GMAIL.USER,
    to: constant.MAIL.GMAIL.TO,
    subject: subject,
    html: `<h1>${body}</h1>`,
  };
  if (!!!transporter) {
    await db.connect();
    let _collection = await db.collection(constant.COLLLECTIONS.CONFIG);
    let _config = await _collection
      .find({ name: constant.CONFIG_TYPE.GMAIL })
      .toArray();
    _mailConfig = _config[0];
    initializeTransport();
  }

  await transporter.sendMail(message);
};

module.exports = { sendMail };
