import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.content.list.path, async (_req, res) => {
    const content = await storage.getContent();
    res.json(content);
  });

  app.get(api.skills.list.path, async (_req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      await storage.saveMessage(input);

      if (resend) {
        try {
          await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: 'gidmo@arenaanywhere.site',
            subject: `New Message from ${input.name}`,
            text: `Name: ${input.name}\nEmail: ${input.email}\n\nMessage:\n${input.message}`,
          });
        } catch (emailError) {
          console.error("Failed to send email:", emailError);
          // Still return success since it's saved in DB
        }
      }

      res.json({ success: true });
    } catch (err) {
      res.status(400).json({ message: "Invalid input" });
    }
  });

  // Seed data on startup
  await storage.seedInitialData();

  return httpServer;
}
