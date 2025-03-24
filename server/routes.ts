import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, UserRole } from "@shared/schema";
import { z } from "zod";
import 'express-session';
import { projects, blogPosts, researchItems, events } from "../client/src/lib/data";

// Middleware to check if user is admin
const isAdmin = async (req: Request, res: Response, next: Function) => {
  // Get the user ID from session
  const userId = req.session?.userId;
  
  if (!userId) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  
  const user = await storage.getUser(userId);
  
  if (!user || user.role !== UserRole.ADMIN) {
    return res.status(403).json({ error: "Not authorized" });
  }
  
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // User registration
  app.post("/api/register", async (req, res) => {
    try {
      // Validate request body
      const userInput = insertUserSchema.safeParse(req.body);
      
      if (!userInput.success) {
        return res.status(400).json({ error: userInput.error });
      }
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(userInput.data.username);
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }
      
      // Create user (will default to ASPIRANT role)
      const user = await storage.createUser(userInput.data);
      
      // Don't send password back to client
      const { password, ...userWithoutPassword } = user;
      
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Failed to create user" });
    }
  });
  
  // User login
  app.post("/api/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
      }
      
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      // Set user ID in session
      req.session.userId = user.id;
      
      // Don't send password back to client
      const { password: _, ...userWithoutPassword } = user;
      
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Failed to log in" });
    }
  });
  
  // User logout
  app.post("/api/logout", (req, res) => {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ error: "Failed to logout" });
        }
        res.json({ success: true });
      });
    } else {
      res.json({ success: true });
    }
  });
  
  // Get current user
  app.get("/api/me", async (req, res) => {
    const userId = req.session?.userId;
    
    if (!userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    try {
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      // Don't send password back to client
      const { password, ...userWithoutPassword } = user;
      
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error fetching current user:", error);
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });
  
  // Admin route: Get all users
  // Get current user role
  app.get("/api/user/role", async (req, res) => {
    const userId = req.session?.userId;
    if (!userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    try {
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      res.json({ role: user.role });
    } catch (error) {
      console.error("Error fetching user role:", error);
      res.status(500).json({ error: "Failed to fetch user role" });
    }
  });

  // Core team can view all aspirants
  app.get("/api/aspirants", async (req, res) => {
    const userId = req.session?.userId;
    if (!userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    try {
      const user = await storage.getUser(userId);
      if (!user || (user.role !== UserRole.CORE_TEAM && user.role !== UserRole.ADMIN)) {
        return res.status(403).json({ error: "Not authorized" });
      }

      const aspirants = await storage.getUsersByRole(UserRole.ASPIRANT);
      const aspirantsWithoutPasswords = aspirants.map(({ password, ...rest }) => rest);
      res.json(aspirantsWithoutPasswords);
    } catch (error) {
      console.error("Error fetching aspirants:", error);
      res.status(500).json({ error: "Failed to fetch aspirants" });
    }
  });

  app.get("/api/users", isAdmin, async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      
      // Remove passwords from response
      const usersWithoutPasswords = users.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      
      res.json(usersWithoutPasswords);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });
  
  // Admin route: Update user role
  app.patch("/api/users/:userId/role", isAdmin, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const { role } = req.body;
      
      if (!role || !Object.values(UserRole).includes(role)) {
        return res.status(400).json({ error: "Invalid role" });
      }
      
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      const updatedUser = await storage.updateUserRole(userId, role);
      
      if (!updatedUser) {
        return res.status(500).json({ error: "Failed to update user role" });
      }
      
      // Don't send password back to client
      const { password, ...userWithoutPassword } = updatedUser;
      
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error updating user role:", error);
      res.status(500).json({ error: "Failed to update user role" });
    }
  });
  
  // For the admin dashboard, we need to create new routes to manage content
  
  // Middleware to check if user is admin or core team member
  const isAdminOrCore = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.session?.userId;
    
    if (!userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    const user = await storage.getUser(userId);
    
    if (!user || (user.role !== UserRole.ADMIN && user.role !== UserRole.CORE_TEAM)) {
      return res.status(403).json({ error: "Not authorized" });
    }
    
    next();
  };
  
  // API endpoints for Projects
  // For now, we'll use in-memory storage with the imported sample data
  let projectsData = [...projects];
  
  app.get("/api/projects", (req, res) => {
    res.json(projectsData);
  });
  
  app.get("/api/projects/:id", (req, res) => {
    const project = projectsData.find(p => p.id === req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  });
  
  app.post("/api/projects", isAdminOrCore, (req, res) => {
    try {
      const newProject = {
        ...req.body,
        id: Math.random().toString(36).substring(2, 15)
      };
      projectsData.push(newProject);
      res.status(201).json(newProject);
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).json({ error: "Failed to create project" });
    }
  });
  
  app.put("/api/projects/:id", isAdminOrCore, (req, res) => {
    try {
      const index = projectsData.findIndex(p => p.id === req.params.id);
      if (index === -1) {
        return res.status(404).json({ error: "Project not found" });
      }
      
      projectsData[index] = { ...projectsData[index], ...req.body };
      res.json(projectsData[index]);
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(500).json({ error: "Failed to update project" });
    }
  });
  
  app.delete("/api/projects/:id", isAdminOrCore, (req, res) => {
    try {
      const index = projectsData.findIndex(p => p.id === req.params.id);
      if (index === -1) {
        return res.status(404).json({ error: "Project not found" });
      }
      
      projectsData.splice(index, 1);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ error: "Failed to delete project" });
    }
  });
  
  // API endpoints for Blogs
  let blogsData = [...blogPosts];
  
  app.get("/api/blogs", (req, res) => {
    res.json(blogsData);
  });
  
  app.get("/api/blogs/:id", (req, res) => {
    const blog = blogsData.find(b => b.id === req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json(blog);
  });
  
  app.post("/api/blogs", isAdminOrCore, (req, res) => {
    try {
      const newBlog = {
        ...req.body,
        id: Math.random().toString(36).substring(2, 15)
      };
      blogsData.push(newBlog);
      res.status(201).json(newBlog);
    } catch (error) {
      console.error("Error creating blog post:", error);
      res.status(500).json({ error: "Failed to create blog post" });
    }
  });
  
  app.put("/api/blogs/:id", isAdminOrCore, (req, res) => {
    try {
      const index = blogsData.findIndex(b => b.id === req.params.id);
      if (index === -1) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      
      blogsData[index] = { ...blogsData[index], ...req.body };
      res.json(blogsData[index]);
    } catch (error) {
      console.error("Error updating blog post:", error);
      res.status(500).json({ error: "Failed to update blog post" });
    }
  });
  
  app.delete("/api/blogs/:id", isAdminOrCore, (req, res) => {
    try {
      const index = blogsData.findIndex(b => b.id === req.params.id);
      if (index === -1) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      
      blogsData.splice(index, 1);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ error: "Failed to delete blog post" });
    }
  });
  
  // API endpoints for Research
  let researchData = [...researchItems];
  
  app.get("/api/research", (req, res) => {
    res.json(researchData);
  });
  
  app.get("/api/research/:id", (req, res) => {
    const research = researchData.find(r => r.id === req.params.id);
    if (!research) {
      return res.status(404).json({ error: "Research item not found" });
    }
    res.json(research);
  });
  
  app.post("/api/research", isAdminOrCore, (req, res) => {
    try {
      const newResearch = {
        ...req.body,
        id: Math.random().toString(36).substring(2, 15)
      };
      researchData.push(newResearch);
      res.status(201).json(newResearch);
    } catch (error) {
      console.error("Error creating research item:", error);
      res.status(500).json({ error: "Failed to create research item" });
    }
  });
  
  app.put("/api/research/:id", isAdminOrCore, (req, res) => {
    try {
      const index = researchData.findIndex(r => r.id === req.params.id);
      if (index === -1) {
        return res.status(404).json({ error: "Research item not found" });
      }
      
      researchData[index] = { ...researchData[index], ...req.body };
      res.json(researchData[index]);
    } catch (error) {
      console.error("Error updating research item:", error);
      res.status(500).json({ error: "Failed to update research item" });
    }
  });
  
  app.delete("/api/research/:id", isAdminOrCore, (req, res) => {
    try {
      const index = researchData.findIndex(r => r.id === req.params.id);
      if (index === -1) {
        return res.status(404).json({ error: "Research item not found" });
      }
      
      researchData.splice(index, 1);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting research item:", error);
      res.status(500).json({ error: "Failed to delete research item" });
    }
  });
  
  // API endpoints for Events
  let eventsData = [...events];
  
  app.get("/api/events", (req, res) => {
    res.json(eventsData);
  });
  
  app.get("/api/events/:id", (req, res) => {
    const event = eventsData.find(e => e.id === req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json(event);
  });
  
  app.post("/api/events", isAdminOrCore, (req, res) => {
    try {
      const newEvent = {
        ...req.body,
        id: Math.random().toString(36).substring(2, 15)
      };
      eventsData.push(newEvent);
      res.status(201).json(newEvent);
    } catch (error) {
      console.error("Error creating event:", error);
      res.status(500).json({ error: "Failed to create event" });
    }
  });
  
  app.put("/api/events/:id", isAdminOrCore, (req, res) => {
    try {
      const index = eventsData.findIndex(e => e.id === req.params.id);
      if (index === -1) {
        return res.status(404).json({ error: "Event not found" });
      }
      
      eventsData[index] = { ...eventsData[index], ...req.body };
      res.json(eventsData[index]);
    } catch (error) {
      console.error("Error updating event:", error);
      res.status(500).json({ error: "Failed to update event" });
    }
  });
  
  app.delete("/api/events/:id", isAdminOrCore, (req, res) => {
    try {
      const index = eventsData.findIndex(e => e.id === req.params.id);
      if (index === -1) {
        return res.status(404).json({ error: "Event not found" });
      }
      
      eventsData.splice(index, 1);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting event:", error);
      res.status(500).json({ error: "Failed to delete event" });
    }
  });
  
  // User role update endpoint to be used from admin dashboard
  app.put("/api/users/:userId/role", isAdmin, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const { role } = req.body;
      
      if (!role || !Object.values(UserRole).includes(role)) {
        return res.status(400).json({ error: "Invalid role" });
      }
      
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      const updatedUser = await storage.updateUserRole(userId, role);
      
      if (!updatedUser) {
        return res.status(500).json({ error: "Failed to update user role" });
      }
      
      // Don't send password back to client
      const { password, ...userWithoutPassword } = updatedUser;
      
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error updating user role:", error);
      res.status(500).json({ error: "Failed to update user role" });
    }
  });

  // API endpoint to check if current user is logged in and get their details
  app.get("/api/users/me", async (req, res) => {
    const userId = req.session?.userId;
    
    if (!userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    try {
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      // Don't send password back to client
      const { password, ...userWithoutPassword } = user;
      
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error fetching current user:", error);
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
