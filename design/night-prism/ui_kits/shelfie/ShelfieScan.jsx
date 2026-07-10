/* Scan viewfinder + add-date form. Mirrors upstream Scanner.tsx + add-date view.
   Recognition is mocked (demo) — the real app posts the frame to /api/scan (Gemini). */
const DS_scan = window.NightPrismDesignSystem_4de317;
const D_scan = window.ShelfieData;

function ShelfieScan({ onBack, onRecognize, recognizing }) {
  const { BottleGlyph } = DS_scan;
  const corners = [
    { top: "15%", left: "13%", bd: "borderTop borderLeft", r: "10px 0 0 0" },
    { top: "15%", right: "13%", bd: "borderTop borderRight", r: "0 10px 0 0" },
    { bottom: "15%", left: "13%", bd: "borderBottom borderLeft", r: "0 0 0 10px" },
    { bottom: "15%", right: "13%", bd: "borderBottom borderRight", r: "0 0 10px 0" },
  ];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "var(--bg-scan)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px 0" }}>
        <button onClick={onBack} style={{ font: "inherit", fontSize: 12, color: "var(--ink)", background: "var(--surface-2)", border: "1px solid var(--line)", borderRadius: 999, padding: "8px 15px", cursor: "pointer" }}>返回</button>
      </div>
      <div style={{ flex: 1, position: "relative", margin: "16px 20px 6px", borderRadius: 26, overflow: "hidden", background: "radial-gradient(120% 90% at 50% 30%, #232033 0%, #141220 60%, #0D0C13 100%)", border: "1px solid var(--line)" }}>
        <style>{`@keyframes np-scanmove{to{top:60%}} @media (prefers-reduced-motion: reduce){.np-sweep{animation:none!important}}`}</style>
        {corners.map((c, i) => (
          <i key={i} style={{
            position: "absolute", width: 26, height: 26, borderRadius: c.r,
            top: c.top, bottom: c.bottom, left: c.left, right: c.right,
            borderStyle: "solid", borderColor: "rgba(241,237,247,.85)", borderWidth: 0,
            ...(c.bd.includes("borderTop") ? { borderTopWidth: 2.5 } : {}),
            ...(c.bd.includes("borderBottom") ? { borderBottomWidth: 2.5 } : {}),
            ...(c.bd.includes("borderLeft") ? { borderLeftWidth: 2.5 } : {}),
            ...(c.bd.includes("borderRight") ? { borderRightWidth: 2.5 } : {}),
          }}></i>
        ))}
        <div className="np-sweep" style={{ position: "absolute", left: "14%", right: "14%", height: 66, top: "18%", background: "linear-gradient(180deg,transparent,rgba(167,232,192,.22) 45%,rgba(146,196,242,.28) 55%,transparent)", filter: "blur(2px)", animation: "np-scanmove 2.6s ease-in-out infinite alternate" }}></div>
        <div style={{ position: "absolute", left: "50%", top: "47%", transform: "translate(-50%,-50%)", opacity: .5 }}><BottleGlyph category="ghost" height={116} /></div>
        <div style={{ position: "absolute", bottom: 16, left: 0, right: 0, textAlign: "center", fontSize: 11.5, color: "var(--muted)", letterSpacing: ".04em" }}>{recognizing ? "识别中… Gemini 在读瓶身" : "对准瓶身，让它认出这是什么"}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 24px calc(18px + var(--sab))" }}>
        <div style={{ width: 92, fontSize: 11.5, color: "var(--muted)", display: "flex", alignItems: "center", gap: 6 }}><window.Icon name="Upload" size={15} /> 上传照片</div>
        <button onClick={onRecognize} aria-label="拍照识别" disabled={recognizing} style={{ width: 74, height: 74, borderRadius: "50%", background: "var(--prism)", border: "none", cursor: "pointer", position: "relative", boxShadow: "var(--shutter-ring)" }}>
          <span style={{ position: "absolute", inset: 6, borderRadius: "50%", border: "2.5px solid var(--on-prism)" }}></span>
        </button>
        <div style={{ width: 92, fontSize: 11, color: "var(--dim)", textAlign: "right" }}>识别是<br />模拟的 · demo</div>
      </div>
    </div>
  );
}

function ShelfieAddDate({ scanResult, onCancel, onConfirm }) {
  const { Button, TextField, EvidenceTag, BottleGlyph } = DS_scan;
  const [month, setMonth] = React.useState(D_scan.fmtDate(D_scan.TODAY).slice(0, 7));
  const expiry = D_scan.fmtDate(D_scan.addMonths(D_scan.parseM(month), scanResult.paoMonths || 12)).slice(0, 7);
  return (
    <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px 0" }}>
        <DS_scan.ScreenHeader eyebrow="ADD · 确认开封时间" title="它已认出，" em="补个日期" size="sm" />
        <button onClick={onCancel} style={{ font: "inherit", fontSize: 12, color: "var(--muted)", background: "none", border: "1px solid var(--line)", borderRadius: 999, padding: "8px 14px", cursor: "pointer", flex: "none" }}>取消</button>
      </div>
      <div style={{ padding: "18px 20px 0", display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", gap: 15, alignItems: "center", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--r-sheet)", padding: 16 }}>
          <div style={{ width: 56, height: 72, flex: "none", borderRadius: "var(--r-thumb)", background: "var(--bg-2)", border: "1px solid var(--line)", display: "grid", placeItems: "center" }}><BottleGlyph shape={scanResult.bottle.shape} colorHex={scanResult.bottle.colorHex} category={scanResult.category} height={48} /></div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--dim)" }}>{scanResult.brand}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", marginTop: 2 }}>{scanResult.name}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 8 }}>
              {scanResult.keyIngredients.map((ing) => <span key={ing} style={{ fontSize: 9, color: "var(--ink-soft)", background: "var(--surface-2)", border: "1px solid var(--line)", borderRadius: 999, padding: "2px 8px" }}>{ing}</span>)}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12, color: "var(--muted)", padding: "0 2px" }}>
          <span>开封保质期 (PAO)</span><span style={{ color: "var(--ink)", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{scanResult.paoMonths} 个月</span>
        </div>
        <TextField label="开封月份" type="month" value={month} onChange={(e) => setMonth(e.target.value)} />
        <div style={{ fontSize: 11.5, color: "var(--muted)", display: "flex", alignItems: "center", gap: 8 }}>
          预计到期 <b style={{ color: "var(--ink-on-amber)", fontVariantNumeric: "tabular-nums" }}>{expiry.replace("-", "年")}月</b>
          <EvidenceTag>PAO 从开封起算 · T2</EvidenceTag>
        </div>
      </div>
      <div style={{ marginTop: "auto", ...window.np_dock() }}>
        <Button style={{ flex: 1 }} onClick={() => onConfirm(month)}>放进我的架子 ✓</Button>
      </div>
    </div>
  );
}

Object.assign(window, { ShelfieScan, ShelfieAddDate });
