import { Router } from "express";
import {
  loginHandler,
  logoutHandler,
  meHandler,
  registerHandler,
} from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/login", loginHandler);
router.post("/register", registerHandler);
router.post("/logout", logoutHandler);
router.get("/me", authMiddleware, meHandler);

export default router;
