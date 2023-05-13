import { body } from "express-validator";
import { Image } from "../srcInm/models/image.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
export const upload = multer({ storage }).single("image");

export const imageUpload = (req, res, next) => {
  try {
    let image = new Image();
    image.title = req.body.title;
    image.description = req.body.description;
    image.filename = req.file.filename;
    image.path = "/img/uploads/" + req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;

    req.Image = image;

    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};
