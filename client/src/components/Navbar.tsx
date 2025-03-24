import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import Logo from './icons/Logo';

const Navbar = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location === path ? 'text-primary border-b-2 border-primary' : '';
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white bg-opacity-90 backdrop-blur-sm shadow-md' 
        : 'bg-white'
    }`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" onClick={closeMobileMenu} className="flex items-center space-x-2">
            <Logo color="dark" />
          </Link>
          
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/" className={`py-2 font-medium hover:text-primary transition-colors ${isActive('/')}`}>
              Home
            </Link>
            <Link href="/projects" className={`py-2 font-medium hover:text-primary transition-colors ${isActive('/projects')}`}>
              Projects
            </Link>
            <Link href="/blogs" className={`py-2 font-medium hover:text-primary transition-colors ${isActive('/blogs')}`}>
              Blogs
            </Link>
            <Link href="/research" className={`py-2 font-medium hover:text-primary transition-colors ${isActive('/research')}`}>
              Research
            </Link>
            <Link href="/events" className={`py-2 font-medium hover:text-primary transition-colors ${isActive('/events')}`}>
              Events
            </Link>
            <Link href="/about" className={`py-2 font-medium hover:text-primary transition-colors ${isActive('/about')}`}>
              About
            </Link>
            
            <Link href="/login" className="ml-2 px-4 py-2 rounded-full bg-primary text-white hover:bg-opacity-90 transition-all">
              Login
            </Link>
          </div>
          
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMobileMenu} 
              className="text-slate-800 focus:outline-none"
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
              className={`py-2 font-medium hover:text-primary transition-colors ${isActive('/')}`}
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link href="/projects"
              className={`py-2 font-medium hover:text-primary transition-colors ${isActive('/projects')}`}
              onClick={closeMobileMenu}
            >
              Projects
            </Link>
            <Link href="/blogs"
              className={`py-2 font-medium hover:text-primary transition-colors ${isActive('/blogs')}`}
              onClick={closeMobileMenu}
            >
              Blogs
            </Link>
            <Link href="/research"
              className={`py-2 font-medium hover:text-primary transition-colors ${isActive('/research')}`}
              onClick={closeMobileMenu}
            >
              Research
            </Link>
            <Link href="/events"
              className={`py-2 font-medium hover:text-primary transition-colors ${isActive('/events')}`}
              onClick={closeMobileMenu}
            >
              Events
            </Link>
            <Link href="/about"
              className={`py-2 font-medium hover:text-primary transition-colors ${isActive('/about')}`}
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
