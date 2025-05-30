import Link from 'next/link';

export default function ComparisonPage() {
  return (
    <div className="home-container">
      <div className="card">
        <h1 className="title">Comparação: Vulnerável vs. Seguro</h1>
        <p className="description">
          Esta página demonstra as diferenças entre código vulnerável a SQL Injection e código seguro.
          Compare as implementações lado a lado para entender as melhores práticas de segurança.
        </p>

        <div className="comparison-container">
          <div className="comparison-card vulnerable-card">
            <h2>Código Vulnerável</h2>
            <p>Implementação com concatenação direta de strings na query SQL.</p>
          </div>
          <div className="comparison-card secure-card">
            <h2>Código Seguro</h2>
            <p>Implementação com consultas parametrizadas (prepared statements).</p>
          </div>
        </div>

        <h2 className="subtitle" style={{ marginTop: '2rem' }}>Exemplos de Código</h2>

        <h3>Exemplo 1: Login</h3>
        <div className="code-comparison">
          <div className="code-column">
            <div className="code-header header-vulnerable">Vulnerável</div>
            <div className="code-block">
              <pre>{`// Vulnerável a SQL Injection
const query = \`
  SELECT id, username, email, role 
  FROM users 
  WHERE username = '\${username}' 
    AND password = '\${password}'
\`;

// Ameaça: username = "admin' --"
// Query resultante:
// SELECT id, username, email, role 
// FROM users 
// WHERE username = 'admin' --' AND password = ''
`}</pre>
            </div>
          </div>
          <div className="code-column">
            <div className="code-header header-secure">Seguro</div>
            <div className="code-block">
              <pre>{`// Seguro contra SQL Injection
const query = \`
  SELECT id, username, email, role 
  FROM users 
  WHERE username = ? AND password = ?
\`;

// Parâmetros passados separadamente
const user = db.prepare(query).get(
  username, 
  password
);
`}</pre>
            </div>
          </div>
        </div>

        <h3>Exemplo 2: Busca com LIKE</h3>
        <div className="code-comparison">
          <div className="code-column">
            <div className="code-header header-vulnerable">Vulnerável</div>
            <div className="code-block">
              <pre>{`// Vulnerável a SQL Injection
const query = \`
  SELECT id, username, email, role 
  FROM users 
  WHERE username LIKE '%\${searchTerm}%' 
     OR email LIKE '%\${searchTerm}%'
\`;

// Ameaça: searchTerm = "' OR '1'='1"
// Query resultante:
// SELECT id, username, email, role 
// FROM users 
// WHERE username LIKE '%' OR '1'='1%' 
//    OR email LIKE '%' OR '1'='1%'
`}</pre>
            </div>
          </div>
          <div className="code-column">
            <div className="code-header header-secure">Seguro</div>
            <div className="code-block">
              <pre>{`// Seguro contra SQL Injection
const query = \`
  SELECT id, username, email, role 
  FROM users 
  WHERE username LIKE ? OR email LIKE ?
\`;

// Preparar parâmetro LIKE separadamente
const likeParam = \`%\${searchTerm}%\`;

// Parâmetros passados separadamente
const users = db.prepare(query).all(
  likeParam, 
  likeParam
);
`}</pre>
            </div>
          </div>
        </div>

        <h3>Exemplo 3: Parâmetros de URL</h3>
        <div className="code-comparison">
          <div className="code-column">
            <div className="code-header header-vulnerable">Vulnerável</div>
            <div className="code-block">
              <pre>{`// Vulnerável a SQL Injection
const query = \`
  SELECT m.id, m.subject, m.message, ...
  FROM messages m
  JOIN users u1 ON m.from_user = u1.id
  JOIN users u2 ON m.to_user = u2.id
  WHERE m.to_user = \${userId}
\`;

// Ameaça: userId = "1 UNION SELECT..."
// Permite ataques de UNION para extrair dados
`}</pre>
            </div>
          </div>
          <div className="code-column">
            <div className="code-header header-secure">Seguro</div>
            <div className="code-block">
              <pre>{`// Validação de entrada
if (!/^\\d+$/.test(userId)) {
  return { error: 'ID inválido' };
}

// Consulta parametrizada
const query = \`
  SELECT m.id, m.subject, m.message, ...
  FROM messages m
  JOIN users u1 ON m.from_user = u1.id
  JOIN users u2 ON m.to_user = u2.id
  WHERE m.to_user = ?
\`;

const messages = db.prepare(query).all(userId);
`}</pre>
            </div>
          </div>
        </div>

        <div className="security-alert alert-info" style={{ marginTop: '2rem' }}>
          <h3>Proteção contra SQL Injection</h3>
          <ul>
            <li><strong>Consultas parametrizadas:</strong> Use placeholders (?) e parâmetros separados</li>
            <li><strong>Validação de entrada:</strong> Verifique o tipo e formato dos dados antes de usá-los</li>
            <li><strong>ORM:</strong> Use ferramentas como Prisma, Sequelize ou TypeORM que fazem a parametrização automaticamente</li>
            <li><strong>Princípio do menor privilégio:</strong> Limite o acesso das contas de banco de dados</li>
            <li><strong>Tratamento de erros:</strong> Não exiba mensagens de erro detalhadas para o usuário</li>
          </ul>
        </div>

        <div className="button-group" style={{ marginTop: '2rem' }}>
          <Link href="/" className="btn">
            Voltar para Home
          </Link>
          <Link href="/secure/login" className="btn btn-success">
            Testar Versão Segura
          </Link>
        </div>
      </div>
    </div>
  );
}