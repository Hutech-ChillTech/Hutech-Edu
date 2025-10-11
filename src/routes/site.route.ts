import { Express } from "express";
import userRoute from "./user.route";

function setUpRoutes(app: Express){
    app.use("/api/v1/users", userRoute);
}

export default setUpRoutes;