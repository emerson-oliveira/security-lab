/**
 * Script para criar e popular o banco de dados SQLite para a demonstração de SQL Injection
 */

const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

// Criar diretório para o banco de dados se não existir
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Caminho para o arquivo do banco de dados
const dbPath = path.join(dataDir, 'users.db');

// Remover banco de dados existente se houver
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
}

// Criar nova conexão com o banco de dados
const db = new Database(dbPath);

// Habilitar chaves estrangeiras
db.pragma('foreign_keys = ON');

// Criar tabela de usuários
db.exec(`
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`);

// Criar tabela de mensagens
db.exec(`
CREATE TABLE messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  from_user INTEGER NOT NULL,
  to_user INTEGER NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (from_user) REFERENCES users(id),
  FOREIGN KEY (to_user) REFERENCES users(id)
);
`);

// Inserir usuários iniciais
const insertUser = db.prepare(`
INSERT INTO users (username, password, email, role)
VALUES (?, ?, ?, ?);
`);

// Usuários de exemplo
const users = [
  { id: 1, username: 'admin', password: 'admin123', email: 'admin@example.com', role: 'admin' },
  { id: 2, username: 'user1', password: 'password1', email: 'user1@example.com', role: 'user' },
  { id: 3, username: 'user2', password: 'password2', email: 'user2@example.com', role: 'user' },
  { id: 4, username: 'manager', password: 'manager123', email: 'manager@example.com', role: 'manager' },
  { id: 5, username: 'guest', password: 'guest', email: 'guest@example.com', role: 'guest' }
];

// Inserir cada usuário no banco de dados
users.forEach(user => {
  insertUser.run(user.username, user.password, user.email, user.role);
});

// Inserir mensagens iniciais
const insertMessage = db.prepare(`
INSERT INTO messages (from_user, to_user, subject, message)
VALUES (?, ?, ?, ?);
`);

// Mensagens de exemplo
const messages = [
  {
    from_user: 1,
    to_user: 2,
    subject: 'Boas-vindas à plataforma',
    message: 'Olá User1, seja bem-vindo à nossa plataforma! Se precisar de ajuda, estou à disposição.'
  },
  {
    from_user: 4,
    to_user: 2,
    subject: 'Próxima reunião',
    message: 'Lembrete: temos uma reunião de equipe amanhã às 10h. Não se esqueça de preparar sua apresentação.'
  },
  {
    from_user: 3,
    to_user: 2,
    subject: 'Documentos pendentes',
    message: 'Prezado User1, você poderia enviar os documentos que discutimos na última reunião? Obrigado!'
  },
  {
    from_user: 1,
    to_user: 3,
    subject: 'Credenciais de acesso',
    message: 'Suas credenciais temporárias são: login=user2_temp, senha=temp123. Por favor, altere após o primeiro login.'
  },
  {
    from_user: 1,
    to_user: 4,
    subject: 'Relatório de segurança',
    message: 'Encontramos algumas vulnerabilidades no sistema. Por favor, revise o relatório anexo e implemente as correções.'
  },
  {
    from_user: 2,
    to_user: 1,
    subject: 'Problema de acesso',
    message: 'Estou tendo problemas para acessar o sistema de relatórios. Poderia verificar minhas permissões?'
  },
  {
    from_user: 5,
    to_user: 1,
    subject: 'Solicitação de acesso',
    message: 'Gostaria de solicitar acesso ao módulo financeiro para consulta de relatórios.'
  }
];

// Inserir cada mensagem no banco de dados
messages.forEach(msg => {
  insertMessage.run(msg.from_user, msg.to_user, msg.subject, msg.message);
});

// Fechar a conexão com o banco de dados
db.close();

console.log('Banco de dados configurado com sucesso!');
console.log(`Criado em: ${dbPath}`);
console.log(`Usuários criados: ${users.length}`);
console.log(`Mensagens criadas: ${messages.length}`); 