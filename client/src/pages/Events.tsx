import { useState } from 'react';
import { events, upcomingEvents } from '../lib/data';
import EventCard from '../components/EventCard';
import { Event } from '../lib/types';

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleRegisterInterest = (event: Event) => {
    setSelectedEvent(event);
    // Scroll to form on mobile
    if (window.innerWidth < 1024) {
      const form = document.getElementById('registration-form');
      if (form) {
        form.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here in a real implementation
    alert(`Registration for ${selectedEvent?.title} submitted!`);
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    setSelectedEvent(null);
  };

  return (
    <div className="fadeIn">
      {/* Header Section */}
      <div className="diagonal-bg py-20 px-4 relative">
        <div className="container mx-auto relative z-10">
          <h1 className="font-space font-bold text-3xl md:text-5xl text-white text-center mb-4">
            Events - Join Our Community
          </h1>
          <p className="text-lg text-white/80 text-center max-w-3xl mx-auto">
            Participate in workshops, demonstrations, and hackathons focused on autonomous technology
          </p>
        </div>
      </div>

      {/* Events Content */}
      <div className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Events List */}
            <div className="lg:col-span-2 space-y-8">
              {/* Event Cards */}
              {events.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onRegisterInterest={handleRegisterInterest}
                />
              ))}

              {/* Upcoming Events */}
              <div className="bg-muted rounded-xl p-6">
                <h3 className="font-space font-bold text-xl mb-4">Upcoming Events</h3>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex flex-col items-center justify-center text-primary">
                        <span className="text-sm font-bold">{event.day}</span>
                        <span className="text-xs">{event.month}</span>
                      </div>
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <p className="text-foreground/60 text-sm">{event.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Registration Form */}
            <div className="lg:col-span-1">
              <div id="registration-form" className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <h3 className="font-space font-bold text-xl mb-6">Register Interest</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="event-name" className="block text-foreground/70 font-medium mb-2">Event</label>
                    <input 
                      type="text" 
                      id="event-name" 
                      className="w-full px-4 py-2 rounded-lg border border-muted focus:outline-none focus:ring-2 focus:ring-primary/50" 
                      readOnly 
                      value={selectedEvent ? selectedEvent.title : 'Select an event'}
                    />
                  </div>
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
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-foreground/70 font-medium mb-2">Why are you interested? (Optional)</label>
                    <textarea 
                      id="message" 
                      className="w-full px-4 py-2 rounded-lg border border-muted focus:outline-none focus:ring-2 focus:ring-primary/50 h-24" 
                      placeholder="Tell us why you're interested in this event"
                      value={formData.message}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full px-4 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-all btn-glow"
                    disabled={!selectedEvent}
                  >
                    Submit Registration
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
