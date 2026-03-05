import React, { useEffect, useMemo, useState } from "react";
import TodoItem from "./TodoItem";

const STORAGE_KEY = "react_todos_v1";

export default function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | completed

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const filtered = useMemo(() => {
    if (filter === "active") return todos.filter(t => !t.completed);
    if (filter === "completed") return todos.filter(t => t.completed);
    return todos;
  }, [todos, filter]);

  function addTodo(e) {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    setTodos(prev => [
      ...prev,
      { id: crypto.randomUUID(), text: value, completed: false, createdAt: Date.now() },
    ]);
    setText("");
  }

  function toggleTodo(id) {
    setTodos(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }

  function deleteTodo(id) {
    setTodos(prev => prev.filter(t => t.id !== id));
  }

  function clearCompleted() {
    setTodos(prev => prev.filter(t => !t.completed));
  }

  const remaining = todos.filter(t => !t.completed).length;

  return (
    <div className="container">
      <h1>To‑Do List</h1>
      <div className="subtitle">A minimal React app with local storage.</div>

      <form className="row" onSubmit={addTodo}>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button className="primary" type="submit">Add</button>
      </form>

      <div className="filters">
        {["all", "active", "completed"].map(f => (
          <button
            key={f}
            className={`chip ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f[0].toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <ul>
        {filtered.length === 0 ? (
          <div className="empty">No todos here yet—add something above.</div>
        ) : (
          filtered.map(todo => (
            <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />
          ))
        )}
      </ul>

      <div className="footer">
        <span>{remaining} item{remaining !== 1 ? "s" : ""} left</span>
        <button
          onClick={clearCompleted}
          style={{
            background: "#ecfeff",
            color: "#155e75",
            border: "1px solid #a5f3fc",
            padding: "8px 10px",
            borderRadius: 10,
            cursor: "pointer",
          }}
        >
          Clear completed
        </button>
      </div>
    </div>
  );
}
