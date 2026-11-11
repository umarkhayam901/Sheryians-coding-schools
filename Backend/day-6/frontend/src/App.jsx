
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "https://sheryians-coding-schools-1.onrender.com/api/notes";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);
  const [editDescription, setEditDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // GET - Fetch notes from MongoDB
  const fetchNotes = async () => {
    try {
      const response = await axios.get(API_URL);

      console.log("GET API Response:", response.data);

      // Your backend returns { message, note }
      const fetchedNotes = response.data.notes;

      if (!Array.isArray(fetchedNotes)) {
        throw new Error("GET API did not return a notes array");
      }

      setNotes(fetchedNotes);
      setError("");
    } catch (err) {
      console.error("GET Error:", err);
      setError("Unable to load notes. Check backend and API response.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // POST - Create note
  const handleCreate = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) return;

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await axios.post(API_URL, {
        title: title.trim(),
        description: description.trim(),
      });

      setTitle("");
      setDescription("");

      await fetchNotes();
      setSuccess("Note created successfully!");
    } catch (err) {
      console.error("POST Error:", err);
      setError("Failed to create note.");
    } finally {
      setSaving(false);
    }
  };

  // PATCH - Update description
  const handleUpdate = async (id) => {
    if (!editDescription.trim()) {
      setError("Description cannot be empty.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await axios.patch(`${API_URL}/${id}`, {
        description: editDescription.trim(),
      });

      setEditId(null);
      setEditDescription("");

      await fetchNotes();
      setSuccess("Note updated successfully!");
    } catch (err) {
      console.error("PATCH Error:", err);
      setError("Failed to update note.");
    } finally {
      setSaving(false);
    }
  };

  // DELETE - Delete note
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) return;

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await axios.delete(`${API_URL}/${id}`);

      if (editId === id) {
        setEditId(null);
        setEditDescription("");
      }

      await fetchNotes();
      setSuccess("Note deleted successfully!");
    } catch (err) {
      console.error("DELETE Error:", err);
      setError("Failed to delete note.");
    } finally {
      setSaving(false);
    }
  };

  const startEditing = (note) => {
    setEditId(note._id);
    setEditDescription(note.description || "");
    setError("");
    setSuccess("");
  };

  const cancelEditing = () => {
    setEditId(null);
    setEditDescription("");
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>My Notes</h1>
        <p>MERN Stack CRUD Application - Day 6</p>
      </header>

      <main>
        <section className="form-section">
          <h2>Create New Note</h2>

          <form onSubmit={handleCreate}>
            <label htmlFor="note-title">Title</label>
            <input
              id="note-title"
              type="text"
              placeholder="Enter note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label htmlFor="note-description">
              Description
            </label>
            <textarea
              id="note-description"
              placeholder="Write your note..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <button
              className="add-btn"
              type="submit"
              disabled={saving}
            >
              {saving ? "Please wait..." : "+ Add Note"}
            </button>
          </form>
        </section>

        {error && (
          <p className="message error-message" role="alert">
            {error}
          </p>
        )}

        {success && (
          <p className="message success-message" role="status">
            {success}
          </p>
        )}

        <section className="notes-section">
          <div className="notes-heading">
            <h2>All Notes</h2>
            <span className="notes-count">
              {notes.length} Notes
            </span>
          </div>

          {loading ? (
            <p className="empty-message">
              Loading notes...
            </p>
          ) : notes.length === 0 ? (
            <p className="empty-message">
              No notes found. Create your first note!
            </p>
          ) : (
            <div className="notes-container">
              {notes.map((note) => (
                <article
                  className="note-card"
                  key={note._id}
                >
                  <h3>{note.title}</h3>

                  {editId === note._id ? (
                    <div className="edit-section">
                      <label htmlFor={`edit-${note._id}`}>
                        Edit Description
                      </label>

                      <textarea
                        id={`edit-${note._id}`}
                        value={editDescription}
                        onChange={(e) =>
                          setEditDescription(e.target.value)
                        }
                      />

                      <div className="card-actions">
                        <button
                          className="save-btn"
                          type="button"
                          disabled={saving}
                          onClick={() =>
                            handleUpdate(note._id)
                          }
                        >
                          Save Changes
                        </button>

                        <button
                          className="cancel-btn"
                          type="button"
                          disabled={saving}
                          onClick={cancelEditing}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="note-description">
                        {note.description}
                      </p>

                      <div className="card-actions">
                        <button
                          className="update-btn"
                          type="button"
                          disabled={saving}
                          onClick={() => startEditing(note)}
                        >
                          Update
                        </button>

                        <button
                          className="delete-btn"
                          type="button"
                          disabled={saving}
                          onClick={() =>
                            handleDelete(note._id)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="app-footer">
        React + Express.js + Node.js + MongoDB
      </footer>
    </div>
  );
}

export default App;
