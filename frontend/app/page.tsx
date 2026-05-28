'use client';

import { useState } from 'react';
import Link from 'next/link';

const tarotistas = [
  { id: '342320f1-4151-40c0-8abe-255372bc0ce4', nombre: 'Paqui', especialidad: 'Tarot y Videncia', imagen: 'https://tpaddfpibktbaystjblq.supabase.co/storage/v1/object/public/tarotistas/paqui_1778562642153.jpg', review: 'Su energía es increíble, conecta con el alma desde el primer momento. Me dio claridad total en mi situación.' },
  { id: '939441a0-e85f-485c-8631-2e131dfa1775', nombre: 'Gloria Miranda', especialidad: 'Tarot Evolutivo', imagen: 'https://tpaddfpibktbaystjblq.supabase.co/storage/v1/object/public/tarotistas/gloria_miranda_1778562659427.jpg', review: 'Gloria es increíble, la conozco hace años y siempre me da soluciones muy concretas y acertadas.' },
  { id: '4620ebac-2d72-4e24-9693-c502320af724', nombre: 'Marian', especialidad: 'Tarot y Reiki', imagen: 'https://tpaddfpibktbaystjblq.supabase.co/storage/v1/object/public/tarotistas/marian_1778562906800.jpg', review: 'Marian es excelente, muy clara y directa. La recomiendo sin dudarlo a cualquiera.' },
  { id: 'b0335491-9e31-4488-9292-ab89532ef7a0', nombre: 'Paulina', especialidad: 'Tarot Terapéutico', imagen: 'https://tpaddfpibktbaystjblq.supabase.co/storage/v1/object/public/tarotistas/paulina_1778650234616.jpg', review: 'Excelente en todos los sentidos. La recomiendo, acudo a ella siempre que tengo dudas.' },
  { id: '18beff79-cdc7-4b12-9ef3-066180ac5cf2', nombre: 'Mercedes', especialidad: 'Consultas Sentimentales', imagen: 'https://tpaddfpibktbaystjblq.supabase.co/storage/v1/object/public/tarotistas/mercedes_1778649370330.jpg', review: 'Mercedes tiene un don especial para conectar. Me sentí escuchada y comprendida desde el inicio.' },
  { id: '0c12defa-6e5c-4cce-802d-913cd3476136', nombre: 'Marcos', especialidad: 'Acompañamiento Nocturno', imagen: 'https://tpaddfpibktbaystjblq.supabase.co/storage/v1/object/public/tarotistas/marcos_1778562782805.jpg', review: 'Marcos es excepcional, sus lecturas nocturnas tienen una vibra muy especial y profunda.' },
  { id: 'ad9be26f-5121-49a6-b5ce-492c6bdba901', nombre: 'Raquel', especialidad: 'Tarot Intuitivo', imagen: 'https://tpaddfpibktbaystjblq.supabase.co/storage/v1/object/public/tarotistas/raquel_1778562859936.jpg', review: 'Raquel tiene un don natural para la lectura intuitiva. Sus interpretaciones son profundas y acertadas.' },
  { id: '0f47986b-191b-463b-8ade-4f6443bdc10f', nombre: 'Verónica', especialidad: 'Canalización Espiritual', imagen: 'https://tpaddfpibktbaystjblq.supabase.co/storage/v1/object/public/tarotistas/veronica_1778650560777.jpg', review: 'Verónica es una canalización espiritual pura. Sus mensajes traen claridad y paz interior.' },
  { id: '9a4bfc88-8477-44bf-adc3-397cd3ede9ca', nombre: 'Yeyo', especialidad: 'Orientación Espiritual Nocturna', imagen: 'https://tpaddfpibktbaystjblq.supabase.co/storage/v1/object/public/tarotistas/yeyo_1778651391674.jpg', review: 'Yeyo ofrece orientación espiritual nocturna excepcional. Sus mensajes llegan al alma.' },
  { id: 'duende-001', nombre: 'Duende', especialidad: 'Magia Natural', imagen: '/duendep.jpeg', review: 'Guía espiritual con conexión profunda a la naturaleza. Sus lecturas son transformadoras y llenas de sabiduría ancestral.' },
];

const tarotistaImageMap: Record<string, string> = {
  'paqui': '/PAQUI.jpg', 'mercedes': '/mercedes.jpeg', 'gloria': '/gloria.jpg',
  'yeyo': '/yeyo.jpg', 'raquel': '/minerva.jpg', 'verónica': '/rubi.jpg',
  'veronica': '/rubi.jpg', 'paulina': '/paulina.jpg', 'marian': '/marian.jpg', 'marcos': '/marcos.jpg', 'duende': '/duende.jpeg',
};

function getSpecialImage(nombre: string): string | null {
  const lower = nombre.toLowerCase().trim();
  for (const key in tarotistaImageMap) {
    if (lower.includes(key)) return tarotistaImageMap[key];
  }
  return null;
}

const PER_PAGE = 4;

export default function Home() {
  const [page, setPage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<typeof tarotistas[0] | null>(null);
  const [selectedMinutes, setSelectedMinutes] = useState(15);
  const [wellModal, setWellModal] = useState<{ nombre: string; profileImg: string; precio: number; id: string } | null>(null);

  const totalPages = Math.ceil(tarotistas.length / PER_PAGE);
  const visible = tarotistas.slice(page * PER_PAGE, (page + 1) * PER_PAGE);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Cinzel:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap');
        :root{--cream:#f0e0d1;--cream-2:#ebdec3;--ink:#1a1305;--ink-soft:#3d2f15;--navy:#0e1a36;--navy-2:#0a1530;--gold:#b78a3c;--gold-bright:#d6a957;--rule:rgba(183,138,60,.35);}
        *{box-sizing:border-box}
        html,body{margin:0;padding:0}
        .vda-body{font-family:'Inter',system-ui,sans-serif;color:var(--ink);background:var(--cream);background-image:radial-gradient(1200px 600px at 50% -200px,rgba(183,138,60,.18),transparent 60%),radial-gradient(900px 500px at 90% 100%,rgba(183,138,60,.10),transparent 60%);min-height:100vh;line-height:1.55;-webkit-font-smoothing:antialiased;}
        .vda-page{max-width:1040px;margin:0 auto;padding:22px 16px 32px;position:relative;overflow:hidden;}
        .vda-frame{position:absolute;inset:14px;pointer-events:none;border:1px solid rgba(183,138,60,.28);border-radius:4px;}
        .vda-corner{position:absolute;width:46px;height:46px;color:var(--gold);}
        .vda-corner svg{width:100%;height:100%}
        .vda-corner.tl{top:-1px;left:-1px;}.vda-corner.tr{top:-1px;right:-1px;transform:scaleX(-1);}.vda-corner.bl{bottom:-1px;left:-1px;transform:scaleY(-1);}.vda-corner.br{bottom:-1px;right:-1px;transform:scale(-1,-1);}
        .vda-hero{display:grid;grid-template-columns:0.75fr 1.55fr;gap:0px;align-items:center;padding-top:24px;}
        .vda-brand{display:flex;flex-direction:column;align-items:flex-start;gap:6px;margin-bottom:18px;}
        .vda-roman{font-family:'Cinzel',serif;letter-spacing:.32em;font-size:12px;color:var(--gold);margin-left:48px;margin-bottom:2px;}
        .vda-seal{width:96px;height:96px;border-radius:50%;background:radial-gradient(circle at 50% 50%,#142147 0%,#0a1430 70%),var(--navy);border:2px solid var(--gold);box-shadow:0 0 0 4px rgba(183,138,60,.15),inset 0 0 30px rgba(0,0,0,.5);position:relative;display:grid;place-items:center;overflow:hidden;}
        .vda-seal::before{content:"";position:absolute;inset:8px;border-radius:50%;border:1px solid rgba(214,169,87,.45);}
        .vda-seal-core{width:54%;height:54%;border-radius:50%;background:radial-gradient(circle at 50% 40%,#1a2a55,#08112a);border:1px solid rgba(214,169,87,.55);display:grid;place-items:center;color:var(--gold-bright);font-family:'Cinzel',serif;font-size:22px;}
        .vda-brand-name{font-family:'Cinzel',serif;font-weight:600;font-size:20px;letter-spacing:.14em;color:var(--ink-soft);margin-top:10px;margin-left:4px;}
        .vda-brand-sub{font-family:'Inter',sans-serif;font-size:9px;letter-spacing:.32em;color:var(--gold);margin-left:4px;}
        .vda-h1{font-family:'Cormorant Garamond',serif;font-weight:500;font-size:44px;line-height:1.05;color:var(--ink);margin:12px 0 4px;letter-spacing:-0.005em;text-align:center;}
        .vda-h1 em{font-style:italic;color:var(--gold);font-weight:500;}
        .vda-divider{width:50px;height:12px;margin:12px auto 16px;color:var(--gold);display:block;}
        .vda-divider svg{width:100%;height:100%}
        .vda-lead{font-family:'Inter',sans-serif;font-weight:600;font-size:15px;color:var(--ink);max-width:320px;margin:0 0 8px;text-align:center;}
        .vda-copy{font-size:13.5px;color:var(--ink-soft);max-width:320px;line-height:1.6;text-align:center;}
        .vda-hero-art{width:100%;max-width:540px;height:auto;display:block;margin-left:auto;margin-right:0;-webkit-mask-image:linear-gradient(to bottom,#000 60%,rgba(0,0,0,0) 100%),linear-gradient(to left,#000 85%,rgba(0,0,0,0) 100%),linear-gradient(to right,#000 88%,rgba(0,0,0,0) 100%),linear-gradient(to top,#000 90%,rgba(0,0,0,0) 100%);-webkit-mask-composite:source-in;mask-image:linear-gradient(to bottom,#000 60%,rgba(0,0,0,0) 100%),linear-gradient(to left,#000 85%,rgba(0,0,0,0) 100%),linear-gradient(to right,#000 88%,rgba(0,0,0,0) 100%),linear-gradient(to top,#000 90%,rgba(0,0,0,0) 100%);mask-composite:intersect;}
        .vda-stats{margin-top:40px;display:grid;grid-template-columns:repeat(4,1fr);background:rgba(255,250,236,.55);border:1px solid rgba(183,138,60,.3);border-radius:6px;padding:22px 18px;}
        .vda-stat{display:flex;align-items:center;gap:14px;padding:0 12px;border-right:1px solid rgba(183,138,60,.18);}
        .vda-stat:last-child{border-right:none}
        .vda-stat-icon{width:34px;height:34px;flex:none;color:var(--gold);display:grid;place-items:center;}
        .vda-stat-icon svg{width:100%;height:100%}
        .vda-stat-num{font-family:'Cormorant Garamond',serif;font-size:22px;color:var(--ink);font-weight:600;line-height:1;}
        .vda-stat-label{font-size:12px;color:var(--ink-soft);opacity:.85;margin-top:4px;}
        .vda-experts-wrap{margin-top:22px;position:relative;padding:0 38px;}
        .vda-experts{background:linear-gradient(180deg,#0d1a37 0%,#0a1530 100%);border:1px solid rgba(214,169,87,.35);border-radius:6px;padding:26px 22px 22px;box-shadow:inset 0 0 60px rgba(0,0,0,.35);}
        .vda-experts-inner{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
        .vda-card{background:transparent;border:1px solid rgba(214,169,87,.35);border-radius:5px;padding:18px 14px 16px;color:#e8d9b3;position:relative;display:flex;flex-direction:column;align-items:center;text-align:center;}
        .vda-heart{position:absolute;right:10px;top:10px;color:rgba(214,169,87,.65);width:16px;height:16px;}
        .vda-avatar{width:110px;height:110px;border-radius:50%;border:2px solid var(--gold);box-shadow:0 0 0 3px rgba(214,169,87,.12);overflow:hidden;display:grid;place-items:center;}
        .vda-avatar img{width:100%;height:100%;object-fit:cover;}
        .vda-name{font-family:'Cormorant Garamond',serif;font-size:22px;color:#f1deae;margin-top:14px;line-height:1;}
        .vda-role{font-size:11.5px;color:#d6c08a;margin-top:6px;letter-spacing:.04em;}
        .vda-quote{font-size:13.5px;color:#c8b896;line-height:1.55;margin-top:14px;font-style:italic;font-family:'Cormorant Garamond',serif;}
        .vda-stars{color:var(--gold-bright);margin-top:14px;letter-spacing:3px;font-size:13px;}
        .vda-nav{position:absolute;top:50%;transform:translateY(-50%);width:30px;height:30px;border-radius:50%;background:rgba(255,250,236,.6);border:1px solid rgba(183,138,60,.35);color:var(--gold);display:grid;place-items:center;cursor:pointer;user-select:none;}
        .vda-nav.left{left:0}.vda-nav.right{right:0}
        .vda-dots{display:flex;justify-content:center;gap:8px;margin-top:14px;}
        .vda-dot{width:8px;height:8px;border-radius:50%;background:rgba(183,138,60,.35);cursor:pointer;}
        .vda-dot.active{background:var(--gold);}
        .vda-btn-perfil{margin-top:12px;width:100%;background:transparent;border:1px solid rgba(214,169,87,.5);color:#d6a957;font-family:'Cinzel',serif;font-size:10px;letter-spacing:.12em;padding:7px 4px;border-radius:3px;cursor:pointer;}
        .vda-btn-perfil:hover{background:rgba(214,169,87,.1)}
        .vda-wellness{margin-top:20px;background:linear-gradient(180deg,#0d1a37 0%,#0a1530 100%);border:1px solid rgba(214,169,87,.35);border-radius:6px;padding:22px 26px;color:#e8d9b3;}
        .vda-wellness-title{text-align:center;font-family:'Cinzel',serif;font-size:13px;letter-spacing:.42em;color:var(--gold-bright);margin:0 0 22px;display:flex;align-items:center;justify-content:center;gap:14px;}
        .vda-wellness-title::before,.vda-wellness-title::after{content:"";height:1px;width:60px;background:rgba(214,169,87,.5);}
        .vda-wellness-grid{display:grid;grid-template-columns:1fr 1fr;gap:28px;}
        .vda-well-card{display:grid;grid-template-columns:110px 1fr;gap:18px;align-items:center;}
        .vda-well-avatar{width:110px;height:110px;border-radius:50%;border:2px solid var(--gold);overflow:hidden;display:grid;place-items:center;background:linear-gradient(160deg,#2a3a64,#0e1a36);}
        .vda-well-avatar img{width:100%;height:100%;object-fit:cover;}
        .vda-well-name{font-family:'Cormorant Garamond',serif;font-size:22px;color:#f1deae;line-height:1;}
        .vda-well-role{font-size:11.5px;color:#d6c08a;margin-top:4px;margin-bottom:8px;}
        .vda-well-quote{font-size:12.5px;color:#c8b896;line-height:1.6;margin:0;}
        .vda-well-stars{color:var(--gold-bright);margin-top:8px;letter-spacing:3px;font-size:13px;}
        @media(max-width:880px){.vda-wellness-grid{grid-template-columns:1fr;gap:18px;}.vda-well-card{grid-template-columns:90px 1fr;gap:12px;}}
        .vda-cta{margin-top:22px;background:rgba(255,250,236,.55);border:1px solid rgba(183,138,60,.3);border-radius:6px;padding:24px 26px;display:grid;grid-template-columns:200px 1fr auto;gap:22px;align-items:center;}
        .vda-cta-art{width:200px;height:auto;display:block;}
        .vda-cta h2{font-family:'Cormorant Garamond',serif;font-weight:500;font-size:30px;line-height:1.15;color:var(--ink);margin:0 0 8px;}
        .vda-cta p{font-size:13.5px;color:var(--ink-soft);margin:0 0 14px;max-width:480px;}
        .vda-cta-features{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;max-width:520px;}
        .vda-feat{display:flex;flex-direction:column;align-items:center;text-align:center;gap:4px;}
        .vda-feat-icon{width:22px;height:22px;color:var(--gold);}
        .vda-feat-label{font-size:11px;color:var(--ink-soft);line-height:1.3;}
        .vda-btn{background:linear-gradient(180deg,#c89a47 0%,#a87a30 100%);color:#fff8e1;border:1px solid rgba(120,85,30,.6);padding:16px 26px;font-family:'Cormorant Garamond',serif;font-size:19px;letter-spacing:.02em;border-radius:4px;cursor:pointer;box-shadow:0 6px 16px -8px rgba(120,85,30,.55),inset 0 1px 0 rgba(255,255,255,.18);text-decoration:none;display:inline-flex;align-items:center;gap:10px;white-space:nowrap;}
        .vda-btn:hover{filter:brightness(1.06)}
        footer.vda-footer{margin-top:28px;text-align:center;padding:18px 0 6px;}
        .vda-socials{display:flex;justify-content:center;gap:10px;margin-bottom:10px;}
        .vda-socials a{width:28px;height:28px;color:var(--gold);display:grid;place-items:center;border:1px solid rgba(183,138,60,.35);border-radius:50%;}
        .vda-socials svg{width:14px;height:14px}
        .vda-copyright{font-size:11px;color:var(--ink-soft);letter-spacing:.04em;}
        .vda-moonline{margin-top:6px;color:var(--gold);letter-spacing:.6em;font-size:11px;}
        @media(max-width:880px){
          .vda-page{padding:18px 20px 40px;}
          .vda-hero{grid-template-columns:1fr;gap:24px;}
          .vda-hero-art{width:100%;margin-right:0;}
          .vda-h1{font-size:44px;}
          .vda-lead{font-size:14px;max-width:100%;}
          .vda-copy{font-size:12.5px;max-width:100%;}
          .vda-stats{grid-template-columns:repeat(2,1fr);gap:18px 0;padding:18px 12px;}
          .vda-stat{border-right:none;padding:6px 8px;}
          .vda-stat:nth-child(odd){border-right:1px solid rgba(183,138,60,.18);}
          .vda-experts-wrap{padding:0 24px;}
          .vda-experts-inner{grid-template-columns:repeat(2,1fr);gap:12px;}
          .vda-cta{grid-template-columns:1fr;gap:16px;padding:20px;}
          .vda-cta-art{width:160px;margin:0 auto;}
          .vda-cta h2{font-size:22px;text-align:center;}
          .vda-cta p{font-size:12.5px;text-align:center;margin-left:auto;margin-right:auto;}
          .vda-cta-features{margin:0 auto;max-width:100%;}
          .vda-btn{margin:0 auto;font-size:17px;padding:14px 22px;}
        }
        @media(max-width:480px){
          .vda-page{padding:14px 14px 36px;}
          .vda-h1{font-size:36px;}
          .vda-experts-wrap{padding:0 18px;}
          .vda-experts-inner{grid-template-columns:1fr;}
          .vda-stats{grid-template-columns:1fr 1fr;}
        }
      `}</style>

      <div className="vda-body">
        <div className="vda-page">
          <div className="vda-frame" />
          {(['tl','tr','bl','br'] as const).map(pos => (
            <div key={pos} className={`vda-corner ${pos}`}>
              <svg viewBox="0 0 46 46" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M2 18 L2 2 L18 2"/><path d="M6 6 L14 6 M6 6 L6 14" opacity=".55"/>
                <circle cx="2" cy="2" r="1.4" fill="currentColor" stroke="none"/>
              </svg>
            </div>
          ))}

          {/* HERO */}
          <section className="vda-hero">
            <div>
              <div className="vda-brand" style={{ alignItems: 'center' }}>
                <img src="/logo1.png" alt="Voces del Alma" style={{ width: '320px', height: 'auto', display: 'block' }} />
              </div>
              <h1 className="vda-h1">Cuando todo parece confuso, <em>tu alma ya conoce la respuesta.</em></h1>
              <div className="vda-divider">
                <svg viewBox="0 0 60 14" fill="none" stroke="currentColor" strokeWidth="1">
                  <line x1="0" y1="7" x2="22" y2="7"/><path d="M30 2 L34 7 L30 12 L26 7 Z" fill="currentColor"/><line x1="38" y1="7" x2="60" y2="7"/>
                </svg>
              </div>
              <p className="vda-lead">Detrás de cada duda hay una verdad esperando ser revelada.</p>
              <p className="vda-copy">Conecta con nuestra red de tarotistas certificadas y recibe la claridad, el propósito y la dirección que tu alma necesita para avanzar.</p>
            </div>
            <img className="vda-hero-art" src="/hero.png" alt="" />
          </section>

          {/* STATS */}
          <section className="vda-stats">
            {[
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="9" cy="8" r="3.2"/><path d="M3 20c.6-3.4 3-5.2 6-5.2s5.4 1.8 6 5.2"/><circle cx="16.5" cy="7" r="2.4"/><path d="M14 14.4c.7-.3 1.6-.5 2.5-.5 2.6 0 4.4 1.5 5 4.1"/></svg>, num: '5000+', label: 'Clientes satisfechos' },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M12 3l2.5 5.4 5.9.6-4.4 4 1.3 5.8L12 16l-5.3 2.8 1.3-5.8L3.6 9l5.9-.6L12 3z"/></svg>, num: '4.9 / 5', label: 'Valoración promedio' },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 3l8 3v5c0 5-3.6 8.4-8 10-4.4-1.6-8-5-8-10V6l8-3z"/><path d="M9 12l2.2 2.2L16 9.8"/></svg>, num: '100%', label: 'Consultas confidenciales' },
              { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 2"/></svg>, num: '24 / 7', label: 'Siempre disponibles' },
            ].map((s, i) => (
              <div key={i} className="vda-stat">
                <div className="vda-stat-icon">{s.icon}</div>
                <div><div className="vda-stat-num">{s.num}</div><div className="vda-stat-label">{s.label}</div></div>
              </div>
            ))}
          </section>

          {/* CAROUSEL */}
          <section className="vda-experts-wrap">
            <button className="vda-nav left" onClick={() => setPage(p => Math.max(0, p - 1))} aria-label="Anterior">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M15 6l-6 6 6 6"/></svg>
            </button>
            <div className="vda-experts">
              <div className="vda-experts-inner">
                {visible.map(t => (
                  <article key={t.id} className="vda-card">
                    <svg className="vda-heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>
                    <div className="vda-avatar"><img src={t.imagen} alt={t.nombre} /></div>
                    <div className="vda-name">{t.nombre}</div>
                    <div className="vda-role">{t.especialidad}</div>
                    <p className="vda-quote">"{t.review}"</p>
                    <div className="vda-stars">★ ★ ★ ★ ★</div>
                    <button className="vda-btn-perfil" onClick={() => { setSelected(t); setModalOpen(true); }}>VER PERFIL COMPLETO</button>
                  </article>
                ))}
              </div>
              <div className="vda-dots">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <div key={i} className={`vda-dot${i === page ? ' active' : ''}`} onClick={() => setPage(i)} />
                ))}
              </div>
            </div>
            <button className="vda-nav right" onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} aria-label="Siguiente">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 6l6 6-6 6"/></svg>
            </button>
          </section>

          {/* WELLNESS */}
          <div className="vda-experts-wrap" style={{ padding: '0 38px' }}>
          <section className="vda-wellness">
            <h3 className="vda-wellness-title">BIENESTAR ESPIRITUAL</h3>
            <div className="vda-wellness-grid">
              <div className="vda-well-card">
                <div className="vda-well-avatar">
                  <img src="/fer.jpeg" alt="Fernando" />
                </div>
                <div>
                  <svg style={{ width: '22px', height: '22px', color: 'var(--gold-bright)', marginBottom: '4px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><polygon points="12,2 22,8 22,16 12,22 2,16 2,8"/><polygon points="12,6 18,9.5 18,14.5 12,18 6,14.5 6,9.5" opacity=".55"/></svg>
                  <div className="vda-well-name">Fernando</div>
                  <div className="vda-well-role">Método LEMA</div>
                  <p className="vda-well-quote">Acompañamiento consciente para liberar bloqueos, transformar patrones y crear la vida que realmente deseas.</p>
                  <div className="vda-well-stars">★ ★ ★ ★ ★</div>
                  <button className="vda-btn-perfil" style={{ marginTop: '10px' }} onClick={() => setWellModal({ nombre: 'Fernando', profileImg: '/feri.jpeg', precio: 100, id: 'fernando' })}>VER PERFIL COMPLETO</button>
                </div>
              </div>
              <div className="vda-well-card">
                <div className="vda-well-avatar">
                  <img src="/eli.jpeg" alt="Eli" />
                </div>
                <div>
                  <svg style={{ width: '22px', height: '22px', color: 'var(--gold-bright)', marginBottom: '4px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18 M12 3a14 14 0 0 1 0 18 M12 3a14 14 0 0 0 0 18" opacity=".55"/></svg>
                  <div className="vda-well-name">Eli</div>
                  <div className="vda-well-role">Registros Akásicos</div>
                  <p className="vda-well-quote">Accede a la información de tu alma para obtener respuestas, claridad y guía en tu camino de evolución.</p>
                  <div className="vda-well-stars">★ ★ ★ ★ ★</div>
                  <button className="vda-btn-perfil" style={{ marginTop: '10px' }} onClick={() => setWellModal({ nombre: 'Eli', profileImg: '/elii.jpeg', precio: 60, id: 'eli' })}>VER PERFIL COMPLETO</button>
                </div>
              </div>
            </div>
          </section>
          </div>

          {/* CTA */}
          <section className="vda-cta">
            <img className="vda-cta-art" src="/cta.png" alt="" />
            <div>
              <h2>¿Quieres ser un nuevo miembro de Voces del Alma?</h2>
              <p>Únete a nuestra comunidad y accede a recursos exclusivos, contenido espiritual y herramientas para tu crecimiento.</p>
              <div className="vda-cta-features">
                {[
                  { label: 'Comunidad\nde expertos' }, { label: 'Visibilidad\ngarantizada' },
                  { label: 'Consultas\nconstantes' }, { label: 'Crecimiento\nprofesional' }
                ].map((f, i) => (
                  <div key={i} className="vda-feat">
                    <svg className="vda-feat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="12" cy="12" r="9"/></svg>
                    <div className="vda-feat-label" style={{ whiteSpace: 'pre-line' }}>{f.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <a className="vda-btn" href="mailto:hello@vocesdelalma.es">Hazte experto <span>→</span></a>
          </section>

          {/* FOOTER */}
          <footer className="vda-footer">
            <div className="vda-socials">
              <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".8" fill="currentColor"/></svg></a>
              <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M14 8h2V5h-2.5C12 5 11 6 11 7.5V10H9v3h2v8h3v-8h2.2l.3-3H14V8.5c0-.3.2-.5.5-.5H14z"/></svg></a>
            </div>
            <div className="vda-copyright">© 2026 Voces del Alma · Todos los derechos reservados</div>
            <div className="vda-moonline">( ☾ ✦ ☽ )</div>
          </footer>
        </div>
      </div>

      {/* MODAL */}
      {modalOpen && selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,21,48,.85)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px', overflowY: 'auto' }}>
          <div style={{ background: '#0a1530', border: '1px solid rgba(214,169,87,.4)', borderRadius: '10px', width: '100%', maxWidth: '500px', position: 'relative', maxHeight: '95vh', overflowY: 'auto' }}>
            <button onClick={() => setModalOpen(false)} style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,.5)', border: 'none', color: 'white', width: '36px', height: '36px', borderRadius: '50%', fontSize: '18px', cursor: 'pointer', zIndex: 10 }}>✕</button>
            {getSpecialImage(selected.nombre) ? (
              <>
                <img src={getSpecialImage(selected.nombre)!} alt={selected.nombre} style={{ width: '100%', height: 'auto', borderRadius: '10px 10px 0 0' }} />
                <div style={{ padding: '16px', borderTop: '1px solid rgba(214,169,87,.3)' }}>
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                      {[{ m: 15, p: '10€' }, { m: 20, p: '15€' }, { m: 30, p: '20€' }].map(pkg => (
                        <button key={pkg.m} onClick={() => setSelectedMinutes(pkg.m)} style={{ padding: '8px', border: `1px solid ${selectedMinutes === pkg.m ? '#d6a957' : 'rgba(214,169,87,.3)'}`, borderRadius: '6px', background: selectedMinutes === pkg.m ? 'rgba(214,169,87,.2)' : 'transparent', color: '#d6a957', cursor: 'pointer', fontFamily: 'Cinzel,serif', fontSize: '12px' }}>
                          {pkg.m}m · {pkg.p}
                        </button>
                      ))}
                    </div>
                    <Link href={`/checkout?minutes=${selectedMinutes}&tarotista=${selected.id}${selected.nombre === 'Marcos' ? '&specialist=Marcos' : ''}`} style={{ display: 'block', width: '100%', background: 'linear-gradient(180deg,#c89a47,#a87a30)', color: '#fff8e1', textAlign: 'center', padding: '12px', borderRadius: '6px', fontFamily: 'Cinzel,serif', fontSize: '14px', textDecoration: 'none', letterSpacing: '.08em' }}>
                      CONSULTAR AHORA
                    </Link>
                  </>
                </div>
              </>
            ) : (
              <div style={{ padding: '24px', color: '#e8d9b3', textAlign: 'center' }}>
                <img src={selected.imagen} alt={selected.nombre} style={{ width: '120px', height: '120px', borderRadius: '50%', border: '2px solid #d6a957', objectFit: 'cover', marginBottom: '16px' }} />
                <div style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '26px', color: '#f1deae', marginBottom: '6px' }}>{selected.nombre}</div>
                <div style={{ fontSize: '13px', color: '#d6c08a', marginBottom: '16px' }}>{selected.especialidad}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                  {[{ m: 15, p: '10€' }, { m: 20, p: '15€' }, { m: 30, p: '20€' }].map(pkg => (
                    <button key={pkg.m} onClick={() => setSelectedMinutes(pkg.m)} style={{ padding: '8px', border: `1px solid ${selectedMinutes === pkg.m ? '#d6a957' : 'rgba(214,169,87,.3)'}`, borderRadius: '6px', background: selectedMinutes === pkg.m ? 'rgba(214,169,87,.2)' : 'transparent', color: '#d6a957', cursor: 'pointer', fontSize: '12px' }}>
                      {pkg.m}m · {pkg.p}
                    </button>
                  ))}
                </div>
                <Link href={`/checkout?minutes=${selectedMinutes}&tarotista=${selected.id}`} style={{ display: 'block', background: 'linear-gradient(180deg,#c89a47,#a87a30)', color: '#fff8e1', textAlign: 'center', padding: '12px', borderRadius: '6px', fontFamily: 'Cinzel,serif', fontSize: '14px', textDecoration: 'none' }}>
                  CONSULTAR AHORA
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
      {/* MODAL WELLNESS */}
      {wellModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,21,48,.85)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px', overflowY: 'auto' }}>
          <div style={{ background: '#0a1530', border: '1px solid rgba(214,169,87,.4)', borderRadius: '10px', width: '100%', maxWidth: '500px', position: 'relative', maxHeight: '95vh', overflowY: 'auto' }}>
            <button onClick={() => setWellModal(null)} style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,.5)', border: 'none', color: 'white', width: '36px', height: '36px', borderRadius: '50%', fontSize: '18px', cursor: 'pointer', zIndex: 10 }}>✕</button>
            <img src={wellModal.profileImg} alt={wellModal.nombre} style={{ width: '100%', height: 'auto', borderRadius: '10px 10px 0 0' }} />
            <div style={{ padding: '16px', borderTop: '1px solid rgba(214,169,87,.3)' }}>
              <div style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: '22px', color: '#f1deae', textAlign: 'center', marginBottom: '12px' }}>{wellModal.nombre}</div>
              <Link href={`/checkout?minutes=${wellModal.precio}&tarotista=${wellModal.id}&specialist=${wellModal.nombre}`} style={{ display: 'block', width: '100%', background: 'linear-gradient(180deg,#c89a47,#a87a30)', color: '#fff8e1', textAlign: 'center', padding: '14px', borderRadius: '6px', fontFamily: 'Cinzel,serif', fontSize: '15px', textDecoration: 'none', letterSpacing: '.1em' }}>
                CONSULTAR · {wellModal.precio}€
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
