import { NextResponse } from 'next/server';
import path from 'path';
import Database from 'better-sqlite3';

// Caminho para o banco de dados
const dbPath = path.join(process.cwd(), 'data', 'users.db');

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    
    // Vulnerabilidade SQL Injection: concatenação direta de entrada do usuário
    const db = new Database(dbPath);
    
    try {
      const query = `
        SELECT id, username, email, role 
        FROM users 
        WHERE username = '${username}' AND password = '${password}'
      `;
      
      console.log('Query executada:', query);
      
      // Executar a consulta
      const user = db.prepare(query).get();
      
      if (user) {
        return NextResponse.json({ success: true, user });
      } else {
        return NextResponse.json({ success: false, message: 'Usuário ou senha inválidos' }, { status: 401 });
      }
    } catch (error) {
      console.error('Erro na consulta SQL:', error);
      return NextResponse.json({ success: false, message: 'Erro ao processar login' }, { status: 500 });
    } finally {
      db.close();
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    return NextResponse.json({ success: false, message: 'Erro na requisição' }, { status: 400 });
  }
} 