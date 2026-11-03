FORMAÇÃO WEB — CRIAÇÃO DE SITES MODERNOS
Versão: 3.0.0
Título: Criação de Sites Modernos
Subtítulo: HTML, CSS e JavaScript — do zero à publicação

O QUE A V3.0 ENTREGA
- Curso com 12 aulas, laboratório HTML/CSS/JavaScript, biblioteca ilustrada, avaliações e projeto final.
- Modo local para estudar sem conta.
- Cadastro/login por e-mail e senha usando Supabase Auth.
- Sincronização de progresso entre dispositivos.
- Tutor autenticado por Edge Function, com orientação pedagógica básica sem custo.
- IA remota opcional, configurada exclusivamente por secrets no servidor.
- Estruturas isoladas para eventos de aprendizagem e certificados, com RLS.
- PWA instalável e documentação de implantação/QA.

INTEGRAÇÃO
Esta distribuição está configurada para o projeto Supabase Painel-Lima-Virtual. A migração própria da Formação Web já foi aplicada e a função formacao-sites-tutor está publicada. Não altere a URL/chave publishable sem necessidade. Nunca coloque service_role, secret key, senha de banco ou chave de IA no navegador.

ARQUIVOS PRINCIPAIS
- index.html, styles.css, app.js: aplicação e conteúdo.
- auth.js e supabase-config.js: autenticação e integração Supabase.
- database/schema-v3.sql: referência da estrutura e políticas RLS aplicadas.
- supabase/functions/formacao-sites-tutor/index.ts: código-fonte da função publicada.
- SETUP_V3.md: notas de configuração e publicação.
- QA_V3.md: verificações realizadas e limites de homologação.
- manifest.webmanifest, sw.js, assets/: PWA e ícone.

CERTIFICADO
A interface atual apresenta apenas um modelo ilustrativo. O banco permite solicitações e guarda certificados emitidos por processo administrativo, mas esta versão ainda não emite certificados automaticamente. Carga horária, critérios, emissor e validação pública precisam de homologação. Não anunciar reconhecimento pelo MEC.

Leia SETUP_V3.md e QA_V3.md antes da publicação.
