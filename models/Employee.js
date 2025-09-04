const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },  // mã nhân viên
  name: { type: String, required: true },                // họ tên
  email: { type: String, required: true, unique: true }, // email công việc
  phone: { type: String },                               // số điện thoại
  department: { type: String },                          // phòng ban
  position: { type: String },                              // chức vụ
  faceDescriptor: { type: [Number], default: [] },
  faceData: { type: String }, 
  status: { type: String, enum: ["active", "inactive"], default: "active" },
}, { timestamps: true });

module.exports = mongoose.model("Employee", employeeSchema);
