'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GitHubRepo, GitHubSearchResponse } from '../../types/github';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [repositories, setRepositories] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) {
      setError('Por favor, digite um termo de busca');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/github?q=${encodeURIComponent(query)}`);

      if (!response.ok) {
        throw new Error('Erro ao buscar repositórios');
      }

      const data: GitHubSearchResponse = await response.json();
      setRepositories(data.items);

      if (data.items.length === 0) {
        setError('Nenhum repositório encontrado');
      }
    } catch (err) {
      setError('Erro ao buscar repositórios. Tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="container search-container">
      <Link href="/" className="back-link">
        ← Voltar para a página inicial
      </Link>

      <h1 className="title">Busca de Repositórios GitHub (Vulnerável a XSS)</h1>

      <div className="card">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Digite o nome de um repositório..."
          />
          <button type="submit" className="button button-primary" disabled={isLoading}>
            {isLoading ? 'Buscando...' : 'Buscar'}
          </button>
        </form>

        {error && <div className="alert alert-danger">{error}</div>}

        {/* 
          VULNERABILIDADE DE XSS:
          O uso de dangerouslySetInnerHTML sem sanitização permite a execução de scripts maliciosos
          quando o input do usuário é renderizado diretamente no DOM.
        */}
        {!isLoading && !error && repositories.length > 0 && (
          <div>
            <h2>Resultados para: <span dangerouslySetInnerHTML={{ __html: query }} /></h2>
            <div className="results-container">
              {repositories.map((repo) => (
                <div key={repo.id} className="repo-card">
                  <h3>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                      {repo.full_name}
                    </a>
                  </h3>

                  {/* VULNERABILIDADE: Descrição renderizada sem sanitização */}
                  {repo.description && (
                    <p dangerouslySetInnerHTML={{ __html: repo.description }} />
                  )}

                  <div className="repo-stats">
                    <span>⭐ {repo.stargazers_count}</span>
                    <span>🍴 {repo.forks_count}</span>
                    {repo.language && <span>🔠 {repo.language}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="card">
        <h2>Sobre a Vulnerabilidade XSS</h2>
        <p>
          Esta página contém uma vulnerabilidade de Cross-Site Scripting (XSS) intencional
          para fins educacionais. A vulnerabilidade está no uso de <code>dangerouslySetInnerHTML</code>
          sem sanitização adequada da entrada do usuário.
        </p>

        <h3>Como explorar:</h3>
        <p>
          Tente buscar o seguinte termo para executar um script:
        </p>
        <div className="code-block">
          <code>&lt;script&gt;alert(&apos;XSS vulnerável!&apos;)&lt;/script&gt;</code>
        </div>
        <p>
          Ou este para alterar elementos da página:
        </p>
        <div className="code-block">
          <code>&lt;div style=&quot;color:red; font-size:30px&quot;&gt;Página hackeada!&lt;/div&gt;</code>
        </div>

        <div className="alert alert-warning">
          <strong>Atenção:</strong> Em um ambiente real, esta vulnerabilidade poderia permitir o roubo de cookies,
          redirecionamento para sites maliciosos, roubo de dados de formulários e outras ações prejudiciais.
        </div>
      </div>
    </main>
  );
} 