const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer"); 
const employeeController = require("../controllers/employeeController");
const processFaceData = require("../middlewares/faceProcessing");


// CRUD
router.get("/", employeeController.index);
router.get("/create", employeeController.createForm);
router.post("/create", employeeController.create);
router.get("/:id/edit", employeeController.editForm);
router.post("/:id/edit", employeeController.update);
router.post("/:id/delete", employeeController.delete);


// Upload ảnh khuôn mặt
router.post(
  "/:id/add-face",
  upload.single("faceImage"),
  processFaceData,
  employeeController.addFace
);



module.exports = router;
