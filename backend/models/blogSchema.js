import { model, Schema } from "mongoose";

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    visibility: { type: String, enum: ["public", "private"] },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Blog = model("Blog", BlogSchema);
