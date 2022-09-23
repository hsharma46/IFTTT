const express = require('express');
const router = express.Router();
const { MongoClient,ServerApiVersion  } = require("mongodb");
const uri = "mongodb+srv://ParasMongoDB:ZCcF6nKxSo1AvOFc@Cluster0.ansvqnc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const {sendMail} = require('../utils/mail');


let _database=undefined;

const connect = async () => {
  try {
    if (!!!_database) {
      await client.connect();
      console.log(`[INFO] [DATABASE] [CONNECTED-SUCCESSFULLY]`);
      _database = client.db("IFTTT");
    }
  } catch (err) {
    throw new Error('Error in DB Connection')
  }
};  




//Post Method
router.post('/post', async (req, res) => {
    await connect();
     try {
        let _collection = await _database.collection("Alexa");
        await _collection.insertOne({type:'POST',Phares : req.body,createOn:new Date()});
        sendMail('Post Call',req.body)
        res.status(200).send({message:"Success"})
    }
    catch (error) {
        res.status(500).send({ message: error.message })
    }
})

//Get all Method
router.get('/get', async (req, res) => {
    await connect();
    try {
        let _collection = await _database.collection("Alexa");
        await _collection.insertOne({type:'GET',Phares : "",createOn:new Date()});
        await sendMail('GET Call with IFTTT With ALEXA',"Hello Alexa");
        res.status(200).send({message:"Success"})
    }
    catch (error) {
        res.status(500).send({ message: error.message })
    }
})

// //Get by ID Method
// router.get('/getOne/:id', async (req, res) => {
//     try {
//         const data = await Model.findById(req.params.id);
//         res.send(data)
//     }
//     catch (error) {
//         res.status(500).send({ message: error.message })
//     }
// })

// //Update by ID Method
// router.patch('/update/:id', async (req, res) => {
//     try {
//         const id = req.params.id;
//         const updatedData = req.body;
//         const options = { new: true };

//         const result = await Model.findByIdAndUpdate(
//             id, updatedData, options
//         )

//         res.send(result)
//     }
//     catch (error) {
//         res.status(500).send({ message: error.message })
//     }
// })

//Delete by ID Method
router.delete('/delete', async (req, res) => {
  await connect();
    try {
      let _collection = await _database.collection("Alexa");
      await _collection.delete({});
      res.status(200).send({message:"Success"})
    }
    catch (error) {
        res.status(400).send({ message: error.message })
    }
})

module.exports = router;