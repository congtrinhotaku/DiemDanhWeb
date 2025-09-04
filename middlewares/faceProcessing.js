// middlewares/faceProcessing.js
const fs = require("fs");
const canvas = require("canvas");
const faceapi = require("../config/faceapi");

const processFaceData = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Vui lòng upload ảnh" });
    }

    // Load ảnh từ file vừa upload
    const img = await canvas.loadImage(req.file.path);

    // Phát hiện khuôn mặt
    const detection = await faceapi
      .detectSingleFace(img)
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detection) {
      fs.unlinkSync(req.file.path); // Xóa ảnh lỗi
      return res.status(400).json({ message: "Không tìm thấy khuôn mặt trong ảnh" });
    }

    req.faceDescriptor = detection.descriptor;
    next();
  } catch (err) {
    console.error("❌ Lỗi xử lý khuôn mặt:", err);
    return res.status(500).json({ message: "Lỗi xử lý khuôn mặt" });
  }
};

module.exports = processFaceData;
