interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'light' | 'dark';
}

const Logo = ({ size = 'md', color = 'dark' }: LogoProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-lg',
    md: 'w-10 h-10 text-xl',
    lg: 'w-12 h-12 text-2xl',
  };

  const bgColor = color === 'dark' ? 'bg-primary' : 'bg-white';
  const textColor = color === 'dark' ? 'text-white' : 'text-primary';
  const logoTextColor = color === 'dark' ? 'text-primary' : 'text-white';

  return (
    <div className="flex items-center space-x-2">
      <div className={`${sizeClasses[size]} rounded-full ${bgColor} flex items-center justify-center`}>
        <span className={`font-space font-bold ${textColor}`}>A</span>
      </div>
      <span className={`font-space font-bold ${size === 'lg' ? 'text-2xl' : 'text-xl'} ${logoTextColor}`}>
        AprameyaKLU
      </span>
    </div>
  );
};

export default Logo;
