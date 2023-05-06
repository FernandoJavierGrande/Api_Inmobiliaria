import jwt from "jsonwebtoken";
import { tokenVerificationErrors } from "../utils/tokenManager.js";

export const requireToken = (req, res, next) => {
  try {
    let token = req.headers?.authorization;

    if (!token) throw new Error("No token");

    token = token.split(" ")[1]; //select second string(1) separated by split method with space
    const { uid, role } = jwt.verify(token, process.env.JWT);

    req.uid = uid; //this create a new atrib uid for controller then uses for get by userid
    req.urole = role;

    next();
  } catch (error) {
    return res
      .status(401)
      .send({ error: tokenVerificationErrors[error.message] });
  }
};
