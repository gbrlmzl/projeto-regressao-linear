import { LineChart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-primary-foreground">
            <LineChart className="h-5 w-5 text-accent" aria-hidden />
            <span className="font-semibold">Regressão Linear</span>
          </div>
          <p className="mt-2 max-w-md text-sm text-primary-foreground/60">
            Material didático produzido para a disciplina de Sistemas de Apoio à Gestão.
            Modelo de apoio à decisão baseado em dados.
          </p>
        </div>
        <div className="text-sm text-primary-foreground/60 md:text-right">
          <p>
            Referências completas na{" "}
            <a
              href="#referencias"
              className="text-accent underline-offset-4 transition-colors hover:underline"
            >
              seção 12
            </a>
            .
          </p>
          <p className="mt-1">Chatbot construído com a API do Google Gemini.</p>
        </div>
      </div>
    </footer>
  );
}
