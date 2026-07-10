/* Registration / login sheet — the real account entry for GuiGui.
   Google Sign-In (preferred) on top, email + password below. Rendered inside
   the app's <BottomSheet>. Only shown when a guest tries to 记录/保存档案. */
import React from 'react';
import { Button, TextField } from '../np/ui';
import { Account } from '../types';
import { GOOGLE_CLIENT_ID, registerEmail, loginEmail, signInWithGoogle } from '../auth';

const GSI_SRC = 'https://accounts.google.com/gsi/client';
let gsiPromise: Promise<void> | null = null;
function loadGsi(): Promise<void> {
  if ((window as any).google?.accounts?.id) return Promise.resolve();
  if (gsiPromise) return gsiPromise;
  gsiPromise = new Promise<void>((resolve, reject) => {
    const s = document.createElement('script');
    s.src = GSI_SRC; s.async = true; s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('Google 登录脚本加载失败'));
    document.head.appendChild(s);
  });
  return gsiPromise;
}

function GoogleButton({ onAuthed, onError }: { onAuthed: (a: Account) => void; onError: (m: string) => void }) {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!GOOGLE_CLIENT_ID || !ref.current) return;
    let cancelled = false;
    loadGsi().then(() => {
      if (cancelled || !ref.current) return;
      const google = (window as any).google;
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (resp: { credential: string }) => {
          try { onAuthed(signInWithGoogle(resp.credential)); }
          catch (e: any) { onError(e?.message || 'Google 登录失败'); }
        },
      });
      google.accounts.id.renderButton(ref.current, { theme: 'filled_black', size: 'large', shape: 'pill', width: 300, text: 'continue_with' });
    }).catch((e) => onError(e?.message || 'Google 登录不可用'));
    return () => { cancelled = true; };
  }, [onAuthed, onError]);

  if (!GOOGLE_CLIENT_ID) {
    return (
      <div style={{ borderRadius: 'var(--r-pill)', border: '1px dashed var(--line)', background: 'var(--surface)', color: 'var(--dim)', fontSize: 12, textAlign: 'center', padding: '13px 12px', lineHeight: 1.6 }}>
        用 Google 继续 · 待配置<br />
        <span style={{ fontSize: 10.5 }}>设置 VITE_GOOGLE_CLIENT_ID 后自动启用</span>
      </div>
    );
  }
  return <div ref={ref} style={{ display: 'flex', justifyContent: 'center', minHeight: 44 }} />;
}

export function AuthSheet({ intro, onAuthed, onClose }: { intro?: string; onAuthed: (a: Account) => void; onClose: () => void }) {
  const [mode, setMode] = React.useState<'register' | 'login'>('register');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const [err, setErr] = React.useState('');

  const submit = async () => {
    if (busy) return;
    setErr(''); setBusy(true);
    try {
      const a = mode === 'register' ? await registerEmail(email, password, name) : await loginEmail(email, password);
      onAuthed(a);
    } catch (e: any) {
      setErr(e?.message || '操作失败');
    }
    setBusy(false);
  };

  return (
    <div style={{ maxHeight: 'min(82vh, 660px)', overflowY: 'auto', margin: '0 -4px', padding: '0 4px' }}>
      <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--lilac)' }}>{mode === 'register' ? '注册账号' : '登录账号'}</div>
      <div style={{ fontSize: 19, fontWeight: 700, color: 'var(--ink)', marginTop: 6, lineHeight: 1.35 }}>
        {mode === 'register' ? '记录你的护肤档案' : '欢迎回来'}
      </div>
      <div style={{ fontSize: 12.5, lineHeight: 1.7, color: 'var(--muted)', marginTop: 6 }}>
        {intro || '注册后即可保存你的肤质档案和化妆柜，下次打开自动带回。浏览、扫码、问 AI 无需注册。'}
      </div>

      <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <GoogleButton onAuthed={onAuthed} onError={setErr} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--dim)', fontSize: 11 }}>
          <div style={{ flex: 1, height: 1, background: 'var(--line)' }} /> 或用邮箱 <div style={{ flex: 1, height: 1, background: 'var(--line)' }} />
        </div>

        {mode === 'register' && (
          <TextField label="昵称 (可选)" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} placeholder="怎么称呼你" />
        )}
        <TextField label="邮箱" type="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder="you@example.com" />
        <TextField label="密码 (至少 6 位)" type="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} placeholder="••••••" />

        {err && <div style={{ fontSize: 12, color: 'var(--rose)', background: 'var(--tint-rose)', border: '1px solid var(--border-rose)', borderRadius: 12, padding: '9px 12px' }}>{err}</div>}

        <Button style={{ width: '100%' }} disabled={busy} onClick={submit}>
          {busy ? '处理中…' : mode === 'register' ? '注册并保存档案 ✓' : '登录'}
        </Button>

        <button onClick={() => { setErr(''); setMode(mode === 'register' ? 'login' : 'register'); }} style={{ font: 'inherit', background: 'none', border: 'none', color: 'var(--muted)', fontSize: 12, cursor: 'pointer', padding: 4 }}>
          {mode === 'register' ? '已有账号？去登录' : '还没有账号？去注册'}
        </button>
      </div>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 12, padding: '10px 12px', marginTop: 12, fontSize: 10.5, lineHeight: 1.7, color: 'var(--dim)' }}>
        账号与档案仅保存在本机浏览器（localStorage）。密码经 PBKDF2 加密后存储，不以明文保存。
      </div>
    </div>
  );
}
