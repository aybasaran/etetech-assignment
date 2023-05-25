import { prop, modelOptions, Severity, Ref } from "@typegoose/typegoose";

import { Company } from "./company.model";

@modelOptions({
  options: { allowMixed: Severity.ALLOW },
  schemaOptions: { timestamps: true },
})
export class Product {
  @prop({ required: true })
  public product_name!: string;

  @prop({ required: true })
  public product_category!: string;

  @prop({ default: 1 })
  public product_amount!: number;

  @prop({ required: true })
  public amount_unit!: string;

  @prop({
    required: true,
    ref: () => Company,
  })
  public company!: Ref<Company>;
}
