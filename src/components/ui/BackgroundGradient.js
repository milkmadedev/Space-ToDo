import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}) => {
  return (
    <div className={cn("relative p-[5px]  rounded-lg overflow-hidden", containerClassName)}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500"
        animate={animate ? {
          opacity: [0.5, 1, 0.5],
        } : {}}
        transition={animate ? {
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        } : {}}
      />
      <div className={cn(
        "relative z-10 bg-[#1A1A1A] rounded-lg p-4",
        "shadow-[0_0_15px_rgba(0,255,255,0.5)]", // Add glow effect
        className
      )}>
        {children}
      </div>
    </div>
  );
};