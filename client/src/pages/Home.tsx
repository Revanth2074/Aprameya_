import { Link } from 'wouter';
import { stats, featuredItems } from '../lib/data';
import StatsCard from '../components/StatsCard';

const Home = () => {
  return (
    <div className="fadeIn">
      {/* Hero Section */}
      <div className="diagonal-bg py-20 md:py-32 px-4 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/20 to-secondary/20"></div>
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <h1 className="font-bold text-3xl md:text-5xl leading-tight mb-4">
                Pioneering Autonomous Vehicle Innovation
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8">
                Exploring the Future of Self-Driving Technology
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/projects" className="px-6 py-3 bg-white text-primary font-medium rounded-full hover:shadow-lg transition-all btn-glow">
                  Explore Projects
                </Link>
                <Link href="/signup" className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-full hover:bg-white/10 transition-all">
                  Join Us
                </Link>
              </div>
            </div>
            <div className="hidden md:block animate-float">
              <img 
                src="https://images.unsplash.com/photo-1555353540-64580b51c258?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Autonomous Vehicle Technology" 
                className="rounded-lg shadow-2xl w-full max-w-md mx-auto" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="py-16 px-4 bg-white dark:bg-slate-900">
        <div className="container mx-auto">
          <h2 className="font-bold text-2xl md:text-3xl text-center mb-12">
            <span className="gradient-text">Driving Innovation Forward</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <div key={item.id} className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden card-hover">
                <div className="h-48 bg-muted overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <div className="w-3 h-3 rounded-full bg-accent animate-pulse-slow mr-2"></div>
                    <span className="text-xs font-medium uppercase tracking-wider text-secondary">{item.category}</span>
                  </div>
                  <h3 className="font-bold text-xl mb-2 dark:text-white">{item.title}</h3>
                  <p className="text-foreground/70 dark:text-white/70 mb-4">
                    {item.description}
                  </p>
                  <Link href={item.link} className="inline-flex items-center text-primary font-medium hover:text-secondary transition-colors">
                    Learn more
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technology Stats Section */}
      <StatsCard stats={stats} />
    </div>
  );
};

export default Home;
