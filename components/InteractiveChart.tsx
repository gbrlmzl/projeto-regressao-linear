"use client";

import { useMemo, useRef, useState } from "react";
import {
  CartesianGrid,
  ComposedChart,
  Label,
  Line,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { RotateCcw } from "lucide-react";
import { calculateRegression, type Point } from "@/lib/regression";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MARGIN = { top: 16, right: 24, bottom: 48, left: 56 };
const HEIGHT = 380;
/** Raio, em pixels, para considerar que o clique acertou um ponto existente. */
const HIT_RADIUS = 12;

interface InteractiveChartProps {
  initialData: Point[];
  xLabel?: string;
  yLabel?: string;
  xDomain?: [number, number];
  yDomain?: [number, number];
  interactive?: boolean;
  /** Marca uma previsão específica no gráfico (ex.: o alvo de decisão do exemplo). */
  highlightX?: number;
}

export function InteractiveChart({
  initialData,
  xLabel = "X",
  yLabel = "Y",
  xDomain = [0, 6],
  yDomain = [0, 35],
  interactive = false,
  highlightX,
}: InteractiveChartProps) {
  const [points, setPoints] = useState<Point[]>(initialData);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Menos de 2 pontos não define uma reta.
  const reg = useMemo(
    () => (points.length >= 2 ? calculateRegression(points) : null),
    [points],
  );

  const lineData = useMemo(() => {
    if (!reg) return [];
    return [
      { x: xDomain[0], yHat: reg.predict(xDomain[0]) },
      { x: xDomain[1], yHat: reg.predict(xDomain[1]) },
    ];
  }, [reg, xDomain]);

  const highlight = useMemo(() => {
    if (!reg || highlightX === undefined) return null;
    return [{ x: highlightX, y: reg.predict(highlightX) }];
  }, [reg, highlightX]);

  // O onClick do Recharts entrega índice/coordenada do tooltip, não o pixel do
  // clique (MouseHandlerDataParam não tem chartX/chartY), então lemos o evento
  // nativo e convertemos aqui.
  //
  // A área de plotagem NÃO é (svg - margens): o Recharts ainda soma a largura
  // do eixo Y e a altura do eixo X por dentro da margem. Medir o grid é o único
  // jeito confiável — ele ocupa exatamente a área de plotagem.
  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!interactive) return;

    const grid = wrapperRef.current?.querySelector(".recharts-cartesian-grid");
    if (!grid) return;
    const plot = grid.getBoundingClientRect();
    if (plot.width === 0 || plot.height === 0) return;

    const px = e.clientX - plot.left;
    const py = e.clientY - plot.top;
    if (px < 0 || px > plot.width || py < 0 || py > plot.height) return;

    const x = xDomain[0] + (px / plot.width) * (xDomain[1] - xDomain[0]);
    const y = yDomain[1] - (py / plot.height) * (yDomain[1] - yDomain[0]);

    // Clique em cima de um ponto existente remove; caso contrário, adiciona.
    const hit = points.find((p) => {
      const ppx = ((p.x - xDomain[0]) / (xDomain[1] - xDomain[0])) * plot.width;
      const ppy = ((yDomain[1] - p.y) / (yDomain[1] - yDomain[0])) * plot.height;
      return Math.hypot(ppx - px, ppy - py) <= HIT_RADIUS;
    });

    if (hit) {
      setPoints((prev) => prev.filter((p) => p !== hit));
    } else {
      setPoints((prev) => [...prev, { x: Number(x.toFixed(2)), y: Number(y.toFixed(2)) }]);
    }
  }

  return (
    <div>
      {interactive && (
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted">
            Clique no gráfico para adicionar um ponto; clique num ponto verde para removê-lo.
            A reta se reajusta a cada mudança.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPoints(initialData)}
            disabled={points === initialData}
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Restaurar
          </Button>
        </div>
      )}

      <div
        ref={wrapperRef}
        className="rounded-lg border border-border bg-surface p-2"
        style={{ height: HEIGHT }}
        onClick={handleClick}
      >
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            margin={MARGIN}
            style={{ cursor: interactive ? "crosshair" : "default" }}
          >
            <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 3" />
            <XAxis
              type="number"
              dataKey="x"
              domain={xDomain}
              allowDataOverflow
              tick={{ fontSize: 12, fill: "#64748B" }}
              stroke="#94A3B8"
            >
              <Label value={xLabel} position="insideBottom" offset={-16} fill="#64748B" fontSize={12} />
            </XAxis>
            <YAxis
              type="number"
              dataKey="y"
              domain={yDomain}
              allowDataOverflow
              tick={{ fontSize: 12, fill: "#64748B" }}
              stroke="#94A3B8"
            >
              <Label
                value={yLabel}
                angle={-90}
                position="insideLeft"
                offset={-4}
                style={{ textAnchor: "middle" }}
                fill="#64748B"
                fontSize={12}
              />
            </YAxis>
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #E2E8F0",
                fontSize: 12,
              }}
              formatter={(value: unknown, name: unknown) =>
                [
                  Number(value).toFixed(2),
                  name === "yHat" ? "Previsto (Ŷ)" : name === "y" ? "Observado" : String(name),
                ] as [string, string]
              }
              labelFormatter={(label: unknown) => `${xLabel}: ${Number(label).toFixed(2)}`}
            />

            <Line
              data={lineData}
              dataKey="yHat"
              stroke="#3B82F6"
              strokeWidth={2.5}
              dot={false}
              activeDot={false}
              isAnimationActive={false}
              legendType="none"
              name="yHat"
            />
            <Scatter
              data={points}
              dataKey="y"
              fill="#10B981"
              name="y"
              isAnimationActive={false}
            />
            {highlight && (
              <Scatter
                data={highlight}
                dataKey="y"
                fill="#1E3A5F"
                shape="star"
                name="Previsão"
                isAnimationActive={false}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        {reg ? (
          <>
            <code className="font-mono text-primary">
              Ŷ = {reg.b0.toFixed(4)} {reg.b1 >= 0 ? "+" : "−"} {Math.abs(reg.b1).toFixed(4)}·X
            </code>
            <Badge variant="accent">R² = {reg.r2.toFixed(4)}</Badge>
            <span className="text-xs text-muted">n = {points.length}</span>
          </>
        ) : (
          <span className="text-sm text-muted">
            Adicione ao menos 2 pontos para ajustar uma reta.
          </span>
        )}
      </div>
    </div>
  );
}
