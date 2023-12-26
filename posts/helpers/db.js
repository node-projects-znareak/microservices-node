const path = require("path");
const fs = require("fs");
const postsPath = path.join(process.cwd(), "database.json");

const readPosts = () => {
  const postsJson = fs.readFileSync(postsPath, "utf8");
  return JSON.parse(postsJson);
};

const addPost = (post) => {
  const posts = readPosts();
  posts[post.id] = post;
  fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2));
  return post;
};

module.exports = {
  readPosts,
  addPost,
};
