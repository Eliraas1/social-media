import express, { Express } from "express";
import env from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import router from "./routes/index.route";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import session from "cookie-session";
import cookieParser from "cookie-parser";
// import * from "meta.url"
import { fileURLToPath } from "url";
env.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app: Express = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(express.static((__dirname = "/")));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());
// app.use(session());
app.use(cors());
app.use(router);
mongoose.set("strictQuery", false);

export default app;
