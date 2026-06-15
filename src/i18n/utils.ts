// src/i18n/utils.ts
// Helper i18n: deteksi bahasa, translator UI, dan util path bahasa.
import { UI, type Lang, type UIKey } from './ui';

export const LANGS: Lang[] = ['id', 'en'];
export const DEFAULT_LANG: Lang = 'id';

/** Normalisasi Astro.currentLocale → 'id' | 'en' (default 'id'). */
export function getLang(currentLocale: string | undefined): Lang {
  return currentLocale === 'en' ? 'en' : 'id';
}

/** Translator string UI; fallback ke ID bila key kosong di EN. */
export function useT(lang: Lang) {
  return (key: UIKey): string => UI[lang][key] ?? UI.id[key];
}

/**
 * Buang prefix /en dari pathname → path "netral" (versi ID).
 * Dipakai untuk hreflang & language switcher agar tetap di halaman yang sama.
 * '/en/layanan/sewa-akun' → '/layanan/sewa-akun'; '/en' → '/'; '/' → '/'.
 */
export function stripLocale(pathname: string): string {
  const stripped = pathname.replace(/^\/en(?=\/|$)/, '');
  return stripped === '' ? '/' : stripped;
}

export { type Lang, type UIKey };
