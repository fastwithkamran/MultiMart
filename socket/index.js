const socketIO = require("socket.io");
const http = require("http");
const express = require("express");
const cors = require("cors");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: ".env" });
}

const app = express();
const server = http.createServer(app);

// CORS
const io = socketIO(server, {
  cors: {
    origin: ["http://localhost:5173", process.env.FRONTEND_API],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors());
app.use(express.json());

// Uptime Robot pings this to keep server alive
app.get("/", (req, res) => {
  res.send("Socket IO Connected Successfully!");
});

// maintain an array of active users
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

// when user left chat, this function will remove user from active users array
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

// find a specific online user by its db id
const getUser = (receiverId) => {
  return users.find((user) => user.userId === receiverId);
};

// Define message object data
const createMessage = ({ senderId, receiverId, text, images }) => ({
  senderId,
  receiverId,
  text,
  images,
  seen: false,
});

// manage active websocket connections
io.on("connection", (socket) => {
  console.log("User is connected!");

  // link userId to their active socketId
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    // broadcasts everyone who is connected
    io.emit("getUsers", users);
  });

  // Object to track messages for each user
  const messages = {};

  socket.on("sendMessage", ({ senderId, receiverId, text, images }) => {
    const message = createMessage({ senderId, receiverId, text, images });
    const user = getUser(receiverId);

    // Store the messages in the 'messages' object
    if (!messages[receiverId]) {
      messages[receiverId] = [message];
    } else {
      messages[receiverId].push(message);
    }

    // send the message to the receiver
    io.to(user?.socketId).emit("getMessage", message);
  });

  socket.on("messageSeen", ({ senderId, receiverId, messageId }) => {
    const user = getUser(senderId);

    if (messages[senderId]) {
      const message = messages[senderId].find(
        (message) =>
          message.receiverId === receiverId && message.id === messageId,
      );
      if (message) {
        message.seen = true;
      }

      // send a message seen event to the sender
      io.to(user?.socketId).emit("messageSeen", {
        senderId,
        receiverId,
        messageId,
      });
    }
  });

  // update and get last message
  socket.on("updateLastMessage", ({ lastMessage, lastMessageId }) => {
    io.emit("getLastMessage", {
      lastMessage,
      lastMessageId,
    });
  });

  // disconnect users from socket
  socket.on("disconnect", () => {
    console.log("User disconnected from socket");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

server.listen(process.env.PORT || 4000, () => {
  console.log("Socket server running on PORT", process.env.PORT || 4000);
});
