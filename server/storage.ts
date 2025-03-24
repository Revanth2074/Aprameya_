import { users, type User, type InsertUser, UserRole, type UserRoleType } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserRole(userId: number, newRole: UserRoleType): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  getUsersByRole(role: UserRoleType): Promise<User[]>;
}

export class DatabaseStorage implements IStorage {
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
        createdAt: new Date().toISOString()
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
  
  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }
}

export const storage = new DatabaseStorage();
