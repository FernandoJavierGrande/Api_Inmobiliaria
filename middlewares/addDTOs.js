import { chRoleDtoModel, loginDtoModel } from "../Dtos/DTOModels.js";

export const DtoLogin = (req, res, next) => {
  req.Dto = loginDtoModel;
  next();
};

export const DtoChangeRole = (req, res, next) => {
  req.Dto = chRoleDtoModel;
  next();
};
