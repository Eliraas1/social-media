import express, { Express } from "express";
import env from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import router from "./routes/index.route";
import mongoose from "mongoose";
env.config();

const app: Express = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(router);
mongoose.set("strictQuery", false);

export default app;
