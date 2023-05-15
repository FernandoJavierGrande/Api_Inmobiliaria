import express from "express";
import {
  NewPost,
  deleteImg,
  getAllPosts,
  getPostById,
  updatePost,
  uploadFile,
} from "../controllers/post.controller.js";
import { imageUpload, upload } from "../../middlewares/imageUpload.js";
import { addPostToReq } from "../../middlewares/addPostToReq.js";
import {
  requireAdminToken,
  requireToken,
} from "../../middlewares/requireToken.js";
import { validatorResExpress } from "../../middlewares/validatorResExpress.js";
import validatorBody from "../../middlewares/validatorBody.js";
import { paramValidator } from "../../middlewares/validatorManager.js";

const router = express.Router();

router.post(
  "/newPost",
  requireAdminToken,
  validatorBody,
  addPostToReq,
  NewPost
);
router.put(
  "/updatePost",
  requireAdminToken,
  validatorBody,
  addPostToReq,
  updatePost
);
router.post("/upload/:id", upload, imageUpload, uploadFile);
router.get("/", validatorResExpress, getAllPosts);
router.get("/:id", validatorResExpress, getPostById);
router.delete("/image/:id", requireToken, paramValidator, deleteImg);

export default router;
