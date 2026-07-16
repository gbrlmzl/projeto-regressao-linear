import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ExampleCardProps {
  icon?: React.ReactNode;
  label: string;
  badge?: string;
  children: React.ReactNode;
  tone?: "default" | "accent";
}

export function ExampleCard({ icon, label, badge, children, tone = "default" }: ExampleCardProps) {
  return (
    <Card className={tone === "accent" ? "border-accent/30 bg-accent/5" : undefined}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-wide text-muted">
            {icon}
            {label}
          </CardTitle>
          {badge && <Badge variant={tone === "accent" ? "accent" : "secondary"}>{badge}</Badge>}
        </div>
      </CardHeader>
      <CardContent className="text-sm leading-relaxed text-ink">{children}</CardContent>
    </Card>
  );
}
