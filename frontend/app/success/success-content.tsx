'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useSession } from '@/lib/hooks';
import { ZADARMA_PHONE_NUMBER } from '@/lib/constants';
import { useState, useEffect } from 'react';

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Cinzel:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap');
  *{box-sizing:border-box}html,body{margin:0;padding:0}
  .sw{min-height:100vh;background:radial-gradient(900px 600px at 50% 0%,rgba(183,138,60,.12),transparent 70%),#0a1530;font-family:'Inter',sans-serif;padding:32px 20px 48px;display:flex;flex-direction:column;align-items:center;}
  .slogo{width:160px;margin-bottom:32px;opacity:.9;}
  .scheck{width:64px;height:64px;border-radius:50%;background:linear-gradient(180deg,rgba(214,169,87,.25),rgba(214,169,87,.1));border:2px solid rgba(214,169,87,.6);display:grid;place-items:center;margin:0 auto 20px;font-size:28px;}
  .stit{font-family:'Cormorant Garamond',serif;font-size:36px;color:#f1deae;text-align:center;margin:0 0 8px;}
  .ssub{font-size:14px;color:#c8b896;text-align:center;margin:0 0 36px;line-height:1.6;}
  .sbox{width:100%;max-width:520px;background:linear-gradient(180deg,#0d1a37,#0a1530);border:1px solid rgba(214,169,87,.3);border-radius:12px;padding:28px;margin-bottom:16px;}
  .sbox-title{font-family:'Cinzel',serif;font-size:11px;letter-spacing:.22em;color:#d6a957;margin:0 0 18px;display:flex;align-items:center;gap:10px;}
  .sbox-title::after{content:"";flex:1;height:1px;background:rgba(214,169,87,.2);}
  .sphone{font-family:'Cormorant Garamond',serif;font-size:34px;color:#f1deae;letter-spacing:.04em;margin:0 0 6px;}
  .sphone-note{font-size:12px;color:#8a7a5a;}
  .scode{font-family:'Cinzel',serif;font-size:28px;color:#d6a957;letter-spacing:.18em;margin:0 0 6px;}
  .scode-note{font-size:12px;color:#8a7a5a;}
  .sdetail{display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid rgba(214,169,87,.1);}
  .sdetail:last-child{border-bottom:none}
  .sdetail-icon{width:20px;height:20px;color:#d6a957;flex-shrink:0;}
  .sdetail-text{font-size:13px;color:#c8b896;}
  .sdetail-text strong{color:#e8d9b3;}
  .sstep{display:flex;gap:14px;align-items:flex-start;padding:12px 0;border-bottom:1px solid rgba(214,169,87,.08);}
  .sstep:last-child{border-bottom:none}
  .sstep-num{width:28px;height:28px;border-radius:50%;background:linear-gradient(180deg,#c89a47,#a87a30);color:#fff8e1;font-family:'Cinzel',serif;font-size:12px;display:grid;place-items:center;flex-shrink:0;margin-top:2px;}
  .sstep-title{font-size:14px;color:#e8d9b3;font-weight:600;margin:0 0 2px;}
  .sstep-desc{font-size:12px;color:#8a7a5a;margin:0;}
  .schat{width:100%;max-width:520px;background:linear-gradient(180deg,#0d1a37,#0a1530);border:2px solid rgba(214,169,87,.5);border-radius:12px;padding:28px;margin-bottom:16px;text-align:center;box-shadow:0 0 40px rgba(214,169,87,.08);}
  .schat-title{font-family:'Cormorant Garamond',serif;font-size:26px;color:#f1deae;margin:0 0 6px;}
  .schat-sub{font-size:13px;color:#c8b896;margin:0 0 20px;}
  .schat-btn{display:inline-block;background:linear-gradient(180deg,#c89a47,#a87a30);color:#fff8e1;padding:14px 36px;border-radius:8px;font-family:'Cinzel',serif;font-size:14px;text-decoration:none;letter-spacing:.1em;box-shadow:0 6px 20px rgba(168,122,48,.35);}
  .schat-btn:hover{filter:brightness(1.1)}
  .shome{font-size:13px;color:rgba(214,169,87,.55);text-decoration:none;margin-top:8px;display:inline-block;}
  .shome:hover{color:rgba(214,169,87,.9)}
  .sloading{color:#c8b896;font-size:14px;text-align:center;margin-top:60px;}
`;

export function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { data: session, isLoading } = useSession(sessionId);
  const [chatSpecialist, setChatSpecialist] = useState('');

  useEffect(() => {
    const sp   = localStorage.getItem('vda_pending_specialist');
    const mins = localStorage.getItem('vda_pending_minutes');
    if (sp) {
      localStorage.removeItem('vda_pending_specialist');
      localStorage.removeItem('vda_pending_minutes');
      localStorage.setItem(`vda_chat_unlocked_${sp}`, 'true');
      if (mins) localStorage.setItem(`vda_chat_minutes_${sp}`, mins);
      setChatSpecialist(sp);
    }
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <div className="sw">
        <img src="/logo1.png" alt="Voces del Alma" className="slogo" />

        <div className="scheck">✓</div>
        <h1 className="stit">¡Pago Confirmado!</h1>
        <p className="ssub">Tu sesión está lista.<br />Sigue las instrucciones para tu consulta.</p>

        {isLoading && <p className="sloading">Cargando tu sesión...</p>}

        {!isLoading && session && (
          <>
            {/* Chat unlock for Marcos/Fernando/Eli */}
            {chatSpecialist && (
              <div className="schat">
                <div style={{ fontSize: '24px', marginBottom: '12px' }}>✨</div>
                <h2 className="schat-title">Tu consulta con {chatSpecialist} está lista</h2>
                <p className="schat-sub">El chat se ha desbloqueado. Puedes escribirle ahora.</p>
                <Link href={`/chat?para=${chatSpecialist}`} className="schat-btn">
                  ABRIR CHAT CON {chatSpecialist.toUpperCase()}
                </Link>
              </div>
            )}

            {/* Phone (for regular tarotistas) */}
            {!chatSpecialist && (
              <div className="sbox">
                <p className="sbox-title">NÚMERO DE TELÉFONO</p>
                <p className="sphone">{ZADARMA_PHONE_NUMBER}</p>
                <p className="sphone-note">Llama a este número para iniciar tu sesión</p>
              </div>
            )}

            {/* Session code */}
            <div className="sbox">
              <p className="sbox-title">CÓDIGO DE SESIÓN</p>
              <p className="scode">{session.session_code}</p>
              <p className="scode-note">Puedes mencionarlo al llamar para identificarte</p>
            </div>

            {/* Details */}
            <div className="sbox">
              <p className="sbox-title">DETALLES</p>
              <div className="sdetail">
                <svg className="sdetail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
                <span className="sdetail-text">Duración: <strong>{session.minutes} minutos</strong></span>
              </div>
              <div className="sdetail">
                <svg className="sdetail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                <span className="sdetail-text">Válido hasta: <strong>{new Date(session.expires_at).toLocaleString('es-ES')}</strong></span>
              </div>
              <div className="sdetail">
                <svg className="sdetail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3l8 3v5c0 5-3.6 8.4-8 10-4.4-1.6-8-5-8-10V6l8-3z"/></svg>
                <span className="sdetail-text"><strong>Pago seguro confirmado</strong></span>
              </div>
            </div>

            {/* Steps (only for phone tarotistas) */}
            {!chatSpecialist && (
              <div className="sbox">
                <p className="sbox-title">PRÓXIMOS PASOS</p>
                <div className="sstep">
                  <div className="sstep-num">1</div>
                  <div><p className="sstep-title">Llama al número</p><p className="sstep-desc">Marca {ZADARMA_PHONE_NUMBER} desde tu teléfono</p></div>
                </div>
                <div className="sstep">
                  <div className="sstep-num">2</div>
                  <div><p className="sstep-title">Da tu código (opcional)</p><p className="sstep-desc">Menciona {session.session_code} para identificarte</p></div>
                </div>
                <div className="sstep">
                  <div className="sstep-num">3</div>
                  <div><p className="sstep-title">Disfruta tu lectura</p><p className="sstep-desc">Prepárate y haz tus preguntas con calma</p></div>
                </div>
              </div>
            )}
          </>
        )}

        <Link href="/" className="shome">← Volver al inicio</Link>
      </div>
    </>
  );
}
