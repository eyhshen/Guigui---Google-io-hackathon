/* Bottom-sheet bodies: product detail, profile editor, guest-account prompt,
   app menu, and the scan add-date step. Faithful port of the Night Prism
   ShelfieSheets / ShelfieAddDate prototypes — inline CSS-var styles verbatim,
   globals rewired to real imports. Rendered inside the DS <BottomSheet>. */
import React from 'react';
import { Icon, Button, TextField, SegmentedControl, BottleGlyph, PaoMeter } from '../np/ui';
import { categoryLabels, skinTypeLabels, fmtYearMonth, monthsOpened, addMonthsFromMonth } from '../data';
import { Product, SkinProfile, ScanResult, Account } from '../types';

/* mint-outlined citation pill (design DS EvidenceTag) */
function EvidenceTag({ children, style }: { children?: React.ReactNode; style?: React.CSSProperties }) {
  return <span style={{ fontSize: 9, fontWeight: 700, borderRadius: 'var(--r-pill)', padding: '2px 8px', letterSpacing: '.06em', color: 'var(--mint)', border: '1px solid rgba(167,232,192,.4)', whiteSpace: 'nowrap', fontFamily: 'var(--font-ui)', display: 'inline-block', ...style }}>{children}</span>;
}

/* screen title block (design DS ScreenHeader) */
function ScreenHeader({ eyebrow, title, em, sub, size = 'md' }: { eyebrow?: string; title?: string; em?: string; sub?: string; size?: 'sm' | 'md' }) {
  return (
    <div style={{ fontFamily: 'var(--font-ui)', position: 'relative', zIndex: 2 }}>
      {eyebrow ? <div style={{ fontSize: 'var(--eyebrow-size)', letterSpacing: 'var(--eyebrow-tracking)', color: 'var(--muted)', textTransform: 'uppercase' } as React.CSSProperties}>{eyebrow}</div> : null}
      <h1 style={{ fontFamily: 'var(--font-display, inherit)', fontSize: size === 'sm' ? 'var(--display-size-ob)' : 'var(--display-size)', fontWeight: 'var(--w-thin)' as any, letterSpacing: size === 'sm' ? '.05em' : 'var(--display-tracking)', color: 'var(--ink)', margin: '6px 0 0', lineHeight: 1.4 }}>
        {title}{em ? <b style={{ fontWeight: 700, background: 'var(--prism)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' } as React.CSSProperties}>{em}</b> : null}
      </h1>
      {sub ? <div style={{ fontSize: 'var(--sub-size)', color: 'var(--muted)', marginTop: 6, letterSpacing: '.03em', lineHeight: 1.7 }}>{sub}</div> : null}
    </div>
  );
}

/* bottom action dock (design window.np_dock) */
function npDock(): React.CSSProperties {
  return { padding: '12px 20px calc(14px + var(--sab))', display: 'flex', gap: 10, position: 'relative', zIndex: 5, background: 'linear-gradient(transparent, var(--bg) 40%)' };
}

export function ProductSheetBody({ p, onClose, onDelete }: { p: Product; onClose: () => void; onDelete: (p: Product) => void }) {
  const opened = monthsOpened(p);
  return (
    <div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <div style={{ width: 74, height: 92, flex: 'none', borderRadius: 'var(--r-card)', background: 'var(--bg-2)', border: '1px solid var(--line)', display: 'grid', placeItems: 'center' }}><BottleGlyph shape={p.bottle.shape} colorHex={p.bottle.colorHex} category={p.category} img={p.img} height={64} /></div>
        <div style={{ minWidth: 0 }}>
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--muted)', background: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: 999, padding: '3px 9px' }}>{p.brand}</span>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', marginTop: 8, lineHeight: 1.3 }}>{p.name}</div>
          <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 3 }}>{categoryLabels[p.category] || p.category}</div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 16 }}>
        <div style={infoCell()}>
          <div style={infoLab()}>开封时间</div>
          <div style={infoVal()}>{fmtYearMonth(p.openedDate)}</div>
        </div>
        <div style={infoCell()}>
          <div style={infoLab()}>预计到期</div>
          <div style={infoVal()}>{fmtYearMonth(p.expiryDate)} <span style={{ fontSize: 10, color: 'var(--dim)', fontWeight: 400 }}>({p.paoMonths}个月 PAO)</span></div>
        </div>
      </div>
      <div style={{ marginTop: 16 }}><PaoMeter opened={opened} pao={p.paoMonths} /></div>
      <div style={{ marginTop: 16 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>核心活性成分 ({p.keyIngredients.length})</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 9 }}>
          {p.keyIngredients.map((ing) => <span key={ing} style={{ fontSize: 11, color: 'var(--ink-soft)', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 999, padding: '5px 11px' }}>{ing}</span>)}
        </div>
      </div>
      <button onClick={() => onDelete(p)} style={{ font: 'inherit', marginTop: 20, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'var(--tint-rose)', border: '1px solid var(--border-rose)', color: 'var(--ink-on-rose)', borderRadius: 'var(--r-pill)', minHeight: 48, cursor: 'pointer', fontSize: 13, fontWeight: 600 }}><Icon name="Trash2" size={15} /> 从柜子移除</button>
    </div>
  );
}

export function ProfileModalBody({ profile, onSave }: { profile: SkinProfile; onSave: (profile: SkinProfile) => void }) {
  const [skinType, setSkinType] = React.useState(profile.skinType || '');
  const [sens, setSens] = React.useState((profile.sensitivities || []).join('，'));
  const [act, setAct] = React.useState((profile.currentActives || []).join('，'));
  const [city, setCity] = React.useState(profile.city || '');
  const split = (s: string) => s.split(/[,，]/).map((x) => x.trim()).filter(Boolean);
  return (
    <div style={{ maxHeight: 'min(78vh, 620px)', overflowY: 'auto', margin: '0 -4px', padding: '0 4px' }}>
      <div style={{ fontFamily: "'Noto Sans SC', sans-serif", fontSize: 20, fontWeight: 500, letterSpacing: '.04em', color: 'var(--ink)' }}>肤质<b style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 700, background: 'var(--prism)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' } as React.CSSProperties}>档案</b></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 14 }}>
        <div>
          <div style={fieldLab()}>肤质</div>
          <SegmentedControl value={skinType} onChange={setSkinType} options={[{ value: 'dry', label: '干性' }, { value: 'oily', label: '油性' }, { value: 'combination', label: '混合' }, { value: 'normal', label: '中性' }]} />
        </div>
        <TextField label="敏感成分 (逗号隔开)" value={sens} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSens(e.target.value)} placeholder="如：香精, 酒精, 视黄醇" />
        <TextField label="常用活性 (逗号隔开)" value={act} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAct(e.target.value)} placeholder="如：烟酰胺, 维C, A醇" />
        <TextField label="你当前所在城市" value={city} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value)} placeholder="如：上海" />
      </div>
      <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
        <Button style={{ flex: 1 }} onClick={() => onSave({ ...profile, skinType: (skinType || null) as SkinProfile['skinType'], sensitivities: split(sens), currentActives: split(act), city: city.trim() })}>保存档案 ✓</Button>
      </div>
    </div>
  );
}

/* app menu (hamburger) — carries the brand name (logo-only header omits it) + profile / account entries + disclaimer */
export function MenuSheetBody({ profile, account, onProfile, onAccount, onLogout, onClose }: { profile: SkinProfile; account: Account | null; onProfile: () => void; onAccount: () => void; onLogout: () => void; onClose: () => void }) {
  const skin = profile.skinType ? skinTypeLabels[profile.skinType] : '未设置';
  const sens = (profile.sensitivities || []).length ? profile.sensitivities.join('、') : '未填写';
  const rows = [
    { icon: 'Sliders', label: '编辑肤质档案', sub: `肤质 ${skin} · 敏感 ${sens}`, onClick: onProfile },
    account
      ? { icon: 'CircleCheck', label: '已登录 · 档案自动保存', sub: `${account.email} · 点此退出登录`, onClick: onLogout }
      : { icon: 'Cloud', label: '注册 / 登录以保存档案', sub: '访客模式 · 档案暂不保存', onClick: onAccount },
  ];
  const rowStyle: React.CSSProperties = { font: 'inherit', width: '100%', display: 'flex', alignItems: 'center', gap: 12, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 16, padding: '12px 14px', cursor: 'pointer', color: 'inherit' };
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
        <img src="/guigui-logo.png" alt="柜柜" style={{ height: 46, width: 'auto', display: 'block', filter: 'drop-shadow(0 0 11px rgba(199,168,240,.5))' }} />
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', letterSpacing: '.02em' }}>柜柜</div>
          <div style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--dim)', marginTop: 3 }}>GuiGui Glow · SKĀN</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 }}>
        {rows.map((r) => (
          <button key={r.label} onClick={r.onClick} style={rowStyle}>
            <span style={{ width: 36, height: 36, flex: 'none', borderRadius: 12, background: 'var(--surface-2)', border: '1px solid var(--line)', display: 'grid', placeItems: 'center', color: 'var(--ink-soft)' }}><Icon name={r.icon} size={17} /></span>
            <span style={{ flex: 1, textAlign: 'left', minWidth: 0 }}>
              <span style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{r.label}</span>
              <span style={{ display: 'block', fontSize: 11, color: 'var(--muted)', marginTop: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.sub}</span>
            </span>
            <Icon name="ChevronRight" size={16} style={{ color: 'var(--dim)', flex: 'none' }} />
          </button>
        ))}
      </div>
      <div style={{ fontSize: 10.5, color: 'var(--dim)', lineHeight: 1.75, marginTop: 18, textAlign: 'center' }}>柜柜提供的是一般护肤整理建议，非医疗诊断。孕期 / 处方药 / 皮肤破损感染请先咨询皮肤科医生。</div>
    </div>
  );
}

export function AddDate({ scanResult, generating, onCancel, onConfirm }: { scanResult: ScanResult; generating?: boolean; onCancel: () => void; onConfirm: (month: string) => void }) {
  const now = new Date();
  const [month, setMonth] = React.useState(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`);
  const expiry = addMonthsFromMonth(month, scanResult.paoMonths || 12).slice(0, 7);
  return (
    <div style={{ flex: 1, minWidth: 0, overflowY: 'auto', overflowX: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px 0', minWidth: 0 }}>
        <ScreenHeader eyebrow="ADD · 确认开封时间" title="它已认出，" em="补个日期" size="sm" />
        <button onClick={onCancel} style={{ font: 'inherit', fontSize: 12, color: 'var(--muted)', background: 'none', border: '1px solid var(--line)', borderRadius: 999, padding: '8px 14px', cursor: 'pointer', flex: 'none' }}>取消</button>
      </div>
      <div style={{ padding: '18px 20px 0', display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0 }}>
        <div style={{ display: 'flex', gap: 15, alignItems: 'center', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--r-sheet)', padding: 16 }}>
          <div style={{ position: 'relative', overflow: 'hidden', width: 56, height: 72, flex: 'none', borderRadius: 'var(--r-thumb)', background: 'var(--bg-2)', border: '1px solid var(--line)', display: 'grid', placeItems: 'center' }}><BottleGlyph shape={scanResult.bottle.shape} colorHex={scanResult.bottle.colorHex} category={scanResult.category} img={scanResult.img} height={48} />{generating && !scanResult.img && <span style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: 'rgba(20,18,31,.5)', fontSize: 8, fontWeight: 700, color: '#CFC8E0', textAlign: 'center', lineHeight: 1.25 }}>AI<br />绘制中…</span>}</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--dim)' }}>{scanResult.brand}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', marginTop: 2 }}>{scanResult.name}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 8 }}>
              {scanResult.keyIngredients.map((ing) => <span key={ing} style={{ fontSize: 9, color: 'var(--ink-soft)', background: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: 999, padding: '2px 8px' }}>{ing}</span>)}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', padding: '0 2px' }}>
          <span>开封保质期 (PAO)</span><span style={{ color: 'var(--ink)', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{scanResult.paoMonths} 个月</span>
        </div>
        <TextField label="开封月份" type="month" value={month} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMonth(e.target.value)} />
        <div style={{ fontSize: 11.5, color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          预计到期 <b style={{ color: 'var(--ink-on-amber)', fontVariantNumeric: 'tabular-nums' }}>{expiry.replace('-', '年')}月</b>
          <EvidenceTag>PAO 从开封起算 · T2</EvidenceTag>
        </div>
      </div>
      <div style={{ marginTop: 'auto', ...npDock() }}>
        <Button style={{ flex: 1 }} onClick={() => onConfirm(month)}>放进我的架子 ✓</Button>
      </div>
    </div>
  );
}

function infoCell(): React.CSSProperties { return { background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--r-card-sm)', padding: '11px 13px' }; }
function infoLab(): React.CSSProperties { return { fontSize: 10, color: 'var(--dim)', fontWeight: 600, letterSpacing: '.04em' }; }
function infoVal(): React.CSSProperties { return { fontSize: 13, color: 'var(--ink)', fontWeight: 600, marginTop: 4, fontVariantNumeric: 'tabular-nums' }; }
function fieldLab(): React.CSSProperties { return { fontSize: 10, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }; }
