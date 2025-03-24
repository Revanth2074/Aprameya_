import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import Logo from './icons/Logo';

const Navbar = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('aprameya-theme');
    let currentTheme: 'light' | 'dark';
    
    if (savedTheme === 'dark' || savedTheme === 'light') {
      currentTheme = savedTheme;
    } else {
      // Check system preference for dark mode
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      currentTheme = prefersDark ? 'dark' : 'light';
    }
    
    setTheme(currentTheme);
    
    // Apply the theme
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Save theme preference
    localStorage.setItem('aprameya-theme', newTheme);
    
    // Apply theme to document
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const isActive = (path: string) => {
    return location === path ? 'text-primary border-b-2 border-primary' : '';
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white bg-opacity-90 backdrop-blur-sm shadow-md dark:bg-slate-900 dark:bg-opacity-90' 
        : 'bg-white dark:bg-slate-900'
    }`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" onClick={closeMobileMenu} className="flex items-center space-x-2">
            <Logo color={theme === 'dark' ? 'light' : 'dark'} />
          </Link>
          
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/" className={`py-2 font-medium hover:text-primary transition-colors dark:text-white ${isActive('/')}`}>
              Home
            </Link>
            <Link href="/projects" className={`py-2 font-medium hover:text-primary transition-colors dark:text-white ${isActive('/projects')}`}>
              Projects
            </Link>
            <Link href="/blogs" className={`py-2 font-medium hover:text-primary transition-colors dark:text-white ${isActive('/blogs')}`}>
              Blogs
            </Link>
            <Link href="/research" className={`py-2 font-medium hover:text-primary transition-colors dark:text-white ${isActive('/research')}`}>
              Research
            </Link>
            <Link href="/events" className={`py-2 font-medium hover:text-primary transition-colors dark:text-white ${isActive('/events')}`}>
              Events
            </Link>
            <Link href="/about" className={`py-2 font-medium hover:text-primary transition-colors dark:text-white ${isActive('/about')}`}>
              About
            </Link>
            
            {/* Theme toggle button */}
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full text-slate-600 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800"
            >
              {theme === 'light' ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75a9.75 9.75 0 01-9.75-9.75 9.75 9.75 0 011.5-5.25 9.75 9.75 0 0112 4.5 9.75 9.75 0 01-1.03 10.98" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              )}
            </button>
            
            <Link href="/login" className="ml-2 px-4 py-2 rounded-full bg-primary text-white hover:bg-opacity-90 transition-all">
              Login
            </Link>
          </div>
          
          <div className="md:hidden flex items-center space-x-2">
            {/* Theme toggle button */}
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full text-slate-600 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800"
            >
              {theme === 'light' ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75a9.75 9.75 0 01-9.75-9.75 9.75 9.75 0 011.5-5.25 9.75 9.75 0 0112 4.5 9.75 9.75 0 01-1.03 10.98" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              )}
            </button>
            
            <button 
              onClick={toggleMobileMenu} 
              className="text-slate-800 dark:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className={`md:hidden pt-4 pb-2 animate-fadeIn ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="flex flex-col space-y-3">
            <Link href="/" 
              className={`py-2 font-medium hover:text-primary transition-colors dark:text-white ${isActive('/')}`}
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link href="/projects"
              className={`py-2 font-medium hover:text-primary transition-colors dark:text-white ${isActive('/projects')}`}
              onClick={closeMobileMenu}
            >
              Projects
            </Link>
            <Link href="/blogs"
              className={`py-2 font-medium hover:text-primary transition-colors dark:text-white ${isActive('/blogs')}`}
              onClick={closeMobileMenu}
            >
              Blogs
            </Link>
            <Link href="/research"
              className={`py-2 font-medium hover:text-primary transition-colors dark:text-white ${isActive('/research')}`}
              onClick={closeMobileMenu}
            >
              Research
            </Link>
            <Link href="/events"
              className={`py-2 font-medium hover:text-primary transition-colors dark:text-white ${isActive('/events')}`}
              onClick={closeMobileMenu}
            >
              Events
            </Link>
            <Link href="/about"
              className={`py-2 font-medium hover:text-primary transition-colors dark:text-white ${isActive('/about')}`}
              onClick={closeMobileMenu}
            >
              About
            </Link>
            <Link href="/login"
              className="py-2 px-4 rounded-full bg-primary text-white hover:bg-opacity-90 transition-all w-full text-center"
              onClick={closeMobileMenu}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
