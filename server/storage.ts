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
          text: "I build things that actually work." 
        },
        { 
          section: "about", 
          text: "I focus on the logic behind the code. I build tools that automate the boring stuff and systems that just work. My approach is grounded in making things simpler and more efficient. I learn deeply to understand how things work at their core." 
        },
        { 
          section: "work", 
          text: "I'm currently building orderlyy, which lets people automate their shops on Telegram (WhatsApp coming soon). I also founded arenaanywhere.site. I like building digital infrastructure that solves real problems without the fluff." 
        }
      ]);
    }

    const existingSkills = await this.getSkills();
    if (existingSkills.length === 0) {
      await db.insert(skills).values([
        { name: "System Architecture", order: 1 },
        { name: "Automation", order: 2 },
        { name: "Telegram/WhatsApp Bot Dev", order: 3 },
        { name: "Product Engineering", order: 4 },
      ]);
    }
  }
}

export const storage = new DatabaseStorage();
