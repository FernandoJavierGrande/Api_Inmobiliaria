import { generateToken } from "../../utils/tokenManager.js";
import { User } from "../models/User.js";
import Jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const userAdmin = await User.findById(req.uid);

    if (!userAdmin || userAdmin.role != "admin") {
      throw new Error("User without permission");
    }

    const { email, password, role } = req.body;

    let user = await User.findOne({ email }); //buscar si existe cuando se pase por param, validar con token?

    if (user) throw new Error("this Email already exists");

    user = new User({ email, password, role });
    user.registerBy = userAdmin.email;

    await user.save();

    return res.status(201).json({ user: user });
  } catch (error) {
    return res.status(403).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) return res.status(403).json({ error: "user or pass wrong" });

    const respuestaPassword = await user.comparePassword(password);
    if (!respuestaPassword)
      return res.status(403).json({ error: "user or pass wrong" });

    // Generate token jwt
    const { token, expiresIn, role } = generateToken(user.id, user.role);

    return res.json({ token, expiresIn, role });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const infoUser = async (req, res) => {
  try {
    const user = await User.findById(req.uid).lean();
    return res.json({ email: user.email, uid: user.id, urole: user.role });
  } catch (error) {
    return res.status(500).json({ error: "server error" });
  }
};

export const changeOwnPass = async (req, res) => {
  try {
    const id = req.uid;
    const { password, newpassword } = req.body;
    // const {newpassword} = req.body.password;

    const user = await User.findById(id);

    if (!user) return res.status(404).json({ error: "user or pass wrong" });

    const respuestaPassword = await user.comparePassword(password);
    if (!respuestaPassword)
      return res.status(403).json({ error: "user or pass wrong" });

    user.password = newpassword;

    await user.save();

    return res.status(202).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Server error" });
  }
};
export const changeRole = async (req, res) => {
  try {
    const { emailUserToChange, roleToChange } = req;

    if (roleToChange == "admin") return res.status(200).json("Changed");

    const user = await User.findOne(emailUserToChange);

    if (!user) return res.status(404).json("Error");
    user.role = "admin";

    await user.save();

    return res.status(200).json("Changed");
  } catch (error) {
    return res.status(500).json({ erros: "Server error, try again later" });
  }
};
