const app = require("./app");
const connectDatabase = require("./db/database");

// handling uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.error(`Error: ${err.message}\nServer Shut Down!!`);

  server.close(() => {
    process.exit(1);
  });
});

// config
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// connect db
connectDatabase();

// create server
const server = app.listen(process.env.PORT, () => {
  console.log("Server running on PORT ", process.env.PORT);
});

// unhandle promise rejection
process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection Error, ${err.message}`);

  server.close(() => {
    process.exit(1);
  });
});
