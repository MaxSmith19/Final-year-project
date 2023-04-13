const express = require("express");
const router = express.Router();
const {
  getUser,
  registerUser,
  changePassword,
  loginUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const { protect } = require("../middleware/authMiddleware");
const { upload } = require('../middleware/imageUploadMiddleware');


router.route('/').post(registerUser);
router.get('/get', protect, getUser);
router.route('/login/').post(loginUser);
router.route("/changePassword").post(changePassword);
router.route('/update').put(protect, upload.single('businessLogo'), updateUser);
router.route("/del").delete(deleteUser);

module.exports = router;
