import { Link } from 'wouter';
import Logo from './icons/Logo';
import { FaTwitter, FaLinkedinIn, FaGithub, FaInstagram, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaPaperPlane } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Logo color="light" />
            </div>
            <p className="text-white/70 mb-4">
              Pioneering autonomous vehicle innovation through student-led research and development.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <FaLinkedinIn />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <FaGithub />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <FaInstagram />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-space font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-white/70 hover:text-white transition-colors">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/projects">
                  <a className="text-white/70 hover:text-white transition-colors">Projects</a>
                </Link>
              </li>
              <li>
                <Link href="/blogs">
                  <a className="text-white/70 hover:text-white transition-colors">Blogs</a>
                </Link>
              </li>
              <li>
                <Link href="/research">
                  <a className="text-white/70 hover:text-white transition-colors">Research</a>
                </Link>
              </li>
              <li>
                <Link href="/events">
                  <a className="text-white/70 hover:text-white transition-colors">Events</a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-white/70 hover:text-white transition-colors">About</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-space font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <FaEnvelope className="mt-1 mr-3 text-white/70" />
                <span className="text-white/70">contact@aprameyaklu.com</span>
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-white/70" />
                <span className="text-white/70">Tech Hub, KLU Campus, Andhra Pradesh, India</span>
              </li>
              <li className="flex items-start">
                <FaPhoneAlt className="mt-1 mr-3 text-white/70" />
                <span className="text-white/70">+91 9876543210</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-space font-bold text-lg mb-4">Subscribe</h3>
            <p className="text-white/70 mb-4">
              Stay updated with our latest news and events
            </p>
            <div className="flex">
              <input type="email" placeholder="Your email" className="px-4 py-2 rounded-l-lg focus:outline-none w-full" />
              <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-r-lg transition-colors">
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-white/70">© 2025 AprameyaKLU. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
