const express = require("express");
const app = express();
const morgan = require("morgan");
const axios = require("axios").default;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const { content, ...comment } = data;
    const status = content.includes("orange") ? "rejected" : "approved";

    await axios.post("http://localhost:4000/events", {//event bus
      type: "CommentModerated",
      data: { ...comment, content, status },
    });
  }
  res.json({ status: "OK" }).status(200);
});

app.listen(3004, () => {
  console.log("Moderation service listening on port 3004");
});
