export type SkinProfile = {
  skinType: 'dry' | 'oily' | 'combination' | 'normal' | null;
  sensitivities: string[];
  currentActives: string[];
  city: string;
};

export type ProductShape = 'pump' | 'tube' | 'jar' | 'dropper' | 'spray' | 'stick' | 'bottle';

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  keyIngredients: string[];
  paoMonths: number;
  openedDate: string; // YYYY-MM
  expiryDate: string; // YYYY-MM
  bottle: {
    shape: ProductShape;
    colorHex: string;
  };
  img?: string; // generated transparent product cutout, e.g. /products/<id>.png
  status: 'active' | 'expiring' | 'expired';
};

export type ScanResult = Omit<Product, 'id' | 'openedDate' | 'expiryDate' | 'status'>;

export type VerdictResult = {
  recommendedIds: string[];
  avoidIds: string[];
  reason: string;
};

export type ChatMessage = {
  sender: 'user' | 'assistant';
  text: string;
  verdict?: VerdictResult;
};

export type TravelResult = {
  selectedIds: string[];
  reason: string;
};

export type Account = {
  id: string;
  email: string;
  name: string;
  provider: 'email' | 'google';
  createdAt: string;
};

export type AccountPromptTrigger = 'first-product' | 'ai-advice' | 'travel-plan';

export type AccountPromptState = {
  activeTrigger: AccountPromptTrigger | null;
  dismissedTriggers: AccountPromptTrigger[];
  eligibleTriggers: AccountPromptTrigger[];
  showModal: boolean;
};
