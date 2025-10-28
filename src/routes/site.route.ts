import { Express } from "express";
import userRoute from "./user.route";
import chapterRoute from "./chapter.route";
import courseRoute from "./course.route";
import lessonRoute from "./lesson.route";
import enrollmentRoute from "./enrollment.route";
import quizRoute from "./quiz.route";

function setUpRoutes(app: Express) {
  app.use("/api/users", userRoute);
  app.use("/api/courses", courseRoute);
  app.use("/api/chapters", chapterRoute);
  app.use("/api/lessons", lessonRoute);
  app.use("/api/enrollments", enrollmentRoute);
  app.use("/api/quizzes", quizRoute);
}

export default setUpRoutes;
