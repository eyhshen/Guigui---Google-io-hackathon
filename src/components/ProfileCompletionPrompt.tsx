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
    <section className="rounded-[28px] border border-[#DCE8DF] bg-[#F4F8F4] p-4 shadow-2xs">
      <div className="space-y-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#5F8B68]">Profile Later</p>
        <h3 className="text-sm font-bold text-stone-800">{title}</h3>
        <p className="text-xs leading-5 text-stone-500">{description}</p>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {emphasizedFields.map((field) => (
          <span
            key={field}
            className="rounded-full border border-[#CFE0D3] bg-white px-2.5 py-1 text-[10px] font-semibold text-[#4F7056] shadow-3xs"
          >
            {field}
          </span>
        ))}
      </div>

      <button
        onClick={onOpen}
        className="mt-4 flex w-full items-center justify-between rounded-2xl bg-white px-4 py-3 text-left shadow-3xs transition-all active:scale-[0.98] hover:bg-stone-50"
      >
        <span>
          <span className="block text-sm font-semibold text-stone-800">补充肤质档案</span>
          <span className="block text-xs text-stone-500">只增强推荐，不阻塞当前使用</span>
        </span>

        <ArrowRight className="h-4 w-4 text-stone-400" />
      </button>
    </section>
  );
}
