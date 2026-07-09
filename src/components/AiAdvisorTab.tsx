/* AI advisor tab — chat + verdict cards + quick chips + Textarea composer.
   Mirrors upstream App.tsx `ai` tab. getVerdict runs as a local mock (data.js). */
import React from 'react';
import { Icon, Button, Textarea, EvidenceTag } from '../np/ui';
import { quickAsks } from '../data';
import { ProfileCompletionPrompt, AccountPromptCard } from './prompts';
import { ChatMessage, Product } from '../types';

function VerdictChips({ ids, tone, inventory }: { ids?: string[]; tone: 'mint' | 'rose'; inventory: Product[] }) {
  if (!ids || !ids.length) return null;
  const label = tone === "mint" ? "建议今天使用：" : "建议今天避开：";
  const icon = tone === "mint" ? "Check" : "AlertCircle";
  const col = tone === "mint" ? "var(--mint)" : "var(--rose)";
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 700, color: col, marginBottom: 7 }}><Icon name={icon} size={14} /> {label}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {ids.map((id) => {
          const p = inventory.find((x) => x.id === id);
          return p ? <span key={id} style={{ fontSize: 10.5, fontWeight: 600, borderRadius: 999, padding: "4px 11px", color: tone === "mint" ? "var(--ink-on-mint)" : "var(--ink-on-rose)", background: tone === "mint" ? "var(--tint-mint)" : "var(--tint-rose)", border: `1px solid ${tone === "mint" ? "var(--border-mint)" : "var(--border-rose)"}` }}>{p.name}</span> : null;
        })}
      </div>
    </div>
  );
}

export function AiAdvisorTab({ messages, query, setQuery, loading, onAsk, onSend, inventory, promptProfile, onOpenProfile, accountCopy, onOpenAccount, onDismissAccount }: {
  messages: ChatMessage[];
  query: string;
  setQuery: (v: string) => void;
  loading: boolean;
  onAsk: (text: string) => void;
  onSend: () => void;
  inventory: Product[];
  promptProfile: boolean;
  onOpenProfile: () => void;
  accountCopy: { title: string; description: string } | null;
  onOpenAccount: () => void;
  onDismissAccount: () => void;
}) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages, loading]);
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12, padding: "6px 20px 0", minHeight: 0 }}>
      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, minHeight: 0 }}>
        {promptProfile && <ProfileCompletionPrompt title="在问 AI 前，先补一点基础档案" description="这里不拦你继续提问，但先补肤质和敏感成分，AI 会更少给泛化建议。" emphasizedFields={["肤质", "敏感成分"]} onOpen={onOpenProfile} />}
        {accountCopy && <AccountPromptCard copy={accountCopy} onOpen={onOpenAccount} onDismiss={onDismissAccount} />}
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.sender === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "86%", borderRadius: 20, padding: "12px 14px", fontSize: 12.5, lineHeight: 1.7,
              color: "var(--ink)",
              background: m.sender === "user" ? "var(--surface-2)" : "var(--surface)",
              border: "1px solid var(--line)",
              borderTopRightRadius: m.sender === "user" ? 6 : 20,
              borderTopLeftRadius: m.sender === "user" ? 20 : 6,
            }}>
              <div style={{ whiteSpace: "pre-line" }}>{m.text}</div>
              {m.verdict && (
                <div style={{ marginTop: 11, paddingTop: 11, borderTop: "1px solid var(--line)", display: "flex", flexDirection: "column", gap: 11 }}>
                  <VerdictChips ids={m.verdict.recommendedIds} tone="mint" inventory={inventory} />
                  <VerdictChips ids={m.verdict.avoidIds} tone="rose" inventory={inventory} />
                  <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
                    <EvidenceTag>inventory-aware · 只从你架子上挑</EvidenceTag>
                    <span style={{ fontSize: 10, color: "var(--dim)" }}>仅供参考 · 非医疗建议</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 20, borderTopLeftRadius: 6, padding: "12px 15px", fontSize: 12, color: "var(--muted)" }}>
              <span style={{ display: "flex", gap: 4 }}>
                {[0, 1, 2].map((k) => <i key={k} className="np-dot" style={{ width: 6, height: 6, borderRadius: 999, background: "var(--muted)", animation: "np-bounce 1s infinite", animationDelay: `${k * 150}ms` }}></i>)}
              </span>
              GuiGui 正在为你调配诊疗建议…
            </div>
          </div>
        )}
      </div>
      {/* quick chips */}
      <div style={{ display: "flex", gap: 7, overflowX: "auto", paddingBottom: 2, scrollbarWidth: "none", flex: "none" }}>
        {quickAsks.map((q) => (
          <button key={q.chip} onClick={() => onAsk(q.text)} disabled={loading} style={{ font: "inherit", flex: "none", cursor: loading ? "default" : "pointer", fontSize: 10.5, color: "var(--ink-soft)", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 999, padding: "8px 13px", whiteSpace: "nowrap", opacity: loading ? .5 : 1 }}>{q.chip}</button>
        ))}
      </div>
      {/* composer */}
      <div style={{ display: "flex", gap: 9, alignItems: "stretch", padding: "0 0 calc(12px + var(--sab))", flex: "none" }}>
        <Textarea value={query} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setQuery(e.target.value)} placeholder="描述你当下的皮肤状况或困扰…" onSubmit={onSend} style={{ minHeight: 48 }} />
        <Button onClick={onSend} disabled={loading || !query.trim()} aria-label="发送" style={{ minHeight: 0, width: 48, padding: 0, flex: "none", alignSelf: "stretch", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="ArrowRight" size={20} /></Button>
      </div>
    </div>
  );
}
