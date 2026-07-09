import { ArrowRight, AlertCircle, Camera, Check, Sparkles } from 'lucide-react';
import { GuestAccountPromptCard } from './GuestAccountPrompt';
import { ProfileCompletionPrompt } from './ProfileCompletionPrompt';
import { AccountPromptTrigger, ChatMessage, Product } from '../types';

type AccountPromptCopy = {
  description: string;
  title: string;
};

interface AiAdvisorTabProps {
  activeAccountPromptCopy: AccountPromptCopy | null;
  activeAccountPromptTrigger: AccountPromptTrigger | null;
  aiInventoryHint: string;
  chatMessages: ChatMessage[];
  inventory: Product[];
  loading: boolean;
  profileQualityHint: string;
  query: string;
  shouldPromptProfileCompletion: boolean;
  onDismissAccountPrompt: () => void;
  onOpenAccountPrompt: () => void;
  onOpenProfile: () => void;
  onQuickAsk: (text: string) => void;
  onRequestVerdict: () => void;
  onScan: () => void;
  onSetQuery: (query: string) => void;
}

export function AiAdvisorTab({
  activeAccountPromptCopy,
  activeAccountPromptTrigger,
  aiInventoryHint,
  chatMessages,
  inventory,
  loading,
  profileQualityHint,
  query,
  shouldPromptProfileCompletion,
  onDismissAccountPrompt,
  onOpenAccountPrompt,
  onOpenProfile,
  onQuickAsk,
  onRequestVerdict,
  onScan,
  onSetQuery,
}: AiAdvisorTabProps) {
  const hasInventory = inventory.length > 0;

  return (
    <div className="flex flex-col h-full px-4 py-2 gap-4">
      <section className="rounded-[28px] border border-stone-100 bg-white p-4 shadow-2xs">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#E8F3E8] text-[#3D7D52]">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-400">Inventory-Aware AI</p>
            <h2 className="text-sm font-bold text-stone-900">只根据你的柜子做今日取舍</h2>
            <p className="text-xs leading-5 text-stone-500">
              {aiInventoryHint}；{profileQualityHint}。这里不做通用护肤百科，也不替代皮肤科判断。
            </p>
          </div>
        </div>

        {!hasInventory && (
          <button
            onClick={onScan}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-stone-900 px-4 py-3 text-xs font-semibold text-white shadow-sm transition-all active:scale-[0.98] hover:bg-stone-700"
          >
            <Camera className="h-4 w-4" />
            先扫码添加第一件产品
          </button>
        )}
      </section>

      {shouldPromptProfileCompletion && (
        <ProfileCompletionPrompt
          title="在问 AI 前，先补一点基础档案"
          description="这里不拦你继续提问，但如果先补肤质和敏感成分，AI 会更少给出泛化建议。"
          emphasizedFields={['肤质', '敏感成分']}
          onOpen={onOpenProfile}
        />
      )}

      {activeAccountPromptTrigger === 'ai-advice' && activeAccountPromptCopy && (
        <GuestAccountPromptCard
          title={activeAccountPromptCopy.title}
          description={activeAccountPromptCopy.description}
          onOpen={onOpenAccountPrompt}
          onDismiss={onDismissAccountPrompt}
        />
      )}

      <div className="flex-1 space-y-4 overflow-y-auto max-h-[460px] pr-1">
        {chatMessages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-3xl p-4 text-xs shadow-3xs leading-relaxed space-y-3 ${
                msg.sender === 'user'
                  ? 'bg-stone-800 text-white rounded-tr-none'
                  : 'bg-white text-stone-800 border border-stone-100 rounded-tl-none'
              }`}
            >
              <p className="whitespace-pre-line">{msg.text}</p>

              {msg.verdict && (
                <div className="pt-2 border-t border-stone-100/30 space-y-3">
                  {msg.verdict.recommendedIds.length > 0 && (
                    <div>
                      <p className="font-bold text-[#3D7D52] mb-1.5 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> 建议今天使用：
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.verdict.recommendedIds.map(id => {
                          const prod = inventory.find(i => i.id === id);
                          return prod ? (
                            <span key={id} className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#E8F3E8] text-[#3D7D52] rounded-full text-[10px] font-semibold border border-[#3D7D52]/10 shadow-3xs">
                              {prod.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                  {msg.verdict.avoidIds.length > 0 && (
                    <div>
                      <p className="font-bold text-rose-600 mb-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> 建议今天避开：
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.verdict.avoidIds.map(id => {
                          const prod = inventory.find(i => i.id === id);
                          return prod ? (
                            <span key={id} className="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-50 text-rose-600 rounded-full text-[10px] font-semibold border border-rose-100 shadow-3xs">
                              {prod.name}
                            </span>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-stone-100 rounded-3xl rounded-tl-none p-4 text-xs text-stone-500 shadow-3xs flex items-center gap-2">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <span>GuiGui 正在为您调配诊疗建议...</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 shrink-0 scrollbar-none select-none">
        <button
          onClick={() => onQuickAsk('下巴长痘且发红，很紧绷')}
          disabled={!hasInventory || loading}
          className="px-3 py-1.5 bg-white border border-stone-100 text-[10px] text-stone-600 hover:text-stone-800 rounded-full whitespace-nowrap shadow-3xs"
        >
          从我的柜子里挑温和组合
        </button>
        <button
          onClick={() => onQuickAsk('天气太热了，T区出油严重')}
          disabled={!hasInventory || loading}
          className="px-3 py-1.5 bg-white border border-stone-100 text-[10px] text-stone-600 hover:text-stone-800 rounded-full whitespace-nowrap shadow-3xs"
        >
          今天出油，哪些先避开
        </button>
        <button
          onClick={() => onQuickAsk('敏感期换季，求温和修复组合')}
          disabled={!hasInventory || loading}
          className="px-3 py-1.5 bg-white border border-stone-100 text-[10px] text-stone-600 hover:text-stone-800 rounded-full whitespace-nowrap shadow-3xs"
        >
          用现有产品排早晚顺序
        </button>
      </div>

      <div className="flex gap-2 shrink-0">
        <textarea
          value={query}
          onChange={e => onSetQuery(e.target.value)}
          placeholder={!hasInventory ? '先添加产品后再咨询柜子建议' : '描述今天状态，例如：泛红紧绷，想从柜子里挑温和组合'}
          className="flex-1 h-12 bg-white border border-stone-100 rounded-2xl px-4 py-3 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-400 resize-none shadow-3xs leading-relaxed"
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              onRequestVerdict();
            }
          }}
        />
        <button
          onClick={onRequestVerdict}
          disabled={loading || !query.trim() || !hasInventory}
          className="w-12 h-12 bg-stone-800 hover:bg-stone-700 text-white rounded-2xl flex items-center justify-center active:scale-95 transition-transform disabled:opacity-40 disabled:hover:bg-stone-800 shadow-2xs"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
