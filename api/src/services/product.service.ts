import { ProductModel } from "../models";

export const listProducts = async () => {
  return ProductModel.find().populate("company").exec();
};

export const getSingleProduct = async (id: string) => {
  return ProductModel.findById(id).populate("company").exec();
};

export const updateProduct = async (id: string, data: any) => {
  return ProductModel.findByIdAndUpdate(id, data, { new: true }).exec();
};

export const deleteProduct = async (id: string) => {
  return ProductModel.findByIdAndDelete(id).exec();
};

export const createProduct = async (data: any) => {
  return ProductModel.create(data);
};
