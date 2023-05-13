export const loginDtoModel = {
  type: "object",
  properties: {
    email: { type: String },
    password: { type: String },
  },
  //   required: ["email", "password"],
  //   additionalProperties: false,
};
export const chRoleDtoModel = {
  type: "object",
  properties: {
    emailUserToChange: String,
    roleToChange: String,
  },
};
