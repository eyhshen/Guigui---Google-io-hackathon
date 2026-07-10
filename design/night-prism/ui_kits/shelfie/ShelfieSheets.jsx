/* Bottom-sheet bodies: product detail, profile editor, guest-account prompt.
   Rendered inside the DS <BottomSheet>. Mirror upstream product sheet /
   profile modal / GuestAccountPromptSheet. */
const DS_sheet = window.NightPrismDesignSystem_4de317;
const D_sheet = window.ShelfieData;

function ProductSheetBody({ p, onClose, onDelete }) {
  const { BottleGlyph, PaoMeter, EvidenceTag } = DS_sheet;
  const opened = D_sheet.monthsOpened(p);
  return (
    <div>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <div style={{ width: 74, height: 92, flex: "none", borderRadius: "var(--r-card)", background: "var(--bg-2)", border: "1px solid var(--line)", display: "grid", placeItems: "center" }}><BottleGlyph shape={p.bottle.shape} colorHex={p.bottle.colorHex} category={p.category} height={64} /></div>
        <div style={{ minWidth: 0 }}>
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--muted)", background: "var(--surface-2)", border: "1px solid var(--line)", borderRadius: 999, padding: "3px 9px" }}>{p.brand}</span>
          <div style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", marginTop: 8, lineHeight: 1.3 }}>{p.name}</div>
          <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 3 }}>{D_sheet.categoryLabels[p.category] || p.category}</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 16 }}>
        <div style={infoCell()}>
          <div style={infoLab()}>开封时间</div>
          <div style={infoVal()}>{D_sheet.fmtYearMonth(p.openedDate)}</div>
        </div>
        <div style={infoCell()}>
          <div style={infoLab()}>预计到期</div>
          <div style={infoVal()}>{D_sheet.fmtYearMonth(p.expiryDate)} <span style={{ fontSize: 10, color: "var(--dim)", fontWeight: 400 }}>({p.paoMonths}个月 PAO)</span></div>
        </div>
      </div>
      <div style={{ marginTop: 16 }}><PaoMeter opened={opened} pao={p.paoMonths} /></div>
      <div style={{ marginTop: 16 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--muted)" }}>核心活性成分 ({p.keyIngredients.length})</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 9 }}>
          {p.keyIngredients.map((ing) => <span key={ing} style={{ fontSize: 11, color: "var(--ink-soft)", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 999, padding: "5px 11px" }}>{ing}</span>)}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14 }}>
        <EvidenceTag>成分与 PAO 来自扫描识别 · T2</EvidenceTag>
      </div>
      <button onClick={() => onDelete(p)} style={{ font: "inherit", marginTop: 16, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "var(--tint-rose)", border: "1px solid var(--border-rose)", color: "var(--ink-on-rose)", borderRadius: "var(--r-pill)", minHeight: 48, cursor: "pointer", fontSize: 13, fontWeight: 600 }}><window.Icon name="Trash2" size={15} /> 从柜子移除</button>
    </div>
  );
}

function ProfileModalBody({ profile, onSave }) {
  const { Button, TextField, SegmentedControl } = DS_sheet;
  const [skinType, setSkinType] = React.useState(profile.skinType || "");
  const [sens, setSens] = React.useState((profile.sensitivities || []).join("，"));
  const [act, setAct] = React.useState((profile.currentActives || []).join("，"));
  const [city, setCity] = React.useState(profile.city || "");
  const split = (s) => s.split(/[,，]/).map((x) => x.trim()).filter(Boolean);
  return (
    <div style={{ maxHeight: "min(78vh, 620px)", overflowY: "auto", margin: "0 -4px", padding: "0 4px" }}>
      <div style={{ fontFamily: "'Noto Sans SC', sans-serif", fontSize: 20, fontWeight: 500, letterSpacing: ".04em", color: "var(--ink)" }}>肤质<b style={{ fontFamily: "'Noto Sans SC', sans-serif", fontWeight: 700, background: "var(--prism)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>档案</b></div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 14 }}>
        <div>
          <div style={fieldLab()}>肤质</div>
          <SegmentedControl value={skinType} onChange={setSkinType} options={[{ value: "dry", label: "干性" }, { value: "oily", label: "油性" }, { value: "combination", label: "混合" }, { value: "normal", label: "中性" }]} />
        </div>
        <TextField label="敏感成分 (逗号隔开)" value={sens} onChange={(e) => setSens(e.target.value)} placeholder="如：香精, 酒精, 视黄醇" />
        <TextField label="常用活性 (逗号隔开)" value={act} onChange={(e) => setAct(e.target.value)} placeholder="如：烟酰胺, 维C, A醇" />
        <TextField label="你当前所在城市" value={city} onChange={(e) => setCity(e.target.value)} placeholder="如：上海" />
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <Button style={{ flex: 1 }} onClick={() => onSave({ skinType: skinType || null, sensitivities: split(sens), currentActives: split(act), city: city.trim() })}>保存档案 ✓</Button>
      </div>
    </div>
  );
}

function AccountSheetBody({ copy, onClose }) {
  const { Button } = DS_sheet;
  return (
    <div>
      <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--amber)" }}>Save Later</div>
      <div style={{ fontSize: 17, fontWeight: 700, color: "var(--ink)", marginTop: 6, lineHeight: 1.35 }}>{copy.title}</div>
      <div style={{ fontSize: 12.5, lineHeight: 1.7, color: "var(--muted)", marginTop: 6 }}>{copy.description}</div>
      <div style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--r-card)", padding: 15, marginTop: 14 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--dim)" }}>未来账号入口会负责</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 11 }}>
          {copy.benefits.map((b) => <div key={b} style={{ fontSize: 12.5, fontWeight: 500, color: "var(--ink-soft)", background: "var(--bg-2)", border: "1px solid var(--line)", borderRadius: 12, padding: "10px 12px" }}>{b}</div>)}
        </div>
      </div>
      <div style={{ background: "var(--tint-amber)", border: "1px solid var(--border-amber)", borderRadius: "var(--r-card)", padding: "12px 14px", marginTop: 12, fontSize: 11.5, lineHeight: 1.7, color: "var(--ink-on-amber)" }}>这一批只把 guest-first 的时机和入口放对，不接 Google / Apple，也不做真实持久化。</div>
      <div style={{ marginTop: 16 }}><Button variant="ghost" style={{ width: "100%" }} onClick={onClose}>知道了，继续访客模式</Button></div>
    </div>
  );
}

/* app menu (hamburger) — carries the brand name (logo-only header omits it) + profile / account entries + disclaimer */
function MenuSheetBody({ profile, onProfile, onAccount, onClose }) {
  const D = window.ShelfieData;
  const skin = profile.skinType ? D.skinTypeLabels[profile.skinType] : "未设置";
  const sens = (profile.sensitivities || []).length ? profile.sensitivities.join("、") : "未填写";
  const rows = [
    { icon: "Sliders", label: "编辑肤质档案", sub: `肤质 ${skin} · 敏感 ${sens}`, onClick: onProfile },
    { icon: "Cloud", label: "保存与同步", sub: "访客模式 · 未来账号入口", onClick: onAccount },
  ];
  const rowStyle = { font: "inherit", width: "100%", display: "flex", alignItems: "center", gap: 12, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 16, padding: "12px 14px", cursor: "pointer", color: "inherit" };
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
        <img src="../../assets/guigui-logo.png" alt="柜柜" style={{ height: 42, width: "auto", display: "block", filter: "drop-shadow(0 0 11px rgba(199,168,240,.55))" }} />
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "var(--ink)", letterSpacing: ".02em" }}>柜柜</div>
          <div style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: ".24em", textTransform: "uppercase", color: "var(--dim)", marginTop: 3 }}>GuiGui Glow · SKĀN</div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20 }}>
        {rows.map((r) => (
          <button key={r.label} onClick={r.onClick} style={rowStyle}>
            <span style={{ width: 36, height: 36, flex: "none", borderRadius: 12, background: "var(--surface-2)", border: "1px solid var(--line)", display: "grid", placeItems: "center", color: "var(--ink-soft)" }}><window.Icon name={r.icon} size={17} /></span>
            <span style={{ flex: 1, textAlign: "left", minWidth: 0 }}>
              <span style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{r.label}</span>
              <span style={{ display: "block", fontSize: 11, color: "var(--muted)", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.sub}</span>
            </span>
            <window.Icon name="ChevronRight" size={16} style={{ color: "var(--dim)", flex: "none" }} />
          </button>
        ))}
      </div>
      <div style={{ fontSize: 10.5, color: "var(--dim)", lineHeight: 1.75, marginTop: 18, textAlign: "center" }}>柜柜提供的是一般护肤整理建议，非医疗诊断。孕期 / 处方药 / 皮肤破损感染请先咨询皮肤科医生。</div>
    </div>
  );
}

function infoCell() { return { background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--r-card-sm)", padding: "11px 13px" }; }
function infoLab() { return { fontSize: 10, color: "var(--dim)", fontWeight: 600, letterSpacing: ".04em" }; }
function infoVal() { return { fontSize: 13, color: "var(--ink)", fontWeight: 600, marginTop: 4, fontVariantNumeric: "tabular-nums" }; }
function fieldLab() { return { fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 8 }; }

Object.assign(window, { ProductSheetBody, ProfileModalBody, AccountSheetBody, MenuSheetBody });
