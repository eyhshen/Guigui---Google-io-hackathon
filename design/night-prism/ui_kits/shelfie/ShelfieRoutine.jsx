/* Routine & Travel tab — segmented sub-tabs; 5-step routine timeline; travel form
   (destination + days inputs) → mock packing list. Mirrors upstream `routine` tab. */
const DS_rt = window.NightPrismDesignSystem_4de317;
const D_rt = window.ShelfieData;

const TONE_CHIP = {
  mint: { c: "var(--ink-on-mint)", b: "var(--border-mint)", bg: "var(--tint-mint)" },
  blue: { c: "var(--ink-on-blue)", b: "var(--border-blue)", bg: "var(--tint-blue)" },
  amber: { c: "var(--ink-on-amber)", b: "var(--border-amber)", bg: "var(--tint-amber)" },
  lilac: { c: "var(--ink-on-lilac)", b: "var(--border-lilac)", bg: "var(--tint-lilac)" },
};

function RoutineTimeline({ inventory }) {
  const ready = ["Cleanser", "Toner", "Serum", "Moisturizer", "Sunscreen"].filter((c) => inventory.some((i) => i.category === c)).length;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ position: "relative", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--r-sheet)", padding: "22px 20px", display: "flex", flexDirection: "column", gap: 20 }}>
        <div style={{ position: "absolute", left: 35, top: 34, bottom: 34, width: 2, background: "var(--divider)" }}></div>
        {D_rt.routineSteps.map((s) => {
          const prod = inventory.find((i) => i.category === s.cat);
          const t = TONE_CHIP[s.tone];
          return (
            <div key={s.n} style={{ display: "flex", gap: 15, position: "relative", zIndex: 1 }}>
              <div style={{ width: 26, height: 26, borderRadius: 999, background: "var(--bg-2)", border: "3px solid var(--bg)", boxShadow: "0 0 0 1px var(--line)", color: "var(--ink)", fontSize: 11, fontWeight: 700, display: "grid", placeItems: "center", flex: "none", fontVariantNumeric: "tabular-nums" }}>{s.n}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>{s.label}</span>
                  <span style={{ flex: "none", fontSize: 8.5, fontWeight: 700, color: t.c, background: t.bg, border: `1px solid ${t.b}`, borderRadius: 999, padding: "2px 8px" }}>{s.timing}</span>
                </div>
                {prod ? (
                  <div style={{ marginTop: 7, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, background: "var(--bg-2)", border: "1px solid var(--line)", borderRadius: 12, padding: "9px 12px" }}>
                    <span style={{ fontSize: 11.5, color: "var(--ink-soft)", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{prod.name}</span>
                    <window.Icon name="CheckSquare" size={14} style={{ color: "var(--mint)", flex: "none" }} />
                  </div>
                ) : (
                  <div style={{ fontSize: 10.5, color: "var(--dim)", fontStyle: "italic", marginTop: 6 }}>{s.empty}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TravelPacking({ inventory, travelRes, loading, onTravel }) {
  const { Button, TextField, EvidenceTag } = DS_rt;
  const submit = (e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); onTravel(fd.get("destination"), parseInt(fd.get("days"), 10) || 7); };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <form onSubmit={submit} style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--r-sheet)", padding: 18, display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--muted)" }}>智能规划目的地气候及推荐用量</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <TextField label="目的地" name="destination" defaultValue="三亚" placeholder="如：伦敦、东京" required />
          <TextField label="旅行天数" name="days" type="number" min="1" defaultValue="7" required />
        </div>
        <Button type="submit" disabled={loading}><span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><window.Icon name="Plane" size={16} /> {loading ? "规划中…" : "生成打包清单"}</span></Button>
      </form>
      {travelRes && (
        <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--r-sheet)", padding: 18 }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--muted)" }}>打包清单</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
            {travelRes.selectedIds.map((id) => {
              const p = inventory.find((x) => x.id === id);
              return p ? (
                <div key={id} style={{ display: "flex", alignItems: "center", gap: 11, background: "var(--bg-2)", border: "1px solid var(--line)", borderRadius: 14, padding: "10px 12px" }}>
                  <DS_rt.BottleGlyph shape={p.bottle.shape} colorHex={p.bottle.colorHex} category={p.category} height={30} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
                    <div style={{ fontSize: 10, color: "var(--muted)" }}>{D_rt.categoryLabels[p.category] || p.category}</div>
                  </div>
                  <window.Icon name="Check" size={15} style={{ color: "var(--mint)", marginLeft: "auto", flex: "none" }} />
                </div>
              ) : null;
            })}
          </div>
          <div style={{ fontSize: 11.5, color: "var(--muted)", lineHeight: 1.7, marginTop: 12 }}>{travelRes.reason}</div>
          <div style={{ marginTop: 10 }}><EvidenceTag>基于你的柜子 · 不超量</EvidenceTag></div>
        </div>
      )}
    </div>
  );
}

function ShelfieRoutine({ inventory, sub, setSub, travelRes, loading, onTravel, accountCopy, onOpenAccount, onDismissAccount }) {
  const { SegmentedControl } = DS_rt;
  return (
    <div style={{ flex: 1, minHeight: 0, overflowY: "auto", display: "flex", flexDirection: "column", gap: 14, padding: "6px 20px 8px" }}>
      {accountCopy && <window.AccountPromptCard copy={accountCopy} onOpen={onOpenAccount} onDismiss={onDismissAccount} />}
      <SegmentedControl value={sub} onChange={setSub} options={[{ value: "routine", label: "每日护肤日常" }, { value: "travel", label: "出行智能收纳" }]} />
      {sub === "routine" ? <RoutineTimeline inventory={inventory} /> : <TravelPacking inventory={inventory} travelRes={travelRes} loading={loading} onTravel={onTravel} />}
    </div>
  );
}

Object.assign(window, { ShelfieRoutine });
