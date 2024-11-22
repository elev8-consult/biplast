import React from "react";

// Dialog.js
export function Dialog({ open, onOpenChange, children }) {
  return open ? (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={() => onOpenChange(false)}
      />
      <div className="bg-white rounded-lg shadow-lg p-4 z-10">{children}</div>
    </div>
  ) : null;
}

// DialogContent.js
export function DialogContent({ children }) {
  return <div className="p-4">{children}</div>;
}

// DialogHeader.js
export function DialogHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

// DialogTitle.js
export function DialogTitle({ children }) {
  return <h2 className="text-xl font-bold">{children}</h2>;
}

// DialogDescription.js
export function DialogDescription({ children }) {
  return <p className="text-gray-600">{children}</p>;
}

// DialogFooter.js
export function DialogFooter({ children }) {
  return <div className="mt-4">{children}</div>;
}
