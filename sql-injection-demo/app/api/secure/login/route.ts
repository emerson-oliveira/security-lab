import { NextResponse } from 'next/server';
import path from 'path';
import Database from 'better-sqlite3';

// Caminho para o banco de dados
const dbPath = path.join(process.cwd(), 'data', 'users.db');

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    
    // Inicialização do banco de dados
    const db = new Database(dbPath);
    
    try {
      // ------------------------------------------------------------
      // VERSÃO SEGURA: Usando consultas parametrizadas
      // ------------------------------------------------------------
      // 1. A consulta usa placeholders (?) em vez de concatenar strings
      // 2. Os valores são passados como parâmetros separados
      // 3. A biblioteca cuida da sanitização e escape dos valores
      // ------------------------------------------------------------
      const query = `
        SELECT id, username, email, role 
        FROM users 
        WHERE username = ? AND password = ?
      `;
      
      // Log da query (não mostra valores reais, apenas placeholders)
      console.log('Query segura executada:', query);
      
      // Os parâmetros são passados separadamente, não como parte da string SQL
      // Isso previne a injeção SQL, pois os valores são escapados corretamente
      const user = db.prepare(query).get(username, password);
      
      // ------------------------------------------------------------
      // DIFERENÇA COM VERSÃO VULNERÁVEL:
      // 
      // Versão vulnerável:
      // const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
      // 
      // Com entrada maliciosa: username = "admin' --"
      // A query se torna: SELECT * FROM users WHERE username = 'admin' -- AND password = 'qualquer_coisa'
      // O -- comenta o resto da consulta, permitindo login sem senha
      // ------------------------------------------------------------
      
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