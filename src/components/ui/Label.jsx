import React from "react";

// Label.js
export function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="font-semibold text-gray-700">
      {children}
    </label>
  );
}
