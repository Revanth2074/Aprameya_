import { Event } from '../lib/types';

interface EventCardProps {
  event: Event;
  onRegisterInterest: (event: Event) => void;
}

const EventCard = ({ event, onRegisterInterest }: EventCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/3 h-48 md:h-auto bg-primary relative">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover opacity-70" 
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
            <span className="text-3xl font-bold">{event.day}</span>
            <span className="text-lg font-medium">{event.month}</span>
            <span className="text-sm">{event.year}</span>
          </div>
        </div>
        <div className="p-6 md:w-2/3">
          <div className="flex justify-between items-start mb-3">
            <h2 className="font-space font-bold text-xl md:text-2xl">{event.title}</h2>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-secondary/10 text-secondary">
              {event.type}
            </span>
          </div>
          <div className="flex items-center mb-4 text-foreground/60">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{event.time}</span>
          </div>
          <div className="flex items-center mb-4 text-foreground/60">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span>{event.location}</span>
          </div>
          <p className="text-foreground/70 mb-6">
            {event.description}
          </p>
          <div className="flex flex-wrap gap-3">
            <button 
              className="px-4 py-2 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-all btn-glow"
              onClick={() => onRegisterInterest(event)}
            >
              Register Interest
            </button>
            <button className="px-4 py-2 border border-primary text-primary font-medium rounded-full hover:bg-primary/5 transition-all">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
