// config
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({
    path: "config/.env",
  });
}

const app = require("./app");
const connectDatabase = require("./db/database");

// handling synchronous uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.error(`Error: ${err.message}\nServer Shut Down!!`);
  if (process.env.NODE_ENV !== "production") {
    process.exit(1);
  }
});

// unhandle promise rejection
process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection Error, ${err.message}`);

  if (process.env.NODE_ENV !== "production") {
    process.exit(1);
  }
});

// start server for local dev
if (process.env.NODE_ENV !== "production") {
  const startServer = async () => {
    try {
      await connectDatabase();

      const PORT = process.env.PORT;

      app.listen(PORT, () => {
        console.log("Server connected on PORT", PORT);
      });
    } catch (error) {
      console.error("Server not start", error.message);
      process.exit(1);
    }
  };

  startServer();
}

module.exports = app;
