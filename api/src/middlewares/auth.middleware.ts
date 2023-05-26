import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import config from "config";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies["token"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const payload = jwt.verify(token, config.get<string>("jwtSecret"));
    req.body.user = payload;
    next();
  } catch (error) {
    res.clearCookie("token");
    return res.status(401).json({ message: "Unauthorized" });
  }
};
