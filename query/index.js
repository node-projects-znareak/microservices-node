const express = require("express");
const app = express();
const morgan = require("morgan");
const { addPost, addCommentPost, readPosts } = require("./helpers/db");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/posts", (req, res) => {
  const posts = readPosts();
  res.json(posts).status(200);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  let result = null;
  if (type === "PostCreated") {
    result = addPost(data);
  } else if (type === "CommentCreated") {
    const { id, content, postId } = data;
    result = addCommentPost(postId, { id, content });
  }

  console.log(result);
  res.json({ status: "OK", data: result }).status(200);
});

app.listen(3003, () => {
  console.log("Query service listening on port 3003");
});
