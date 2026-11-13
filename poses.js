// ============================================================
//  POSES 3D: una pose por progresión, con la clave  "<id-elemento>-<número de progresión desde 0>".
//  Ángulos en grados, en el plano lateral (x = hacia la derecha, y = hacia arriba, 0° = derecha, 90° = arriba).
//    t    : dirección cadera → hombros
//    a    : dirección hombro → mano (brazos estirados)
//    f    : hacia dónde mira el pecho respecto al tronco (+1 = t+90°, -1 = t-90°)
//    L/R  : [flexión de cadera, flexión de rodilla, apertura lateral de la pierna]  (R = L si no se indica)
//    bar  : true = manos en la barra, false = manos en el suelo
//    wall : 1 = pared delante de los pies, -1 = pared detrás de los pies
//  Para ajustar una pose, cambia estos números y recarga la página.
// ============================================================
function P(o){
  const t=o.t,f=o.f;
  const leg=g=>{g=g||[0,0,0];const th=t+180-f*g[0];return{th:th,sh:th+f*g[1],sp:g[2]||0}};
  const l=leg(o.L),r=leg(o.R||o.L);
  return{t:t,a:o.a,thL:l.th,shL:l.sh,spL:l.sp,thR:r.th,shR:r.sh,spR:r.sp,fa:t+f*90,hd:o.hd||0,ay:o.bar?2.3:0.05,wall:o.wall||0};
}
const POSES={
  // ---- Front lever (boca arriba, colgado)
  "front-lever-0":P({t:180,a:92,f:-1,bar:1,L:[125,150,0]}),
  "front-lever-1":P({t:180,a:92,f:-1,bar:1,L:[90,90,0]}),
  "front-lever-2":P({t:180,a:94,f:-1,bar:1,L:[0,0,0],R:[110,140,0]}),
  "front-lever-3":P({t:180,a:94,f:-1,bar:1,L:[0,0,38]}),
  "front-lever-4":P({t:180,a:95,f:-1,bar:1,L:[0,0,0]}),
  // ---- Back lever (boca abajo, colgado)
  "back-lever-0":P({t:265,a:92,f:1,bar:1,L:[70,100,0]}),
  "back-lever-1":P({t:180,a:100,f:1,bar:1,L:[125,150,0]}),
  "back-lever-2":P({t:180,a:100,f:1,bar:1,L:[90,90,0]}),
  "back-lever-3":P({t:180,a:102,f:1,bar:1,L:[0,0,38]}),
  "back-lever-4":P({t:180,a:102,f:1,bar:1,L:[0,0,0]}),
  // ---- Planche (boca abajo, manos en el suelo)
  "planche-0":P({t:22,a:245,f:-1,L:[0,0,0]}),
  "planche-1":P({t:-8,a:250,f:-1,L:[120,145,0]}),
  "planche-2":P({t:0,a:252,f:-1,L:[95,100,0]}),
  "planche-3":P({t:2,a:255,f:-1,L:[0,0,38]}),
  "planche-4":P({t:3,a:258,f:-1,L:[0,0,0]}),
  // ---- Parada de manos
  "handstand-0":P({t:295,a:262,f:-1,L:[65,0,0],wall:-1}),
  "handstand-1":P({t:262,a:270,f:1,L:[0,0,0],wall:1}),
  "handstand-2":P({t:278,a:270,f:1,L:[0,0,0],wall:-1}),
  "handstand-3":P({t:268,a:270,f:1,L:[0,0,0],R:[35,0,0]}),
  "handstand-4":P({t:270,a:270,f:1,L:[0,0,0]})
};

// ---------- Cinemática: de ángulos a posiciones 3D ----------
const DIM={torso:0.55,arm:0.62,thigh:0.45,shin:0.45,hipW:0.09,shW:0.2};
const rad=d=>d*Math.PI/180;
function fk(p){
  const c=a=>Math.cos(rad(a)),s=a=>Math.sin(rad(a));
  const J={};
  const S=[DIM.torso*c(p.t),DIM.torso*s(p.t)];
  [["L",-1],["R",1]].forEach(([k,z])=>{
    J["sh"+k]=[S[0],S[1],z*DIM.shW];
    J["hand"+k]=[S[0]+DIM.arm*c(p.a),S[1]+DIM.arm*s(p.a),z*DIM.shW];
    J["hip"+k]=[0,0,z*DIM.hipW];
    const th=p["th"+k],sh=p["sh"+k],sp=p["sp"+k],cs=Math.cos(rad(sp)),sn=Math.sin(rad(sp));
    const h=J["hip"+k];
    J["knee"+k]=[h[0]+DIM.thigh*c(th)*cs,h[1]+DIM.thigh*s(th)*cs,h[2]+z*DIM.thigh*sn];
    const kn=J["knee"+k];
    J["foot"+k]=[kn[0]+DIM.shin*c(sh)*cs,kn[1]+DIM.shin*s(sh)*cs,kn[2]+z*DIM.shin*sn];
  });
  J.hipC=[0,0,0];J.shC=[S[0],S[1],0];
  const hd=p.t+p.hd;
  J.head=[S[0]+0.26*c(hd),S[1]+0.26*s(hd),0];
  J.nose=[J.head[0]+0.11*c(p.fa),J.head[1]+0.11*s(p.fa),0];
  // anclar las manos (barra o suelo)
  const ox=-J.handL[0],oy=p.ay-J.handL[1];
  Object.keys(J).forEach(k=>{J[k]=[J[k][0]+ox,J[k][1]+oy,J[k][2]]});
  return J;
}
const ANG=["t","a","thL","shL","thR","shR","fa","hd"];
function lerpPose(a,b,k){
  const o={};
  Object.keys(a).forEach(key=>{
    if(ANG.indexOf(key)>=0){let d=((b[key]-a[key])%360+540)%360-180;o[key]=a[key]+d*k}
    else o[key]=a[key]+(b[key]-a[key])*k;
  });
  return o;
}
if(typeof module!=="undefined")module.exports={POSES,fk,lerpPose};
