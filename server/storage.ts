import { db } from "./db";
import {
  content,
  skills,
  contactMessages,
  type Content,
  type Skill,
  type InsertContent,
  type InsertSkill,
  type InsertContactMessage
} from "@shared/schema";

export interface IStorage {
  getContent(): Promise<Content[]>;
  getSkills(): Promise<Skill[]>;
  saveMessage(message: InsertContactMessage): Promise<void>;
  seedInitialData(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getContent(): Promise<Content[]> {
    return await db.select().from(content);
  }

  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills).orderBy(skills.order);
  }

  async saveMessage(message: InsertContactMessage): Promise<void> {
    await db.insert(contactMessages).values(message);
  }

  async seedInitialData(): Promise<void> {
    const existingContent = await this.getContent();
    if (existingContent.length === 0) {
      await db.insert(content).values([
        { 
          section: "hero_tagline", 
          text: "I build mobile apps and games that make a difference." 
        },
        { 
          section: "about", 
          text: "I'm a mobile app and game developer. I focus on building tools that automate the boring stuff and systems that just work. I learn deeply to understand how things work at their core." 
        },
        { 
          section: "work", 
          text: "I'm currently building Orderlyy, an automated shop system for Telegram and WhatsApp. I also built Arena Anywhere, a one-tap platform to play PPSSPP eFootball online without the hassle of VPNs or manual IP sharing." 
        }
      ]);
    }

    const existingSkills = await this.getSkills();
    if (existingSkills.length === 0) {
      await db.insert(skills).values([
        { name: "Mobile App Development", order: 1 },
        { name: "Game Development", order: 2 },
        { name: "System Automation", order: 3 },
        { name: "Backend Logic", order: 4 },
      ]);
    }
  }
}

export const storage = new DatabaseStorage();
