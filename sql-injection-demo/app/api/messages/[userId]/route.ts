import { NextResponse } from 'next/server';
import path from 'path';
import Database from 'better-sqlite3';

// Caminho para o banco de dados
const dbPath = path.join(process.cwd(), 'data', 'users.db');

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  try {
    const { userId } = params;
    
    // Vulnerabilidade SQL Injection: concatenação direta de entrada do usuário
    const db = new Database(dbPath);
    
    try {
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