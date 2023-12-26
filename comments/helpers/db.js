const path = require("path");
const fs = require("fs");
const commentsPath = path.join(process.cwd(), "database.json");

const readComments = () => {
  const commentsJson = fs.readFileSync(commentsPath, "utf8");
  return JSON.parse(commentsJson) || [];
};

const readCommentsByPostId = (postId) => {
  const comments = readComments();
  return comments[postId] || [];
};

const addComment = (postId, comment) => {
  const allComments = readComments();
  const comments = readCommentsByPostId(postId);
  comments.unshift(comment);
  fs.writeFileSync(
    commentsPath,
    JSON.stringify(
      {
        ...allComments,
        [postId]: comments,
      },
      null,
      2
    )
  );
  return comment;
};

module.exports = {
  readCommentsByPostId,
  addComment,
  readComments,
};
