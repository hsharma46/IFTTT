var amqp = require("amqplib");
var url = "amqps://przasbmo:oVzR5gvLwFc-llbrUMRLOmGnRmefeWc4@puffin.rmq2.cloudamqp.com/przasbmo"; // default to localhost

async function createConnection() {
  let resp = { Success: true, result: null, message: null };
  try {
    resp.result = await amqp.connect(url);
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

async function createConnectionAndChannel(queueName, message) {
  const conn = await createConnection();
  if (!!conn.result) {
    const channel = await createChannel(conn.result);
    await channel.result.assertQueue(queueName).then(function (ok) {
      return channel.result.sendToQueue(queueName, Buffer.from(message));      
    });

    setTimeout(function() {
      conn.result.close();
      }, 500);
        
  }
}


module.exports = { createConnectionAndChannel };
