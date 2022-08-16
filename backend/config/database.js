const mongoose = require("mongoose");

const uri = process.env.MONGO;

const connectDatabase = () => {
  try {
    mongoose.connect(uri);
    console.log("Mongodb connected");
  } catch (error) {
    throw error;
  }
};

module.exports = connectDatabase;
