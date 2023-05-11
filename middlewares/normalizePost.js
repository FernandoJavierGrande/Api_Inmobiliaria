import { Post } from "../srcInm/models/post.js";
import { roles } from "../utils/roles.js";

export const normalizePost = (req, res, next) => {
  try {
    if (!roles.includes(req.urole)) throw new Error("Unauthorized");

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
    req.post = post;
    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// const roles = ["admin", "vendedor"];
