import { Request, Response, NextFunction } from "express";

export function requireFields(fields: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: string[] = [];
    for (const field of fields) {
      if (!req.body[field]) errors.push(`Thiếu trường ${field}`);
    }
    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(", ") });
    }
    next();
  };
}

export function requireIdParam(paramName: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.params[paramName]) {
      return res.status(400).json({ error: `Thiếu ${paramName}` });
    }
    next();
  };
}