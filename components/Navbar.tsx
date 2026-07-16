"use client";

import { useEffect, useState } from "react";
import { Menu, X, LineChart } from "lucide-react";
import { SECTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  // Destaca o link da seção visível. rootMargin recorta a faixa de detecção
  // para o terço superior da viewport, senão várias seções ficam ativas juntas.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -66% 0px", threshold: 0 },
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a
          href="#inicio"
          className="flex shrink-0 items-center gap-2 font-semibold text-primary"
          onClick={() => setOpen(false)}
        >
          <LineChart className="h-5 w-5 text-secondary" aria-hidden />
          <span className="text-sm md:text-base">Regressão Linear</span>
        </a>

        {/* Desktop */}
        <ul className="hidden items-center gap-1 lg:flex">
          {SECTIONS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={cn(
                  "rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
                  active === id
                    ? "bg-secondary/10 text-secondary"
                    : "text-muted hover:bg-background hover:text-primary",
                )}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className="rounded-md p-2 text-primary hover:bg-background lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile */}
      {open && (
        <div
          id="menu-mobile"
          className="max-h-[70vh] overflow-y-auto border-t border-border bg-surface lg:hidden"
        >
          <ul className="mx-auto grid max-w-6xl gap-0.5 px-4 py-3 sm:px-6">
            {SECTIONS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                    active === id
                      ? "bg-secondary/10 text-secondary"
                      : "text-muted hover:bg-background hover:text-primary",
                  )}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
