const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.connect("mongodb://127.0.0.1:27017").then((data) => {
    console.log(`MongoDB connected ${data.connection.host}`);
  });
};

module.exports = connectDatabase;
