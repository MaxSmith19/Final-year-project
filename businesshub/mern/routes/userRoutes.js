const express = require("express");
const router = express.Router();
const {
  getUser,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} = require('../controllers/UserController');
const { protect } = require("../middleware/authMiddleware");
const { upload } = require('../middleware/imageUploadMiddleware');


router.route('/').post(registerUser);
router.get('/get', protect, getUser);
router.route('/login/').post(loginUser);
router.route('/update').put(protect, upload.single('businessLogo'), updateUser);
router.route("/del").delete(protect, deleteUser);

module.exports = router;
