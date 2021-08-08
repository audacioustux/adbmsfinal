import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import config from "./config";

const {
  cors: { whitelist },
} = config;

const app = express();

app.use(
  cors({
    origin: whitelist,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
