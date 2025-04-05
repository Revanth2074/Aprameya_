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
import { db } from "./db";
import { and, eq, or } from "drizzle-orm";

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
}

export class DatabaseStorage implements IStorage {
  // User Operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUsersByRole(role: UserRoleType): Promise<User[]> {
    return await db.select().from(users).where(eq(users.role, role));
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    // Always create users as ASPIRANT role
    const [user] = await db
      .insert(users)
      .values({
        ...insertUser,
        role: UserRole.ASPIRANT,
        created_at: new Date().toISOString()
      })
      .returning();
    return user;
  }

  async updateUserRole(userId: number, newRole: UserRoleType): Promise<User | undefined> {
    const [updatedUser] = await db
      .update(users)
      .set({ role: newRole })
      .where(eq(users.id, userId))
      .returning();
    
    return updatedUser;
  }
  
  async updateUserProfile(userId: number, profileData: UpdateUserProfile): Promise<User | undefined> {
    const [updatedUser] = await db
      .update(users)
      .set(profileData)
      .where(eq(users.id, userId))
      .returning();
    
    return updatedUser;
  }
  
  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }
  
  // Project Operations
  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project || undefined;
  }
  
  async getAllProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }
  
  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db
      .insert(projects)
      .values(project)
      .returning();
    return newProject;
  }
  
  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined> {
    const [updatedProject] = await db
      .update(projects)
      .set(project)
      .where(eq(projects.id, id))
      .returning();
    return updatedProject || undefined;
  }
  
  async deleteProject(id: number): Promise<boolean> {
    await db
      .delete(projects)
      .where(eq(projects.id, id));
    return true;
  }
  
  // Blog Operations
  async getBlog(id: number): Promise<Blog | undefined> {
    const [blog] = await db.select().from(blogs).where(eq(blogs.id, id));
    return blog || undefined;
  }
  
  async getAllBlogs(): Promise<Blog[]> {
    return await db.select().from(blogs);
  }
  
  async createBlog(blog: InsertBlog): Promise<Blog> {
    const [newBlog] = await db
      .insert(blogs)
      .values(blog)
      .returning();
    return newBlog;
  }
  
  async updateBlog(id: number, blog: Partial<InsertBlog>): Promise<Blog | undefined> {
    const [updatedBlog] = await db
      .update(blogs)
      .set(blog)
      .where(eq(blogs.id, id))
      .returning();
    return updatedBlog || undefined;
  }
  
  async deleteBlog(id: number): Promise<boolean> {
    await db
      .delete(blogs)
      .where(eq(blogs.id, id));
    return true;
  }
  
  // Research Operations
  async getResearch(id: number): Promise<Research | undefined> {
    const [research] = await db.select().from(researchItems).where(eq(researchItems.id, id));
    return research || undefined;
  }
  
  async getAllResearch(): Promise<Research[]> {
    return await db.select().from(researchItems);
  }
  
  async createResearch(research: InsertResearch): Promise<Research> {
    const [newResearch] = await db
      .insert(researchItems)
      .values(research)
      .returning();
    return newResearch;
  }
  
  async updateResearch(id: number, research: Partial<InsertResearch>): Promise<Research | undefined> {
    const [updatedResearch] = await db
      .update(researchItems)
      .set(research)
      .where(eq(researchItems.id, id))
      .returning();
    return updatedResearch || undefined;
  }
  
  async deleteResearch(id: number): Promise<boolean> {
    await db
      .delete(researchItems)
      .where(eq(researchItems.id, id));
    return true;
  }
  
  // Event Operations
  async getEvent(id: number): Promise<Event | undefined> {
    const [event] = await db.select().from(events).where(eq(events.id, id));
    return event || undefined;
  }
  
  async getAllEvents(): Promise<Event[]> {
    return await db.select().from(events);
  }
  
  async createEvent(event: InsertEvent): Promise<Event> {
    const [newEvent] = await db
      .insert(events)
      .values(event)
      .returning();
    return newEvent;
  }
  
  async updateEvent(id: number, event: Partial<InsertEvent>): Promise<Event | undefined> {
    const [updatedEvent] = await db
      .update(events)
      .set(event)
      .where(eq(events.id, id))
      .returning();
    return updatedEvent || undefined;
  }
  
  async deleteEvent(id: number): Promise<boolean> {
    await db
      .delete(events)
      .where(eq(events.id, id));
    return true;
  }
  
  // EventRegistration Operations
  async getEventRegistration(id: number): Promise<EventRegistration | undefined> {
    const [registration] = await db.select().from(eventRegistrations).where(eq(eventRegistrations.id, id));
    return registration || undefined;
  }
  
  async getEventRegistrationByUserAndEvent(userId: number, eventId: number): Promise<EventRegistration | undefined> {
    const [registration] = await db.select().from(eventRegistrations)
      .where(and(
        eq(eventRegistrations.user_id, userId),
        eq(eventRegistrations.event_id, eventId)
      ));
    return registration || undefined;
  }
  
  async getAllEventRegistrations(): Promise<EventRegistration[]> {
    return await db.select().from(eventRegistrations);
  }
  
  async getEventRegistrationsByUser(userId: number): Promise<EventRegistration[]> {
    return await db.select().from(eventRegistrations).where(eq(eventRegistrations.user_id, userId));
  }
  
  async getEventRegistrationsByEvent(eventId: number): Promise<EventRegistration[]> {
    return await db.select().from(eventRegistrations).where(eq(eventRegistrations.event_id, eventId));
  }
  
  async createEventRegistration(registration: InsertEventRegistration): Promise<EventRegistration> {
    const [newRegistration] = await db
      .insert(eventRegistrations)
      .values(registration)
      .returning();
    return newRegistration;
  }
  
  async deleteEventRegistration(id: number): Promise<boolean> {
    await db
      .delete(eventRegistrations)
      .where(eq(eventRegistrations.id, id));
    return true;
  }
  
  // Comment Operations
  async getComment(id: number): Promise<Comment | undefined> {
    const [comment] = await db.select().from(comments).where(eq(comments.id, id));
    return comment || undefined;
  }
  
  async getCommentsByUser(userId: number): Promise<Comment[]> {
    return await db.select().from(comments).where(eq(comments.user_id, userId));
  }
  
  async getCommentsByProject(projectId: number): Promise<Comment[]> {
    return await db.select().from(comments).where(eq(comments.project_id, projectId));
  }
  
  async getCommentsByBlog(blogId: number): Promise<Comment[]> {
    return await db.select().from(comments).where(eq(comments.blog_id, blogId));
  }
  
  async getCommentsByResearch(researchId: number): Promise<Comment[]> {
    return await db.select().from(comments).where(eq(comments.research_id, researchId));
  }
  
  async createComment(comment: InsertComment): Promise<Comment> {
    const [newComment] = await db
      .insert(comments)
      .values(comment)
      .returning();
    return newComment;
  }
  
  async updateComment(id: number, comment: Partial<InsertComment>): Promise<Comment | undefined> {
    const [updatedComment] = await db
      .update(comments)
      .set(comment)
      .where(eq(comments.id, id))
      .returning();
    return updatedComment || undefined;
  }
  
  async deleteComment(id: number): Promise<boolean> {
    await db
      .delete(comments)
      .where(eq(comments.id, id));
    return true;
  }
  
  // Message Operations (Core Team Chat)
  async getMessage(id: number): Promise<Message | undefined> {
    const [message] = await db.select().from(messages).where(eq(messages.id, id));
    return message || undefined;
  }
  
  async getAllMessages(): Promise<Message[]> {
    return await db.select().from(messages);
  }
  
  async createMessage(message: InsertMessage): Promise<Message> {
    const [newMessage] = await db
      .insert(messages)
      .values(message)
      .returning();
    return newMessage;
  }
  
  async deleteMessage(id: number): Promise<boolean> {
    await db
      .delete(messages)
      .where(eq(messages.id, id));
    return true;
  }
}

export const storage = new DatabaseStorage();
