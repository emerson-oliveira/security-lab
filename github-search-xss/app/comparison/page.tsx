import Link from 'next/link';

export default function ComparisonPage() {
  return (
    <main className="container">
      <Link href="/" className="back-link">
        ← Voltar para a página inicial
      </Link>

      <h1 className="title">Comparação: Vulnerável vs. Seguro</h1>

      <div className="card">
        <p className="description">
          Esta página demonstra as diferenças entre código vulnerável a XSS e código seguro.
          Compare as implementações lado a lado para entender as melhores práticas de segurança.
        </p>

        <div className="comparison-section">
          <div className="comparison-card vulnerable-card">
            <h2>Versão Vulnerável</h2>
            <p>Implementação com dangerouslySetInnerHTML sem sanitização</p>
          </div>
          <div className="comparison-card secure-card">
            <h2>Versão Segura</h2>
            <p>Implementação com sanitização apropriada e boas práticas</p>
          </div>
        </div>

        <h2 style={{ marginTop: '2rem' }}>Exemplos de Código</h2>

        <h3>Exibindo o termo de busca</h3>
        <div className="comparison-section">
          <div className="comparison-card vulnerable-card">
            <h4>Vulnerável</h4>
            <div className="code-block">
              <code>
                &lt;h2&gt;Resultados para: &lt;span dangerouslySetInnerHTML=&#123;&#123; __html: query &#125;&#125; /&gt;&lt;/h2&gt;
              </code>
            </div>
            <p>
              Problema: O valor de query é renderizado diretamente como HTML sem qualquer sanitização,
              permitindo que um atacante injete scripts maliciosos.
            </p>
          </div>
          <div className="comparison-card secure-card">
            <h4>Seguro</h4>
            <div className="code-block">
              <code>
                &lt;h2&gt;Resultados para: &#123;query&#125;&lt;/h2&gt;
              </code>
            </div>
            <p>
              Solução: O React automaticamente escapa texto quando inserido entre chaves,
              prevenindo a execução de scripts.
            </p>
          </div>
        </div>

        <h3>Exibindo a descrição do repositório</h3>
        <div className="comparison-section">
          <div className="comparison-card vulnerable-card">
            <h4>Vulnerável</h4>
            <div className="code-block">
              <code>
                &#123;repo.description && (<br />
                &nbsp;&nbsp;&lt;p dangerouslySetInnerHTML=&#123;&#123; __html: repo.description &#125;&#125; /&gt;<br />
                )&#125;
              </code>
            </div>
            <p>
              Problema: Conteúdo da API de terceiros é renderizado como HTML sem verificação,
              podendo conter código malicioso.
            </p>
          </div>
          <div className="comparison-card secure-card">
            <h4>Seguro</h4>
            <div className="code-block">
              <code>
                &#123;repo.description && (<br />
                &nbsp;&nbsp;&lt;p&gt;&#123;repo.description&#125;&lt;/p&gt;<br />
                )&#125;
              </code>
            </div>
            <p>
              Solução: Renderizar como texto simples previne qualquer execução de código.
            </p>
          </div>
        </div>

        <h3>Uso de sanitização quando HTML é necessário</h3>
        <div className="comparison-section">
          <div className="comparison-card vulnerable-card">
            <h4>Vulnerável</h4>
            <div className="code-block">
              <code>
                &lt;div dangerouslySetInnerHTML=&#123;&#123; __html: htmlContent &#125;&#125; /&gt;
              </code>
            </div>
            <p>
              Problema: Nenhuma sanitização é aplicada, expondo a aplicação a ataques XSS.
            </p>
          </div>
          <div className="comparison-card secure-card">
            <h4>Seguro</h4>
            <div className="code-block">
              <code>
                import DOMPurify from &apos;isomorphic-dompurify&apos;;<br /><br />
                &lt;div dangerouslySetInnerHTML=&#123;&#123; __html: DOMPurify.sanitize(htmlContent) &#125;&#125; /&gt;
              </code>
            </div>
            <p>
              Solução: DOMPurify remove scripts e outros conteúdos potencialmente perigosos.
            </p>
          </div>
        </div>

        <div className="alert alert-info" style={{ marginTop: '2rem' }}>
          <h3>Melhores práticas para prevenir XSS em React</h3>
          <ul>
            <li>Evite usar dangerouslySetInnerHTML sempre que possível</li>
            <li>Prefira renderizar conteúdo como texto em vez de HTML</li>
            <li>Use bibliotecas de sanitização como DOMPurify quando precisar renderizar HTML</li>
            <li>Implemente Content Security Policy (CSP) para adicionar uma camada extra de proteção</li>
            <li>Valide inputs do usuário tanto no cliente quanto no servidor</li>
            <li>Atualize sempre o React e suas dependências para as versões mais recentes</li>
          </ul>
        </div>

        <div className="button-container" style={{ marginTop: '2rem' }}>
          <Link href="/search" className="button button-primary">
            Ver Exemplo Vulnerável
          </Link>
          <Link href="/search-secure" className="button button-success">
            Ver Exemplo Seguro
          </Link>
        </div>
      </div>
    </main>
  );
} 