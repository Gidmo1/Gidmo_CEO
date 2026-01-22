import { ExternalLink } from "lucide-react";

interface TextLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export function TextLink({ href, children, className, ...props }: TextLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-1 font-medium hover:text-muted-foreground transition-colors ${className}`}
      {...props}
    >
      <span className="border-b border-foreground/30 pb-0.5 group-hover:border-foreground/0 transition-all duration-300">
        {children}
      </span>
      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-y-1 translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
    </a>
  );
}
