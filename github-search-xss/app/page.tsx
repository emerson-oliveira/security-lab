import Link from 'next/link';

export default function Home() {
  return (
    <main className="container">
      <h1 className="title">Demonstração de XSS (Cross-Site Scripting)</h1>

      <p className="description">
        Este projeto demonstra uma vulnerabilidade de XSS em uma aplicação React/Next.js
        que permite buscar e exibir repositórios do GitHub.
      </p>

      <div className="card">
        <h2>Exemplos de Vulnerabilidades</h2>
        <p>Explore os seguintes exemplos:</p>

        <div className="button-container">
          <Link href="/search" className="button button-primary">
            Busca de Repositórios (Vulnerável a XSS)
          </Link>

          <Link href="/search-secure" className="button button-success">
            Busca de Repositórios (Versão Segura)
          </Link>
        </div>
      </div>

      <div className="card">
        <h2>O que é XSS (Cross-Site Scripting)?</h2>
        <p>
          XSS é uma vulnerabilidade de segurança que permite a um atacante injetar scripts
          maliciosos no conteúdo de um site confiável. Esses ataques ocorrem quando dados
          não confiáveis são incluídos em uma página web sem validação adequada.
        </p>

        <h3>Tipos de ataques XSS:</h3>
        <ul>
          <li><strong>Refletido:</strong> O script malicioso vem da solicitação HTTP atual</li>
          <li><strong>Armazenado:</strong> O script malicioso é armazenado no servidor</li>
          <li><strong>DOM-based:</strong> A vulnerabilidade existe no código do lado do cliente</li>
        </ul>
      </div>
    </main>
  );
} 