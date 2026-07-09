/* Shelfie app shell — ported from design ui_kits/shelfie/index.html.
   Logo header · icon TabBar · BottomSheet routing · real /api (verdict/travel/scan). */
import React from 'react';
import { PrismBackground, TabBar, BottomSheet, Toast, Icon } from './np/ui';
import { ShelfTab } from './components/ShelfTab';
import { ExploreTab } from './components/ExploreTab';
import { AiAdvisorTab } from './components/AiAdvisorTab';
import { RoutineTab } from './components/RoutineTab';
import { Scanner } from './components/Scanner';
import { EmptyCabinet } from './components/prompts';
import { ProductSheetBody, MenuSheetBody, ProfileModalBody, AccountSheetBody, AddDate } from './components/Sheets';
import {
  demoInventory, demoProfile, accountPromptCopy, expiryStatus, addMonthsFromMonth, CuratedProduct,
} from './data';
import { getVerdict, getTravelList } from './api';
import { Product, SkinProfile, ScanResult, ChatMessage, TravelResult, AccountPromptTrigger } from './types';

type S = React.CSSProperties;

const GREETING: ChatMessage = { sender: 'assistant', text: '你好！我是你的 AI 测肤顾问 GuiGui。今天你的肌肤有什么困扰，或者想让我帮你分析化妆柜里哪些产品更适合你？' };

function ShelfieLogo() {
  return <img src="/guigui-logo.png" alt="柜柜" style={{ height: 30, width: 'auto', display: 'block', filter: 'drop-shadow(0 0 8px rgba(199,168,240,.45))' }} />;
}

export default function App() {
  const [tab, setTab] = React.useState<'shelf' | 'explore' | 'ai' | 'routine'>('shelf');
  const [view, setView] = React.useState<'home' | 'scan' | 'add-date'>('home');
  const [inventory, setInventory] = React.useState<Product[]>(demoInventory);
  const [profile, setProfile] = React.useState<SkinProfile>(demoProfile);
  const [scanResult, setScanResult] = React.useState<ScanResult | null>(null);
  const [selected, setSelected] = React.useState<Product | null>(null);
  const [showProfile, setShowProfile] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([GREETING]);
  const [query, setQuery] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [travelRes, setTravelRes] = React.useState<TravelResult | null>(null);
  const [travelSub, setTravelSub] = React.useState<'routine' | 'travel'>('routine');
  const [acct, setAcct] = React.useState<{ activeTrigger: AccountPromptTrigger | null; dismissed: AccountPromptTrigger[]; showModal: boolean }>({ activeTrigger: null, dismissed: [], showModal: false });
  const [showMenu, setShowMenu] = React.useState(false);
  const [msg, setMsg] = React.useState('');
  const toastTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const toast = (t: string) => { setMsg(t); clearTimeout(toastTimer.current); toastTimer.current = setTimeout(() => setMsg(''), 2400); };

  const unlock = (trigger: AccountPromptTrigger) => setAcct((a) => (a.dismissed.includes(trigger) ? a : { ...a, activeTrigger: trigger }));
  const dismissAcct = () => setAcct((a) => ({ activeTrigger: null, dismissed: a.activeTrigger ? [...a.dismissed, a.activeTrigger] : a.dismissed, showModal: false }));
  const activeTrigger = acct.activeTrigger && !acct.dismissed.includes(acct.activeTrigger) ? acct.activeTrigger : null;
  const acctCopy = activeTrigger ? accountPromptCopy[activeTrigger] : null;

  const expired = inventory.filter((p) => expiryStatus(p) === 'expired');
  const expiring = inventory.filter((p) => expiryStatus(p) === 'expiring');
  const highlightedIds = (expired.length ? expired : expiring).map((p) => p.id);
  const isEmpty = inventory.length === 0;
  const hasValueMoment = inventory.length > 0 || messages.length > 1 || travelRes !== null;
  const requiredProfileComplete = profile.skinType !== null && profile.sensitivities.length > 0;
  const promptProfile = hasValueMoment && !requiredProfileComplete;

  const confirmAdd = (month: string) => {
    if (!scanResult) return;
    const expiryDate = addMonthsFromMonth(month, scanResult.paoMonths || 12);
    const np: Product = { ...scanResult, id: Math.random().toString(36).slice(2, 8), openedDate: month + '-01', expiryDate, status: 'active' };
    setInventory((inv) => [np, ...inv]);
    setScanResult(null); setView('home'); setTab('shelf'); unlock('first-product');
    toast(`「${np.name}」上架啦 ✓`);
  };
  const addExplore = (c: CuratedProduct) => { setScanResult({ name: c.name, brand: c.brand, category: c.category, keyIngredients: c.keyIngredients, paoMonths: c.paoMonths, bottle: c.bottle }); setView('add-date'); };

  const ask = async (text: string) => {
    if (!text.trim() || loading) return;
    setMessages((m) => [...m, { sender: 'user', text }]); setQuery(''); setLoading(true);
    try {
      const v = await getVerdict(profile, inventory, text);
      setMessages((m) => [...m, { sender: 'assistant', text: `【护肤诊断】${v.reason}`, verdict: v }]);
      unlock('ai-advice');
    } catch (err: any) {
      setMessages((m) => [...m, { sender: 'assistant', text: `抱歉，AI 分析出现了一点小问题：${err?.message || err}` }]);
    }
    setLoading(false);
  };

  const travel = async (dest: string, days: number) => {
    setLoading(true);
    try {
      const res = await getTravelList(profile, inventory, dest, days);
      setTravelRes(res); unlock('travel-plan');
    } catch (err: any) {
      toast(`出行建议失败：${err?.message || err}`);
    }
    setLoading(false);
  };

  const saveProfile = (p: SkinProfile) => { setProfile(p); setShowProfile(false); toast('档案已更新 ✓'); };
  const deleteProduct = (p: Product) => { setInventory((inv) => inv.filter((x) => x.id !== p.id)); setSelected(null); toast(`已从柜子移除「${p.name}」`); };

  const openProfileFromMenu = () => { setShowMenu(false); setShowProfile(true); };
  const openAccountFromMenu = () => { setShowMenu(false); setAcct((a) => ({ ...a, showModal: true })); };
  const acctSheetCopy = acctCopy || accountPromptCopy['first-product'];
  const sheetOpen = !!selected || showProfile || showMenu || acct.showModal;
  const closeSheet = () => { setSelected(null); setShowProfile(false); setShowMenu(false); setAcct((a) => ({ ...a, showModal: false })); };

  return (
    <div style={{ position: 'relative', height: '100%', maxWidth: 'var(--page-max)', margin: '0 auto', overflow: 'hidden', background: view === 'scan' ? 'var(--bg-scan)' : 'var(--bg)' }}>
      <PrismBackground />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, display: 'flex', flexDirection: 'column', paddingTop: 'calc(var(--sat) + 6px)' }}>
        {view === 'home' && (
          <>
            <header style={{ display: 'grid', gridTemplateColumns: '29px 1fr 29px', alignItems: 'center', padding: '6px 20px 10px', borderBottom: '1px solid var(--line)', position: 'relative', zIndex: 3 }}>
              <button onClick={() => setShowMenu(true)} aria-label="菜单" style={{ width: 29, height: 29, flex: 'none', borderRadius: 999, background: 'var(--surface)', border: '1px solid var(--line)', color: 'var(--ink-soft)', display: 'grid', placeItems: 'center', cursor: 'pointer' } as S}><Icon name="Menu" size={14} /></button>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ShelfieLogo /></div>
              <button onClick={() => setShowProfile(true)} aria-label="我的档案" style={{ width: 29, height: 29, flex: 'none', borderRadius: 999, background: 'var(--surface)', border: '1px solid var(--line)', color: 'var(--ink-soft)', display: 'grid', placeItems: 'center', cursor: 'pointer' } as S}><Icon name="User" size={14} /></button>
            </header>
            <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
              {tab === 'shelf' && (isEmpty
                ? <div style={{ flex: 1, overflowY: 'auto', padding: '8px 20px' }}><EmptyCabinet onScan={() => setView('scan')} onExplore={() => setTab('explore')} /></div>
                : <ShelfTab inventory={inventory} onOpen={setSelected} highlightedIds={highlightedIds} onChat={() => setTab('ai')} promptProfile={promptProfile} onOpenProfile={() => setShowProfile(true)} accountCopy={acctCopy} onOpenAccount={() => setAcct((a) => ({ ...a, showModal: true }))} onDismissAccount={dismissAcct} />)}
              {tab === 'explore' && <ExploreTab onAdd={addExplore} />}
              {tab === 'ai' && <AiAdvisorTab messages={messages} query={query} setQuery={setQuery} loading={loading} onAsk={ask} onSend={() => ask(query)} inventory={inventory} promptProfile={promptProfile} onOpenProfile={() => setShowProfile(true)} accountCopy={activeTrigger === 'ai-advice' ? acctCopy : null} onOpenAccount={() => setAcct((a) => ({ ...a, showModal: true }))} onDismissAccount={dismissAcct} />}
              {tab === 'routine' && <RoutineTab inventory={inventory} sub={travelSub} setSub={setTravelSub} travelRes={travelRes} loading={loading} onTravel={travel} accountCopy={activeTrigger === 'travel-plan' ? acctCopy : null} onOpenAccount={() => setAcct((a) => ({ ...a, showModal: true }))} onDismissAccount={dismissAcct} />}
            </div>
            <TabBar showLabels={false} value={tab} onChange={(k) => (k === 'scan' ? setView('scan') : setTab(k as any))} items={[
              { key: 'shelf', label: '架子', icon: <Icon name="Package" /> },
              { key: 'explore', label: '探索', icon: <Icon name="Sparkles" /> },
              { key: 'scan', label: '扫码', icon: <Icon name="ScanLine" /> },
              { key: 'ai', label: '顾问', icon: <Icon name="MessageCircle" /> },
              { key: 'routine', label: '收纳', icon: <Icon name="Plane" /> },
            ]} />
          </>
        )}
        {view === 'scan' && <Scanner onScanSuccess={(r) => { setScanResult(r); setView('add-date'); }} onCancel={() => setView('home')} />}
        {view === 'add-date' && scanResult && <AddDate scanResult={scanResult} onCancel={() => { setScanResult(null); setView('home'); }} onConfirm={confirmAdd} />}
      </div>
      <BottomSheet open={sheetOpen} onClose={closeSheet}>
        {selected && <ProductSheetBody p={selected} onClose={closeSheet} onDelete={deleteProduct} />}
        {!selected && showMenu && <MenuSheetBody profile={profile} onProfile={openProfileFromMenu} onAccount={openAccountFromMenu} onClose={closeSheet} />}
        {!selected && !showMenu && showProfile && <ProfileModalBody profile={profile} onSave={saveProfile} />}
        {!selected && !showMenu && !showProfile && acct.showModal && <AccountSheetBody copy={acctSheetCopy} onClose={closeSheet} />}
      </BottomSheet>
      <Toast show={!!msg}>{msg}</Toast>
    </div>
  );
}
