import { NextResponse } from 'next/server';
import path from 'path';
import Database from 'better-sqlite3';

// Caminho para o banco de dados
const dbPath = path.join(process.cwd(), 'data', 'users.db');

export async function POST(request: Request) {
  try {
    const { searchTerm } = await request.json();
    
    // Vulnerabilidade SQL Injection: concatenação direta de entrada do usuário
    const db = new Database(dbPath);
    
    try {
      const query = `
        SELECT id, username, email, role 
        FROM users 
        WHERE username LIKE '%${searchTerm}%' OR email LIKE '%${searchTerm}%'
      `;
      
      console.log('Query executada:', query);
      
      // Executar a consulta
      const users = db.prepare(query).all();
      
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