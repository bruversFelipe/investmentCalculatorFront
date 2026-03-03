# Investment Simulation Calculator - Frontend

Interface web para criação e visualização de simulações de investimentos em renda fixa e renda variável.

## Stack Tecnológica

- **Next.js 16** - Framework React com App Router
- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Estilização utility-first
- **React Router DOM** - Roteamento client-side
- **Jotai** - Gerenciamento de estado global
- **Axios** - Cliente HTTP para comunicação com API

## Requisitos

* Node.js 20 ou superior
* npm 6.14.7 ou superior
* API rodando em http://localhost:4000

## Instalação

```bash
npm install
```

## Executar o Projeto

### Desenvolvimento (com hot-reload)
```bash
npm run dev
```

### Build de Produção
```bash
npm run build
npm start
```

A aplicação estará disponível em http://localhost:3000

## Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js
│   ├── page.tsx           # Página inicial (Login)
│   ├── layout.tsx         # Layout global
│   └── globals.css        # Estilos globais
├── components/
│   └── ui/                # Componentes reutilizáveis
│       ├── Button.tsx     # Botão com variantes
│       └── Input.tsx      # Input com label
├── containers/            # Containers de páginas
│   ├── ClientApp.tsx      # Wrapper client-side com rotas
│   ├── Login/             # Tela de login e cadastro
│   ├── Home/              # Dashboard com lista e criação
│   └── Detail/            # Detalhes da simulação
├── services/              # Camada de serviços
│   ├── auth.ts           # Autenticação
│   └── simulationService.ts  # Simulações
├── store/                 # Estado global (Jotai)
│   └── authAtom.ts       # Átomo de autenticação
└── utils/                 # Utilitários
    ├── api.ts            # Cliente axios configurado
    └── storage.ts        # Wrapper localStorage
```

## Rotas

- `/` - Login e criação de conta
- `/home` - Dashboard com lista de simulações e formulário de criação
- `/detail/:id` - Detalhes completos de uma simulação

## Funcionalidades

### Autenticação
- Login com email e senha
- Criação de conta com auto-login
- Token JWT armazenado no localStorage (prefixo `jera_`)
- Interceptor axios para anexar token automaticamente
- Redirecionamento automático para login em rotas protegidas

### Simulações
- Criar nova simulação com parâmetros personalizados
- Listar todas as simulações criadas
- Visualizar detalhes completos (resultados, impostos, evolução mensal)
- Deletar simulações
- Comparação visual entre renda fixa e variável

### Design System

**Paleta de Cores:**
- Fundo: `bg-slate-100`
- Cards: `bg-white shadow-xl rounded-2xl p-8 border border-slate-200`
- Títulos: `text-slate-800`
- Labels: `text-slate-600`
- Lucros: `text-green-600`
- Perdas/Impostos: `text-red-600`

**Componentes:**
- Input com label integrado
- Button com 3 variantes (primary, secondary, danger)
- Layout responsivo com breakpoints `md:` e `lg:`

## Gerenciamento de Estado

### Jotai Atoms
- `tokenAtom` - Token de autenticação
- `setTokenAtom` - Setter que sincroniza com localStorage

### LocalStorage
Todas as operações de storage usam funções encapsuladas em `utils/storage.ts`:
- `setStorage(key, value)` - Salva com prefixo `jera_`
- `getStorage(key)` - Recupera e faz parse JSON
- `removeStorage(key)` - Remove item

## Integração com API

A aplicação consome a API REST em `http://localhost:4000`:

```typescript
// Configuração automática de token
axios.interceptors.request.use((config) => {
  const token = getStorage("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## Scripts Disponíveis

```bash
npm run dev    # Desenvolvimento com hot-reload
npm run build  # Build de produção
npm start      # Servidor de produção
npm run lint   # Verificar código
```

## Padrões de Código

- Componentes funcionais com TypeScript
- Hooks do React para gerenciamento de estado local
- Separação clara entre containers (páginas) e components (reutilizáveis)
- Services para lógica de API
- Tipos TypeScript em arquivos `types.ts` separados por container


--- 
Prompts usados: 
https://docs.google.com/document/d/13okrn4hGRPFF0CMOhMbyFw6X0abHXlVqJlKk33AriVo/edit?usp=sharing

Front publico 
https://investcalculatorbruvers.netlify.app/
