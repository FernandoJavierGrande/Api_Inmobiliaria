import fs from "fs";
import { User } from "../../srcAuth/models/User.js";
import { postToDto } from "../../utils/postToDTO.js";
import { Image } from "../models/image.js";
import { Post } from "../models/post.js";
// import { PostDto } from "../../utils/PostToDtoPost.js";
import { Console } from "console";
import { postDto } from "../../Dtos/DTOModels.js";

export const NewPost = async (req, res) => {
  try {
    const user = await User.findById(req.uid);

    if (!user) throw new Error("authorization error");

    if (user.role !== req.urole) throw new Error("authorization error");

    req.post.userEmail = user.email;
    req.post.status = true;

    let post = await req.post.save();

    res.status(201).json({ reqpostId: `${post.id}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updatePost = async (req, res) => {
  try {
    const { uid } = req.uid;

    const user = await User.findById(uid);

    req.post.userEmail = user.email;
    req.post.status = true;

    let postDB = Post.findById(req.post.id);

    if (!postDB) {
      return res.status(404).json("Post doesn't exist");
    }

    postDB = req.post;

    let post = await postDB.save();

    res.status(201).json({ reqpostId: `${post.id}` });

    if (!user) throw new Error("authorization error");
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};
export const uploadFile = async (req, res) => {
  try {
    const { id } = req.params;

    let image = req.Image;

    let post = await Post.findById(id);

    if (!post) {
      return res.status(404).json("invalid Request");
    }

    image = await image.save();

    post.images.push({ id: image.id, path: image.path });

    await post.save();

    let postDto = postToDto(post);

    return res.status(201).json(postDto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    if (posts) {
      return res.json(posts);
    } else {
      return res.status(204);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (post) {
      // let postDto = postToDto(post);

      return res.json(post);
    } else {
      return res.status(404).json(`Publication id: ${id} doesn't exist`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const dirname =
  "C:\\Users\\ferna\\Desktop\\Cursos\\JS\\inmobiliaria\\uploads\\";
export const deleteImg = async (req, res) => {
  try {
    const { id } = req.params;
    const { idImage } = req.body;

    let post = await Post.findById(id);
    const index = post.images.indexOf(idImage);
    post.images.splice(index, 1);

    await post.save();

    const image = await Image.findById(idImage);

    await Image.findByIdAndDelete(image.id);

    fs.unlink(dirname + image.filename, (err) => {
      if (err) {
        throw new Error("Could not delete the file. " + err);
      }
      return res.status(200).json("Deleted");
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
