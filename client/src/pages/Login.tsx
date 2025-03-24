import { useState } from 'react';
import { Link } from 'wouter';
import Logo from '../components/icons/Logo';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.email,
          password: formData.password
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || 'Failed to login');
        return;
      }

      window.location.href = '/';
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to login');
    }
  };

  return (
    <div className="min-h-screen py-16 px-4 flex items-center fadeIn">
      <div className="container mx-auto">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <Link href="/" className="inline-flex items-center justify-center">
                <Logo size="lg" />
              </Link>
              <h1 className="font-bold text-2xl mt-4 mb-2">Login to Your Account</h1>
              <p className="text-foreground/60">Access your Aprameya dashboard</p>
            </div>
            
            <form onSubmit={handleSubmit}>
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
              <div className="mb-6">
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
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="rememberMe" 
                    className="w-4 h-4 text-primary border-muted rounded focus:ring-primary/50"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="rememberMe" className="ml-2 text-sm text-foreground/70">Remember me</label>
                </div>
                <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
              </div>
              <button 
                type="submit" 
                className="w-full px-4 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-all btn-glow"
              >
                Login
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-foreground/60">
                New here? <Link href="/signup" className="text-primary hover:underline">Sign up!</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
