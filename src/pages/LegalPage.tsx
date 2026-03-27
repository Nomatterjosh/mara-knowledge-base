import { useState, useMemo } from 'react'
import { Search, ExternalLink, X, ChevronRight, BookOpen, Scale, FileText, Gavel, Award, Star } from 'lucide-react'
import { legalData, legalCategories, highImportanceItems, type LegalItem } from '../data/legal'
import { useLanguage } from '../context/LanguageContext'
import { isBilingual, getText, BilingualContent } from '../components/BilingualText'
import type { BilingualText } from '../utils/bilingual'

const typeInfo: Record<string, { label: string; color: string; darkColor: string; icon: typeof BookOpen }> = {
  act: { label: 'Migration Act', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300', darkColor: 'dark:bg-purple-900/30 dark:text-purple-300', icon: Scale },
  regulations: { label: 'Regulations', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300', darkColor: 'dark:bg-blue-900/30 dark:text-blue-300', icon: FileText },
  schedule: { label: 'Schedule', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300', darkColor: 'dark:bg-green-900/30 dark:text-green-300', icon: FileText },
  code: { label: 'Code of Conduct', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300', darkColor: 'dark:bg-orange-900/30 dark:text-orange-300', icon: Award },
  case: { label: '判例', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300', darkColor: 'dark:bg-red-900/30 dark:text-red-300', icon: Gavel },
}

export default function LegalPage() {
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [filterImportance, setFilterImportance] = useState<string>('all')
  const [selected, setSelected] = useState<LegalItem | null>(null)
  const [showHighImportance, setShowHighImportance] = useState(false)
  const { language } = useLanguage()

  // Helper to get searchable text from a bilingual field
  const getSearchableText = (field: BilingualText): string => {
    if (isBilingual(field)) {
      return `${field.en} ${field.zh}`.toLowerCase()
    }
    return String(field).toLowerCase()
  }

  const filtered = useMemo(() => {
    let items = legalData

    if (showHighImportance) {
      items = highImportanceItems
    }

    return items.filter(item => {
      const q = search.toLowerCase()
      const matchSearch = !q ||
        item.section.toLowerCase().includes(q) ||
        getSearchableText(item.title).includes(q) ||
        getSearchableText(item.summary).includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q))
      const matchType = filterType === 'all' || item.type === filterType
      const matchImportance = filterImportance === 'all' || item.importance === filterImportance
      return matchSearch && matchType && matchImportance
    })
  }, [search, filterType, filterImportance, showHighImportance])

  const stats = useMemo(() => ({
    total: legalData.length,
    act: legalData.filter(i => i.type === 'act').length,
    regulations: legalData.filter(i => i.type === 'regulations').length,
    schedule: legalData.filter(i => i.type === 'schedule').length,
    code: legalData.filter(i => i.type === 'code').length,
    caseType: legalData.filter(i => i.type === 'case').length,
    highImportance: legalData.filter(i => i.importance === 'high').length,
  }), [])

  if (selected) {
    const TypeIcon = typeInfo[selected.type].icon
    return (
      <div className="pb-24 fade-in">
        <div className="sticky top-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm z-10 border-b border-gray-100 dark:border-gray-700">
          <div className="px-4 py-3 flex items-center gap-3">
            <button onClick={() => setSelected(null)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
              <ChevronRight size={20} className="text-gray-600 dark:text-gray-400 rotate-180" />
            </button>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 dark:text-gray-400">{selected.section}</p>
              <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                {isBilingual(selected.title) ? getText(selected.title, language) : selected.title}
              </h2>
            </div>
            {selected.url && (
              <a href={selected.url} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <ExternalLink size={16} className="text-primary-600 dark:text-primary-400" />
              </a>
            )}
          </div>
        </div>
        <div className="px-4 pt-4">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`badge ${typeInfo[selected.type].color} flex items-center gap-1`}>
              <TypeIcon size={12} />
              {typeInfo[selected.type].label}
            </span>
            {selected.importance === 'high' && (
              <span className="badge bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 flex items-center gap-1">
                <Star size={12} className="fill-red-500" />
                {language === 'en' ? 'High Freq Exam' : '高频考点'}
              </span>
            )}
            {selected.tags.map(t => <span key={t} className="badge bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">{t}</span>)}
          </div>

          <div className="card p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800 mb-4">
            <div className="flex items-start gap-2">
              <Star size={16} className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-900 dark:text-amber-200 font-medium">
                {isBilingual(selected.summary) ? getText(selected.summary, language) : selected.summary}
              </p>
            </div>
          </div>

          <div className="card p-4 bg-gray-50 dark:bg-gray-800 mb-4">
            <BilingualContent
              content={selected.content}
              className="whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200 leading-relaxed font-mono bg-white dark:bg-gray-900 p-3 rounded-xl border border-gray-200 dark:border-gray-700"
            />
          </div>

          {selected.examNotes && (
            <div className="card p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 mb-4">
              <p className="text-xs font-semibold text-blue-900 dark:text-blue-300 mb-2">
                {language === 'en' ? 'Exam Notes' : '考试提示'}
              </p>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                {isBilingual(selected.examNotes) ? getText(selected.examNotes, language) : selected.examNotes}
              </p>
            </div>
          )}

          <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">外部法律数据库</p>
            {[
              { label: 'Migration Act 1958 (AustLII)', url: 'https://www.austlii.edu.au/cgi-bin/viewdb/au/legis/cth/consol_act/ma1958118/' },
              { label: 'Migration Regulations 1994 (AustLII)', url: 'https://classic.austlii.edu.au/au/legis/cth/consol_reg/mr1994227/' },
              { label: 'Federal Register of Legislation', url: 'https://www.legislation.gov.au' },
            ].map(l => (
              <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 py-1.5">
                <ExternalLink size={12} />{l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-24 fade-in">
      <div className="sticky top-0 bg-gray-50/95 dark:bg-gray-900/95 backdrop-blur-sm z-10 px-4 pt-6 pb-3">
        <h1 className="section-title">法条库</h1>
        <p className="section-subtitle dark:text-gray-400">Migration Act · Regulations · Schedule · Code of Conduct · 判例</p>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-2 text-center border border-gray-200 dark:border-gray-700">
            <p className="text-lg font-bold text-purple-600 dark:text-purple-400">{stats.act}</p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">Act条款</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-2 text-center border border-gray-200 dark:border-gray-700">
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{stats.regulations + stats.schedule}</p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">Regulations</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-2 text-center border border-gray-200 dark:border-gray-700">
            <p className="text-lg font-bold text-orange-600 dark:text-orange-400">{stats.code}</p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">Code</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-2 text-center border border-gray-200 dark:border-gray-700">
            <p className="text-lg font-bold text-red-600 dark:text-red-400">{stats.caseType}</p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">判例</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="搜索条款、关键词..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-9 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 dark:focus:ring-primary-500 text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
          />
          {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2"><X size={14} className="text-gray-400" /></button>}
        </div>

        {/* Type Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-2">
          {legalCategories.map(({ key, label }) => (
            <button key={key} onClick={() => setFilterType(key)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${filterType === key ? 'bg-primary-600 text-white dark:bg-primary-500' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'}`}>
              {label}
            </button>
          ))}
        </div>

        {/* Importance Filter */}
        <div className="flex gap-2">
          <button
            onClick={() => setShowHighImportance(!showHighImportance)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${showHighImportance ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border border-red-300 dark:border-red-800' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'}`}
          >
            <Star size={12} className={showHighImportance ? 'fill-red-500' : ''} />
            仅看高频考点
          </button>
          <button
            onClick={() => setFilterImportance(filterImportance === 'high' ? 'all' : 'high')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${filterImportance === 'high' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-300 dark:border-amber-800' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'}`}
          >
            <Award size={12} />
            重要度筛选
          </button>
        </div>
      </div>

      <div className="px-4 mt-2">
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
          找到 {filtered.length} 条法律条款
          {showHighImportance && ' (仅高频考点)'}
        </p>

        <div className="space-y-2">
          {filtered.map(item => {
            const TypeIcon = typeInfo[item.type].icon
            return (
              <button key={item.id} onClick={() => setSelected(item)} className="card w-full text-left p-4 hover:border-primary-200 dark:hover:border-primary-700 transition-all">
                <div className="flex items-start gap-3">
                  <div className={`px-2 py-1 rounded-lg text-xs font-bold flex-shrink-0 flex items-center gap-1 ${typeInfo[item.type].color}`}>
                    <TypeIcon size={10} />
                    {item.section}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {isBilingual(item.title) ? getText(item.title, language) : item.title}
                      </p>
                      {item.importance === 'high' && (
                        <Star size={12} className="text-red-500 fill-red-500 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                      {isBilingual(item.summary) ? getText(item.summary, language) : item.summary}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-gray-300 dark:text-gray-600 flex-shrink-0 mt-1" />
                </div>
              </button>
            )
          })}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400 dark:text-gray-500">
              <Search size={32} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">没有找到匹配的条款</p>
            </div>
          )}
        </div>

        {/* High Importance Quick Access */}
        {!showHighImportance && !search && filterType === 'all' && (
          <div className="mt-6 card p-4 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-red-200 dark:border-red-800">
            <div className="flex items-center gap-2 mb-3">
              <Star size={16} className="text-red-600 dark:text-red-400 fill-red-500" />
              <p className="text-sm font-semibold text-red-900 dark:text-red-300">MARA考试高频考点</p>
            </div>
            <div className="space-y-2">
              {highImportanceItems.slice(0, 5).map(item => (
                <button
                  key={item.id}
                  onClick={() => setSelected(item)}
                  className="w-full text-left p-2 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-all"
                >
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${typeInfo[item.type].color}`}>
                      {item.section}
                    </span>
                    <span className="text-xs text-gray-700 dark:text-gray-300 truncate">
                      {isBilingual(item.title) ? getText(item.title, language) : item.title}
                    </span>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowHighImportance(true)}
              className="w-full mt-3 text-xs text-red-700 dark:text-red-400 font-medium py-2 hover:underline"
            >
              查看全部 {stats.highImportance} 个高频考点 →
            </button>
          </div>
        )}

        {/* External Resources */}
        <div className="mt-6 card p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <p className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-3">📚 官方法律数据库</p>
          {[
            { label: 'Migration Act 1958 全文 (AustLII)', url: 'https://www.austlii.edu.au/cgi-bin/viewdb/au/legis/cth/consol_act/ma1958118/' },
            { label: 'Migration Regulations 1994 全文', url: 'https://classic.austlii.edu.au/au/legis/cth/consol_reg/mr1994227/' },
            { label: 'Federal Register of Legislation', url: 'https://www.legislation.gov.au' },
            { label: 'MARA Official Website', url: 'https://www.mara.gov.au' },
            { label: 'LTA Capstone Information', url: 'https://legaltrainingaustralia.com/capstone/' },
          ].map(l => (
            <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-blue-700 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300 py-1.5 border-b border-blue-100 dark:border-blue-800 last:border-0">
              <ExternalLink size={12} className="flex-shrink-0" />{l.label}
            </a>
          ))}
        </div>

        {/* Knowledge Base Info */}
        <div className="mt-4 card p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">📖 本地知识库</p>
          <p className="text-xs text-gray-600 dark:text-gray-300">
            完整知识库文件位于项目根目录 <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">knowledge_base/</code> 文件夹：
          </p>
          <ul className="text-xs text-gray-600 dark:text-gray-400 mt-1 space-y-0.5">
            <li>• migration_act.json - Migration Act 核心条款</li>
            <li>• migration_regulations.json - Migration Regulations 核心附例</li>
            <li>• code_of_conduct.json - Code of Conduct 核心义务</li>
            <li>• case_law.json - 重要判例汇编</li>
            <li>• knowledge_base.md - 完整 Markdown 文档</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
