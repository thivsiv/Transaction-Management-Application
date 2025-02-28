import React from "react";

export function Button({ children, onClick, className, type = "button" }) {
  return (
    <button
      type={type}
      className={`px-4 py-2 bg-rose-400 text-gray-50 rounded-md hover:bg-rose-500 transition shadow-md transform transition-all hover:scale-105 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}