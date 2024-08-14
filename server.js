const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();

// Cấu hình CORS cho Express
app.use(cors());

const server = http.createServer(app);

app.get("/", function (req, res) {
  res.json({
    mess: "xin chào",
  });
});

const io = new Server(server, {
  cors: {
    origin: "*", // Cho phép mọi nguồn (bạn có thể thay '*' bằng địa chỉ cụ thể)
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A client connected");

  socket.on("message", (data) => {
    console.log("Received from client:", data);

    // Gửi tin nhắn tới tất cả các client
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
server.listen(4000, () => {
  console.log("Server is running on port 4000");
});
