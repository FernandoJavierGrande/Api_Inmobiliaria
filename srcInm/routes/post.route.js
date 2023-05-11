import express from "express";
import {
  NewPost,
  getAllPosts,
  getPostById,
  uploadFile,
} from "../controllers/post.controller.js";
import { imageUpload, upload } from "../../middlewares/imageUpload.js";
import { normalizePost } from "../../middlewares/normalizePost.js";
import { requireToken } from "../../middlewares/requireToken.js";
import { validatorResExpress } from "../../middlewares/validatorResExpress.js";

const router = express.Router();

router.post("/new", requireToken, normalizePost, NewPost);
router.post("/upload/:id", upload, imageUpload, uploadFile);
router.get("/", validatorResExpress, getAllPosts);
router.get("/:id", validatorResExpress, getPostById);

export default router;
