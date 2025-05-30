import { NextResponse } from 'next/server';
import path from 'path';
import Database from 'better-sqlite3';

// Caminho para o banco de dados
const dbPath = path.join(process.cwd(), 'data', 'users.db');

export async function POST(request: Request) {
  try {
    const { searchTerm } = await request.json();
    
    // Inicialização do banco de dados
    const db = new Database(dbPath);
    
    try {
      // ------------------------------------------------------------
      // VERSÃO SEGURA: Usando consultas parametrizadas
      // ------------------------------------------------------------
      // 1. A consulta usa placeholders (?) em vez de concatenar strings
      // 2. Aqui, usamos LIKE com placeholders, adicionando os % na variável
      // 3. Os valores são passados como parâmetros separados
      // ------------------------------------------------------------
      const query = `
        SELECT id, username, email, role 
        FROM users 
        WHERE username LIKE ? OR email LIKE ?
      `;
      
      // Preparamos os parâmetros para o LIKE, adicionando % nas variáveis
      // em vez de concatená-los diretamente na string SQL
      const likeParameter = `%${searchTerm}%`;
      
      // Log da query (não mostra valores reais, apenas placeholders)
      console.log('Query segura executada:', query);
      
      // Passamos o mesmo parâmetro duas vezes, uma para cada condição LIKE
      const users = db.prepare(query).all(likeParameter, likeParameter);
      
      // ------------------------------------------------------------
      // DIFERENÇA COM VERSÃO VULNERÁVEL:
      // 
      // Versão vulnerável:
      // const query = `SELECT * FROM users WHERE username LIKE '%${searchTerm}%' OR email LIKE '%${searchTerm}%'`;
      // 
      // Com entrada maliciosa: searchTerm = "' OR '1'='1"
      // A query se torna: SELECT * FROM users WHERE username LIKE '%' OR '1'='1%' OR email LIKE '%' OR '1'='1%'
      // A condição '1'='1' é sempre verdadeira, resultando em retornar TODOS os usuários
      // ------------------------------------------------------------
      
      return NextResponse.json({ success: true, users });
    } catch (error) {
      console.error('Erro na consulta SQL:', error);
      return NextResponse.json({ success: false, message: 'Erro ao processar a busca' }, { status: 500 });
    } finally {
      db.close();
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    return NextResponse.json({ success: false, message: 'Erro na requisição' }, { status: 400 });
  }
} 