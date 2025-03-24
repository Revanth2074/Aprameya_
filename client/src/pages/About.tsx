import { Link } from 'wouter';
import { FaCheck, FaEye, FaShieldAlt } from 'react-icons/fa';
import { teamMembers } from '../lib/data';
import TeamMemberCard from '../components/TeamMemberCard';

const About = () => {
  return (
    <div className="fadeIn">
      {/* Header Section */}
      <div className="diagonal-bg py-20 px-4 relative">
        <div className="container mx-auto relative z-10">
          <h1 className="font-space font-bold text-3xl md:text-5xl text-white text-center mb-4">
            About Aprameya
          </h1>
          <p className="text-lg text-white/80 text-center max-w-3xl mx-auto">
            Learn about our journey, mission, and the team driving innovation in autonomous technology
          </p>
        </div>
      </div>

      {/* About Content */}
      <div className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          {/* Mission Section */}
          <div className="mb-16">
            <h2 className="font-space font-bold text-2xl md:text-3xl text-center mb-8">Our Mission</h2>
            <div className="bg-muted rounded-xl p-8 shadow-sm">
              <p className="text-foreground/80 text-lg text-center max-w-3xl mx-auto">
                We are a student-led club at KLU driving innovation in autonomous vehicles and systems through projects, research, and collaboration. Our goal is to create a platform where students can gain hands-on experience with cutting-edge technology while contributing to the advancement of autonomous systems.
              </p>
            </div>
          </div>

          {/* Vision & Values */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <FaEye className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-space font-bold text-xl">Our Vision</h3>
              </div>
              <p className="text-foreground/70">
                To become a leading student community in autonomous vehicle technology, recognized for innovative solutions and producing industry-ready professionals who shape the future of transportation and robotics.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                  <FaShieldAlt className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-space font-bold text-xl">Our Values</h3>
              </div>
              <ul className="space-y-2 text-foreground/70">
                <li className="flex items-start">
                  <FaCheck className="w-5 h-5 text-primary mr-2 mt-0.5" />
                  <span>Innovation: Pushing boundaries through creative problem-solving</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="w-5 h-5 text-primary mr-2 mt-0.5" />
                  <span>Collaboration: Working together across disciplines</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="w-5 h-5 text-primary mr-2 mt-0.5" />
                  <span>Excellence: Striving for the highest quality in all we do</span>
                </li>
                <li className="flex items-start">
                  <FaCheck className="w-5 h-5 text-primary mr-2 mt-0.5" />
                  <span>Inclusivity: Creating opportunities for all interested students</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="font-space font-bold text-2xl md:text-3xl text-center mb-8">Our Team</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-muted rounded-xl p-8 text-center">
            <h3 className="font-space font-bold text-2xl mb-4">Contact Us</h3>
            <p className="text-foreground/70 mb-6">
              Have questions or want to get involved? Reach out to us!
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-6 max-w-xl mx-auto">
              <div className="flex items-center justify-center md:justify-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <a href="mailto:contact@aprameya.com" className="text-primary hover:underline">contact@aprameya.com</a>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <span>Tech Hub, KLU Campus</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
