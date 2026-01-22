interface SectionHeadingProps {
  children: React.ReactNode;
}

export function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-4 md:mb-6">
      {children}
    </h2>
  );
}
