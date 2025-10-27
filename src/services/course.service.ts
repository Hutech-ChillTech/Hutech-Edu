import { Prisma } from "@prisma/client";
import CourseRepository from "../repositories/course.repository";

class CourseService {
  private readonly courseRepo: CourseRepository;
  constructor(courseRepo: CourseRepository) {
    this.courseRepo = courseRepo;
  }

  async getCourseById(courseId: string) {
    return await this.courseRepo.getById(courseId);
  }

  async getCourseByName(courseName: string) {
    return await this.courseRepo.getCourseByName(courseName);
  }

  async getCourseByNamePrefix(prefix: string) {
    return await this.courseRepo.getCourseByNamePrefix(prefix);
  }

  async getAllCourse() {
    return await this.courseRepo.getAll();
  }

  async getAllSort(sortField: string, sortOrder: string) {
    const safeOrder = sortOrder === "desc" ? "desc" : "asc";
    return this.courseRepo.getAllSorted(sortField, safeOrder);
  }

  async createCourse(course: Prisma.CourseCreateInput) {
    const existing = await this.courseRepo.getCourseByName(course.courseName);
    if (existing && existing.length > 0) {
      throw new Error("Tên khóa học đã tồn tại");
    }
    return this.courseRepo.create(course);
  }

  async updateCourse(courseId: string, course: Prisma.CourseUpdateInput) {
    const existing = await this.courseRepo.getById(courseId);
    if (!existing) {
      throw new Error("Khóa học chưa tồn tại");
    }
    return this.courseRepo.update(courseId, course);
  }

  async deleteCourse(courseId: string) {
    const existing = await this.courseRepo.getById(courseId);
    if (!existing) {
      throw new Error("Khóa học chưa tồn tại");
    }
    return this.courseRepo.delete(courseId);
  }
}

export default CourseService;
