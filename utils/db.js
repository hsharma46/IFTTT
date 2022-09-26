const { MongoClient } = require("mongodb");
const constant = require("./constant");
const client = new MongoClient(constant.CONFIG.MONGO_DB);

let _database = undefined;
const connect = async () => {
  try {
    if (!!!_database) {
      await client.connect();
      console.log(`[INFO] [DATABASE] [CONNECTED-SUCCESSFULLY]`);
      _database = client.db("IFTTT");
    }
  } catch (err) {
    throw new Error("Error in DB Connection");
  }
};

const _collection= async(name)=>{
    return await _database.collection(name);
}

module.exports={connect,collection:_collection}
