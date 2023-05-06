import mongoose from "mongoose";

try {
  await mongoose.connect(process.env.DB);
  console.log("db connected");
} catch (error) {
  console.log("db error");
}
