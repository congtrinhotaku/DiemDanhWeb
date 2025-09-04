const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
  date: { type: Date, default: Date.now },                        // ngày điểm danh
  status: { type: String, enum: ["present", "absent"],default:"absent", required: true }, // có mặt / vắng
  checkInTime: { type: Date },                                    // giờ vào
  checkOutTime: { type: Date },                                   // giờ ra
}, { timestamps: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
