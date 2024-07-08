import express from "express";
import authController from "../controllers/auth-controller.js";
import { authMiddleware } from "../middlewares/auth-middleware.js";

const router = express.Router();

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);
router.route("/getuser").get(authMiddleware, authController.getUser);
router.route("/logout").get(authController.logout);
router.route("/getusers").get(authMiddleware, authController.getUsers);

export default router;
