import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'light' | 'dark';
}

const Logo = ({ size = 'md', color = 'dark' }: LogoProps) => {
  const sizeClasses = {
    sm: 'h-10',
    md: 'h-12',
    lg: 'h-16',
  };

  // Always use black logo for the site in light mode
  const logoSrc = color === 'light' 
    ? '/logo-white.png'  // Only use white logo in dark backgrounds like footer
    : '/logo-black.png'; // Use black logo everywhere else
  
  // For tech mode (could be used in special sections)
  const techLogoSrc = '/logo-tech.png';

  return (
    <div className="flex items-center space-x-2">
      <img 
        src={logoSrc} 
        alt="Aprameya Logo" 
        className={`${sizeClasses[size]} object-contain`} 
      />
    </div>
  );
};

export default Logo;
