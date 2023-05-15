import { postDto } from "../Dtos/DTOModels.js";

// progar generico
export const postToDto = (post) => {
  let publicationDto = postDto;

  for (const key in publicationDto) {
    publicationDto[key] = post[key];
  }

  return publicationDto;
};
