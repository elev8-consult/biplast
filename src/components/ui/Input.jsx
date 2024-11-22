import React from "react";

// Input.js
export function Input({ id, type = "text", ...rest }) {
  return (
    <input
      id={id}
      type={type}
      className="border rounded w-full px-2 py-1"
      {...rest}
    />
  );
}
