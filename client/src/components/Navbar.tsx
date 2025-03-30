import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Logo from './icons/Logo';

const Navbar = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Fetch current user
  const { data: user, isLoading } = useQuery({
    queryKey: ['/api/users/me'],
    staleTime: 5000,
  });

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

  const getInitials = (username: string) => {
    return username?.substring(0, 2).toUpperCase() || 'A';
  };

  const handleLogout = async () => {
    try {
      await apiRequest('/api/logout', { method: 'POST' });
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
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
            
            {!user ? (
              <Link href="/login" className="ml-2 px-4 py-2 rounded-full bg-primary text-white hover:bg-opacity-90 transition-all">
                Login
              </Link>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarFallback className="bg-primary text-white">
                      {getInitials(user.username)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="p-2 font-medium text-sm">
                    Signed in as <span className="font-bold">{user.username}</span>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">Profile</Link>
                  </DropdownMenuItem>
                  
                  {/* Admin links */}
                  {user.role === 'ADMIN' && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="cursor-pointer">Admin Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/core-team" className="cursor-pointer">Core Team Dashboard</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  
                  {/* Core Team links */}
                  {user.role === 'CORE' && (
                    <DropdownMenuItem asChild>
                      <Link href="/core-team" className="cursor-pointer">Core Team Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="cursor-pointer text-red-500 focus:text-red-500"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
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
            
            {!user ? (
              <Link href="/login"
                className="py-2 px-4 rounded-full bg-primary text-white hover:bg-opacity-90 transition-all w-full text-center"
                onClick={closeMobileMenu}
              >
                Login
              </Link>
            ) : (
              <>
                <hr className="border-t border-gray-200" />
                <Link href="/profile"
                  className={`py-2 font-medium hover:text-primary transition-colors ${isActive('/profile')}`}
                  onClick={closeMobileMenu}
                >
                  Profile
                </Link>
                
                {/* Admin links */}
                {user.role === 'ADMIN' && (
                  <>
                    <Link href="/admin"
                      className={`py-2 font-medium hover:text-primary transition-colors ${isActive('/admin')}`}
                      onClick={closeMobileMenu}
                    >
                      Admin Dashboard
                    </Link>
                    <Link href="/core-team"
                      className={`py-2 font-medium hover:text-primary transition-colors ${isActive('/core-team')}`}
                      onClick={closeMobileMenu}
                    >
                      Core Team Dashboard
                    </Link>
                  </>
                )}
                
                {/* Core Team links */}
                {user.role === 'CORE' && (
                  <Link href="/core-team"
                    className={`py-2 font-medium hover:text-primary transition-colors ${isActive('/core-team')}`}
                    onClick={closeMobileMenu}
                  >
                    Core Team Dashboard
                  </Link>
                )}
                
                <button
                  onClick={() => {
                    closeMobileMenu();
                    handleLogout();
                  }}
                  className="py-2 font-medium text-red-500 hover:text-red-700 transition-colors text-left"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
