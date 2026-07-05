import { ScanResult, VerdictResult, TravelResult, SkinProfile, Product } from './types';

export async function scanProductImage(imageBase64: string): Promise<ScanResult> {
  const res = await fetch('/api/scan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageBase64 })
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to scan image');
  }
  return res.json();
}

export async function getVerdict(profile: SkinProfile, inventory: Product[], condition: string): Promise<VerdictResult> {
  const res = await fetch('/api/verdict', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profile, inventory, condition })
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to get verdict');
  }
  return res.json();
}

export async function getTravelList(profile: SkinProfile, inventory: Product[], destination: string, days: number): Promise<TravelResult> {
  const res = await fetch('/api/travel', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profile, inventory, destination, days })
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to get travel list');
  }
  return res.json();
}
