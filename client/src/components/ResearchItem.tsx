import { ResearchItem } from '../lib/types';

interface ResearchItemProps {
  research: ResearchItem;
}

const ResearchItemComponent = ({ research }: ResearchItemProps) => {
  return (
    <div className="bg-muted rounded-xl p-6 mb-10 transition-all hover:shadow-lg">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          <h2 className="font-space font-bold text-2xl mb-3">{research.title}</h2>
          <div className="flex items-center mb-4">
            <span className="text-foreground/60 text-sm mr-4">Published: {research.date}</span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-secondary/10 text-secondary">
              {research.category}
            </span>
          </div>
          <p className="text-foreground/70 mb-4">
            {research.description}
          </p>
          <div className="flex items-center text-sm text-foreground/60 mb-4">
            <span className="mr-4">Authors: {research.authors.join(', ')}</span>
            <span>Citations: {research.citations}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <a 
              href="#" 
              className="inline-flex items-center px-4 py-2 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-all btn-glow"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
              Download PDF
            </a>
            <button className="inline-flex items-center px-4 py-2 border border-primary text-primary font-medium rounded-full hover:bg-primary/5 transition-all">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              View Details
            </button>
          </div>
        </div>
        <div className="md:w-1/3 flex justify-center items-center">
          <img 
            src={research.image} 
            alt={research.title} 
            className="rounded-lg max-h-48 object-cover" 
          />
        </div>
      </div>
    </div>
  );
};

export default ResearchItemComponent;
