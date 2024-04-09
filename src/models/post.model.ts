import mongoose from "mongoose";
import { Schema } from "mongoose";

const postSchema = new Schema(
  {
    userId: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Post =
  mongoose.models?.posts || mongoose.model("posts", postSchema);
