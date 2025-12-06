import { PrismaClient, Level } from "@prisma/client";

const Prisma = new PrismaClient();

async function seedGamification() {
  console.log("🎮 Bắt đầu seed gamification data...\n");

  try {
    // 1. Seed Level Requirements
    console.log("📊 Seed Level Requirements...");
    const levelRequirements = [
      {
        level: "Basic" as Level,
        minXP: 0,
        maxXP: 1000,
        title: "Beginner",
        perks: { discount: 0, badge: "🌱", description: "Người mới bắt đầu" },
      },
      {
        level: "Intermediate" as Level,
        minXP: 1000,
        maxXP: 5000,
        title: "Intermediate",
        perks: {
          discount: 5,
          badge: "⭐",
          description: "Học viên trung cấp - Giảm giá 5%",
        },
      },
      {
        level: "Advanced" as Level,
        minXP: 5000,
        maxXP: null,
        title: "Expert",
        perks: {
          discount: 10,
          badge: "🏆",
          description: "Chuyên gia - Giảm giá 10%",
        },
      },
    ];

    for (const levelData of levelRequirements) {
      await Prisma.levelRequirement.upsert({
        where: { level: levelData.level },
        update: levelData,
        create: levelData,
      });
      console.log(
        `   ✅ Level "${levelData.level}" - ${levelData.title} (${levelData.minXP} XP)`
      );
    }

    // 2. Seed Achievements
    console.log("\n🏅 Seed Achievements...");
    const achievements = [
      // Lesson Achievements
      {
        name: "First Steps",
        description: "Hoàn thành bài học đầu tiên",
        icon: "👶",
        xpReward: 25,
        category: "lesson",
        requirement: { type: "complete_lessons", count: 1 },
        isActive: true,
        rarity: "common",
      },
      {
        name: "Beginner",
        description: "Hoàn thành 5 bài học",
        icon: "🎯",
        xpReward: 50,
        category: "lesson",
        requirement: { type: "complete_lessons", count: 5 },
        isActive: true,
        rarity: "common",
      },
      {
        name: "Lesson Master",
        description: "Hoàn thành 50 bài học",
        icon: "📚",
        xpReward: 200,
        category: "lesson",
        requirement: { type: "complete_lessons", count: 50 },
        isActive: true,
        rarity: "rare",
      },
      {
        name: "Lesson Legend",
        description: "Hoàn thành 100 bài học",
        icon: "⚡",
        xpReward: 500,
        category: "lesson",
        requirement: { type: "complete_lessons", count: 100 },
        isActive: true,
        rarity: "epic",
      },

      // Course Achievements
      {
        name: "Course Starter",
        description: "Hoàn thành khóa học đầu tiên",
        icon: "🎓",
        xpReward: 150,
        category: "course",
        requirement: { type: "complete_courses", count: 1 },
        isActive: true,
        rarity: "common",
      },
      {
        name: "Course Enthusiast",
        description: "Hoàn thành 5 khóa học",
        icon: "🌟",
        xpReward: 300,
        category: "course",
        requirement: { type: "complete_courses", count: 5 },
        isActive: true,
        rarity: "rare",
      },
      {
        name: "Course Master",
        description: "Hoàn thành 10 khóa học",
        icon: "🏆",
        xpReward: 750,
        category: "course",
        requirement: { type: "complete_courses", count: 10 },
        isActive: true,
        rarity: "epic",
      },
      {
        name: "Course Champion",
        description: "Hoàn thành 20 khóa học",
        icon: "👑",
        xpReward: 1500,
        category: "course",
        requirement: { type: "complete_courses", count: 20 },
        isActive: true,
        rarity: "legendary",
      },

      // Quiz Achievements
      {
        name: "Quiz Champion",
        description: "Đạt điểm pass 10 quiz",
        icon: "🎯",
        xpReward: 100,
        category: "quiz",
        requirement: { type: "pass_quizzes", count: 10 },
        isActive: true,
        rarity: "common",
      },
      {
        name: "Perfect Score",
        description: "Đạt 100% điểm 5 quiz",
        icon: "💯",
        xpReward: 250,
        category: "quiz",
        requirement: { type: "perfect_quizzes", count: 5 },
        isActive: true,
        rarity: "rare",
      },
      {
        name: "Quiz Master",
        description: "Đạt điểm pass 50 quiz",
        icon: "🎓",
        xpReward: 500,
        category: "quiz",
        requirement: { type: "pass_quizzes", count: 50 },
        isActive: true,
        rarity: "epic",
      },

      // Speed Achievements
      {
        name: "Speed Learner",
        description: "Hoàn thành khóa học trong 7 ngày",
        icon: "⚡",
        xpReward: 200,
        category: "speed",
        requirement: { type: "complete_course_fast", days: 7 },
        isActive: true,
        rarity: "rare",
      },
      {
        name: "Lightning Fast",
        description: "Hoàn thành khóa học trong 3 ngày",
        icon: "🚀",
        xpReward: 500,
        category: "speed",
        requirement: { type: "complete_course_fast", days: 3 },
        isActive: true,
        rarity: "epic",
      },
    ];

    for (const achievementData of achievements) {
      await Prisma.achievement.upsert({
        where: { name: achievementData.name },
        update: achievementData,
        create: achievementData,
      });
      console.log(
        `   ✅ Achievement "${achievementData.name}" [${achievementData.rarity}] - ${achievementData.xpReward} XP`
      );
    }

    // 3. Update existing users với default gamification fields
    console.log("\n👤 Cập nhật users với default gamification data...");
    await Prisma.user.updateMany({
      data: {
        experiencePoints: 0,
        currentLevelXP: 0,
        nextLevelXP: 1000, // First level requirement
        totalCoursesCompleted: 0,
      },
    });
    console.log(`   ✅ Đã cập nhật tất cả users`);

    console.log("\n🎉 Hoàn tất seed gamification data!");
  } catch (error) {
    console.error("❌ Lỗi khi seed gamification:", error);
    throw error;
  } finally {
    await Prisma.$disconnect();
  }
}

seedGamification()
  .then(() => {
    console.log("\n✅ Seed completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Seed failed:", error);
    process.exit(1);
  });
