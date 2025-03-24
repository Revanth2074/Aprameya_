import { Project } from '../lib/types';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isOpen ? 'block' : 'hidden'}`}>
      <div className="absolute inset-0 bg-dark/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full mx-4 z-10 overflow-hidden">
        <div className="h-64 bg-muted relative">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover" 
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-dark/50 hover:bg-dark text-white p-2 rounded-full transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="p-6">
          <span className="inline-block px-3 py-1 text-xs rounded-full bg-secondary/10 text-secondary font-medium mb-3">
            {project.category}
          </span>
          <h3 className="font-space font-bold text-2xl mb-2">{project.title}</h3>
          <p className="text-foreground/70 mb-6">{project.description}</p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-space font-medium text-lg mb-2">Technologies Used</h4>
              <ul className="list-disc pl-5 text-foreground/70">
                {project.technologies.map((tech, index) => (
                  <li key={index}>{tech}</li>
                ))}
              </ul>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-space font-medium text-lg mb-2">Team Members</h4>
              <ul className="list-disc pl-5 text-foreground/70">
                {project.team.map((member, index) => (
                  <li key={index}>{member}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button className="px-6 py-2 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-all">
              Contact Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
