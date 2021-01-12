import express from "express";
import appConfig from "./app.config.js";

const app = express();

appConfig(app);

export default app;
