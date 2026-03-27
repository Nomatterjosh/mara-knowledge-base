// Bilingual text utilities
// Supports both old format (plain string) and new bilingual format { en: string; zh: string }

export type BilingualText = string | { en: string; zh: string }

export function isBilingual(text: BilingualText): text is { en: string; zh: string } {
  return typeof text === 'object' && 'en' in text && 'zh' in text
}

/**
 * Get text based on current language
 * @param text - bilingual object or plain string
 * @param lang - 'en' or 'zh'
 */
export function getText(text: BilingualText, lang: 'en' | 'zh'): string {
  if (isBilingual(text)) {
    return text[lang] || text.en // fallback to English
  }
  return text
}

/**
 * Create a bilingual object
 */
export function b(en: string, zh: string): { en: string; zh: string } {
  return { en, zh }
}

/**
 * Convert text to bilingual object if it's a plain string
 * Useful for gradual migration
 */
export function toBilingual(text: string, lang: 'en' | 'zh' = 'zh'): { en: string; zh: string } {
  // If text contains significant Chinese, treat current language as zh
  // Otherwise default to en
  const containsChinese = /[\u4e00-\u9fa5]/.test(text)
  if (lang === 'zh' && containsChinese) {
    return { en: text, zh: text }
  }
  return { en: text, zh: '' }
}
