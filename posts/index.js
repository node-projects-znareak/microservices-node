const express = require("express");
const app = express();
const morgan = require("morgan");
const { randomBytes } = require("crypto");
const { readPosts, addPost } = require("./helpers/db");
const axios = require("axios").default;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/posts", (req, res) => {
  const posts = readPosts();
  res.json(posts).status(200);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title, cover_image } = req.body;
  const post = {
    id,
    title,
    cover_image,
    comments: [],
  };
  addPost(post);

  await axios.post("http://localhost:4000/events", {
    type: "PostCreated",
    data: post,
  });

  res.json(post).status(201);
});

app.post("/events", (req, res) => {
  console.log("Received Event:", req.body.type);
  res.json({ status: "OK" }).status(200);
});

app.listen(3000, () => {
  console.log("Posts service listening on port 3000");
});
