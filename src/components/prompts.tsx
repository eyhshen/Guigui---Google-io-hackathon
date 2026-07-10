/* Mid-level prompt cards — ported from design ui_kits/shelfie/shelfie-ui.jsx. */
import React from 'react';
import { Icon, Button } from '../np/ui';

type S = React.CSSProperties;

export function ProfileCompletionPrompt({ title, description, emphasizedFields, onOpen }: { title: string; description: string; emphasizedFields: string[]; onOpen: () => void }) {
  return (
    <section style={{ borderRadius: 'var(--r-sheet)', border: '1px solid var(--border-mint)', background: 'var(--tint-mint)', padding: 16 }}>
      <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--mint)' }}>Profile Later</div>
      <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--ink)', marginTop: 5 }}>{title}</div>
      <div style={{ fontSize: 11.5, lineHeight: 1.7, color: 'var(--muted)', marginTop: 4 }}>{description}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
        {emphasizedFields.map((f) => <span key={f} style={{ fontSize: 10, fontWeight: 600, borderRadius: 999, padding: '4px 10px', color: 'var(--ink-on-mint)', border: '1px solid var(--border-mint)', background: 'var(--surface)' }}>{f}</span>)}
      </div>
      <button onClick={onOpen} style={{ font: 'inherit', marginTop: 14, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 16, padding: '11px 14px', cursor: 'pointer', color: 'inherit', textAlign: 'left' } as S}>
        <span>
          <span style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>补充肤质档案</span>
          <span style={{ display: 'block', fontSize: 11, color: 'var(--muted)' }}>只增强推荐，不阻塞当前使用</span>
        </span>
        <Icon name="ArrowRight" size={16} style={{ color: 'var(--dim)' }} />
      </button>
    </section>
  );
}

export function AccountPromptCard({ copy, onOpen, onDismiss }: { copy: { title: string; description: string }; onOpen: () => void; onDismiss: () => void }) {
  return (
    <section style={{ borderRadius: 'var(--r-sheet)', border: '1px solid var(--border-amber)', background: 'var(--tint-amber)', padding: 16 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
        <div>
          <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--amber)' }}>Guest-First</div>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--ink)', marginTop: 5 }}>{copy.title}</div>
          <div style={{ fontSize: 11.5, lineHeight: 1.7, color: 'var(--muted)', marginTop: 4 }}>{copy.description}</div>
        </div>
        <button onClick={onDismiss} aria-label="稍后再说" style={{ font: 'inherit', flex: 'none', width: 28, height: 28, borderRadius: 999, background: 'var(--surface)', border: '1px solid var(--line)', color: 'var(--muted)', cursor: 'pointer', display: 'grid', placeItems: 'center' } as S}><Icon name="X" size={14} /></button>
      </div>
      <button onClick={onOpen} style={{ font: 'inherit', marginTop: 14, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 16, padding: '11px 14px', cursor: 'pointer', color: 'inherit', textAlign: 'left' } as S}>
        <span>
          <span style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>查看保存与同步占位说明</span>
          <span style={{ display: 'block', fontSize: 11, color: 'var(--muted)' }}>本批次不做真实登录，只标记未来入口</span>
        </span>
        <Icon name="ArrowRight" size={16} style={{ color: 'var(--dim)' }} />
      </button>
    </section>
  );
}

export function EmptyCabinet({ onScan, onExplore }: { onScan: () => void; onExplore: () => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ borderRadius: 'var(--r-sheet)', border: '1px solid var(--line)', background: 'var(--surface)', padding: 20 }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--muted)' }}>Empty Cabinet</div>
        <div style={{ fontFamily: 'var(--font-display, inherit)', fontSize: 22, fontWeight: 200, letterSpacing: '.04em', color: 'var(--ink)', marginTop: 8, lineHeight: 1.4 }}>先扫第一件产品，<br />再开始用 <b style={{ fontWeight: 700, background: 'var(--prism)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' } as S}>柜柜</b></div>
        <div style={{ fontSize: 12.5, lineHeight: 1.75, color: 'var(--muted)', marginTop: 10 }}>拍照识别产品，确认开封时间后，它就会进入你的化妆柜。先完成第一件，再看 AI 建议和日常搭配。</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 18 }}>
          <Button onClick={onScan}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Icon name="Camera" size={16} /> 扫码添加第一件产品</span></Button>
          <Button variant="ghost" onClick={onExplore}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><Icon name="Sparkles" size={15} /> 先看看推荐灵感</span></Button>
        </div>
      </div>
      <div style={{ borderRadius: 'var(--r-sheet)', border: '1px dashed var(--line)', background: 'var(--surface)', padding: 22, textAlign: 'center' }}>
        <div style={{ width: 52, height: 52, borderRadius: 999, background: 'var(--surface-2)', border: '1px solid var(--line)', display: 'grid', placeItems: 'center', margin: '0 auto', color: 'var(--muted)' }}><Icon name="Camera" size={22} /></div>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-soft)', marginTop: 14 }}>你的柜子还没有产品</div>
        <div style={{ fontSize: 11.5, lineHeight: 1.7, color: 'var(--muted)', marginTop: 6 }}>扫描后自动提取品牌、品类、成分和开封保质期，你只需要补一个开封月份。</div>
      </div>
    </div>
  );
}
