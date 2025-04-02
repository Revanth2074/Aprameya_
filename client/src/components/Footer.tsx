import { Link } from 'wouter';
import Logo from './icons/Logo';
import { FaTwitter, FaLinkedinIn, FaGithub, FaInstagram, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaPaperPlane } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12 px-4 mt-auto">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Logo color="light" size="md" />
            </div>
            <p className="text-white/70 mb-4">
              Pioneering autonomous vehicle innovation through student-led research and development.
            </p>
            <div className="flex space-x-4">
              <a href="https://x.com/aprameya_klu" className="text-white/70 hover:text-white transition-colors">
                <FaTwitter />
              </a>
              <a href="https://www.linkedin.com/company/aprameyaclub/ " className="text-white/70 hover:text-white transition-colors">
                <FaLinkedinIn />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <FaGithub />
              </a>
              <a href="https://www.instagram.com/aprameya_klu?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="text-white/70 hover:text-white transition-colors">
                <FaInstagram />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-white/70 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-white/70 hover:text-white transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-white/70 hover:text-white transition-colors">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/research" className="text-white/70 hover:text-white transition-colors">
                  Research
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-white/70 hover:text-white transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/70 hover:text-white transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <FaEnvelope className="mt-1 mr-3 text-white/70" />
                <span className="text-white/70">aprameya.techclub@kluniversity.in</span>
              </li>
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-white/70" />
                <span className="text-white/70">KLU Campus, Andhra Pradesh, India</span>
              </li>
              <li className="flex items-start">
                <FaPhoneAlt className="mt-1 mr-3 text-white/70" />
                <span className="text-white/70">+91 7093518889</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Subscribe</h3>
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
          <p className="text-white/70">© 2025 Aprameya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
