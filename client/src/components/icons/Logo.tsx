interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'light' | 'dark';
}

const Logo = ({ size = 'md', color = 'dark' }: LogoProps) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
  };

  // Choose the appropriate logo based on the color mode
  const logoSrc = color === 'dark' 
    ? './attached_assets/Aprameya Logo-Black.png'
    : './attached_assets/Aprameya Logo-White.png';
  
  // For tech mode (could be used in special sections)
  const techLogoSrc = './attached_assets/Aprameya Logo-tech.png';

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
