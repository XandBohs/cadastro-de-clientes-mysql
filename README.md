# Cadastro de clientes com Supabase e Vercel

Migração do CRUD em PHP/MySQL para uma app Next.js pronta para deploy na Vercel.

## Stack

- Next.js
- Supabase Postgres
- Vercel

## Estrutura

- `app/`: frontend e rotas HTTP do CRUD
- `components/`: interface principal
- `lib/`: cliente do Supabase e tipos
- `supabase/schema.sql`: script de criação da tabela

## Configuração do Supabase

1. Crie um projeto no Supabase.
2. Rode o script `supabase/schema.sql` no SQL Editor.
3. Migre os dados do MySQL para a tabela `public.dadoscliente`.
4. Copie os dados do projeto para as variáveis de ambiente.

## Variáveis de ambiente

Crie um arquivo `.env.local` com:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Use a service role apenas no servidor. Ela não deve ir para o browser.

## Rodar localmente

```bash
npm install
npm run dev
```

## Deploy na Vercel

1. Suba o repositório no GitHub.
2. Importe o projeto na Vercel.
3. Configure as variáveis de ambiente.
4. Faça o deploy.

## Observação

O projeto antigo em PHP pode ser mantido como referência, mas a versão nova usa as rotas do Next.js como backend para falar com Supabase.
