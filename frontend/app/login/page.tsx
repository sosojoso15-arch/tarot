'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Cinzel:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap');
  *{box-sizing:border-box}html,body{margin:0;padding:0}
  .lw{min-height:100vh;background:radial-gradient(900px 600px at 50% 0%,rgba(183,138,60,.1),transparent 70%),#0a1530;font-family:'Inter',sans-serif;display:flex;align-items:center;justify-content:center;padding:20px;}
  .lbox{width:100%;max-width:360px;background:linear-gradient(180deg,#0d1a37,#0a1530);border:1px solid rgba(214,169,87,.35);border-radius:12px;padding:40px 32px;box-shadow:0 24px 60px rgba(0,0,0,.5);}
  .ltit{font-family:'Cormorant Garamond',serif;font-size:28px;color:#f1deae;margin:0 0 6px;text-align:center;}
  .lsub{font-size:12px;color:#d6c08a;letter-spacing:.08em;text-align:center;margin:0 0 32px;}
  .lfield{margin-bottom:14px;}
  .lfield label{display:block;font-size:11px;color:#d6a957;letter-spacing:.08em;margin-bottom:6px;}
  .linp{width:100%;background:rgba(255,255,255,.05);border:1px solid rgba(214,169,87,.28);border-radius:8px;padding:12px 14px;color:#e8d9b3;font-size:14px;font-family:'Inter',sans-serif;outline:none;}
  .linp::placeholder{color:rgba(232,217,179,.3)}
  .linp:focus{border-color:rgba(214,169,87,.55)}
  .lbtn{width:100%;background:linear-gradient(180deg,#c89a47,#a87a30);border:none;color:#fff8e1;padding:14px;border-radius:8px;font-family:'Cinzel',serif;font-size:13px;letter-spacing:.12em;cursor:pointer;margin-top:8px;box-shadow:0 6px 20px rgba(168,122,48,.3);}
  .lbtn:hover{filter:brightness(1.08)}
  .lerr{background:rgba(220,38,38,.12);border:1px solid rgba(220,38,38,.3);border-radius:6px;padding:10px 14px;color:#fca5a5;font-size:13px;text-align:center;margin-top:14px;}
`;

export default function LoginPage() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const USERS: Record<string, string> = {
    'marcos':   'alma2026',
    'fernando': 'lema2026',
    'eli':      'akasha2026',
  };

  const login = () => {
    setError('');
    const key = user.trim().toLowerCase();
    if (USERS[key] && USERS[key] === pass) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('marcos_auth', key);
      }
      router.push('/admin/marcos');
    } else {
      setError('Credenciales incorrectas');
    }
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') login();
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="lw">
        <div className="lbox">
          <img src="/logo1.png" alt="Voces del Alma" style={{ width: '160px', display: 'block', margin: '0 auto 28px', opacity: .85 }} />
          <h2 className="ltit">Acceso</h2>
          <p className="lsub">PANEL DE CONSULTAS</p>
          <div className="lfield">
            <label>USUARIO</label>
            <input
              className="linp"
              type="text"
              placeholder="usuario"
              value={user}
              onChange={e => setUser(e.target.value)}
              onKeyDown={onKey}
              autoFocus
            />
          </div>
          <div className="lfield">
            <label>CONTRASEÑA</label>
            <input
              className="linp"
              type="password"
              placeholder="••••••••"
              value={pass}
              onChange={e => setPass(e.target.value)}
              onKeyDown={onKey}
            />
          </div>
          <button className="lbtn" onClick={login}>ENTRAR</button>
          {error && <div className="lerr">{error}</div>}
        </div>
      </div>
    </>
  );
}
