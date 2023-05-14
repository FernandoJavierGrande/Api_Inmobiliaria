import express from "express";
import {
  NewPost,
  deleteImg,
  getAllPosts,
  getPostById,
  uploadFile,
} from "../controllers/post.controller.js";
import { imageUpload, upload } from "../../middlewares/imageUpload.js";
import { addPostToReq } from "../../middlewares/addPostToReq.js";
import { requireToken } from "../../middlewares/requireToken.js";
import { validatorResExpress } from "../../middlewares/validatorResExpress.js";

const router = express.Router();

router.post("/new", requireToken, addPostToReq, NewPost);
router.post("/upload/:id", upload, imageUpload, uploadFile);
router.get("/", validatorResExpress, getAllPosts);
router.get("/:id", validatorResExpress, getPostById);
router.delete("/image/:id", deleteImg);

export default router;
