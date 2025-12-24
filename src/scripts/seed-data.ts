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
        name: "HTML & CSS Cơ Bản",
        desc: "Khóa học HTML & CSS nền tảng dành cho người mới bắt đầu: cấu trúc website với HTML, styling với CSS, box model, layout cơ bản (Flexbox), responsive và xây dựng giao diện web hoàn chỉnh.",
        price: 100000,
        level: Level.Basic,
        subLevel: SubLevel.Low,
        duration: 20,
        specialization: "Công nghệ thông tin",
        tag: "HTML & CSS",
        avatarUrl: "/assest/htmlcss.png",
      },
      {
        name: "JavaScript cơ bản",
        desc: "Khóa học JavaScript nền tảng dành cho người mới bắt đầu: biến, kiểu dữ liệu, toán tử, điều kiện, vòng lặp, hàm, mảng, object và tư duy lập trình JavaScript.",
        price: 200000,
        level: Level.Basic,
        subLevel: SubLevel.Mid,
        duration: 30,
        specialization: "Công nghệ thông tin",
        tag: "JavaScript",
        avatarUrl: "/assest/javascript.png",
      },
      {
        name: "JavaScript nâng cao",
        desc: "Khóa học JavaScript nâng cao tập trung vào ES6+, scope & closure, hoisting, this, asynchronous JavaScript (Promises, Async/Await), xử lý bất đồng bộ và tối ưu tư duy viết code JavaScript hiện đại.",
        price: 300000,
        level: Level.Basic,
        subLevel: SubLevel.High,
        duration: 50,
        specialization: "Công nghệ thông tin",
        tag: "JavaScript",
        avatarUrl: "/assest/javascript2.png",
      },
      {
        name: "Python cơ bản",
        desc: "Khóa học lập trình Python từ con số 0 dành cho người mới bắt đầu: biến, kiểu dữ liệu, điều kiện, vòng lặp, hàm, list, tuple, dictionary và tư duy lập trình Python.",
        price: 150000,
        level: Level.Basic,
        subLevel: SubLevel.Low,
        duration: 40,
        specialization: "Công nghệ thông tin",
        tag: "Python",
        avatarUrl: "/assest/python.png",
      },
      {
        name: "Git và GitHub",
        desc: "Khóa học Git & GitHub dành cho người mới bắt đầu: quản lý phiên bản với Git, làm việc với repository, branch, merge, xử lý conflict và làm việc nhóm trên GitHub.",
        price: 100000,
        level: Level.Basic,
        subLevel: SubLevel.Low,
        duration: 10,
        specialization: "Công nghệ thông tin",
        tag: "GitHub",
        avatarUrl: "/assest/git.png",
      },

      // Intermediate Level - 5 courses
      {
        name: "React cơ bản",
        desc: "Khóa học React cơ bản giúp bạn xây dựng giao diện người dùng hiện đại với React: component, JSX, props, state, event, conditional rendering, hooks cơ bản và quản lý dữ liệu trong ứng dụng.",
        price: 200000,
        level: Level.Intermediate,
        subLevel: SubLevel.Low,
        duration: 50,
        specialization: "Công nghệ thông tin",
        tag: "React",
        avatarUrl: "/assest/react.png",
      },
      {
        name: "React + Redux",
        desc: "State management với Redux Toolkit",
        price: 350000,
        level: Level.Intermediate,
        subLevel: SubLevel.Mid,
        duration: 55,
        specialization: "Công nghệ thông tin",
        tag: "React",
        avatarUrl: "/assest/react-redux.png",
      },
      {
        name: "Phát triển Web Full-stack với Next.js",
        desc: "Xây dựng ứng dụng web Full-stack với Next.js: SSR, SSG, API Routes, Authentication, Database, SEO và Deploy thực tế.",
        price: 300000,
        level: Level.Intermediate,
        subLevel: SubLevel.High,
        duration: 80,
        specialization: "Công nghệ thông tin",
        tag: "Next.js",
        avatarUrl: "/assest/nextjs.png",
      },
      {
        name: "Node.js Backend Development",
        desc: "Khóa học Node.js Backend giúp bạn xây dựng RESTful API với Express: kiến trúc backend, routing, middleware, Authentication & Authorization, kết nối Database, xử lý lỗi và triển khai backend thực tế.",
        price: 300000,
        level: Level.Intermediate,
        subLevel: SubLevel.Low,
        duration: 60,
        specialization: "Công nghệ thông tin",
        tag: "Node.js",
        avatarUrl: "/assest/nodejs.png",
      },
      {
        name: "TypeScript Nâng Cao",
        desc: "Khóa học TypeScript nâng cao tập trung vào hệ thống kiểu dữ liệu: type vs interface, generics, utility types, advanced types, decorators, cấu hình TypeScript và áp dụng TypeScript hiệu quả trong React, Node.js và Next.js.",
        price: 350000,
        level: Level.Intermediate,
        subLevel: SubLevel.Mid,
        duration: 40,
        specialization: "Công nghệ thông tin",
        tag: "TypeScript",
        avatarUrl: "/assest/typescript.png",
      },

      // Advanced Level - 5 courses
      {
        name: "Microservices Architecture",
        desc: "Khóa học thiết kế kiến trúc Microservices giúp bạn xây dựng hệ thống backend quy mô lớn: phân tách service, giao tiếp giữa các service, API Gateway, Service Discovery, Database per Service, xử lý fault tolerance và triển khai hệ thống thực tế.",
        price: 600000,
        level: Level.Advanced,
        subLevel: SubLevel.Low,
        duration: 70,
        specialization: "Công nghệ thông tin",
        tag: "Architecture",
        avatarUrl: "/assest/microservices.png",
      },
      {
        name: "System Design",
        desc: "Khóa học System Design giúp bạn thiết kế hệ thống quy mô lớn: phân tích yêu cầu, high-level & low-level design, scalability, load balancing, caching, database design, message queue, consistency và xử lý các bài toán system design thực tế.",
        price: 700000,
        level: Level.Advanced,
        subLevel: SubLevel.Mid,
        duration: 80,
        specialization: "Công nghệ thông tin",
        tag: "Architecture",
        avatarUrl: "/assest/systemdesign.png",
      },
      {
        name: "Distributed Systems",
        desc: "Khóa học Distributed Systems nâng cao giúp bạn hiểu và thiết kế hệ thống phân tán ở quy mô lớn: communication giữa node, replication, sharding, consistency models, CAP theorem, consensus (Raft/Paxos), fault tolerance, distributed transactions và các bài toán thực tế trong hệ thống phân tán.",
        price: 800000,
        level: Level.Advanced,
        subLevel: SubLevel.High,
        duration: 90,
        specialization: "Công nghệ thông tin",
        tag: "Architecture",
        avatarUrl: "/assest/distributedsystems.png",
      },
      {
        name: "AWS Solutions Architect",
        desc: "Khóa học AWS Solutions Architect giúp bạn thiết kế kiến trúc đám mây với AWS: EC2, VPC, S3, RDS, IAM, Load Balancer, Auto Scaling, kiến trúc high availability, scalability, security và triển khai hệ thống cloud thực tế.",
        price: 750000,
        level: Level.Advanced,
        subLevel: SubLevel.Mid,
        duration: 85,
        specialization: "Công nghệ thông tin",
        tag: "Cloud",
        avatarUrl: "/assest/awssolutionsarchitect.png",
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
          avatarURL: course.avatarUrl,
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
