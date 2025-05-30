# Demonstração de XSS (Cross-Site Scripting)

Este projeto é uma aplicação educativa que demonstra como funcionam as vulnerabilidades de Cross-Site Scripting (XSS) em aplicações React/Next.js, além de mostrar como implementar as melhores práticas para evitá-las.

## ⚠️ Aviso de Segurança

**IMPORTANTE**: Este projeto contém vulnerabilidades intencionais para fins educacionais. **NÃO** use este código em ambiente de produção ou aplicações reais.

## Sobre o Projeto

O projeto consiste em uma aplicação Next.js com TypeScript que permite buscar e exibir repositórios do GitHub. Ele inclui:

1. **Versão Vulnerável**: Uma implementação que usa `dangerouslySetInnerHTML` sem sanitização, permitindo ataques XSS
2. **Versão Segura**: Uma implementação seguindo as melhores práticas de segurança
3. **Página de Comparação**: Explicações detalhadas sobre as diferenças entre as duas versões

## O que é XSS (Cross-Site Scripting)?

XSS é uma vulnerabilidade de segurança que permite a um atacante injetar scripts maliciosos em conteúdo que será visualizado por outros usuários. Quando bem-sucedido, um ataque XSS pode:

- Roubar cookies e sessões de usuários
- Redirecionar para sites maliciosos
- Modificar o conteúdo da página
- Capturar dados sensíveis inseridos pelo usuário
- Realizar ações não autorizadas em nome do usuário

## Tipos de XSS

1. **Refletido**: O script malicioso vem da requisição atual e é refletido na resposta
2. **Armazenado**: O script malicioso é armazenado no servidor e entregue a múltiplos usuários
3. **DOM-based**: A vulnerabilidade existe no código do lado do cliente

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/github-search-xss.git
   cd github-search-xss
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse a aplicação em [http://localhost:3000](http://localhost:3000)

## Estrutura do Projeto

```
github-search-xss/
├── app/                    # Estrutura da aplicação Next.js
│   ├── api/                # Rotas da API
│   │   └── github/         # API para buscar repositórios do GitHub
│   ├── search/             # Versão vulnerável da busca
│   ├── search-secure/      # Versão segura da busca
│   └── comparison/         # Página de comparação
├── types/                  # Definições de tipos TypeScript
│   └── github.ts           # Tipos para a API do GitHub
└── README.md               # Este arquivo
```

## Explorando a Vulnerabilidade

Na versão vulnerável da aplicação (/search), você pode inserir os seguintes payloads XSS:

```html
<script>alert('XSS vulnerável!')</script>
```

```html
<div style="color:red; font-size:30px">Página hackeada!</div>
```

## Proteções Implementadas

Na versão segura da aplicação, as seguintes proteções são implementadas:

1. **Renderização de texto puro**: Em vez de HTML, o conteúdo é tratado como texto
2. **Sanitização**: Quando HTML é necessário, bibliotecas como DOMPurify são usadas para remover conteúdo malicioso
3. **Codificação**: Caracteres especiais são convertidos em entidades HTML

## Melhores Práticas para Prevenir XSS em React

1. **Evite `dangerouslySetInnerHTML`**: Prefira renderização de texto puro sempre que possível
2. **Use bibliotecas de sanitização**: Como DOMPurify, quando precisar renderizar HTML
3. **Implemente CSP**: Content Security Policy ajuda a mitigar ataques XSS
4. **Valide entradas**: Sanitize dados tanto no cliente quanto no servidor
5. **Mantenha dependências atualizadas**: React e outras bibliotecas frequentemente corrigem vulnerabilidades

## Recursos Adicionais

Para aprender mais sobre XSS e como se proteger:

- [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [React Security Documentation](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml)
- [DOMPurify](https://github.com/cure53/DOMPurify)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

## Licença

Este projeto é licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.
