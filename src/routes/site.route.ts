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
import paymentRoute from "./payment.route";
import learningPathRoute from "./learningPath.route";
import testCaseRoute from "./testCase.route";
import testCodeRoute from "./testCode.route";
import codeSubmissionRoute from "./codeSubmission.route";
import uploadRoute from "./upload.route";
import commentRoute from "./comment.route";

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
  app.use("/api/payment", paymentRoute);
  app.use("/api/learning-paths", learningPathRoute);
  app.use("/api/test-cases", testCaseRoute);
  app.use("/api/test-code", testCodeRoute);
  app.use("/api/code-submissions", codeSubmissionRoute);
  app.use("/api/media", uploadRoute);
  app.use("/api/comments", commentRoute);
}

export default setUpRoutes;
