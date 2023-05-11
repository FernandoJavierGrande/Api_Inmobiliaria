import { Post } from "../srcInm/models/post.js";
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const postDtoSchema = new Schema({
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
  images: {
    type: [String],
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const PostDto = model("PostDto", postDtoSchema);

export const postToDto = (post) => {
  let postDto = new PostDto();

  postDto._id = post._id;
  postDto.title = post.title;
  postDto.type = post.type;
  postDto.description = post.description;
  postDto.operationType = post.operationType;
  postDto.city = post.city;
  postDto.zone = post.zone;
  postDto.condition = post.condition;
  postDto.bath = post.bath;
  postDto.rooms = post.rooms;
  postDto.area = post.area;
  postDto.created_at = post.created_at;
  postDto.images = post.images;

  return postDto;
};
