import { Info } from 'lucide-react';
import { EmptyCabinetState } from './EmptyCabinetState';
import { GuestAccountPromptCard } from './GuestAccountPrompt';
import { HomeSummary } from './HomeSummary';
import { ProfileCompletionPrompt } from './ProfileCompletionPrompt';
import { Shelf } from './Shelf';
import { Product } from '../types';

type AccountPromptCopy = {
  description: string;
  title: string;
};

interface ShelfTabProps {
  activeAccountPromptCopy: AccountPromptCopy | null;
  categoryFilter: string;
  categoryLabels: Record<string, string>;
  expiredCount: number;
  filteredInventory: Product[];
  highlightedSummaryIds: string[];
  inventory: Product[];
  isEmptyCabinet: boolean;
  missingCoreCategories: string[];
  shouldPromptProfileCompletion: boolean;
  soonCount: number;
  onDismissAccountPrompt: () => void;
  onExplore: () => void;
  onOpenAccountPrompt: () => void;
  onOpenProfile: () => void;
  onProductClick: (product: Product) => void;
  onScan: () => void;
  onSetCategoryFilter: (category: string) => void;
}

export function ShelfTab({
  activeAccountPromptCopy,
  categoryFilter,
  categoryLabels,
  expiredCount,
  filteredInventory,
  highlightedSummaryIds,
  inventory,
  isEmptyCabinet,
  missingCoreCategories,
  shouldPromptProfileCompletion,
  soonCount,
  onDismissAccountPrompt,
  onExplore,
  onOpenAccountPrompt,
  onOpenProfile,
  onProductClick,
  onScan,
  onSetCategoryFilter,
}: ShelfTabProps) {
  return (
    <div className="px-4 py-2 space-y-4">
      {isEmptyCabinet ? (
        <EmptyCabinetState
          onScan={onScan}
          onExplore={onExplore}
        />
      ) : (
        <>
          {shouldPromptProfileCompletion && (
            <ProfileCompletionPrompt
              title="先补最关键的肤质信息，让后续建议更靠谱"
              description="现在已经可以正常用 cabinet 了。补充肤质和敏感成分后，AI 建议会更接近真实使用场景。"
              emphasizedFields={['肤质', '敏感成分']}
              onOpen={onOpenProfile}
            />
          )}

          {activeAccountPromptCopy && (
            <GuestAccountPromptCard
              title={activeAccountPromptCopy.title}
              description={activeAccountPromptCopy.description}
              onOpen={onOpenAccountPrompt}
              onDismiss={onDismissAccountPrompt}
            />
          )}

          <HomeSummary
            productCount={inventory.length}
            soonCount={soonCount}
            expiredCount={expiredCount}
            missingCoreCategories={missingCoreCategories}
            onScan={onScan}
          />

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4 select-none">
            {Object.entries(categoryLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => onSetCategoryFilter(key)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  categoryFilter === key
                    ? 'bg-stone-800 text-white shadow-sm'
                    : 'bg-white text-stone-500 border border-stone-100 hover:text-stone-800'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {filteredInventory.length > 0 ? (
            <Shelf
              inventory={filteredInventory}
              onProductClick={onProductClick}
              highlightedIds={categoryFilter === 'All' ? highlightedSummaryIds : []}
            />
          ) : (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                <Info className="w-6 h-6" />
              </div>
              <p className="text-xs text-stone-400 font-medium">此类别下暂无收纳，点击上方继续扫码添加吧。</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
