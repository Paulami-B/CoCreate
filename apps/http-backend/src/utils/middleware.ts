import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = require("@repo/backend-common/config");

export function middleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      message: "No token provided or malformed"
    });
    return;
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Token not found after Bearer" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    // @ts-ignore
    req.userId = decoded.userId;

    return next();
  } catch (err: any) {
    console.error("JWT verification failed:", err.message);

    res.status(403).json({
      message: "Invalid or expired token"
    });
    return;
  }
}