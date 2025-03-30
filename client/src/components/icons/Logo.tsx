import React from "react";
import { motion } from "framer-motion";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  color?: "light" | "dark" | "tech";
  showText?: boolean;
}

const Logo = ({ size = "md", color = "dark", showText = true }: LogoProps) => {
  const sizeClasses = {
    sm: "h-9",
    md: "h-11",
    lg: "h-16",
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
      className="flex items-center gap-3"
      initial={{ opacity: 0.9 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="relative">
        <img
          src={logoSrc}
          alt="Aprameya Logo"
          className={`${sizeClasses[size]} object-contain drop-shadow-sm`}
          style={{ filter: "contrast(1.1) brightness(1.05)" }}
        />
      </div>
      {showText && (
        <div className="flex flex-col ml-1">
          <span className="font-bold text-xl leading-tight tracking-tight text-primary">
            Aprameya
          </span>
          <span className="text-xs font-medium text-gray-600 leading-tight">
            Autonomous Vehicle Club
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default Logo;
