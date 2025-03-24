import { useState } from 'react';
import { Link } from 'wouter';
import { projects } from '../lib/data';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import { Project } from '../lib/types';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="fadeIn">
      {/* Header Section */}
      <div className="diagonal-bg py-20 px-4 relative">
        <div className="container mx-auto relative z-10">
          <h1 className="font-space font-bold text-3xl md:text-5xl text-white text-center mb-4">
            Our Projects
          </h1>
          <p className="text-lg text-white/80 text-center max-w-3xl mx-auto">
            Exploring the boundaries of autonomous technology through innovative designs and real-world applications
          </p>
        </div>
      </div>

      {/* Projects Gallery */}
      <div className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onViewDetails={handleViewDetails} 
              />
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <h3 className="font-space font-bold text-2xl mb-4">Want to join us?</h3>
            <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
              Be part of our innovative team working on cutting-edge autonomous technologies
            </p>
            <Link href="/signup">
              <a className="inline-block px-8 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-all btn-glow">
                Sign Up Now
              </a>
            </Link>
          </div>
        </div>
      </div>

      {/* Project Details Modal */}
      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
};

export default Projects;
