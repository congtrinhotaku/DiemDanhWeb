# 📘 Hệ Thống Điểm Danh Bằng Khuôn Mặt

Một hệ thống **điểm danh tự động** sử dụng **Node.js + Express + MongoDB + face-api.js** để nhận diện khuôn mặt nhân sự và lưu trữ thông tin điểm danh.

---

## 🚀 Công nghệ sử dụng

| Công nghệ          | Chức năng                                                        |
|--------------------|------------------------------------------------------------------|
| **Node.js**        | Runtime chính                                                    |
| **Express.js**     | Web framework                                                    |
| **MongoDB + Mongoose** | Lưu dữ liệu nhân sự & face descriptor                        |
| **face-api.js**    | Nhận diện khuôn mặt, landmarks, descriptor                       |
| **canvas**         | Xử lý ảnh trong Node.js                                          |
| **multer**         | Upload ảnh khuôn mặt                                             |
| **EJS**            | Giao diện frontend                                               |
| **express-session**| Quản lý session đăng nhập                                        |
| **connect-mongo**  | Lưu session vào MongoDB                                          |
| **dotenv**         | Quản lý biến môi trường                                          |
| **morgan**         | Ghi log request                                                  |
| **method-override**| Hỗ trợ PUT, DELETE trong form                                    |
| **nodemon**        | Reload server khi code thay đổi (dev)                            |

---

## 📂 Cấu trúc thư mục

```bash
testdiemdanh/
├── app.js
├── package.json
├── config/
│   ├── db.js
│   ├── faceapi.js
├── controllers/
│   ├── authController.js
│   ├── employeeController.js
├── middlewares/
│   ├── auth.js
│   ├── isAdmin.js
│   ├── processFaceData.js
├── models/
│   ├── Employee.js
│   ├── User.js
├── routes/
│   ├── authRoutes.js
│   ├── employeeRoutes.js
├── facemodels/       # chứa model của face-api.js
├── public/
│   ├── css/
│   ├── js/
│   ├── images/
├── views/
│   ├── layouts/
│   ├── auth/
│   ├── employees/
│   ├── partials/
├── .env
└── README.md
```

---

## ⚙️ Cài đặt

### 1. Clone dự án
```bash
git clone https://github.com/ten-ban/testdiemdanh.git
cd testdiemdanh
```

### 2. Cài dependencies
```bash
npm install
```

### 3. Cài face-api.js + canvas
```bash
npm install face-api.js canvas
```

> ⚠️ Lưu ý: Chỉ dùng `@tensorflow/tfjs` kèm với `face-api.js` (không cần `@tensorflow/tfjs-node`).

### 4. Cài nodemon (dev)
```bash
npm install --save-dev nodemon
```

Trong `package.json`:
```json
"scripts": {
  "dev": "nodemon app.js"
}
```

---

## 🔧 Cấu hình

Tạo file `.env` ở thư mục gốc:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/testdiemdanh
SESSION_SECRET=supersecretkey
PORT=3000
```

---

## 📦 Chuẩn bị models cho face-api.js

Trong thư mục `facemodels/` cần có các thư mục con:

```
facemodels/
├── ssd_mobilenetv1/
├── face_landmark_68/
├── face_recognition/
├── face_expression/
├── age_gender_model/
├── tiny_face_detector/
├── mtcnn/
├── proto/
├── tiny_yolov2/
├── tiny_yolov2_separable_conv/
└── uncompressed/
```

---

## ▶️ Chạy dự án

```bash
npm run dev
```

Mở trình duyệt:  
👉 [http://localhost:3000/employees](http://localhost:3000/employees)

---

## ✅ Checklist hoạt động

- [x] Kết nối MongoDB  
- [x] Load models face-api.js  
- [x] Upload ảnh → detect face  
- [x] Lưu faceDescriptor vào MongoDB  
- [x] Tích hợp EJS hiển thị danh sách nhân sự  
- [x] Giao diện CRUD nhân sự  

---

## 👨‍💻 Tác giả

Dự án được phát triển phục vụ mục đích **nghiên cứu & học tập**.
