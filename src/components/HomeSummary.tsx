import { AlertCircle, CalendarClock, Camera, ChevronRight, ShieldAlert, Sparkles } from 'lucide-react';

interface HomeSummaryProps {
  expiredCount: number;
  missingCoreCategories: string[];
  productCount: number;
  soonCount: number;
  onScan: () => void;
}

const getSummaryState = (productCount: number, soonCount: number, expiredCount: number, missingCoreCategories: string[]) => {
  if (expiredCount > 0) {
    return {
      badge: '最高优先级',
      body: `先处理已过期产品，避免把它们继续留在日常决策里。今天优先确认是否停用、替换，或从柜子里移除。`,
      icon: ShieldAlert,
      metricLabel: '已过期',
      metricTone: 'rose',
      title: `你有 ${expiredCount} 件产品已经过期`,
    };
  }

  if (soonCount > 0) {
    return {
      badge: '今日重点',
      body: `有 ${soonCount} 件产品进入临期窗口。今天先从这些产品开始，优先确认开封时间和使用顺序。`,
      icon: CalendarClock,
      metricLabel: '临期提醒',
      metricTone: 'amber',
      title: '今天先消化临期产品',
    };
  }

  if (productCount === 1) {
    return {
      badge: '下一步',
      body: '你已经有第一件产品了。现在继续补齐柜子，会比先做复杂设置、登录或深度配置更有价值。',
      icon: Sparkles,
      metricLabel: '基础柜子',
      metricTone: 'stone',
      title: '继续建立你的第一套柜子',
    };
  }

  if (missingCoreCategories.length > 0) {
    return {
      badge: '结构提醒',
      body: `你的柜子已经能工作了，但还缺 ${missingCoreCategories.join(' / ')}。后续扫码时优先补缺口，比继续堆同类产品更有用。`,
      icon: Sparkles,
      metricLabel: '待补品类',
      metricTone: 'stone',
      title: '今天优先补齐核心品类',
    };
  }

  return {
    badge: '日常状态',
    body: '当前没有临期压力，柜子结构也比较稳定。今天的重点是按已有产品做决策，并在需要时继续扫码补充。',
    icon: Sparkles,
    metricLabel: '今日柜况',
    metricTone: 'stone',
    title: '你的柜子今天状态稳定',
  };
};

export function HomeSummary({
  productCount,
  soonCount,
  expiredCount,
  missingCoreCategories,
  onScan,
}: HomeSummaryProps) {
  const summaryState = getSummaryState(productCount, soonCount, expiredCount, missingCoreCategories);
  const SummaryIcon = summaryState.icon;
  const metricToneClasses = {
    amber: 'bg-[#F5C377]/12 text-[#F5C377]',
    rose: 'bg-[#F08A9B]/12 text-[#F08A9B]',
    stone: 'bg-white/[0.06] text-[#CFC8E0]',
  } as const;

  const metricValue = expiredCount > 0
    ? expiredCount
    : soonCount > 0
      ? soonCount
      : missingCoreCategories.length > 0
        ? missingCoreCategories.length
        : productCount;

  return (
    <section className="rounded-[28px] border border-white/10 bg-white/5 p-4 shadow-2xs">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/[0.06] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9C94B3]">
            <SummaryIcon className="h-3 w-3" />
            {summaryState.badge}
          </span>
          <div className="space-y-1">
            <p className="text-xs font-medium text-[#6E6884]">今日摘要</p>
            <h2 className="text-lg font-bold tracking-tight text-[#F1EDF7]">{summaryState.title}</h2>
          </div>
        </div>

        <div className={`rounded-2xl px-3 py-2 text-right ${metricToneClasses[summaryState.metricTone]}`}>
          <p className="text-[11px] font-medium">{summaryState.metricLabel}</p>
          <p className="flex items-center justify-end gap-1 text-lg font-bold tracking-tight">
            {metricValue}
            {(expiredCount > 0 || soonCount > 0) && <AlertCircle className="h-3.5 w-3.5" />}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-[#9C94B3]">{summaryState.body}</p>

      <div className="mt-3 rounded-2xl bg-white/5 px-4 py-3 text-xs leading-5 text-[#9C94B3]">
        未来这里可以接天气 / 城市上下文，但当前批次只根据你的 cabinet 状态决定今日优先级。
      </div>

      <button
        onClick={onScan}
        className="mt-4 flex w-full items-center justify-between rounded-2xl bg-white/5 px-4 py-3 text-left transition-all active:scale-[0.98] hover:bg-white/[0.07]"
      >
        <span className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[#F1EDF7]">
            <Camera className="h-4 w-4" />
          </span>
          <span>
            <span className="block text-sm font-semibold text-[#F1EDF7]">继续扫码添加产品</span>
            <span className="block text-xs text-[#9C94B3]">保持 cabinet 为主，scan 是下一步</span>
          </span>
        </span>

        <ChevronRight className="h-4 w-4 text-[#6E6884]" />
      </button>
    </section>
  );
}
