const express = require("express");
const router = express.Router();
const { sendMail } = require("../utils/mail");
const amqp = require("../utils/amqp");
const db = require("../utils/db");
const constant = require("../utils/constant")

//Post Method
router.post("/post", async (req, res) => {
  await db.connect();
  try {
    let _collection = await db.collection(constant.COLLLECTIONS.ALEXA);

    await _collection.insertOne({
      type: constant.METHOD_TYPES.POST,
      Phares: req.body,
      createOn: new Date(),
    });

    await sendMail("Post Call", req.body);
    res.status(200).send({ message: "Success" });
  } catch (error) {
    console.log("ERROR : " + JSON.stringify(error.message));
    res.status(500).send({ message: error.message });
  }
});

//Get all Method
router.get("/sendmail", async (req, res) => {
  await db.connect();
  try {
    let _collection = await db.collection(constant.COLLLECTIONS.ALEXA);
    await _collection.insertOne({
      type: constant.METHOD_TYPES.GET,
      Phares: "Send Mail to trigger Applet",
      createOn: new Date(),
    });

    await sendMail(
      "GET Call initiated with I F T T T and send response back to alexa",
      "Hello Alexa"
    );
    res.status(200).send({ message: "Success" });

  } catch (error) {
    console.log("ERROR : " + JSON.stringify(error.message));
    res.status(500).send({ message: error.message });
  }
});

//Get all Method
router.get("/moverobot", async (req, res) => {
  await db.connect();
  try {
    let _collection = await db.collection(constant.COLLLECTIONS.ALEXA);
    let _pointName = req.query['point'];
    await _collection.insertOne({
      type: constant.METHOD_TYPES.GET,
      Phares: "Move Robot Command",
      createOn: new Date(),
    });

    let _coordinates_collection = await db.collection(constant.COLLLECTIONS.COORDINATES);
    let _coordinates_data=await _coordinates_collection.find({name:_pointName.toUpperCase()}).toArray();
    amqp.createConnectionAndChannel({ coordinates: [_coordinates_data[0].coordinate] });
    res.status(200).send({ message: "Success" });
  } catch (error) {
    console.log("ERROR : " + JSON.stringify(error.message));
    res.status(500).send({ message: error.message });
  }
});

//Delete by ID Method
router.delete("/delete", async (req, res) => {
  await db.connect();
  try {
    let _collection = await db.collection(constant.COLLLECTIONS.ALEXA);
    await _collection.remove({});
    res.status(200).send({ message: "Success" });
  } catch (error) {
    console.log("ERROR : " + JSON.stringify(error.message));
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
