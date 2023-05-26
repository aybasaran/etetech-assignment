import {
  prop,
  pre,
  modelOptions,
  Severity,
  DocumentType,
} from "@typegoose/typegoose";

import { hash, verify } from "argon2";

@pre<User>("save", function (next) {
  if (this.isModified("password")) {
    hash(this.password)
      .then((hash) => {
        this.password = hash;
        next();
      })
      .catch((err) => next(err));
  } else {
    next();
  }
})
@modelOptions({
  options: { allowMixed: Severity.ALLOW },
  schemaOptions: { timestamps: true },
})
export class User {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;

  public async verifyPassword(
    this: DocumentType<User>,
    candidatePassword: string
  ) {
    try {
      return await verify(this.password, candidatePassword);
    } catch (e) {
      return false;
    }
  }
}
