import { Camera, Sparkles } from 'lucide-react';

interface EmptyCabinetStateProps {
  onScan: () => void;
  onExplore: () => void;
}

export function EmptyCabinetState({ onScan, onExplore }: EmptyCabinetStateProps) {
  return (
    <div className="space-y-4">
      <section className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-2xs">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6E6884]">
            Empty Cabinet
          </p>
          <h2 className="text-xl font-bold tracking-tight text-[#F1EDF7]">
            先扫第一件产品，再开始用 GuiGui
          </h2>
          <p className="text-sm leading-6 text-[#9C94B3]">
            拍照识别产品，确认开封时间后，它就会进入你的化妆柜。先完成第一件，再看 AI 建议和日常搭配。
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-3">
          <button
            onClick={onScan}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(100deg,#F5C0CB,#F7DDB2_30%,#BEEBD1_60%,#B4D6F5_85%,#D3BDF2)] px-4 py-3.5 text-sm font-semibold text-[#16141F] shadow-[0_10px_34px_-8px_rgba(199,168,240,.55)] transition-all active:scale-[0.98]"
          >
            <Camera className="h-4 w-4" />
            扫码添加第一件产品
          </button>

          <button
            onClick={onExplore}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-[#CFC8E0] transition-all active:scale-[0.98] hover:bg-white/[0.06] hover:text-[#F1EDF7]"
          >
            <Sparkles className="h-4 w-4" />
            先看看推荐灵感
          </button>
        </div>
      </section>

      <section className="rounded-[28px] border border-dashed border-white/10 bg-white/5 p-6 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/[0.07] text-[#6E6884] shadow-2xs">
          <Camera className="h-6 w-6" />
        </div>
        <h3 className="mt-4 text-sm font-semibold text-[#CFC8E0]">你的柜子还没有产品</h3>
        <p className="mt-2 text-xs leading-5 text-[#9C94B3]">
          扫描后会自动提取品牌、品类、成分和开封保质期，你只需要补一个开封月份。
        </p>
      </section>
    </div>
  );
}
