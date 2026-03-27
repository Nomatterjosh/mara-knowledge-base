import { useState } from 'react'
import { Search, CheckCircle, Circle, ChevronRight, X, ExternalLink } from 'lucide-react'
import type { StudyState } from '../App'
import { topicsData, CATEGORIES, DIFFICULTY, type Topic, type Section } from '../data/topics'
import { useLanguage } from '../context/LanguageContext'
import { isBilingual, getText, type BilingualText } from '../utils/bilingual'

interface TopicsPageProps {
  studyState: StudyState
  onMarkComplete: (topicId: string) => void
}

export default function TopicsPage({ studyState, onMarkComplete }: TopicsPageProps) {
  const [search, setSearch] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all')
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null)
  const { language } = useLanguage()

  const filtered = topicsData.filter(t => {
    const matchSearch = !search || 
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
    const matchCat = filterCategory === 'all' || t.category === filterCategory
    const matchDiff = filterDifficulty === 'all' || t.difficulty === filterDifficulty
    return matchSearch && matchCat && matchDiff
  })

  if (selectedTopic) {
    return <TopicDetail topic={selectedTopic} studyState={studyState} onMarkComplete={onMarkComplete} onBack={() => setSelectedTopic(null)} />
  }

  return (
    <div className="pb-24 fade-in">
      {/* Header */}
      <div className="sticky top-0 bg-gray-50/95 dark:bg-gray-900/95 backdrop-blur-sm z-10 px-4 pt-6 pb-3">
        <h1 className="section-title">知识点库</h1>
        <p className="section-subtitle dark:text-gray-400">{topicsData.length}个考点 · 按类别系统梳理</p>

        {/* Search */}
        <div className="relative mb-3">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="搜索考点、法条、关键词..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 dark:focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X size={14} className="text-gray-400" />
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <FilterChip active={filterCategory === 'all'} onClick={() => setFilterCategory('all')}>全部</FilterChip>
          {Object.entries(CATEGORIES).map(([key, val]) => (
            <FilterChip key={key} active={filterCategory === key} onClick={() => setFilterCategory(key)}>
              {val.icon} {val.label}
            </FilterChip>
          ))}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 mt-2 scrollbar-hide">
          <FilterChip active={filterDifficulty === 'all'} onClick={() => setFilterDifficulty('all')}>所有难度</FilterChip>
          <FilterChip active={filterDifficulty === 'essential'} onClick={() => setFilterDifficulty('essential')}>🔴 必考</FilterChip>
          <FilterChip active={filterDifficulty === 'important'} onClick={() => setFilterDifficulty('important')}>🟡 重要</FilterChip>
          <FilterChip active={filterDifficulty === 'advanced'} onClick={() => setFilterDifficulty('advanced')}>🔵 进阶</FilterChip>
        </div>
      </div>

      {/* Results */}
      <div className="px-4 mt-2">
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">找到 {filtered.length} 个考点</p>
        <div className="space-y-2">
          {filtered.map(topic => {
            const completed = studyState.completedTopics.includes(topic.id)
            const cat = CATEGORIES[topic.category]
            const diff = DIFFICULTY[topic.difficulty]
            return (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                className="card w-full text-left p-4 hover:border-primary-200 dark:hover:border-primary-700"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 ${cat.color}`}>
                    {cat.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-snug">
                        {isBilingual(topic.title) ? getText(topic.title, language) : topic.title}
                      </h3>
                      {completed ? (
                        <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                      ) : (
                        <Circle size={18} className="text-gray-300 dark:text-gray-600 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                      {isBilingual(topic.subtitle) ? getText(topic.subtitle, language) : topic.subtitle}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`badge ${diff.color}`}>{diff.label}</span>
                      <span className={`badge ${cat.color}`}>{cat.label}</span>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-gray-300 dark:text-gray-600 flex-shrink-0 mt-1" />
                </div>
              </button>
            )
          })}

          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400 dark:text-gray-500">
              <Search size={32} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">没有找到匹配的考点</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Topic Detail ──────────────────────────────────────────────────

function TopicDetail({ topic, studyState, onMarkComplete, onBack }: {
  topic: Topic
  studyState: StudyState
  onMarkComplete: (id: string) => void
  onBack: () => void
}) {
  const { language } = useLanguage()
  const completed = studyState.completedTopics.includes(topic.id)
  const cat = CATEGORIES[topic.category]
  const diff = DIFFICULTY[topic.difficulty]

  return (
    <div className="pb-24 fade-in">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm z-10 border-b border-gray-100 dark:border-gray-700">
        <div className="px-4 py-3 flex items-center gap-3">
          <button onClick={onBack} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <ChevronRight size={20} className="text-gray-600 dark:text-gray-400 rotate-180" />
          </button>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
              {isBilingual(topic.title) ? getText(topic.title, language) : topic.title}
            </h2>
          </div>
          <button
            onClick={() => onMarkComplete(topic.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              completed
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50'
                : 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-900/50'
            }`}
          >
            {completed ? <><CheckCircle size={14} /> 已完成</> : <><Circle size={14} /> 标记完成</>}
          </button>
        </div>
      </div>

      <div className="px-4 pt-4">
        {/* Meta */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`badge ${diff.color}`}>{diff.label}</span>
          <span className={`badge ${cat.color}`}>{cat.icon} {cat.label}</span>
          {topic.tags.slice(0, 4).map(tag => (
            <span key={tag} className="badge bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">{tag}</span>
          ))}
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 italic">
          {isBilingual(topic.subtitle) ? getText(topic.subtitle, language) : topic.subtitle}
        </p>

        {/* Content Sections */}
        <div className="space-y-5">
          {topic.content.map((section, idx) => (
            <SectionRenderer key={idx} section={section} language={language} />
          ))}
        </div>

        {/* External Links */}
        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
          <p className="text-xs text-gray-400 dark:text-gray-500 font-medium mb-2">相关资源</p>
          <div className="space-y-1.5">
            {[
              { label: 'Migration Act 1958 (AustLII)', url: 'https://www.austlii.edu.au/cgi-bin/viewdb/au/legis/cth/consol_act/ma1958118/' },
              { label: 'Migration Regulations 1994 (AustLII)', url: 'https://classic.austlii.edu.au/au/legis/cth/consol_reg/mr1994227/' },
              { label: 'MARA Official Website', url: 'https://www.mara.gov.au' },
            ].map(link => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 py-1"
              >
                <ExternalLink size={12} />
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function SectionRenderer({ section, language }: { section: Section; language: 'en' | 'zh' }) {
  const getCellText = (cell: BilingualText) => isBilingual(cell) ? getText(cell, language) : cell

  return (
    <div>
      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-2 pb-1 border-b border-gray-100 dark:border-gray-700">
        {getCellText(section.heading)}
      </h3>
      {section.type === 'table' && section.headers && section.rows && (
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                {section.headers.map((h, i) => (
                  <th key={i} className="px-3 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    {getCellText(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50/50 dark:bg-gray-800/50'}>
                  {row.map((cell, j) => (
                    <td key={j} className="px-3 py-2 text-gray-700 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700">
                      {getCellText(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {section.type === 'list' && section.items && (
        <ul className="space-y-2">
          {section.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
              <span className="w-5 h-5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 flex items-center justify-center text-xs flex-shrink-0 mt-0.5 font-semibold">
                {i + 1}
              </span>
              {getCellText(item)}
            </li>
          ))}
        </ul>
      )}
      {(section.type === 'text' || !section.type) && (
        <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
          {getCellText(section.body)}
        </div>
      )}
      {section.type === 'warning' && (
        <div className="text-sm text-amber-800 dark:text-amber-300 leading-relaxed bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 border border-amber-200 dark:border-amber-800">
          ⚠️ {getCellText(section.body)}
        </div>
      )}
      {section.type === 'tip' && (
        <div className="text-sm text-green-800 dark:text-green-300 leading-relaxed bg-green-50 dark:bg-green-900/20 rounded-xl p-3 border border-green-200 dark:border-green-800">
          💡 {section.body}
        </div>
      )}
    </div>
  )
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
        active
          ? 'bg-primary-600 text-white shadow-sm dark:bg-primary-500'
          : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
      }`}
    >
      {children}
    </button>
  )
}
