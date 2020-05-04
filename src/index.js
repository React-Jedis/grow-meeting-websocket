var express = require("express");
var socketIO = require("socket.io");

const PORT = process.env.PORT || 3000;
const INDEX = "/index.html";

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("action", (msg) => {
    console.log(`Emiting ${JSON.stringify(msg)} to ${msg.room}`);
    io.to(msg.room).emit("action", msg);
  });
  socket.on("join", (msg) => {
    console.log(`joining: ${msg}`);
    socket.join(msg);
  });
});
