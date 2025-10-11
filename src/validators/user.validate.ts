import { Request, Response, NextFunction } from "express";

const GENDERS = ["MALE", "FEMALE", "OTHER"];
const LEVELS = ["Basic", "Intermediate", "Advanced"];

function isValidEmail(email: string): boolean {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
}

function isValidDate(date: any): boolean {
  return !isNaN(Date.parse(date));
}

export function validateLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  const errors: string[] = [];
  if (!email) errors.push("Thiếu email");
  else if (!isValidEmail(email)) errors.push("Email không hợp lệ");
  if (!password) errors.push("Thiếu mật khẩu");
  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(", ") });
  }
  next();
}

export function validateCreateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userName, password, email, gender, level, region, dateOfBirth } =
    req.body;
  const errors: string[] = [];
  if (!userName) errors.push("Thiếu tên người dùng");
  if (!password) errors.push("Thiếu mật khẩu");
  if (!email) errors.push("Thiếu email");
  else if (!isValidEmail(email)) errors.push("Email không hợp lệ");
  if (!gender) errors.push("Thiếu giới tính");
  else if (!GENDERS.includes(gender))
    errors.push("Giới tính không hợp lệ (MALE/FEMALE/OTHER)");
  if (level && !LEVELS.includes(level))
    errors.push("Level không hợp lệ (Basic/Intermediate/Advanced)");
  if (dateOfBirth && !isValidDate(dateOfBirth))
    errors.push("Ngày sinh không hợp lệ");
  // region là optional, không cần check
  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(", ") });
  }
  next();
}

export function validateUpdateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { gender, level, email, dateOfBirth } = req.body;
  const errors: string[] = [];
  if (email && !isValidEmail(email)) errors.push("Email không hợp lệ");
  if (gender && !GENDERS.includes(gender))
    errors.push("Giới tính không hợp lệ (MALE/FEMALE/OTHER)");
  if (level && !LEVELS.includes(level))
    errors.push("Level không hợp lệ (Basic/Intermediate/Advanced)");
  if (dateOfBirth && !isValidDate(dateOfBirth))
    errors.push("Ngày sinh không hợp lệ");
  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(", ") });
  }
  next();
}

export function validateChangePassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { newPassword } = req.body;
  if (!newPassword) {
    return res.status(400).json({ error: "Thiếu mật khẩu mới" });
  }
  next();
}

export function validateUserIdParam(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ error: "Thiếu userId" });
  }
  next();
}