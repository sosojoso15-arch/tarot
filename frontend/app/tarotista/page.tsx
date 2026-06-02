'use client';

import { useState, useEffect, useRef } from 'react';

const NOMBRES = ['Paqui','Gloria','Marian','Paulina','Mercedes','Marcos','Minerva','Verónica','Yeyo'];

interface Session {
  id: string;
  minutes: number;
  created_at: string;
  status: string;
  session_code: string;
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Cinzel:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap');
  *{box-sizing:border-box}html,body{margin:0;padding:0}
  .tw{min-height:100vh;background:radial-gradient(900px 600px at 50% 0%,rgba(183,138,60,.1),transparent 70%),#0a1530;font-family:'Inter',sans-serif;padding:28px 18px 40px;display:flex;flex-direction:column;align-items:center;}
  .tlogo{width:140px;margin-bottom:24px;opacity:.85;}
  .tbox{width:100%;max-width:440px;background:linear-gradient(180deg,#0d1a37,#0a1530);border:1px solid rgba(214,169,87,.3);border-radius:12px;padding:26px;margin-bottom:14px;}
  .ttit{font-family:'Cinzel',serif;font-size:11px;letter-spacing:.22em;color:#d6a957;margin:0 0 16px;display:flex;align-items:center;gap:10px;}
  .ttit::after{content:"";flex:1;height:1px;background:rgba(214,169,87,.2);}
  select.tsel{width:100%;background:rgba(255,255,255,.05);border:1px solid rgba(214,169,87,.3);border-radius:8px;padding:12px 14px;color:#e8d9b3;font-size:15px;font-family:'Inter',sans-serif;outline:none;margin-bottom:14px;appearance:none;}
  .tbtn{width:100%;background:linear-gradient(180deg,#c89a47,#a87a30);border:none;color:#fff8e1;padding:13px;border-radius:8px;font-family:'Cinzel',serif;font-size:13px;letter-spacing:.1em;cursor:pointer;}
  .tbtn:hover{filter:brightness(1.08)}
  .scard{width:100%;max-width:440px;background:linear-gradient(180deg,#0d1a37,#0a1530);border:1px solid rgba(214,169,87,.25);border-radius:10px;padding:18px 20px;margin-bottom:10px;}
  .scard-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;}
  .smin{font-family:'Cormorant Garamond',serif;font-size:32px;color:#f1deae;line-height:1;}
  .smin span{font-size:16px;color:#d6c08a;margin-left:4px;}
  .scode{font-size:11px;color:#8a7a5a;margin-top:2px;}
  .stime{font-size:11px;color:#8a7a5a;}
  .timer-display{font-family:'Cinzel',serif;font-size:42px;color:#d6a957;text-align:center;margin:12px 0;letter-spacing:.06em;}
  .timer-display.urgent{color:#ef4444;animation:pulse 1s infinite;}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
  .timer-bar{height:6px;background:rgba(255,255,255,.08);border-radius:3px;overflow:hidden;margin-bottom:12px;}
  .timer-fill{height:100%;background:linear-gradient(90deg,#22c55e,#d6a957);border-radius:3px;transition:width .5s;}
  .timer-fill.urgent{background:linear-gradient(90deg,#ef4444,#f97316);}
  .sbtn{width:100%;background:linear-gradient(180deg,#c89a47,#a87a30);border:none;color:#fff8e1;padding:11px;border-radius:8px;font-family:'Cinzel',serif;font-size:12px;letter-spacing:.1em;cursor:pointer;}
  .sbtn.stop{background:linear-gradient(180deg,#dc2626,#991b1b);}
  .sbtn:hover{filter:brightness(1.1)}
  .sempty{color:rgba(232,217,179,.35);font-size:13px;text-align:center;font-style:italic;margin:20px 0;}
  .alert-banner{width:100%;max-width:440px;background:linear-gradient(90deg,#dc2626,#991b1b);border-radius:10px;padding:16px 20px;text-align:center;color:#fff;font-family:'Cinzel',serif;font-size:14px;letter-spacing:.08em;margin-bottom:10px;animation:pulse 1s infinite;}
  .status-badge{display:inline-block;padding:3px 8px;border-radius:4px;font-size:10px;letter-spacing:.06em;}
  .status-ok{background:rgba(34,197,94,.15);color:#22c55e;border:1px solid rgba(34,197,94,.3);}
  .status-pending{background:rgba(234,179,8,.15);color:#eab308;border:1px solid rgba(234,179,8,.3);}
`;

function fmt(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
}

export default function TarotistaPage() {
  const [nombre, setNombre] = useState('');
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(false);
  const [timers, setTimers] = useState<Record<string, number | null>>({});
  const [running, setRunning] = useState<Record<string, boolean>>({});
  const [finished, setFinished] = useState<Record<string, boolean>>({});
  const intervals = useRef<Record<string, ReturnType<typeof setInterval>>>({});

  const load = async () => {
    if (!nombre) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/tarotista/sessions?nombre=${encodeURIComponent(nombre)}`);
      const data = await res.json();
      if (data.success) setSessions(data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (nombre) load();
  }, [nombre]);

  // Poll every 30s for new sessions
  useEffect(() => {
    if (!nombre) return;
    const id = setInterval(load, 30000);
    return () => clearInterval(id);
  }, [nombre]);

  const startTimer = (sessionId: string, minutes: number) => {
    const total = minutes * 60;
    setTimers(t => ({ ...t, [sessionId]: total }));
    setRunning(r => ({ ...r, [sessionId]: true }));
    setFinished(f => ({ ...f, [sessionId]: false }));

    intervals.current[sessionId] = setInterval(() => {
      setTimers(prev => {
        const cur = prev[sessionId];
        if (cur === null || cur === undefined) return prev;
        if (cur <= 1) {
          clearInterval(intervals.current[sessionId]);
          setRunning(r => ({ ...r, [sessionId]: false }));
          setFinished(f => ({ ...f, [sessionId]: true }));
          return { ...prev, [sessionId]: 0 };
        }
        return { ...prev, [sessionId]: cur - 1 };
      });
    }, 1000);
  };

  const stopTimer = (sessionId: string) => {
    clearInterval(intervals.current[sessionId]);
    setRunning(r => ({ ...r, [sessionId]: false }));
    setTimers(t => ({ ...t, [sessionId]: null }));
  };

  const totalSecs = (minutes: number) => minutes * 60;
  const pct = (sessionId: string, minutes: number) => {
    const cur = timers[sessionId];
    if (cur === null || cur === undefined) return 100;
    return (cur / totalSecs(minutes)) * 100;
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="tw">
        <img src="/logo1.png" alt="Voces del Alma" className="tlogo" />

        {/* Selector */}
        <div className="tbox">
          <p className="ttit">MI PANEL</p>
          <select className="tsel" value={nombre} onChange={e => setNombre(e.target.value)}>
            <option value="">— Selecciona tu nombre —</option>
            {NOMBRES.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          {nombre && <button className="tbtn" onClick={load}>{loading ? 'CARGANDO...' : 'ACTUALIZAR'}</button>}
        </div>

        {/* Sessions */}
        {nombre && !loading && sessions.length === 0 && (
          <p className="sempty">No hay consultas recientes (últimas 24h)</p>
        )}

        {sessions.map(s => (
          <div key={s.id}>
            {finished[s.id] && (
              <div className="alert-banner">⏰ ¡TIEMPO TERMINADO! · {s.minutes} MIN</div>
            )}
            <div className="scard">
              <div className="scard-top">
                <div>
                  <div className="smin">{s.minutes}<span>min</span></div>
                  <div className="scode">Código: {s.session_code}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="stime">{fmtDate(s.created_at)}</div>
                  <span className={`status-badge ${s.status === 'confirmed' || s.status === 'completed' ? 'status-ok' : 'status-pending'}`}>
                    {s.status === 'confirmed' || s.status === 'completed' ? 'PAGADO' : 'PENDIENTE'}
                  </span>
                </div>
              </div>

              {running[s.id] && timers[s.id] !== null && (
                <>
                  <div className={`timer-display${(timers[s.id] || 0) < 60 ? ' urgent' : ''}`}>
                    {fmt(timers[s.id] || 0)}
                  </div>
                  <div className="timer-bar">
                    <div className={`timer-fill${(timers[s.id] || 0) < 60 ? ' urgent' : ''}`}
                      style={{ width: `${pct(s.id, s.minutes)}%` }} />
                  </div>
                  <button className="sbtn stop" onClick={() => stopTimer(s.id)}>DETENER</button>
                </>
              )}

              {!running[s.id] && !finished[s.id] && (
                <button className="sbtn" onClick={() => startTimer(s.id, s.minutes)}>
                  ▶ INICIAR TEMPORIZADOR · {s.minutes} MIN
                </button>
              )}

              {finished[s.id] && (
                <button className="sbtn" onClick={() => startTimer(s.id, s.minutes)}>
                  ↺ REINICIAR
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
