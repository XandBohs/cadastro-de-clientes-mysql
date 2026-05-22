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

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Use a publishable key no browser e no servidor para este CRUD. Não há dependência de service role neste fluxo.

## Supabase SSR helper

Este projeto agora inclui a estrutura recomendada do `@supabase/ssr`:

- `utils/supabase/server.ts`
- `utils/supabase/client.ts`
- `utils/supabase/middleware.ts`
- `middleware.ts`

Esses arquivos mantêm a sessão atualizada e deixam o projeto pronto para autenticação futura.

## Rodar localmente

```bash
npm install
npm run dev
```

## Deploy na Vercel

1. Suba o repositório no GitHub.
2. Importe o projeto na Vercel.
3. Configure as variáveis de ambiente na Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
4. Faça um novo deploy depois de salvar as variáveis.

Importante: na Vercel, variáveis novas ou alteradas só entram em vigor em deploys novos. Se o site já estava publicado antes da mudança, você precisa redeployar.

## Observação

O projeto antigo em PHP pode ser mantido como referência, mas a versão nova usa as rotas do Next.js como backend para falar com Supabase.
