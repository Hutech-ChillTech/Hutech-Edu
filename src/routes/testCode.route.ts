import { Router } from "express";

import TestCodeController from "../controllers/testCode.controller";
const testCodeController = new TestCodeController();

import { ICodeSubmissionRequest } from "../types/customRequest";
import { validate } from "../middlewares/validate";
import { verifyFirebaseToken } from "../middlewares/verifyFirebaseToken";
import { verifyRole } from "../middlewares/verifyRole";

const router = Router();

router.post("/run", verifyFirebaseToken, verifyRole(["User", "Admin"]), (req , res, next) => testCodeController.runCode(req, res, next));

export default router;