import { useLanguage } from '../context/LanguageContext'
import type { BilingualText } from '../utils/bilingual'
import { isBilingual, getText } from '../utils/bilingual'

interface BilingualTextProps {
  text: BilingualText
  className?: string
  showOriginal?: boolean
}

export function BilingualTextComponent({ text, className = '', showOriginal = false }: BilingualTextProps) {
  const { language, isEnglish } = useLanguage()

  if (!isBilingual(text)) {
    // Plain string - return as is
    return <span className={className}>{text}</span>
  }

  const currentText = getText(text, language)
  const originalText = isEnglish ? text.zh : text.en

  if (showOriginal && originalText && originalText !== currentText) {
    return (
      <div className={className}>
        <div className={language === 'en' ? 'text-gray-900 dark:text-white' : 'text-gray-900 dark:text-white'}>
          {currentText}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 italic">
          {language === 'en' ? '中文：' : 'EN: '}{originalText}
        </div>
      </div>
    )
  }

  return <span className={className}>{currentText}</span>
}

// For content blocks with longer text
interface BilingualContentProps {
  content: BilingualText
  className?: string
  [prop: string]: any
}

export function BilingualContent({ content, className = '', ...props }: BilingualContentProps) {
  const { language } = useLanguage()

  if (!isBilingual(content)) {
    return <div className={className} {...props}>{content}</div>
  }

  return (
    <div className={className} {...props}>
      {language === 'en' ? (
        <>
          <div className="text-gray-900 dark:text-white">{content.en}</div>
          {content.zh && (
            <div className="mt-3 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-3">
              <div className="font-medium mb-1">中文翻译：</div>
              <div className="leading-relaxed">{content.zh}</div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="text-gray-900 dark:text-white">{content.zh || content.en}</div>
          {content.en && content.en !== content.zh && (
            <div className="mt-3 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-3 italic">
              <div className="font-medium mb-1">Original (English):</div>
              <div className="leading-relaxed">{content.en}</div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

// Simple bilingual badge showing current language
export function BilingualBadge({ className = '' }: { className?: string }) {
  const { isEnglish } = useLanguage()

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${className}`}>
      {isEnglish ? 'EN' : '中'}
    </span>
  )
}
