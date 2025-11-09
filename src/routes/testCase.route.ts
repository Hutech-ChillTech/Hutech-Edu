import { Router } from "express";
import Prisma from "../configs/prismaClient";
import TestCaseRepository from "../repositories/testcase.repository";
import TestCaseService from "../services/testCase.service";
import TestCaseController from "../controllers/testCase.controller";
import { validate } from "../middlewares/validate";
import { createTestCaseSchema, updateTestCaseSchema } from "../validators/testCase.validate";
import { authenticate, optionalAuth } from "../middlewares/auth.middleware";
import {  requirePermission } from "../middlewares/role.middleware";
import { UserRoles, Permissions } from "../constants/roles";

import { verifyFirebaseToken } from "../middlewares/verifyFirebaseToken";
import { verifyRole } from "../middlewares/verifyRole";

const testCaseRepository = new TestCaseRepository(Prisma, "testCase");
const testCaseService = new TestCaseService(testCaseRepository);
const testCaseController = new TestCaseController(testCaseService);

const router = Router();

router.get("/", 
  verifyFirebaseToken,
  verifyRole(["Admin", "User"]),
  requirePermission([Permissions.TESTCASE_READ]),
  (req, res, next) =>
  testCaseController.getAllTestCases(req, res, next)
);

router.get("/:chapterId", 
  verifyFirebaseToken,
  verifyRole(["Admin", "User"]),
  requirePermission([Permissions.TESTCASE_READ]),
  (req, res, next) =>
  testCaseController.getTestCaseById(req, res, next)
);

router.post(
  "/",
  verifyFirebaseToken,
  verifyRole(["Admin"]),
  requirePermission([Permissions.TESTCASE_CREATE]),
  validate(createTestCaseSchema),
  (req, res, next) => testCaseController.createTestCase(req, res, next)
);

router.put(
  "/:chapterId",
  verifyFirebaseToken,
  verifyRole(["Admin"]),
  requirePermission([Permissions.TESTCASE_UPDATE]),
  validate(updateTestCaseSchema),
  (req, res, next) => testCaseController.updateTestCase(req, res, next)
);

router.delete(
  "/:chapterId",
  verifyFirebaseToken,
  verifyRole(["Admin", "User"]),
  requirePermission([Permissions.TESTCASE_DELETE]),
  (req, res, next) => testCaseController.deleteTestCase(req, res, next)
);

export default router;
