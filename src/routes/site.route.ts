import { Express } from "express";
import userRoute from "./user.route";
import chapterRoute from "./chapter.route";
import courseRoute from "./course.route";
import lessonRoute from "./lesson.route";
import enrollmentRoute from "./enrollment.route";
import quizRoute from "./quiz.route";
import submissionRoute from "./submission.route";
import certificateRoute from "./certificate.route";
import learningSpeedRoute from "./learningSpeed.route";

function setUpRoutes(app: Express) {
  app.use("/api/users", userRoute);
  app.use("/api/courses", courseRoute);
  app.use("/api/chapters", chapterRoute);
  app.use("/api/lessons", lessonRoute);
  app.use("/api/enrollments", enrollmentRoute);
  app.use("/api/quizzes", quizRoute);
  app.use("/api/submissions", submissionRoute);
  app.use("/api/certificates", certificateRoute);
  app.use("/api/learning-speed", learningSpeedRoute);
}

export default setUpRoutes;
