const express = require("express");
const app = express();
const morgan = require("morgan");
const { randomBytes } = require("crypto");
const { addComment, readCommentsByPostId } = require("./helpers/db");
const axios = require("axios").default;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.get("/posts/:id/comments", (req, res) => {
  const commentId = req.params.id;
  const comments = readCommentsByPostId(commentId);
  res.json(comments).status(200);
});

app.post("/posts/:id/comments", async (req, res) => {
  const { content } = req.body;
  const postId = req.params.id;
  const commentId = randomBytes(4).toString("hex");

  const comment = {
    id: commentId,
    content,
  };
  addComment(postId, comment);

  await axios.post("http://localhost:4000/events", {
    type: "CommentCreated",
    data: comment,
  })
  
  res.json(comment).status(201);
});

app.post("/events", (req, res) => {
  console.log("Received Event:", req.body.type);
  res.json({ status: "OK" }).status(200);
});

app.listen(3001, () => {
  console.log("Listening on port 3001");
});
