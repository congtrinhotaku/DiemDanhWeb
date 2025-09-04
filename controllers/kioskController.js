const multer = require("multer");
const fs = require("fs");
const path = require("path");
const canvas = require("canvas");
const faceapi = require("../config/faceapi");
const Employee = require("../models/Employee");
const Attendance = require("../models/Attendance");
const { image } = require("@tensorflow/tfjs");

const upload = multer({ dest: "uploads/" });

// Render kiosk page
exports.getKiosk = (req, res) => {
  res.render("kiosk/index", { layout: false });
};

// Điểm danh bằng ảnh chụp
// Điểm danh
exports.postDiemDanh = [
  upload.single("face"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: "Vui lòng chụp ảnh" });
      }

      const img = await canvas.loadImage(req.file.path);
      const detection = await faceapi
        .detectSingleFace(img)
        .withFaceLandmarks()
        .withFaceDescriptor();

      fs.unlinkSync(req.file.path); // xóa ảnh tạm

      if (!detection) {
        return res.status(404).json({ success: false, type: "noface", message: "Không tìm thấy khuôn mặt" });
      }

      const descriptor = detection.descriptor;
      const employees = await Employee.find({ faceDescriptor: { $exists: true, $ne: [] } });

      let minDistance = Infinity;
      let matchedEmployee = null;

      employees.forEach(emp => {
        const distance = Math.sqrt(
          emp.faceDescriptor
            .map((val, i) => (val - descriptor[i]) ** 2)
            .reduce((a, b) => a + b, 0)
        );
        if (distance < minDistance) {
          minDistance = distance;
          matchedEmployee = emp;
        }
      });

      if (minDistance < 0.5) {
        return res.json({
          success: true,
          type: "matched",
          _id: matchedEmployee._id,
          name: matchedEmployee.name,
          code: matchedEmployee.code,
          image: matchedEmployee.image || null,
        });
      } else {
        return res.json({ success: false, type: "notfound", message: "Không nhận diện được" });
      }
    } catch (err) {
      console.error("❌ Lỗi điểm danh:", err);
      res.status(500).json({ success: false, type: "error", message: "Lỗi hệ thống" });
    }
  }
];


exports.postConfirmAttendance = async (req, res) => {
  try {
    const { employeeId } = req.body;
    if (!employeeId) {
      return res.status(400).json({ success: false, message: "Thiếu thông tin nhân viên" });
    }

    // Luôn luôn tạo mới 1 bản ghi điểm danh
    const attendance = new Attendance({
      employee: employeeId,
      status: "present",
      checkInTime: new Date(),
    });

    await attendance.save();

    return res.json({ success: true, message: "Điểm danh thành công", attendance });
  } catch (err) {
    console.error("❌ Lỗi lưu điểm danh:", err);
    res.status(500).json({ success: false, message: "Lỗi hệ thống" });
  }
};
