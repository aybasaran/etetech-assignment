import { Router } from "express";
import {
  deleteProductHandler,
  getSingleProductHandler,
  listProductsHandler,
  updateProductHandler,
  createProductHandler,
} from "../controllers/product.controller";

const router = Router();

router.get("/", listProductsHandler);
router.get("/:id", getSingleProductHandler);
router.put("/:id", updateProductHandler);
router.delete("/:id", deleteProductHandler);
router.post("/", createProductHandler);

export default router;
