// --- FUNZIONI UTILITY (Legacy/Boilerplate) ---
export function sharedData(): string {
  return 'shared-data';
}

// =========================================================
// 🏗️ SEZIONE 1: CONFIGURAZIONE CORE & MENU (ESISTENTE)
// =========================================================

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
  children?: MenuItem[];     // Supporto per sottomenu
  target?: '_blank' | '_self'; // Supporto link esterni
}

// =========================================================
// 📄 SEZIONE 2: CONTENUTI SEMPLICI (ESISTENTE - Legacy)
// =========================================================

export interface ContentItem {
  id: string;
  collection: string; 
  title: string;
  subtitle?: string;
  image?: string;
  body?: string;
  tags?: string[];
  metadata?: Record<string, any>;
}

// =========================================================
// 🚀 SEZIONE 3: NUOVA ONTOLOGIA "PAGE BUILDER" (NUOVO)
// =========================================================

// Tipi di Blocchi supportati
// Aggiunti 'header' e 'footer' come richiesto
export type BlockType = 'header' | 'hero' | 'grid' | 'text' | 'html' | 'footer';

// Definizione Generica di un Blocco (Il Wrapper)
export interface PageBlock<T = any> {
  id: string;              // UUID per tracciamento
  type: BlockType;         // Il "selettore" del componente
  data: T;                 // Il payload specifico
  settings?: BlockSettings; // Opzioni di visualizzazione (margini, colori)
}

export interface BlockSettings {
  container?: 'fluid' | 'boxed'; // Larghezza piena o contenuta
  paddingTop?: string;    // es. "2rem"
  paddingBottom?: string;
  backgroundColor?: string;
  cssClass?: string;      // Classi utility custom (es. 'text-center')
  hidden?: boolean;       // Toggle visibilità
}

// Definizione della Pagina (Composition)
export interface PageDefinition {
  id: string;
  slug: string;           // es. 'home', 'chi-siamo'
  meta: PageMeta;         // SEO
  blocks: PageBlock[];    // L'ordine dei componenti
}

export interface PageMeta {
  title: string;
  description?: string;
  keywords?: string[];
}

// =========================================================
// 🧩 SEZIONE 4: INTERFACCE DATI SPECIFICHE PER I BLOCCHI
// =========================================================

// 1. HEADER (Menu + Logo)
export interface HeaderBlockData {
  logoOverride?: string;    // Opzionale: usa un logo diverso da quello globale
  menuSource: string;       // Quale menu caricare? es. 'main', 'sidebar'
  style?: 'transparent' | 'solid' | 'inverted'; // Comportamento visuale
  sticky?: boolean;         // Se deve rimanere fisso in alto
}

// 2. HERO (Banner Potenziato)
export interface HeroBlockData {
  title: string;
  subtitle?: string;
  backgroundImage?: string; // Opzionale per il layout split
  ctaLabel?: string;
  ctaUrl?: string;
  align?: 'left' | 'center' | 'right';
  
  // 👇 NUOVI CAMPI PER "BLOGPOST-HERO"
  date?: string;       // es. "8 Aprile 2024"
  category?: string;   // es. "Milano - Idroscalo"
  
  // 👇 NUOVI CAMPI PER "SPLIT HERO / SPONSOR"
  layout?: 'overlay' | 'split'; // 'overlay' = testo su immagine, 'split' = testo sx / immagine dx
  logos?: SponsorLogo[];        // Per la sezione sponsor
}

export interface SponsorLogo {
  src: string;
  alt?: string;
  width?: string; // es. 'icon-xl' o 'icon-lg' per mappare le classi CSS originali
}

// 3. GRID (Lista dinamica contenuti)
export interface GridBlockData {
  sourceCollection: string; // es. 'atleti', 'news'
  limit?: number;           // Quanti items mostrare
  mode?: 'card' | 'list' | 'carousel';
  filterTags?: string[];    // Filtri pre-applicati
}

// 4. TEXT / HTML (Contenuto libero)
export interface HtmlBlockData {
  content: string; // HTML raw
}

export interface TextBlockData {
  title?: string;
  content: string; // Testo semplice o Markdown
}

// 5. FOOTER
export interface FooterBlockData {
  copyrightText?: string;
  showSocials?: boolean;
  showLogo?: boolean;
  links?: MenuItem[]; // Link rapidi nel footer (Privacy, Cookie, ecc.)
}

// =========================================================
// 🔌 SEZIONE 5: UTILITY API (ESISTENTE)
// =========================================================

export interface ApiResponse<T> {
  data: T;
  timestamp: string;
  error?: string; // Utile per gestire errori in modo strutturato
}