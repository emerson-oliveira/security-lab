import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SQL Injection Demo',
  description: 'Aplicação de demonstração de vulnerabilidade SQL Injection',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="container">
          <header className="header">
            <div className="logo">SQL Injection Demo</div>
            <nav className="nav">
              <a href="/">Home</a>
              <a href="/login">Login</a>
              <a href="/search">Busca</a>
              <a href="/about">Sobre</a>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  )
} 