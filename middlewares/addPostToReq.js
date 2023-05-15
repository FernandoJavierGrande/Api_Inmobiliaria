import { Post } from "../srcInm/models/post.js";
import { roles } from "../utils/roles.js";

//builds a new obj in req called req.post. grouping all attributes on one property type post
export const addPostToReq = (req, res, next) => {
  try {
    if (!roles.includes(req.urole)) throw new Error("Unauthorized");

    const {
      id,
      status,
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
      id,
      status,
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
    console.log("add post " + req.post);
    next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// const roles = ["admin", "vendedor"];
