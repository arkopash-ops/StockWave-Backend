import type { Request, Response, NextFunction } from "express";
import UserModel from "../model/users.model.js";
import { verifyToken } from "../config/jwt.js";

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token: string | undefined;

    const authHeader = req.header("Authorization") || req.header("authorization");
    if (authHeader?.startsWith("Bearer ")) token = authHeader.split(" ")[1];
    if (!token && req.cookies?.token) token = req.cookies.token;

    if (!token) {
      const err: any = new Error("No token, authorization denied.");
      err.status = 401;
      return next(err);
    }

    const decoded = verifyToken(token) as { id: string };

    const user = await UserModel.findById(decoded.id).select("-password");
    if (!user) {
      const err: any = new Error("User not found.");
      err.status = 404;
      return next(err);
    }

    (req as any).user = user;
    next();
  } catch (error) {
    next(error);
  }
};