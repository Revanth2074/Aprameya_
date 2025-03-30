import { Project, BlogPost, ResearchItem, Event, TeamMember, StatItem } from "./types";

// Sample data for projects
export const projects: Project[] = [
  {
    id: "1",
    title: "Autonomous Navigation System",
    description: "Developed an advanced navigation system using computer vision and deep learning.",
    category: "Autonomous Driving",
    image: "/images/project1.jpg",
    technologies: ["Python", "TensorFlow", "ROS"],
    team: ["John Doe", "Jane Smith", "Robert Johnson"]
  },
  {
    id: "2",
    title: "Smart Traffic Management",
    description: "AI-powered traffic management system to reduce congestion and improve road safety.",
    category: "Smart City",
    image: "/images/project2.jpg",
    technologies: ["Python", "Computer Vision", "IoT"],
    team: ["Michael Brown", "Sarah Williams", "David Miller"]
  },
  {
    id: "3",
    title: "Drone Delivery System",
    description: "Autonomous drone system for efficient package delivery in urban environments.",
    category: "Drones",
    image: "/images/project3.jpg",
    technologies: ["C++", "ROS", "Flight Control Systems"],
    team: ["Emily Johnson", "Mark Wilson", "Lisa Chen"]
  }
];

// Sample data for blog posts
export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Autonomous Vehicles",
    excerpt: "Exploring the potential impact of self-driving cars on urban transportation.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.",
    category: "Technology",
    date: "2023-04-15",
    image: "/images/blog1.jpg",
    author: "John Doe"
  },
  {
    id: "2",
    title: "Machine Learning in Autonomous Navigation",
    excerpt: "How AI is revolutionizing the way vehicles navigate complex environments.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.",
    category: "AI",
    date: "2023-05-22",
    image: "/images/blog2.jpg",
    author: "Jane Smith"
  },
  {
    id: "3",
    title: "Ethical Considerations in AI Transportation",
    excerpt: "Addressing the moral and ethical challenges of autonomous systems.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.",
    category: "Ethics",
    date: "2023-06-10",
    image: "/images/blog3.jpg",
    author: "Robert Johnson"
  }
];

// Sample data for research items
export const researchItems: ResearchItem[] = [
  {
    id: "1",
    title: "Advanced Perception Systems for Autonomous Vehicles",
    description: "Research on improving computer vision systems for adverse weather conditions.",
    category: "Computer Vision",
    date: "2023-03-15",
    image: "/images/research1.jpg",
    authors: ["Dr. John Doe", "Dr. Sarah Williams"],
    citations: 42
  },
  {
    id: "2",
    title: "Reinforcement Learning for Urban Navigation",
    description: "Novel approaches to teaching autonomous vehicles to navigate complex urban environments.",
    category: "Machine Learning",
    date: "2023-04-20",
    image: "/images/research2.jpg",
    authors: ["Dr. Michael Brown", "Dr. Lisa Chen"],
    citations: 28
  },
  {
    id: "3",
    title: "Cooperative Autonomous Systems",
    description: "Research on vehicle-to-vehicle communication for coordinated movement in traffic.",
    category: "Connected Vehicles",
    date: "2023-05-10",
    image: "/images/research3.jpg",
    authors: ["Dr. David Miller", "Dr. Emily Johnson"],
    citations: 35
  }
];

// Sample data for events
export const events: Event[] = [
  {
    id: "1",
    title: "Annual Autonomous Vehicle Symposium",
    type: "Conference",
    date: "2023-09-15",
    day: "15",
    month: "Sep",
    year: "2023",
    time: "9:00 AM - 5:00 PM",
    location: "Main Auditorium, KLU Campus",
    description: "Join us for our annual symposium showcasing the latest advancements in autonomous vehicle technology.",
    image: "/images/event1.jpg"
  },
  {
    id: "2",
    title: "Hackathon: Future Mobility Solutions",
    type: "Competition",
    date: "2023-10-10",
    day: "10",
    month: "Oct",
    year: "2023",
    time: "10:00 AM - 8:00 PM",
    location: "Innovation Hub, Engineering Block",
    description: "A 10-hour hackathon challenging participants to develop innovative solutions for future mobility challenges.",
    image: "/images/event2.jpg"
  },
  {
    id: "3",
    title: "Workshop on Sensor Fusion",
    type: "Workshop",
    date: "2023-11-05",
    day: "05",
    month: "Nov",
    year: "2023",
    time: "2:00 PM - 5:00 PM",
    location: "Lab 201, Technology Building",
    description: "Hands-on workshop on integrating multiple sensors for robust autonomous navigation systems.",
    image: "/images/event3.jpg"
  }
];

// Sample data for team members
export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Dr. John Doe",
    role: "Faculty Advisor",
    department: "Computer Science",
    year: "Professor",
    image: "/images/team1.jpg",
    socialLinks: {
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      email: "john.doe@klu.ac.in"
    }
  },
  {
    id: "2",
    name: "Jane Smith",
    role: "President",
    department: "Electrical Engineering",
    year: "4th Year",
    image: "/images/team2.jpg",
    socialLinks: {
      linkedin: "https://linkedin.com/in/janesmith",
      github: "https://github.com/janesmith",
      email: "jane.smith@klu.ac.in"
    }
  },
  {
    id: "3",
    name: "Robert Johnson",
    role: "Technical Lead",
    department: "Mechanical Engineering",
    year: "3rd Year",
    image: "/images/team3.jpg",
    socialLinks: {
      linkedin: "https://linkedin.com/in/robertjohnson",
      github: "https://github.com/robertjohnson",
      email: "robert.johnson@klu.ac.in"
    }
  },
  {
    id: "4",
    name: "Sarah Williams",
    role: "Research Coordinator",
    department: "Computer Science",
    year: "4th Year",
    image: "/images/team4.jpg",
    socialLinks: {
      linkedin: "https://linkedin.com/in/sarahwilliams",
      github: "https://github.com/sarahwilliams",
      email: "sarah.williams@klu.ac.in"
    }
  },
  {
    id: "5",
    name: "Michael Brown",
    role: "Event Coordinator",
    department: "Electronics Engineering",
    year: "3rd Year",
    image: "/images/team5.jpg",
    socialLinks: {
      linkedin: "https://linkedin.com/in/michaelbrown",
      github: "https://github.com/michaelbrown",
      email: "michael.brown@klu.ac.in"
    }
  }
];

// Sample data for statistics
export const stats: StatItem[] = [
  {
    value: "15+",
    label: "Projects Completed"
  },
  {
    value: "25+",
    label: "Team Members"
  },
  {
    value: "10+",
    label: "Awards Won"
  },
  {
    value: "5+",
    label: "Research Publications"
  }
];

// Sample data for blog categories
export const blogCategories = [
  "All",
  "Technology",
  "AI",
  "Ethics",
  "Research",
  "Case Studies"
];

// Sample data for upcoming events
export const upcomingEvents = [
  {
    id: "4",
    title: "Guest Lecture: Future of Mobility",
    date: "2023-12-10",
    location: "Virtual Event"
  },
  {
    id: "5",
    title: "Winter Project Showcase",
    date: "2023-12-20",
    location: "Main Auditorium"
  }
];

// Sample data for featured items
export const featuredItems = [
  {
    id: "1",
    type: "project",
    title: "Autonomous Navigation System",
    image: "/images/project1.jpg"
  },
  {
    id: "1",
    type: "blog",
    title: "The Future of Autonomous Vehicles",
    image: "/images/blog1.jpg"
  },
  {
    id: "1",
    type: "research",
    title: "Advanced Perception Systems for Autonomous Vehicles",
    image: "/images/research1.jpg"
  }
];