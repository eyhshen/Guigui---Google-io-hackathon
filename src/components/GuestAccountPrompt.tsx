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
    <section className="rounded-[28px] border border-[#F5C377]/30 bg-[#F5C377]/10 p-4 text-[#F5C377] shadow-none">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F5C377]">
            Guest-First
          </p>
          <h3 className="text-sm font-bold text-[#F1EDF7]">{title}</h3>
          <p className="text-xs leading-5 text-[#CFC8E0]">{description}</p>
        </div>

        <button
          onClick={onDismiss}
          className="rounded-full bg-white/5 p-1.5 text-[#6E6884] transition-colors hover:text-[#CFC8E0]"
          title="稍后再说"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <button
        onClick={onOpen}
        className="mt-4 flex w-full items-center justify-between rounded-2xl bg-white/5 px-4 py-3 text-left shadow-3xs transition-all active:scale-[0.98] hover:bg-white/[0.06]"
      >
        <span>
          <span className="block text-sm font-semibold text-[#F1EDF7]">查看保存与同步占位说明</span>
          <span className="block text-xs text-[#9C94B3]">本批次不做真实登录，只标记未来入口</span>
        </span>

        <ArrowRight className="h-4 w-4 text-[#6E6884]" />
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
    <div className="w-full bg-[#1B1828] rounded-t-[32px] p-6 relative shadow-2xl pb-8">
      <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-4" />

      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-1.5 bg-white/[0.06] hover:bg-white/10 rounded-full text-[#9C94B3] hover:text-[#F1EDF7] transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="space-y-3">
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F5C377]">Save Later</p>
          <h3 className="text-lg font-bold text-[#F1EDF7]">{title}</h3>
          <p className="text-sm leading-6 text-[#9C94B3]">{description}</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#6E6884]">未来账号入口会负责</p>
          <div className="mt-3 space-y-2">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="rounded-xl bg-white/[0.07] px-3 py-2 text-sm font-medium text-[#CFC8E0] shadow-3xs"
              >
                {benefit}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-[#F5C377]/10 p-4 text-xs leading-5 text-[#CFC8E0] border border-[#F5C377]/30">
          这一批只把 guest-first 的时机和入口放对，不接 Google / Apple，也不做真实持久化。
        </div>

        <button
          onClick={onClose}
          className="w-full bg-[linear-gradient(100deg,#F5C0CB,#F7DDB2_30%,#BEEBD1_60%,#B4D6F5_85%,#D3BDF2)] text-[#16141F] py-3.5 rounded-xl font-bold text-xs active:scale-95 transition-all shadow-[0_10px_34px_-8px_rgba(199,168,240,.55)]"
        >
          知道了，继续访客模式
        </button>
      </div>
    </div>
  );
}
