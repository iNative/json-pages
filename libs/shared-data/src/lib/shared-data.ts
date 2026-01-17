export function sharedData(): string {
  return 'shared-data';
}
// --- CONFIG INTERFACES ---

export interface SiteConfig {
  title: string;
  description: string;
  logoUrl: string;
  socials?: Record<string, string>;
}

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  layout: 'standard' | 'sidebar' | 'minimal';
}

export interface MenuItem {
  label: string;
  path: string;
  children?: MenuItem[];
}

// --- CONTENT INTERFACES ---

export interface ContentItem {
  id: string;
  collection: string; // es. 'atleti', 'regate', 'sponsor'
  title: string;
  subtitle?: string;
  image?: string;
  body?: string;
  tags?: string[];
  metadata?: Record<string, any>; // Per dati extra specifici
}

// --- API RESPONSE WRAPPER ---
// Standardizziamo le risposte del backend
export interface ApiResponse<T> {
  data: T;
  timestamp: string;
}