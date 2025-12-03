import Prisma from "../configs/prismaClient";
import { Level, SubLevel, LearningSpeed, Gender } from "@prisma/client";

async function seedData() {
  console.log("🌱 Bắt đầu seed data...\n");

  try {
    // Lấy user đầu tiên làm createdBy (giả sử đã có user từ seed-roles)
    const firstUser = await Prisma.user.findFirst();
    if (!firstUser) {
      throw new Error(
        "Không tìm thấy user nào. Vui lòng chạy seed-roles trước!"
      );
    }

    // ==================== 1. COURSES (15) ====================
    console.log("📚 Seeding 15 Courses...");

    const courseData = [
      // Basic Level - 5 courses
      {
        name: "HTML/CSS cơ bản",
        desc: "Học HTML và CSS từ đầu cho người mới bắt đầu",
        price: 200000,
        level: Level.Basic,
        subLevel: SubLevel.Low,
        duration: 30,
        specialization: "Công nghệ thông tin",
        tag: "HTML/CSS",
      },
      {
        name: "JavaScript căn bản",
        desc: "Nền tảng JavaScript: biến, vòng lặp, hàm",
        price: 300000,
        level: Level.Basic,
        subLevel: SubLevel.Mid,
        duration: 40,
        specialization: "Công nghệ thông tin",
        tag: "JavaScript",
      },
      {
        name: "JavaScript nâng cao",
        desc: "ES6+, Async/Await, Promises, Closure",
        price: 350000,
        level: Level.Basic,
        subLevel: SubLevel.High,
        duration: 45,
        specialization: "Công nghệ thông tin",
        tag: "JavaScript",
      },
      {
        name: "Python cơ bản",
        desc: "Lập trình Python từ con số 0",
        price: 250000,
        level: Level.Basic,
        subLevel: SubLevel.Low,
        duration: 35,
        specialization: "Công nghệ thông tin",
        tag: "Python",
      },
      {
        name: "Git và GitHub",
        desc: "Version control cơ bản với Git",
        price: 150000,
        level: Level.Basic,
        subLevel: SubLevel.Mid,
        duration: 20,
        specialization: "Công nghệ thông tin",
        tag: "DevOps",
      },

      // Intermediate Level - 5 courses
      {
        name: "React cơ bản",
        desc: "Xây dựng UI hiện đại với React",
        price: 400000,
        level: Level.Intermediate,
        subLevel: SubLevel.Low,
        duration: 50,
        specialization: "Công nghệ thông tin",
        tag: "JavaScript",
      },
      {
        name: "React + Redux",
        desc: "State management với Redux Toolkit",
        price: 450000,
        level: Level.Intermediate,
        subLevel: SubLevel.Mid,
        duration: 55,
        specialization: "Công nghệ thông tin",
        tag: "JavaScript",
      },
      {
        name: "Next.js Full-stack",
        desc: "SSR, SSG, API Routes với Next.js",
        price: 500000,
        level: Level.Intermediate,
        subLevel: SubLevel.High,
        duration: 60,
        specialization: "Công nghệ thông tin",
        tag: "JavaScript",
      },
      {
        name: "Node.js Backend",
        desc: "Xây dựng REST API với Express",
        price: 450000,
        level: Level.Intermediate,
        subLevel: SubLevel.Low,
        duration: 55,
        specialization: "Công nghệ thông tin",
        tag: "JavaScript",
      },
      {
        name: "TypeScript Advanced",
        desc: "Type system, Generics, Decorators",
        price: 350000,
        level: Level.Intermediate,
        subLevel: SubLevel.Mid,
        duration: 40,
        specialization: "Công nghệ thông tin",
        tag: "TypeScript",
      },

      // Advanced Level - 5 courses
      {
        name: "Microservices Architecture",
        desc: "Thiết kế hệ thống microservices",
        price: 600000,
        level: Level.Advanced,
        subLevel: SubLevel.Low,
        duration: 70,
        specialization: "Công nghệ thông tin",
        tag: "Architecture",
      },
      {
        name: "System Design",
        desc: "Thiết kế hệ thống quy mô lớn",
        price: 700000,
        level: Level.Advanced,
        subLevel: SubLevel.Mid,
        duration: 80,
        specialization: "Công nghệ thông tin",
        tag: "Architecture",
      },
      {
        name: "Distributed Systems",
        desc: "Hệ thống phân tán nâng cao",
        price: 800000,
        level: Level.Advanced,
        subLevel: SubLevel.High,
        duration: 90,
        specialization: "Công nghệ thông tin",
        tag: "Architecture",
      },
      {
        name: "AWS Solutions Architect",
        desc: "Kiến trúc đám mây với AWS",
        price: 750000,
        level: Level.Advanced,
        subLevel: SubLevel.Mid,
        duration: 85,
        specialization: "Công nghệ thông tin",
        tag: "Cloud",
      },
      {
        name: "DevOps Master",
        desc: "CI/CD, Docker, Kubernetes",
        price: 650000,
        level: Level.Advanced,
        subLevel: SubLevel.Low,
        duration: 75,
        specialization: "Công nghệ thông tin",
        tag: "DevOps",
      },
    ];

    const courses: any[] = [];
    for (let i = 0; i < courseData.length; i++) {
      const course = courseData[i];
      const created = await Prisma.course.create({
        data: {
          courseName: course.name,
          courseDescription: course.desc,
          coursePrice: course.price,
          discount: i % 3 === 0 ? 0.2 : i % 2 === 0 ? 0.1 : 0,
          level: course.level,
          subLevel: course.subLevel,
          estimatedDuration: course.duration,
          specialization: course.specialization,
          tag: course.tag,
          createdBy: firstUser.userId,
        },
      });
      courses.push(created);
    }
    console.log(`✅ Đã tạo ${courses.length} courses\n`);

    // ==================== 2. CHAPTERS (15) ====================
    console.log("📖 Seeding 15 Chapters...");

    const chapters = [];
    // Tạo 3 chapters cho 5 courses đầu tiên (3x5 = 15)
    for (let courseIdx = 0; courseIdx < 5; courseIdx++) {
      for (let chapterIdx = 0; chapterIdx < 3; chapterIdx++) {
        const chapterNames = ["Giới thiệu", "Nâng cao", "Thực hành"];
        const chapter = await Prisma.chapter.create({
          data: {
            chapterName: `Chapter ${chapterIdx + 1}: ${
              chapterNames[chapterIdx]
            }`,
            totalLesson: 5,
            courseId: courses[courseIdx].courseId,
          },
        });
        chapters.push(chapter);
      }
    }
    console.log(`✅ Đã tạo ${chapters.length} chapters\n`);

    // ==================== 5. LESSONS (15) ====================
    console.log("📹 Seeding 15 Lessons...");

    const lessons = [];
    // Tạo 5 lessons cho 3 chapters đầu tiên (5x3 = 15)
    for (let chapterIdx = 0; chapterIdx < 3; chapterIdx++) {
      const lessonNames = [
        "Lý thuyết",
        "Demo code",
        "Bài tập",
        "Quiz",
        "Tổng kết",
      ];
      for (let lessonIdx = 0; lessonIdx < 5; lessonIdx++) {
        const lesson = await Prisma.lesson.create({
          data: {
            lessonName: `Bài ${lessonIdx + 1}: ${lessonNames[lessonIdx]}`,
            content: `Nội dung chi tiết bài học ${lessonIdx + 1} trong ${
              chapters[chapterIdx].chapterName
            }`,
            videoUrl: `https://youtube.com/watch?v=example${chapterIdx}${lessonIdx}`,
            isPreview: lessonIdx === 0, // Bài đầu cho preview
            chapterId: chapters[chapterIdx].chapterId,
          },
        });
        lessons.push(lesson);
      }
    }
    console.log(`✅ Đã tạo ${lessons.length} lessons\n`);

    // ==================== 6. CHAPTER QUIZZES (15) ====================
    console.log("📝 Seeding 15 Chapter Quizzes...");

    const chapterQuizzes = [];
    for (let i = 0; i < 15; i++) {
      const quiz = await Prisma.chapterQuiz.create({
        data: {
          title: `Quiz ${chapters[i].chapterName}`,
          description: `Kiểm tra kiến thức sau khi hoàn thành ${chapters[i].chapterName}`,
          duration: 30,
          passingScore: 70,
          totalPoints: 100,
          chapterId: chapters[i].chapterId,
        },
      });
      chapterQuizzes.push(quiz);
    }
    console.log(`✅ Đã tạo ${chapterQuizzes.length} chapter quizzes\n`);

    // ==================== 7. QUIZ QUESTIONS (15) ====================
    console.log("❓ Seeding 15 Quiz Questions...");

    const quizQuestions = [];
    // Tạo 3 questions cho 5 quizzes đầu tiên (3x5 = 15)
    for (let quizIdx = 0; quizIdx < 5; quizIdx++) {
      for (let qIdx = 0; qIdx < 3; qIdx++) {
        const question = await Prisma.quizQuestion.create({
          data: {
            questionText: `Câu hỏi ${
              qIdx + 1
            }: Kiến thức nào quan trọng nhất trong phần này?`,
            questionType: "multiple_choice",
            points: 10,
            chapterQuizId: chapterQuizzes[quizIdx].chapterQuizId,
          },
        });
        quizQuestions.push(question);
      }
    }
    console.log(`✅ Đã tạo ${quizQuestions.length} quiz questions\n`);

    // ==================== 8. QUIZ OPTIONS (60 = 15 questions x 4 options) ====================
    console.log("✔️ Seeding 60 Quiz Options (4 cho mỗi question)...");

    let optionCount = 0;
    for (const question of quizQuestions) {
      for (let optIdx = 0; optIdx < 4; optIdx++) {
        await Prisma.quizOption.create({
          data: {
            optionText: `Đáp án ${String.fromCharCode(
              65 + optIdx
            )}: Lựa chọn số ${optIdx + 1}`,
            isCorrect: optIdx === 0, // Đáp án A đúng
            quizQuestionId: question.quizQuestionId,
          },
        });
        optionCount++;
      }
    }
    console.log(`✅ Đã tạo ${optionCount} quiz options\n`);

    console.log("\n🎉 Seeding data hoàn tất!");
    console.log("\n📊 Tóm tắt:");
    console.log(`   ✅ Courses: ${courses.length}`);
    console.log(`   ✅ Chapters: ${chapters.length}`);
    console.log(`   ✅ Lessons: ${lessons.length}`);
    console.log(`   ✅ Chapter Quizzes: ${chapterQuizzes.length}`);
    console.log(`   ✅ Quiz Questions: ${quizQuestions.length}`);
    console.log(`   ✅ Quiz Options: ${optionCount}`);
    console.log(
      `\n💡 Tổng cộng: ${
        courses.length +
        chapters.length +
        lessons.length +
        chapterQuizzes.length +
        quizQuestions.length +
        optionCount
      } records\n`
    );
    console.log(
      `\n💡 Chạy 'npx ts-node src/scripts/seed-learning-paths.ts' để tạo lộ trình học\n`
    );
  } catch (error) {
    console.error("❌ Lỗi khi seed data:", error);
    throw error;
  } finally {
    await Prisma.$disconnect();
  }
}

seedData().catch((error) => {
  console.error(error);
  process.exit(1);
});
