export interface Point {
  x: number;
  y: number;
}

export interface SimpleRegression {
  b0: number;
  b1: number;
  r2: number;
  predict: (x: number) => number;
}

/**
 * Regressão Linear Simples por Mínimos Quadrados (OLS).
 * b1 = Σ(x - x̄)(y - ȳ) / Σ(x - x̄)²   |   b0 = ȳ - b1·x̄
 */
export function calculateRegression(data: Point[]): SimpleRegression {
  const n = data.length;
  const meanX = data.reduce((s, d) => s + d.x, 0) / n;
  const meanY = data.reduce((s, d) => s + d.y, 0) / n;

  let sxy = 0;
  let sxx = 0;
  for (const d of data) {
    sxy += (d.x - meanX) * (d.y - meanY);
    sxx += (d.x - meanX) ** 2;
  }

  // Todos os x iguais: a reta é vertical e o coeficiente angular não existe.
  const b1 = sxx === 0 ? 0 : sxy / sxx;
  const b0 = meanY - b1 * meanX;
  const predict = (x: number) => b0 + b1 * x;

  let ssRes = 0;
  let ssTot = 0;
  for (const d of data) {
    ssRes += (d.y - predict(d.x)) ** 2;
    ssTot += (d.y - meanY) ** 2;
  }
  // Sem variação em y não há o que explicar; R² é indefinido, reportamos 0.
  const r2 = ssTot === 0 ? 0 : 1 - ssRes / ssTot;

  return { b0, b1, r2, predict };
}

export interface MultipleRegression {
  coefficients: number[]; // [b0, b1, b2, ...]
  r2: number;
  predict: (xs: number[]) => number;
}

/**
 * Regressão Linear Múltipla por Mínimos Quadrados.
 * Resolve as equações normais (XᵀX)β = Xᵀy via eliminação de Gauss-Jordan
 * com pivoteamento parcial.
 */
export function calculateMultipleRegression(
  rows: { xs: number[]; y: number }[],
): MultipleRegression {
  const n = rows.length;
  const k = rows[0].xs.length + 1; // +1 para o intercepto

  // Matriz de design X, com a coluna de 1s do intercepto na frente.
  const X = rows.map((r) => [1, ...r.xs]);
  const y = rows.map((r) => r.y);

  // Matriz aumentada [XᵀX | Xᵀy]
  const aug: number[][] = Array.from({ length: k }, () => new Array(k + 1).fill(0));
  for (let i = 0; i < k; i++) {
    for (let j = 0; j < k; j++) {
      let sum = 0;
      for (let r = 0; r < n; r++) sum += X[r][i] * X[r][j];
      aug[i][j] = sum;
    }
    let sum = 0;
    for (let r = 0; r < n; r++) sum += X[r][i] * y[r];
    aug[i][k] = sum;
  }

  // Gauss-Jordan com pivoteamento parcial.
  for (let col = 0; col < k; col++) {
    let pivot = col;
    for (let r = col + 1; r < k; r++) {
      if (Math.abs(aug[r][col]) > Math.abs(aug[pivot][col])) pivot = r;
    }
    [aug[col], aug[pivot]] = [aug[pivot], aug[col]];

    const pv = aug[col][col];
    // Pivô nulo indica multicolinearidade perfeita — o sistema não tem solução única.
    if (Math.abs(pv) < 1e-12) continue;

    for (let j = col; j <= k; j++) aug[col][j] /= pv;
    for (let r = 0; r < k; r++) {
      if (r === col) continue;
      const factor = aug[r][col];
      for (let j = col; j <= k; j++) aug[r][j] -= factor * aug[col][j];
    }
  }

  const coefficients = aug.map((row) => row[k]);
  const predict = (xs: number[]) =>
    coefficients[0] + xs.reduce((s, x, i) => s + coefficients[i + 1] * x, 0);

  const meanY = y.reduce((s, v) => s + v, 0) / n;
  let ssRes = 0;
  let ssTot = 0;
  rows.forEach((r) => {
    ssRes += (r.y - predict(r.xs)) ** 2;
    ssTot += (r.y - meanY) ** 2;
  });
  const r2 = ssTot === 0 ? 0 : 1 - ssRes / ssTot;

  return { coefficients, r2, predict };
}

export function formatBRL(valueInThousands: number): string {
  return (valueInThousands * 1000).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}
