import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from 'sonner';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: '#6366f1',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "ResolveAI — Encontre e Ofereça Serviços Profissionais",
    template: "%s | ResolveAI"
  },
  description: "A plataforma completa para conectar prestadores de serviços a clientes de forma rápida, segura e profissional.",
  keywords: ["serviços", "prestadores", "conectar", "resolveai", "freelancer", "manutenção", "aulas"],
  authors: [{ name: "ResolveAI Team" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://resolve-ai-kohl.vercel.app", // Atualizado URL de produção
    title: "ResolveAI — Serviços de qualidade na velocidade da IA",
    description: "Conectamos você aos melhores profissionais da sua região.",
    siteName: "ResolveAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "ResolveAI",
    description: "Conectamos você aos melhores profissionais da sua região.",
  },
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-indigo-100 selection:text-indigo-900`}
      >
        {children}
        <Toaster position="bottom-right" richColors closeButton />
      </body>
    </html>
  );
}
