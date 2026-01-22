import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const content = pgTable("content", {
  id: serial("id").primaryKey(),
  section: text("section").notNull().unique(), // e.g., 'hero_tagline', 'about', 'work'
  text: text("text").notNull(),
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  order: serial("order").notNull(),
});

export const insertContentSchema = createInsertSchema(content).omit({ id: true });
export const insertSkillSchema = createInsertSchema(skills).omit({ id: true });

export type Content = typeof content.$inferSelect;
export type InsertContent = z.infer<typeof insertContentSchema>;
export type Skill = typeof skills.$inferSelect;
export type InsertSkill = z.infer<typeof insertSkillSchema>;
