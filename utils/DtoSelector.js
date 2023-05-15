import {
  loginDtoModel,
  postDto,
  changeRoleDtoModel,
  changePassDto,
  registerDto,
  postDtoUpdate,
} from "../Dtos/DTOModels.js";

const Dtos = {
  login: loginDtoModel,
  changeRole: changeRoleDtoModel,
  changeRole: changePassDto,
  register: registerDto,
  newPost: postDto,
  updatePost: postDtoUpdate,
};

export const DtoSelector = (req) => {
  let route = req.url;
  route = route.substring(1);

  for (const key in Dtos) {
    if (key == route) {
      req.Dto = Dtos[key];
      return true;
    }
  }
  return false;
};
