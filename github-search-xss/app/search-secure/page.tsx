'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GitHubRepo, GitHubSearchResponse } from '../../types/github';

export default function SearchSecurePage() {
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

      <h1 className="title">Busca de Repositórios GitHub (Versão Segura)</h1>

      <div className="card">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Digite o nome de um repositório..."
          />
          <button type="submit" className="button button-success" disabled={isLoading}>
            {isLoading ? 'Buscando...' : 'Buscar'}
          </button>
        </form>

        {error && <div className="alert alert-danger">{error}</div>}

        {/* VERSÃO SEGURA: Usamos sanitização ou evitamos dangerouslySetInnerHTML */}
        {!isLoading && !error && repositories.length > 0 && (
          <div>
            <h2>Resultados para: {query}</h2>
            <div className="results-container">
              {repositories.map((repo) => (
                <div key={repo.id} className="repo-card">
                  <h3>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                      {repo.full_name}
                    </a>
                  </h3>

                  {/* VERSÃO SEGURA: Exibição segura da descrição */}
                  {repo.description && (
                    <p>{repo.description}</p>
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
        <h2>Proteção Contra XSS</h2>
        <p>
          Esta versão está protegida contra ataques de Cross-Site Scripting (XSS)
          usando práticas seguras de manipulação de conteúdo.
        </p>

        <h3>Métodos de proteção:</h3>
        <ul>
          <li>
            <strong>Evitar dangerouslySetInnerHTML:</strong> Renderizar texto como conteúdo
            simples em vez de HTML para evitar execução de scripts.
          </li>
          <li>
            <strong>Sanitização:</strong> Quando HTML é necessário, usar bibliotecas como DOMPurify
            para remover conteúdo potencialmente perigoso.
          </li>
          <li>
            <strong>Codificação:</strong> Converter caracteres especiais em suas entidades HTML.
          </li>
          <li>
            <strong>CSP:</strong> Implementar Content Security Policy para limitar as origens de scripts.
          </li>
        </ul>

        <div className="comparison-section">
          <div className="comparison-card vulnerable-card">
            <h3>Código Vulnerável</h3>
            <div className="code-block">
              <code>&lt;span dangerouslySetInnerHTML=&#123;&#123; __html: userInput &#125;&#125; /&gt;</code>
            </div>
          </div>
          <div className="comparison-card secure-card">
            <h3>Código Seguro</h3>
            <div className="code-block">
              <code>&lt;span&gt;&#123;userInput&#125;&lt;/span&gt;</code>
              <br />
              <code>
                {/* Exemplo de uso seguro com sanitização */}
                &lt;span dangerouslySetInnerHTML=&#123;&#123; __html: sanitizedInput &#125;&#125; /&gt;
              </code>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 