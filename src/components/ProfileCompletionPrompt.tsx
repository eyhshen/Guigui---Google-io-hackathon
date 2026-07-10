import { ArrowRight } from 'lucide-react';

interface ProfileCompletionPromptProps {
  description: string;
  emphasizedFields: string[];
  title: string;
  onOpen: () => void;
}

export function ProfileCompletionPrompt({
  title,
  description,
  emphasizedFields,
  onOpen,
}: ProfileCompletionPromptProps) {
  return (
    <section className="rounded-[28px] border border-[#A7E8C0]/30 bg-[#A7E8C0]/10 p-4 shadow-none">
      <div className="space-y-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#A7E8C0]">Profile Later</p>
        <h3 className="text-sm font-bold text-[#F1EDF7]">{title}</h3>
        <p className="text-xs leading-5 text-[#9C94B3]">{description}</p>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {emphasizedFields.map((field) => (
          <span
            key={field}
            className="rounded-full border border-[#A7E8C0]/30 bg-white/[0.06] px-2.5 py-1 text-[10px] font-semibold text-[#A7E8C0] shadow-none"
          >
            {field}
          </span>
        ))}
      </div>

      <button
        onClick={onOpen}
        className="mt-4 flex w-full items-center justify-between rounded-2xl bg-white/5 px-4 py-3 text-left shadow-none transition-all active:scale-[0.98] hover:bg-white/[0.06]"
      >
        <span>
          <span className="block text-sm font-semibold text-[#F1EDF7]">补充肤质档案</span>
          <span className="block text-xs text-[#9C94B3]">只增强推荐，不阻塞当前使用</span>
        </span>

        <ArrowRight className="h-4 w-4 text-[#6E6884]" />
      </button>
    </section>
  );
}
