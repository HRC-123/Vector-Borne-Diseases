const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
require("dotenv").config();
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@minorproject.8khefxy.mongodb.net/Malaria_Disease?retryWrites=true&w=majority`
    );
    console.log(`Database Connected: ${conn.connection.host}`);
    return conn.connection;
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
