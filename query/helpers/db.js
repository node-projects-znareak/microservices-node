const path = require("path");
const fs = require("fs");
const postsPath = path.join(process.cwd(), "database.json");

const readPosts = () => {
  const postsJson = fs.readFileSync(postsPath, "utf8");
  return JSON.parse(postsJson);
};

const readPostById = (id) => {
  const posts = readPosts();
  return posts[id];
};

const writePosts = (posts) => {
  fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
};

const addPost = (post) => {
  const posts = readPosts();
  posts[post.id] = {
    ...post,
    comments: [],
  };
  fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
  return post;
};

const addCommentPost = (postId, comment) => {
  const posts = readPosts();
  const post = posts[postId];
  post.comments.push(comment);
  fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
  return post;
};

module.exports = {
  addCommentPost,
  readPosts,
  readPostById,
  addPost,
  writePosts,
};
