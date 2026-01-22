import { db } from "./db";
import {
  content,
  skills,
  type Content,
  type Skill,
  type InsertContent,
  type InsertSkill
} from "@shared/schema";

export interface IStorage {
  getContent(): Promise<Content[]>;
  getSkills(): Promise<Skill[]>;
  seedInitialData(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getContent(): Promise<Content[]> {
    return await db.select().from(content);
  }

  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills).orderBy(skills.order);
  }

  async seedInitialData(): Promise<void> {
    const existingContent = await this.getContent();
    if (existingContent.length === 0) {
      await db.insert(content).values([
        { 
          section: "hero_tagline", 
          text: "I build systems that remove friction." 
        },
        { 
          section: "about", 
          text: "I focus on the logic behind the code. I build tools that automate the mundane and systems that scale without breaking. My approach is grounded in removing friction and enabling efficiency. I learn deeply to understand how things work at their core." 
        },
        { 
          section: "work", 
          text: "I am interested in building automation pipelines, community tools, and robust digital infrastructure. My goal is to create practical software that solves actual problems." 
        }
      ]);
    }

    const existingSkills = await this.getSkills();
    if (existingSkills.length === 0) {
      await db.insert(skills).values([
        { name: "System Architecture", order: 1 },
        { name: "Automation", order: 2 },
        { name: "Digital Infrastructure", order: 3 },
        { name: "Backend Logic", order: 4 },
      ]);
    }
  }
}

export const storage = new DatabaseStorage();
