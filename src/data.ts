/* Shelfie data + helpers — real Product shapes; verdict/travel go through /api. */
import { addMonths, differenceInDays, format, parseISO } from 'date-fns';
import { Product, SkinProfile, AccountPromptTrigger } from './types';

export const demoProfile: SkinProfile = { skinType: null, sensitivities: [], currentActives: [], city: '', concerns: [], safetyFlags: [] };

/* Onboarding (建档) flow data — options + city weather previews, ported from the design kit. */
export const OB = {
  skinType: ['干性', '油性', '混合', '敏感', '中性'],
  concerns: ['冒痘', '泛红', '干燥', '熬夜后', '上妆前', '换季偏干'],
  actives: ['A醇/维A', '酸类', '维C', '都没有'],
  cities: ['上海', '北京', '洛杉矶', '伦敦'],
  safety: ['孕期/哺乳', '正在看皮肤科/用处方药', '当前有严重痘/破损/感染', '以上都没有'],
};

export const CITY_WEATHER: Record<string, { temp: number; humidity: number; uv: number; season: string; tag: string }> = {
  '上海': { temp: 33, humidity: 82, uv: 8, season: '梅雨/夏', tag: '闷热高湿' },
  '北京': { temp: 8, humidity: 30, uv: 3, season: '秋冬', tag: '干冷' },
  '洛杉矶': { temp: 26, humidity: 35, uv: 9, season: '夏', tag: '干热·紫外强' },
  '伦敦': { temp: 11, humidity: 75, uv: 2, season: '秋', tag: '湿冷' },
};

/* Map the onboarding's Chinese skin-type label to the app's SkinProfile enum. */
export function mapSkinType(label: string): SkinProfile['skinType'] {
  return { '干性': 'dry', '油性': 'oily', '混合': 'combination', '中性': 'normal', '敏感': 'normal' }[label] as SkinProfile['skinType'] ?? null;
}

export const demoInventory: Product[] = [
  { id: '1', name: '小褐瓶特润修护精华', brand: 'Estée Lauder', category: 'Serum', keyIngredients: ['二裂酵母', '透明质酸', '多肽'], paoMonths: 24, openedDate: '2025-01-01', expiryDate: '2027-01-01', bottle: { shape: 'dropper', colorHex: '#8B5A2B' }, img: '/products/1.png', status: 'active' },
  { id: '2', name: 'Lotion P50 爽肤水', brand: 'Biologique Recherche', category: 'Toner', keyIngredients: ['水杨酸', '乳酸', '植酸'], paoMonths: 12, openedDate: '2025-10-01', expiryDate: '2026-10-01', bottle: { shape: 'bottle', colorHex: '#D2B48C' }, img: '/products/2.png', status: 'active' },
  { id: '3', name: '修护保湿润肤乳', brand: 'CeraVe', category: 'Moisturizer', keyIngredients: ['神经酰胺', '透明质酸'], paoMonths: 12, openedDate: '2025-08-01', expiryDate: '2026-08-01', bottle: { shape: 'pump', colorHex: '#00599C' }, img: '/products/3.png', status: 'active' },
  { id: '4', name: '水饱饱 B5 保湿精华', brand: 'Drunk Elephant', category: 'Serum', keyIngredients: ['维生素B5', '菠萝神经酰胺'], paoMonths: 12, openedDate: '2026-02-01', expiryDate: '2027-02-01', bottle: { shape: 'pump', colorHex: '#40E0D0' }, img: '/products/4.png', status: 'active' },
  { id: '5', name: '无感隐形防晒乳 SPF40', brand: 'Supergoop!', category: 'Sunscreen', keyIngredients: ['红藻提取物', '草本精粹'], paoMonths: 18, openedDate: '2026-06-01', expiryDate: '2027-12-01', bottle: { shape: 'tube', colorHex: '#FCDC4D' }, img: '/products/5.png', status: 'active' },
  { id: '6', name: '绿茶籽水分菁露', brand: 'Innisfree', category: 'Serum', keyIngredients: ['绿茶籽', '双重透明质酸'], paoMonths: 12, openedDate: '2025-07-01', expiryDate: '2026-07-01', bottle: { shape: 'pump', colorHex: '#4CAF50' }, img: '/products/6.png', status: 'expiring' },
];

export interface CuratedProduct {
  id: string; name: string; brand: string; category: string; matchScore: number;
  tags: string[]; description: string; keyIngredients: string[]; paoMonths: number;
  bottle: { shape: 'pump' | 'tube' | 'jar' | 'dropper' | 'spray' | 'stick' | 'bottle'; colorHex: string };
  img?: string;
}

export const curatedProducts: CuratedProduct[] = [
  { id: 'cur-1', name: '积雪草舒缓强韧精华液', brand: 'Skin1004', category: 'Serum', matchScore: 98, tags: ['超强推荐', '无香精', '敏感肌友好'], description: '核心提取马达加斯加纯净积雪草，瞬间褪红，强韧受损屏障。', keyIngredients: ['积雪草提取物', '羟基积雪草苷'], paoMonths: 12, bottle: { shape: 'dropper', colorHex: '#E2D3C1' }, img: '/products/cur-1.png' },
  { id: 'cur-2', name: '温和弱酸性氨基酸洁面', brand: 'Anua', category: 'Cleanser', matchScore: 94, tags: ['深层清洁', '温和不紧绷'], description: '含有 77% 鱼腥草精粹，舒缓修护，温和洗净油脂粉尘。', keyIngredients: ['鱼腥草提取物', '椰油酰甘氨酸钾'], paoMonths: 12, bottle: { shape: 'tube', colorHex: '#EAEBE6' }, img: '/products/cur-2.png' },
  { id: 'cur-3', name: '微修护维 C 亮肤精华', brand: 'Innbeauty Project', category: 'Serum', matchScore: 89, tags: ['提亮肤色', '抗氧化'], description: '高活性温和 VC 配方，快速提亮暗沉，淡化新生痘印且不易泛红。', keyIngredients: ['包裹型维生素C', '阿魏酸', '神经酰胺'], paoMonths: 9, bottle: { shape: 'pump', colorHex: '#FF7F50' }, img: '/products/cur-3.png' },
  { id: 'cur-4', name: '鱼腥草 77% 舒缓爽肤水', brand: 'Anua', category: 'Toner', matchScore: 92, tags: ['去闭口', '湿敷推荐'], description: '韩国极高人气爽肤水，主打舒缓镇定，针对闭口和粉刺改善显著。', keyIngredients: ['鱼腥草水', '积雪草', '洋甘菊'], paoMonths: 12, bottle: { shape: 'bottle', colorHex: '#D9ECE4' }, img: '/products/cur-4.png' },
  { id: 'cur-5', name: '纯净大米益生菌清爽防晒乳', brand: 'Beauty of Joseon', category: 'Sunscreen', matchScore: 88, tags: ['水润轻薄', '不油腻'], description: '乳霜质地极易推开，成膜速度快，含有大米发酵物，温和养肤。', keyIngredients: ['大米提取物', '谷物益生菌'], paoMonths: 12, bottle: { shape: 'tube', colorHex: '#FAF6EF' }, img: '/products/cur-5.png' },
];

export const categoryLabels: Record<string, string> = { All: '全部', Serum: '精华液', Toner: '爽肤水', Moisturizer: '乳液面霜', Sunscreen: '防晒霜', Cleanser: '洁面乳', Cream: '面霜', Lotion: '乳液' };
export const skinTypeLabels: Record<string, string> = { dry: '干性肌', oily: '油性肌', combination: '混合肌', normal: '中性肌' };
export const coreRoutineCategories = ['Cleanser', 'Moisturizer', 'Sunscreen'];

export type RoutineTone = 'mint' | 'blue' | 'lilac' | 'amber';
export interface RoutineStep { n: number; cat: string; label: string; timing: string; tone: RoutineTone; empty: string; }
export const routineSteps: RoutineStep[] = [
  { n: 1, cat: 'Cleanser', label: '洁面乳 · Cleanser', timing: '早晚', tone: 'mint', empty: '暂无可用洁面，建议在「探索」或「拍照」中添加' },
  { n: 2, cat: 'Toner', label: '爽肤补水 · Toner', timing: '晚间', tone: 'blue', empty: '暂无可用补水，建议添加爽肤水' },
  { n: 3, cat: 'Serum', label: '密集修复 · Serum', timing: '早晚', tone: 'mint', empty: '暂无可用精华，建议添加精华液' },
  { n: 4, cat: 'Moisturizer', label: '锁水保湿 · Cream', timing: '早晚', tone: 'lilac', empty: '暂无可用保湿霜，建议添加面霜' },
  { n: 5, cat: 'Sunscreen', label: '日间防护 · Sunscreen', timing: '日间', tone: 'amber', empty: '暂无可用防晒，建议添加防晒霜' },
];

export const quickAsks = [
  { text: '下巴长痘且发红，很紧绷', chip: '下巴长痘发红 💧' },
  { text: '天气太热了，T区出油严重', chip: 'T区出油严重 ☀️' },
  { text: '敏感期换季，求温和修复组合', chip: '敏感换季温和组合 🌱' },
];

export const accountPromptCopy: Record<AccountPromptTrigger, { benefits: string[]; description: string; title: string }> = {
  'first-product': { title: '已经获得第一轮价值，可以提示未来保存入口了', description: '你已经成功把产品放进柜子。下一步真正值得做的账号能力，是保存、同步和跨设备继续使用。', benefits: ['保存你的 cabinet', '跨设备同步柜子', '后续接入到期开封提醒'] },
  'ai-advice': { title: 'AI 建议已经产生，未来可以在这里承接账号入口', description: '现在你已经感受到 inventory-aware AI 的价值，后续账号提示可以用来保存历史建议和个性化设置。', benefits: ['保存 AI 历史建议', '同步肤质与敏感信息', '让后续推荐更连贯'] },
  'travel-plan': { title: '出行建议已经有价值，未来可以在这里引导注册', description: '你已经得到了基于现有柜子的打包建议，后续账号入口可以承接保存清单和跨次旅行复用。', benefits: ['保存 travel packing 清单', '同步你的常用柜子', '为后续提醒和个性化做准备'] },
};

/* date helpers */
export function expiryStatus(p: Product): 'expired' | 'expiring' | 'active' {
  const d = differenceInDays(parseISO(p.expiryDate.length === 7 ? p.expiryDate + '-01' : p.expiryDate), new Date());
  if (d < 0) return 'expired';
  if (d <= 30) return 'expiring';
  return 'active';
}
export function monthsOpened(p: Product): number {
  const d = differenceInDays(new Date(), parseISO(p.openedDate.length === 7 ? p.openedDate + '-01' : p.openedDate));
  return Math.max(0, Math.round(d / 30));
}
export function fmtYearMonth(ym: string): string {
  const d = parseISO(ym.length === 7 ? ym + '-01' : ym);
  return `${d.getFullYear()}年${String(d.getMonth() + 1).padStart(2, '0')}月`;
}
export function addMonthsFromMonth(month: string, n: number): string {
  return format(addMonths(parseISO(month + '-01'), n), 'yyyy-MM-dd');
}
