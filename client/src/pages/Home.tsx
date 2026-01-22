import { useContentSection } from "@/hooks/use-content";
import { useSkills } from "@/hooks/use-skills";
import { SectionHeading } from "@/components/SectionHeading";
import { TextLink } from "@/components/TextLink";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@shared/routes";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// Staggered animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
  },
};

export default function Home() {
  const { content: tagline, isLoading: loadingTagline } = useContentSection("hero_tagline");
  const { content: about, isLoading: loadingAbout } = useContentSection("about");
  const { content: work, isLoading: loadingWork } = useContentSection("work");
  const { data: skills, isLoading: loadingSkills } = useSkills();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(api.contact.submit.input),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(data: any) {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/contact", data);
      toast({
        title: "Message sent",
        description: "I'll get back to you as soon as I can.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  // Loading state skeleton
  if (loadingTagline || loadingAbout || loadingWork || loadingSkills) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="animate-pulse space-y-8 max-w-2xl w-full">
          <div className="h-12 w-48 bg-muted/50 rounded-sm" />
          <div className="h-8 w-3/4 bg-muted/30 rounded-sm" />
          <div className="space-y-3 pt-12">
            <div className="h-4 w-full bg-muted/20 rounded-sm" />
            <div className="h-4 w-5/6 bg-muted/20 rounded-sm" />
            <div className="h-4 w-4/6 bg-muted/20 rounded-sm" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <motion.main 
        className="max-w-3xl mx-auto px-6 py-24 md:py-32 lg:py-40"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* HERO */}
        <motion.header variants={itemVariants} className="mb-24 md:mb-32">
          <div className="flex flex-col gap-2">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9]">
              Gidmo
            </h1>
            <span className="text-sm md:text-base text-muted-foreground font-mono ml-1">
              Akande Mohammed Folarin
            </span>
          </div>
          
          <p className="mt-8 md:mt-12 text-2xl md:text-3xl font-light leading-snug max-w-xl text-balance">
            {tagline?.text || "I build mobile apps and games that people actually play."}
          </p>
        </motion.header>

        {/* ABOUT */}
        <motion.section variants={itemVariants} className="mb-20 md:mb-28">
          <SectionHeading>About</SectionHeading>
          <div className="text-lg md:text-xl leading-relaxed text-foreground/90 font-light max-w-2xl space-y-6">
            <p className="whitespace-pre-line">
              {about?.text || "I am a mobile app and game developer. I focus on building tools that automate the boring stuff and systems that just work. I learn deeply to understand how things work at their core."}
            </p>
          </div>
        </motion.section>

        {/* PROJECTS */}
        <motion.section variants={itemVariants} className="mb-20 md:mb-28">
          <SectionHeading>Projects</SectionHeading>
          <div className="text-lg md:text-xl leading-relaxed text-foreground/90 font-light max-w-2xl space-y-12">
            <div className="space-y-4">
              <TextLink href="https://arenaanywhere.site" className="text-accent-primary text-2xl font-medium underline underline-offset-8">
                arenaanywhere.site
              </TextLink>
              <p className="text-lg leading-relaxed text-foreground/80">
                A one-tap platform to play PPSSPP eFootball online instantly. It connects players automatically, eliminates VPN hassles, and handles IP sharing in the background. Play in 60 seconds.
              </p>
            </div>

            <div className="space-y-4">
              <div className="text-2xl font-medium text-foreground">Orderlyy</div>
              <p className="text-lg leading-relaxed text-foreground/80">
                Automating shop management on Telegram and WhatsApp. It helps vendors handle orders and inventory without manual messaging back-and-forth.
              </p>
            </div>
          </div>
        </motion.section>

        {/* SKILLS */}
        <motion.section variants={itemVariants} className="mb-20 md:mb-28">
          <SectionHeading>Skills</SectionHeading>
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-lg md:text-xl font-light text-foreground/80">
            {skills && skills.length > 0 ? (
              skills.sort((a, b) => a.order - b.order).map((skill) => (
                <li key={skill.id} className="relative">
                  {skill.name}
                </li>
              ))
            ) : (
              <li className="text-muted-foreground">Mobile Dev, Game Dev, System Automation</li>
            )}
          </ul>
        </motion.section>

        {/* CONTACT */}
        <motion.section variants={itemVariants} className="mb-32">
          <SectionHeading>Contact</SectionHeading>
          <div className="max-w-xl space-y-12">
            <div className="space-y-4">
              <p className="text-lg md:text-xl font-light text-foreground/90">
                Want to work together? Use the form below or find me on socials.
              </p>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} className="bg-transparent border-border/60 focus:border-accent-primary" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your@email.com" {...field} className="bg-transparent border-border/60 focus:border-accent-primary" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell me about your project..." 
                            className="bg-transparent border-border/60 focus:border-accent-primary min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full sm:w-auto bg-accent-primary hover:bg-accent-primary/90 text-white px-8 h-12 rounded-sm transition-all"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>

            <div className="pt-8 border-t border-border/40">
              <p className="text-sm text-muted-foreground uppercase tracking-widest mb-4">Socials</p>
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 text-lg">
                <TextLink href="https://x.com/gidmo_ceo">X (Twitter)</TextLink>
                <TextLink href="https://instagram.com/gidmo.godtimestudios">Instagram</TextLink>
              </div>
            </div>
          </div>
        </motion.section>

        {/* FOOTER */}
        <motion.footer variants={itemVariants} className="pt-12 border-t border-border/40">
          <p className="text-sm text-muted-foreground font-mono">
            © {new Date().getFullYear()} Gidmo. All rights reserved.
          </p>
        </motion.footer>

      </motion.main>
    </div>
  );
}