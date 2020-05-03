var app = require("express")();
var https = require("https").createServer(app);
var io = require("socket.io")(https);
app.use(cors());

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
  console.log(`listening on port: ${process.env.PORT}`);
});
