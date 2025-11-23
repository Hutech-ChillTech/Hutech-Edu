import { Router } from "express";
import Prisma from "../configs/prismaClient";
import CodeSubmissionRepository from "../repositories/codeSubmission.repository";
import CodeSubmissionService from "../services/codeSubmission.service";
import CodeSubmissionController from "../controllers/codeSubmission.controller";

const codeSubmissionRepository = new CodeSubmissionRepository(Prisma, "submissionId");
const codeSubmissionService = new CodeSubmissionService(codeSubmissionRepository);
const codeSubmissionController = new CodeSubmissionController(codeSubmissionService);