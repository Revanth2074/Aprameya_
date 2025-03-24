import { useState } from 'react';
import { Link } from 'wouter';
import Logo from '../components/icons/Logo';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'aspirant', // Default role is aspirant and cannot be changed
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.name,
          email: formData.email,
          password: formData.password
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || 'Failed to sign up');
        return;
      }

      window.location.href = '/login';
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to sign up');
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 flex items-center fadeIn bg-slate-50">
      <div className="container mx-auto">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <Link href="/" className="inline-flex items-center justify-center">
                <Logo size="lg" color="dark" />
              </Link>
              <h1 className="font-bold text-2xl mt-4 mb-2">Join Aprameya</h1>
              <p className="text-foreground/60">Become part of our innovative community</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-foreground/70 font-medium mb-2">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-2 rounded-lg border border-muted focus:outline-none focus:ring-2 focus:ring-primary/50" 
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-foreground/70 font-medium mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-2 rounded-lg border border-muted focus:outline-none focus:ring-2 focus:ring-primary/50" 
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="role" className="block text-foreground/70 font-medium mb-2">Role</label>
                <div className="w-full px-4 py-2 rounded-lg border border-muted bg-gray-100">
                  <span>Aspirant</span>
                  <p className="text-xs mt-1 text-gray-500">New members start as Aspirants. Admins can promote to Core Team later.</p>
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-foreground/70 font-medium mb-2">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  className="w-full px-4 py-2 rounded-lg border border-muted focus:outline-none focus:ring-2 focus:ring-primary/50" 
                  placeholder="********"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-foreground/70 font-medium mb-2">Confirm Password</label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  className="w-full px-4 py-2 rounded-lg border border-muted focus:outline-none focus:ring-2 focus:ring-primary/50" 
                  placeholder="********"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex items-center mb-6">
                <input 
                  type="checkbox" 
                  id="agreeToTerms" 
                  className="w-4 h-4 text-primary border-muted rounded focus:ring-primary/50"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  required
                />
                <label htmlFor="agreeToTerms" className="ml-2 text-sm text-foreground/70">
                  I agree to the <span className="text-primary hover:underline cursor-pointer">Terms of Service</span> and <span className="text-primary hover:underline cursor-pointer">Privacy Policy</span>
                </label>
              </div>
              <button 
                type="submit" 
                className="w-full px-4 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-all btn-glow"
              >
                Sign Up
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-foreground/60">
                Already a member? <Link href="/login" className="text-primary hover:underline">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;