const express = require("express");
const app = express();
const morgan = require("morgan");
const axios = require("axios").default;
const { addPost, addCommentPost, readPosts, readPostById, writePosts } = require("./helpers/db");

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
    const { id, content, postId, status } = data;
    result = addCommentPost(postId, { id, content, status });
  } else if (type === "CommentUpdated") {
    const { id, content, status, postId } = data;
    const post = readPostById(postId);

    const comment = post.comments.find((c) => c.id === id);
    comment.content = content;
    comment.status = status;
    result = comment;

    const allPosts = readPosts();
    writePosts({
      ...allPosts,
      [postId]: post,
    });
  }

  console.log(result);
  res.json({ status: "OK", data: result }).status(200);
});

function handleEvent(type, data) {}

app.listen(3003, async () => {
  console.log("Query service listening on port 3003");
  try {
    const res = await axios.get("http://localhost:4000/events"); // event bust service

    for (let event of res.data) {
      console.log("Processing event:", event.type);

      handleEvent(event.type, event.data);
    }
  } catch (error) {
    console.log(error.message);
  }
});
 