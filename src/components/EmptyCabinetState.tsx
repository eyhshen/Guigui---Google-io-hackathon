import { Camera, Sparkles } from 'lucide-react';

interface EmptyCabinetStateProps {
  onScan: () => void;
  onExplore: () => void;
}

export function EmptyCabinetState({ onScan, onExplore }: EmptyCabinetStateProps) {
  return (
    <div className="space-y-4">
      <section className="rounded-[28px] border border-stone-100 bg-white p-5 shadow-2xs">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-400">
            Empty Cabinet
          </p>
          <h2 className="text-xl font-bold tracking-tight text-stone-900">
            先扫第一件产品，再开始用 GuiGui
          </h2>
          <p className="text-sm leading-6 text-stone-500">
            拍照识别产品，确认开封时间后，它就会进入你的化妆柜。先完成第一件，再看 AI 建议和日常搭配。
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-3">
          <button
            onClick={onScan}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-stone-900 px-4 py-3.5 text-sm font-semibold text-white shadow-sm transition-all active:scale-[0.98] hover:bg-stone-700"
          >
            <Camera className="h-4 w-4" />
            扫码添加第一件产品
          </button>

          <button
            onClick={onExplore}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-semibold text-stone-600 transition-all active:scale-[0.98] hover:bg-stone-100 hover:text-stone-800"
          >
            <Sparkles className="h-4 w-4" />
            先看看推荐灵感
          </button>
        </div>
      </section>

      <section className="rounded-[28px] border border-dashed border-stone-200 bg-[#F7F3EE] p-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white text-stone-400 shadow-2xs">
          <Camera className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-sm font-semibold text-stone-700">你的柜子还没有产品</h3>
        <p className="mt-2 text-xs leading-5 text-stone-500">
          扫描后会自动提取品牌、品类、成分和开封保质期，你只需要补一个开封月份。
        </p>
      </section>
    </div>
  );
}
