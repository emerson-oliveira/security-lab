const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');

// Garantir que o diretório data existe
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Caminho para o banco de dados
const dbPath = path.join(dataDir, 'users.db');

// Remover banco de dados anterior se existir
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath);
}

// Criar novo banco de dados
const db = new Database(dbPath);

// Criar tabela de usuários
db.exec(`
  CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user'
  )
`);

// Inserir dados de exemplo
const insertUser = db.prepare(`
  INSERT INTO users (username, password, email, role) 
  VALUES (?, ?, ?, ?)
`);

// Usuários comuns
insertUser.run('usuario1', 'senha123', 'usuario1@exemplo.com', 'user');
insertUser.run('usuario2', 'senha456', 'usuario2@exemplo.com', 'user');
insertUser.run('usuario3', 'senha789', 'usuario3@exemplo.com', 'user');

// Usuário administrador
insertUser.run('admin', 'senhaadmin', 'admin@exemplo.com', 'admin');

// Criar tabela de mensagens privadas
db.exec(`
  CREATE TABLE messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    from_user INTEGER NOT NULL,
    to_user INTEGER NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (from_user) REFERENCES users(id),
    FOREIGN KEY (to_user) REFERENCES users(id)
  )
`);

// Inserir mensagens de exemplo
const insertMessage = db.prepare(`
  INSERT INTO messages (from_user, to_user, subject, message)
  VALUES (?, ?, ?, ?)
`);

// Mensagens entre usuários
insertMessage.run(1, 2, 'Olá', 'Como você está?');
insertMessage.run(2, 1, 'Re: Olá', 'Estou bem, obrigado!');
insertMessage.run(3, 1, 'Informações do projeto', 'Precisamos conversar sobre o projeto.');

// Mensagens para o admin com informações sensíveis
insertMessage.run(1, 4, 'Acesso ao sistema', 'Preciso de acesso ao painel administrativo.');
insertMessage.run(4, 1, 'Re: Acesso ao sistema', 'Não é possível conceder esse acesso no momento.');
insertMessage.run(4, 2, 'Credenciais de backup', 'A senha do sistema de backup é: sistema_backup_123');
insertMessage.run(4, 3, 'Informações confidenciais', 'Aqui estão os dados confidenciais que você solicitou: DADOS_SECRETOS_123');

console.log('Banco de dados inicializado com sucesso!');
db.close(); 