import path from 'path';
import Database from 'better-sqlite3';

// Caminho para o banco de dados
const dbPath = path.join(process.cwd(), 'data', 'users.db');

// Função de login segura usando consultas parametrizadas
export function loginUserSecure(username: string, password: string) {
  const db = new Database(dbPath);
  
  try {
    // Versão SEGURA com placeholders para evitar SQL Injection
    const query = `
      SELECT id, username, email, role 
      FROM users 
      WHERE username = ? AND password = ?
    `;
    
    console.log('Query segura executada:', query);
    
    // Os parâmetros são passados separadamente, não concatenados na string SQL
    const user = db.prepare(query).get(username, password);
    return user || null;
  } catch (error) {
    console.error('Erro na consulta SQL:', error);
    return null;
  } finally {
    db.close();
  }
}

// Função de busca segura usando consultas parametrizadas
export function searchUsersSecure(searchTerm: string) {
  const db = new Database(dbPath);
  
  try {
    // Versão SEGURA com placeholders para evitar SQL Injection
    const query = `
      SELECT id, username, email, role 
      FROM users 
      WHERE username LIKE ? OR email LIKE ?
    `;
    
    // Preparamos o parâmetro com wildcards para o LIKE
    const likeParam = `%${searchTerm}%`;
    
    console.log('Query segura executada:', query);
    
    // Passamos o mesmo parâmetro duas vezes, um para cada condição LIKE
    const users = db.prepare(query).all(likeParam, likeParam);
    return users || [];
  } catch (error) {
    console.error('Erro na consulta SQL:', error);
    return [];
  } finally {
    db.close();
  }
}

// Função de busca de mensagens segura usando consultas parametrizadas
export function getUserMessagesSecure(userId: string) {
  // Validação adicional para garantir que userId é numérico
  if (!/^\d+$/.test(userId)) {
    console.error('ID de usuário inválido, deve ser numérico');
    return [];
  }
  
  const db = new Database(dbPath);
  
  try {
    // Versão SEGURA com placeholders para evitar SQL Injection
    const query = `
      SELECT m.id, m.subject, m.message, m.created_at,
             u1.username as from_username, u2.username as to_username
      FROM messages m
      JOIN users u1 ON m.from_user = u1.id
      JOIN users u2 ON m.to_user = u2.id
      WHERE m.to_user = ?
    `;
    
    console.log('Query segura executada:', query);
    
    // O parâmetro é passado separadamente, não concatenado na string SQL
    const messages = db.prepare(query).all(userId);
    return messages || [];
  } catch (error) {
    console.error('Erro na consulta SQL:', error);
    return [];
  } finally {
    db.close();
  }
}

// Funções auxiliares de segurança

// Sanitiza entrada de texto para evitar ataques de injeção
export function sanitizeInput(input: string): string {
  // Remove caracteres potencialmente perigosos
  return input.replace(/[\\'";\-\/]/g, '');
}

// Valida se uma entrada é numérica
export function isNumeric(input: string): boolean {
  return /^\d+$/.test(input);
}

// Exemplo de implementação com validação de entrada e resposta genérica
// (útil para não revelar detalhes específicos de erros)
export function secureQueryWithErrorHandling<T>(
  query: string, 
  params: any[] = [], 
  defaultReturn: T
): T {
  const db = new Database(dbPath);
  
  try {
    const result = db.prepare(query).all(...params);
    return (result as unknown) as T;
  } catch (error) {
    // Log do erro real para o servidor, mas não expõe detalhes ao cliente
    console.error('Erro na execução da consulta SQL:', error);
    
    // Retorna um valor padrão em vez de falhar com erro detalhado
    return defaultReturn;
  } finally {
    db.close();
  }
} 