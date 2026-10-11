import { useState, useEffect } from "react";
import "./App.css";


function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
const [events, setEvents] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
  fetch("http://localhost:5000/api/events")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Could not load events");
      }
      return response.json();
    })
    .then((data) => {
      setEvents(data);
      setLoading(false);
    })
    .catch(() => {
      setError("Could not load events. Please check the backend server.");
      setLoading(false);
    });
}, []);
  const categories = [
    "All",
    "Workshop",
    "Competition",
    "Cultural",
    "Sports",
  ];

  const filteredEvents = events.filter((event) => {
const title = (event.title || "").toLowerCase();
const description = (event.description || "").toLowerCase();
const searchText = search.toLowerCase();

const matchesSearch =
  title.includes(searchText) ||
  description.includes(searchText);

    const matchesCategory =
      category === "All" || event.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app">
      <header className="header">
        <h1>CampusFlow 🎓</h1>
        <p>Your campus life, all in one place.</p>
      </header>

      <main className="main">
        <h2>Discover Campus Events</h2>
        <p>Find workshops, competitions, and activities happening around you.</p>

{loading && <p>Loading campus events...</p>}
{error && <p>{error}</p>}
        <div className="filters">
          <input
            type="text"
            placeholder="🔍 Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search events"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filter by category"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === "All" ? "All Categories" : item}
              </option>
            ))}
          </select>
        </div>

        <p>
          Showing {filteredEvents.length} event
          {filteredEvents.length !== 1 ? "s" : ""}
        </p>

        <div className="events">
          {filteredEvents.map((event) => (
            <div className="event-card" key={event.id}>
              <span className="category">{event.category}</span>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>📅 {event.date}</p>
              <p>📍 {event.venue}</p>
              <button onClick={() => alert(`${event.title}\n\n${event.description}\n\nVenue: ${event.venue}\nDate: ${event.date}`)}>
                View Event
              </button>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <p>No events found. Try another search or category.</p>
        )}
      </main>
    </div>
  );
}

export default App;