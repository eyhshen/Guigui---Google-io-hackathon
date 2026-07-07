import { ArrowRight, X } from 'lucide-react';

interface GuestAccountPromptCardProps {
  description: string;
  title: string;
  onDismiss: () => void;
  onOpen: () => void;
}

interface GuestAccountPromptSheetProps {
  benefits: string[];
  description: string;
  title: string;
  onClose: () => void;
}

export function GuestAccountPromptCard({
  title,
  description,
  onOpen,
  onDismiss,
}: GuestAccountPromptCardProps) {
  return (
    <section className="rounded-[28px] border border-[#E8DFC9] bg-[#FFF9EE] p-4 text-[#855B00] shadow-2xs">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B1842D]">
            Guest-First
          </p>
          <h3 className="text-sm font-bold text-stone-800">{title}</h3>
          <p className="text-xs leading-5 text-stone-600">{description}</p>
        </div>

        <button
          onClick={onDismiss}
          className="rounded-full bg-white/80 p-1.5 text-stone-400 transition-colors hover:text-stone-700"
          title="稍后再说"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <button
        onClick={onOpen}
        className="mt-4 flex w-full items-center justify-between rounded-2xl bg-white px-4 py-3 text-left shadow-3xs transition-all active:scale-[0.98] hover:bg-stone-50"
      >
        <span>
          <span className="block text-sm font-semibold text-stone-800">查看保存与同步占位说明</span>
          <span className="block text-xs text-stone-500">本批次不做真实登录，只标记未来入口</span>
        </span>

        <ArrowRight className="h-4 w-4 text-stone-400" />
      </button>
    </section>
  );
}

export function GuestAccountPromptSheet({
  title,
  description,
  benefits,
  onClose,
}: GuestAccountPromptSheetProps) {
  return (
    <div className="w-full bg-white rounded-t-[32px] p-6 relative shadow-2xl pb-8">
      <div className="w-12 h-1.5 bg-stone-200 rounded-full mx-auto mb-4" />

      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-1.5 bg-stone-100 hover:bg-stone-200 rounded-full text-stone-500 hover:text-stone-800 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="space-y-3">
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#B1842D]">Save Later</p>
          <h3 className="text-lg font-bold text-stone-800">{title}</h3>
          <p className="text-sm leading-6 text-stone-500">{description}</p>
        </div>

        <div className="rounded-2xl border border-stone-100 bg-[#FAF8F5] p-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-stone-400">未来账号入口会负责</p>
          <div className="mt-3 space-y-2">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="rounded-xl bg-white px-3 py-2 text-sm font-medium text-stone-700 shadow-3xs"
              >
                {benefit}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-[#FFF9EE] p-4 text-xs leading-5 text-stone-600 border border-[#E8DFC9]">
          这一批只把 guest-first 的时机和入口放对，不接 Google / Apple，也不做真实持久化。
        </div>

        <button
          onClick={onClose}
          className="w-full bg-stone-800 hover:bg-stone-700 text-white py-3.5 rounded-xl font-bold text-xs active:scale-95 transition-all shadow-sm"
        >
          知道了，继续访客模式
        </button>
      </div>
    </div>
  );
}
