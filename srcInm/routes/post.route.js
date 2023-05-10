import express from "express";
import { NewPost, upload, uploadFile } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/new", NewPost);
router.post("/upload/:id", upload, uploadFile);

export default router;
