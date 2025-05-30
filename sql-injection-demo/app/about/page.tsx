export default function AboutPage() {
  return (
    <div>
      <div className="card">
        <h1 className="title">Sobre SQL Injection</h1>
        <p className="mb-4">
          SQL Injection (SQLi) é uma técnica de ataque comum em aplicações web que permite aos invasores
          interferir nas consultas que uma aplicação faz ao seu banco de dados. Isso pode permitir que
          atacantes visualizem dados que normalmente não poderiam recuperar, como senhas de usuários,
          dados de clientes ou informações proprietárias.
        </p>
      </div>

      <div className="card">
        <h2 className="subtitle">Como funciona um ataque SQL Injection?</h2>
        <p className="mb-4">
          O SQL Injection ocorre quando um atacante é capaz de inserir uma série de instruções SQL em um campo
          de entrada que é posteriormente processado como parte de uma consulta SQL. Se a aplicação não sanitizar
          adequadamente as entradas, o atacante pode modificar a lógica da consulta original.
        </p>

        <h3 className="mb-4">Exemplo básico de SQL Injection:</h3>
        <div className="code-block">
          <p>// Consulta vulnerável em código:</p>
          <p>query = &quot;SELECT * FROM users WHERE username = &apos;&quot; + username + &quot;&apos; AND password = &apos;&quot; + password + &quot;&apos;&quot;;</p>
          <br />
          <p>// Se um usuário inserir como nome de usuário:</p>
          <p>admin&apos; --</p>
          <br />
          <p>// A consulta resultante será:</p>
          <p>SELECT * FROM users WHERE username = &apos;admin&apos; -- AND password = &apos;qualquer_coisa&apos;</p>
        </div>
        <p className="mb-4">
          Neste exemplo, o trecho <code>--</code> é um comentário em SQL, que faz com que tudo após ele seja ignorado.
          Assim, a verificação de senha é completamente ignorada, permitindo o login como &apos;admin&apos; sem a senha correta.
        </p>
      </div>

      <div className="card">
        <h2 className="subtitle">Tipos comuns de SQL Injection</h2>

        <h3>1. SQLi Baseado em Erro</h3>
        <p className="mb-4">
          O atacante força o banco de dados a gerar um erro, revelando informações sobre sua estrutura.
        </p>

        <h3>2. SQLi Union</h3>
        <p className="mb-4">
          Usa o operador UNION para combinar os resultados de duas consultas separadas, permitindo que o
          atacante extraia dados de outras tabelas.
        </p>

        <h3>3. SQLi Blind (Cego)</h3>
        <p className="mb-4">
          Quando nenhuma saída de erro é exibida, o atacante deduz a estrutura do banco de dados através
          de perguntas verdadeiro/falso e análise de tempo de resposta.
        </p>
      </div>

      <div className="card">
        <h2 className="subtitle">Como prevenir SQL Injection</h2>

        <h3>1. Consultas parametrizadas</h3>
        <div className="code-block">
          <p>// Versão segura usando parâmetros:</p>
          <p>const query = &quot;SELECT * FROM users WHERE username = ? AND password = ?&quot;;</p>
          <p>db.prepare(query).get(username, password);</p>
        </div>

        <h3>2. ORM (Object Relational Mapping)</h3>
        <p className="mb-4">
          Utilize bibliotecas ORM como Sequelize, Prisma ou TypeORM que implementam
          consultas parametrizadas por padrão.
        </p>

        <h3>3. Validação de entrada</h3>
        <p className="mb-4">
          Valide todas as entradas do usuário antes de processar, rejeitando entradas suspeitas.
        </p>

        <h3>4. Princípio do privilégio mínimo</h3>
        <p className="mb-4">
          Use contas de banco de dados com privilégios mínimos necessários para a aplicação funcionar.
        </p>
      </div>
    </div>
  );
} 