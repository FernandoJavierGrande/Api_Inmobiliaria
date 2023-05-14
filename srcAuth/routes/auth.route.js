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
  bodyChPassValid,
  bodyChRoleValid,
} from "../../middlewares/validatorManager.js";
import { requireToken } from "../../middlewares/requireToken.js";
import validatorBody from "../../middlewares/validatorBody.js";

const router = express.Router();

router.post(
  "/register",
  requireToken,
  validatorBody,
  bodyRegisterValidator,
  register
); // validar que esté logueado un user by token
router.post("/login", validatorBody, bodyLoginValidator, login);
router.patch(
  "/changepass",
  requireToken,
  validatorBody,
  bodyChPassValid,
  changeOwnPass
);
router.get("/userinfo", requireToken, infoUser);
router.post(
  "/changeRole",
  requireToken,
  validatorBody,
  bodyChRoleValid,
  changeRole
);

export default router;
