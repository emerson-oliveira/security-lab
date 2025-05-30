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
        // Validação do ID no cliente
        if (!/^\d+$/.test(userId)) {
          setError('ID de usuário inválido, deve ser numérico');
          setLoading(false);
          return;
        }

        // Chama a versão segura da API
        const response = await fetch(`/api/secure/messages/${userId}`);
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
        <h1 className="title">Mensagens do Usuário (Versão Segura)</h1>

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
        <h3 className="subtitle">Proteção Contra SQL Injection</h3>
        <p>Esta versão está protegida contra ataques de SQL Injection em parâmetros de URL:</p>
        <div className="code-block">
          <p>1 UNION SELECT ...</p>
        </div>
        <p>A proteção é implementada usando:</p>
        <ul>
          <li>Validação de entrada tanto no cliente quanto no servidor</li>
          <li>Consultas parametrizadas (placeholders) em vez de concatenação de strings</li>
          <li>Verificação de tipo de dados (numérico) para userId</li>
        </ul>
      </div>
    </div>
  );
} 