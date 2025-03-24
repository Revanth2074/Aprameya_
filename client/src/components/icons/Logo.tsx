import { useEffect, useState } from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'light' | 'dark' | 'auto';
}

const Logo = ({ size = 'md', color = 'auto' }: LogoProps) => {
  const [currentColor, setCurrentColor] = useState<'light' | 'dark'>(color === 'auto' ? 'dark' : color);
  
  useEffect(() => {
    // If color is set to auto, update it based on dark mode
    if (color === 'auto') {
      // Check if dark mode is enabled
      const isDarkMode = document.documentElement.classList.contains('dark');
      setCurrentColor(isDarkMode ? 'light' : 'dark');
      
      // Add event listener for theme changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'class') {
            const isDark = document.documentElement.classList.contains('dark');
            setCurrentColor(isDark ? 'light' : 'dark');
          }
        });
      });
      
      observer.observe(document.documentElement, { attributes: true });
      
      return () => {
        observer.disconnect();
      };
    } else {
      setCurrentColor(color);
    }
  }, [color]);
  
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
  };

  // Choose the appropriate logo based on the color mode
  const logoSrc = currentColor === 'dark' 
    ? '/attached_assets/Aprameya Logo-Black.png'
    : '/attached_assets/Aprameya Logo-White.png';
  
  // For tech mode (could be used in special sections)
  const techLogoSrc = '/attached_assets/Aprameya Logo-tech.png';

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
