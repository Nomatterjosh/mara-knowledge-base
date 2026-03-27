import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react'

type Language = 'en' | 'zh'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  isEnglish: boolean
  isChinese: boolean
  t: (bilingual: { en: string; zh: string }) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const STORAGE_KEY = 'mara_language'

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'en' || stored === 'zh') return stored
    } catch {
      // ignore
    }
    return 'en' // 默认英文
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language)
    } catch {
      // ignore
    }
  }, [language])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
  }, [])

  const toggleLanguage = useCallback(() => {
    setLanguageState(prev => prev === 'en' ? 'zh' : 'en')
  }, [])

  // Translation helper: given a bilingual object, returns the current language text
  const t = useCallback((bilingual: { en: string; zh: string }) => {
    return language === 'en' ? bilingual.en : bilingual.zh
  }, [language])

  const value: LanguageContextType = {
    language,
    setLanguage,
    toggleLanguage,
    isEnglish: language === 'en',
    isChinese: language === 'zh',
    t,
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

// Bilingual text helper - creates a bilingual object
export function bilingual(en: string, zh: string): { en: string; zh: string } {
  return { en, zh }
}

// Language toggle button component
interface LanguageToggleProps {
  className?: string
  showLabel?: boolean
}

export function LanguageToggle({ className = '', showLabel = false }: LanguageToggleProps) {
  const { language, toggleLanguage, isEnglish } = useLanguage()

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 ${className}`}
      title="Toggle language / 切换语言"
      aria-label={isEnglish ? 'Switch to Chinese' : '切换到英文'}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
      {showLabel ? (
        <span>{isEnglish ? 'EN' : '中'}</span>
      ) : (
        <span className="text-xs">{isEnglish ? 'EN' : '中'}</span>
      )}
    </button>
  )
}
