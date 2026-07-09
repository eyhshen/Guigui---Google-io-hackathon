import React from 'react';
import { CheckSquare, Plane, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import { GuestAccountPromptCard } from './GuestAccountPrompt';
import { AccountPromptTrigger, Product, TravelResult } from '../types';

type AccountPromptCopy = {
  description: string;
  title: string;
};

type TravelActiveTab = 'routine' | 'travel';

type RoutineStep = {
  category: string;
  emptyText: string;
  label: string;
  step: number;
  tagClassName: string;
  timing: string;
};

const routineSteps: RoutineStep[] = [
  {
    category: 'Cleanser',
    emptyText: '暂无可用洁面，建议在「探索」或「拍照」中添加',
    label: '洁面乳 · Cleanser',
    step: 1,
    tagClassName: 'bg-[#E8F3E8] text-[#3D7D52]',
    timing: '早晚',
  },
  {
    category: 'Toner',
    emptyText: '暂无可用补水，建议添加爽肤水',
    label: '爽肤补水 · Toner',
    step: 2,
    tagClassName: 'bg-sky-50 text-sky-700',
    timing: '晚间',
  },
  {
    category: 'Serum',
    emptyText: '暂无可用精华，建议添加精华液',
    label: '密集修复 · Serum',
    step: 3,
    tagClassName: 'bg-[#E8F3E8] text-[#3D7D52]',
    timing: '早晚',
  },
  {
    category: 'Moisturizer',
    emptyText: '暂无可用保湿霜，建议添加面霜',
    label: '锁水保湿 · Cream',
    step: 4,
    tagClassName: 'bg-stone-100 text-stone-600',
    timing: '早晚',
  },
  {
    category: 'Sunscreen',
    emptyText: '暂无可用防晒，建议添加防晒霜',
    label: '日间防护 · Sunscreen',
    step: 5,
    tagClassName: 'bg-amber-50 text-amber-700',
    timing: '日间',
  },
];

interface RoutineStepRowProps {
  key?: React.Key;
  product?: Product;
  step: RoutineStep;
}

function RoutineStepRow({ product, step }: RoutineStepRowProps) {
  return (
    <div className="flex gap-4 relative z-10">
      <div className="w-6 h-6 rounded-full bg-stone-800 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0 border-4 border-white shadow-sm">
        {step.step}
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <h5 className="text-xs font-bold text-stone-800">{step.label}</h5>
          <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-bold ${step.tagClassName}`}>{step.timing}</span>
        </div>
        {product ? (
          <div className="bg-[#FAF8F5] p-2.5 rounded-xl border border-stone-100 flex items-center justify-between">
            <span className="text-[11px] text-stone-700 font-medium truncate max-w-[180px]">
              {product.name}
            </span>
            <CheckSquare className="w-3.5 h-3.5 text-[#3D7D52]" />
          </div>
        ) : (
          <p className="text-[10px] text-stone-400 italic">{step.emptyText}</p>
        )}
      </div>
    </div>
  );
}

interface RoutineTravelTabProps {
  activeAccountPromptCopy: AccountPromptCopy | null;
  activeAccountPromptTrigger: AccountPromptTrigger | null;
  inventory: Product[];
  loading: boolean;
  travelActiveTab: TravelActiveTab;
  travelInventoryHint: string;
  travelRes: TravelResult | null;
  onDismissAccountPrompt: () => void;
  onOpenAccountPrompt: () => void;
  onRequestTravel: (event: React.FormEvent<HTMLFormElement>) => void;
  onSetTravelActiveTab: (tab: TravelActiveTab) => void;
}

export function RoutineTravelTab({
  activeAccountPromptCopy,
  activeAccountPromptTrigger,
  inventory,
  loading,
  travelActiveTab,
  travelInventoryHint,
  travelRes,
  onDismissAccountPrompt,
  onOpenAccountPrompt,
  onRequestTravel,
  onSetTravelActiveTab,
}: RoutineTravelTabProps) {
  const readyStepCount = routineSteps.filter(step => inventory.some(product => product.category === step.category)).length;

  return (
    <div className="px-4 py-2 space-y-4">
      {activeAccountPromptTrigger === 'travel-plan' && activeAccountPromptCopy && (
        <GuestAccountPromptCard
          title={activeAccountPromptCopy.title}
          description={activeAccountPromptCopy.description}
          onOpen={onOpenAccountPrompt}
          onDismiss={onDismissAccountPrompt}
        />
      )}

      <div className="bg-white p-1 rounded-xl flex border border-stone-100 shadow-3xs">
        <button
          onClick={() => onSetTravelActiveTab('routine')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            travelActiveTab === 'routine'
              ? 'bg-stone-100 text-stone-800'
              : 'text-stone-400 hover:text-stone-600'
          }`}
        >
          每日护肤日常
        </button>
        <button
          onClick={() => onSetTravelActiveTab('travel')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            travelActiveTab === 'travel'
              ? 'bg-stone-100 text-stone-800'
              : 'text-stone-400 hover:text-stone-600'
          }`}
        >
          出行智能收纳
        </button>
      </div>

      {travelActiveTab === 'routine' ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white p-3.5 rounded-2xl border border-stone-100 shadow-3xs">
            <p className="text-xs text-stone-500 font-medium">每日配方</p>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] text-stone-500 font-bold">
                {readyStepCount} 步已就绪
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-2xs relative space-y-6">
            <div className="absolute left-[27px] top-8 bottom-8 w-0.5 bg-stone-100" />
            {routineSteps.map(step => (
              <RoutineStepRow
                key={step.category}
                step={step}
                product={inventory.find(product => product.category === step.category)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <form onSubmit={onRequestTravel} className="bg-white p-5 rounded-3xl border border-stone-100 shadow-3xs space-y-4">
            <div className="space-y-1">
              <p className="text-xs text-stone-800 font-bold">从我的柜子生成出行打包清单</p>
              <p className="text-[11px] leading-5 text-stone-500">
                {travelInventoryHint}。目的地只用于判断气候场景，不会推荐你还没拥有的新品。
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] text-stone-500 font-bold">目的地</label>
                <input
                  name="destination"
                  required
                  defaultValue="三亚"
                  placeholder="如：伦敦、东京"
                  className="w-full bg-[#FAF8F5] border border-stone-100 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-none focus:border-stone-400"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] text-stone-500 font-bold">旅行天数</label>
                <input
                  name="days"
                  type="number"
                  required
                  defaultValue="7"
                  min="1"
                  className="w-full bg-[#FAF8F5] border border-stone-100 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-none focus:border-stone-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-stone-800 hover:bg-stone-700 text-white py-3 rounded-xl font-semibold text-xs active:scale-95 transition-all shadow-sm flex items-center justify-center gap-1.5 disabled:opacity-40"
            >
              {loading ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Plane className="w-3.5 h-3.5" />
              )}
              生成行李收纳清单
            </button>
          </form>

          {travelRes && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-[#FFF9EE] rounded-3xl border border-[#FFEAC5] text-[#855B00] space-y-3 shadow-3xs"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                <h6 className="text-xs font-bold">智能收纳建议</h6>
              </div>
              <p className="text-[11px] leading-relaxed">{travelRes.reason}</p>

              <div className="pt-2 border-t border-[#FFEAC5] space-y-1.5">
                <p className="text-[10px] font-bold text-stone-500 uppercase">打包清单：</p>
                <div className="flex flex-wrap gap-1.5">
                  {travelRes.selectedIds.map(id => {
                    const prod = inventory.find(product => product.id === id);
                    return prod ? (
                      <span key={id} className="px-2.5 py-1 bg-white rounded-full text-[10px] font-semibold border border-[#FFEAC5] shadow-3xs text-stone-700">
                        {prod.name}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
