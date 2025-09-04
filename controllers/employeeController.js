const Employee = require("../models/Employee");
const fs = require("fs");
const path = require("path");



// Danh sách nhân viên
exports.index = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    const user = req.session.user;
    res.render("employees/index", { title: "Danh sách nhân sự", employees, user });
  } catch (err) {
    res.status(500).send("Lỗi khi lấy danh sách nhân sự");
  }
};

// Form thêm nhân viên
exports.createForm = (req, res) => {
const user = req.session.user;
  res.render("employees/create", { title: "Thêm nhân sự",user });
};

// Thêm nhân viên
exports.create = async (req, res) => {
  try {
    await Employee.create(req.body);
    res.redirect("/employees" );
  } catch (err) {
    res.status(500).send("Lỗi khi thêm nhân sự: " + err.message);
  }
};

// Form chỉnh sửa nhân viên
exports.editForm = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    const user = req.session.user;
    res.render("employees/edit", { title: "Chỉnh sửa nhân sự", employee, user });
  } catch (err) {
    res.status(500).send("Lỗi khi lấy thông tin nhân sự");
  }
};

// Cập nhật nhân viên
exports.update = async (req, res) => {
  try {
    await Employee.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/employees");
  } catch (err) {
    res.status(500).send("Lỗi khi cập nhật nhân sự");
  }
};

// Xóa nhân viên
exports.delete = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.redirect("/employees");
  } catch (err) {
    res.status(500).send("Lỗi khi xóa nhân sự");
  }
};

exports.addFace = async (req, res) => {
  try {
    const employeeId = req.params.id;

    // Lấy nhân sự từ DB
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Không tìm thấy nhân sự" });
    }

    // Kiểm tra dữ liệu từ face-api
    if (!req.faceDescriptor || req.faceDescriptor.length !== 128) {
      return res.status(400).json({ message: "Dữ liệu khuôn mặt không hợp lệ" });
    }

    // Lưu descriptor vào DB
    employee.faceDescriptor = Array.from(req.faceDescriptor);
    await employee.save();

    console.log("✅ Đã lưu descriptor:", employee.faceDescriptor.length);

    res.redirect(`/employees/${employeeId}/edit`);
  } catch (err) {
    console.error("❌ Lỗi thêm khuôn mặt:", err);
    res.status(500).json({ message: "Lỗi thêm dữ liệu khuôn mặt" });
  }
};
