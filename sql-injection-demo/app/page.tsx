import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="home-container">
      <div className="card">
        <h1 className="title">Demonstração de SQL Injection</h1>
        <p className="description">
          Este projeto demonstra como funcionam os ataques de SQL Injection e como proteger sua aplicação contra eles.
        </p>

        <div className="section">
          <h2 className="subtitle">Versão Vulnerável</h2>
          <p>
            Explore exemplos de código vulnerável a ataques de SQL Injection.
            Estas páginas contêm vulnerabilidades propositais para fins educacionais.
          </p>
          <div className="button-group">
            <Link href="/login" className="btn btn-danger">
              Login Vulnerável
            </Link>
            <Link href="/search" className="btn btn-danger">
              Busca Vulnerável
            </Link>
          </div>
        </div>

        <div className="section">
          <h2 className="subtitle">Versão Segura</h2>
          <p>
            Explore as mesmas funcionalidades, mas com código protegido contra SQL Injection.
            Estas páginas demonstram as melhores práticas de segurança.
          </p>
          <div className="button-group">
            <Link href="/secure/login" className="btn btn-success">
              Login Seguro
            </Link>
            <Link href="/secure/search" className="btn btn-success">
              Busca Segura
            </Link>
          </div>
        </div>

        <div className="section">
          <h2 className="subtitle">Comparação de Código</h2>
          <p>
            Veja lado a lado as diferenças entre código vulnerável e código seguro,
            com exemplos e explicações detalhadas.
          </p>
          <div className="button-group">
            <Link href="/comparison" className="btn">
              Ver Comparação de Código
            </Link>
          </div>
        </div>
      </div>

      <div className="card info-card">
        <h2 className="subtitle">O que é SQL Injection?</h2>
        <p>
          SQL Injection é uma técnica de ataque onde comandos SQL maliciosos são inseridos em campos
          de entrada que são posteriormente passados para um interpretador SQL.
        </p>

        <h3>Principais vulnerabilidades:</h3>
        <ul className="feature-list">
          <li>Concatenação direta de strings na construção de queries SQL</li>
          <li>Falta de validação e sanitização de entradas do usuário</li>
          <li>Mensagens de erro detalhadas que revelam informações sobre o banco de dados</li>
          <li>Permissões excessivas nas contas de banco de dados</li>
        </ul>

        <h3>Métodos de proteção:</h3>
        <ul className="feature-list">
          <li>Uso de consultas parametrizadas (prepared statements)</li>
          <li>Validação rigorosa de entrada de dados</li>
          <li>Princípio do menor privilégio para contas de banco de dados</li>
          <li>Filtragem de entradas e sanitização de saídas</li>
        </ul>
      </div>
    </div>
  );
} 