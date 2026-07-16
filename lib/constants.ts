import type { Point } from "./regression";

export const SECTIONS = [
  { id: "inicio", label: "Início" },
  { id: "contexto", label: "Contexto" },
  { id: "definicao", label: "Definição" },
  { id: "objetivo", label: "Objetivo" },
  { id: "elementos", label: "Elementos" },
  { id: "funcionamento", label: "Como Funciona" },
  { id: "aplicacoes", label: "Aplicações" },
  { id: "vantagens", label: "Vantagens e Limitações" },
  { id: "exemplo-1", label: "Exemplo 1" },
  { id: "exemplo-2", label: "Exemplo 2" },
  { id: "conclusao", label: "Conclusão" },
  { id: "referencias", label: "Referências" },
] as const;

// 1. Hero
export const HERO = {
  title: "Regressão Linear",
  subtitle: "Um modelo matemático para apoio à decisão baseado em dados",
  tagline:
    "Transforma dados históricos em previsões acionáveis, medindo o quanto cada fator influencia o resultado que você quer explicar.",
};

// 2. Contexto do Problema
export const CONTEXTO = {
  intro:
    "Toda decisão de gestão é, no fundo, uma aposta sobre o futuro. Quanto vamos vender no próximo trimestre? Quanto custará produzir mais mil unidades? Vale a pena dobrar o investimento em publicidade? A intuição de um gestor experiente acerta com frequência — mas ela não escala, não se explica e não se audita.",
  exemplos: [
    {
      titulo: "Prever vendas",
      texto:
        "Quanto o faturamento responde a cada real investido em marketing? Sem um modelo, o orçamento vira disputa política em vez de decisão informada.",
    },
    {
      titulo: "Estimar custos",
      texto:
        "O custo unitário cai conforme o volume cresce, mas em que ritmo? A resposta define o preço mínimo viável.",
    },
    {
      titulo: "Projetar demanda",
      texto:
        "Estoque parado custa capital; falta de estoque custa venda. A projeção define onde fica o ponto de equilíbrio.",
    },
  ],
  sad: "É exatamente essa lacuna que os **Sistemas de Apoio à Decisão (SAD)** preenchem: ferramentas que combinam dados, modelos e interface para que o gestor decida com evidência, não com palpite. A Regressão Linear é um dos modelos quantitativos mais usados dentro de um SAD — porque é simples de calcular, fácil de explicar e produz um número que se pode levar para a reunião.",
};

// 3. Definição do Modelo
export const DEFINICAO = {
  intro:
    "A Regressão Linear é uma técnica estatística que modela a relação entre uma variável dependente (Y) — aquilo que se quer prever — e uma ou mais variáveis independentes (X) — os fatores que ajudam a explicá-la. O modelo assume que essa relação pode ser aproximada por uma reta (ou, com várias variáveis, por um hiperplano).",
  simples: {
    titulo: "Regressão Linear Simples",
    formula: "Y = β₀ + β₁X + ε",
    descricao: "Uma única variável explicativa. Geometricamente, uma reta no plano.",
  },
  multipla: {
    titulo: "Regressão Linear Múltipla",
    formula: "Y = β₀ + β₁X₁ + β₂X₂ + ... + βₙXₙ + ε",
    descricao:
      "Várias variáveis explicativas simultâneas. Geometricamente, um hiperplano em n dimensões.",
  },
  componentes: [
    {
      simbolo: "β₀",
      nome: "Intercepto",
      texto:
        "O valor esperado de Y quando todas as variáveis X são zero. É onde a reta cruza o eixo vertical. Nem sempre tem interpretação prática — se X = 0 for impossível no contexto, β₀ é apenas um ponto de ancoragem da reta.",
    },
    {
      simbolo: "β₁...βₙ",
      nome: "Coeficientes angulares",
      texto:
        "Quanto Y varia, em média, quando aquele X aumenta em uma unidade e os demais permanecem constantes. É a leitura que interessa ao gestor: o peso de cada fator.",
    },
    {
      simbolo: "ε",
      nome: "Erro aleatório",
      texto:
        "Tudo que influencia Y e não está no modelo — fatores omitidos, ruído de medição, acaso. Assume-se média zero: o modelo não erra sistematicamente para cima nem para baixo.",
    },
  ],
};

// 4. Objetivo do Modelo
export const OBJETIVO = {
  intro:
    "O objetivo é encontrar a reta que melhor se ajusta aos dados observados. Mas 'melhor' precisa de uma definição matemática — e é aí que entra o Método dos Mínimos Quadrados.",
  ols: {
    titulo: "Método dos Mínimos Quadrados (OLS)",
    formula: "min Σ(Yᵢ - Ŷᵢ)²",
    texto:
      "Entre todas as infinitas retas possíveis, escolhemos aquela que minimiza a soma dos quadrados dos resíduos — as distâncias verticais entre cada ponto observado e a reta. Elevamos ao quadrado por dois motivos: para que erros positivos e negativos não se cancelem, e para penalizar mais os erros grandes que os pequenos.",
  },
  usos: [
    {
      titulo: "Previsão",
      texto:
        "Dado um novo valor de X, estimar o Y correspondente. É o uso mais direto: 'se investirmos tanto, esperamos vender quanto?'",
    },
    {
      titulo: "Inferência",
      texto:
        "Entender a relação em si — se ela existe, qual a direção, qual a intensidade e se é estatisticamente confiável.",
    },
  ],
  sad: "No contexto de um SAD, esse é o salto que importa: dados históricos, que só descrevem o passado, viram projeções que orientam decisões futuras.",
};

// 5. Elementos do Modelo
export const ELEMENTOS = [
  {
    simbolo: "Y",
    titulo: "Variável Dependente",
    badge: "O que se quer prever",
    variant: "default" as const,
    texto:
      "O resultado que se quer explicar ou prever: vendas, preço, demanda, produtividade. Também chamada de variável resposta ou explicada.",
  },
  {
    simbolo: "X",
    titulo: "Variável Independente",
    badge: "Preditor",
    variant: "secondary" as const,
    texto:
      "Os fatores usados para explicar Y: investimento, área, tempo, dose. Também chamadas de variáveis explicativas, preditoras ou regressoras.",
  },
  {
    simbolo: "β",
    titulo: "Coeficientes",
    badge: "Peso de cada fator",
    variant: "secondary" as const,
    texto:
      "Medem a influência de cada variável independente sobre Y. O sinal indica a direção da relação; a magnitude, a intensidade.",
  },
  {
    simbolo: "β₀",
    titulo: "Intercepto",
    badge: "Ponto de partida",
    variant: "outline" as const,
    texto:
      "Valor esperado de Y quando todos os X são zero. Define a altura da reta; sua interpretação prática depende de X = 0 fazer sentido no problema.",
  },
  {
    simbolo: "ε",
    titulo: "Resíduos",
    badge: "O que sobra",
    variant: "outline" as const,
    texto:
      "Diferença entre o valor observado e o previsto (Y - Ŷ). Analisar os resíduos é a principal forma de verificar se as premissas do modelo se sustentam.",
  },
  {
    simbolo: "R²",
    titulo: "Coeficiente de Determinação",
    badge: "Qualidade do ajuste",
    variant: "accent" as const,
    texto:
      "Proporção da variação de Y explicada pelo modelo, de 0 a 1. R² = 0,85 significa que 85% da variação foi capturada. Atenção: R² alto não prova causalidade nem garante que o modelo preveja bem fora da amostra.",
  },
  {
    simbolo: "p",
    titulo: "p-valor",
    badge: "Significância estatística",
    variant: "accent" as const,
    texto:
      "Probabilidade de observar um coeficiente como o estimado se a variável de fato não tivesse efeito algum. Por convenção, p < 0,05 indica que o efeito dificilmente é fruto do acaso.",
  },
];

// 6. Como o Modelo Funciona
export const PASSOS = [
  {
    numero: 1,
    titulo: "Coleta de Dados",
    texto:
      "Reunir observações históricas pareadas das variáveis. A qualidade do modelo é limitada pela qualidade dos dados — dados enviesados produzem previsões enviesadas, por melhor que seja a matemática.",
  },
  {
    numero: 2,
    titulo: "Análise Exploratória",
    texto:
      "Plotar o diagrama de dispersão e olhar. A relação parece linear? Há outliers evidentes? Esse passo, aparentemente banal, evita ajustar uma reta a algo que claramente não é uma reta.",
  },
  {
    numero: 3,
    titulo: "Estimação dos Parâmetros",
    texto:
      "Calcular β₀ e β₁ pelo Método dos Mínimos Quadrados. Existe fórmula fechada — não é um processo iterativo, é aritmética direta sobre médias e somas de produtos.",
  },
  {
    numero: 4,
    titulo: "Avaliação do Modelo",
    texto:
      "Verificar R², analisar os resíduos e conferir os p-valores dos coeficientes. É aqui que se decide se o modelo merece confiança — pular esta etapa é a origem da maioria dos usos incorretos.",
  },
  {
    numero: 5,
    titulo: "Previsão",
    texto:
      "Aplicar a equação a novos valores de X. Cuidado com extrapolação: prever muito além da faixa observada é assumir que a relação continua linear onde não há evidência disso.",
  },
  {
    numero: 6,
    titulo: "Decisão",
    texto:
      "Traduzir o número em ação no contexto do problema. O modelo informa a decisão; ele não a toma. Julgamento, restrições e custos continuam sendo do gestor.",
  },
];

// 7. Aplicações Práticas
export const APLICACOES = [
  {
    icone: "TrendingUp",
    area: "Finanças",
    texto:
      "Previsão de receita, precificação de ativos e modelos de risco. O beta do CAPM é, literalmente, o coeficiente de uma regressão linear.",
  },
  {
    icone: "Megaphone",
    area: "Marketing",
    texto:
      "Estimar o ROI de campanhas e prever vendas em função do gasto em anúncios — a base de qualquer decisão de alocação de mídia.",
  },
  {
    icone: "Users",
    area: "Recursos Humanos",
    texto:
      "Relacionar horas de treinamento com produtividade, ou remuneração com retenção, para justificar investimento em pessoas.",
  },
  {
    icone: "HeartPulse",
    area: "Saúde",
    texto:
      "Modelar a relação dose-resposta de medicamentos e identificar fatores de risco associados a desfechos clínicos.",
  },
  {
    icone: "Building2",
    area: "Imobiliário",
    texto:
      "Estimar preço de imóveis a partir de área, número de quartos e localização — a aplicação clássica de regressão múltipla.",
  },
  {
    icone: "Truck",
    area: "Logística",
    texto:
      "Prever demanda para planejamento de estoque, dimensionar frota e antecipar sazonalidade na cadeia de suprimentos.",
  },
];

// 8. Vantagens e Limitações
export const VANTAGENS = [
  {
    titulo: "Simples de implementar e interpretar",
    texto: "Solução analítica fechada, sem hiperparâmetros para calibrar nem treino iterativo.",
  },
  {
    titulo: "Comunicável a stakeholders",
    texto:
      "'Cada R$ 1.000 em anúncios traz R$ 4.845 em vendas' é uma frase que qualquer diretoria entende — e essa clareza é o que faz o modelo virar decisão.",
  },
  {
    titulo: "Base para modelos mais complexos",
    texto:
      "Regressão logística, séries temporais e redes neurais partem, conceitualmente, da combinação linear de variáveis.",
  },
  {
    titulo: "Excelente quando a relação é de fato linear",
    texto:
      "Nesses casos é difícil superá-la: mais dados não trazem ganho relevante e modelos sofisticados apenas adicionam opacidade.",
  },
  {
    titulo: "Suporte universal em ferramentas",
    texto: "Excel, Python (scikit-learn, statsmodels), R, SPSS, Power BI — está em todo lugar.",
  },
];

export const LIMITACOES = [
  {
    titulo: "Assume relação linear",
    texto:
      "Se a relação real for curva, exponencial ou em patamares, a reta erra de forma sistemática — e o R² não necessariamente denuncia isso.",
  },
  {
    titulo: "Sensível a outliers",
    texto:
      "Como o método eleva os erros ao quadrado, um único ponto extremo pode puxar a reta inteira e distorcer todas as previsões.",
  },
  {
    titulo: "Não captura relações não-lineares",
    texto:
      "Interações e efeitos de saturação precisam ser inseridos manualmente como novas variáveis; o modelo não os descobre sozinho.",
  },
  {
    titulo: "Premissas sobre os resíduos",
    texto:
      "Exige independência, variância constante (homocedasticidade) e distribuição aproximadamente normal. Violações invalidam os p-valores e os intervalos de confiança.",
  },
  {
    titulo: "Multicolinearidade na regressão múltipla",
    texto:
      "Quando duas variáveis explicativas são muito correlacionadas entre si, os coeficientes ficam instáveis e sua interpretação individual perde sentido — embora a previsão como um todo possa continuar boa.",
  },
];

// 9. Exemplo 1 — Previsão de Vendas
export const EXEMPLO_1 = {
  problema:
    "Uma loja quer prever suas vendas mensais com base no quanto investe em publicidade. Ela tem oito meses de histórico e precisa decidir o orçamento do próximo mês.",
  dados: [
    { x: 1.0, y: 10.5 },
    { x: 1.5, y: 13.2 },
    { x: 2.0, y: 15.8 },
    { x: 2.5, y: 17.1 },
    { x: 3.0, y: 20.4 },
    { x: 3.5, y: 22.0 },
    { x: 4.0, y: 25.3 },
    { x: 4.5, y: 27.8 },
  ] as Point[],
  investimentoAlvo: 5.0,
};

// 10. Exemplo 2 — Estimativa de Preço de Imóveis
export const EXEMPLO_2 = {
  problema:
    "Uma imobiliária quer estimar o preço de venda de apartamentos a partir da área útil e do número de quartos, para precificar novos imóveis na carteira com consistência.",
  dados: [
    { area: 45, quartos: 1, preco: 180 },
    { area: 55, quartos: 2, preco: 230 },
    { area: 60, quartos: 2, preco: 260 },
    { area: 70, quartos: 3, preco: 310 },
    { area: 80, quartos: 3, preco: 350 },
    { area: 90, quartos: 3, preco: 400 },
    { area: 100, quartos: 4, preco: 450 },
    { area: 120, quartos: 4, preco: 520 },
    { area: 75, quartos: 2, preco: 290 },
    { area: 110, quartos: 4, preco: 480 },
  ],
  alvo: { area: 80, quartos: 3 },
};

// 11. Conclusão
export const CONCLUSAO = {
  paragrafos: [
    "A Regressão Linear é uma das ferramentas mais antigas da estatística aplicada e continua sendo uma das mais usadas em apoio à decisão. Não porque seja a mais poderosa — não é —, mas porque acerta o equilíbrio entre capacidade preditiva e clareza.",
    "Sua maior força é a interpretabilidade. Um modelo de aprendizado de máquina pode prever melhor e ainda assim ser inútil numa reunião de diretoria, onde a pergunta não é apenas *quanto*, mas *por quê*. A regressão responde às duas: entrega a previsão e, junto, o peso de cada fator que a produziu.",
    "Isso vem com uma contrapartida: as premissas precisam ser verificadas antes que o resultado mereça confiança. Linearidade, independência e comportamento dos resíduos não são formalidade acadêmica — são as condições sob as quais os números significam o que aparentam significar. Um R² de 0,99 sobre premissas violadas é confiança mal colocada, não evidência.",
    "É essa combinação que faz da Regressão Linear um modelo exemplar de SAD: ela transforma dado bruto em informação acionável, preservando a cadeia de raciocínio que permite ao gestor questionar, ajustar e, no fim, assumir a responsabilidade pela decisão.",
  ],
};

// 12. Referências
export const REFERENCIAS = [
  {
    texto:
      "HAIR, J. F. et al. Análise Multivariada de Dados. 6. ed. Porto Alegre: Bookman, 2009.",
  },
  {
    texto:
      "MONTGOMERY, D. C.; PECK, E. A.; VINING, G. G. Introduction to Linear Regression Analysis. 5th ed. Hoboken: Wiley, 2012.",
  },
  {
    texto:
      "TURBAN, E.; SHARDA, R.; DELEN, D. Decision Support and Business Intelligence Systems. 9th ed. Upper Saddle River: Pearson, 2011.",
  },
  {
    texto:
      "JAMES, G. et al. An Introduction to Statistical Learning. New York: Springer, 2013.",
  },
  {
    texto: "Scikit-learn Documentation: Linear Models.",
    url: "https://scikit-learn.org/stable/modules/linear_model.html",
  },
];
