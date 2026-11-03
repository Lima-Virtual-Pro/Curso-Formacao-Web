# Formação Web V3.0 — instalação

## Projeto Supabase conectado
Painel-Lima-Virtual (`piagfpnjiwpngbikkkfp`). A configuração do navegador já aponta para a URL e chave publishable deste projeto. Não substitua por service_role/secret key.

## Integração aplicada
A migração `formacao_sites_v3_isolated_schema` foi aplicada ao projeto. Ela cria somente tabelas `formacao_sites_*`, com RLS por `auth.uid()`. Não altera as tabelas e funções `iae_*`, `plv_*`, `pag_tudo`, Mentoria ou outros produtos.

A função `formacao-sites-tutor` foi publicada separadamente e exige JWT válido. Sem secrets de provedor de IA, responde em modo pedagógico básico sem custo. Para IA remota, configure secrets `AI_PROVIDER_API_KEY`, `AI_PROVIDER_URL` e `AI_MODEL` no Supabase. Nunca coloque esses valores no frontend.

## Publicação
Envie o conteúdo da pasta `formacao_web_v3` para seu host estático (GitHub Pages ou Cloudflare Pages). Sirva por HTTPS. Se já houver service worker antigo, limpe os dados/cache do site uma vez.

## Autenticação
Cadastro e login usam Supabase Auth por e-mail e senha. Se a confirmação de e-mail estiver habilitada no projeto, o usuário deverá confirmar o endereço antes de entrar. Configure a URL pública do curso em Authentication > URL Configuration > Redirect URLs.

## Certificados
A estrutura de solicitações e certificados está protegida. O usuário pode solicitar e consultar apenas os próprios registros; não há autoemissão. A emissão oficial continua dependente de fluxo administrativo, validação de conclusão, definição formal de carga horária e identificação do emissor. Não anunciar reconhecimento MEC.
