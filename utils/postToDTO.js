import { postDtoSchema } from "../Dtos/DTOModels.js";

// progar generico
export const postToDto = (post) => {
  let postDto = postDtoSchema;

  for (const key in postDto) {
    postDto[key] = post[key];
  }

  return postDto;
};
