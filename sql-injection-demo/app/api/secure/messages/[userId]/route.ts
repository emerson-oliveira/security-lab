import { NextResponse } from 'next/server';
import path from 'path';
import Database from 'better-sqlite3';

// Caminho para o banco de dados
const dbPath = path.join(process.cwd(), 'data', 'users.db');

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  try {
    const { userId } = params;
    
    // Inicialização do banco de dados
    const db = new Database(dbPath);
    
    try {
      // ------------------------------------------------------------
      // VERSÃO SEGURA: Usando consultas parametrizadas
      // ------------------------------------------------------------
      // 1. A consulta usa placeholders (?) em vez de concatenar strings
      // 2. O userId é passado como parâmetro separado
      // 3. A biblioteca cuida da sanitização e escape dos valores
      // 4. Adicional: Validação de entrada para garantir que userId é um número
      // ------------------------------------------------------------
      
      // Validação adicional: garantir que userId é numérico
      // Isso é uma barreira adicional contra injeção
      if (!/^\d+$/.test(userId)) {
        return NextResponse.json(
          { success: false, message: 'ID de usuário inválido, deve ser numérico' }, 
          { status: 400 }
        );
      }
      
      const query = `
        SELECT m.id, m.subject, m.message, m.created_at,
               u1.username as from_username, u2.username as to_username
        FROM messages m
        JOIN users u1 ON m.from_user = u1.id
        JOIN users u2 ON m.to_user = u2.id
        WHERE m.to_user = ?
      `;
      
      // Log da query (não mostra valores reais, apenas placeholders)
      console.log('Query segura executada:', query);
      
      // O parâmetro é passado separadamente, não como parte da string SQL
      const messages = db.prepare(query).all(userId);
      
      // ------------------------------------------------------------
      // DIFERENÇA COM VERSÃO VULNERÁVEL:
      // 
      // Versão vulnerável:
      // const query = `SELECT m.id, ... WHERE m.to_user = ${userId}`;
      // 
      // Com entrada maliciosa: userId = "1 UNION SELECT 1, username, password, email, '2023-01-01', 'user' FROM users"
      // A query se torna: SELECT ... WHERE m.to_user = 1 UNION SELECT 1, username, password, email, '2023-01-01', 'user' FROM users
      // Isso permite ao atacante extrair informações de outra tabela junto com os resultados esperados
      // ------------------------------------------------------------
      
      return NextResponse.json({ success: true, messages });
    } catch (error) {
      console.error('Erro na consulta SQL:', error);
      return NextResponse.json({ success: false, message: 'Erro ao buscar mensagens' }, { status: 500 });
    } finally {
      db.close();
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    return NextResponse.json({ success: false, message: 'Erro na requisição' }, { status: 400 });
  }
} 