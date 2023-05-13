import mongoose from "mongoose";

const { Schema, model } = mongoose;

const postSchema = new Schema({
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
  userEmail: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  images: [
    new Schema(
      {
        id: String,
        path: String,
      },
      { _id: false }
    ),
  ],

  created_at: {
    type: Date,
    default: Date.now(),
  },
});

export const Post = model("Post", postSchema);
