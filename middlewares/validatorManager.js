import { body, param } from "express-validator";
import { validatorResExpress } from "./validatorResExpress.js";
import { roles } from "../utils/roles.js";

export const bodyRegisterValidator = [
  body("email", "Email format incorrect").trim().isEmail().normalizeEmail(),
  body("password", "Password must be at least 8 characters")
    .trim()
    .isLength({ min: 8 }),
  body("password", "Password format incorrect").custom((value, { req }) => {
    if (value !== req.body.repassword) {
      throw new Error("passwords must be match");
    }
    return value;
  }),
  body("role", "Doesn't have authorization")
    .trim()
    .custom((value, { req }) => {
      if (!roles.includes(value)) throw new Error("Role doesn't exist");

      if (req.urole != "admin") throw new Error("Doesn't have authorization");

      return value;
    }),
  validatorResExpress,
];

export const bodyChangePassValidator = [
  body("password", "Password must be at least 8 characters")
    .trim()
    .isLength({ min: 8 }),
  body("newpassword", "Password must be at least 8 characters")
    .trim()
    .isLength({ min: 8 }),
  validatorResExpress,
];

export const bodyLoginValidator = [
  body("email", "Email format wrong").trim().isEmail().normalizeEmail(),
  body("password", "Must be at least 8 characters").trim().isLength({ min: 8 }),
  validatorResExpress,
];

export const paramNoteValidator = [
  param("id", "invalid format").trim().notEmpty().escape(),
  validatorResExpress,
];
export const bodyChangeRoleValidator = [
  body("emailUserToChange", "Email format wrong")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("roleToChange", "Authorization problem")
    .trim()
    .custom((value, { req }) => {
      if (!roles.includes(value)) throw new Error("Role doesn't exist");

      if (req.urole != roles[0]) throw new Error("Doesn't have authorization");

      return value;
    }),
  validatorResExpress,
];
