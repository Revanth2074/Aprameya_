import { Link } from 'wouter';
import { Project } from '../lib/types';

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
}

const ProjectCard = ({ project, onViewDetails }: ProjectCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden card-hover h-full">
      <div className="h-52 bg-muted overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <span className="inline-block px-3 py-1 text-xs rounded-full bg-secondary/10 text-secondary font-medium mb-3">
          {project.category}
        </span>
        <h3 className="font-space font-bold text-xl mb-2">{project.title}</h3>
        <p className="text-foreground/70 mb-4">
          {project.description.length > 120 
            ? `${project.description.substring(0, 120)}...` 
            : project.description}
        </p>
        <button 
          className="inline-flex items-center text-primary font-medium hover:text-secondary transition-colors"
          onClick={() => onViewDetails(project)}
        >
          Read More
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
