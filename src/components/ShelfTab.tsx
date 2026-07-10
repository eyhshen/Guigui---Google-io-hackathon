/* Home / shelf screen — ported from design ui_kits/shelfie/ShelfieShelf.jsx.
   Fading 晚安 greeting over an opaque 我的架子 panel with grid/list toggle. */
import React from 'react';
import { Product } from '../types';
import { expiryStatus } from '../data';
import { Icon, BottleGlyph } from '../np/ui';
import { ProfileCompletionPrompt, AccountPromptCard } from './prompts';

type S = React.CSSProperties;

function tagStyle(tone: 'rose' | 'amber'): { bg: string; bd: string; tx: string } {
  return tone === 'rose'
    ? { bg: 'var(--tint-rose)', bd: 'var(--border-rose)', tx: 'var(--ink-on-rose)' }
    : { bg: 'var(--tint-amber)', bd: 'var(--border-amber)', tx: 'var(--ink-on-amber)' };
}
const inlineBadge = (tone: 'rose' | 'amber'): S => { const c = tagStyle(tone); return { flex: 'none', fontSize: 9, fontWeight: 700, color: c.tx, background: c.bg, border: `1px solid ${c.bd}`, borderRadius: 999, padding: '3px 9px' }; };
const shelfTag = (tone: 'rose' | 'amber'): S => { const c = tagStyle(tone); return { marginBottom: 7, fontSize: 8.5, fontWeight: 700, color: c.tx, background: c.bg, border: `1px solid ${c.bd}`, borderRadius: 999, padding: '2px 8px', whiteSpace: 'nowrap' }; };

function ProductImageSlot({ p, h }: { p: Product; h: number }) {
  return (
    <>
      <span aria-hidden style={{ position: 'absolute', inset: 0, background: `radial-gradient(118% 84% at 50% 12%, ${p.bottle.colorHex}30, transparent 62%)` }} />
      <span aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,.035) 0 6px, transparent 6px 13px)' }} />
      <BottleGlyph shape={p.bottle.shape} colorHex={p.bottle.colorHex} category={p.category} img={p.img} height={h} />
      <span title="AI 生成图" style={{ position: 'absolute', bottom: 5, left: 5, display: 'grid', placeItems: 'center', color: p.bottle.colorHex, opacity: 0.75 }}><Icon name="Sparkles" size={10} /></span>
    </>
  );
}

function ShelfGrid({ inventory, onOpen, highlightedIds = [], mode = 'grid' }: { inventory: Product[]; onOpen: (p: Product) => void; highlightedIds?: string[]; mode?: 'grid' | 'list' }) {
  const sorted = [...inventory].sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));

  if (mode === 'list') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {sorted.map((p) => {
          const status = expiryStatus(p);
          const hi = highlightedIds.includes(p.id);
          return (
            <button key={p.id} onClick={() => onOpen(p)} style={{ font: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left', padding: '8px 12px 8px 8px', borderRadius: 'var(--r-card)', color: 'inherit', background: hi ? 'var(--tint-mint)' : 'var(--surface)', border: `1px solid ${hi ? 'var(--border-mint)' : 'var(--line)'}`, WebkitTapHighlightColor: 'transparent' } as S}>
              <span style={{ position: 'relative', overflow: 'hidden', width: 46, height: 46, flex: 'none', borderRadius: 12, border: '1px solid var(--line)', background: 'var(--surface-2)', display: 'grid', placeItems: 'center' }}>
                <ProductImageSlot p={p} h={30} />
              </span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--ink-soft)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</span>
                <span style={{ display: 'block', fontSize: 9, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--dim)', marginTop: 3 }}>{p.brand}</span>
              </span>
              {status === 'expired' && <span style={inlineBadge('rose')}>已过期</span>}
              {status === 'expiring' && <span style={inlineBadge('amber')}>临期</span>}
              <Icon name="ChevronRight" size={15} style={{ color: 'var(--dim)', flex: 'none' } as S} />
            </button>
          );
        })}
      </div>
    );
  }

  const rows: Product[][] = [];
  for (let i = 0; i < sorted.length; i += 4) rows.push(sorted.slice(i, i + 4));
  return (
    <div>
      {rows.map((row, ri) => (
        <div key={ri} style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', alignItems: 'end', columnGap: 8, padding: '18px 2px 11px', borderBottom: '1px solid var(--line)' }}>
          {row.map((p) => {
            const status = expiryStatus(p);
            return (
              <button key={p.id} onClick={() => onOpen(p)} style={{ font: 'inherit', cursor: 'pointer', background: 'none', border: 'none', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', WebkitTapHighlightColor: 'transparent' } as S}>
                {status === 'expired' && <span style={shelfTag('rose')}>已过期</span>}
                {status === 'expiring' && <span style={shelfTag('amber')}>临期</span>}
                <BottleGlyph shape={p.bottle.shape} colorHex={p.bottle.colorHex} category={p.category} img={p.img} height={56} />
              </button>
            );
          })}
          {Array.from({ length: 4 - row.length }).map((_, i) => <span key={'pad' + i} aria-hidden />)}
        </div>
      ))}
    </div>
  );
}

interface ShelfTabProps {
  inventory: Product[];
  onOpen: (p: Product) => void;
  highlightedIds: string[];
  onChat: () => void;
  promptProfile: boolean;
  onOpenProfile: () => void;
  accountCopy: { title: string; description: string } | null;
  onOpenAccount: () => void;
  onDismissAccount: () => void;
}

export function ShelfTab({ inventory, onOpen, highlightedIds, onChat, promptProfile, onOpenProfile, accountCopy, onOpenAccount, onDismissAccount }: ShelfTabProps) {
  const [sy, setSy] = React.useState(0);
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const greetRef = React.useRef<HTMLDivElement>(null);
  const [gh, setGh] = React.useState(184);
  React.useLayoutEffect(() => { if (greetRef.current) setGh(greetRef.current.offsetHeight); }, []);
  const fade = Math.max(0, Math.min(1, 1 - sy / Math.max(90, gh - 30)));
  return (
    <div onScroll={(e) => { const y = (e.currentTarget as HTMLDivElement).scrollTop; setSy(y > gh + 20 ? gh + 20 : y); }} style={{ flex: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      <div ref={greetRef} style={{ position: 'sticky', top: 0, zIndex: 0, padding: '16px 22px 24px', opacity: fade, transform: `translateY(${(1 - fade) * -8}px)`, pointerEvents: fade < 0.2 ? 'none' : 'auto' }}>
        <div style={{ fontFamily: 'var(--font-logo, var(--font-display, inherit))', fontSize: 'clamp(38px, 13vw, 52px)', fontWeight: 400, letterSpacing: '0.08em', color: '#F1EDF7', paintOrder: 'stroke fill', textShadow: '0 0 16px #C7A8F077', lineHeight: 1.3 } as S}>晚安，桂桂。</div>
        <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 12, lineHeight: 1.7 }}>你的架子上有 <b style={{ color: 'var(--ink)', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{inventory.length}</b> 件护肤品。</div>
        <button onClick={onChat} style={{ font: 'inherit', marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 999, padding: '10px 16px', cursor: 'pointer', color: 'var(--ink)', fontSize: 12.5, fontWeight: 600 } as S}>今晚状态如何？来聊聊 <Icon name="ArrowRight" size={15} /></button>
      </div>
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 14, padding: '0 20px 8px' }}>
        {accountCopy && <AccountPromptCard copy={accountCopy} onOpen={onOpenAccount} onDismiss={onDismissAccount} />}
        <div style={{ background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: '24px 24px 18px 18px', padding: '16px 16px 18px', boxShadow: '0 -14px 40px -18px rgba(11,10,17,.7)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: '.01em', width: 'fit-content', background: 'var(--prism)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' } as S}>我的架子</div>
            <button onClick={() => setViewMode((m) => (m === 'grid' ? 'list' : 'grid'))} aria-label={viewMode === 'grid' ? '以列表显示' : '以网格显示'} style={{ width: 29, height: 29, flex: 'none', borderRadius: 999, background: 'var(--surface)', border: '1px solid var(--line)', color: 'var(--ink-soft)', display: 'grid', placeItems: 'center', cursor: 'pointer' } as S}><Icon name={viewMode === 'grid' ? 'LayoutList' : 'LayoutGrid'} size={14} /></button>
          </div>
          <ShelfGrid inventory={inventory} onOpen={onOpen} highlightedIds={highlightedIds} mode={viewMode} />
        </div>
        {promptProfile && <ProfileCompletionPrompt title="先补最关键的肤质信息，让后续建议更靠谱" description="现在已经能正常用 cabinet 了。补充肤质和敏感成分后，AI 建议会更接近真实使用场景。" emphasizedFields={['肤质', '敏感成分']} onOpen={onOpenProfile} />}
      </div>
    </div>
  );
}
