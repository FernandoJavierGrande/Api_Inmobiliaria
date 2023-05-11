import { User } from "../../srcAuth/models/User.js";
import { postToDto } from "../../utils/postDTO.js";
import { Image } from "../models/image.js";
import { Post } from "../models/post.js";

export const NewPost = async (req, res) => {
  try {
    const user = await User.findById(req.uid);

    if (!user) throw new Error("authorization error");

    if (user.role != req.urole) throw new Error("authorization error");

    req.post.userEmail = user.email;
    req.post.status = true;

    let post = await req.post.save();

    res.status(201).json({ reqpostId: `${post.id}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const uploadFile = async (req, res) => {
  try {
    const { id } = req.params;

    let image = req.Image;

    image = await image.save();

    let post = await Post.findById(id);

    post.images.push(image.path);

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
      let postDto = new Array();
      posts.forEach((post) => {
        postDto.push(postToDto(post));
      });

      return res.json(postDto);
    } else {
      return res.status(204);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (post) {
      let postDto = postToDto(post);

      return res.json(postDto);
    } else {
      return res.status(404).json(`Publication id: ${id} doesn't exist`);
    }
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
