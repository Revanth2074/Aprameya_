import { Link } from 'wouter';
import { Project } from '../lib/types';
import SocialShare from './SocialShare';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
}

const ProjectCard = ({ project, onViewDetails }: ProjectCardProps) => {
  // Create absolute URL for sharing
  const currentUrl = window.location.origin;
  const shareUrl = `${currentUrl}/projects/${project.id}`;
  
  return (
    <motion.div 
      className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden card-hover h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ translateY: -5 }}
    >
      <div className="h-52 bg-muted dark:bg-slate-700 overflow-hidden relative group">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <SocialShare 
            url={shareUrl}
            title={`Check out this awesome project: ${project.title}`}
            description={project.description}
            variant="minimal"
          />
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <span className="inline-block px-3 py-1 text-xs rounded-full bg-secondary/10 text-secondary font-medium">
            {project.category}
          </span>
          <SocialShare 
            url={shareUrl}
            title={`Check out this awesome project: ${project.title}`}
            description={project.description}
          />
        </div>
        <h3 className="font-bold text-xl mb-2 dark:text-white">{project.title}</h3>
        <p className="text-foreground/70 dark:text-white/70 mb-4">
          {project.description.length > 120 
            ? `${project.description.substring(0, 120)}...` 
            : project.description}
        </p>
        <div className="flex items-center justify-between">
          <button 
            className="inline-flex items-center text-primary font-medium hover:text-secondary transition-colors"
            onClick={() => onViewDetails(project)}
          >
            Read More
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </button>
          <div className="flex gap-1">
            {project.technologies.slice(0, 3).map((tech, index) => (
              <span 
                key={index} 
                className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
