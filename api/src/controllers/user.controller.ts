import { Request, Response } from "express";
import { login, register } from "../services/user.service";

export const loginHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const token = await login(email, password);
    res.cookie("token", token, {
      httpOnly: true,
      path: "/",
      domain: "localhost",
      secure: false,
      expires: new Date(Date.now() + 60 * 60 * 1000),
      sameSite: "lax",
    });
    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const registerHandler = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const token = await register(name, email, password);
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 1000),
      path: "/",
      domain: "localhost",
      sameSite: "lax",
    });
    res.json({ message: "Register successful" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const logoutHandler = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
};

export const meHandler = async (req: Request, res: Response) => {
  res.json(req.body.user);
};
