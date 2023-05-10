import { Image } from "../models/image.js";
import { Post } from "../models/post.js";
import multer from "multer";

export const NewPost = async (req, res) => {
  try {
    const userEmail = "fernando1@gmail.com";

    const {
      title,
      type,
      description,
      operationType,
      city,
      zone,
      condition,
      bath,
      rooms,
      area,
    } = req.body;

    let post = new Post({
      title,
      type,
      description,
      operationType,
      city,
      zone,
      condition,
      bath,
      rooms,
      area,
    });
    post.userEmail = userEmail;
    post.status = true;

    post = await post.save();

    req.postId = post.id;

    res.status(201).json({ reqpostId: `${req.postId}`, pId: `${post.id}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//#region storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    // console.log(file);
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const up = multer({ storage });
//#endregion
export const upload = up.single("image");

export const uploadFile = async (req, res) => {
  try {
    const { id } = req.params;

    //doit in a middleware
    let image = new Image();
    image.title = req.body.title;
    image.description = req.body.description;
    image.filename = req.file.filename;
    image.path = "/img/uploads/" + req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;

    let imagen = new Image();

    image = await image.save();

    let post = await Post.findById(id);

    post.images.push(image.path);

    await post.save();

    return res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deleteImg = async (req, res) => {
  try {
    const { id } = req.params;
    const imageDeleted = await Image.findByIdAndDelete(id);
    //eliminar la imagen
    // await unlink(path.resolve('./src/public' + imageDeleted.path));
    res.status(200).json("Deleted");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
