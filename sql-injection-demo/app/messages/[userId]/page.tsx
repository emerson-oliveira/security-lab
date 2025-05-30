'use client';

import { useState, useEffect } from 'react';

interface Message {
  id: number;
  subject: string;
  message: string;
  created_at: string;
  from_username: string;
  to_username: string;
}

export default function MessagesPage({ params }: { params: { userId: string } }) {
  const { userId } = params;
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Chama a API route com vulnerabilidade SQL Injection
        const response = await fetch(`/api/messages/${userId}`);
        const data = await response.json();

        if (data.success) {
          setMessages(data.messages);
        } else {
          setError(data.message || 'Erro ao buscar mensagens');
        }
      } catch (err) {
        console.error('Erro ao buscar mensagens:', err);
        setError('Ocorreu um erro ao buscar as mensagens');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [userId]);

  return (
    <div>
      <div className="card">
        <h1 className="title">Mensagens do Usuário</h1>

        {loading ? (
          <p>Carregando mensagens...</p>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : messages.length === 0 ? (
          <p>Nenhuma mensagem encontrada.</p>
        ) : (
          <ul className="message-list">
            {messages.map((message) => (
              <li key={message.id} className="message-item">
                <div className="message-header">
                  <span>De: <strong>{message.from_username}</strong></span>
                  <span>Para: <strong>{message.to_username}</strong></span>
                  <span>Data: {new Date(message.created_at).toLocaleDateString()}</span>
                </div>
                <h3 className="message-subject">{message.subject}</h3>
                <p className="message-body">{message.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card code-example">
        <h3 className="subtitle">Teste SQL Injection</h3>
        <p>Tente modificar o parâmetro userId na URL para obter dados sensíveis:</p>
        <div className="code-block">
          <p>1 UNION SELECT 1, username, password, email, &apos;2023-01-01&apos;, &apos;hacked&apos; FROM users</p>
        </div>
        <p>Isso irá expor senhas e outros dados confidenciais dos usuários!</p>
      </div>
    </div>
  );
} 