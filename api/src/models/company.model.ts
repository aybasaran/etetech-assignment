import {
  prop,
  modelOptions,
  Severity,
  DocumentType,
  post,
} from "@typegoose/typegoose";

import crpyto from "crypto";
import { ProductModel } from "./index";

@post(/remove|delete/i, async function (company: DocumentType<Company> | null) {
  if (company?._id) {
    await ProductModel.deleteMany({ company: company._id });
  }
})
@modelOptions({
  options: { allowMixed: Severity.ALLOW },
  schemaOptions: { timestamps: true },
})
export class Company {
  @prop({ required: true })
  public company_name!: string;

  @prop({
    type: () => String,
    unique: true,
    default: () => crpyto.randomBytes(12).toString("hex"),
  })
  public company_legal_number?: string;

  @prop({ required: true })
  public incorporation_country!: string;

  @prop({})
  public website?: string;
}
