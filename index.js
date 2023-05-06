import "dotenv/config";
import "./database/connectbd.js";
import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
import authRoutes from "./srcAuth/routes/auth.route.js";

const app = express();

// app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, console.log(`Runing on ${PORT}`));
