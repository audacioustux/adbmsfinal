import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import config from "./config";
import api from "./api";

const {
  cors: { whitelist },
} = config;

const app = express();

console.log(whitelist);
app.use(
  cors({
    origin: whitelist,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", api);

export default app;
