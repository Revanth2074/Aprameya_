import { FaLinkedinIn, FaGithub, FaEnvelope } from 'react-icons/fa';
import { TeamMember } from '../lib/types';

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard = ({ member }: TeamMemberCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden card-hover">
      <div className="h-48 bg-muted overflow-hidden">
        <img 
          src={member.image} 
          alt={member.name} 
          className="w-full h-full object-cover" 
        />
      </div>
      <div className="p-6 text-center">
        <h3 className="font-space font-bold text-xl mb-1">{member.name}</h3>
        <p className="text-primary mb-3">{member.role}</p>
        <p className="text-foreground/70 mb-4">{member.department}, {member.year}</p>
        <div className="flex justify-center space-x-3">
          {member.socialLinks.linkedin && (
            <a href={member.socialLinks.linkedin} className="text-foreground/60 hover:text-primary transition-colors">
              <FaLinkedinIn />
            </a>
          )}
          {member.socialLinks.github && (
            <a href={member.socialLinks.github} className="text-foreground/60 hover:text-primary transition-colors">
              <FaGithub />
            </a>
          )}
          {member.socialLinks.email && (
            <a href={member.socialLinks.email} className="text-foreground/60 hover:text-primary transition-colors">
              <FaEnvelope />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamMemberCard;
