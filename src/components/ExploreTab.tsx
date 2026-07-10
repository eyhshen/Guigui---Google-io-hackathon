/* Explore tab — hero pick banner + curated product cards (add → opens add-date). */
import React from 'react';
import { Icon, BottleGlyph } from '../np/ui';
import { curatedProducts, CuratedProduct } from '../data';

export function ExploreTab({ onAdd }: { onAdd: (curated: CuratedProduct) => void }) {
  return (
    <div style={{ flex: 1, minHeight: 0, overflowY: "auto", display: "flex", flexDirection: "column", gap: 16, padding: "6px 20px 8px" }}>
      {/* hero */}
      <div style={{ position: "relative", overflow: "hidden", borderRadius: "var(--r-sheet)", border: "1px solid var(--line)", background: "var(--surface)", padding: 18, flexShrink: 0 }}>
        <div style={{ position: "absolute", top: -40, right: -30, width: 150, height: 150, borderRadius: "50%", background: "radial-gradient(circle, rgba(199,168,240,.28), transparent 70%)" }}></div>
        <div style={{ position: "relative", maxWidth: "68%" }}>
          <span style={{ display: "inline-block", fontSize: 9, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--on-prism)", background: "var(--prism)", borderRadius: 999, padding: "3px 10px" }}>K-Beauty 爆款精选</span>
          <div style={{ fontFamily: "var(--font-display, inherit)", fontSize: 17, fontWeight: 200, letterSpacing: ".02em", color: "var(--ink)", marginTop: 10, lineHeight: 1.45 }}>探索最契合你肤质的<b style={{ fontWeight: 700, background: "var(--prism)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" } as React.CSSProperties}>护肤好物</b></div>
          <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 8, lineHeight: 1.6 }}>避免盲目跟风，AI 科学比对成分库</div>
        </div>
        <div style={{ position: "absolute", right: 6, bottom: -6, opacity: .9 }}><BottleGlyph shape="dropper" colorHex="#C7A8F0" height={96} /></div>
      </div>
      {/* header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--r-card)", padding: "12px 16px", flexShrink: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink)", whiteSpace: "nowrap" }}>专为你精选的 5 款好物</div>
        <div style={{ fontSize: 9.5, color: "var(--dim)", letterSpacing: ".04em", whiteSpace: "nowrap", flexShrink: 0 }}>AI 成分比对</div>
      </div>
      {/* curated list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {curatedProducts.map((p) => (
          <div key={p.id} style={{ position: "relative", display: "flex", gap: 14, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--r-card)", padding: 14, overflow: "hidden" }}>
            <div style={{ width: 54, height: 68, flex: "none", borderRadius: "var(--r-thumb)", background: "var(--bg-2)", border: "1px solid var(--line)", display: "grid", placeItems: "center" }}>
              <BottleGlyph shape={p.bottle.shape} colorHex={p.bottle.colorHex} category={p.category} img={p.img} height={44} />
            </div>
            <div style={{ flex: 1, minWidth: 0, paddingRight: 30 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--dim)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.brand}</span>
                <span style={{ flex: "none", fontSize: 9, fontWeight: 700, color: "var(--ink-on-mint)", background: "var(--tint-mint)", border: "1px solid var(--border-mint)", borderRadius: 999, padding: "2px 8px", fontVariantNumeric: "tabular-nums" }}>{p.matchScore}% 契合</span>
              </div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)", marginTop: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
              <div style={{ fontSize: 10.5, color: "var(--muted)", marginTop: 3, lineHeight: 1.55, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" } as React.CSSProperties}>{p.description}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 8 }}>
                {p.tags.map((t) => <span key={t} style={{ fontSize: 8.5, fontWeight: 600, color: "var(--ink-soft)", background: "var(--surface-2)", border: "1px solid var(--line)", borderRadius: 7, padding: "3px 7px" }}>{t}</span>)}
              </div>
            </div>
            <button onClick={() => onAdd(p)} aria-label="添加至化妆柜" style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", width: 34, height: 34, borderRadius: 999, background: "var(--prism)", color: "var(--on-prism)", border: "none", cursor: "pointer", display: "grid", placeItems: "center", boxShadow: "var(--glow-prism)" }}><Icon name="Plus" size={17} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
