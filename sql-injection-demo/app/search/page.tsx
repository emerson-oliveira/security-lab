'use client';

import { useState } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [isSearched, setIsSearched] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Chama a API route com vulnerabilidade SQL Injection
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchTerm }),
      });

      const data = await response.json();

      if (data.success) {
        setUsers(data.users);
        setIsSearched(true);
      } else {
        setError(data.message || 'Erro ao processar a busca');
        setUsers([]);
      }
    } catch (err) {
      console.error('Erro na busca:', err);
      setError('Ocorreu um erro ao processar a busca');
      setUsers([]);
    }
  };

  return (
    <div>
      <div className="card">
        <h1 className="title">Busca de Usuários</h1>

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            className="form-input search-input"
            placeholder="Digite um nome de usuário ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="btn">Buscar</button>
        </form>

        {error && <div className="alert alert-danger">{error}</div>}

        {isSearched && (
          <div>
            <h2 className="subtitle">Resultados da Busca:</h2>

            {users.length === 0 ? (
              <p>Nenhum usuário encontrado.</p>
            ) : (
              <table className="user-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Usuário</th>
                    <th>Email</th>
                    <th>Função</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      <div className="card code-example">
        <h3 className="subtitle">Teste SQL Injection</h3>
        <p>Tente este ataque para ver todos os usuários:</p>
        <div className="code-block">
          <p>a&apos; OR &apos;1&apos;=&apos;1</p>
        </div>
        <p>Ou tente extrair informações usando uma consulta UNION:</p>
        <div className="code-block">
          <p>&apos; UNION SELECT NULL, &apos;hacked&apos;, &apos;admin@hack.com&apos;, &apos;admin&apos; --</p>
        </div>
      </div>
    </div>
  );
} 