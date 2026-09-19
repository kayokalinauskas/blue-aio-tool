# Blue AIO Tool

Uma central de utilitários para apoiar desenvolvimento, testes e tarefas do dia a dia. A aplicação reúne geradores de dados brasileiros e ferramentas de transformação de texto em uma interface responsiva, com todo o processamento realizado localmente no navegador.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

**[Acessar aplicação](https://kayokalinauskas.github.io/blue-aio-tool/)**

## Sobre o projeto

O Blue AIO Tool foi criado para concentrar pequenas ferramentas frequentemente usadas por pessoas desenvolvedoras e equipes de QA. Em vez de depender de diferentes serviços online, a aplicação oferece uma experiência única, rápida e orientada à privacidade.

O projeto demonstra competências em desenvolvimento frontend moderno, incluindo componentização com React, tipagem com TypeScript, design responsivo, manipulação de dados no cliente e automação de deploy.

## Funcionalidades

- **Gerador de GTIN/EAN-13:** cria códigos com prefixo brasileiro `789` e calcula o dígito verificador.
- **Gerador de CPF:** produz números sintaticamente válidos, com opção de exibição formatada ou sem máscara.
- **Gerador de CNPJ:** produz números sintaticamente válidos para matriz (`0001`), também com controle de máscara.
- **Formatador de JSON:** valida, formata com diferentes níveis de indentação e minifica documentos JSON.
- **Conversor Base64:** codifica e decodifica textos, incluindo caracteres Unicode.
- **Cópia rápida:** envia os resultados para a área de transferência e confirma a ação por meio de notificações.
- **Layout responsivo:** adapta os cards de ferramentas a telas desktop e dispositivos móveis.
- **Processamento local:** não envia os dados inseridos ou gerados para uma API ou servidor externo.

> [!NOTE]
> CPFs, CNPJs e GTINs são gerados exclusivamente para cenários de desenvolvimento e teste. A validade matemática não implica a existência ou a regularidade cadastral do documento ou produto.

## Tecnologias

| Tecnologia | Uso no projeto |
| --- | --- |
| React 19 | Construção da interface e gerenciamento de estado local |
| TypeScript | Tipagem estática dos componentes e configurações |
| Vite 7 + SWC | Ambiente de desenvolvimento e build otimizado |
| Tailwind CSS | Layout responsivo, tema e estilização baseada em utilitários |
| shadcn/ui + Radix UI | Componentes acessíveis e reutilizáveis |
| Lucide React | Iconografia consistente |
| Sonner | Feedback visual por notificações |
| React Router | Roteamento da SPA e página de fallback |
| ESLint | Padronização e análise estática do código |
| GitHub Actions | Build e deploy contínuo no GitHub Pages |

## Decisões técnicas

- **Privacidade por padrão:** geração, validação e conversão usam apenas APIs nativas do navegador; não existe backend nem persistência de conteúdo.
- **Componentes independentes:** cada ferramenta encapsula interface, estado e regras de negócio, simplificando manutenção e evolução.
- **Design system:** tokens CSS, Tailwind e componentes base do shadcn/ui mantêm cores, espaçamentos e estados visuais consistentes.
- **Experiência do usuário:** estados vazios, mensagens de erro, feedback de cópia e notificações tornam as interações previsíveis.
- **Entrega automatizada:** cada push na branch `main` dispara o build e a publicação estática no GitHub Pages.

## Arquitetura

```text
src/
├── components/
│   ├── tools/          # Ferramentas e suas regras de negócio
│   ├── ui/             # Componentes reutilizáveis do design system
│   └── Header.tsx      # Cabeçalho da aplicação
├── hooks/              # Hooks compartilhados de interface
├── lib/                # Funções utilitárias
├── pages/              # Páginas principal e de rota não encontrada
├── App.tsx             # Providers e configuração de rotas
├── index.css           # Tokens visuais e estilos globais
└── main.tsx            # Ponto de entrada da aplicação
```

O fluxo principal permanece inteiramente no cliente:

```text
Interação do usuário → estado do componente → processamento local → resultado na interface
```

## Como executar localmente

### Pré-requisitos

- Node.js 20 ou superior
- npm

### Instalação

```bash
git clone https://github.com/kayokalinauskas/blue-aio-tool.git
cd blue-aio-tool
npm install --legacy-peer-deps
npm run dev
```

A aplicação estará disponível em `http://localhost:8080/blue-aio-tool/`.

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção em `dist/` |
| `npm run build:dev` | Gera o build no modo de desenvolvimento |
| `npm run lint` | Executa a análise estática com ESLint |
| `npm run preview` | Serve localmente o build de produção |

## Deploy

O repositório possui um workflow de CI/CD com GitHub Actions. Em atualizações da branch `main`, o pipeline:

1. prepara o ambiente com Node.js 20;
2. instala as dependências de forma reproduzível com `npm ci`;
3. compila a aplicação com Vite;
4. publica o artefato estático no GitHub Pages.

---

Desenvolvido por [Kayo Kalinauskas](https://github.com/kayokalinauskas).
