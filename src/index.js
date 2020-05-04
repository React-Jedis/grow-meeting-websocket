var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

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

http.listen(process.env.PORT || 3000, () => {
  console.log(`listening on port: ${process.env.PORT}`);
});
