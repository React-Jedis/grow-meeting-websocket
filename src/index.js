var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("confetti", (msg) => {
    io.to(msg.room).emit("confetti");
  });
  socket.on("join", (msg) => {
    console.log(`joining: ${msg}`);
    socket.join(msg);
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
