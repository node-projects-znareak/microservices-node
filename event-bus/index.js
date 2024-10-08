const express = require("express");
const app = express();
const axios = require("axios").default;
const morgan = require("morgan");

const events = []

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/events", async (req, res) => {
  const event = req.body;
  events.push(event)

  try {
    const result = await Promise.all([
      axios.post("http://localhost:3000/events", event), //posts service
      axios.post("http://localhost:3001/events", event), // comments service
      axios.post("http://localhost:3003/events", event), // query service
      axios.post("http://localhost:3004/events", event), // moderation service
    ]);
    res.json({ status: "OK" }).status(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: error.message });
  }
});

app.get("/events", (req, res) => {
  res.json(events).status(200);
});

app.listen(4000, () => {
  console.log("Event bus service listening on port 4000");
});
