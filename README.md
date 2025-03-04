# CodeType

CodeType é uma aplicação web moderna construída com Next.js, TypeScript e Tailwind CSS. Este projeto possui uma configuração robusta de desenvolvimento com Jest para testes e uma base de código limpa e de fácil manutenção.

<a href="https://code-type-henna.vercel.app/" target="_blank" rel="noopener noreferrer">
   <img src="https://img.shields.io/badge/Jogar%20Agora-Online-blue?style=for-the-badge" alt="Jogar CodeType">
</a>

## 🎯 Sobre o Jogo

O CodeType é um jogo de digitação focado em melhorar suas habilidades de digitação de código. Ele oferece:

- ⌨️ Prática de digitação com trechos reais de código
- 📊 Estatísticas detalhadas de desempenho
- 🎯 Medição de precisão e velocidade
- 🌈 Interface moderna e intuitiva
- 📱 Experiência responsiva em qualquer dispositivo

## 🚀 Funcionalidades

- ⚡ **Next.js 14** com App Router
- 🎯 **TypeScript** para segurança de tipos
- 🎨 **Tailwind CSS** para estilização
- ✅ **Jest** e **React Testing Library** para testes
- 📱 **Design Responsivo**
- 🔍 **ESLint** para análise de código
- 🎭 **HeroIcons** para ícones bonitos

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:
- Node.js (v18 ou superior)
- npm (v8 ou superior)

## 🛠️ Instalação

1. Clone o repositório:
```bash
git clone git@github.com:EmersonMarinho/CodeType.git
cd codetype
```

2. Instale as dependências:
```bash
npm install
```

## 🚀 Começando

Para executar o servidor de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## 🧪 Testes

Este projeto utiliza Jest e React Testing Library para testes. Para executar os testes:

```bash
# Executar testes
npm test

# Executar testes em modo de observação
npm run test:watch

# Executar testes com relatório de cobertura
npm run test:coverage
```

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Compila a aplicação para produção
- `npm start` - Executa o servidor de produção
- `npm run lint` - Executa o ESLint para análise de código
- `npm test` - Executa a suíte de testes
- `npm run test:watch` - Executa os testes em modo de observação
- `npm run test:coverage` - Gera relatório de cobertura de testes

## 🏗️ Estrutura do Projeto

```
codetype/
├── app/                # Diretório do Next.js
├── components/         # Componentes React
├── public/            # Arquivos estáticos
├── types/             # Definições de tipos TypeScript
├── __tests__/         # Arquivos de teste
├── .next/             # Saída de compilação do Next.js
└── ...arquivos de configuração
```

## 🚀 Implantação

A maneira mais fácil de fazer o deploy desta aplicação é através da [Plataforma Vercel](https://vercel.com/new).

1. Envie seu código para um repositório Git
2. Importe seu projeto para a Vercel
3. A Vercel detectará o Next.js e configurará as definições de build automaticamente
4. Sua aplicação será implantada e estará disponível globalmente

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para enviar um Pull Request.

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para detalhes.
