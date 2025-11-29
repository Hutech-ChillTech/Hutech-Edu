import { Request, Response, NextFunction } from "express";
import TestCaseService from "../services/testCase.service";
import { validate as isUUID } from "uuid";
import ChapterService from "../services/chapter.service";
import { sendEmpty, sendNotFound, sendSuccess } from "../utils/responseHelper";

class TestCaseController {
    private readonly testCaseService: TestCaseService;
    constructor(testCaseService: TestCaseService) {
        this.testCaseService = testCaseService;
    }

    async getAllTestCases(req: Request, res: Response, next: NextFunction) {
        try {
            const testCases = await this.testCaseService.getAllTestCase();
            if (!testCases) {
                sendEmpty(res, 'Chưa có test case');
                return;
            }
            sendSuccess(res, testCases, 'Lấy tất cả test cases thành công');

        } catch (error) {
            return next();
        }
    }

    async getTestCaseById(req: Request, res: Response, next: NextFunction) {
        try {
            const { testCaseId } = req.body;
            const testCase = await this.testCaseService.getTestCaseById(testCaseId);
            if (!testCase) {
                sendNotFound(res, 'Không tìm thấy test case cần tìm.');
                return;
            }
            sendSuccess(res, testCase, 'Lấy thành công test case theo ID');
        } catch (error) {
            return next();
        }
    }

    async getTestCaseByLessonId(req: Request, res: Response, next: NextFunction) {
        try {
            const { lessonId } = req.body;
            const testCases = await this.testCaseService.getTestCaseByLessonId(lessonId);
            if (!testCases) {
                sendEmpty(res, 'Chưa có test case');
                return;
            }
            sendSuccess(res, testCases, 'Lấy tất cả test cases thành công');
        } catch (error) {
            return next();
        }
    }

    async createTestCase(req: Request, res: Response, next: NextFunction) {
        try {

            const data = req.body;
            console.log("data", data);
            const testCase = await this.testCaseService.createTestCase(data);
            sendSuccess(res, testCase, 'Thêm mới thành công test case');
        } catch (error) {
            return next();
        }
    }

    async updateTestCase(req: Request, res: Response, next: NextFunction) {
        try {
            const { testCaseId } = req.body;
            const data = req.body;
            const testCase = await this.testCaseService.updateTestCase(testCaseId, data);
            sendSuccess(res, testCase, 'Cập nhật test case thành công');
        } catch (error) {
            return next();
        }
    }

    async deleteTestCase(req: Request, res: Response, next: NextFunction) {
        try {
            const { testCaseId } = req.body;
            const testCase = await this.testCaseService.deleteTestCase(testCaseId);
            sendSuccess(res, testCase, 'Xóa test case thành công');
        } catch (error) {
            return next();
        }
    }
}

export default TestCaseController;