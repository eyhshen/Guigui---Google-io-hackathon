/* Shelfie shared composites — the app's mid-level cards, in Night Prism dark.
   Mirrors upstream components/{HomeSummary,EmptyCabinetState,ProfileCompletionPrompt,
   GuestAccountPrompt}.tsx. Composes DS primitives. */
const DS_ui = window.NightPrismDesignSystem_4de317;
const D_ui = window.ShelfieData;

/* bottom action dock (also used by onboarding via window.np_dock) */
function np_dock() {
  return {
    padding: "12px 20px calc(14px + var(--sab))", display: "flex", gap: 10,
    position: "relative", zIndex: 5, background: "linear-gradient(transparent, var(--bg) 40%)",
  };
}

/* ── 今日摘要 — state-driven priority card (expired > soon > first > missing > stable) ── */
function HomeSummary({ inventory, soonCount, expiredCount, missingCoreCategories, onScan }) {
  const { Card } = DS_ui;
  let s;
  if (expiredCount > 0) s = { badge: "最高优先级", icon: "ShieldAlert", metricLabel: "已过期", tone: "rose", metric: expiredCount, title: `你有 ${expiredCount} 件产品已经过期`, body: "先处理已过期产品，别再把它们留在日常决策里。今天优先确认停用、替换，或从柜子里移除。" };
  else if (soonCount > 0) s = { badge: "今日重点", icon: "CalendarClock", metricLabel: "临期提醒", tone: "amber", metric: soonCount, title: "今天先消化临期产品", body: `有 ${soonCount} 件产品进入临期窗口。今天先从这些开始，优先确认开封时间和使用顺序。` };
  else if (inventory.length === 1) s = { badge: "下一步", icon: "Sparkles", metricLabel: "基础柜子", tone: "lilac", metric: 1, title: "继续建立你的第一套柜子", body: "你已经有第一件产品了。继续补齐柜子，比先做复杂设置或登录更有价值。" };
  else if (missingCoreCategories.length > 0) s = { badge: "结构提醒", icon: "Sparkles", metricLabel: "待补品类", tone: "lilac", metric: missingCoreCategories.length, title: "今天优先补齐核心品类", body: `你的柜子已经能工作了，但还缺 ${missingCoreCategories.join(" / ")}。扫码时优先补缺口，比继续堆同类更有用。` };
  else s = { badge: "日常状态", icon: "Sparkles", metricLabel: "今日柜况", tone: "lilac", metric: inventory.length, title: "你的柜子今天状态稳定", body: "当前没有临期压力，柜子结构也稳定。今天按已有产品做决策，需要时再扫码补充。" };
  const tint = { rose: "var(--ink-on-rose)", amber: "var(--ink-on-amber)", lilac: "var(--ink-on-lilac)" }[s.tone];
  const bd = { rose: "var(--border-rose)", amber: "var(--border-amber)", lilac: "var(--border-lilac)" }[s.tone];
  const bg = { rose: "var(--tint-rose)", amber: "var(--tint-amber)", lilac: "var(--tint-lilac)" }[s.tone];
  return (
    <Card size="md" style={{ borderRadius: "var(--r-sheet)" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div>
          <div style={{ fontSize: 17, fontWeight: 700, color: "var(--ink)", lineHeight: 1.35 }}>{s.title}</div>
        </div>
      </div>
      <button onClick={onScan} style={{ font: "inherit", marginTop: 12, width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 16, padding: "11px 14px", cursor: "pointer", color: "inherit", textAlign: "left" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <span style={{ width: 34, height: 34, borderRadius: 999, background: "var(--prism)", color: "var(--on-prism)", display: "grid", placeItems: "center", flex: "none" }}><window.Icon name="Camera" size={16} /></span>
          <span>
            <span style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>继续扫码添加产品</span>
          </span>
        </span>
        <window.Icon name="ChevronRight" size={16} style={{ color: "var(--dim)", flex: "none" }} />
      </button>
    </Card>
  );
}

/* ── empty cabinet — scan primary + explore secondary ── */
function EmptyCabinet({ onScan, onExplore }) {
  const { Button } = DS_ui;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ borderRadius: "var(--r-sheet)", border: "1px solid var(--line)", background: "var(--surface)", padding: 20 }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".24em", textTransform: "uppercase", color: "var(--muted)" }}>Empty Cabinet</div>
        <div style={{ fontFamily: "var(--font-display, inherit)", fontSize: 22, fontWeight: 200, letterSpacing: ".04em", color: "var(--ink)", marginTop: 8, lineHeight: 1.4 }}>先扫第一件产品，<br />再开始用 <b style={{ fontWeight: 700, background: "var(--prism)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>柜柜</b></div>
        <div style={{ fontSize: 12.5, lineHeight: 1.75, color: "var(--muted)", marginTop: 10 }}>拍照识别产品，确认开封时间后，它就会进入你的化妆柜。先完成第一件，再看 AI 建议和日常搭配。</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
          <Button onClick={onScan}><span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><window.Icon name="Camera" size={16} /> 扫码添加第一件产品</span></Button>
          <Button variant="ghost" onClick={onExplore}><span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><window.Icon name="Sparkles" size={15} /> 先看看推荐灵感</span></Button>
        </div>
      </div>
      <div style={{ borderRadius: "var(--r-sheet)", border: "1px dashed var(--line)", background: "var(--surface)", padding: 22, textAlign: "center" }}>
        <div style={{ width: 52, height: 52, borderRadius: 999, background: "var(--surface-2)", border: "1px solid var(--line)", display: "grid", placeItems: "center", margin: "0 auto", color: "var(--muted)" }}><window.Icon name="Camera" size={22} /></div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink-soft)", marginTop: 14 }}>你的柜子还没有产品</div>
        <div style={{ fontSize: 11.5, lineHeight: 1.7, color: "var(--muted)", marginTop: 6 }}>扫描后自动提取品牌、品类、成分和开封保质期，你只需要补一个开封月份。</div>
      </div>
    </div>
  );
}

/* ── profile completion — mint card, "improves recs, never blocks" ── */
function ProfileCompletionPrompt({ title, description, emphasizedFields, onOpen }) {
  return (
    <section style={{ borderRadius: "var(--r-sheet)", border: "1px solid var(--border-mint)", background: "var(--tint-mint)", padding: 16 }}>
      <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--mint)" }}>Profile Later</div>
      <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink)", marginTop: 5 }}>{title}</div>
      <div style={{ fontSize: 11.5, lineHeight: 1.7, color: "var(--muted)", marginTop: 4 }}>{description}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
        {emphasizedFields.map((f) => <span key={f} style={{ fontSize: 10, fontWeight: 600, borderRadius: 999, padding: "4px 10px", color: "var(--ink-on-mint)", border: "1px solid var(--border-mint)", background: "var(--surface)" }}>{f}</span>)}
      </div>
      <button onClick={onOpen} style={{ font: "inherit", marginTop: 14, width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 16, padding: "11px 14px", cursor: "pointer", color: "inherit", textAlign: "left" }}>
        <span>
          <span style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>补充肤质档案</span>
          <span style={{ display: "block", fontSize: 11, color: "var(--muted)" }}>只增强推荐，不阻塞当前使用</span>
        </span>
        <window.Icon name="ArrowRight" size={16} style={{ color: "var(--dim)" }} />
      </button>
    </section>
  );
}

/* ── guest-first account prompt — amber card, dismissible, non-blocking ── */
function AccountPromptCard({ copy, onOpen, onDismiss }) {
  return (
    <section style={{ borderRadius: "var(--r-sheet)", border: "1px solid var(--border-amber)", background: "var(--tint-amber)", padding: 16 }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
        <div>
          <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--amber)" }}>Guest-First</div>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink)", marginTop: 5 }}>{copy.title}</div>
          <div style={{ fontSize: 11.5, lineHeight: 1.7, color: "var(--muted)", marginTop: 4 }}>{copy.description}</div>
        </div>
        <button onClick={onDismiss} aria-label="稍后再说" style={{ font: "inherit", flex: "none", width: 28, height: 28, borderRadius: 999, background: "var(--surface)", border: "1px solid var(--line)", color: "var(--muted)", cursor: "pointer", display: "grid", placeItems: "center" }}><window.Icon name="X" size={14} /></button>
      </div>
      <button onClick={onOpen} style={{ font: "inherit", marginTop: 14, width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 16, padding: "11px 14px", cursor: "pointer", color: "inherit", textAlign: "left" }}>
        <span>
          <span style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>查看保存与同步占位说明</span>
          <span style={{ display: "block", fontSize: 11, color: "var(--muted)" }}>本批次不做真实登录，只标记未来入口</span>
        </span>
        <window.Icon name="ArrowRight" size={16} style={{ color: "var(--dim)" }} />
      </button>
    </section>
  );
}

Object.assign(window, { np_dock, HomeSummary, EmptyCabinet, ProfileCompletionPrompt, AccountPromptCard });
