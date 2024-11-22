import React from "react";

// Table.js
export function Table({ children }) {
  return <table className="min-w-full bg-white">{children}</table>;
}

// TableHead.js
export function TableHead({ children }) {
  return <thead>{children}</thead>;
}

// TableHeader.js
export function TableHeader({ children }) {
  return <th className="px-4 py-2">{children}</th>;
}

// TableBody.js
export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

// TableRow.js
export function TableRow({ children }) {
  return <tr>{children}</tr>;
}

// TableCell.js
export function TableCell({ children }) {
  return <td className="border px-4 py-2">{children}</td>;
}
