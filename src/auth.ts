/* Client-side account layer for GuiGui — localStorage only, no backend.
   Gates the "记录档案" (save profile + cabinet) feature behind registration.
   Two real entries: Google Sign-In (verified ID token, no server secret) and
   email + password (PBKDF2-hashed, never stored in plaintext). */
import { Account, SkinProfile, Product } from './types';

const SESSION_KEY = 'guigui.session';   // id of the signed-in account
const USERS_KEY = 'guigui.users';       // email -> credential record
const DATA_PREFIX = 'guigui.data.';     // per-account { profile, inventory }

export const GOOGLE_CLIENT_ID = (import.meta as any).env?.VITE_GOOGLE_CLIENT_ID || '';

type UserRecord = Account & { salt?: string; hash?: string }; // salt/hash only for email accounts
type StoredData = { profile: SkinProfile; inventory: Product[] };

function readUsers(): Record<string, UserRecord> {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '{}'); } catch { return {}; }
}
function writeUsers(users: Record<string, UserRecord>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}
function toAccount(u: UserRecord): Account {
  return { id: u.id, email: u.email, name: u.name, provider: u.provider, createdAt: u.createdAt };
}
function newId(): string {
  return 'a_' + Math.random().toString(36).slice(2, 10);
}

/* ---- PBKDF2 password hashing (Web Crypto) — plaintext passwords never touch storage ---- */
function buf2hex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}
async function derive(password: string, saltHex: string): Promise<string> {
  const enc = new TextEncoder();
  const salt = Uint8Array.from(saltHex.match(/.{2}/g)!.map((h) => parseInt(h, 16)));
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 120000, hash: 'SHA-256' }, key, 256);
  return buf2hex(bits);
}
function randomSalt(): string {
  return buf2hex(crypto.getRandomValues(new Uint8Array(16)).buffer);
}

/* ---- Session ---- */
export function loadAccount(): Account | null {
  const id = localStorage.getItem(SESSION_KEY);
  if (!id) return null;
  const rec = Object.values(readUsers()).find((u) => u.id === id);
  return rec ? toAccount(rec) : null;
}
export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

/* ---- Email registration / login ---- */
export async function registerEmail(email: string, password: string, name?: string): Promise<Account> {
  const key = email.trim().toLowerCase();
  if (!key || !/.+@.+\..+/.test(key)) throw new Error('请输入有效的邮箱地址');
  if (password.length < 6) throw new Error('密码至少 6 位');
  const users = readUsers();
  if (users[key]) throw new Error('该邮箱已注册，请直接登录');
  const salt = randomSalt();
  const hash = await derive(password, salt);
  const rec: UserRecord = { id: newId(), email: key, name: (name || key.split('@')[0]).trim(), provider: 'email', createdAt: new Date().toISOString(), salt, hash };
  users[key] = rec;
  writeUsers(users);
  localStorage.setItem(SESSION_KEY, rec.id);
  return toAccount(rec);
}
export async function loginEmail(email: string, password: string): Promise<Account> {
  const key = email.trim().toLowerCase();
  const rec = readUsers()[key];
  if (!rec || rec.provider !== 'email' || !rec.salt || !rec.hash) throw new Error('邮箱未注册');
  const hash = await derive(password, rec.salt);
  if (hash !== rec.hash) throw new Error('密码不正确');
  localStorage.setItem(SESSION_KEY, rec.id);
  return toAccount(rec);
}

/* ---- Google Sign-In: decode the verified ID token (JWT) and upsert the account ---- */
function decodeJwt(credential: string): { sub: string; email: string; name?: string } {
  const payload = credential.split('.')[1];
  const json = decodeURIComponent(atob(payload.replace(/-/g, '+').replace(/_/g, '/')).split('').map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0')).join(''));
  return JSON.parse(json);
}
export function signInWithGoogle(credential: string): Account {
  const { email, name } = decodeJwt(credential);
  const key = (email || '').trim().toLowerCase();
  if (!key) throw new Error('Google 未返回邮箱');
  const users = readUsers();
  let rec = users[key];
  if (!rec) {
    rec = { id: newId(), email: key, name: name || key.split('@')[0], provider: 'google', createdAt: new Date().toISOString() };
    users[key] = rec;
    writeUsers(users);
  }
  localStorage.setItem(SESSION_KEY, rec.id);
  return toAccount(rec);
}

/* ---- Per-account data (the "档案": skin profile + cabinet) ---- */
export function saveData(accountId: string, data: StoredData) {
  localStorage.setItem(DATA_PREFIX + accountId, JSON.stringify(data));
}
export function loadData(accountId: string): StoredData | null {
  try {
    const raw = localStorage.getItem(DATA_PREFIX + accountId);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}
