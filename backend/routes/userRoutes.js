import express from "express";
import {
  authUser,
  googleLogin,
  googleSignin,
  googleCallback,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(registerUser);
router.post("/login", authUser);
router.post("/google_login", googleLogin)
router.route("/profile").post(protect, updateUserProfile);

router.route("/google", googleSignin);
router.route("/google/callback", googleCallback);



export default router;
