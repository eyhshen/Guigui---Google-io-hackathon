/* 夜虹 Night Prism — DS primitives ported to TSX from the Claude Design project
   (4de317c9). Inline CSS-var styles preserved verbatim; tokens live in index.css. */
import React from 'react';
import * as Lucide from 'lucide-react';

type S = React.CSSProperties;

/* name → lucide-react icon, mirroring the design's window.Icon({name}) helper */
export function Icon({ name, size = 20, style }: { name: string; size?: number; style?: S }) {
  const Cmp = (Lucide as Record<string, any>)[name];
  if (!Cmp) return <span style={{ display: 'inline-block', width: size, height: size, ...style }} />;
  return <Cmp size={size} style={style} />;
}

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";
const BEAM_GRAD =
  'linear-gradient(105deg,rgba(240,138,155,.85),rgba(245,195,119,.8) 25%,rgba(167,232,192,.75) 50%,rgba(146,196,242,.8) 75%,rgba(199,168,240,.85))';

export function PrismBackground({ animate = true, absolute = true }: { animate?: boolean; absolute?: boolean }) {
  const pos = absolute ? 'absolute' : 'fixed';
  return (
    <>
      <style>{`
        @keyframes np-drift-a { to { transform: rotate(-14deg) translate(-24px,18px); } }
        @keyframes np-drift-b { to { transform: rotate(18deg) translate(30px,-14px); } }
        @media (prefers-reduced-motion: reduce) { .np-beam { animation: none !important; } }
      `}</style>
      <div className="np-beam" aria-hidden style={{
        position: pos, zIndex: 0, pointerEvents: 'none',
        filter: 'blur(var(--beam-blur, 30px))', opacity: 'var(--beam-opacity-a, .42)' as any,
        background: BEAM_GRAD, top: -60, right: 'max(-100px, calc(50% - 320px))',
        width: 300, height: 210, transform: 'rotate(-18deg)', borderRadius: 48,
        animation: animate ? 'np-drift-a var(--dur-beam-a, 26s) ease-in-out infinite alternate' : 'none',
      }} />
      <div className="np-beam" aria-hidden style={{
        position: pos, zIndex: 0, pointerEvents: 'none',
        filter: 'blur(var(--beam-blur, 30px))', opacity: 'var(--beam-opacity-b, .24)' as any,
        background: BEAM_GRAD, bottom: '8%', left: 'max(-130px, calc(50% - 330px))',
        width: 280, height: 170, transform: 'rotate(14deg)', borderRadius: 48,
        animation: animate ? 'np-drift-b var(--dur-beam-b, 32s) ease-in-out infinite alternate' : 'none',
      }} />
      <div aria-hidden style={{
        position: pos, inset: 0, zIndex: 90, pointerEvents: 'none',
        opacity: 'var(--grain-opacity, .28)' as any, mixBlendMode: 'overlay',
        backgroundImage: GRAIN, backgroundSize: '220px 220px',
      }} />
    </>
  );
}

const GLYPHS: Record<string, React.ReactNode> = {
  pump: (<><path d="M20 6 h12 v4 h-8 v4 h-4 z" opacity=".85" /><rect x="21" y="14" width="7" height="7" opacity=".6" /><rect x="13" y="21" width="23" height="38" rx="5" /><rect x="17" y="34" width="15" height="13" rx="2" fill="#fff" opacity=".28" /></>),
  dropper: (<><circle cx="24" cy="7" r="4.5" opacity=".85" /><rect x="20" y="10" width="8" height="12" rx="2.5" opacity=".6" /><rect x="14" y="24" width="20" height="35" rx="5" /><rect x="18" y="36" width="12" height="12" rx="2" fill="#fff" opacity=".28" /></>),
  jar: (<><rect x="12" y="18" width="24" height="9" rx="3" opacity=".85" /><rect x="9" y="29" width="30" height="30" rx="7" /><rect x="14" y="38" width="20" height="10" rx="2" fill="#fff" opacity=".28" /></>),
  tube: (<><rect x="18" y="6" width="12" height="8" rx="2" opacity=".85" /><path d="M16 16 h16 l2 36 a6 6 0 0 1 -6 7 h-8 a6 6 0 0 1 -6 -7 z" /><rect x="19" y="30" width="10" height="14" rx="2" fill="#fff" opacity=".28" /></>),
  stick: (<><rect x="16" y="8" width="16" height="11" rx="3" opacity=".85" /><rect x="18" y="21" width="12" height="38" rx="4" /><rect x="21" y="30" width="6" height="16" rx="2" fill="#fff" opacity=".28" /></>),
  spray: (<><path d="M13 8 h11 v4 h-7 v3 h-4 z" opacity=".85" /><rect x="20" y="7" width="10" height="4" rx="1" opacity=".6" /><rect x="18" y="15" width="8" height="7" opacity=".6" /><rect x="14" y="22" width="20" height="37" rx="6" /><rect x="18" y="34" width="12" height="14" rx="2" fill="#fff" opacity=".28" /></>),
  bottle: (<><rect x="19" y="6" width="10" height="6" rx="1.5" opacity=".85" /><rect x="20.5" y="12" width="7" height="6" opacity=".6" /><path d="M15 20 q9 -4 18 0 v33 a6 6 0 0 1 -6 6 h-6 a6 6 0 0 1 -6 -6 z" /><rect x="19" y="32" width="10" height="14" rx="2" fill="#fff" opacity=".28" /></>),
};

const CAT: Record<string, { glyph: string; a: string; b: string }> = {
  serum: { glyph: 'dropper', a: '#A7E8C0', b: '#4E8A68' },
  toner: { glyph: 'bottle', a: '#92C4F2', b: '#5D7FB0' },
  moisturizer: { glyph: 'jar', a: '#92C4F2', b: '#5D7FB0' },
  cream: { glyph: 'jar', a: '#C7A8F0', b: '#8465B8' },
  lotion: { glyph: 'pump', a: '#92C4F2', b: '#5D7FB0' },
  sunscreen: { glyph: 'tube', a: '#F5C377', b: '#B98A45' },
  cleanser: { glyph: 'pump', a: '#92C4F2', b: '#5D7FB0' },
  treatment: { glyph: 'dropper', a: '#C7A8F0', b: '#8465B8' },
  makeup: { glyph: 'stick', a: '#F5C0CB', b: '#B06E85' },
  ghost: { glyph: 'dropper', a: '#4A465C', b: '#332F45' },
};

function darken(hex: string, amt = 0.42) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
  if (!m) return hex;
  const n = parseInt(m[1], 16);
  const r = Math.round(((n >> 16) & 255) * (1 - amt));
  const g = Math.round(((n >> 8) & 255) * (1 - amt));
  const b = Math.round((n & 255) * (1 - amt));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

let uid = 0;
export function BottleGlyph({ shape, category = 'serum', colorHex, height = 52, style }: { shape?: string; category?: string; colorHex?: string; height?: number; style?: S }) {
  const idRef = React.useRef<string | null>(null);
  if (idRef.current === null) idRef.current = 'np-bg-' + ++uid;
  const cat = CAT[String(category).toLowerCase()] || CAT.serum;
  const glyph = shape && GLYPHS[shape] ? shape : cat.glyph;
  const a = colorHex || cat.a;
  const b = colorHex ? darken(colorHex) : cat.b;
  const w = Math.round(height * (48 / 64));
  return (
    <svg viewBox="0 0 48 64" width={w} height={height} aria-hidden style={style}>
      <defs>
        <linearGradient id={idRef.current} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
      </defs>
      <g fill={`url(#${idRef.current})`}>{GLYPHS[glyph]}</g>
    </svg>
  );
}

export type TabItem = { key: string; label: string; icon: React.ReactNode };
export function TabBar({ items = [], value, onChange, style, showLabels = true }: { items?: TabItem[]; value?: string; onChange?: (k: string) => void; style?: S; showLabels?: boolean }) {
  return (
    <nav style={{
      display: 'flex', alignItems: 'stretch',
      background: 'linear-gradient(180deg, rgba(22,20,31,.4), var(--bg) 70%)',
      borderTop: '1px solid var(--line)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      padding: '10px 8px calc(10px + var(--sab))', ...style,
    }}>
      {items.map((it) => {
        const active = it.key === value;
        return (
          <button key={it.key} onClick={() => onChange && onChange(it.key)} aria-current={active} aria-label={it.label}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', color: active ? 'var(--ink)' : 'var(--dim)', transition: '.18s', WebkitTapHighlightColor: 'transparent' } as S}>
            <span style={{ display: 'grid', placeItems: 'center', height: 22, opacity: active ? 1 : 0.8 }}>{it.icon}</span>
            {showLabels && it.label ? <span style={{ fontSize: 9.5, fontWeight: active ? 700 : 500, letterSpacing: '.02em' }}>{it.label}</span> : null}
            <i style={{ width: 14, height: 3, borderRadius: 99, marginTop: 1, background: active ? 'var(--prism)' : 'transparent' }} />
          </button>
        );
      })}
    </nav>
  );
}

export function Button({ variant = 'prism', disabled = false, children, style, ...rest }: { variant?: 'prism' | 'ghost'; disabled?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const [down, setDown] = React.useState(false);
  const isPrism = variant === 'prism';
  return (
    <button {...rest} disabled={disabled}
      onPointerDown={(e) => { setDown(true); rest.onPointerDown && rest.onPointerDown(e); }}
      onPointerUp={(e) => { setDown(false); rest.onPointerUp && rest.onPointerUp(e); }}
      onPointerLeave={(e) => { setDown(false); rest.onPointerLeave && rest.onPointerLeave(e); }}
      style={{
        font: 'inherit', fontFamily: 'var(--font-ui)', cursor: disabled ? 'default' : 'pointer',
        borderRadius: 'var(--r-pill)', minHeight: 'var(--hit-btn)', padding: '0 22px',
        letterSpacing: isPrism ? '.08em' : '.02em', fontSize: isPrism ? 15 : 12.5, fontWeight: isPrism ? 700 : 600,
        lineHeight: 1.3, color: isPrism ? 'var(--on-prism)' : 'var(--ink)', background: isPrism ? 'var(--prism)' : 'var(--surface)',
        border: isPrism ? 'none' : '1px solid rgba(255,255,255,.25)', boxShadow: isPrism && !disabled ? 'var(--glow-prism)' : 'none',
        opacity: disabled ? 0.38 : 1, transform: down && !disabled ? 'scale(.97)' : 'none',
        transition: 'transform .15s ease, background .2s ease', WebkitTapHighlightColor: 'transparent', ...style,
      } as S}>
      {children}
    </button>
  );
}

const CHIP_TONES: Record<string, { text: string; border: string; fill: string; glow: string }> = {
  rose: { text: '#FBD3DA', border: 'var(--rose)', fill: 'rgba(240,138,155,.16)', glow: 'var(--glow-rose)' },
  mint: { text: 'var(--ink-on-mint)', border: 'var(--mint)', fill: 'rgba(167,232,192,.14)', glow: '0 0 18px -2px rgba(167,232,192,.45)' },
  amber: { text: 'var(--ink-on-amber)', border: 'var(--amber)', fill: 'rgba(245,195,119,.14)', glow: '0 0 18px -2px rgba(245,195,119,.45)' },
  blue: { text: 'var(--ink-on-blue)', border: 'var(--blue)', fill: 'rgba(146,196,242,.16)', glow: '0 0 18px -2px rgba(146,196,242,.45)' },
  lilac: { text: 'var(--ink-on-lilac)', border: 'var(--lilac)', fill: 'rgba(199,168,240,.16)', glow: '0 0 18px -2px rgba(199,168,240,.45)' },
};
export function Chip({ active = false, tone = 'rose', disabled = false, children, style, ...rest }: { active?: boolean; tone?: string; disabled?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const t = CHIP_TONES[tone] || CHIP_TONES.rose;
  return (
    <button {...rest} disabled={disabled} aria-pressed={active}
      style={{
        font: 'inherit', fontFamily: 'var(--font-ui)', cursor: disabled ? 'default' : 'pointer', borderRadius: 'var(--r-pill)',
        minHeight: 'var(--hit-chip)', padding: '10px 15px', fontSize: 12.5, fontWeight: active ? 700 : 500,
        color: active ? t.text : 'var(--ink-soft)', background: active ? t.fill : 'var(--surface)',
        border: `1px solid ${active ? t.border : 'rgba(255,255,255,.2)'}`, boxShadow: active ? t.glow : 'none',
        opacity: disabled ? 0.38 : 1, transition: '.2s', WebkitTapHighlightColor: 'transparent', ...style,
      } as S}>
      {children}
    </button>
  );
}

const CARD_TINTS: Record<string, { bg: string; border: string; color: string }> = {
  glass: { bg: 'var(--surface)', border: 'var(--line)', color: 'var(--muted)' },
  mint: { bg: 'var(--tint-mint)', border: 'var(--border-mint)', color: 'var(--ink-on-mint)' },
  rose: { bg: 'var(--tint-rose)', border: 'var(--border-rose)', color: 'var(--ink-on-rose)' },
  amber: { bg: 'var(--tint-amber)', border: 'var(--border-amber)', color: 'var(--ink-on-amber)' },
  blue: { bg: 'var(--tint-blue)', border: 'var(--border-blue)', color: 'var(--ink-on-blue)' },
  lilac: { bg: 'var(--tint-lilac)', border: 'var(--border-lilac)', color: 'var(--ink-on-lilac)' },
};
export function Card({ tone = 'glass', size = 'md', glow = false, children, style, ...rest }: { tone?: string; size?: 'sm' | 'md'; glow?: boolean } & React.HTMLAttributes<HTMLDivElement>) {
  const t = CARD_TINTS[tone] || CARD_TINTS.glass;
  const glows: Record<string, string> = { mint: 'var(--glow-mint)', lilac: 'var(--glow-lilac)', rose: 'var(--glow-rose)', amber: '0 0 26px -8px rgba(245,195,119,.4)', blue: '0 0 26px -8px rgba(146,196,242,.4)', glass: 'none' };
  return (
    <div {...rest} style={{
      borderRadius: size === 'sm' ? 'var(--r-card-sm)' : 'var(--r-card)', padding: size === 'sm' ? '12px 14px' : 'var(--card-pad)',
      background: t.bg, border: `1px solid ${t.border}`, color: t.color, fontSize: 'var(--body-size)', lineHeight: 'var(--body-lh)' as any,
      fontFamily: 'var(--font-ui)', boxShadow: glow ? glows[tone] : 'none', position: 'relative', ...style,
    } as S}>
      {children}
    </div>
  );
}

export function BottomSheet({ open = false, onClose, children }: { open?: boolean; onClose?: () => void; children?: React.ReactNode }) {
  return (
    <div role="dialog" aria-modal style={{ position: 'fixed', inset: 0, zIndex: 100, pointerEvents: open ? 'auto' : 'none' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'var(--mask)', backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)', opacity: open ? 1 : 0, transition: 'opacity .25s' } as S} />
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, maxWidth: 'var(--page-max)', margin: '0 auto', boxSizing: 'border-box',
        borderRadius: 'var(--r-sheet) var(--r-sheet) 0 0', background: 'var(--sheet-grad)', border: '1px solid var(--line)', borderBottom: 0,
        padding: '10px 22px calc(24px + var(--sab))', transform: open ? 'none' : 'translateY(102%)',
        transition: 'transform var(--dur-sheet) var(--ease-sheet)', fontFamily: 'var(--font-ui)', color: 'var(--ink)',
      }}>
        <div style={{ width: 40, height: 4, borderRadius: 99, background: 'rgba(255,255,255,.22)', margin: '2px auto 16px' }} />
        {children}
      </div>
    </div>
  );
}

export function Toast({ show = false, children, style }: { show?: boolean; children?: React.ReactNode; style?: S }) {
  return (
    <div role="status" style={{
      position: 'fixed', left: '50%', bottom: 'calc(96px + var(--sab))',
      transform: show ? 'translateX(-50%)' : 'translateX(-50%) translateY(20px)', zIndex: 120,
      background: 'var(--toast-bg)', border: '1px solid var(--line)', color: 'var(--ink)', fontSize: 13, fontWeight: 500,
      fontFamily: 'var(--font-ui)', padding: '11px 20px', borderRadius: 'var(--r-pill)', opacity: show ? 1 : 0,
      pointerEvents: 'none', transition: '.28s', maxWidth: '86%', boxShadow: 'var(--shadow-toast)', textAlign: 'center', whiteSpace: 'nowrap', ...style,
    } as S}>
      {children}
    </div>
  );
}

export type Segment = string | { value: string; label: string };
export function SegmentedControl({ options = [], value, onChange, name, style }: { options?: Segment[]; value?: string; onChange?: (v: string) => void; name?: string; style?: S }) {
  const opts = options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o));
  return (
    <div style={{ display: 'flex', gap: 4, padding: 4, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--r-card-sm)', ...style }}>
      {opts.map((o) => {
        const active = o.value === value;
        return (
          <button key={o.value} type="button" aria-pressed={active} onClick={() => onChange && onChange(o.value)}
            style={{ flex: 1, font: 'inherit', fontSize: 12.5, cursor: 'pointer', padding: '9px 6px', borderRadius: 11, transition: '.18s', fontWeight: active ? 700 : 500, whiteSpace: 'nowrap', border: `1px solid ${active ? 'var(--line)' : 'transparent'}`, color: active ? 'var(--ink)' : 'var(--muted)', background: active ? 'var(--surface-2)' : 'transparent' }}>{o.label}</button>
        );
      })}
      {name ? <input type="hidden" name={name} value={value || ''} /> : null}
    </div>
  );
}

export function TextField({ label, type = 'text', name, value, defaultValue, onChange, placeholder, min, max, step, required, inputMode, autoComplete = 'off', style }: any) {
  const [focus, setFocus] = React.useState(false);
  return (
    <label style={{ display: 'block', ...style }}>
      {label ? <span style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 6 }}>{label}</span> : null}
      <input type={type} name={name} value={value} defaultValue={defaultValue} onChange={onChange} placeholder={placeholder} min={min} max={max} step={step} required={required} inputMode={inputMode} autoComplete={autoComplete}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        style={{ width: '100%', boxSizing: 'border-box', font: 'inherit', fontSize: 13, color: 'var(--ink)', background: 'var(--surface)', border: `1px solid ${focus ? 'var(--border-lilac)' : 'var(--line)'}`, borderRadius: 'var(--r-card-sm)', padding: '12px 14px', boxShadow: focus ? 'var(--glow-lilac)' : 'none', transition: '.18s', fontVariantNumeric: 'tabular-nums' }} />
    </label>
  );
}

export function Textarea({ value, onChange, placeholder, onSubmit, rows = 1, disabled, style }: any) {
  const [focus, setFocus] = React.useState(false);
  return (
    <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows} disabled={disabled}
      onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
      onKeyDown={(e: React.KeyboardEvent) => { if (onSubmit && e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onSubmit(); } }}
      style={{ flex: 1, width: '100%', boxSizing: 'border-box', font: 'inherit', fontSize: 13, lineHeight: 1.6, color: 'var(--ink)', background: 'var(--surface)', resize: 'none', border: `1px solid ${focus ? 'var(--border-lilac)' : 'var(--line)'}`, borderRadius: 'var(--r-card-sm)', padding: '13px 15px', boxShadow: focus ? 'var(--glow-lilac)' : 'none', transition: '.18s', ...style }} />
  );
}

export function EvidenceTag({ children, style }: { children?: React.ReactNode; style?: S }) {
  return (
    <span style={{
      fontSize: 9, fontWeight: 700, borderRadius: 'var(--r-pill)', padding: '2px 8px', letterSpacing: '.06em',
      color: 'var(--mint)', border: '1px solid rgba(167,232,192,.4)', whiteSpace: 'nowrap', fontFamily: 'var(--font-ui)', display: 'inline-block', ...style,
    }}>
      {children}
    </span>
  );
}

export function PaoMeter({ opened = 0, pao = 12, showLabel = true, warn = true, style }: { opened?: number; pao?: number; showLabel?: boolean; warn?: boolean; style?: S }) {
  const left = Math.max(0, pao - opened);
  const pct = Math.max(4, Math.min(100, (left / pao) * 100));
  return (
    <div style={{ fontFamily: 'var(--font-ui)', ...style }}>
      {showLabel ? (
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--muted)', marginBottom: 7, fontVariantNumeric: 'tabular-nums' }}>
          <span>开封 {opened} 个月 · PAO {pao} 个月</span>
          <b style={{ color: 'var(--ink)' }}>还剩约 {left} 个月</b>
        </div>
      ) : null}
      <div style={{ height: 7, borderRadius: 'var(--r-pill)', background: 'var(--surface-2)', overflow: 'hidden' }}>
        <i style={{ display: 'block', height: '100%', borderRadius: 'var(--r-pill)', background: 'linear-gradient(90deg, var(--mint), var(--amber))', width: pct + '%' }} />
      </div>
      {warn && left <= 2 ? (
        <div style={{ marginTop: 8, fontSize: 11.5, color: '#FFFFFF', background: '#FF000017', border: '1px solid var(--border-amber)', borderRadius: 12, padding: 5, lineHeight: 1.6, textAlign: 'center' }}>⏳ 快到开封保质期了。优先用它，别浪费。</div>
      ) : null}
    </div>
  );
}
