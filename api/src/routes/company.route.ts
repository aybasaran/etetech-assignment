import { Router } from "express";
import {
  listCompaniesHandler,
  deleteCompanyHandler,
  getCompanyByIdHandler,
  updateCompanyByIdHandler,
} from "../controllers/company.controller";

const router = Router();

router.get("/", listCompaniesHandler);
router.delete("/:id", deleteCompanyHandler);
router.get("/:id", getCompanyByIdHandler);
router.put("/:id", updateCompanyByIdHandler);

export default router;
