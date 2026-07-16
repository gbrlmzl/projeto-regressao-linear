import {
  Building2,
  Check,
  ExternalLink,
  HeartPulse,
  Megaphone,
  TrendingUp,
  Truck,
  Users,
  AlertTriangle,
} from "lucide-react";

import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { SectionWrapper } from "@/components/SectionWrapper";
import { FormulaDisplay } from "@/components/FormulaDisplay";
import { InteractiveChart } from "@/components/InteractiveChart";
import { ExampleCard } from "@/components/ExampleCard";
import { Chatbot } from "@/components/Chatbot";
import { Footer } from "@/components/Footer";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  APLICACOES,
  CONCLUSAO,
  CONTEXTO,
  DEFINICAO,
  ELEMENTOS,
  EXEMPLO_1,
  EXEMPLO_2,
  LIMITACOES,
  OBJETIVO,
  PASSOS,
  REFERENCIAS,
  VANTAGENS,
} from "@/lib/constants";
import {
  calculateMultipleRegression,
  calculateRegression,
  formatBRL,
} from "@/lib/regression";

const ICONES = { TrendingUp, Megaphone, Users, HeartPulse, Building2, Truck };

// Ajustes calculados uma vez, na renderização do servidor.
const reg1 = calculateRegression(EXEMPLO_1.dados);
const previsao1 = reg1.predict(EXEMPLO_1.investimentoAlvo);

const reg2 = calculateMultipleRegression(
  EXEMPLO_2.dados.map((d) => ({ xs: [d.area, d.quartos], y: d.preco })),
);
const [b0_2, b1_2, b2_2] = reg2.coefficients;
const previsao2 = reg2.predict([EXEMPLO_2.alvo.area, EXEMPLO_2.alvo.quartos]);

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* 1. Título do Modelo */}
        <HeroSection />

        {/* 2. Contexto do Problema */}
        <SectionWrapper
          id="contexto"
          eyebrow="Seção 02"
          title="Contexto do Problema"
          subtitle={CONTEXTO.intro}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CONTEXTO.exemplos.map((ex) => (
              <Card key={ex.titulo}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{ex.titulo}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed text-muted">
                  {ex.texto}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 rounded-xl border-l-4 border-l-accent bg-accent/5 p-5">
            <p className="leading-relaxed text-ink">
              É exatamente essa lacuna que os{" "}
              <strong className="text-primary">Sistemas de Apoio à Decisão (SAD)</strong>{" "}
              preenchem: ferramentas que combinam dados, modelos e interface para que o gestor
              decida com evidência, não com palpite. A Regressão Linear é um dos modelos
              quantitativos mais usados dentro de um SAD — porque é simples de calcular, fácil de
              explicar e produz um número que se pode levar para a reunião.
            </p>
          </div>
        </SectionWrapper>

        <Separator />

        {/* 3. Definição do Modelo */}
        <SectionWrapper
          id="definicao"
          eyebrow="Seção 03"
          title="Definição do Modelo"
          subtitle={DEFINICAO.intro}
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-1">
                <Badge variant="secondary" className="w-fit">
                  1 variável
                </Badge>
                <CardTitle className="pt-1">{DEFINICAO.simples.titulo}</CardTitle>
              </CardHeader>
              <CardContent>
                <FormulaDisplay formula={DEFINICAO.simples.formula} />
                <p className="text-sm text-muted">{DEFINICAO.simples.descricao}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-1">
                <Badge variant="secondary" className="w-fit">
                  n variáveis
                </Badge>
                <CardTitle className="pt-1">{DEFINICAO.multipla.titulo}</CardTitle>
              </CardHeader>
              <CardContent>
                <FormulaDisplay formula={DEFINICAO.multipla.formula} />
                <p className="text-sm text-muted">{DEFINICAO.multipla.descricao}</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {DEFINICAO.componentes.map((c) => (
              <Card key={c.simbolo}>
                <CardHeader className="pb-2">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xl font-bold text-secondary">{c.simbolo}</span>
                    <CardTitle className="text-base">{c.nome}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed text-muted">{c.texto}</CardContent>
              </Card>
            ))}
          </div>
        </SectionWrapper>

        <Separator />

        {/* 4. Objetivo do Modelo */}
        <SectionWrapper
          id="objetivo"
          eyebrow="Seção 04"
          title="Objetivo do Modelo"
          subtitle={OBJETIVO.intro}
        >
          <Card className="border-secondary/30">
            <CardHeader className="pb-2">
              <CardTitle>{OBJETIVO.ols.titulo}</CardTitle>
            </CardHeader>
            <CardContent>
              <FormulaDisplay
                formula={OBJETIVO.ols.formula}
                caption="Minimiza a soma dos quadrados dos resíduos — a distância vertical entre cada ponto observado e a reta."
              />
              <p className="leading-relaxed text-muted">{OBJETIVO.ols.texto}</p>
            </CardContent>
          </Card>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {OBJETIVO.usos.map((u) => (
              <Card key={u.titulo}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{u.titulo}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm leading-relaxed text-muted">{u.texto}</CardContent>
              </Card>
            ))}
          </div>

          <p className="mt-6 rounded-xl border-l-4 border-l-accent bg-accent/5 p-5 leading-relaxed text-ink">
            {OBJETIVO.sad}
          </p>
        </SectionWrapper>

        <Separator />

        {/* 5. Elementos do Modelo */}
        <SectionWrapper
          id="elementos"
          eyebrow="Seção 05"
          title="Elementos do Modelo"
          subtitle="As sete peças que compõem qualquer regressão linear — e o que cada uma informa ao gestor."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ELEMENTOS.map((el) => (
              <Card key={el.titulo} className="flex flex-col">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-2xl font-bold text-secondary">{el.simbolo}</span>
                    <Badge variant={el.variant}>{el.badge}</Badge>
                  </div>
                  <CardTitle className="pt-1 text-base">{el.titulo}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 text-sm leading-relaxed text-muted">
                  {el.texto}
                </CardContent>
              </Card>
            ))}
          </div>
        </SectionWrapper>

        <Separator />

        {/* 6. Como o Modelo Funciona */}
        <SectionWrapper
          id="funcionamento"
          eyebrow="Seção 06"
          title="Como o Modelo Funciona"
          subtitle="Da coleta de dados à decisão, em seis passos."
        >
          <ol className="relative space-y-6 border-l-2 border-border pl-8">
            {PASSOS.map((p) => (
              <li key={p.numero} className="relative">
                <span className="absolute -left-[43px] flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-sm font-bold text-white">
                  {p.numero}
                </span>
                <h3 className="font-semibold text-primary">{p.titulo}</h3>
                <p className="mt-1 leading-relaxed text-muted">{p.texto}</p>
              </li>
            ))}
          </ol>

          <div className="mt-10">
            <h3 className="text-lg font-semibold text-primary">Experimente</h3>
            <p className="mb-4 mt-1 text-sm text-muted">
              Os passos 2 a 4 na prática. Veja como a reta e o R² reagem quando os dados mudam —
              e repare no efeito de um único ponto extremo (a limitação de sensibilidade a
              outliers, na seção 8).
            </p>
            <InteractiveChart
              initialData={EXEMPLO_1.dados}
              xLabel="Investimento (R$ mil)"
              yLabel="Vendas (R$ mil)"
              xDomain={[0, 6]}
              yDomain={[0, 35]}
              interactive
            />
          </div>
        </SectionWrapper>

        <Separator />

        {/* 7. Aplicações Práticas */}
        <SectionWrapper
          id="aplicacoes"
          eyebrow="Seção 07"
          title="Aplicações Práticas"
          subtitle="Onde a Regressão Linear aparece no dia a dia das organizações."
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {APLICACOES.map((a) => {
              const Icon = ICONES[a.icone as keyof typeof ICONES];
              return (
                <Card key={a.area}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/10">
                        <Icon className="h-5 w-5 text-secondary" aria-hidden />
                      </span>
                      <CardTitle className="text-base">{a.area}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm leading-relaxed text-muted">{a.texto}</CardContent>
                </Card>
              );
            })}
          </div>
        </SectionWrapper>

        <Separator />

        {/* 8. Vantagens e Limitações */}
        <SectionWrapper
          id="vantagens"
          eyebrow="Seção 08"
          title="Vantagens e Limitações"
          subtitle="Nenhum modelo é bom em abstrato — só em relação ao problema e às premissas que ele assume."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-5">
              <h3 className="mb-4 flex items-center gap-2 font-semibold text-accent">
                <Check className="h-5 w-5" aria-hidden />
                Vantagens
              </h3>
              <ul className="space-y-4">
                {VANTAGENS.map((v) => (
                  <li key={v.titulo}>
                    <p className="text-sm font-medium text-ink">{v.titulo}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted">{v.texto}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-amber-300/50 bg-amber-50/60 p-5">
              <h3 className="mb-4 flex items-center gap-2 font-semibold text-amber-700">
                <AlertTriangle className="h-5 w-5" aria-hidden />
                Limitações
              </h3>
              <ul className="space-y-4">
                {LIMITACOES.map((l) => (
                  <li key={l.titulo}>
                    <p className="text-sm font-medium text-ink">{l.titulo}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-muted">{l.texto}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionWrapper>

        <Separator />

        {/* 9. Exemplo 1 — Previsão de Vendas */}
        <SectionWrapper
          id="exemplo-1"
          eyebrow="Seção 09 · Regressão Simples"
          title="Exemplo 1 — Previsão de Vendas"
          subtitle={EXEMPLO_1.problema}
        >
          <div className="grid gap-5 lg:grid-cols-[minmax(0,320px)_1fr]">
            <Card className="h-fit">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm uppercase tracking-wide text-muted">
                  Dados observados
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 pb-2">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Investimento (R$ mil)</TableHead>
                      <TableHead>Vendas (R$ mil)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {EXEMPLO_1.dados.map((d) => (
                      <TableRow key={d.x}>
                        <TableCell className="font-mono">{d.x.toFixed(1)}</TableCell>
                        <TableCell className="font-mono">{d.y.toFixed(1)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableCaption>n = {EXEMPLO_1.dados.length} meses de histórico.</TableCaption>
                </Table>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <ExampleCard label="Modelo">
                <FormulaDisplay
                  formula="Y(vendas) = β₀ + β₁ × X(investimento)"
                  className="my-0"
                />
              </ExampleCard>

              <ExampleCard label="Resultado" badge={`R² = ${reg1.r2.toFixed(4)}`}>
                <FormulaDisplay
                  formula={`Ŷ = ${reg1.b0.toFixed(4)} + ${reg1.b1.toFixed(4)} × X`}
                  className="my-0 mb-3"
                />
                <ul className="space-y-1.5 text-muted">
                  <li>
                    <strong className="text-primary">β₀ = {reg1.b0.toFixed(4)}</strong> — vendas
                    esperadas sem investimento algum. Aqui X = 0 está fora da faixa observada (o
                    histórico começa em 1,0), então trate esse número como ancoragem da reta, não
                    como previsão confiável.
                  </li>
                  <li>
                    <strong className="text-primary">β₁ = {reg1.b1.toFixed(4)}</strong> — cada
                    R$ 1.000 a mais em publicidade está associado a {formatBRL(reg1.b1)} a mais em
                    vendas.
                  </li>
                  <li>
                    <strong className="text-primary">R² = {reg1.r2.toFixed(4)}</strong> — o
                    investimento explica {(reg1.r2 * 100).toFixed(2)}% da variação das vendas.
                  </li>
                </ul>
              </ExampleCard>

              <ExampleCard label="Decisão" badge="Aplicação" tone="accent">
                <p>
                  Se investirmos{" "}
                  <strong className="text-primary">{formatBRL(EXEMPLO_1.investimentoAlvo)}</strong>{" "}
                  em publicidade, o modelo prevê vendas de aproximadamente{" "}
                  <strong className="text-accent">{formatBRL(previsao1)}</strong>.
                </p>
                <p className="mt-2 text-xs text-muted">
                  Note que R$ 5.000 está pouco além do maior valor observado (R$ 4.500). É uma
                  extrapolação curta e defensável — mas prever R$ 50.000 com esta mesma reta seria
                  assumir linearidade onde não há evidência nenhuma.
                </p>
              </ExampleCard>
            </div>
          </div>

          <div className="mt-6">
            <InteractiveChart
              initialData={EXEMPLO_1.dados}
              xLabel="Investimento (R$ mil)"
              yLabel="Vendas (R$ mil)"
              xDomain={[0, 6]}
              yDomain={[0, 35]}
              highlightX={EXEMPLO_1.investimentoAlvo}
            />
            <p className="mt-2 text-xs text-muted">
              Pontos verdes: dados observados. Linha azul: reta ajustada por mínimos quadrados.
              Estrela: a previsão para {formatBRL(EXEMPLO_1.investimentoAlvo)}.
            </p>
          </div>
        </SectionWrapper>

        <Separator />

        {/* 10. Exemplo 2 — Estimativa de Preço de Imóveis */}
        <SectionWrapper
          id="exemplo-2"
          eyebrow="Seção 10 · Regressão Múltipla"
          title="Exemplo 2 — Estimativa de Preço de Imóveis"
          subtitle={EXEMPLO_2.problema}
        >
          <div className="grid gap-5 lg:grid-cols-[minmax(0,380px)_1fr]">
            <Card className="h-fit">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm uppercase tracking-wide text-muted">
                  Dados observados
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 pb-2">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Área (m²)</TableHead>
                      <TableHead>Quartos</TableHead>
                      <TableHead>Preço (R$ mil)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {EXEMPLO_2.dados.map((d) => (
                      <TableRow key={`${d.area}-${d.quartos}`}>
                        <TableCell className="font-mono">{d.area}</TableCell>
                        <TableCell className="font-mono">{d.quartos}</TableCell>
                        <TableCell className="font-mono">{d.preco}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableCaption>n = {EXEMPLO_2.dados.length} imóveis.</TableCaption>
                </Table>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <ExampleCard label="Modelo">
                <FormulaDisplay
                  formula="Y(preço) = β₀ + β₁×(área) + β₂×(quartos)"
                  className="my-0"
                />
              </ExampleCard>

              <ExampleCard label="Resultado" badge={`R² = ${reg2.r2.toFixed(4)}`}>
                <FormulaDisplay
                  formula={`Ŷ = ${b0_2.toFixed(4)} + ${b1_2.toFixed(4)}×área + ${b2_2.toFixed(4)}×quartos`}
                  className="my-0 mb-3"
                />
                <ul className="space-y-1.5 text-muted">
                  <li>
                    <strong className="text-primary">β₁ = {b1_2.toFixed(4)}</strong> — cada m²
                    adicional agrega ~{formatBRL(b1_2)} ao preço,{" "}
                    <em>mantido o número de quartos constante</em>.
                  </li>
                  <li>
                    <strong className="text-primary">β₂ = {b2_2.toFixed(4)}</strong> — cada quarto
                    a mais agrega ~{formatBRL(b2_2)}, <em>mantida a área constante</em>.
                  </li>
                  <li>
                    <strong className="text-primary">β₀ = {b0_2.toFixed(4)}</strong> — negativo e
                    sem sentido físico: um imóvel de 0m² e 0 quartos não existe. É apenas a
                    ancoragem matemática do hiperplano.
                  </li>
                </ul>
              </ExampleCard>

              <ExampleCard label="Decisão" badge="Aplicação" tone="accent">
                <p>
                  Um apartamento de{" "}
                  <strong className="text-primary">{EXEMPLO_2.alvo.area}m²</strong> com{" "}
                  <strong className="text-primary">{EXEMPLO_2.alvo.quartos} quartos</strong> teria
                  preço estimado de{" "}
                  <strong className="text-accent">{formatBRL(previsao2)}</strong>.
                </p>
              </ExampleCard>

              <ExampleCard label="Alerta metodológico" badge="Multicolinearidade">
                <p className="text-muted">
                  Área e número de quartos crescem juntos nesta amostra — imóveis maiores tendem a
                  ter mais quartos. Essa correlação entre as próprias variáveis explicativas é a{" "}
                  <strong className="text-primary">multicolinearidade</strong> citada na seção 8: o
                  R² de {reg2.r2.toFixed(4)} continua alto e a previsão do conjunto continua boa,
                  mas β₁ e β₂ ficam instáveis e sua leitura individual (&quot;quanto vale um
                  quarto&quot;) perde confiabilidade. Com n = {EXEMPLO_2.dados.length}, é um
                  exemplo didático, não um laudo de avaliação.
                </p>
              </ExampleCard>
            </div>
          </div>
        </SectionWrapper>

        <Separator />

        {/* 11. Conclusão */}
        <SectionWrapper id="conclusao" eyebrow="Seção 11" title="Conclusão">
          <div className="space-y-4">
            {CONCLUSAO.paragrafos.map((p, i) => (
              <p key={i} className="leading-relaxed text-ink">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { k: "Simplicidade", v: "Solução fechada, sem calibragem." },
              { k: "Interpretabilidade", v: "Cada coeficiente tem leitura de negócio." },
              { k: "Premissas", v: "Só valem se forem verificadas." },
            ].map((item) => (
              <div key={item.k} className="rounded-xl border border-border bg-surface p-5">
                <p className="text-sm font-semibold text-primary">{item.k}</p>
                <p className="mt-1 text-sm text-muted">{item.v}</p>
              </div>
            ))}
          </div>
        </SectionWrapper>

        <Separator />

        {/* 12. Referências */}
        <SectionWrapper
          id="referencias"
          eyebrow="Seção 12"
          title="Referências"
          subtitle="Obras e documentação consultadas na elaboração deste material."
        >
          <ul className="space-y-3">
            {REFERENCIAS.map((r) => (
              <li
                key={r.texto}
                className="rounded-lg border border-border bg-surface p-4 text-sm leading-relaxed text-ink"
              >
                {r.url ? (
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-secondary underline-offset-4 hover:underline"
                  >
                    {r.texto}
                    <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  </a>
                ) : (
                  r.texto
                )}
              </li>
            ))}
          </ul>
        </SectionWrapper>
      </main>

      <Footer />
      <Chatbot />
    </>
  );
}
