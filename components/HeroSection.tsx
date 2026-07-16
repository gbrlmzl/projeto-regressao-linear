import { HERO } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[88vh] items-center overflow-hidden border-b border-border bg-primary"
    >
      {/* Dispersão + reta de regressão como fundo decorativo. */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.18]"
        viewBox="0 0 800 400"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <pattern id="grade" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#F8FAFC" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="800" height="400" fill="url(#grade)" />
        {[
          [80, 330], [140, 300], [200, 292], [260, 258], [320, 240],
          [380, 208], [440, 196], [500, 160], [560, 142], [620, 108],
          [680, 96], [740, 62],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="5" fill="#10B981" />
        ))}
        <line
          x1="60"
          y1="336"
          x2="760"
          y2="70"
          stroke="#3B82F6"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      <div className="relative mx-auto w-full max-w-5xl px-4 py-24 sm:px-6">
        <Badge variant="accent" className="mb-5 animate-fade-up bg-accent/20 text-accent">
          Sistemas de Apoio à Gestão
        </Badge>
        <h1
          className="animate-fade-up text-balance text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl md:text-6xl"
          style={{ animationDelay: "80ms" }}
        >
          {HERO.title}
        </h1>
        <p
          className="mt-5 max-w-2xl animate-fade-up text-lg text-primary-foreground/80 md:text-xl"
          style={{ animationDelay: "160ms" }}
        >
          {HERO.subtitle}
        </p>
        <p
          className="mt-4 max-w-2xl animate-fade-up leading-relaxed text-primary-foreground/60"
          style={{ animationDelay: "240ms" }}
        >
          {HERO.tagline}
        </p>

        <div
          className="mt-9 flex animate-fade-up flex-wrap gap-3"
          style={{ animationDelay: "320ms" }}
        >
          <a
            href="#contexto"
            className="inline-flex h-11 items-center rounded-lg bg-accent px-5 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/90"
          >
            Começar pelo contexto
          </a>
          <a
            href="#exemplo-1"
            className="inline-flex h-11 items-center rounded-lg border border-primary-foreground/25 px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
          >
            Ver um exemplo prático
          </a>
        </div>
      </div>
    </section>
  );
}
