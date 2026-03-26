import { useState, useEffect, useRef } from 'react'
import { Search, X, FileText, BookOpen, Scale, ArrowRight } from 'lucide-react'
import { questionsData } from '../data/questions'
import { topicsData } from '../data/topics'
import type { Tab } from '../App'

interface SearchResult {
  type: 'question' | 'topic' | 'legal'
  id: string
  title: string
  excerpt: string
  url: string
}

interface GlobalSearchProps {
  isOpen: boolean
  onClose: () => void
  onNavigate: (tab: Tab, params?: Record<string, string>) => void
}

export default function GlobalSearch({ isOpen, onClose, onNavigate }: GlobalSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setSelectedIndex(0)
      return
    }

    const q = query.toLowerCase()
    const matches: SearchResult[] = []

    // 搜索题目
    questionsData.forEach(q_data => {
      const questionText = q_data.question.toLowerCase()
      const explanationText = q_data.explanation.toLowerCase()
      const tagsText = q_data.tags.join(' ').toLowerCase()
      const referenceText = q_data.reference.toLowerCase()

      if (questionText.includes(q) || explanationText.includes(q) || tagsText.includes(q) || referenceText.includes(q)) {
        matches.push({
          type: 'question',
          id: q_data.id,
          title: q_data.question.slice(0, 80) + (q_data.question.length > 80 ? '...' : ''),
          excerpt: q_data.explanation.slice(0, 100) + '...',
          url: `/quiz?q=${q_data.id}`,
        })
      }
    })

    // 搜索知识点
    topicsData.forEach(t => {
      const titleText = t.title.toLowerCase()
      const descText = t.description.toLowerCase()

      if (titleText.includes(q) || descText.includes(q)) {
        matches.push({
          type: 'topic',
          id: t.id,
          title: t.title,
          excerpt: t.description.slice(0, 100) + '...',
          url: `/topics?t=${t.id}`,
        })
      }
    })

    // 简单法条搜索（可以扩展）
    if (q.length >= 3) {
      matches.push({
        type: 'legal',
        id: 'legal',
        title: `搜索法条: ${query}`,
        excerpt: '在法条库中搜索相关法律条款',
        url: `/legal?q=${encodeURIComponent(query)}`,
      })
    }

    setResults(matches.slice(0, 10))
    setSelectedIndex(0)
  }, [query])

  useEffect(() => {
    // 滚动选中的结果到视野内
    if (resultsRef.current && results.length > 0) {
      const selected = resultsRef.current.children[selectedIndex] as HTMLElement
      if (selected) {
        selected.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [selectedIndex, results])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(i => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && results.length > 0) {
      e.preventDefault()
      handleSelect(results[selectedIndex])
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    }
  }

  const handleSelect = (result: SearchResult) => {
    if (result.type === 'question') {
      onNavigate('quiz', { highlight: result.id })
    } else if (result.type === 'topic') {
      onNavigate('topics', { highlight: result.id })
    } else {
      onNavigate('legal', { q: query })
    }
    onClose()
    setQuery('')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100">
          <Search size={20} className="text-gray-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="搜索题目、知识点、法条..."
            className="flex-1 text-lg outline-none placeholder:text-gray-400"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 hover:bg-gray-100 rounded-full">
              <X size={16} className="text-gray-400" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs text-gray-400 bg-gray-100 rounded">ESC</kbd>
        </div>

        {/* Results */}
        {query && (
          <div ref={resultsRef} className="max-h-[50vh] overflow-y-auto">
            {results.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500">
                <p className="text-sm">未找到相关结果</p>
                <p className="text-xs mt-1">尝试其他关键词</p>
              </div>
            ) : (
              results.map((result, idx) => (
                <button
                  key={`${result.type}-${result.id}`}
                  onClick={() => handleSelect(result)}
                  className={`w-full px-4 py-3 flex items-start gap-3 text-left transition-colors ${
                    idx === selectedIndex ? 'bg-primary-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className={`mt-0.5 p-1.5 rounded-lg flex-shrink-0 ${
                    result.type === 'question' ? 'bg-blue-100 text-blue-600' :
                    result.type === 'topic' ? 'bg-green-100 text-green-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {result.type === 'question' ? <FileText size={14} /> :
                     result.type === 'topic' ? <BookOpen size={14} /> :
                     <Scale size={14} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{result.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5 line-clamp-1">{result.excerpt}</div>
                  </div>
                  <ArrowRight size={14} className={`mt-1 flex-shrink-0 ${idx === selectedIndex ? 'text-primary-500' : 'text-gray-300'}`} />
                </button>
              ))
            )}
          </div>
        )}

        {/* Footer */}
        {!query && (
          <div className="px-4 py-3 text-xs text-gray-400 flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-gray-100 rounded">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-gray-100 rounded">↓</kbd>
              导航
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-gray-100 rounded">Enter</kbd>
              选择
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

// 搜索触发按钮
interface SearchButtonProps {
  onClick: () => void
}

export function SearchButton({ onClick }: SearchButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
    >
      <Search size={14} />
      <span className="hidden sm:inline">搜索</span>
      <kbd className="hidden sm:inline px-1.5 py-0.5 text-xs bg-gray-200 rounded">/</kbd>
    </button>
  )
}
