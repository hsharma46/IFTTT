const amqp = require("amqplib");
const constant = require("./constant");
const db = require("./db");

let _rabbitMQ = undefined;
async function createConnection() {
  let resp = { Success: true, result: null, message: null };
  try {
    if (!!!_rabbitMQ) {
      await db.connect();
      let _collection = await db.collection(constant.COLLLECTIONS.CONFIG);
      let _cloudAQMP = await _collection
        .find({ name: constant.CONFIG_TYPE.RABBIT_MQ })
        .toArray();
      _rabbitMQ = _cloudAQMP[0].config;
    }
    resp.result = await amqp.connect(_createURL(_rabbitMQ));
  } catch (err) {
    resp.Success = false;
    resp.message = err;
  }
  return resp;
}

async function createChannel(conn) {
  let resp = { Success: true, result: null, message: null };
  try {
    resp.result = await conn.createChannel({ durable: false });
  } catch (err) {
    resp.Success = false;
    resp.message = err;
  }
  return resp;
}

async function createConnectionAndChannel(message) {
  const conn = await createConnection();
  if (!!conn.result) {
    const channel = await createChannel(conn.result);
    await channel.result.assertQueue(_rabbitMQ.queuename).then(function (ok) {
      return channel.result.sendToQueue(_rabbitMQ.queuename, Buffer.from(JSON.stringify(message)));
    });

    setTimeout(function () {
      conn.result.close();
    }, 500);
  }
}

function _createURL(config) {
  return `${config.amqp}://${config.username}:${config.password}@${config.url}/${config.vhost}`;
}

module.exports = { createConnectionAndChannel };
