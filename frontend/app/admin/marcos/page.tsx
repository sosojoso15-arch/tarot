'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface Session {
  id: string;
  client_name: string;
  specialist?: string;
  minutes?: number;
  created_at: string;
  chat_messages?: { count: number }[];
}

interface Message {
  id: string;
  session_id: string;
  sender: 'client' | 'marcos';
  message: string;
  created_at: string;
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Cinzel:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap');
  *{box-sizing:border-box}html,body{margin:0;padding:0}
  .aw{min-height:100vh;background:#070f20;font-family:'Inter',sans-serif;display:flex;flex-direction:column;}
  .ahdr{background:linear-gradient(90deg,#0d1a37,#0a1530);border-bottom:1px solid rgba(214,169,87,.3);padding:14px 24px;display:flex;align-items:center;justify-content:space-between;}
  .ahdr-brand{display:flex;align-items:center;gap:14px;}
  .ahdr-brand img{height:36px;opacity:.9;}
  .ahdr-title{font-family:'Cinzel',serif;font-size:13px;letter-spacing:.2em;color:#d6a957;}
  .alogout{background:transparent;border:1px solid rgba(214,169,87,.3);color:#d6a957;padding:6px 14px;border-radius:6px;font-family:'Cinzel',serif;font-size:11px;letter-spacing:.08em;cursor:pointer;}
  .alogout:hover{background:rgba(214,169,87,.1)}
  .amain{display:flex;flex:1;height:calc(100vh - 61px);}
  .asidebar{width:280px;flex-shrink:0;border-right:1px solid rgba(214,169,87,.15);background:#0a1530;overflow-y:auto;}
  .asidebar::-webkit-scrollbar{width:3px}.asidebar::-webkit-scrollbar-thumb{background:rgba(214,169,87,.2);}
  .aside-hdr{padding:16px 18px 12px;font-family:'Cinzel',serif;font-size:11px;letter-spacing:.18em;color:#d6a957;border-bottom:1px solid rgba(214,169,87,.12);}
  .sitem{padding:14px 18px;border-bottom:1px solid rgba(255,255,255,.04);cursor:pointer;transition:background .15s;}
  .sitem:hover{background:rgba(214,169,87,.06)}
  .sitem.active{background:rgba(214,169,87,.12);border-left:2px solid #d6a957;}
  .sname{font-family:'Cormorant Garamond',serif;font-size:17px;color:#f1deae;line-height:1.1;}
  .stime{font-size:11px;color:#8a7a5a;margin-top:4px;}
  .scount{font-size:11px;color:#d6a957;margin-top:3px;}
  .achat{flex:1;display:flex;flex-direction:column;background:linear-gradient(180deg,#0b1428,#080f1e);}
  .achat-hdr{padding:16px 22px;border-bottom:1px solid rgba(214,169,87,.15);display:flex;align-items:center;gap:12px;}
  .achat-name{font-family:'Cormorant Garamond',serif;font-size:22px;color:#f1deae;}
  .aempty{flex:1;display:flex;align-items:center;justify-content:center;color:rgba(232,217,179,.25);font-family:'Cormorant Garamond',serif;font-size:18px;font-style:italic;text-align:center;padding:20px;}
  .amsgs{flex:1;overflow-y:auto;padding:18px 22px;display:flex;flex-direction:column;gap:10px;}
  .amsgs::-webkit-scrollbar{width:3px}.amsgs::-webkit-scrollbar-thumb{background:rgba(214,169,87,.2);}
  .msg{max-width:75%;padding:10px 14px;border-radius:12px;font-size:14px;line-height:1.55;}
  .mc{background:rgba(30,50,100,.5);border:1px solid rgba(100,150,255,.15);color:#b8ccee;align-self:flex-start;border-bottom-left-radius:3px;}
  .mm{background:rgba(214,169,87,.14);border:1px solid rgba(214,169,87,.28);color:#e8d9b3;align-self:flex-end;border-bottom-right-radius:3px;}
  .msn{font-size:10px;margin-bottom:4px;letter-spacing:.04em;opacity:.75;}
  .mc .msn{color:#7ea8d0}
  .mm .msn{color:#d6a957}
  .mtime{font-size:10px;opacity:.4;margin-top:4px;}
  .ainp{padding:14px 20px;border-top:1px solid rgba(214,169,87,.15);display:flex;gap:10px;background:#0a1530;}
  .atxt{flex:1;background:rgba(255,255,255,.05);border:1px solid rgba(214,169,87,.25);border-radius:8px;padding:10px 14px;color:#e8d9b3;font-size:14px;font-family:'Inter',sans-serif;outline:none;resize:none;}
  .atxt::placeholder{color:rgba(232,217,179,.3)}
  .atxt:focus{border-color:rgba(214,169,87,.5)}
  .asnd{background:linear-gradient(180deg,#c89a47,#a87a30);border:none;color:#fff8e1;padding:10px 18px;border-radius:8px;cursor:pointer;font-family:'Cinzel',serif;font-size:11px;letter-spacing:.1em;flex-shrink:0;}
  .asnd:hover{filter:brightness(1.1)}
  .asnd:disabled{opacity:.5;cursor:not-allowed}
  .nodot{width:8px;height:8px;border-radius:50%;background:#22c55e;flex-shrink:0;}
  @media(max-width:640px){.asidebar{width:100%;}.amain{flex-direction:column;}.achat{height:70vh;}}
`;

function fmt(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' }) + ' ' +
    d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}

export default function MarcosAdmin() {
  const router = useRouter();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [active, setActive] = useState<Session | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [reply, setReply] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('marcos_auth');
      if (!auth) { router.push('/login'); return; }
      setCurrentUser(auth);
    }
  }, [router]);

  const mySpecialist: Record<string, string> = {
    'marcos':   'Marcos',
    'fernando': 'Fer',
    'eli':      'Eli',
  };

  const fetchSessions = async () => {
    const res = await fetch('/api/chat/sessions');
    const data = await res.json();
    if (data.success) {
      const all: Session[] = data.data || [];
      const myName = mySpecialist[currentUser] || 'Marcos';
      setSessions(all.filter(s =>
        (s.specialist || 'Marcos').toLowerCase() === myName.toLowerCase()
      ));
    }
  };

  useEffect(() => {
    if (!currentUser) return;
    fetchSessions();
    const id = setInterval(fetchSessions, 5000);
    return () => clearInterval(id);
  }, [currentUser]);

  const fetchMessages = async (sessionId: string) => {
    const res = await fetch(`/api/chat/messages?session_id=${sessionId}`);
    const data = await res.json();
    if (data.success) setMessages(data.data || []);
  };

  useEffect(() => {
    if (!active) return;
    fetchMessages(active.id);
    const id = setInterval(() => fetchMessages(active.id), 3000);
    return () => clearInterval(id);
  }, [active?.id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const selectSession = (s: Session) => {
    setActive(s);
    setMessages([]);
  };

  const send = async () => {
    const text = reply.trim();
    if (!text || !active || sending) return;
    setReply('');
    setSending(true);
    try {
      await fetch('/api/chat/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: active.id, sender: 'marcos', message: text }),
      });
    } finally {
      setSending(false);
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const logout = () => {
    if (typeof window !== 'undefined') localStorage.removeItem('marcos_auth');
    router.push('/login');
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="aw">
        <header className="ahdr">
          <div className="ahdr-brand">
            <img src="/logo1.png" alt="Voces del Alma" />
            <span className="ahdr-title">{currentUser ? currentUser.toUpperCase() : 'PANEL'} · CONSULTAS</span>
          </div>
          <button className="alogout" onClick={logout}>SALIR</button>
        </header>

        <div className="amain">
          <aside className="asidebar">
            <div className="aside-hdr">CONSULTAS ({sessions.length})</div>
            {sessions.length === 0 && (
              <div style={{ padding: '24px 18px', color: 'rgba(232,217,179,.3)', fontSize: '13px', fontStyle: 'italic' }}>
                Aún no hay consultas
              </div>
            )}
            {sessions.map(s => (
              <div
                key={s.id}
                className={`sitem${active?.id === s.id ? ' active' : ''}`}
                onClick={() => selectSession(s)}
              >
                <div className="sname">{s.client_name}</div>
                {s.minutes && (
                  <div style={{ fontSize: '11px', color: '#d6a957', marginTop: '2px', fontWeight: 600 }}>{s.minutes} min</div>
                )}
                <div className="stime">{fmt(s.created_at)}</div>
                {s.chat_messages && s.chat_messages[0]?.count > 0 && (
                  <div className="scount">{s.chat_messages[0].count} mensaje{s.chat_messages[0].count !== 1 ? 's' : ''}</div>
                )}
              </div>
            ))}
          </aside>

          <section className="achat">
            {!active ? (
              <div className="aempty">
                Selecciona una consulta<br />para ver los mensajes
              </div>
            ) : (
              <>
                <div className="achat-hdr">
                  <div className="nodot" />
                  <div className="achat-name">{active.client_name}</div>
                  {active.minutes && (
                    <div style={{ fontSize: '12px', color: '#d6a957', marginLeft: '8px', fontWeight: 600 }}>{active.minutes} min</div>
                  )}
                  <div style={{ fontSize: '12px', color: '#8a7a5a', marginLeft: '4px' }}>· {fmt(active.created_at)}</div>
                </div>
                <div className="amsgs">
                  {messages.length === 0 && (
                    <div style={{ color: 'rgba(232,217,179,.25)', fontSize: '13px', textAlign: 'center', marginTop: '40px', fontStyle: 'italic' }}>
                      No hay mensajes aún...
                    </div>
                  )}
                  {messages.map(msg => (
                    <div key={msg.id} className={`msg ${msg.sender === 'client' ? 'mc' : 'mm'}`}>
                      <div className="msn">{msg.sender === 'marcos' ? 'Tú (Marcos)' : active.client_name}</div>
                      {msg.message}
                      <div className="mtime">{fmt(msg.created_at)}</div>
                    </div>
                  ))}
                  <div ref={bottomRef} />
                </div>
                <div className="ainp">
                  <textarea
                    className="atxt"
                    placeholder="Responder..."
                    rows={2}
                    value={reply}
                    onChange={e => setReply(e.target.value)}
                    onKeyDown={onKey}
                  />
                  <button className="asnd" onClick={send} disabled={sending || !reply.trim()}>
                    ENVIAR
                  </button>
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
