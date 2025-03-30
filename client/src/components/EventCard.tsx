import { Event } from '../lib/types';
import SocialShare from './SocialShare';
import { motion } from 'framer-motion';
import { CalendarIcon, MapPinIcon, Clock3Icon, UsersIcon } from 'lucide-react';

interface EventCardProps {
  event: Event;
  onRegisterInterest: (event: Event) => void;
}

const EventCard = ({ event, onRegisterInterest }: EventCardProps) => {
  // Create absolute URL for sharing
  const currentUrl = window.location.origin;
  const shareUrl = `${currentUrl}/events/${event.id}`;
  
  return (
    <motion.div 
      className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
    >
      <div className="md:flex">
        <div className="md:w-1/3 h-48 md:h-auto bg-primary relative group">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500" 
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
            <span className="text-3xl font-bold">{event.day}</span>
            <span className="text-lg font-medium">{event.month}</span>
            <span className="text-sm">{event.year}</span>
          </div>
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <SocialShare 
              url={shareUrl}
              title={`Join me at ${event.title}`}
              description={`${event.description} - ${event.date} at ${event.location}`}
              variant="minimal"
            />
          </div>
        </div>
        <div className="p-6 md:w-2/3">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h2 className="font-space font-bold text-xl md:text-2xl dark:text-white">{event.title}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-secondary/10 text-secondary">
                  {event.type}
                </span>
                <CalendarIcon className="h-4 w-4 text-primary" />
                <span className="text-xs text-foreground/70 dark:text-white/70">{event.date}</span>
              </div>
            </div>
            <SocialShare 
              url={shareUrl}
              title={`Join me at ${event.title}`}
              description={`${event.description} - ${event.date} at ${event.location}`}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex items-center text-foreground/60 dark:text-white/60">
              <Clock3Icon className="w-4 h-4 mr-2" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center text-foreground/60 dark:text-white/60">
              <MapPinIcon className="w-4 h-4 mr-2" />
              <span>{event.location}</span>
            </div>
          </div>
          <p className="text-foreground/70 dark:text-white/70 mb-6">
            {event.description}
          </p>
          <div className="flex flex-wrap gap-3">
            <motion.button 
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-all btn-glow"
              onClick={() => onRegisterInterest(event)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <UsersIcon className="h-4 w-4" />
              Register Interest
            </motion.button>
            <motion.button 
              className="px-4 py-2 border border-primary text-primary font-medium rounded-full hover:bg-primary/5 transition-all dark:text-white dark:border-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
