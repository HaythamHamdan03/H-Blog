import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  name: String,
  title: String,
  content: String,
  topic: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
