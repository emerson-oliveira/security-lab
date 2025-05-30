# GitHub Repository Search

Este é um projeto de exemplo que permite buscar repositórios do GitHub através da sua API. A aplicação foi desenvolvida usando Next.js e React.

## ⚠️ Aviso de Segurança

**Esta aplicação contém vulnerabilidades de XSS (Cross-Site Scripting) intencionais para fins educacionais.**

As seguintes vulnerabilidades foram intencionalmente implementadas:

1. Uso de `dangerouslySetInnerHTML` para exibir a consulta de pesquisa do usuário sem sanitização
2. Uso de `dangerouslySetInnerHTML` para exibir a descrição dos repositórios sem sanitização

**NÃO use este código em produção. Este é apenas um exemplo para aprendizado sobre segurança web.**

## Como Explorar as Vulnerabilidades

Você pode testar as vulnerabilidades XSS inserindo código HTML/JavaScript na barra de pesquisa, como:

```
<img src="x" onerror="alert('XSS!')">
```

Isso executará o código JavaScript quando os resultados forem exibidos.

## Instalação

```bash
npm install
```

## Execução

```bash
npm run dev
```

O servidor de desenvolvimento será iniciado em [http://localhost:3000](http://localhost:3000).

## Como Corrigir as Vulnerabilidades

Para corrigir as vulnerabilidades XSS, você deveria:

1. Remover o uso de `dangerouslySetInnerHTML` e sanitizar as entradas do usuário
2. Usar bibliotecas de sanitização como DOMPurify
3. Utilizar técnicas seguras de renderização de conteúdo 