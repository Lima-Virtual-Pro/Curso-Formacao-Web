import { createClient } from "https://esm.sh/@supabase/supabase-js@2.118.0";
import { SUPABASE_CONFIG, SUPABASE_CONFIGURED } from "./supabase-config.js";
const $ = (s) => document.querySelector(s);
let client = null, currentUser = null;
const status = (message, connected=false) => {
  const el=$("#accountStatus"); if(el) el.textContent=message;
  const badge=$("#connectionStatus"); if(badge){badge.textContent=connected?"Conta conectada":"Modo local";badge.classList.toggle("connected",connected)}
};
function setSignedIn(user){currentUser=user;const signed=!!user;
  $("#signInBtn").hidden=signed;$("#signUpBtn").hidden=signed;$("#signOutBtn").hidden=!signed;
  $("#authEmail").disabled=signed;$("#authPassword").disabled=signed;
  if(signed){$("#accountStatus").textContent=`Conectado como ${user.email}. O progresso pode ser sincronizado.`;}
}
async function loadCloudProgress(){if(!client||!currentUser)return;
  const {data,error}=await client.from("formacao_sites_progress").select("state,updated_at,revision").eq("user_id",currentUser.id).maybeSingle();
  if(error)throw error;
  if(data?.state && typeof data.state==="object"){
    const local=JSON.parse(localStorage.getItem("formacaoWebState")||"{}");
    const cloud=data.state;
    // União conservadora: preserva conclusões e checklist dos dois dispositivos.
    const merged={...local,...cloud,completed:[...new Set([...(local.completed||[]),...(cloud.completed||[])])],project:[...new Set([...(local.project||[]),...(cloud.project||[])])],quizBest:Math.max(local.quizBest||0,cloud.quizBest||0)};
    localStorage.setItem("formacaoWebState",JSON.stringify(merged));
    window.dispatchEvent(new CustomEvent("formacao:cloud-loaded",{detail:merged}));
  }
}
async function syncProgress(state){if(!client||!currentUser)return {localOnly:true};
  const payload={user_id:currentUser.id,state,updated_at:new Date().toISOString()};
  const {error}=await client.from("formacao_sites_progress").upsert(payload,{onConflict:"user_id"});
  if(error)throw error; status(`Progresso sincronizado para ${currentUser.email}.`,true);return {synced:true};
}
async function init(){
  if(!SUPABASE_CONFIGURED){status("Modo local ativo. Para habilitar contas, configure supabase-config.js e aplique database/schema-v3.sql.");return;}
  client=createClient(SUPABASE_CONFIG.url,SUPABASE_CONFIG.publishableKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
  const {data:{session},error}=await client.auth.getSession();if(error)status("Não foi possível recuperar a sessão. Tente entrar novamente.");
  setSignedIn(session?.user||null);
  if(session?.user){try{await loadCloudProgress()}catch(e){status("Conta conectada, mas a leitura do progresso falhou: "+e.message,true)}}
  client.auth.onAuthStateChange((_event,session)=>{setSignedIn(session?.user||null);if(session?.user)queueMicrotask(()=>loadCloudProgress().catch(e=>status("Falha ao carregar progresso: "+e.message,true)));else status("Sessão encerrada. O progresso local permanece neste navegador.");});
}
$("#authForm")?.addEventListener("submit",async e=>{e.preventDefault();if(!client){status("Configure primeiro o Supabase. Nenhum dado foi enviado.");return;}
  const email=$("#authEmail").value.trim(),password=$("#authPassword").value;
  try{const {data,error}=await client.auth.signInWithPassword({email,password});if(error)throw error;setSignedIn(data.user);await loadCloudProgress();status(`Bem-vindo(a), ${data.user.email}.`,true)}catch(err){status("Não foi possível entrar: "+err.message)}
});
$("#signUpBtn")?.addEventListener("click",async()=>{if(!client){status("Configure primeiro o Supabase. Nenhum dado foi enviado.");return;}
  const email=$("#authEmail").value.trim(),password=$("#authPassword").value;if(!email||password.length<8){status("Informe um e-mail válido e uma senha com pelo menos 8 caracteres.");return;}
  try{const {data,error}=await client.auth.signUp({email,password});if(error)throw error;if(data.session){setSignedIn(data.user);status("Conta criada e sessão iniciada.",true)}else status("Cadastro recebido. Verifique seu e-mail para confirmar a conta.")}catch(err){status("Não foi possível criar a conta: "+err.message)}
});
$("#signOutBtn")?.addEventListener("click",async()=>{if(!client)return;const {error}=await client.auth.signOut();if(error)status("Falha ao sair: "+error.message,true);else{setSignedIn(null);status("Você saiu. O progresso local não foi apagado.")}});
$("#syncBtn")?.addEventListener("click",async()=>{try{if(!client||!currentUser){status("Entre em uma conta configurada para sincronizar. O modo local continua disponível.");return;}const state=JSON.parse(localStorage.getItem("formacaoWebState")||"{}");await syncProgress(state)}catch(err){status("Sincronização não concluída: "+err.message,true)}});
async function askTutor(question){
  if(!client||!currentUser)return null;
  const {data,error}=await client.functions.invoke("formacao-sites-tutor",{body:{question}});
  if(error)throw error;
  return data;
}
window.FormacaoAuth={syncProgress,askTutor,get user(){return currentUser},get configured(){return !!client}};
init().catch(e=>status("Falha ao inicializar autenticação: "+e.message));
window.addEventListener("formacao:cloud-loaded",e=>{const s=e.detail;const pct=Math.round((s.completed?.length||0)/12*100);const label=$("#sideProgress");if(label)label.textContent=pct+"%";const bar=$("#sideProgressBar");if(bar)bar.style.width=pct+"%";const done=$("#completedStat");if(done)done.textContent=s.completed?.length||0;});
