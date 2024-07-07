"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState("TOP");

  const rotateDirection = (currentDirection) => {
    const directions = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  };

  const movingMap = {
    TOP: "radial-gradient(20.7% 50% at 50% 0%, #00FFFF 0%, rgba(0, 255, 255, 0) 100%)",
    LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, #00FFFF 0%, rgba(0, 255, 255, 0) 100%)",
    BOTTOM: "radial-gradient(20.7% 50% at 50% 100%, #00FFFF 0%, rgba(0, 255, 255, 0) 100%)",
    RIGHT: "radial-gradient(16.2% 41.199999999999996% at 100% 50%, #00FFFF 0%, rgba(0, 255, 255, 0) 100%)",
  };

  const highlight = "radial-gradient(75% 181.15942028985506% at 50% 50%, #00FFFF 0%, rgba(0, 255, 255, 0) 100%)";

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered, duration, clockwise]);

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative overflow-hidden inline-flex items-center justify-center",
        "p-[3px]", // Added padding to create the lip
        containerClassName
      )}
      {...props}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration: duration }}
      />
      <div
        className={cn(
          "relative z-10 px-3 py-2 bg-[#0A0A0A] rounded-full", // Added background and rounded corners
          "flex items-center justify-center w-full h-full",
          className
        )}
      >
        {children}
      </div>
    </Tag>
  );
}