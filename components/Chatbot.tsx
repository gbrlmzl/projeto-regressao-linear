"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGESTOES = [
  "O que é R² e como interpretar?",
  "Qual a diferença entre regressão simples e múltipla?",
  "O que é multicolinearidade?",
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // Esc fecha o painel.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  async function send(text: string) {
    const pergunta = text.trim();
    if (!pergunta || loading) return;

    const next: Message[] = [...messages, { role: "user", content: pergunta }];
    setMessages(next);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data?.error ?? "Falha ao obter resposta.");

      setMessages([...next, { role: "assistant", content: data.response }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Abrir chat sobre Regressão Linear"
          className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {isOpen && (
        <div
          role="dialog"
          aria-label="Assistente de Regressão Linear"
          className={cn(
            "fixed z-50 flex flex-col border-border bg-surface shadow-2xl",
            // Mobile: tela cheia. Desktop: painel fixo de 400px.
            "inset-0 md:inset-auto md:bottom-5 md:right-5 md:h-[600px] md:max-h-[calc(100vh-2.5rem)] md:w-[400px] md:rounded-xl md:border",
          )}
        >
          <header className="flex shrink-0 items-center justify-between gap-2 border-b border-border bg-primary px-4 py-3 md:rounded-t-xl">
            <div>
              <p className="text-sm font-semibold text-primary-foreground">
                Assistente de Regressão Linear
              </p>
              <p className="text-xs text-primary-foreground/60">
                Tire dúvidas sobre o modelo
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Fechar chat"
              className="rounded-md p-1.5 text-primary-foreground/80 transition-colors hover:bg-white/10 hover:text-primary-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <ScrollArea className="flex-1">
            <div className="flex flex-col gap-3 p-4">
              {messages.length === 0 && (
                <div className="py-6">
                  <p className="text-sm text-muted">
                    Olá! Posso explicar coeficientes, R², p-valor, resíduos, mínimos quadrados e
                    como a Regressão Linear apoia decisões. Por onde começamos?
                  </p>
                  <div className="mt-4 flex flex-col gap-2">
                    {SUGESTOES.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => send(s)}
                        className="rounded-lg border border-border px-3 py-2 text-left text-xs text-ink transition-colors hover:border-secondary hover:bg-secondary/5"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "max-w-[85%] whitespace-pre-wrap rounded-xl px-3.5 py-2.5 text-sm leading-relaxed",
                    m.role === "user"
                      ? "self-end bg-secondary text-white"
                      : "self-start border border-border bg-background text-ink",
                  )}
                >
                  {m.content}
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 self-start rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-muted">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Pensando...
                </div>
              )}

              {error && (
                <p
                  role="alert"
                  className="self-start rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700"
                >
                  {error}
                </p>
              )}

              <div ref={bottomRef} />
            </div>
          </ScrollArea>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex shrink-0 gap-2 border-t border-border p-3"
          >
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pergunte sobre Regressão Linear..."
              maxLength={1000}
              disabled={loading}
              aria-label="Sua pergunta"
            />
            <Button
              type="submit"
              size="icon"
              variant="secondary"
              disabled={loading || !input.trim()}
              aria-label="Enviar pergunta"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
