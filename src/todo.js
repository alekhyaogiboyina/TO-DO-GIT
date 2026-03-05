import React from "react";

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 12px",
        border: "1px solid #e5e7eb",
        borderRadius: 10,
        marginBottom: 10,
        background: "#fff",
      }}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`Mark ${todo.text} as ${todo.completed ? "incomplete" : "complete"}`}
      />
      <span
        style={{
          flex: 1,
          textDecoration: todo.completed ? "line-through" : "none",
          color: todo.completed ? "#9ca3af" : "#111827",
        }}
      >
        {todo.text}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        style={{
          background: "#fee2e2",
          color: "#991b1b",
          border: "1px solid #fecaca",
          padding: "8px 10px",
          borderRadius: 10,
          cursor: "pointer",
        }}
      >
        Delete
      </button>
    </li>
  );
}
