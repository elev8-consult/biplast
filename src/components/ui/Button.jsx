import React from "react";

// Button.js
export function Button({
  children,
  onClick,
  variant = "default",
  type = "button",
}) {
  const baseStyles = "px-4 py-2 rounded text-white";
  const variantStyles = {
    default: "bg-blue-600 hover:bg-blue-700",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-100",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      {children}
    </button>
  );
}
