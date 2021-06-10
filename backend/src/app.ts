import "reflect-metadata";
import express from "express";
import cors from "cors";
import CouponRouter from "./routes/coupon";

const app = express();

app.use(cors())
app.use(express.json());
app.use("/coupon", CouponRouter);

export default app;