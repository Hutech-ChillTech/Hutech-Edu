import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import route from "./routes/site.route";

import { connectPostgresDB } from "./configs/database.config";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(morgan("dev"));

route(app);

connectPostgresDB();

export default app;
