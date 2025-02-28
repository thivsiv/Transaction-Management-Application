import React from "react";
import { motion } from "framer-motion";

const moneyVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: [0, 1, 1, 0],
    y: [20, -40, -60],
    transition: { duration: 2, repeat: Infinity, delay: Math.random() * 2 },
  },
};

export function Card({ children, className }) {
  return (
    <div className={`relative text-center rounded-lg p-6 bg-white transform transition-all hover:scale-105 ${className}`}>
      {children}
      {[...Array(4)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-green-500 text-xl"
          style={{
            left: i === 0 || i === 1 ? `${Math.random() * 20 + 10}%` : undefined, // Left side
            right: i === 2 || i === 3 ? `${Math.random() * 20 + 10}%` : undefined, // Right side
            bottom: `${Math.random() * 10 + 10}%`, // Random bottom positioning for all
            top: undefined, // Remove the top to avoid conflicting positions
          }}
          variants={moneyVariants}
          initial="initial"
          animate="animate"
        >
          $$$
          
        </motion.span>
      ))}
    </div>
  );
}

export function CardContent({ children }) {
  return <div className="mt-2 text-rose-300">{children}</div>;
}
