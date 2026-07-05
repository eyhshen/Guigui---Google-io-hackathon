import React, { useState, useEffect } from 'react';
import { 
  Camera, Sparkles, Plane, Info, X, ChevronRight, Calendar, 
  Search, Heart, User, Check, AlertCircle, Plus, ChevronLeft, 
  Moon, Sun, ArrowRight, Settings, Sliders, CheckSquare, RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { addMonths, format, parseISO } from 'date-fns';
import { Bottle } from './components/Bottle';
import { Scanner } from './components/Scanner';
import { Shelf } from './components/Shelf';
import { Product, SkinProfile, ScanResult, VerdictResult, TravelResult } from './types';
import { getVerdict, getTravelList } from './api';

// --- DEMO INITIAL DATA ---
const demoProfile: SkinProfile = {
  skinType: 'combination',
  sensitivities: ['fragrance'],
  currentActives: ['niacinamide'],
  city: '上海',
};

const demoInventory: Product[] = [
  { id: '1', name: '小褐瓶特润修护精华', brand: 'Estee Lauder', category: 'Serum', keyIngredients: ['二裂酵母', '透明质酸', '多肽'], paoMonths: 24, openedDate: '2025-01-01', expiryDate: '2027-01-01', bottle: { shape: 'dropper', colorHex: '#8B5A2B' }, status: 'active' },
  { id: '2', name: 'Lotion P50 爽肤水', brand: 'Biologique Recherche', category: 'Toner', keyIngredients: ['水杨酸', '乳酸', '植酸'], paoMonths: 12, openedDate: '2025-10-01', expiryDate: '2026-10-01', bottle: { shape: 'bottle', colorHex: '#D2B48C' }, status: 'active' },
  { id: '3', name: '修护保湿润肤乳', brand: 'CeraVe', category: 'Moisturizer', keyIngredients: ['神经酰胺', '透明质酸'], paoMonths: 12, openedDate: '2025-08-01', expiryDate: '2026-08-01', bottle: { shape: 'pump', colorHex: '#00599C' }, status: 'active' },
  { id: '4', name: '水饱饱 B5 保湿精华', brand: 'Drunk Elephant', category: 'Serum', keyIngredients: ['维生素B5', '菠萝神经酰胺'], paoMonths: 12, openedDate: '2026-02-01', expiryDate: '2027-02-01', bottle: { shape: 'pump', colorHex: '#40E0D0' }, status: 'active' },
  { id: '5', name: '无感隐形防晒乳 SPF40', brand: 'Supergoop!', category: 'Sunscreen', keyIngredients: ['红藻提取物', '草本精粹'], paoMonths: 18, openedDate: '2026-06-01', expiryDate: '2027-12-01', bottle: { shape: 'tube', colorHex: '#FCDC4D' }, status: 'active' },
  { id: '6', name: '绿茶籽水分菁露', brand: 'Innisfree', category: 'Serum', keyIngredients: ['绿茶籽', '双重透明质酸'], paoMonths: 12, openedDate: '2025-07-01', expiryDate: '2026-07-01', bottle: { shape: 'pump', colorHex: '#4CAF50' }, status: 'expiring' },
];

// --- EXPLORE DATA (Matches Image 4 & 6 Concept) ---
interface CuratedProduct {
  id: string;
  name: string;
  brand: string;
  category: string;
  matchScore: number;
  tags: string[];
  description: string;
  keyIngredients: string[];
  paoMonths: number;
  bottle: { shape: 'pump' | 'tube' | 'jar' | 'dropper' | 'spray' | 'stick' | 'bottle'; colorHex: string };
}

const curatedProducts: CuratedProduct[] = [
  { id: 'cur-1', name: '积雪草舒缓强韧精华液', brand: 'Skin1004', category: 'Serum', matchScore: 98, tags: ['超强推荐', '无香精', '敏感肌友好'], description: '核心提取马达加斯加纯净积雪草，瞬间褪红，强韧受损屏障。', keyIngredients: ['积雪草提取物', '羟基积雪草苷'], paoMonths: 12, bottle: { shape: 'dropper', colorHex: '#E2D3C1' } },
  { id: 'cur-2', name: '温和弱酸性氨基酸洁面', brand: 'Anua', category: 'Cleanser', matchScore: 94, tags: ['深层清洁', '温和不紧绷'], description: '含有77%鱼腥草精粹，舒缓修护，温和洗净油脂粉尘。', keyIngredients: ['鱼腥草提取物', '椰油酰甘氨酸钾'], paoMonths: 12, bottle: { shape: 'tube', colorHex: '#EAEBE6' } },
  { id: 'cur-3', name: '微修护维C亮肤精华', brand: 'Innbeauty Project', category: 'Serum', matchScore: 89, tags: ['提亮肤色', '抗氧化'], description: '高活性温和VC配方，快速提亮暗沉，淡化新生痘印且不易泛红。', keyIngredients: ['包裹型维生素C', '阿魏酸', '神经酰胺'], paoMonths: 9, bottle: { shape: 'pump', colorHex: '#FF7F50' } },
  { id: 'cur-4', name: '鱼腥草 77% 舒缓爽肤水', brand: 'Anua', category: 'Toner', matchScore: 92, tags: ['去闭口', '湿敷推荐'], description: '韩国极高人气爽肤水，主打舒缓镇定，针对闭口和粉刺改善显著。', keyIngredients: ['鱼腥草水', '积雪草', '洋甘菊'], paoMonths: 12, bottle: { shape: 'bottle', colorHex: '#D9ECE4' } },
  { id: 'cur-5', name: '纯净大米益生菌清爽防晒乳', brand: 'Beauty of Joseon', category: 'Sunscreen', matchScore: 88, tags: ['水润轻薄', '不油腻'], description: '乳霜质地极易推开，成膜速度快，含有大米发酵物，温和养肤。', keyIngredients: ['大米提取物', '谷物益生菌'], paoMonths: 12, bottle: { shape: 'tube', colorHex: '#FAF6EF' } },
];

const skinTypeLabels: Record<string, string> = {
  'dry': '干性肌',
  'oily': '油性肌',
  'combination': '混合肌',
  'normal': '中性肌',
};

const categoryLabels: Record<string, string> = {
  'All': '全部',
  'Serum': '精华液',
  'Toner': '爽肤水',
  'Moisturizer': '乳液面霜',
  'Sunscreen': '防晒霜',
  'Cleanser': '洁面乳',
};

export default function App() {
  // Navigation tabs
  const [tab, setTab] = useState<'shelf' | 'explore' | 'ai' | 'routine'>('shelf');
  
  // Overlays & Subviews
  const [view, setView] = useState<'home' | 'scan' | 'add-date'>('home');
  const [inventory, setInventory] = useState<Product[]>(demoInventory);
  const [profile, setProfile] = useState<SkinProfile>(demoProfile);
  
  // Ephemeral State
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  
  // Profile Editor Modal State
  const [showProfileModal, setShowProfileModal] = useState(false);
  
  // AI Diagnostics State
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string; verdict?: VerdictResult }>>([
    { 
      sender: 'assistant', 
      text: '你好！我是你的 AI 测肤顾问 GuiGui。今天你的肌肤有什么困扰，或者想让我帮你分析化妆柜里哪些产品更适合你？' 
    }
  ]);

  // Travel / Packs State
  const [travelRes, setTravelRes] = useState<TravelResult | null>(null);
  const [travelActiveTab, setTravelActiveTab] = useState<'routine' | 'travel'>('routine');

  // Add Product from Explore
  const [addingExploreProd, setAddingExploreProd] = useState<CuratedProduct | null>(null);

  // Time for mock phone status bar
  const [currentTime, setCurrentTime] = useState('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(format(now, 'HH:mm'));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // --- Handlers ---
  const handleScanSuccess = (res: ScanResult) => {
    setScanResult(res);
    setView('add-date');
  };

  const handleAddDate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!scanResult) return;
    const formData = new FormData(e.currentTarget);
    const openedMonth = formData.get('month') as string; // YYYY-MM
    const date = new Date(openedMonth + '-01');
    const expiryDate = format(addMonths(date, scanResult.paoMonths || 12), 'yyyy-MM-dd');

    const newProduct: Product = {
      ...scanResult,
      id: Math.random().toString(36).substring(7),
      openedDate: openedMonth + '-01',
      expiryDate,
      status: 'active'
    };

    setInventory([newProduct, ...inventory]);
    setScanResult(null);
    setView('home');
  };

  // Direct add from Explore with custom opened date
  const handleAddExploreProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!addingExploreProd) return;
    const formData = new FormData(e.currentTarget);
    const openedMonth = formData.get('month') as string;
    const date = new Date(openedMonth + '-01');
    const expiryDate = format(addMonths(date, addingExploreProd.paoMonths || 12), 'yyyy-MM-dd');

    const newProduct: Product = {
      id: Math.random().toString(36).substring(7),
      name: addingExploreProd.name,
      brand: addingExploreProd.brand,
      category: addingExploreProd.category,
      keyIngredients: addingExploreProd.keyIngredients,
      paoMonths: addingExploreProd.paoMonths,
      openedDate: openedMonth + '-01',
      expiryDate,
      bottle: addingExploreProd.bottle,
      status: 'active'
    };

    setInventory([newProduct, ...inventory]);
    setAddingExploreProd(null);
    // Visual feedback
    setTab('shelf');
  };

  const handleQuickAsk = async (text: string) => {
    setQuery(text);
    // Append user message
    const updatedMessages = [...chatMessages, { sender: 'user' as const, text }];
    setChatMessages(updatedMessages);
    setLoading(true);
    setQuery('');

    try {
      const res = await getVerdict(profile, inventory, text);
      setChatMessages([
        ...updatedMessages,
        { 
          sender: 'assistant', 
          text: `【护肤诊断报告】\n${res.reason}`, 
          verdict: res 
        }
      ]);
    } catch (err: any) {
      setChatMessages([
        ...updatedMessages,
        { 
          sender: 'assistant', 
          text: `抱歉，AI 分析出现了一点小问题: ${err.message || err}` 
        }
      ]);
    }
    setLoading(false);
  };

  const requestVerdict = async () => {
    if (!query.trim()) return;
    const currentQuery = query;
    await handleQuickAsk(currentQuery);
  };

  const requestTravel = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const destination = fd.get('destination') as string;
    const days = parseInt(fd.get('days') as string, 10);
    setLoading(true);
    try {
      const res = await getTravelList(profile, inventory, destination, days);
      setTravelRes(res);
    } catch (err) {
      alert("错误: " + err);
    }
    setLoading(false);
  };

  const handleUpdateProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const skinType = fd.get('skinType') as SkinProfile['skinType'];
    const sensitivitiesString = fd.get('sensitivities') as string;
    const activesString = fd.get('currentActives') as string;
    const city = fd.get('city') as string;

    const sensitivities = sensitivitiesString.split(/[,，]/).map(s => s.trim()).filter(Boolean);
    const currentActives = activesString.split(/[,，]/).map(s => s.trim()).filter(Boolean);

    setProfile({ skinType, sensitivities, currentActives, city });
    setShowProfileModal(false);
  };

  // Filter inventory by category
  const filteredInventory = categoryFilter === 'All' 
    ? inventory 
    : inventory.filter(p => p.category === categoryFilter);

  // Expiration calculation helper
  const soonCount = inventory.filter(p => {
    const expiry = parseISO(p.expiryDate);
    const today = new Date();
    const diff = (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
    return diff > 0 && diff <= 30;
  }).length;

  return (
    <div className="min-h-screen bg-[#F3EFE9] flex items-center justify-center font-sans py-0 md:py-8 antialiased">
      
      {/* PHONE WRAPPER / CONTAINER */}
      <div className="w-full max-w-md md:max-w-[393px] md:h-[840px] md:rounded-[48px] md:border-8 md:border-stone-800 md:ring-[12px] md:ring-stone-900/10 md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] bg-[#FAF8F5] flex flex-col relative overflow-hidden h-screen text-stone-800">
        
        {/* Dynamic Island for modern mobile UI */}
        <div className="hidden md:block absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-stone-950 rounded-full z-50 transition-all duration-300 hover:w-32 hover:h-7" />
        
        {/* iOS Mock Status Bar */}
        <div className="flex items-center justify-between px-6 pt-3 pb-2 text-[11px] font-semibold text-stone-600 select-none bg-[#FAF8F5]/80 backdrop-blur-md z-40 shrink-0">
          <span>{currentTime}</span>
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.9-1.9C9.13 19.58 10.53 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/></svg>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
            <div className="w-5 h-2.5 border border-stone-500 rounded-sm p-0.5 flex items-center"><div className="bg-stone-600 h-full w-4 rounded-2xs" /></div>
          </div>
        </div>

        {/* APP HEADER */}
        {view === 'home' && (
          <header className="px-5 pt-3 pb-2 flex flex-col bg-[#FAF8F5]/80 backdrop-blur-md z-30 shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-1.5">
                <h1 className="text-xl font-bold text-stone-900 tracking-tight">柜柜</h1>
                <span className="text-[10px] text-stone-400 font-medium font-mono uppercase tracking-widest">skān</span>
              </div>
              
              {/* Interactive Skin Profile Pill */}
              <button 
                onClick={() => setShowProfileModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#3D7D52]/10 border border-[#3D7D52]/20 rounded-full text-[11px] text-[#3D7D52] font-semibold shadow-2xs hover:bg-[#3D7D52]/15 active:scale-95 transition-all"
              >
                <Sliders className="w-3 h-3" />
                <span>{skinTypeLabels[profile.skinType]} · {profile.sensitivities[0] || '温和'}</span>
              </button>
            </div>
          </header>
        )}

        {/* MAIN BODY AREA */}
        <div className="flex-1 overflow-y-auto pb-24 relative bg-[#FAF8F5]">
          <AnimatePresence mode="wait">
            
            {/* SUB-VIEW: MAIN APPLICATION */}
            {view === 'home' && (
              <motion.div 
                key="home-tabs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col h-full"
              >
                {/* 1. CABINET / SHELF TAB */}
                {tab === 'shelf' && (
                  <div className="px-4 py-2 space-y-4">
                    {/* Summary Banner */}
                    <div className="bg-white p-4 rounded-3xl border border-stone-100 shadow-2xs flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-xs text-stone-400 font-medium">已收纳护肤品</p>
                        <p className="text-xl font-bold text-stone-800 tracking-tight">{inventory.length} <span className="text-sm font-normal text-stone-500">款</span></p>
                      </div>
                      <div className="h-8 w-px bg-stone-100" />
                      <div className="space-y-0.5 text-right">
                        <p className="text-xs text-stone-400 font-medium">临期预警</p>
                        <p className="text-xl font-bold text-amber-600 tracking-tight flex items-center gap-1 justify-end">
                          {soonCount} <span className="text-sm font-normal text-stone-500">款</span>
                          {soonCount > 0 && <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />}
                        </p>
                      </div>
                    </div>

                    {/* Category Scroll Menu */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4 select-none">
                      {Object.entries(categoryLabels).map(([key, label]) => (
                        <button
                          key={key}
                          onClick={() => setCategoryFilter(key)}
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

                    {/* Shelf Content */}
                    {filteredInventory.length > 0 ? (
                      <Shelf 
                        inventory={filteredInventory} 
                        onProductClick={(p) => setSelectedProduct(p)} 
                      />
                    ) : (
                      <div className="py-16 text-center space-y-3">
                        <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                          <Info className="w-6 h-6" />
                        </div>
                        <p className="text-xs text-stone-400 font-medium">此类别下暂无收纳，点击下方「拍照」扫码添加一个吧！</p>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. EXPLORE TAB (Matches Image 4 & 6) */}
                {tab === 'explore' && (
                  <div className="px-4 py-2 space-y-4">
                    {/* Hero Pick Banner */}
                    <div className="relative bg-gradient-to-br from-[#ECE7DF] to-[#E3DCD1] p-5 rounded-3xl overflow-hidden shadow-2xs border border-[#DFD8CC]">
                      <div className="relative z-10 max-w-[60%] space-y-1.5">
                        <span className="inline-block px-2.5 py-0.5 bg-[#3D7D52] text-white text-[9px] font-bold uppercase rounded-full">K-Beauty 爆款精选</span>
                        <h3 className="text-base font-bold text-stone-800 leading-tight">探索最契合你肤质的护肤好物</h3>
                        <p className="text-[10px] text-stone-600 leading-relaxed">避免盲目跟风，AI 科学比对成分库</p>
                      </div>
                      <div className="absolute right-2 bottom-0 w-[42%] translate-y-2 opacity-90">
                        <Bottle shape="dropper" colorHex="#D0C4B4" size={100} className="mx-auto" />
                      </div>
                    </div>

                    {/* Filters Header */}
                    <div className="flex items-center justify-between pt-1">
                      <h4 className="text-sm font-bold text-stone-800">专为你精选的 5 款好物</h4>
                      <span className="text-[10px] text-stone-400 font-medium font-mono">100% 针对个人成分敏敏库</span>
                    </div>

                    {/* Curated Products List */}
                    <div className="space-y-3">
                      {curatedProducts.map(prod => (
                        <div 
                          key={prod.id}
                          className="bg-white p-4 rounded-2xl border border-stone-100 shadow-3xs flex gap-4 hover:shadow-2xs transition-all relative overflow-hidden"
                        >
                          <div className="w-14 h-18 bg-[#FAF8F5] rounded-xl flex items-center justify-center shrink-0 border border-stone-500/5">
                            <Bottle shape={prod.bottle.shape} colorHex={prod.bottle.colorHex} size={42} />
                          </div>
                          
                          <div className="flex-1 space-y-1 min-w-0 pr-8">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[9px] font-semibold text-stone-400 tracking-wider uppercase">{prod.brand}</span>
                              <span className="w-1 h-1 rounded-full bg-stone-300" />
                              <span className="text-[9px] font-semibold text-[#3D7D52] bg-[#E8F3E8] px-1.5 py-0.5 rounded-full">{prod.matchScore}% 契合度</span>
                            </div>
                            <h5 className="text-xs font-bold text-stone-800 truncate">{prod.name}</h5>
                            <p className="text-[10px] text-stone-500 line-clamp-1.5 leading-relaxed">{prod.description}</p>
                            
                            <div className="flex flex-wrap gap-1 pt-1">
                              {prod.tags.map(t => (
                                <span key={t} className="text-[8px] font-semibold text-stone-500 bg-stone-50 px-1.5 py-0.5 rounded-md border border-stone-100">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Quick Add To Shelf Button */}
                          <button
                            onClick={() => setAddingExploreProd(prod)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-white flex items-center justify-center active:scale-90 transition-transform shadow-sm"
                            title="添加至化妆柜"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. AI ADVISOR TAB (Matches Image 1) */}
                {tab === 'ai' && (
                  <div className="flex flex-col h-full px-4 py-2 gap-4">
                    {/* Chat Bubble Scrollable Area */}
                    <div className="flex-1 space-y-4 overflow-y-auto max-h-[460px] pr-1">
                      {chatMessages.map((msg, idx) => (
                        <div 
                          key={idx}
                          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[85%] rounded-3xl p-4 text-xs shadow-3xs leading-relaxed space-y-3 ${
                              msg.sender === 'user' 
                                ? 'bg-stone-800 text-white rounded-tr-none' 
                                : 'bg-white text-stone-800 border border-stone-100 rounded-tl-none'
                            }`}
                          >
                            <p className="whitespace-pre-line">{msg.text}</p>
                            
                            {/* Verdict response with match details */}
                            {msg.verdict && (
                              <div className="pt-2 border-t border-stone-100/30 space-y-3">
                                {msg.verdict.recommendedIds.length > 0 && (
                                  <div>
                                    <p className="font-bold text-[#3D7D52] mb-1.5 flex items-center gap-1">
                                      <Check className="w-3.5 h-3.5" /> 建议今天使用：
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                      {msg.verdict.recommendedIds.map(id => {
                                        const prod = inventory.find(i => i.id === id);
                                        return prod ? (
                                          <span key={id} className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#E8F3E8] text-[#3D7D52] rounded-full text-[10px] font-semibold border border-[#3D7D52]/10 shadow-3xs">
                                            {prod.name}
                                          </span>
                                        ) : null;
                                      })}
                                    </div>
                                  </div>
                                )}
                                {msg.verdict.avoidIds.length > 0 && (
                                  <div>
                                    <p className="font-bold text-rose-600 mb-1.5 flex items-center gap-1">
                                      <AlertCircle className="w-3.5 h-3.5" /> 建议今天避开：
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                      {msg.verdict.avoidIds.map(id => {
                                        const prod = inventory.find(i => i.id === id);
                                        return prod ? (
                                          <span key={id} className="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-50 text-rose-600 rounded-full text-[10px] font-semibold border border-rose-100 shadow-3xs">
                                            {prod.name}
                                          </span>
                                        ) : null;
                                      })}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      {loading && (
                        <div className="flex justify-start">
                          <div className="bg-white border border-stone-100 rounded-3xl rounded-tl-none p-4 text-xs text-stone-500 shadow-3xs flex items-center gap-2">
                            <div className="flex gap-1">
                              <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                              <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                              <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                            <span>GuiGui 正在为您调配诊疗建议...</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Quick Suggestion Chips */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 shrink-0 scrollbar-none select-none">
                      <button 
                        onClick={() => handleQuickAsk('下巴长痘且发红，很紧绷')}
                        className="px-3 py-1.5 bg-white border border-stone-100 text-[10px] text-stone-600 hover:text-stone-800 rounded-full whitespace-nowrap shadow-3xs"
                      >
                        下巴长痘发红 💧
                      </button>
                      <button 
                        onClick={() => handleQuickAsk('天气太热了，T区出油严重')}
                        className="px-3 py-1.5 bg-white border border-stone-100 text-[10px] text-stone-600 hover:text-stone-800 rounded-full whitespace-nowrap shadow-3xs"
                      >
                        T区出油严重 ☀️
                      </button>
                      <button 
                        onClick={() => handleQuickAsk('敏感期换季，求温和修复组合')}
                        className="px-3 py-1.5 bg-white border border-stone-100 text-[10px] text-stone-600 hover:text-stone-800 rounded-full whitespace-nowrap shadow-3xs"
                      >
                        敏感换季温和组合 🌱
                      </button>
                    </div>

                    {/* Input Area */}
                    <div className="flex gap-2 shrink-0">
                      <textarea
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="描述您当下的皮肤状况或困扰..."
                        className="flex-1 h-12 bg-white border border-stone-100 rounded-2xl px-4 py-3 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-400 resize-none shadow-3xs leading-relaxed"
                        onKeyDown={e => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            requestVerdict();
                          }
                        }}
                      />
                      <button
                        onClick={requestVerdict}
                        disabled={loading || !query.trim()}
                        className="w-12 h-12 bg-stone-800 hover:bg-stone-700 text-white rounded-2xl flex items-center justify-center active:scale-95 transition-transform disabled:opacity-40 disabled:hover:bg-stone-800 shadow-2xs"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* 4. ROUTINE & TRAVEL TAB (Matches Image 5 Timeline) */}
                {tab === 'routine' && (
                  <div className="px-4 py-2 space-y-4">
                    {/* Sub-tab selection */}
                    <div className="bg-white p-1 rounded-xl flex border border-stone-100 shadow-3xs">
                      <button
                        onClick={() => setTravelActiveTab('routine')}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                          travelActiveTab === 'routine' 
                            ? 'bg-stone-100 text-stone-800' 
                            : 'text-stone-400 hover:text-stone-600'
                        }`}
                      >
                        每日护肤日常
                      </button>
                      <button
                        onClick={() => setTravelActiveTab('travel')}
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
                              {['Cleanser', 'Toner', 'Serum', 'Moisturizer', 'Sunscreen'].filter(cat => inventory.some(i => i.category === cat)).length} 步已就绪
                            </span>
                          </div>
                        </div>

                        {/* Step By Step Timeline (Image 5 style) */}
                        <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-2xs relative space-y-6">
                          {/* Vertical Line */}
                          <div className="absolute left-[27px] top-8 bottom-8 w-0.5 bg-stone-100" />

                          {/* Step 1: Cleanser */}
                          <div className="flex gap-4 relative z-10">
                            <div className="w-6 h-6 rounded-full bg-stone-800 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0 border-4 border-white shadow-sm">1</div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <h5 className="text-xs font-bold text-stone-800">洁面乳 · Cleanser</h5>
                                <span className="text-[8px] bg-[#E8F3E8] text-[#3D7D52] px-1.5 py-0.5 rounded-full font-bold">早晚</span>
                              </div>
                              {/* Check if we have a cleanser */}
                              {inventory.some(i => i.category === 'Cleanser') ? (
                                <div className="bg-[#FAF8F5] p-2.5 rounded-xl border border-stone-100 flex items-center justify-between">
                                  <span className="text-[11px] text-stone-700 font-medium truncate max-w-[180px]">
                                    {inventory.find(i => i.category === 'Cleanser')?.name}
                                  </span>
                                  <CheckSquare className="w-3.5 h-3.5 text-[#3D7D52]" />
                                </div>
                              ) : (
                                <p className="text-[10px] text-stone-400 italic">暂无可用洁面，建议在「探索」或「拍照」中添加</p>
                              )}
                            </div>
                          </div>

                          {/* Step 2: Toner */}
                          <div className="flex gap-4 relative z-10">
                            <div className="w-6 h-6 rounded-full bg-stone-800 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0 border-4 border-white shadow-sm">2</div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <h5 className="text-xs font-bold text-stone-800">爽肤补水 · Toner</h5>
                                <span className="text-[8px] bg-sky-50 text-sky-700 px-1.5 py-0.5 rounded-full font-bold">晚间</span>
                              </div>
                              {inventory.some(i => i.category === 'Toner') ? (
                                <div className="bg-[#FAF8F5] p-2.5 rounded-xl border border-stone-100 flex items-center justify-between">
                                  <span className="text-[11px] text-stone-700 font-medium truncate max-w-[180px]">
                                    {inventory.find(i => i.category === 'Toner')?.name}
                                  </span>
                                  <CheckSquare className="w-3.5 h-3.5 text-[#3D7D52]" />
                                </div>
                              ) : (
                                <p className="text-[10px] text-stone-400 italic">暂无可用补水，建议添加爽肤水</p>
                              )}
                            </div>
                          </div>

                          {/* Step 3: Serum */}
                          <div className="flex gap-4 relative z-10">
                            <div className="w-6 h-6 rounded-full bg-stone-800 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0 border-4 border-white shadow-sm">3</div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <h5 className="text-xs font-bold text-stone-800">密集修复 · Serum</h5>
                                <span className="text-[8px] bg-[#E8F3E8] text-[#3D7D52] px-1.5 py-0.5 rounded-full font-bold">早晚</span>
                              </div>
                              {inventory.some(i => i.category === 'Serum') ? (
                                <div className="bg-[#FAF8F5] p-2.5 rounded-xl border border-stone-100 flex items-center justify-between">
                                  <span className="text-[11px] text-stone-700 font-medium truncate max-w-[180px]">
                                    {inventory.find(i => i.category === 'Serum')?.name}
                                  </span>
                                  <CheckSquare className="w-3.5 h-3.5 text-[#3D7D52]" />
                                </div>
                              ) : (
                                <p className="text-[10px] text-stone-400 italic">暂无可用精华，建议添加精华液</p>
                              )}
                            </div>
                          </div>

                          {/* Step 4: Moisturizer */}
                          <div className="flex gap-4 relative z-10">
                            <div className="w-6 h-6 rounded-full bg-stone-800 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0 border-4 border-white shadow-sm">4</div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <h5 className="text-xs font-bold text-stone-800">锁水保湿 · Cream</h5>
                                <span className="text-[8px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded-full font-bold">早晚</span>
                              </div>
                              {inventory.some(i => i.category === 'Moisturizer') ? (
                                <div className="bg-[#FAF8F5] p-2.5 rounded-xl border border-stone-100 flex items-center justify-between">
                                  <span className="text-[11px] text-stone-700 font-medium truncate max-w-[180px]">
                                    {inventory.find(i => i.category === 'Moisturizer')?.name}
                                  </span>
                                  <CheckSquare className="w-3.5 h-3.5 text-[#3D7D52]" />
                                </div>
                              ) : (
                                <p className="text-[10px] text-stone-400 italic">暂无可用保湿霜，建议添加面霜</p>
                              )}
                            </div>
                          </div>

                          {/* Step 5: Sunscreen */}
                          <div className="flex gap-4 relative z-10">
                            <div className="w-6 h-6 rounded-full bg-stone-850 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0 border-4 border-white shadow-sm">5</div>
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center justify-between">
                                <h5 className="text-xs font-bold text-stone-800">日间防护 · Sunscreen</h5>
                                <span className="text-[8px] bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded-full font-bold">日间</span>
                              </div>
                              {inventory.some(i => i.category === 'Sunscreen') ? (
                                <div className="bg-[#FAF8F5] p-2.5 rounded-xl border border-stone-100 flex items-center justify-between">
                                  <span className="text-[11px] text-stone-700 font-medium truncate max-w-[180px]">
                                    {inventory.find(i => i.category === 'Sunscreen')?.name}
                                  </span>
                                  <CheckSquare className="w-3.5 h-3.5 text-[#3D7D52]" />
                                </div>
                              ) : (
                                <p className="text-[10px] text-stone-400 italic">暂无可用防晒，建议添加防晒霜</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Travel Packing Tab */
                      <div className="space-y-4">
                        <form onSubmit={requestTravel} className="bg-white p-5 rounded-3xl border border-stone-100 shadow-3xs space-y-4">
                          <p className="text-xs text-stone-400 font-bold">智能规划目的地气候及推荐用量</p>
                          
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
                                  const prod = inventory.find(i => i.id === id);
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
                )}
              </motion.div>
            )}

            {/* SUB-VIEW: SCAN CAMERA (Full Screen inside phone frame) */}
            {view === 'scan' && (
              <Scanner 
                onScanSuccess={handleScanSuccess} 
                onCancel={() => setView('home')} 
              />
            )}

            {/* SUB-VIEW: ADD OPENED DATE SPECIFIER */}
            {view === 'add-date' && scanResult && (
              <motion.div 
                key="add-date"
                initial={{ opacity: 0, y: '100%' }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: '100%' }}
                className="absolute inset-0 z-50 bg-[#FAF8F5] flex flex-col justify-end p-5"
              >
                <div className="w-full bg-white p-6 rounded-3xl shadow-md border border-stone-100 flex flex-col items-center text-center space-y-5">
                  <div className="w-20 h-20 bg-[#FAF8F5] rounded-full flex items-center justify-center border border-stone-100">
                    <Bottle shape={scanResult.bottle.shape} colorHex={scanResult.bottle.colorHex} size={64} />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full font-bold uppercase">{scanResult.brand}</span>
                    <h2 className="text-lg font-bold text-stone-800 tracking-tight">{scanResult.name}</h2>
                    <p className="text-stone-400 text-xs">{categoryLabels[scanResult.category] || scanResult.category}</p>
                  </div>

                  <div className="w-full bg-[#FAF8F5] rounded-2xl p-4 text-left space-y-2 border border-stone-100/50">
                    <div className="flex items-center justify-between text-xs font-semibold text-stone-600">
                      <span>开封保质期 (PAO)</span>
                      <span className="text-stone-800">{scanResult.paoMonths} 个月</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1.5">
                      {scanResult.keyIngredients.slice(0, 4).map(ing => (
                        <span key={ing} className="px-2 py-0.5 bg-white rounded-md border border-stone-100 text-[10px] text-stone-500 font-medium shadow-3xs">{ing}</span>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handleAddDate} className="w-full space-y-4">
                    <div className="space-y-1.5 text-left">
                      <label className="text-[10px] text-stone-400 font-bold uppercase">开封时间</label>
                      <input 
                        type="month" 
                        name="month" 
                        required 
                        defaultValue={format(new Date(), 'yyyy-MM')} 
                        className="w-full bg-[#FAF8F5] border border-stone-100 rounded-xl px-4 py-3 text-xs text-stone-850 focus:outline-none focus:border-stone-400 shadow-3xs" 
                      />
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <button 
                        type="button" 
                        onClick={() => { setScanResult(null); setView('home'); }} 
                        className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-600 py-3.5 rounded-xl text-xs font-bold transition-all"
                      >
                        放弃
                      </button>
                      <button 
                        type="submit" 
                        className="flex-1 bg-stone-800 hover:bg-stone-700 text-white py-3.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1"
                      >
                        加入化妆柜 <Check className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* PERSISTENT FLOATING NAVIGATION BAR */}
        {view === 'home' && (
          <div className="absolute bottom-0 inset-x-0 bg-white/90 backdrop-blur-md border-t border-stone-100 px-4 py-3 flex justify-around items-center z-40 shadow-sm">
            <button 
              onClick={() => setTab('shelf')} 
              className={`flex flex-col items-center gap-1 transition-all ${tab === 'shelf' ? 'text-stone-900 scale-105' : 'text-stone-400 hover:text-stone-600'}`}
            >
              <div className="p-1 rounded-full"><Sliders className="w-5 h-5" /></div>
              <span className="text-[9px] font-bold">我的柜子</span>
            </button>

            <button 
              onClick={() => setTab('explore')} 
              className={`flex flex-col items-center gap-1 transition-all ${tab === 'explore' ? 'text-stone-900 scale-105' : 'text-stone-400 hover:text-stone-600'}`}
            >
              <div className="p-1 rounded-full"><Heart className="w-5 h-5" /></div>
              <span className="text-[9px] font-bold">发现推荐</span>
            </button>

            {/* SCANNER TRIGGER BUTTON */}
            <button 
              onClick={() => setView('scan')} 
              className="relative -top-5 flex-shrink-0 w-12 h-12 bg-stone-850 hover:bg-stone-700 text-white rounded-full flex items-center justify-center active:scale-95 transition-transform shadow-md border-4 border-[#FAF8F5] group"
            >
              <Camera className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </button>

            <button 
              onClick={() => setTab('ai')} 
              className={`flex flex-col items-center gap-1 transition-all ${tab === 'ai' ? 'text-stone-900 scale-105' : 'text-stone-400 hover:text-stone-600'}`}
            >
              <div className="p-1 rounded-full"><Sparkles className="w-5 h-5" /></div>
              <span className="text-[9px] font-bold">AI咨询</span>
            </button>

            <button 
              onClick={() => setTab('routine')} 
              className={`flex flex-col items-center gap-1 transition-all ${tab === 'routine' ? 'text-stone-900 scale-105' : 'text-stone-400 hover:text-stone-600'}`}
            >
              <div className="p-1 rounded-full"><Plane className="w-5 h-5" /></div>
              <span className="text-[9px] font-bold">收纳日常</span>
            </button>
          </div>
        )}

        {/* --- DRAWER MODALS --- */}

        {/* 1. PRODUCT DETAIL BOTTOM SHEET MODAL (iOS style) */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-end justify-center"
              onClick={() => setSelectedProduct(null)}
            >
              <motion.div 
                initial={{ y: '100%' }} 
                animate={{ y: 0 }} 
                exit={{ y: '100%' }}
                transition={{ type: "spring", damping: 24, stiffness: 260 }} 
                onClick={e => e.stopPropagation()} 
                className="w-full bg-white rounded-t-[32px] p-6 relative shadow-2xl pb-8 max-h-[85%] overflow-y-auto"
              >
                {/* Drag handle line */}
                <div className="w-12 h-1.5 bg-stone-200 rounded-full mx-auto mb-4" />
                
                <button 
                  onClick={() => setSelectedProduct(null)} 
                  className="absolute top-4 right-4 p-1.5 bg-stone-100 hover:bg-stone-200 rounded-full text-stone-500 hover:text-stone-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                
                <div className="flex justify-center mb-4 mt-2">
                   <Bottle shape={selectedProduct.bottle.shape} colorHex={selectedProduct.bottle.colorHex} size={80} />
                </div>
                
                <div className="text-center space-y-1 mb-6">
                  <span className="text-[9px] bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">{selectedProduct.brand}</span>
                  <h3 className="text-base font-bold text-stone-800">{selectedProduct.name}</h3>
                  <span className="inline-block px-2 py-0.5 bg-[#3D7D52]/10 text-[#3D7D52] rounded text-[10px] font-bold">
                    {categoryLabels[selectedProduct.category] || selectedProduct.category}
                  </span>
                </div>
                
                <div className="space-y-3 bg-[#FAF8F5] p-5 rounded-2xl border border-stone-100">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-stone-400 shrink-0" />
                    <div className="text-xs">
                      <p className="text-stone-400 font-medium">开封时间</p>
                      <p className="text-stone-700 font-semibold mt-0.5">{format(parseISO(selectedProduct.openedDate), 'yyyy年MM月')}</p>
                    </div>
                  </div>
                  
                  <div className="h-px bg-stone-100" />
                  
                  <div className="flex items-center gap-3">
                    <Info className="w-4 h-4 text-stone-400 shrink-0" />
                    <div className="text-xs">
                      <p className="text-stone-400 font-medium">保质期限</p>
                      <p className="text-stone-700 font-semibold mt-0.5">
                        {format(parseISO(selectedProduct.expiryDate), 'yyyy年MM月')} 
                        <span className="text-stone-400 font-medium ml-1">({selectedProduct.paoMonths}个月 PAO)</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">核心活性成分 ({selectedProduct.keyIngredients.length})</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProduct.keyIngredients.map(ing => (
                      <span key={ing} className="px-2.5 py-1 bg-stone-50 text-stone-600 rounded-lg text-xs font-semibold border border-stone-100 shadow-3xs">{ing}</span>
                    ))}
                  </div>
                </div>

                {/* Remove product button */}
                <button
                  onClick={() => {
                    setInventory(inventory.filter(i => i.id !== selectedProduct.id));
                    setSelectedProduct(null);
                  }}
                  className="w-full mt-6 py-3 border border-rose-150 hover:bg-rose-50 text-rose-600 text-xs font-bold rounded-xl active:scale-95 transition-all text-center"
                >
                  从化妆柜中移除该产品
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. PROFILE EDITOR BOTTOM SHEET MODAL */}
        <AnimatePresence>
          {showProfileModal && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-end justify-center"
              onClick={() => setShowProfileModal(false)}
            >
              <motion.div 
                initial={{ y: '100%' }} 
                animate={{ y: 0 }} 
                exit={{ y: '100%' }}
                transition={{ type: "spring", damping: 24, stiffness: 260 }} 
                onClick={e => e.stopPropagation()} 
                className="w-full bg-white rounded-t-[32px] p-6 relative shadow-2xl pb-8"
              >
                {/* Drag handle line */}
                <div className="w-12 h-1.5 bg-stone-200 rounded-full mx-auto mb-4" />
                
                <button 
                  onClick={() => setShowProfileModal(false)} 
                  className="absolute top-4 right-4 p-1.5 bg-stone-100 hover:bg-stone-200 rounded-full text-stone-500 hover:text-stone-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <h3 className="text-base font-bold text-stone-800 mb-5">配置您的肤质画像</h3>

                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-stone-400 font-bold uppercase">基本肤质</label>
                    <div className="grid grid-cols-4 gap-2">
                      {['dry', 'oily', 'combination', 'normal'].map(type => (
                        <label 
                          key={type} 
                          className="flex flex-col items-center justify-center p-2 rounded-xl border text-[11px] font-semibold cursor-pointer transition-all select-none"
                          style={{
                            backgroundColor: profile.skinType === type ? '#E8F3E8' : '#FAF8F5',
                            borderColor: profile.skinType === type ? '#3D7D52' : '#F0EDE8',
                            color: profile.skinType === type ? '#3D7D52' : '#78716c'
                          }}
                        >
                          <input 
                            type="radio" 
                            name="skinType" 
                            value={type} 
                            defaultChecked={profile.skinType === type}
                            className="sr-only" 
                            onChange={() => setProfile({ ...profile, skinType: type as SkinProfile['skinType'] })}
                          />
                          {skinTypeLabels[type]}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-stone-400 font-bold uppercase">敏感成分 (逗号隔开)</label>
                    <input 
                      name="sensitivities" 
                      defaultValue={profile.sensitivities.join(', ')}
                      placeholder="如：香精, 酒精, 视黄醇"
                      className="w-full bg-[#FAF8F5] border border-stone-100 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-none focus:border-stone-400 shadow-3xs" 
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-stone-400 font-bold uppercase">当前在用的强效成分</label>
                    <input 
                      name="currentActives" 
                      defaultValue={profile.currentActives.join(', ')}
                      placeholder="如：烟酰胺, 维C, A醇"
                      className="w-full bg-[#FAF8F5] border border-stone-100 rounded-xl px-3 py-2 text-xs text-stone-800 focus:outline-none focus:border-stone-400 shadow-3xs" 
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-stone-400 font-bold uppercase">您当前所在城市</label>
                    <input 
                      name="city" 
                      defaultValue={profile.city}
                      className="w-full bg-[#FAF8F5] border border-stone-100 rounded-xl px-3 py-2 text-xs text-stone-850 focus:outline-none focus:border-stone-400 shadow-3xs" 
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-stone-800 hover:bg-stone-700 text-white py-3.5 rounded-xl font-bold text-xs active:scale-95 transition-all shadow-sm"
                  >
                    保存我的肤质设置
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3. SET DATE AND ADD TO CABINET DRAWER FOR EXPLORE PRODUCTS */}
        <AnimatePresence>
          {addingExploreProd && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-end justify-center"
              onClick={() => setAddingExploreProd(null)}
            >
              <motion.div 
                initial={{ y: '100%' }} 
                animate={{ y: 0 }} 
                exit={{ y: '100%' }}
                transition={{ type: "spring", damping: 24, stiffness: 260 }} 
                onClick={e => e.stopPropagation()} 
                className="w-full bg-white rounded-t-[32px] p-6 relative shadow-2xl pb-8"
              >
                {/* Drag handle line */}
                <div className="w-12 h-1.5 bg-stone-200 rounded-full mx-auto mb-4" />
                
                <button 
                  onClick={() => setAddingExploreProd(null)} 
                  className="absolute top-4 right-4 p-1.5 bg-stone-100 hover:bg-stone-200 rounded-full text-stone-500 hover:text-stone-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 bg-[#FAF8F5] rounded-full flex items-center justify-center border border-stone-100">
                    <Bottle shape={addingExploreProd.bottle.shape} colorHex={addingExploreProd.bottle.colorHex} size={48} />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full font-bold uppercase">{addingExploreProd.brand}</span>
                    <h3 className="text-base font-bold text-stone-800">{addingExploreProd.name}</h3>
                    <p className="text-stone-400 text-xs">{categoryLabels[addingExploreProd.category] || addingExploreProd.category}</p>
                  </div>

                  <form onSubmit={handleAddExploreProduct} className="w-full space-y-4 text-left">
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-stone-400 font-bold uppercase">什么时候开封的该产品？</label>
                      <input 
                        type="month" 
                        name="month" 
                        required 
                        defaultValue={format(new Date(), 'yyyy-MM')} 
                        className="w-full bg-[#FAF8F5] border border-stone-100 rounded-xl px-4 py-3 text-xs text-stone-800 focus:outline-none focus:border-stone-400 shadow-3xs" 
                      />
                    </div>
                    
                    <button 
                      type="submit"
                      className="w-full bg-stone-850 hover:bg-stone-700 text-white py-3.5 rounded-xl font-bold text-xs active:scale-95 transition-all shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <span>确认添加至化妆柜</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </div>
  );
}
