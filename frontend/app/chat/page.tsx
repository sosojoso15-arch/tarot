'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface Message {
  id: string;
  session_id: string;
  sender: 'client' | 'marcos';
  message: string;
  created_at: string;
}

const specialists: Record<string, { nombre: string; rol: string; img: string; price?: number; id?: string }> = {
  'Marcos':   { nombre: 'Marcos',   rol: 'Acompañamiento Nocturno', img: '/marcos.jpg' },
  'Fernando': { nombre: 'Fernando', rol: 'Método LEMA',             img: '/feri.jpeg',  price: 100, id: 'fernando' },
  'Eli':      { nombre: 'Eli',      rol: 'Registros Akásicos',      img: '/elii.jpeg',  price: 60,  id: 'eli'      },
};

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Cinzel:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap');
  *{box-sizing:border-box}html,body{margin:0;padding:0}
  .cw{min-height:100vh;background:radial-gradient(900px 600px at 50% 0%,rgba(183,138,60,.12),transparent 70%),#0a1530;font-family:'Inter',sans-serif;display:flex;align-items:center;justify-content:center;padding:20px;}
  .cbox{width:100%;max-width:480px;background:linear-gradient(180deg,#0d1a37,#0a1530);border:1px solid rgba(214,169,87,.35);border-radius:12px;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,.5);}
  .chdr{padding:16px 20px;border-bottom:1px solid rgba(214,169,87,.2);display:flex;align-items:center;gap:12px;}
  .cav{width:44px;height:44px;border-radius:50%;border:2px solid rgba(214,169,87,.55);overflow:hidden;flex-shrink:0;}
  .cav img{width:100%;height:100%;object-fit:cover;}
  .cnm{font-family:'Cormorant Garamond',serif;font-size:20px;color:#f1deae;line-height:1.1;}
  .crl{font-size:11px;color:#d6c08a;letter-spacing:.04em;margin-top:2px;}
  .cmsgs{height:360px;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;}
  .cmsgs::-webkit-scrollbar{width:3px}.cmsgs::-webkit-scrollbar-thumb{background:rgba(214,169,87,.25);border-radius:2px}
  .msg{max-width:78%;padding:10px 14px;border-radius:12px;font-size:14px;line-height:1.55;}
  .mc{background:rgba(214,169,87,.15);border:1px solid rgba(214,169,87,.3);color:#e8d9b3;align-self:flex-end;border-bottom-right-radius:3px;}
  .mm{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.09);color:#c8b896;align-self:flex-start;border-bottom-left-radius:3px;}
  .msn{font-size:10px;color:#d6a957;margin-bottom:4px;letter-spacing:.04em;opacity:.9;}
  .cinp{padding:12px 16px;border-top:1px solid rgba(214,169,87,.18);display:flex;gap:10px;align-items:flex-end;}
  .ctxt{flex:1;background:rgba(255,255,255,.05);border:1px solid rgba(214,169,87,.28);border-radius:8px;padding:10px 14px;color:#e8d9b3;font-size:14px;font-family:'Inter',sans-serif;outline:none;resize:none;min-height:42px;max-height:100px;}
  .ctxt::placeholder{color:rgba(232,217,179,.35)}
  .ctxt:focus{border-color:rgba(214,169,87,.55)}
  .csnd{background:linear-gradient(180deg,#c89a47,#a87a30);border:none;color:#fff8e1;padding:10px 16px;border-radius:8px;cursor:pointer;font-family:'Cinzel',serif;font-size:11px;letter-spacing:.1em;flex-shrink:0;}
  .csnd:hover{filter:brightness(1.1)}
  .csnd:disabled{opacity:.5;cursor:not-allowed}
  .nbox{padding:40px 28px;text-align:center;}
  .ntit{font-family:'Cormorant Garamond',serif;font-size:30px;color:#f1deae;margin:0 0 6px;}
  .nsub{font-size:13px;color:#c8b896;margin:0 0 28px;line-height:1.6;}
  .ninp{width:100%;background:rgba(255,255,255,.05);border:1px solid rgba(214,169,87,.28);border-radius:8px;padding:13px 16px;color:#e8d9b3;font-size:15px;font-family:'Inter',sans-serif;outline:none;text-align:center;margin-bottom:14px;}
  .ninp::placeholder{color:rgba(232,217,179,.35)}
  .ninp:focus{border-color:rgba(214,169,87,.55)}
  .nbtn{width:100%;background:linear-gradient(180deg,#c89a47,#a87a30);border:none;color:#fff8e1;padding:14px;border-radius:8px;font-family:'Cinzel',serif;font-size:14px;letter-spacing:.1em;cursor:pointer;box-shadow:0 6px 20px rgba(168,122,48,.35);text-decoration:none;display:block;text-align:center;}
  .nbtn:hover{filter:brightness(1.08)}
  .nbtn:disabled{opacity:.55;cursor:not-allowed}
  .empty{color:rgba(232,217,179,.35);font-size:13px;text-align:center;margin-top:60px;line-height:1.7;font-style:italic;font-family:'Cormorant Garamond',serif;}
  .spav{width:64px;height:64px;border-radius:50%;border:2px solid rgba(214,169,87,.5);overflow:hidden;margin:0 auto 16px;}
  .spav img{width:100%;height:100%;object-fit:cover;}
  .paywall-note{font-size:12px;color:rgba(232,217,179,.45);margin-top:12px;line-height:1.6;}
`;

function ChatContent() {
  const searchParams = useSearchParams();
  const para = searchParams.get('para') || 'Marcos';
  const sp = specialists[para] || specialists['Marcos'];

  const UNLOCK_KEY  = `vda_chat_unlocked_${para}`;
  const SESSION_KEY = `vda_chat_session_${para}`;
  const NAME_KEY    = `vda_chat_name_${para}`;

  const [mounted,   setMounted]   = useState(false);
  const [unlocked,  setUnlocked]  = useState(false);
  const [name,      setName]      = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages,  setMessages]  = useState<Message[]>([]);
  const [input,     setInput]     = useState('');
  const [loading,   setLoading]   = useState(false);
  const [sending,   setSending]   = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Mount: check unlock + restore session from localStorage
  useEffect(() => {
    const isMarcos = para === 'Marcos';
    const ok = isMarcos || !!localStorage.getItem(UNLOCK_KEY);
    setUnlocked(ok);
    if (ok) {
      const savedId   = localStorage.getItem(SESSION_KEY);
      const savedName = localStorage.getItem(NAME_KEY);
      if (savedId && savedName) {
        setName(savedName);
        setSessionId(savedId);
      }
    }
    setMounted(true);
  }, [para]);

  const startChat = async () => {
    if (!name.trim() || loading) return;
    setLoading(true);
    try {
      const res = await fetch('/api/chat/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ client_name: name.trim(), specialist: sp.nombre }),
      });
      const data = await res.json();
      if (data.success) {
        const id = data.data.id;
        setSessionId(id);
        localStorage.setItem(SESSION_KEY, id);
        localStorage.setItem(NAME_KEY, name.trim());
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!sessionId) return;
    const poll = async () => {
      const res = await fetch(`/api/chat/messages?session_id=${sessionId}`);
      const data = await res.json();
      if (data.success) setMessages(data.data || []);
    };
    poll();
    const id = setInterval(poll, 3000);
    return () => clearInterval(id);
  }, [sessionId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || !sessionId || sending) return;
    setInput('');
    setSending(true);
    try {
      await fetch('/api/chat/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, sender: 'client', message: text }),
      });
    } finally {
      setSending(false);
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  // Prevent SSR mismatch
  if (!mounted) return null;

  // Paywall for Fernando / Eli when not unlocked
  if (!unlocked) {
    return (
      <>
        <style>{CSS}</style>
        <div className="cw">
          <div className="cbox">
            <div className="nbox">
              <img src="/logo1.png" alt="Voces del Alma" style={{ width: '160px', marginBottom: '20px', opacity: .85 }} />
              <div className="spav"><img src={sp.img} alt={sp.nombre} /></div>
              <h2 className="ntit">Consulta con {sp.nombre}</h2>
              <p className="nsub">{sp.rol}<br />Completa el pago para acceder al chat</p>
              <Link href={`/checkout?minutes=${sp.price}&tarotista=${sp.id}&specialist=${sp.nombre}`} className="nbtn">
                CONSULTAR · {sp.price}€
              </Link>
              <p className="paywall-note">Pago único · Acceso inmediato al chat · Seguro con Stripe</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Name entry (new session)
  if (!sessionId) {
    return (
      <>
        <style>{CSS}</style>
        <div className="cw">
          <div className="cbox">
            <div className="nbox">
              <img src="/logo1.png" alt="Voces del Alma" style={{ width: '160px', marginBottom: '20px', opacity: .85 }} />
              <div className="spav"><img src={sp.img} alt={sp.nombre} /></div>
              <h2 className="ntit">Consulta con {sp.nombre}</h2>
              <p className="nsub">{sp.rol}<br />Escribe tu nombre para comenzar</p>
              <input
                className="ninp"
                placeholder="Tu nombre"
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && startChat()}
                autoFocus
              />
              <button className="nbtn" onClick={startChat} disabled={loading || !name.trim()}
                style={{ border: 'none', cursor: loading || !name.trim() ? 'not-allowed' : 'pointer' }}>
                {loading ? 'CONECTANDO...' : 'INICIAR CONSULTA'}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Chat
  return (
    <>
      <style>{CSS}</style>
      <div className="cw">
        <div className="cbox">
          <div className="chdr">
            <div className="cav"><img src={sp.img} alt={sp.nombre} /></div>
            <div>
              <div className="cnm">{sp.nombre}</div>
              <div className="crl">{sp.rol}</div>
            </div>
          </div>
          <div className="cmsgs">
            {messages.length === 0 && (
              <p className="empty">
                Tu mensaje ha llegado.<br />{sp.nombre} te responderá en breve...
              </p>
            )}
            {messages.map(msg => (
              <div key={msg.id} className={`msg ${msg.sender === 'client' ? 'mc' : 'mm'}`}>
                <div className="msn">{msg.sender === 'marcos' ? sp.nombre : name}</div>
                {msg.message}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          <div className="cinp">
            <textarea
              className="ctxt"
              placeholder="Escribe tu mensaje..."
              rows={2}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKey}
            />
            <button className="csnd" onClick={send} disabled={sending || !input.trim()}>
              ENVIAR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={null}>
      <ChatContent />
    </Suspense>
  );
}
