import { Router } from "express";
import {
  listCompaniesHandler,
  deleteCompanyHandler,
  getCompanyByIdHandler,
  updateCompanyByIdHandler,
  createCompanyHandler,
} from "../controllers/company.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

authMiddleware;

const router = Router();

router.get("/", authMiddleware, listCompaniesHandler);
router.delete("/:id", authMiddleware, deleteCompanyHandler);
router.get("/:id", authMiddleware, getCompanyByIdHandler);
router.put("/:id", authMiddleware, updateCompanyByIdHandler);
router.post("/", authMiddleware, createCompanyHandler);

export default router;
