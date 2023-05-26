import { Company } from "./company.model";
import { Product } from "./product.model";
import { User } from "./user.model";

import { getModelForClass } from "@typegoose/typegoose";

export const CompanyModel = getModelForClass(Company);
export const ProductModel = getModelForClass(Product);
export const UserModel = getModelForClass(User);
