import { Project, BlogPost, ResearchItem, Event, TeamMember, StatItem } from './types';

// Projects Data
export const projects: Project[] = [
  {
    id: '1',
    title: 'Self-Driving Prototype',
    category: 'Autonomous Vehicle',
    description: 'A compact car designed for urban navigation with advanced obstacle detection and path planning algorithms. This project focuses on implementing real-time decision making in complex traffic scenarios.',
    image: 'https://images.unsplash.com/photo-1571987502227-9231b837d92a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['Computer Vision', 'Machine Learning', 'ROS (Robot Operating System)', 'LIDAR Integration'],
    team: ['Rajiv Mehta', 'Priya Sharma', 'Vikram Singh']
  },
  {
    id: '2',
    title: 'Autonomous Delivery Drone',
    category: 'Aerial Systems',
    description: 'A lightweight drone system designed for last-mile delivery with precision landing capabilities. Features include autonomous navigation, obstacle avoidance, and secure package handling mechanisms.',
    image: 'https://images.unsplash.com/photo-1593108408993-58ee9c7825c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['Drone Control Systems', 'GPS Navigation', 'Computer Vision', 'Weight Distribution Algorithms'],
    team: ['Ananya Patel', 'Arun Kumar', 'Lin Wei']
  },
  {
    id: '3',
    title: 'Agricultural Robot',
    category: 'Agricultural Tech',
    description: 'An autonomous rover that can monitor crop health, perform targeted spraying, and collect field data. This system helps reduce resource usage while maximizing crop yield through precision agriculture.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['IoT Sensors', 'Machine Learning', 'Mechanical Engineering', 'Soil Analysis'],
    team: ['Dr. Samuel Chen', 'Rahul Desai', 'Emily Johnson']
  },
  {
    id: '4',
    title: 'AI Vision System',
    category: 'Computer Vision',
    description: 'A deep learning-based object detection and recognition system for autonomous navigation. This system can identify and classify objects in real-time with high accuracy, even in challenging lighting and weather conditions.',
    image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    technologies: ['Deep Learning', 'TensorFlow', 'GPU Acceleration', 'Computer Vision'],
    team: ['Arun Kumar', 'Priya Sharma', 'Rajiv Gupta']
  }
];

// Blog Posts Data
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Autonomous Navigation',
    excerpt: 'Exploring how AI powers the next generation of vehicles and the challenges in creating truly autonomous systems. Recent breakthroughs in neural networks have opened new possibilities for complex urban navigation.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl sit amet nisl.',
    category: 'AI',
    date: 'May 15, 2025',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    author: 'Dr. Arun Kumar'
  },
  {
    id: '2',
    title: 'AI in Self-Driving Cars: Beyond Perception',
    excerpt: 'While much attention is focused on sensors and perception systems, decision-making algorithms are equally critical for autonomous vehicles. This article explores the ethical and technical challenges in AI decision systems.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl sit amet nisl.',
    category: 'Vehicles',
    date: 'April 30, 2025',
    image: 'https://images.unsplash.com/photo-1589254065909-b7086229d08c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    author: 'Priya Sharma'
  },
  {
    id: '3',
    title: 'Sensor Fusion Technologies for Reliable Autonomy',
    excerpt: 'The integration of multiple sensor data streams is critical for creating robust autonomous systems. This article examines the latest approaches in sensor fusion and how they overcome the limitations of individual sensors.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, vel aliquam nisl nisl sit amet nisl.',
    category: 'Research',
    date: 'April 12, 2025',
    image: 'https://images.unsplash.com/photo-1606775718639-430b4e4a5fff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    author: 'Vikram Singh'
  }
];

// Research Items Data
export const researchItems: ResearchItem[] = [
  {
    id: '1',
    title: 'Path Planning Algorithms for Urban Environments',
    category: 'Navigation',
    description: 'A study on optimizing routes for self-driving cars in complex urban settings with dynamic obstacles and changing traffic conditions. This research proposes a novel approach that combines reinforcement learning with traditional path planning algorithms to achieve superior results in unpredictable environments.',
    image: 'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    date: 'March 2025',
    authors: ['Dr. Arun Kumar', 'Priya Sharma', 'Rahul Desai'],
    citations: 12
  },
  {
    id: '2',
    title: 'Sensor Fusion Study for Improved Perception',
    category: 'Perception',
    description: 'This research explores advanced techniques for combining data from multiple sensors (cameras, LIDAR, radar) to create a more accurate and robust perception system for autonomous vehicles. The study demonstrates a 23% improvement in object detection accuracy in adverse weather conditions.',
    image: 'https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    date: 'February 2025',
    authors: ['Vikram Singh', 'Ananya Patel', 'Dr. Samuel Chen'],
    citations: 8
  },
  {
    id: '3',
    title: 'Reinforcement Learning for Autonomous Decision Making',
    category: 'AI',
    description: 'This paper presents a novel reinforcement learning framework that enables autonomous vehicles to make real-time decisions in complex traffic scenarios. The approach significantly reduces training time while improving the quality of decision-making in edge cases.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    date: 'January 2025',
    authors: ['Dr. Emily Johnson', 'Rajiv Gupta', 'Lin Wei'],
    citations: 15
  }
];

// Events Data
export const events: Event[] = [
  {
    id: '1',
    title: 'Workshop on Autonomous Systems',
    type: 'Workshop',
    date: 'April 15, 2025',
    day: '15',
    month: 'April',
    year: '2025',
    time: '10:00 AM - 4:00 PM',
    location: 'Tech Hub, KLU Campus',
    description: 'Learn the basics of autonomous technology through hands-on sessions with our self-driving prototype. Perfect for beginners and intermediate learners interested in autonomous systems.',
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    title: 'Self-Driving Demo Day',
    type: 'Demonstration',
    date: 'May 10, 2025',
    day: '10',
    month: 'May',
    year: '2025',
    time: '2:00 PM - 6:00 PM',
    location: 'Engineering Block, KLU Campus',
    description: 'Witness our autonomous vehicle prototypes in action as they navigate a controlled environment. Get a chance to interact with the development team and learn about the technology behind the scenes.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

// Team Members Data
export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Rajiv Mehta',
    role: 'Club Lead',
    department: 'Computer Science',
    year: 'Final Year',
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'mailto:rajiv@example.com'
    }
  },
  {
    id: '2',
    name: 'Priya Sharma',
    role: 'Technical Lead',
    department: 'Electronics Engineering',
    year: 'Third Year',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'mailto:priya@example.com'
    }
  },
  {
    id: '3',
    name: 'Arun Kumar',
    role: 'Research Coordinator',
    department: 'Mechanical Engineering',
    year: 'Final Year',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      email: 'mailto:arun@example.com'
    }
  }
];

// Stats Data
export const stats: StatItem[] = [
  {
    value: '15+',
    label: 'Autonomous Projects'
  },
  {
    value: '40+',
    label: 'Team Members'
  },
  {
    value: '8',
    label: 'Research Papers'
  },
  {
    value: '12',
    label: 'Industry Partners'
  }
];

// Categories for Blog Sidebar
export const blogCategories = [
  { name: 'AI', count: 8 },
  { name: 'Vehicles', count: 12 },
  { name: 'Research', count: 7 },
  { name: 'Robotics', count: 5 },
  { name: 'Drones', count: 4 }
];

// Upcoming Events (mini calendar format)
export const upcomingEvents = [
  {
    day: '22',
    month: 'Jun',
    title: 'Autonomous Hackathon',
    location: 'Innovation Center, KLU Campus'
  },
  {
    day: '5',
    month: 'Jul',
    title: 'Industry Connect: Autonomous Future',
    location: 'Virtual Event'
  },
  {
    day: '18',
    month: 'Jul',
    title: 'Computer Vision Workshop',
    location: 'Tech Lab, Engineering Block'
  }
];

// Feature Cards for Home Page
export const featuredItems = [
  {
    id: '1',
    title: 'Autonomous Navigation System',
    category: 'Latest Project',
    description: 'An advanced path-finding system that enables vehicles to navigate complex urban environments.',
    image: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    link: '/projects'
  },
  {
    id: '2',
    title: 'AI in Autonomous Systems Workshop',
    category: 'Upcoming Event',
    description: 'Join us for a hands-on workshop exploring the role of artificial intelligence in self-driving vehicles.',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    link: '/events'
  },
  {
    id: '3',
    title: 'Sensor Fusion Optimization',
    category: 'Recent Research',
    description: 'Our latest research on improving perception accuracy through advanced sensor fusion techniques.',
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    link: '/research'
  }
];
