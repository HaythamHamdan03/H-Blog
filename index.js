import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var blogs = [];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { blogs: blogs });
});

app.post("/submit", (req, res) => {
  res.render("blog.ejs");
});

app.post("/submit-blog", (req, res) => {
  const newBlog = {
    name: req.body["name"],
    title: req.body["title"],
    content: req.body["content"],
    topic: req.body["topic"],
  };
  blogs.push(newBlog);
  res.redirect("/");
});

app.post("/delete-blog", (req, res) => {
  const blogIndex = req.body.index; // Index of the blog to be deleted
  blogs.splice(blogIndex, 1); // Remove the blog at the given index
  res.redirect("/");
});
app.post("/edit-blog", (req, res) => {
  const blogIndex = req.body.index;
  const blog = blogs[blogIndex];
  res.render("edit-blog.ejs", { blog: blog, index: blogIndex });
});

// Save the Changes to the Blog
app.post("/save-blog", (req, res) => {
  const blogIndex = req.body.index;
  blogs[blogIndex] = {
    name: req.body["name"],
    title: req.body["title"],
    content: req.body["content"],
    topic: req.body["topic"],
  };
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
