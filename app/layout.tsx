import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Regressão Linear — Modelo de Apoio à Decisão",
  description:
    "SPA educacional sobre Regressão Linear como modelo matemático de apoio à decisão baseado em dados. Disciplina de Sistemas de Apoio à Gestão.",
  keywords: [
    "regressão linear",
    "mínimos quadrados",
    "sistemas de apoio à decisão",
    "SAD",
    "estatística",
    "análise preditiva",
  ],
  openGraph: {
    title: "Regressão Linear — Modelo de Apoio à Decisão",
    description:
      "Um modelo matemático para apoio à decisão baseado em dados, explicado do contexto à aplicação prática.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
