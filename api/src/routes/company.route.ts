import { Router } from "express";
import {
  listCompaniesHandler,
  deleteCompanyHandler,
  getCompanyByIdHandler,
} from "../controllers/company.controller";

const router = Router();

router.get("/", listCompaniesHandler);
router.delete("/:id", deleteCompanyHandler);
router.get("/:id", getCompanyByIdHandler);

export default router;
