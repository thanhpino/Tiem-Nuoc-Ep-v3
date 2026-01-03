const express = require("express");
const path = require("path");
require("dotenv").config(); // Đọc biến môi trường từ file .env

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Phục vụ các file tĩnh
app.use(express.static(__dirname));

// IMPORT CÁC FILE XỬ LÝ PAYPAL
const createOrderHandler = require("./api/create-order");
const captureOrderHandler = require("./api/capture-order");

// --- TẠO ROUTE API ---
// Khi frontend gọi fetch('/api/create-order'), server sẽ chạy hàm trong file create-order.js
app.post("/api/create-order", createOrderHandler);
app.post("/api/capture-order", captureOrderHandler);

// Route mặc định về trang chủ
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Khởi động Server
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});