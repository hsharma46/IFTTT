const nodemailer = require("nodemailer");
const constant = require("./constant");
const db = require("./db");

let transporter = undefined;
let _mailConfig = undefined;
const initializeTransport = () => {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: _mailConfig.user,
      pass: _mailConfig.pass,
    },
  });
};

const sendMail = async (subject, body) => {
  if (!!!transporter) {
    await db.connect();
    let _collection = await db.collection(constant.COLLLECTIONS.CONFIG);
    let _config = await _collection
      .find({ name: constant.CONFIG_TYPE.GMAIL })
      .toArray();

    console.log("mail : " + JSON.stringify(_config));
    _mailConfig = _config[0];
    initializeTransport();
  }

  let message = {
    from: _mailConfig.user,
    to: _mailConfig.to,
    subject: subject,
    html: `<h1>${body}</h1>`,
  };

  await transporter.sendMail(message);
};

module.exports = { sendMail };
