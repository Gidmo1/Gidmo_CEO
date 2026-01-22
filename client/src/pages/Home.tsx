import { useContentSection } from "@/hooks/use-content";
import { useSkills } from "@/hooks/use-skills";
import { SectionHeading } from "@/components/SectionHeading";
import { TextLink } from "@/components/TextLink";
import { motion } from "framer-motion";

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
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } // Custom easing for editorial feel
  },
};

export default function Home() {
  const { content: tagline, isLoading: loadingTagline } = useContentSection("hero_tagline");
  const { content: about, isLoading: loadingAbout } = useContentSection("about");
  const { content: work, isLoading: loadingWork } = useContentSection("work");
  const { data: skills, isLoading: loadingSkills } = useSkills();

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
            {tagline?.text || "I build systems that remove friction."}
          </p>
        </motion.header>

        {/* ABOUT */}
        <motion.section variants={itemVariants} className="mb-20 md:mb-28">
          <SectionHeading>About</SectionHeading>
          <div className="text-lg md:text-xl leading-relaxed text-foreground/90 font-light max-w-2xl space-y-6">
            <p className="whitespace-pre-line">
              {about?.text || "I am a builder focused on automation and digital infrastructure. I don't just write code; I design systems that solve real problems. My approach is practical, grounded, and long-term."}
            </p>
          </div>
        </motion.section>

        {/* WORK / DIRECTION */}
        <motion.section variants={itemVariants} className="mb-20 md:mb-28">
          <SectionHeading>Projects</SectionHeading>
          <div className="text-lg md:text-xl leading-relaxed text-foreground/90 font-light max-w-2xl space-y-6">
            <p className="whitespace-pre-line">
              {work?.text || "Building things that matter."}
            </p>
            <div className="pt-4">
              <TextLink href="https://arenaanywhere.site" className="text-accent-primary font-medium">
                arenaanywhere.site
              </TextLink>
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
              <li className="text-muted-foreground">Automation, Systems Architecture, Product Engineering</li>
            )}
          </ul>
        </motion.section>

        {/* CONTACT */}
        <motion.section variants={itemVariants} className="mb-32">
          <SectionHeading>Contact</SectionHeading>
          <div className="space-y-6">
            <p className="text-lg md:text-xl font-light text-foreground/90">
              Drop me a line at{" "}
              <a href="mailto:gidmo@arenaanywhere.site" className="text-accent-primary font-medium hover:underline underline-offset-4">
                gidmo@arenaanywhere.site
              </a>
            </p>
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 text-lg">
              <TextLink href="https://x.com/gidmo_ceo">
                X (Twitter)
              </TextLink>
              <TextLink href="https://instagram.com/gidmo.godtimestudios">
                Instagram
              </TextLink>
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
