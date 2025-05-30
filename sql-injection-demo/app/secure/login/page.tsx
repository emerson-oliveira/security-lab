'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Chama a versão segura da API
      const response = await fetch('/api/secure/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
      } else {
        setError(data.message || 'Usuário ou senha inválidos');
      }
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      setError('Ocorreu um erro ao processar o login');
    }
  };

  return (
    <div className="login-container">
      <div className="card">
        <h1 className="title">Login (Versão Segura)</h1>

        {user ? (
          <div className="alert alert-success">
            <h2 className="subtitle">Login Bem-Sucedido!</h2>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Usuário:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Função:</strong> {user.role}</p>
            <div style={{ marginTop: '1rem' }}>
              <a href={`/secure/messages/${user.id}`} className="btn">Ver Mensagens</a>
            </div>
          </div>
        ) : (
          <>
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username" className="form-label">Nome de Usuário</label>
                <input
                  type="text"
                  id="username"
                  className="form-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Senha</label>
                <input
                  type="password"
                  id="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn">Entrar</button>
            </form>
          </>
        )}
      </div>

      <div className="card code-example">
        <h3 className="subtitle">Proteção Contra SQL Injection</h3>
        <p>Esta versão está protegida contra ataques de SQL Injection:</p>
        <div className="code-block">
          <p>Usuário: admin&apos; --</p>
          <p>Senha: qualquer_coisa</p>
        </div>
        <p>A proteção é implementada usando consultas parametrizadas (placeholders) em vez de concatenação de strings.</p>
      </div>
    </div>
  );
} 