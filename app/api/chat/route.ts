import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

// Limites de custo. Ver README > Custos.
const MODEL = "claude-haiku-4-5";
const MAX_TOKENS = 800;
const MAX_HISTORY = 6; // a API é stateless: todo o histórico é reenviado (e cobrado) a cada turno
const MAX_INPUT_CHARS = 1000;

const SYSTEM_PROMPT = `Você é um assistente educacional especialista em Regressão Linear,
no contexto da disciplina de Sistemas de Apoio à Gestão.

Suas responsabilidades:
- Responder perguntas sobre Regressão Linear (simples e múltipla).
- Explicar conceitos como coeficientes, R², p-valor, resíduos, mínimos quadrados.
- Dar exemplos práticos de uso em apoio à decisão.
- Explicar vantagens, limitações e premissas do modelo.
- Conectar com o conceito de Sistemas de Apoio à Decisão (SAD).

Regras:
- Responda APENAS sobre Regressão Linear e temas diretamente relacionados.
- Se a pergunta for fora do escopo, diga educadamente que só pode ajudar com Regressão Linear.
- Use linguagem didática, nível universitário.
- Responda em português brasileiro.
- Seja conciso mas completo.
- Use fórmulas quando relevante (formato texto simples, ex: Y = β₀ + β₁X).`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

function isValidMessage(m: unknown): m is ChatMessage {
  if (typeof m !== "object" || m === null) return false;
  const { role, content } = m as Record<string, unknown>;
  return (role === "user" || role === "assistant") && typeof content === "string";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const raw = body?.messages;

    if (!Array.isArray(raw) || raw.length === 0 || !raw.every(isValidMessage)) {
      return NextResponse.json(
        { error: "Formato inválido: esperado { messages: [{ role, content }] }." },
        { status: 400 },
      );
    }

    const messages = raw as ChatMessage[];
    const last = messages[messages.length - 1];

    if (last.role !== "user" || last.content.trim().length === 0) {
      return NextResponse.json(
        { error: "A última mensagem deve ser do usuário e não pode estar vazia." },
        { status: 400 },
      );
    }

    // Sem isso, qualquer visitante pode colar um texto gigante e gerar custo de tokens.
    if (last.content.length > MAX_INPUT_CHARS) {
      return NextResponse.json(
        { error: `Pergunta muito longa (limite: ${MAX_INPUT_CHARS} caracteres).` },
        { status: 400 },
      );
    }

    const response = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: SYSTEM_PROMPT,
      messages: messages.slice(-MAX_HISTORY),
    });

    const text = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("");

    return NextResponse.json({ response: text });
  } catch (error) {
    // A chave nunca deve vazar para o cliente: log completo no servidor,
    // mensagem genérica na resposta.
    console.error("[/api/chat]", error);

    if (error instanceof Anthropic.RateLimitError) {
      return NextResponse.json(
        { error: "Muitas perguntas ao mesmo tempo. Aguarde alguns segundos e tente de novo." },
        { status: 429 },
      );
    }
    if (error instanceof Anthropic.AuthenticationError) {
      return NextResponse.json(
        { error: "Chave de API inválida ou ausente no servidor." },
        { status: 500 },
      );
    }
    if (error instanceof Anthropic.APIError) {
      return NextResponse.json(
        { error: "O serviço de IA está indisponível no momento. Tente novamente em instantes." },
        { status: 502 },
      );
    }
    return NextResponse.json({ error: "Erro inesperado ao processar a pergunta." }, { status: 500 });
  }
}
