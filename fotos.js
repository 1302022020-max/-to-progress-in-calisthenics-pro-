/* ============================================================
   Fotos de progresión + envío al entrenador.
   - La foto se reduce (máx. 1280 px) y se guarda SOLO en el celular del alumno (IndexedDB).
   - "Enviar" abre el menú de compartir del celular con la foto y un mensaje ya escrito;
     el alumno elige WhatsApp/Telegram y la conversación con el entrenador sigue ahí.
   ============================================================ */
const FOTO={max:1280,calidad:.82};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const fEnt=()=>(typeof ENTRENADOR!=="undefined"&&ENTRENADOR)||{};
const fNombre=()=>fEnt().nombre||"mi entrenador";

/* ---- almacenamiento local ---- */
let _fdb=null;
function fdb(){return _fdb||(_fdb=new Promise((res,rej)=>{
  if(!window.indexedDB)return rej(new Error("sin IndexedDB"));
  const r=indexedDB.open("calis-fotos",1);
  r.onupgradeneeded=()=>{r.result.createObjectStore("fotos",{keyPath:"id",autoIncrement:true}).createIndex("k","k")};
  r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)}))}
function ftx(mode,fn){return fdb().then(db=>new Promise((res,rej)=>{
  const t=db.transaction("fotos",mode),q=fn(t.objectStore("fotos"));
  t.oncomplete=()=>res(q&&q.result);t.onerror=()=>rej(t.error)}))}
const fAdd=rec=>ftx("readwrite",s=>s.add(rec));
const fList=k=>ftx("readonly",s=>s.index("k").getAll(k));
const fDel=id=>ftx("readwrite",s=>s.delete(id));

/* ---- imagen ---- */
async function fReducir(file){
  let bmp;
  try{bmp=await createImageBitmap(file,{imageOrientation:"from-image"})}
  catch(e){bmp=await new Promise((ok,no)=>{const i=new Image();i.onload=()=>ok(i);i.onerror=no;i.src=URL.createObjectURL(file)})}
  const w=bmp.width||bmp.naturalWidth,h=bmp.height||bmp.naturalHeight,k=Math.min(1,FOTO.max/Math.max(w,h));
  const c=document.createElement("canvas");c.width=Math.round(w*k);c.height=Math.round(h*k);
  c.getContext("2d").drawImage(bmp,0,0,c.width,c.height);
  return new Promise(ok=>c.toBlob(ok,"image/jpeg",FOTO.calidad));
}

/* ---- mensaje y envío directo a Discord ---- */
function fTexto(c, seg, nota, alumno) {
  const e = fEnt().nombre;
  const quien = alumno ? `**Alumno:** ${alumno}\n` : "";
  return `${quien}💪 **Progresión:** ${c.elem} – ${c.prog}` +
         (seg ? `\n⏱️ **Tiempo sostenido:** ${seg} s` : "") +
         (nota ? `\n📝 **Nota para ${e || "el entrenador"}:** ${nota}` : "");
}

async function fEnviar(blob, texto, nombre) {
  const webhook = fEnt().discordWebhook;
  if (!webhook) return "manual";

  const formData = new FormData();
  formData.append("content", texto);
  formData.append("file", blob, nombre);

  try {
    const res = await fetch(webhook, {
      method: "POST",
      body: formData
    });
    return res.ok ? "ok" : "error";
  } catch (e) {
    return "error";
  }
}

/* ---- ventana de envío ---- */
function fModal(blob, c, opt) {
  opt = opt || {};
  let m = document.getElementById("fmodal"); if (m) m.remove();
  m = document.createElement("div"); m.id = "fmodal"; m.className = "fm";
  const url = URL.createObjectURL(blob), nom = fNombre();
  const alumnoGuardado = localStorage.getItem("cal_alumno_nombre") || "";

  m.innerHTML = `<div role="dialog" aria-modal="true" aria-label="Enviar foto">
    <h3 style="margin-top:0">${esc(c.elem)} · ${esc(c.prog)}</h3>
    <img src="${url}" alt="Tu foto">
    <label class="fl">Tu nombre<input id="falumno" type="text" placeholder="Ej. Carlos" value="${esc(alumnoGuardado)}"></label>
    <label class="fl">Tiempo que sostuviste (segundos)<input id="fseg" type="number" min="0" inputmode="numeric" value="${opt.seg || ""}"></label>
    <label class="fl">Nota para ${esc(nom)} (cómo te sentiste, dudas)<textarea id="fnota" rows="3">${esc(opt.nota || "")}</textarea></label>
    <p class="hint" id="fmsg"></p>
    <div class="row" style="margin-top:10px">
      <button class="btn" id="fsend">Enviar a ${esc(nom)}</button>
      ${opt.guardada ? "" : '<button class="btn sec" id="fsave">Solo guardar</button>'}
      <button class="btn sec" id="fcancel">Cerrar</button></div></div>`;

  document.body.appendChild(m);
  let guardada = !!opt.guardada;
  const q = id => m.querySelector("#" + id), msg = t => { q("fmsg").innerHTML = t };
  const cerrar = () => { URL.revokeObjectURL(url); m.remove(); fotoInit() };
  const datos = () => ({
    alumno: q("falumno").value.trim(),
    seg: +q("fseg").value || 0,
    nota: q("fnota").value.trim()
  });

  const guardar = async () => {
    if (guardada) return true; const d = datos();
    try { await fAdd({ k: c.k, elem: c.elem, prog: c.prog, t: Date.now(), s: d.seg, nota: d.nota, blob }); guardada = true; return true }
    catch (e) { msg("No se pudo guardar en este navegador (modo privado o sin espacio)."); return false }
  };

  q("fcancel").onclick = cerrar;
  m.addEventListener("click", e => { if (e.target === m) cerrar() });
  if (q("fsave")) q("fsave").onclick = async () => { if (await guardar()) cerrar() };

  q("fsend").onclick = async () => {
    const d = datos();
    if (d.alumno) localStorage.setItem("cal_alumno_nombre", d.alumno);
    const texto = fTexto(c, d.seg, d.nota, d.alumno);
    
    const btn = q("fsend");
    btn.disabled = true;
    btn.textContent = "Enviando...";
    msg("");

    await guardar();
    const r = await fEnviar(blob, texto, `${c.k}-${new Date().toISOString().slice(0, 10)}.jpg`);

    if (r === "ok") {
      msg(`✅ ¡Foto enviada con éxito a ${esc(nom)}!`);
      setTimeout(cerrar, 1200);
      return;
    }

    btn.disabled = false;
    btn.textContent = `Enviar a ${esc(nom)}`;
    const d2 = URL.createObjectURL(blob);
    msg(`No se pudo enviar automáticamente (revisa tu internet o la URL del Webhook). Puedes <a href="${d2}" download="${esc(c.k)}.jpg">descargar la foto</a>.`);
  };
}


/* ---- sección dentro de cada progresión ---- */
function fCtx(){const el=els()[S.e],pr=el.progresiones[S.p];return{k:key(el,S.p),elem:el.nombre,prog:pr.nombre}}
function fotoHTML(){
  const n=esc(fNombre());
  return `<h3>Mis fotos y asesoría</h3>
  <p class="hint">Sube una foto de cómo te sale esta progresión y envíasela a ${n}; te responde por chat con correcciones.</p>
  <div class="row" style="margin-top:10px"><button class="btn" id="fbtn">Enviar foto a ${n}</button>
  <input type="file" id="ffile" accept="image/*" hidden></div><div id="fhist"></div>`;
}
let _furls=[];
function fotoInit(){
  const box=document.getElementById("fhist");if(!box)return;
  const c=fCtx();
  fList(c.k).then(rows=>{
    if(!document.getElementById("fhist")||fCtx().k!==c.k)return;
    _furls.forEach(u=>URL.revokeObjectURL(u));_furls=[];
    rows=(rows||[]).sort((a,b)=>b.t-a.t);
    box.innerHTML=rows.length?`<ul class="fh">${rows.map(r=>{const u=URL.createObjectURL(r.blob);_furls.push(u);
      return `<li><img src="${u}" alt="Foto del ${new Date(r.t).toLocaleDateString("es-PE")}"><div><b>${new Date(r.t).toLocaleString("es-PE",{dateStyle:"medium",timeStyle:"short"})}</b>
      ${r.s?`<br>${r.s} s sostenidos`:""}${r.nota?`<br><span class="hint">${esc(r.nota)}</span>`:""}</div>
      <div class="fb"><button class="mini" data-fr="${r.id}">Reenviar</button><button class="mini" data-fd="${r.id}">Borrar</button></div></li>`}).join("")}</ul>`:"";
  }).catch(()=>{});
}
document.addEventListener("click",async e=>{
  const t=e.target.closest("button");if(!t)return;
  if(t.id==="fbtn"){const f=document.getElementById("ffile");if(f){f.value="";f.click()}}
  else if(t.dataset.fd){try{await fDel(+t.dataset.fd)}catch(x){}fotoInit()}
  else if(t.dataset.fr){
    try{const rows=await fList(fCtx().k),r=rows.find(x=>x.id===+t.dataset.fr);
      if(r)fModal(r.blob,{k:r.k,elem:r.elem,prog:r.prog},{seg:r.s,nota:r.nota,guardada:true})}catch(x){}
  }
});
document.addEventListener("change",async e=>{
  if(e.target.id!=="ffile"||!e.target.files||!e.target.files[0])return;
  const c=fCtx();let blob;
  try{blob=await fReducir(e.target.files[0])}catch(x){alert("No se pudo leer la imagen. Prueba con otra foto.");return}
  fModal(blob,c,{seg:(typeof tSec!=="undefined"&&tSec)||""});
});
(function(){const s=document.createElement("style");s.textContent=`
.fm{position:fixed;inset:0;background:rgba(11,17,27,.78);display:grid;place-items:center;padding:16px;z-index:50}
.fm>div{background:var(--card);border-radius:12px;max-width:440px;width:100%;max-height:92vh;overflow:auto;padding:16px;border-top:6px solid var(--acc)}
.fm img{display:block;width:100%;max-height:46vh;object-fit:contain;background:#0B111B;border-radius:8px}
.fl{display:block;margin-top:10px;font-weight:600;font-size:14px}
.fl input,.fl textarea{display:block;width:100%;margin-top:4px;padding:8px 10px;border:1px solid var(--line);border-radius:8px;font:16px Barlow,system-ui,sans-serif;color:var(--ink);background:#fff}
.fh{list-style:none;margin:14px 0 0;padding:0!important}
.fh li{display:flex;gap:10px;align-items:center;padding:8px 0;border-top:1px solid var(--line);font-size:14px}
.fh img{flex:none;width:64px;height:64px;object-fit:cover;border-radius:8px}
.fh li>div:nth-child(2){flex:1;min-width:0}.fb{display:flex;flex-direction:column;gap:4px}
`;document.head.appendChild(s)})();
