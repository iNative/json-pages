// --- FUNZIONI UTILITY (Legacy/Boilerplate) ---
export function sharedData(): string {
  return 'shared-data';
}

// =========================================================
// 🏗️ SEZIONE 1: CONFIGURAZIONE CORE & MENU
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
  children?: MenuItem[];
  target?: '_blank' | '_self';
}

// =========================================================
// 📄 SEZIONE 2: CONTENUTI SEMPLICI
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
  icon?: string;
}

// =========================================================
// 🚀 SEZIONE 3: NUOVA ONTOLOGIA "PAGE BUILDER"
// =========================================================

// 👇 UNICA DEFINIZIONE DI BLOCKTYPE
export type BlockType = 'header' | 'hero' | 'grid' | 'text' | 'html' | 'footer' | 'code'| 'ui-test';

export interface PageBlock<T = any> {
  id: string;
  type: BlockType;
  data: T;
  settings?: BlockSettings;
}

export interface BlockSettings {
  container?: 'fluid' | 'boxed';
  paddingTop?: string;
  paddingBottom?: string;
  backgroundColor?: string;
  cssClass?: string;
  hidden?: boolean;
}

export interface PageDefinition {
  id: string;
  slug: string;
  meta: PageMeta;
  blocks: PageBlock[];
}

export interface PageMeta {
  title: string;
  description?: string;
  keywords?: string[];
}

// =========================================================
// 🧩 SEZIONE 4: INTERFACCE DATI SPECIFICHE PER I BLOCCHI
// =========================================================

export interface HeaderBlockData {
  logoOverride?: string;
  menuSource: string;
  style?: 'transparent' | 'solid' | 'inverted';
  sticky?: boolean;
}

export interface HeroBlockData {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  align?: 'left' | 'center' | 'right';
  date?: string;
  category?: string;
  layout?: 'overlay' | 'split';
  logos?: SponsorLogo[];
}

export interface SponsorLogo {
  src: string;
  alt?: string;
  width?: string;
}

export interface GridBlockData {
  title?: string;
  sourceCollection: string;
  limit?: number;
  mode?: 'card' | 'list' | 'carousel';
  filterTags?: string[];
}

export interface HtmlBlockData {
  content: string;
}

export interface TextBlockData {
  title?: string;
  content: string;
}

export interface FooterBlockData {
  copyrightText?: string;
  showSocials?: boolean;
  showLogo?: boolean;
  links?: MenuItem[];
}

// 👇 INTERFACCIA CODE AGGIUNTA
export interface CodeBlockData {
  lines: CodeLine[];
}

export interface CodeLine {
  type: 'comment' | 'command';
  text: string;
}

// =========================================================
// 🔌 SEZIONE 5: UTILITY API
// =========================================================

export interface ApiResponse<T> {
  data: T;
  timestamp: string;
  error?: string;
}