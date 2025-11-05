import { Prisma } from "@prisma/client";
import ChapterRepository from "../repositories/chapter.repository";
import CourseRepository from "../repositories/course.repository";
import createHttpError from "http-errors";

class ChapterService {
    private readonly chapterRepository: ChapterRepository;
    private readonly courseRepository: CourseRepository;
    constructor(chapterRepository: ChapterRepository, courseRepository: CourseRepository) {
        this.chapterRepository = chapterRepository;
        this.courseRepository = courseRepository;
    }

    async getAllChapter() {
        try {
            return await this.chapterRepository.getAll();
        } catch (error) {
            throw error;
        }
    }

    async getChapterById(id: string){
        try {
            return await this.chapterRepository.getById(id);
        } catch (error) {
            throw error;
        }
    }

    async createChapter(id: string , dataCourse: Prisma.ChapterCreateInput){
        try {
            console.log(id);
            const existingCourse = await this.courseRepository.getById(id);

            if(!existingCourse){
                throw createHttpError(404, 'Khóa học không tồn tại');
            }

            return this.chapterRepository.create({
                chapterName: dataCourse.chapterName,
                totalLesson: dataCourse.totalLesson,
                course: {
                    connect: {courseId: id},
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async updateChapter(id: string, data: Prisma.ChapterUpdateInput){
        try {
            const existingChapter = await this.chapterRepository.getById(id);

            if(!existingChapter){
                throw createHttpError(404, 'Chương học không tồn tại');
            }
            return this.chapterRepository.update(id, data);
        } catch (error) {
            throw error;
        }
    }

    async deleteChapter(id: string){
        try {
            const existingChapter = await this.chapterRepository.getById(id);

            if(!existingChapter){
                throw createHttpError(404, 'Chương học không tồn tại');
            }
            return this.chapterRepository.delete(id);
        } catch (error) {
            throw error;
        }
    }
}

export default ChapterService;