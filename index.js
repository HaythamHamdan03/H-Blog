import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import Blog from "./blog.js";



const app = express();
const port = 3000;

// Connect to MongoDB
console.log("MongoDB URI:", process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const blogs = await Blog.find();
  res.render("index.ejs", { blogs: blogs });
});

app.post("/submit", (req, res) => {
  res.render("blog.ejs");
});

app.post("/submit-blog", async (req, res) => {
  const newBlog = new Blog({
    name: req.body.name,
    title: req.body.title,
    content: req.body.content,
    topic: req.body.topic,
  });
  await newBlog.save();
  res.redirect("/");
});

app.post("/delete-blog", async (req, res) => {
  const blogId = req.body.id; // Use the blog's ID for deletion
  await Blog.findByIdAndDelete(blogId);
  res.redirect("/");
});

app.post("/edit-blog", async (req, res) => {
  const blogId = req.body.id;
  const blog = await Blog.findById(blogId);
  res.render("edit-blog.ejs", { blog: blog, id: blogId });
});

app.post("/save-blog", async (req, res) => {
  const blogId = req.body.id;
  await Blog.findByIdAndUpdate(blogId, {
    name: req.body.name,
    title: req.body.title,
    content: req.body.content,
    topic: req.body.topic,
  });
  res.redirect("/");
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
