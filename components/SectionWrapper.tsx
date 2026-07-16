import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
}

export function SectionWrapper({
  id,
  eyebrow,
  title,
  subtitle,
  className,
  children,
}: SectionWrapperProps) {
  return (
    <section id={id} className={cn("py-16 md:py-20", className)}>
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <header className="mb-8 md:mb-10">
          {eyebrow && (
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-secondary">
              {eyebrow}
            </p>
          )}
          <h2 className="text-2xl font-bold tracking-tight text-primary text-balance md:text-3xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted">{subtitle}</p>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}
