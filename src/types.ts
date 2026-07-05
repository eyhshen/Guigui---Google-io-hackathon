export type SkinProfile = {
  skinType: 'dry' | 'oily' | 'combination' | 'normal';
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
  status: 'active' | 'expiring' | 'expired';
};

export type ScanResult = Omit<Product, 'id' | 'openedDate' | 'expiryDate' | 'status'>;

export type VerdictResult = {
  recommendedIds: string[];
  avoidIds: string[];
  reason: string;
};

export type TravelResult = {
  selectedIds: string[];
  reason: string;
};
