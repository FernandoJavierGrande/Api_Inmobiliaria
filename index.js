import "dotenv/config";
import "./database/connectbd.js";
import express from "express";
import authRoutes from "./srcAuth/routes/auth.route.js";
import postRoutes from "./srcInm/routes/post.route.js";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/post", postRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, console.log(`Runing on ${PORT}`));
