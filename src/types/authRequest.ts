// src/types/authRequest.ts
import { Request } from "express";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    roleId: string;
    roleName: string;
  };
}
