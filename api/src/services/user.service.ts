import { UserModel } from "../models";
import jwt from "jsonwebtoken";

import config from "config";

export const login = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await user.verifyPassword(password);

  if (!isMatch) {
    throw new Error("Incorrect password");
  }

  const token = jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    config.get<string>("jwtSecret"),
    { expiresIn: "1h" }
  );

  return token;
};

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  const user = await UserModel.create({ name, email, password });

  const token = jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    config.get<string>("jwtSecret"),
    { expiresIn: "1h" }
  );

  return token;
};
