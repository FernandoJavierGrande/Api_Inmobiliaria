import "dotenv/config";
import "./database/connectbd.js";
import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
import authRoutes from "./srcAuth/routes/auth.route.js";
import postRoutes from "./srcInm/routes/post.route.js";
import multer from "multer";
const app = express();

// app.use(cookieParser());
app.use(express.json());

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     console.log(file);
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });
// app.use(multer({ storage }).single("image"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/post", postRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, console.log(`Runing on ${PORT}`));
