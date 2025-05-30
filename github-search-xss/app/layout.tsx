import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Demonstração de Vulnerabilidade XSS",
  description: "Aplicação educativa para demonstrar vulnerabilidades XSS em React/Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="container">
          <nav className="nav">
            <Link href="/" className="logo">XSS Demo</Link>
          </nav>
        </header>
        {children}
        <footer className="container" style={{ textAlign: 'center', marginTop: '2rem', color: '#6b7280', fontSize: '0.875rem' }}>
          <p>Projeto educacional - Apenas para fins de aprendizado</p>
        </footer>
      </body>
    </html>
  );
} 