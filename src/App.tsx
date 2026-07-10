/* Shelfie app shell — ported from design ui_kits/shelfie/index.html.
   Logo header · icon TabBar · BottomSheet routing · real /api (verdict/travel/scan). */
import React from 'react';
import { PrismBackground, TabBar, BottomSheet, Toast, Icon } from './np/ui';
import { ShelfTab } from './components/ShelfTab';
import { ExploreTab } from './components/ExploreTab';
import { AiAdvisorTab } from './components/AiAdvisorTab';
import { RoutineTab } from './components/RoutineTab';
import { Scanner } from './components/Scanner';
import { Onboarding } from './components/Onboarding';
import { EmptyCabinet } from './components/prompts';
import { ProductSheetBody, MenuSheetBody, ProfileModalBody, AddDate } from './components/Sheets';
import { AuthSheet } from './components/AuthSheet';
import {
  demoInventory, demoProfile, accountPromptCopy, expiryStatus, addMonthsFromMonth, CuratedProduct,
} from './data';
import { getVerdict, getTravelList, generateProductImage } from './api';
import { loadAccount, loadData, saveData, logout } from './auth';
import { Product, SkinProfile, ScanResult, ChatMessage, TravelResult, AccountPromptTrigger, Account } from './types';

type S = React.CSSProperties;

const GREETING: ChatMessage = { sender: 'assistant', text: '你好！我是你的 AI 测肤顾问 GuiGui。今天你的肌肤有什么困扰，或者想让我帮你分析化妆柜里哪些产品更适合你？' };

function ShelfieLogo() {
  return <img src="/guigui-logo.png" alt="柜柜" style={{ height: 30, width: 'auto', display: 'block', filter: 'drop-shadow(0 0 8px rgba(199,168,240,.45))' }} />;
}

export default function App() {
  // Restore a signed-in account (and its saved 档案) on first render — guests start on demo state.
  const boot = React.useMemo(() => {
    const a = loadAccount();
    return { account: a, data: a ? loadData(a.id) : null };
  }, []);
  const [account, setAccount] = React.useState<Account | null>(boot.account);
  const [showAuth, setShowAuth] = React.useState(false);
  const [authIntro, setAuthIntro] = React.useState<string | undefined>(undefined);
  const pendingProfileRef = React.useRef<SkinProfile | null>(null);

  const [tab, setTab] = React.useState<'shelf' | 'explore' | 'ai' | 'routine'>('shelf');
  const [view, setView] = React.useState<'home' | 'scan' | 'add-date'>('home');
  const [onboarding, setOnboarding] = React.useState(!boot.data?.profile?.skinType);
  const [inventory, setInventory] = React.useState<Product[]>(boot.data?.inventory ?? demoInventory);
  const [profile, setProfile] = React.useState<SkinProfile>(boot.data?.profile ?? demoProfile);
  const [scanResult, setScanResult] = React.useState<ScanResult | null>(null);
  const [genImg, setGenImg] = React.useState(false); // drawing a scanned product on the fly
  const genTokenRef = React.useRef(0);
  const scanImgRef = React.useRef<string | null>(null);
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

  // Once signed in, the 档案 (profile + cabinet) auto-persists to this device on every change.
  React.useEffect(() => {
    if (account) saveData(account.id, { profile, inventory });
  }, [account, profile, inventory]);

  const openAuth = (intro?: string) => {
    setSelected(null); setShowMenu(false); setShowProfile(false);
    setAcct((a) => ({ ...a, showModal: false }));
    setAuthIntro(intro); setShowAuth(true);
  };
  const onAuthed = (a: Account) => {
    const saved = loadData(a.id);
    let prof = profile, inv = inventory;
    if (saved) { prof = saved.profile; inv = saved.inventory; } // returning user: their 档案 wins
    if (pendingProfileRef.current) { prof = pendingProfileRef.current; pendingProfileRef.current = null; }
    setProfile(prof); setInventory(inv);
    if (prof.skinType) setOnboarding(false);
    setAccount(a); // effect persists {prof, inv}
    setShowAuth(false);
    toast(a.provider === 'google' ? 'Google 登录成功，档案已保存 ✓' : '档案已保存 ✓');
  };
  const doLogout = () => { logout(); setAccount(null); setShowMenu(false); toast('已退出登录'); };

  const expired = inventory.filter((p) => expiryStatus(p) === 'expired');
  const expiring = inventory.filter((p) => expiryStatus(p) === 'expiring');
  const highlightedIds = (expired.length ? expired : expiring).map((p) => p.id);
  const isEmpty = inventory.length === 0;
  const hasValueMoment = inventory.length > 0 || messages.length > 1 || travelRes !== null;
  // Profile counts as "entered" once the essential field (肤质) is set — via onboarding or the
  // profile sheet. Gating on skinType alone means the 补档 layer reliably disappears afterwards.
  const requiredProfileComplete = profile.skinType !== null;
  const promptProfile = hasValueMoment && !requiredProfileComplete;

  const confirmAdd = (month: string) => {
    if (!scanResult) return;
    const expiryDate = addMonthsFromMonth(month, scanResult.paoMonths || 12);
    const np: Product = { ...scanResult, img: scanResult.img || scanImgRef.current || undefined, id: Math.random().toString(36).slice(2, 8), openedDate: month + '-01', expiryDate, status: 'active' };
    setInventory((inv) => [np, ...inv]);
    setScanResult(null); setView('home'); setTab('shelf'); unlock('first-product');
    toast(`「${np.name}」上架啦 ✓`);
  };
  // Draw a scanned product on the fly (Gemini + cutout) so it isn't a flat glyph. Best-effort: keeps the glyph if it fails.
  const generateScanImage = async (r: ScanResult, photo?: string) => {
    if (r.img) return;
    const token = ++genTokenRef.current;
    scanImgRef.current = null;
    setGenImg(true);
    const img = await generateProductImage({ name: r.name, brand: r.brand, category: r.category, imageBase64: photo });
    if (token !== genTokenRef.current) return; // a newer scan/add superseded this one
    setGenImg(false);
    if (img) { scanImgRef.current = img; setScanResult((prev) => (prev ? { ...prev, img } : prev)); }
  };
  const addExplore = (c: CuratedProduct) => { genTokenRef.current++; setGenImg(false); scanImgRef.current = null; setScanResult({ name: c.name, brand: c.brand, category: c.category, keyIngredients: c.keyIngredients, paoMonths: c.paoMonths, bottle: c.bottle, img: c.img }); setView('add-date'); };

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

  // 记录档案 = 保存肤质档案 + 化妆柜。访客可编辑，但要保存必须先注册（decision: 只挡保存/同步）。
  const saveProfile = (p: SkinProfile) => {
    if (!account) { pendingProfileRef.current = p; openAuth('注册后即可保存这份档案，下次打开自动带回。'); return; }
    setProfile(p); setShowProfile(false); toast('档案已保存 ✓');
  };
  const finishOnboarding = (p: SkinProfile) => { setProfile(p); setOnboarding(false); toast('档案已建好 ✓'); };
  const skipOnboarding = () => setOnboarding(false);
  const deleteProduct = (p: Product) => { setInventory((inv) => inv.filter((x) => x.id !== p.id)); setSelected(null); toast(`已从柜子移除「${p.name}」`); };

  const openProfileFromMenu = () => { setShowMenu(false); setShowProfile(true); };
  const sheetOpen = !!selected || showProfile || showMenu || showAuth;
  const closeSheet = () => { setSelected(null); setShowProfile(false); setShowMenu(false); setShowAuth(false); };

  return (
    <div style={{ position: 'relative', height: '100%', maxWidth: 'var(--page-max)', margin: '0 auto', overflow: 'hidden', background: onboarding ? 'var(--bg)' : (view === 'scan' ? 'var(--bg-scan)' : 'var(--bg)') }}>
      <PrismBackground />
      {onboarding ? (
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, display: 'flex', flexDirection: 'column', paddingTop: 'var(--sat)' }}>
          <Onboarding onDone={finishOnboarding} onSkip={skipOnboarding} toast={toast} />
        </div>
      ) : (
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, display: 'flex', flexDirection: 'column', paddingTop: 'calc(var(--sat) + 8px)' }}>
        {view === 'home' && (
          <>
            <header style={{ display: 'grid', gridTemplateColumns: '29px 1fr 29px', alignItems: 'center', marginTop: 'calc(-1 * (var(--sat) + 8px))', padding: 'calc(var(--sat) + 12px) 20px 10px', borderBottom: '1px solid var(--line)', background: 'linear-gradient(to bottom, rgba(22,20,31,0.82), rgba(22,20,31,0.62))', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', position: 'relative', zIndex: 3 } as S}>
              <button onClick={() => setShowMenu(true)} aria-label="菜单" style={{ width: 29, height: 29, flex: 'none', borderRadius: 999, background: 'var(--surface)', border: '1px solid var(--line)', color: 'var(--ink-soft)', display: 'grid', placeItems: 'center', cursor: 'pointer' } as S}><Icon name="Menu" size={14} /></button>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ShelfieLogo /></div>
              <button onClick={() => setShowProfile(true)} aria-label="我的档案" style={{ width: 29, height: 29, flex: 'none', borderRadius: 999, background: 'var(--surface)', border: '1px solid var(--line)', color: 'var(--ink-soft)', display: 'grid', placeItems: 'center', cursor: 'pointer' } as S}><Icon name="User" size={14} /></button>
            </header>
            <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
              {tab === 'shelf' && (isEmpty
                ? <div style={{ flex: 1, overflowY: 'auto', padding: '8px 20px' }}><EmptyCabinet onScan={() => setView('scan')} onExplore={() => setTab('explore')} /></div>
                : <ShelfTab inventory={inventory} onOpen={setSelected} highlightedIds={highlightedIds} onChat={() => setTab('ai')} promptProfile={promptProfile} onOpenProfile={() => setShowProfile(true)} accountCopy={acctCopy} onOpenAccount={() => openAuth()} onDismissAccount={dismissAcct} />)}
              {tab === 'explore' && <ExploreTab onAdd={addExplore} />}
              {tab === 'ai' && <AiAdvisorTab messages={messages} query={query} setQuery={setQuery} loading={loading} onAsk={ask} onSend={() => ask(query)} inventory={inventory} promptProfile={promptProfile} onOpenProfile={() => setShowProfile(true)} accountCopy={activeTrigger === 'ai-advice' ? acctCopy : null} onOpenAccount={() => openAuth()} onDismissAccount={dismissAcct} />}
              {tab === 'routine' && <RoutineTab inventory={inventory} sub={travelSub} setSub={setTravelSub} travelRes={travelRes} loading={loading} onTravel={travel} accountCopy={activeTrigger === 'travel-plan' ? acctCopy : null} onOpenAccount={() => openAuth()} onDismissAccount={dismissAcct} />}
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
        {view === 'scan' && <Scanner onScanSuccess={(r, photo) => { setScanResult(r); setView('add-date'); generateScanImage(r, photo); }} onCancel={() => setView('home')} />}
        {view === 'add-date' && scanResult && <AddDate scanResult={scanResult} generating={genImg} onCancel={() => { genTokenRef.current++; setGenImg(false); setScanResult(null); setView('home'); }} onConfirm={confirmAdd} />}
      </div>
      )}
      <BottomSheet open={sheetOpen} onClose={closeSheet}>
        {selected && <ProductSheetBody p={selected} onClose={closeSheet} onDelete={deleteProduct} />}
        {!selected && showMenu && <MenuSheetBody profile={profile} account={account} onProfile={openProfileFromMenu} onAccount={() => openAuth()} onLogout={doLogout} onClose={closeSheet} />}
        {!selected && !showMenu && showProfile && <ProfileModalBody profile={profile} onSave={saveProfile} />}
        {!selected && !showMenu && !showProfile && showAuth && <AuthSheet intro={authIntro} onAuthed={onAuthed} onClose={closeSheet} />}
      </BottomSheet>
      <Toast show={!!msg}>{msg}</Toast>
    </div>
  );
}
