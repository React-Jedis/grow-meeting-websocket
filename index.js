var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
app.use(cors());

console.log("El console log si que va");

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("confeti", (msg) => {
    io.to(msg.room).emit("confeti");
  });
});

http.listen(process.env.PORT || 3000, () => {
  console.log("Esto no va por que no le da la gana");
  console.log(`listening on port: ${process.env.PORT}`);
});
