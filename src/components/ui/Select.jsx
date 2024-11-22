import React from "react";

// Select.js
export function Select({ id, value, onValueChange, children }) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className="border rounded w-full px-2 py-1"
    >
      {children}
    </select>
  );
}
