import { useState, useEffect } from "react";
import "./App.css";


function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
const [events, setEvents] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [showForm, setShowForm] = useState(false);
const [title, setTitle] = useState("");
const [eventCategory, setEventCategory] = useState("Workshop");
const [venue, setVenue] = useState("");

useEffect(() => {
  fetch("https://campusflow-l6r0.onrender.com/api/events")
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

const addEvent = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("https://campusflow-l6r0.onrender.com/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        category: eventCategory,
        venue,
        date: "2026-11-01",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Could not add event");
      return;
    }

    setEvents((currentEvents) => [...currentEvents, data.event]);
    setTitle("");
    setVenue("");
    setShowForm(false);
    alert("Event added successfully!");
  } catch {
    alert("Could not add event. Please check the backend.");
  }
};

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
<button onClick={() => setShowForm(!showForm)}>
  {showForm ? "Cancel" : "+ Add Event"}
</button>

{showForm && (
  <form onSubmit={addEvent}>
    <input
      type="text"
      placeholder="Event title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      required
    />

    <select
      value={eventCategory}
      onChange={(e) => setEventCategory(e.target.value)}
    >
      <option value="Workshop">Workshop</option>
      <option value="Competition">Competition</option>
      <option value="Cultural">Cultural</option>
      <option value="Sports">Sports</option>
    </select>

    <input
      type="text"
      placeholder="Venue"
      value={venue}
      onChange={(e) => setVenue(e.target.value)}
      required
    />

    <button type="submit">Save Event</button>
  </form>
)}

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