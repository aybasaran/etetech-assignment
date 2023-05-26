import { Request, Response } from "express";
import {
  createProduct,
  deleteProduct,
  getSingleProduct,
  listProducts,
  updateProduct,
} from "../services/product.service";

export const listProductsHandler = async (req: Request, res: Response) => {
  try {
    const products = await listProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSingleProductHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await getSingleProduct(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProductHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await updateProduct(id, req.body);
    res.status(200).json({ message: "Product update successful!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteProductHandler = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteProduct(id);
    res.status(200).json({ message: "Product delete successful!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createProductHandler = async (req: Request, res: Response) => {
  try {
    await createProduct(req.body);
    res.status(200).json({ message: "Product create successful!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
