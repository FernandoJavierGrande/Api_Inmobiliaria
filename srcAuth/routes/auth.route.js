import express from "express";
import {
  login,
  register,
  infoUser,
  changeOwnPass,
  changeRole,
} from "../controllers/auth.controller.js";
import {
  bodyRegisterValidator,
  bodyLoginValidator,
  bodyChangePassValidator,
  bodyChangeRoleValidator,
} from "../../middlewares/validatorManager.js";
import { requireToken } from "../../middlewares/requireToken.js";

const router = express.Router();

router.post("/register", requireToken, bodyRegisterValidator, register); // validar que esté logueado un user by token
router.post("/login", bodyLoginValidator, login);
router.patch(
  "/changepass",
  requireToken,
  bodyChangePassValidator,
  changeOwnPass
);
router.get("/userinfo", requireToken, infoUser);
router.post("/changeRole", requireToken, bodyChangeRoleValidator, changeRole);

export default router;
