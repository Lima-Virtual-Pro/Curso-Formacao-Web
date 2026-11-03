# QA V3.0

## Verificações realizadas
- Migração aplicada com sucesso no projeto Painel-Lima-Virtual.
- Quatro tabelas exclusivas `formacao_sites_*` criadas com RLS habilitado.
- Progresso: leitura, inclusão e atualização apenas do próprio usuário.
- Eventos: leitura e inclusão apenas do próprio usuário.
- Solicitação de certificado: leitura e inclusão do próprio usuário; sem update/delete pelo cliente.
- Certificados: leitura apenas do próprio titular; sem insert/update/delete para usuário final.
- Chave no frontend é publishable; nenhum segredo/service_role embutido.
- Tutor publicado em endpoint separado com verificação JWT.

## Limites da homologação
A migração e a publicação da função foram realizadas por integração administrativa. Não foram simulados cadastro/login de usuário final, envio de e-mail, execução real de pergunta no tutor, teste de navegador móvel nem emissão de certificado. A IA remota permanece opcional e não configurada até que secrets sejam adicionados.


## Revisão adicional do pacote (03/11/2026)
- Corrigida referência duplicada ao módulo `auth.js` no HTML.
- Corrigida versão gravada nos arquivos de exportação de progresso para `3.0.0`.
- Padronizado o nome da pasta raiz do pacote para `formacao_web_v3`.
- Verificação administrativa posterior confirmou as quatro tabelas `formacao_sites_*` com RLS habilitado e a Edge Function `formacao-sites-tutor` ativa com `verify_jwt=true`.
- O Security Advisor do projeto aponta alertas preexistentes em outras estruturas do Painel-Lima-Virtual (funções `SECURITY DEFINER`, tabelas sem políticas em schemas distintos e proteção contra senhas vazadas desativada). Eles não foram alterados nesta revisão e exigem auditoria separada do projeto compartilhado.
- Ainda não foram realizados testes E2E com credencial de estudante, confirmação de e-mail, navegador real ou tutor com pergunta autenticada.
