import { cn } from "@/lib/utils";

interface FormulaDisplayProps {
  formula: string;
  caption?: string;
  className?: string;
}

export function FormulaDisplay({ formula, caption, className }: FormulaDisplayProps) {
  return (
    <figure className={cn("my-4", className)}>
      <div className="overflow-x-auto rounded-lg border border-border bg-primary px-5 py-4">
        <code className="whitespace-nowrap font-mono text-base text-primary-foreground md:text-lg">
          {formula}
        </code>
      </div>
      {caption && <figcaption className="mt-2 text-xs text-muted">{caption}</figcaption>}
    </figure>
  );
}
