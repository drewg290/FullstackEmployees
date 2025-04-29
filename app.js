// app.js
import express from "express";
import morgan from "morgan";
import employeesRouter from "./api/employees.js";

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.use("/", employeesRouter);

export default app;
