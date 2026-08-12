const mongoose = require("mongoose");

const connectDatabase = async () => {
  // already connected
  if (mongoose.connection.readyState === 1) {
    return;
  }

  // waiting for connection if succcess then resolve else reject
  if (mongoose.connection.readyState === 2) {
    await new Promise((resolve, reject) => {
      mongoose.connection.once("connected", resolve);
      mongoose.connection.once("error", reject);
    });
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      // if db not connected throw error immediately instead of waiting 10 sec
      bufferCommands: false,
      // wait atmost 5 sec to find a mongodb server
      serverSelectionTimeoutMS: 5000,
      // wait maximum 10 sec for query response
      socketTimeoutMS: 10000,
    });
  } catch (err) {
    console.error("MongoDB Connection failed", err.message);
    throw err;
  }
};

module.exports = connectDatabase;
