import { Express } from "express";
import userRoute from "./user.route";
import chapterRoute from "./chapter.route";
import courseRoute from "./course.route"

function setUpRoutes(app: Express){
    app.use("/api/v1/users", userRoute); 
    app.use("/api/v1/courses", courseRoute);
    app.use("/api/v1/chapters", chapterRoute);
}

export default setUpRoutes;