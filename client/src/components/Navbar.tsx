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
    return location === path ? 'nav-active text-accent border-b-2 border-accent' : '';
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white bg-opacity-90 backdrop-blur-sm shadow-md' : 'bg-white'}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" onClick={closeMobileMenu}>
            <a className="flex items-center space-x-2">
              <Logo />
            </a>
          </Link>
          
          <div className="hidden md:flex space-x-6 items-center">
            <Link href="/">
              <a className={`nav-link py-2 font-medium hover:text-primary transition-colors ${isActive('/')}`}>
                Home
              </a>
            </Link>
            <Link href="/projects">
              <a className={`nav-link py-2 font-medium hover:text-primary transition-colors ${isActive('/projects')}`}>
                Projects
              </a>
            </Link>
            <Link href="/blogs">
              <a className={`nav-link py-2 font-medium hover:text-primary transition-colors ${isActive('/blogs')}`}>
                Blogs
              </a>
            </Link>
            <Link href="/research">
              <a className={`nav-link py-2 font-medium hover:text-primary transition-colors ${isActive('/research')}`}>
                Research
              </a>
            </Link>
            <Link href="/events">
              <a className={`nav-link py-2 font-medium hover:text-primary transition-colors ${isActive('/events')}`}>
                Events
              </a>
            </Link>
            <Link href="/about">
              <a className={`nav-link py-2 font-medium hover:text-primary transition-colors ${isActive('/about')}`}>
                About
              </a>
            </Link>
            <Link href="/login">
              <a className="nav-link ml-4 px-4 py-2 rounded-full bg-primary text-white hover:bg-opacity-90 transition-all btn-glow">
                Login
              </a>
            </Link>
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu} 
              className="text-dark focus:outline-none"
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
            <Link href="/">
              <a 
                className={`nav-link py-2 font-medium hover:text-primary transition-colors ${isActive('/')}`}
                onClick={closeMobileMenu}
              >
                Home
              </a>
            </Link>
            <Link href="/projects">
              <a 
                className={`nav-link py-2 font-medium hover:text-primary transition-colors ${isActive('/projects')}`}
                onClick={closeMobileMenu}
              >
                Projects
              </a>
            </Link>
            <Link href="/blogs">
              <a 
                className={`nav-link py-2 font-medium hover:text-primary transition-colors ${isActive('/blogs')}`}
                onClick={closeMobileMenu}
              >
                Blogs
              </a>
            </Link>
            <Link href="/research">
              <a 
                className={`nav-link py-2 font-medium hover:text-primary transition-colors ${isActive('/research')}`}
                onClick={closeMobileMenu}
              >
                Research
              </a>
            </Link>
            <Link href="/events">
              <a 
                className={`nav-link py-2 font-medium hover:text-primary transition-colors ${isActive('/events')}`}
                onClick={closeMobileMenu}
              >
                Events
              </a>
            </Link>
            <Link href="/about">
              <a 
                className={`nav-link py-2 font-medium hover:text-primary transition-colors ${isActive('/about')}`}
                onClick={closeMobileMenu}
              >
                About
              </a>
            </Link>
            <Link href="/login">
              <a 
                className="nav-link py-2 px-4 rounded-full bg-primary text-white hover:bg-opacity-90 transition-all w-full text-center"
                onClick={closeMobileMenu}
              >
                Login
              </a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
