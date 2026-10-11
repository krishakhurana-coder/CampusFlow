
const express = require("express");
const cors = require("cors");

const app = express();
let events = [
  { id: 1, title: "Web Development Workshop", category: "Workshop", date: "2026-10-20", venue: "Engineering Block" },
  { id: 2, title: "Campus Coding Challenge", category: "Competition", date: "2026-10-24", venue: "Computer Lab" },
  { id: 3, title: "Dance Society Auditions", category: "Cultural", date: "2026-10-28", venue: "Auditorium" }
];


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CampusFlow backend is running!");
});

app.get("/api/events", (req, res) => {
  res.json(events);
});

app.post("/api/events", (req, res) => {
  const newEvent = req.body;

  if (!newEvent.title || !newEvent.category) {
    return res.status(400).json({
      message: "Title and category are required"
    });
  }

  newEvent.id = Date.now();
  events.push(newEvent);

  res.status(201).json({
    message: "Event added successfully!",
    event: newEvent
  });
});


app.listen(5000, () => {
  console.log("CampusFlow backend running on http://localhost:5000");
});