/* Onboarding 建档 — 7-step warm profile builder shown on app entry.
   Ported from design/night-prism ShelfieOnboarding.jsx; maps its answers onto the
   real SkinProfile shape on completion. Self-contained; composes np/ui primitives. */
import React from 'react';
import { Button, Card } from '../np/ui';
import { OB, CITY_WEATHER, mapSkinType } from '../data';
import { SkinProfile } from '../types';

type S = React.CSSProperties;

/* thin display heading with an optional mid-sentence prism word */
function ObQ({ children, override }: { children: React.ReactNode; override?: S }) {
  return (
    <div style={{ fontFamily: 'var(--font-display, inherit)', fontSize: 'var(--display-size-ob)', fontWeight: 200, letterSpacing: '.05em', lineHeight: 1.4, color: 'var(--ink)', position: 'relative', zIndex: 2, ...(override || {}) }}>{children}</div>
  );
}
function Prism({ children }: { children: React.ReactNode }) {
  return <b style={{ fontWeight: 700, background: 'var(--prism)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' } as S}>{children}</b>;
}

/* prism-selectable option tile. tone="rose" flags caution instead of celebrating. */
function ObTile({ selected, tone = 'prism', wide, onClick, children }: { key?: React.Key; selected?: boolean; tone?: 'prism' | 'rose'; wide?: boolean; onClick?: () => void; children: React.ReactNode }) {
  const roseSel = tone === 'rose' && selected;
  return (
    <button aria-pressed={selected} onClick={onClick} style={{
      font: 'inherit', cursor: 'pointer', borderRadius: 'var(--r-opt)', padding: '14px 6px', textAlign: 'center',
      fontSize: 14.5, fontWeight: selected ? 700 : 500, minHeight: 52, transition: '.18s',
      gridColumn: wide ? '1 / -1' : undefined, WebkitTapHighlightColor: 'transparent',
      border: `1px solid ${selected ? (roseSel ? 'var(--rose)' : 'transparent') : 'rgba(255,255,255,.18)'}`,
      color: selected ? (roseSel ? 'var(--ink-on-rose)' : 'var(--on-prism)') : '#E4DEF0',
      background: selected ? (roseSel ? 'var(--tint-rose)' : 'var(--prism)') : 'var(--surface)',
      boxShadow: roseSel ? 'var(--glow-rose)' : (selected ? '0 8px 28px -6px rgba(199,168,240,.5)' : 'none'),
    } as S}>{children}</button>
  );
}

function StQ({ q, a, sel, onPick }: { q: string; a: string[]; sel?: number; onPick: (i: number) => void }) {
  return (
    <>
      <div style={{ fontSize: 12, color: 'var(--ink)', marginBottom: 8 }}>{q}</div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        {a.map((label, i) => {
          const on = (i === 0 ? 1 : 0) === sel;
          return <button key={label} aria-pressed={on} onClick={() => onPick(i)} style={{ font: 'inherit', flex: 1, fontSize: 12, borderRadius: 999, padding: '8px 0', minHeight: 38, cursor: 'pointer', border: `1px solid ${on ? 'var(--blue)' : 'var(--line)'}`, color: on ? 'var(--ink-on-blue)' : 'var(--ink-soft)', background: on ? 'rgba(146,196,242,.18)' : 'none', fontWeight: on ? 700 : 500 } as S}>{label}</button>;
        })}
      </div>
    </>
  );
}

function SumChip({ tone, children }: { key?: React.Key; tone?: 'rose' | 'warm'; children: React.ReactNode }) {
  const c = tone === 'rose' ? { color: 'var(--ink-on-rose)', border: 'var(--border-rose)' }
    : tone === 'warm' ? { color: 'var(--ink-on-amber)', border: 'var(--border-amber)' }
      : { color: 'var(--ink-on-blue)', border: 'var(--border-blue)' };
  return <span style={{ fontSize: 10, fontWeight: 600, borderRadius: 999, padding: '4px 10px', color: c.color, border: `1px solid ${c.border}`, whiteSpace: 'nowrap' }}>{children}</span>;
}

function OnboardLogo() {
  return <img src="/guigui-logo.png" alt="柜柜" width={120} height={120} style={{ display: 'block', margin: '0 auto 22px', filter: 'drop-shadow(0 0 24px rgba(199,168,240,.5))' }} />;
}

type ObData = { skinType: string | null; concerns: string[]; actives: string[]; sensitive: boolean; city: string | null; safety: string[] };

/* map the accumulated onboarding answers onto the app's SkinProfile shape */
function toProfile(d: ObData): SkinProfile {
  const sens: string[] = [];
  if (d.sensitive || d.skinType === '敏感') sens.push('易敏感');
  if (d.concerns.includes('泛红')) sens.push('酸类', 'A醇');
  return {
    skinType: mapSkinType(d.skinType || ''),
    sensitivities: Array.from(new Set(sens)),
    currentActives: d.actives.filter((a) => !a.includes('没有')),
    city: d.city || '',
    concerns: d.concerns,
    safetyFlags: d.safety.filter((x) => x !== '以上都没有'),
  };
}

const STEPS = ['intro', 'skinType', 'concerns', 'actives', 'city', 'safety', 'done'] as const;

export function Onboarding({ onDone, onSkip, toast, introStyle }: { onDone: (p: SkinProfile) => void; onSkip: () => void; toast: (t: string) => void; introStyle?: S }) {
  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState<ObData>({ skinType: null, concerns: [], actives: [], sensitive: false, city: null, safety: [] });
  const [stOpen, setStOpen] = React.useState(false);
  const [st, setSt] = React.useState<{ tight?: number; oil?: number }>({});
  const key = STEPS[step];

  const gridWrap: S = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9, marginTop: 20, position: 'relative', zIndex: 2 };
  const why = (t: string) => <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.8, marginTop: 9, position: 'relative', zIndex: 2 }}>{t}</div>;

  const toggleMulti = (field: 'concerns' | 'actives' | 'safety', val: string, max?: number) => setData((d) => {
    const arr = d[field]; const has = arr.includes(val);
    if (has) return { ...d, [field]: arr.filter((x) => x !== val) };
    if (val.includes('没有')) return { ...d, [field]: [val] };
    const next = arr.filter((x) => !x.includes('没有'));
    if (max && next.length >= max) { toast(`最多选 ${max} 个`); return d; }
    return { ...d, [field]: [...next, val] };
  });

  const answerSt = (k: 'tight' | 'oil', v: number) => {
    const ns = { ...st, [k]: v }; setSt(ns);
    if ('tight' in ns && 'oil' in ns) {
      const g = ns.tight && ns.oil ? '混合' : ns.tight ? '干性' : ns.oil ? '油性' : '中性';
      setData((d) => ({ ...d, skinType: g }));
    }
  };

  const next = () => {
    if (key === 'skinType' && !data.skinType) return toast('选一个吧');
    if (key === 'concerns' && !data.concerns.length) return toast('至少选一个');
    if (key === 'actives' && !data.actives.length) return toast('至少选一个（没有就选“都没有”）');
    if (key === 'city' && !data.city) return toast('选一个吧');
    if (key === 'safety' && !data.safety.length) return toast('如实勾选，没有就选“以上都没有”');
    if (key === 'done') return onDone(toProfile(data));
    setStep((s) => s + 1);
  };

  const pct = Math.round((step / (STEPS.length - 1)) * 100);
  const label = key === 'intro' ? '建档' : key === 'done' ? '完成' : `${step} / 5`;
  const cta = key === 'intro' ? '开始' : key === 'done' ? '进我的架子 →' : key === 'safety' ? '完成 ✓' : '下一步';

  let body: React.ReactNode;
  if (key === 'intro') {
    body = (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 28px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <OnboardLogo />
        <ObQ override={introStyle}>欢迎来到你的<Prism>柜柜</Prism></ObQ>
        <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 2, marginTop: 16 }}>准备好更了解你的柜子了吗？</div>
        <button onClick={onSkip} style={{ font: 'inherit', marginTop: 22, fontSize: 10, fontWeight: 600, color: 'var(--ink)', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 999, padding: '9px 18px', cursor: 'pointer', minHeight: 35, alignSelf: 'center', whiteSpace: 'nowrap' }}>先逛逛，之后再建档。</button>
      </div>
    );
  } else if (key === 'skinType') {
    const g = data.skinType;
    body = (
      <div style={{ padding: '22px 20px 0' }}>
        <ObQ>你的<Prism>肤质</Prism>是?</ObQ>
        {why('决定质地耐受和成分起点。不确定的话，下面有 2 题自测。')}
        <div style={gridWrap}>
          {OB.skinType.map((o) => <ObTile key={o} selected={g === o} onClick={() => setData((d) => ({ ...d, skinType: o }))}>{o}</ObTile>)}
        </div>
        <div style={{ marginTop: 12, position: 'relative', zIndex: 2 }}>
          <button onClick={() => setStOpen((v) => !v)} style={{ font: 'inherit', fontSize: 11.5, fontWeight: 600, color: 'var(--ink-on-blue)', background: 'var(--tint-blue)', border: '1px solid var(--border-blue)', borderRadius: 999, padding: '8px 15px', cursor: 'pointer', minHeight: 36, display: 'inline-flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>不确定?自测 2 题 {stOpen ? '↑' : '→'}</button>
          {stOpen && (
            <div style={{ marginTop: 8, borderRadius: 16, border: '1px solid var(--line)', background: 'var(--surface)', padding: '12px 14px' }}>
              <StQ q="1 · 洁面后 10 分钟，什么都不涂，脸会紧绷吗?" a={['会紧绷', '不会']} sel={st.tight} onPick={(i) => answerSt('tight', i === 0 ? 1 : 0)} />
              <StQ q="2 · 到下午，T 区(额头/鼻子)明显出油吗?" a={['明显出油', '不明显']} sel={st.oil} onPick={(i) => answerSt('oil', i === 0 ? 1 : 0)} />
              {'tight' in st && 'oil' in st && <div style={{ fontSize: 12, color: 'var(--mint)' }}>→ 更像「{data.skinType}」，帮你选好了(可改)</div>}
            </div>
          )}
        </div>
      </div>
    );
  } else if (key === 'concerns') {
    body = (
      <div style={{ padding: '22px 20px 0' }}>
        <ObQ>最想解决的<Prism>护肤困扰</Prism>?</ObQ>
        {why('定向成分——这里只放护肤困扰;遮盖/上妆属于彩妆，不混在这里(最多选 2 个)。')}
        <div style={gridWrap}>
          {OB.concerns.map((o) => <ObTile key={o} selected={data.concerns.includes(o)} onClick={() => toggleMulti('concerns', o, 2)}>{o}</ObTile>)}
        </div>
        {data.concerns.length > 0 && (
          <div style={{ marginTop: 14, fontSize: 12, lineHeight: 1.7, color: 'var(--ink-on-blue)' }}>已选 {data.concerns.length}/2{data.concerns.includes('泛红') ? ' · 选了泛红:后面会默认帮你避开酸类/A醇' : ''}</div>
        )}
      </div>
    );
  } else if (key === 'actives') {
    body = (
      <div style={{ padding: '22px 20px 0' }}>
        <ObQ>正在用的<Prism>功效成分</Prism>?</ObQ>
        {why('防叠加冲突、避免刺激(比如 A醇 和酸类别一起上脸)。')}
        <div style={gridWrap}>
          {OB.actives.map((o) => <ObTile key={o} selected={data.actives.includes(o)} onClick={() => toggleMulti('actives', o)}>{o}</ObTile>)}
        </div>
        <div style={{ ...gridWrap, marginTop: 12 }}>
          <ObTile wide selected={data.sensitive} onClick={() => setData((d) => ({ ...d, sensitive: !d.sensitive }))}>容易敏感 / 有过敏史 {data.sensitive ? '✓' : ''}</ObTile>
        </div>
      </div>
    );
  } else if (key === 'city') {
    const w = data.city ? CITY_WEATHER[data.city] : null;
    body = (
      <div style={{ padding: '22px 20px 0' }}>
        <ObQ>你在<Prism>哪个城市</Prism>?</ObQ>
        {why('用当地气候(气温/湿度/紫外/季节)调整推荐——基于皮肤科研究，不是拍脑袋。')}
        <div style={gridWrap}>
          {OB.cities.map((o) => <ObTile key={o} selected={data.city === o} onClick={() => setData((d) => ({ ...d, city: o }))}>{o}</ObTile>)}
        </div>
        {w && (
          <div style={{ marginTop: 16, borderRadius: 'var(--r-card-lg)', padding: '15px 16px', background: 'var(--surface)', border: '1px solid var(--line)', position: 'relative', zIndex: 2, overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -30, right: -30, width: 130, height: 130, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,195,119,.35), transparent 70%)' }} />
            <div style={{ fontSize: 17, fontWeight: 600, display: 'flex', alignItems: 'baseline', gap: 8, position: 'relative' }}>📍 {data.city} <span style={{ fontSize: 26, fontWeight: 200, fontVariantNumeric: 'tabular-nums' }}>{w.temp}°</span></div>
            <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap', position: 'relative' }}>
              {[`湿度 ${w.humidity}%`, `UV ${w.uv}`, w.season, w.tag].map((c) => <span key={c} style={{ fontSize: 10, fontWeight: 600, color: 'var(--ink-on-blue)', border: '1px solid var(--border-blue)', borderRadius: 999, padding: '4px 10px', fontVariantNumeric: 'tabular-nums' }}>{c}</span>)}
            </div>
            <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.7, marginTop: 10, position: 'relative' }}>柜柜会根据你所在地点给你定制独属于你的护肤建议</div>
          </div>
        )}
      </div>
    );
  } else if (key === 'safety') {
    const serious = data.safety.filter((x) => x !== '以上都没有');
    body = (
      <div style={{ padding: '22px 20px 0' }}>
        <ObQ>有以下情况吗?<span style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 400, letterSpacing: 0 }}>(如实勾选)</span></ObQ>
        {why('涉及安全:命中会建议先看皮肤科医生，App 只做温和整理，不替代诊断。')}
        <div style={gridWrap}>
          {OB.safety.map((o) => {
            const clear = o.includes('没有');
            return <ObTile key={o} wide={!clear} tone={clear ? 'prism' : 'rose'} selected={data.safety.includes(o)} onClick={() => toggleMulti('safety', o)}>{o}</ObTile>;
          })}
        </div>
        {serious.length > 0 && (
          <Card tone="amber" size="sm" glow style={{ marginTop: 14 }}>⚠️ 你勾选了「{serious.join('、')}」——建议<b style={{ color: 'var(--ink)' }}>先看皮肤科医生面诊</b>;推荐里会自动排除刺激性功效成分。</Card>
        )}
      </div>
    );
  } else {
    const w = data.city ? CITY_WEATHER[data.city] : null;
    const serious = data.safety.filter((x) => x !== '以上都没有');
    const activesUsing = data.actives.filter((a) => !a.includes('没有'));
    body = (
      <div style={{ textAlign: 'center', padding: '26px 20px 0', position: 'relative', zIndex: 2 }}>
        <div style={{ fontSize: 'var(--eyebrow-size)', letterSpacing: 'var(--eyebrow-tracking)', color: 'var(--muted)', textTransform: 'uppercase' }}>Profile Ready</div>
        <h1 style={{ fontFamily: 'var(--font-display, inherit)', fontSize: 'var(--display-size-ob)', fontWeight: 'var(--w-thin)' as any, letterSpacing: '.05em', color: 'var(--ink)', margin: '6px 0 0', lineHeight: 1.4 }}>档案<Prism>建好了。</Prism></h1>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center', marginTop: 18 }}>
          <SumChip>{data.skinType}肤</SumChip>
          {data.concerns.map((c) => <SumChip key={c}>{c}</SumChip>)}
          {activesUsing.length > 0 && <SumChip>在用:{activesUsing.join('、')}</SumChip>}
          {data.sensitive && <SumChip tone="rose">易敏感</SumChip>}
          {w && <SumChip tone="warm">{data.city} {w.temp}° · {w.tag}</SumChip>}
        </div>
        <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 18, lineHeight: 1.9 }}>你的架子就是推荐候选池。<br />皮肤有状况时，去「顾问」问一句。</div>
        {serious.length > 0 && <Card tone="amber" size="sm" style={{ marginTop: 16, textAlign: 'left' }}>你勾选了「{serious.join('、')}」——建议先看皮肤科医生面诊;App 只做一般整理，不替代诊断。</Card>}
      </div>
    );
  }

  return (
    <>
      <div style={{ padding: '14px 20px 0', position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => (step > 0 ? setStep((s) => s - 1) : onSkip())} style={{ font: 'inherit', fontSize: 14, color: 'var(--muted)', border: '1px solid var(--line)', background: 'var(--surface)', borderRadius: '50%', width: 34, height: 34, padding: 0, display: 'grid', placeItems: 'center', flex: 'none', cursor: 'pointer', visibility: step === 0 ? 'hidden' : 'visible' }}>←</button>
        <div style={{ flex: 1, height: 3, borderRadius: 99, background: 'var(--surface-2)', margin: '0 14px', overflow: 'hidden' }}>
          <i style={{ display: 'block', height: '100%', background: 'var(--prism)', borderRadius: 99, transition: 'width .35s ease', width: pct + '%' }} />
        </div>
        <div style={{ fontSize: 9.5, letterSpacing: '.2em', color: 'var(--muted)', whiteSpace: 'nowrap' }}>{label}</div>
      </div>
      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {body}
        <div style={{ height: 20 }} />
      </div>
      <div style={{ padding: '12px 20px calc(14px + var(--sab))', display: 'flex', gap: 10, position: 'relative', zIndex: 5, background: 'linear-gradient(transparent, var(--bg) 40%)' }}>
        <Button style={{ flex: 1 }} onClick={next}>{cta}</Button>
      </div>
    </>
  );
}
