import React from "react";
import { motion } from "framer-motion";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  color?: "light" | "dark" | "tech";
  showText?: boolean;
}

const Logo = ({ size = "md", color = "dark", showText = true }: LogoProps) => {
  const sizeClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-14",
  };

  // Logo source based on color mode
  const logoSrc =
    color === "light"
      ? "/logo-white.png" // Use white logo in dark backgrounds
      : color === "tech"
      ? "/logo-tech.png" // Use tech logo for tech-themed sections
      : "/logo-black.png"; // Use black logo by default

  return (
    <motion.div 
      className="flex items-center gap-2"
      initial={{ opacity: 0.8 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.03 }}
    >
      <img
        src={logoSrc}
        alt="Aprameya Logo"
        className={`${sizeClasses[size]} object-contain`}
      />
      {showText && (
        <div className="flex flex-col">
          <span className="font-bold text-lg leading-tight tracking-tight text-primary">
            Aprameya
          </span>
          <span className="text-xs text-gray-600 leading-tight">
            Autonomous Vehicle Club
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default Logo;
