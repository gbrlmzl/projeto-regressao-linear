import { GoogleGenAI, ApiError } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Limites de cota e abuso. Ver README > Custos e limites.
//
// Ao trocar de modelo, confira duas coisas (as duas já morderam este projeto):
//   1. Free tier: `gemini-2.0-flash` e `-flash-lite` respondem 429 com "limit: 0"
//      — estão fora da cota gratuita, apesar de aparecerem em models.list().
//   2. Raciocínio interno: modelos com "thinking" (ex.: gemini-flash-latest)
//      gastam MAX_OUTPUT_TOKENS pensando antes de escrever. Medido aqui: 628
//      tokens de raciocínio + 168 de texto = resposta cortada no meio da frase,
//      com finishReason MAX_TOKENS. Se usar um deles, suba MAX_OUTPUT_TOKENS
//      bem acima de 800 ou desligue via config.thinkingConfig.
const MODEL = "gemini-3.1-flash-lite";
const MAX_OUTPUT_TOKENS = 800;
const MAX_HISTORY = 6; // a API é stateless: todo o histórico é reenviado a cada turno
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
- Use fórmulas quando relevante (formato texto simples, ex: Y = β₀ + β₁X).
- Não use Markdown: o chat renderiza texto puro.`;

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

    // Sem isso, qualquer visitante pode colar um texto gigante e queimar a cota.
    if (last.content.length > MAX_INPUT_CHARS) {
      return NextResponse.json(
        { error: `Pergunta muito longa (limite: ${MAX_INPUT_CHARS} caracteres).` },
        { status: 400 },
      );
    }

    // A SDK do Google não lê process.env sozinha (diferente da Anthropic), então
    // a chave vai explícita. A checagem fica aqui, depois da validação: rejeitar
    // um request malformado não depende de haver chave configurada.
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "your_api_key_here") {
      console.error("[/api/chat] GEMINI_API_KEY ausente ou com valor placeholder.");
      return NextResponse.json(
        { error: "Chave de API não configurada no servidor." },
        { status: 500 },
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    // Cortar o histórico pode deixar um "assistant" na primeira posição; como a
    // conversa precisa abrir com o usuário, descartamos o que sobrar na frente.
    const history = messages.slice(-MAX_HISTORY);
    while (history.length > 0 && history[0].role !== "user") history.shift();

    const response = await ai.models.generateContent({
      model: MODEL,
      // O Gemini chama a resposta do modelo de "model", não de "assistant".
      contents: history.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
      config: {
        systemInstruction: SYSTEM_PROMPT,
        maxOutputTokens: MAX_OUTPUT_TOKENS,
      },
    });

    // response.text é um getter e pode vir undefined — resposta bloqueada por
    // filtro de segurança ou cortada pelo limite de tokens antes de gerar texto.
    const text = response.text;
    if (!text) {
      console.error(
        "[/api/chat] Resposta sem texto.",
        JSON.stringify(response.candidates?.[0]?.finishReason),
      );
      return NextResponse.json(
        { error: "Não consegui gerar uma resposta para essa pergunta. Tente reformulá-la." },
        { status: 502 },
      );
    }

    return NextResponse.json({ response: text });
  } catch (error) {
    // A chave nunca deve vazar para o cliente: log completo no servidor,
    // mensagem genérica na resposta.
    console.error("[/api/chat]", error);

    if (error instanceof ApiError) {
      if (error.status === 429) {
        return NextResponse.json(
          { error: "Limite de uso atingido. Aguarde um instante e tente de novo." },
          { status: 429 },
        );
      }
      if (error.status === 400 || error.status === 401 || error.status === 403) {
        return NextResponse.json(
          { error: "Chave de API inválida ou sem permissão." },
          { status: 500 },
        );
      }
      return NextResponse.json(
        { error: "O serviço de IA está indisponível no momento. Tente novamente em instantes." },
        { status: 502 },
      );
    }

    return NextResponse.json({ error: "Erro inesperado ao processar a pergunta." }, { status: 500 });
  }
}
