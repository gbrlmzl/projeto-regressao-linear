# Regressão Linear — SPA Educacional com Chatbot

Single Page Application educacional sobre **Regressão Linear** como modelo de apoio à decisão,
com chatbot integrado que responde dúvidas sobre o tema.

Projeto acadêmico da disciplina de **Sistemas de Apoio à Gestão**.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS · shadcn/ui · Recharts
**Chatbot:** API da Anthropic (Claude) via Route Handler
**Deploy:** Vercel

---

## Rodando localmente

```bash
npm install
cp .env.example .env.local   # e preencha a chave (ver abaixo)
npm run dev
```

Abre em http://localhost:3000.

O site inteiro funciona sem chave de API — só o chatbot precisa dela.

---

## Configurando a chave da API

A API da Anthropic é **cobrada em créditos separados** e não tem relação com uma assinatura
Claude Pro/Max — usar esta API não consome nada da sua assinatura.

1. Acesse [console.anthropic.com](https://console.anthropic.com).
2. **Recomendado:** em *Settings → Workspaces*, crie um workspace para o projeto e defina um
   **spend limit** (ex.: US$ 5). Assim o gasto fica isolado e limitado.
3. Em *API Keys*, crie uma chave **dentro desse workspace**.
4. Cole em `.env.local`:

```env
ANTHROPIC_API_KEY=sk-ant-...
```

`.env.local` está no `.gitignore` e **nunca** deve ser commitado. A chave é lida apenas no
servidor (`app/api/chat/route.ts`), então nunca chega ao browser.

---

## Custos

O chatbot tem várias camadas de controle de gasto, da mais grossa para a mais fina:

| Camada | Onde | Valor atual |
|---|---|---|
| Spend limit | Console (Workspace) | definido por você |
| Modelo | `app/api/chat/route.ts` → `MODEL` | `claude-haiku-4-5` (o mais barato) |
| Teto por resposta | `route.ts` → `MAX_TOKENS` | 800 |
| Histórico enviado | `route.ts` → `MAX_HISTORY` | últimas 6 mensagens |
| Tamanho da pergunta | `route.ts` → `MAX_INPUT_CHARS` | 1000 caracteres |

O `MAX_HISTORY` é o que a maioria dos projetos esquece: a API é *stateless*, então todo o
histórico é reenviado — e cobrado — a cada mensagem. Sem o corte, uma conversa de 20 turnos
paga o histórico 20 vezes.

O `MAX_INPUT_CHARS` existe porque o site é público: sem ele, qualquer visitante pode colar um
texto gigante e gerar custo de tokens na sua conta.

---

## Deploy na Vercel

1. `git push` para o GitHub.
2. Importe o repositório em [vercel.com/new](https://vercel.com/new).
3. Em *Settings → Environment Variables*, adicione `ANTHROPIC_API_KEY` (marque Production,
   Preview e Development).
4. Deploy.

A rota `/api/chat` é renderizada sob demanda no servidor; o resto da página é estático.

---

## Estrutura

```
app/
├── layout.tsx            # fontes (Inter / JetBrains Mono), metadata
├── page.tsx              # as 12 seções da SPA
├── globals.css
└── api/chat/route.ts     # proxy da API do Claude + validação e limites
components/
├── Navbar.tsx            # navbar fixa, scroll suave, seção ativa, hamburger no mobile
├── HeroSection.tsx
├── SectionWrapper.tsx
├── FormulaDisplay.tsx
├── InteractiveChart.tsx  # scatter + reta ajustada (Recharts)
├── ExampleCard.tsx
├── Chatbot.tsx           # widget flutuante
├── Footer.tsx
└── ui/                   # componentes shadcn/ui
lib/
├── regression.ts         # OLS simples e múltipla, R²
├── constants.ts          # todo o conteúdo textual das seções
└── utils.ts              # cn()
```

O conteúdo das seções está em `lib/constants.ts` para facilitar edição sem mexer no JSX.

---

## Sobre os cálculos

Os coeficientes **não são hardcoded** — são calculados a partir dos dados em
`lib/regression.ts` e renderizados no servidor. Editar os dados em `lib/constants.ts`
atualiza equações, R² e previsões automaticamente.

- **Simples (OLS):** `b1 = Σ(x-x̄)(y-ȳ) / Σ(x-x̄)²`, `b0 = ȳ - b1·x̄`
- **Múltipla:** equações normais `(XᵀX)β = Xᵀy` resolvidas por Gauss-Jordan com pivoteamento
  parcial.

Valores conferidos com os dados do projeto:

| Exemplo | Ajuste | R² | Previsão |
|---|---|---|---|
| 1 — Vendas | `Ŷ = 5.6881 + 4.8452·X` | 0,9946 | R$ 29.914 para R$ 5.000 investidos |
| 2 — Imóveis | `Ŷ = -12.8526 + 3.5351·área + 26.8852·quartos` | 0,9946 | R$ 350.610 para 80m² / 3 quartos |

Ambos os algoritmos recuperam exatamente os coeficientes de relações lineares perfeitas
(`y = 3 + 2x` → b₀=3, b₁=2, R²=1; `y = 5 + 2x₁ + 3x₂` → 5, 2, 3, R²=1).

---

## Gráfico interativo

Na seção *Como o Modelo Funciona*, o gráfico aceita interação:

- **Clique numa área vazia** → adiciona um ponto e reajusta a reta.
- **Clique num ponto existente** → remove.
- **Restaurar** → volta aos dados originais.

Vale experimentar adicionar um outlier: um único ponto extremo derruba o R² de 0,99 para
~0,24 — a demonstração prática da limitação "sensível a outliers" da seção 8.

> **Nota de implementação:** a conversão de pixel para coordenada de dados mede o retângulo do
> grid (`.recharts-cartesian-grid`) em vez de subtrair as margens do SVG. O Recharts soma a
> largura do eixo Y (60px) e a altura do eixo X (30px) *por dentro* da margem, então
> `svg - margens` dá a área errada. O `onClick` do Recharts também não serve aqui: na v3 ele
> entrega `activeIndex`/`activeCoordinate`, não o pixel do clique.

---

## Scripts

```bash
npm run dev     # desenvolvimento
npm run build   # build de produção
npm run start   # servir o build

npx eslint app components lib   # lint
npx tsc --noEmit                # typecheck
```

---

## Referências

- HAIR, J. F. et al. *Análise Multivariada de Dados*. 6. ed. Bookman, 2009.
- MONTGOMERY, D. C.; PECK, E. A.; VINING, G. G. *Introduction to Linear Regression Analysis*. 5th ed. Wiley, 2012.
- TURBAN, E.; SHARDA, R.; DELEN, D. *Decision Support and Business Intelligence Systems*. 9th ed. Pearson, 2011.
- JAMES, G. et al. *An Introduction to Statistical Learning*. Springer, 2013.
- [Scikit-learn — Linear Models](https://scikit-learn.org/stable/modules/linear_model.html)
