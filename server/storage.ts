import { 
  users, 
  projects, 
  blogs, 
  researchItems, 
  events, 
  eventRegistrations, 
  comments, 
  messages,
  type User, 
  type InsertUser, 
  type UpdateUserProfile,
  type Project,
  type InsertProject,
  type Blog,
  type InsertBlog,
  type Research,
  type InsertResearch,
  type Event,
  type InsertEvent,
  type EventRegistration,
  type InsertEventRegistration,
  type Comment,
  type InsertComment,
  type Message,
  type InsertMessage,
  UserRole, 
  type UserRoleType 
} from "@shared/schema";
import createMemoryStore from "memorystore";
import session from 'express-session';

export interface IStorage {
  // User Operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserRole(userId: number, newRole: UserRoleType): Promise<User | undefined>;
  updateUserProfile(userId: number, profileData: UpdateUserProfile): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  getUsersByRole(role: UserRoleType): Promise<User[]>;
  
  // Project Operations
  getProject(id: number): Promise<Project | undefined>;
  getAllProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
  
  // Blog Operations
  getBlog(id: number): Promise<Blog | undefined>;
  getAllBlogs(): Promise<Blog[]>;
  createBlog(blog: InsertBlog): Promise<Blog>;
  updateBlog(id: number, blog: Partial<InsertBlog>): Promise<Blog | undefined>;
  deleteBlog(id: number): Promise<boolean>;
  
  // Research Operations
  getResearch(id: number): Promise<Research | undefined>;
  getAllResearch(): Promise<Research[]>;
  createResearch(research: InsertResearch): Promise<Research>;
  updateResearch(id: number, research: Partial<InsertResearch>): Promise<Research | undefined>;
  deleteResearch(id: number): Promise<boolean>;
  
  // Event Operations
  getEvent(id: number): Promise<Event | undefined>;
  getAllEvents(): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: number, event: Partial<InsertEvent>): Promise<Event | undefined>;
  deleteEvent(id: number): Promise<boolean>;
  
  // EventRegistration Operations
  getEventRegistration(id: number): Promise<EventRegistration | undefined>;
  getEventRegistrationByUserAndEvent(userId: number, eventId: number): Promise<EventRegistration | undefined>;
  getAllEventRegistrations(): Promise<EventRegistration[]>;
  getEventRegistrationsByUser(userId: number): Promise<EventRegistration[]>;
  getEventRegistrationsByEvent(eventId: number): Promise<EventRegistration[]>;
  createEventRegistration(registration: InsertEventRegistration): Promise<EventRegistration>;
  deleteEventRegistration(id: number): Promise<boolean>;
  
  // Comment Operations
  getComment(id: number): Promise<Comment | undefined>;
  getCommentsByUser(userId: number): Promise<Comment[]>;
  getCommentsByProject(projectId: number): Promise<Comment[]>;
  getCommentsByBlog(blogId: number): Promise<Comment[]>;
  getCommentsByResearch(researchId: number): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;
  updateComment(id: number, comment: Partial<InsertComment>): Promise<Comment | undefined>;
  deleteComment(id: number): Promise<boolean>;
  
  // Message Operations (Core Team Chat)
  getMessage(id: number): Promise<Message | undefined>;
  getAllMessages(): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  deleteMessage(id: number): Promise<boolean>;
  
  // Session Store
  sessionStore: session.Store;
}

// In-memory storage class
export class MemStorage implements IStorage {
  private users: User[] = [];
  private projects: Project[] = [];
  private blogs: Blog[] = [];
  private researchItems: Research[] = [];
  private events: Event[] = [];
  private eventRegistrations: EventRegistration[] = [];
  private comments: Comment[] = [];
  private messages: Message[] = [];
  
  // AutoIncrement counters for IDs
  private userIdCounter = 1;
  private projectIdCounter = 1;
  private blogIdCounter = 1;
  private researchIdCounter = 1;
  private eventIdCounter = 1;
  private eventRegistrationIdCounter = 1;
  private commentIdCounter = 1;
  private messageIdCounter = 1;
  
  sessionStore: session.Store;
  
  constructor() {
    // Create memory session store
    const MemoryStore = createMemoryStore(session);
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    });
    
    // Add admin user
    this.users.push({
      id: this.userIdCounter++,
      username: 'admin',
      password: 'admin123',
      role: UserRole.ADMIN,
      email: 'admin@aprameya.com',
      created_at: new Date().toISOString(),
      display_name: 'Administrator',
      profile_image: '',
      department: 'Management',
      year: '2023',
      role_title: 'System Administrator',
      tags: 'admin,management',
      linkedin: '',
      github: '',
      bio: 'System Administrator'
    });
    
    // Add core team member
    this.users.push({
      id: this.userIdCounter++,
      username: 'coreteam',
      password: 'core123',
      role: UserRole.CORE,
      email: 'core@aprameya.com',
      created_at: new Date().toISOString(),
      display_name: 'Core Team Member',
      profile_image: '',
      department: 'Robotics',
      year: '2023',
      role_title: 'Core Developer',
      tags: 'robotics,autonomous',
      linkedin: '',
      github: '',
      bio: 'Core team member for autonomous vehicles'
    });
    
    // Add aspirant user
    this.users.push({
      id: this.userIdCounter++,
      username: 'aspirant',
      password: 'aspirant123',
      role: UserRole.ASPIRANT,
      email: 'aspirant@aprameya.com',
      created_at: new Date().toISOString(),
      display_name: 'Aspirant User',
      profile_image: '',
      department: 'Robotics',
      year: '2023',
      role_title: 'Member',
      tags: 'aspiring,learning',
      linkedin: '',
      github: '',
      bio: 'Interested in autonomous vehicles'
    });
  }
  
  // User Operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
  
  async getUsersByRole(role: UserRoleType): Promise<User[]> {
    return this.users.filter(user => user.role === role);
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const user: User = {
      id: this.userIdCounter++,
      ...insertUser,
      role: UserRole.ASPIRANT,
      created_at: new Date().toISOString()
    };
    this.users.push(user);
    return user;
  }
  
  async updateUserRole(userId: number, newRole: UserRoleType): Promise<User | undefined> {
    const userIndex = this.users.findIndex(user => user.id === userId);
    if (userIndex === -1) return undefined;
    
    this.users[userIndex].role = newRole;
    return this.users[userIndex];
  }
  
  async updateUserProfile(userId: number, profileData: UpdateUserProfile): Promise<User | undefined> {
    const userIndex = this.users.findIndex(user => user.id === userId);
    if (userIndex === -1) return undefined;
    
    this.users[userIndex] = { ...this.users[userIndex], ...profileData };
    return this.users[userIndex];
  }
  
  async getAllUsers(): Promise<User[]> {
    return this.users;
  }
  
  // Project Operations
  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.find(project => project.id === id);
  }
  
  async getAllProjects(): Promise<Project[]> {
    return this.projects;
  }
  
  async createProject(project: InsertProject): Promise<Project> {
    const newProject: Project = {
      id: this.projectIdCounter++,
      ...project,
      created_at: new Date().toISOString(),
    };
    this.projects.push(newProject);
    return newProject;
  }
  
  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined> {
    const projectIndex = this.projects.findIndex(p => p.id === id);
    if (projectIndex === -1) return undefined;
    
    this.projects[projectIndex] = { ...this.projects[projectIndex], ...project };
    return this.projects[projectIndex];
  }
  
  async deleteProject(id: number): Promise<boolean> {
    const initialLength = this.projects.length;
    this.projects = this.projects.filter(project => project.id !== id);
    return initialLength > this.projects.length;
  }
  
  // Blog Operations
  async getBlog(id: number): Promise<Blog | undefined> {
    return this.blogs.find(blog => blog.id === id);
  }
  
  async getAllBlogs(): Promise<Blog[]> {
    return this.blogs;
  }
  
  async createBlog(blog: InsertBlog): Promise<Blog> {
    const newBlog: Blog = {
      id: this.blogIdCounter++,
      ...blog,
      created_at: new Date().toISOString(),
    };
    this.blogs.push(newBlog);
    return newBlog;
  }
  
  async updateBlog(id: number, blog: Partial<InsertBlog>): Promise<Blog | undefined> {
    const blogIndex = this.blogs.findIndex(b => b.id === id);
    if (blogIndex === -1) return undefined;
    
    this.blogs[blogIndex] = { ...this.blogs[blogIndex], ...blog };
    return this.blogs[blogIndex];
  }
  
  async deleteBlog(id: number): Promise<boolean> {
    const initialLength = this.blogs.length;
    this.blogs = this.blogs.filter(blog => blog.id !== id);
    return initialLength > this.blogs.length;
  }
  
  // Research Operations
  async getResearch(id: number): Promise<Research | undefined> {
    return this.researchItems.find(research => research.id === id);
  }
  
  async getAllResearch(): Promise<Research[]> {
    return this.researchItems;
  }
  
  async createResearch(research: InsertResearch): Promise<Research> {
    const newResearch: Research = {
      id: this.researchIdCounter++,
      ...research,
      created_at: new Date().toISOString(),
    };
    this.researchItems.push(newResearch);
    return newResearch;
  }
  
  async updateResearch(id: number, research: Partial<InsertResearch>): Promise<Research | undefined> {
    const researchIndex = this.researchItems.findIndex(r => r.id === id);
    if (researchIndex === -1) return undefined;
    
    this.researchItems[researchIndex] = { ...this.researchItems[researchIndex], ...research };
    return this.researchItems[researchIndex];
  }
  
  async deleteResearch(id: number): Promise<boolean> {
    const initialLength = this.researchItems.length;
    this.researchItems = this.researchItems.filter(research => research.id !== id);
    return initialLength > this.researchItems.length;
  }
  
  // Event Operations
  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.find(event => event.id === id);
  }
  
  async getAllEvents(): Promise<Event[]> {
    return this.events;
  }
  
  async createEvent(event: InsertEvent): Promise<Event> {
    const newEvent: Event = {
      id: this.eventIdCounter++,
      ...event,
      created_at: new Date().toISOString(),
    };
    this.events.push(newEvent);
    return newEvent;
  }
  
  async updateEvent(id: number, event: Partial<InsertEvent>): Promise<Event | undefined> {
    const eventIndex = this.events.findIndex(e => e.id === id);
    if (eventIndex === -1) return undefined;
    
    this.events[eventIndex] = { ...this.events[eventIndex], ...event };
    return this.events[eventIndex];
  }
  
  async deleteEvent(id: number): Promise<boolean> {
    const initialLength = this.events.length;
    this.events = this.events.filter(event => event.id !== id);
    return initialLength > this.events.length;
  }
  
  // EventRegistration Operations
  async getEventRegistration(id: number): Promise<EventRegistration | undefined> {
    return this.eventRegistrations.find(registration => registration.id === id);
  }
  
  async getEventRegistrationByUserAndEvent(userId: number, eventId: number): Promise<EventRegistration | undefined> {
    return this.eventRegistrations.find(
      registration => registration.user_id === userId && registration.event_id === eventId
    );
  }
  
  async getAllEventRegistrations(): Promise<EventRegistration[]> {
    return this.eventRegistrations;
  }
  
  async getEventRegistrationsByUser(userId: number): Promise<EventRegistration[]> {
    return this.eventRegistrations.filter(registration => registration.user_id === userId);
  }
  
  async getEventRegistrationsByEvent(eventId: number): Promise<EventRegistration[]> {
    return this.eventRegistrations.filter(registration => registration.event_id === eventId);
  }
  
  async createEventRegistration(registration: InsertEventRegistration): Promise<EventRegistration> {
    const newRegistration: EventRegistration = {
      id: this.eventRegistrationIdCounter++,
      ...registration,
      created_at: new Date().toISOString(),
    };
    this.eventRegistrations.push(newRegistration);
    return newRegistration;
  }
  
  async deleteEventRegistration(id: number): Promise<boolean> {
    const initialLength = this.eventRegistrations.length;
    this.eventRegistrations = this.eventRegistrations.filter(registration => registration.id !== id);
    return initialLength > this.eventRegistrations.length;
  }
  
  // Comment Operations
  async getComment(id: number): Promise<Comment | undefined> {
    return this.comments.find(comment => comment.id === id);
  }
  
  async getCommentsByUser(userId: number): Promise<Comment[]> {
    return this.comments.filter(comment => comment.user_id === userId);
  }
  
  async getCommentsByProject(projectId: number): Promise<Comment[]> {
    return this.comments.filter(comment => comment.project_id === projectId);
  }
  
  async getCommentsByBlog(blogId: number): Promise<Comment[]> {
    return this.comments.filter(comment => comment.blog_id === blogId);
  }
  
  async getCommentsByResearch(researchId: number): Promise<Comment[]> {
    return this.comments.filter(comment => comment.research_id === researchId);
  }
  
  async createComment(comment: InsertComment): Promise<Comment> {
    const newComment: Comment = {
      id: this.commentIdCounter++,
      ...comment,
      created_at: new Date().toISOString(),
    };
    this.comments.push(newComment);
    return newComment;
  }
  
  async updateComment(id: number, comment: Partial<InsertComment>): Promise<Comment | undefined> {
    const commentIndex = this.comments.findIndex(c => c.id === id);
    if (commentIndex === -1) return undefined;
    
    this.comments[commentIndex] = { ...this.comments[commentIndex], ...comment };
    return this.comments[commentIndex];
  }
  
  async deleteComment(id: number): Promise<boolean> {
    const initialLength = this.comments.length;
    this.comments = this.comments.filter(comment => comment.id !== id);
    return initialLength > this.comments.length;
  }
  
  // Message Operations (Core Team Chat)
  async getMessage(id: number): Promise<Message | undefined> {
    return this.messages.find(message => message.id === id);
  }
  
  async getAllMessages(): Promise<Message[]> {
    return this.messages;
  }
  
  async createMessage(message: InsertMessage): Promise<Message> {
    const newMessage: Message = {
      id: this.messageIdCounter++,
      ...message,
      created_at: new Date().toISOString(),
    };
    this.messages.push(newMessage);
    return newMessage;
  }
  
  async deleteMessage(id: number): Promise<boolean> {
    const initialLength = this.messages.length;
    this.messages = this.messages.filter(message => message.id !== id);
    return initialLength > this.messages.length;
  }
}

// Use memory storage instead of database
export const storage = new MemStorage();
