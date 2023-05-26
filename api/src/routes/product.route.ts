import { Router } from "express";
import {
  deleteProductHandler,
  getSingleProductHandler,
  listProductsHandler,
  updateProductHandler,
  createProductHandler,
} from "../controllers/product.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authMiddleware, listProductsHandler);
router.get("/:id", authMiddleware, getSingleProductHandler);
router.put("/:id", authMiddleware, updateProductHandler);
router.delete("/:id", authMiddleware, deleteProductHandler);
router.post("/", authMiddleware, createProductHandler);

export default router;
