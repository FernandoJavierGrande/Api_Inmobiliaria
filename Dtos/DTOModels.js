export const loginDtoModel = {
  type: "object",
  properties: {
    email: { type: String },
    password: { type: String },
  },
  //   required: ["email", "password"],
  //   additionalProperties: false,
};
export const changeRoleDtoModel = {
  type: "object",
  properties: {
    emailUserToChange: String,
    roleToChange: String,
  },
};
export const changePassDto = {
  type: "Object",
  properties: {
    password: String,
    newPassword: String,
  },
};
export const registerDto = {
  type: "object",
  properties: {
    email: String,
    password: String,
    role: String,
  },
};
export const postDtoSchema = {
  title: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  operationType: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zone: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  bath: {
    type: Number,
    required: true,
  },
  rooms: {
    type: Number,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
  images: [
    {
      id: String,
      path: String,
    },
    { _id: false },
  ],
  created_at: {
    type: Date,
    default: Date.now(),
  },
};
