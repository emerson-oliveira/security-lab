import path from 'path';
import Database from 'better-sqlite3';

// Caminho para o banco de dados
const dbPath = path.join(process.cwd(), 'data', 'users.db');

// Função para verificar login (vulnerável a SQL injection)
export function loginUser(username: string, password: string) {
  const db = new Database(dbPath);
  
  try {
    // Vulnerabilidade de SQL Injection: concatenação direta de entrada do usuário
    const query = `
      SELECT id, username, email, role 
      FROM users 
      WHERE username = '${username}' AND password = '${password}'
    `;
    
    console.log('Query executada:', query);
    
    // Executar a consulta
    const user = db.prepare(query).get();
    return user || null;
  } catch (error) {
    console.error('Erro na consulta SQL:', error);
    return null;
  } finally {
    db.close();
  }
}

// Função para buscar usuário (vulnerável a SQL injection)
export function searchUsers(searchTerm: string) {
  const db = new Database(dbPath);
  
  try {
    // Vulnerabilidade de SQL Injection: concatenação direta de entrada do usuário
    const query = `
      SELECT id, username, email, role 
      FROM users 
      WHERE username LIKE '%${searchTerm}%' OR email LIKE '%${searchTerm}%'
    `;
    
    console.log('Query executada:', query);
    
    // Executar a consulta
    const users = db.prepare(query).all();
    return users;
  } catch (error) {
    console.error('Erro na consulta SQL:', error);
    return [];
  } finally {
    db.close();
  }
}

// Função para buscar mensagens de um usuário (vulnerável a SQL injection)
export function getUserMessages(userId: string) {
  const db = new Database(dbPath);
  
  try {
    // Vulnerabilidade de SQL Injection: concatenação direta de entrada do usuário
    const query = `
      SELECT m.id, m.subject, m.message, m.created_at,
             u1.username as from_username, u2.username as to_username
      FROM messages m
      JOIN users u1 ON m.from_user = u1.id
      JOIN users u2 ON m.to_user = u2.id
      WHERE m.to_user = ${userId}
    `;
    
    console.log('Query executada:', query);
    
    // Executar a consulta
    const messages = db.prepare(query).all();
    return messages;
  } catch (error) {
    console.error('Erro na consulta SQL:', error);
    return [];
  } finally {
    db.close();
  }
}

// Versão segura para comparação (usando parâmetros)
export function loginUserSecure(username: string, password: string) {
  const db = new Database(dbPath);
  
  try {
    // Versão segura usando parâmetros nomeados
    const query = `
      SELECT id, username, email, role 
      FROM users 
      WHERE username = ? AND password = ?
    `;
    
    // Executar a consulta com parâmetros
    const user = db.prepare(query).get(username, password);
    return user || null;
  } catch (error) {
    console.error('Erro na consulta SQL:', error);
    return null;
  } finally {
    db.close();
  }
} 