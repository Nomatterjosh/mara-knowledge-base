import { useState, useMemo } from 'react'
import { Search, ExternalLink, X, ChevronRight, BookOpen, Scale, FileText, Gavel, Award, Star } from 'lucide-react'
import { legalData, legalCategories, highImportanceItems, type LegalItem } from '../data/legal'

const typeInfo: Record<string, { label: string; color: string; icon: typeof BookOpen }> = {
  act: { label: 'Migration Act', color: 'bg-purple-100 text-purple-800', icon: Scale },
  regulations: { label: 'Regulations', color: 'bg-blue-100 text-blue-800', icon: FileText },
  schedule: { label: 'Schedule', color: 'bg-green-100 text-green-800', icon: FileText },
  code: { label: 'Code of Conduct', color: 'bg-orange-100 text-orange-800', icon: Award },
  case: { label: '判例', color: 'bg-red-100 text-red-800', icon: Gavel },
}

export default function LegalPage() {
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [filterImportance, setFilterImportance] = useState<string>('all')
  const [selected, setSelected] = useState<LegalItem | null>(null)
  const [showHighImportance, setShowHighImportance] = useState(false)

  const filtered = useMemo(() => {
    let items = legalData

    if (showHighImportance) {
      items = highImportanceItems
    }

    return items.filter(item => {
      const q = search.toLowerCase()
      const matchSearch = !q ||
        item.section.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
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
    case: legalData.filter(i => i.type === 'case').length,
    highImportance: legalData.filter(i => i.importance === 'high').length,
  }), [])

  if (selected) {
    const TypeIcon = typeInfo[selected.type].icon
    return (
      <div className="pb-24 fade-in">
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 border-b border-gray-100">
          <div className="px-4 py-3 flex items-center gap-3">
            <button onClick={() => setSelected(null)} className="p-1.5 rounded-lg hover:bg-gray-100">
              <ChevronRight size={20} className="text-gray-600 rotate-180" />
            </button>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500">{selected.section}</p>
              <h2 className="text-sm font-semibold text-gray-900 truncate">{selected.title}</h2>
            </div>
            {selected.url && (
              <a href={selected.url} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg hover:bg-gray-100">
                <ExternalLink size={16} className="text-primary-600" />
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
              <span className="badge bg-red-100 text-red-700 flex items-center gap-1">
                <Star size={12} className="fill-red-500" />
                高频考点
              </span>
            )}
            {selected.tags.map(t => <span key={t} className="badge bg-gray-100 text-gray-600">{t}</span>)}
          </div>

          <div className="card p-4 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 mb-4">
            <div className="flex items-start gap-2">
              <Star size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-900 font-medium">{selected.summary}</p>
            </div>
          </div>

          <div className="card p-4 bg-gray-50 mb-4">
            <div className="whitespace-pre-wrap text-sm text-gray-800 leading-relaxed font-mono bg-white p-3 rounded-xl border border-gray-200">
              {selected.content}
            </div>
          </div>

          {selected.examNotes && (
            <div className="card p-4 bg-blue-50 border-blue-200 mb-4">
              <p className="text-xs font-semibold text-blue-900 mb-2">📝 考试提示</p>
              <p className="text-sm text-blue-800">{selected.examNotes}</p>
            </div>
          )}

          <div className="pt-2 border-t border-gray-100">
            <p className="text-xs text-gray-400 mb-2">外部法律数据库</p>
            {[
              { label: 'Migration Act 1958 (AustLII)', url: 'https://www.austlii.edu.au/cgi-bin/viewdb/au/legis/cth/consol_act/ma1958118/' },
              { label: 'Migration Regulations 1994 (AustLII)', url: 'https://classic.austlii.edu.au/au/legis/cth/consol_reg/mr1994227/' },
              { label: 'Federal Register of Legislation', url: 'https://www.legislation.gov.au' },
            ].map(l => (
              <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-primary-600 hover:text-primary-800 py-1.5">
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
      <div className="sticky top-0 bg-gray-50/95 backdrop-blur-sm z-10 px-4 pt-6 pb-3">
        <h1 className="section-title">法条库</h1>
        <p className="section-subtitle">Migration Act · Regulations · Schedule · Code of Conduct · 判例</p>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          <div className="bg-white rounded-lg p-2 text-center border border-gray-200">
            <p className="text-lg font-bold text-purple-600">{stats.act}</p>
            <p className="text-[10px] text-gray-500">Act条款</p>
          </div>
          <div className="bg-white rounded-lg p-2 text-center border border-gray-200">
            <p className="text-lg font-bold text-blue-600">{stats.regulations + stats.schedule}</p>
            <p className="text-[10px] text-gray-500">Regulations</p>
          </div>
          <div className="bg-white rounded-lg p-2 text-center border border-gray-200">
            <p className="text-lg font-bold text-orange-600">{stats.code}</p>
            <p className="text-[10px] text-gray-500">Code</p>
          </div>
          <div className="bg-white rounded-lg p-2 text-center border border-gray-200">
            <p className="text-lg font-bold text-red-600">{stats.case}</p>
            <p className="text-[10px] text-gray-500">判例</p>
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
            className="w-full pl-9 pr-9 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
          />
          {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2"><X size={14} className="text-gray-400" /></button>}
        </div>

        {/* Type Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-2">
          {legalCategories.map(([key, label]) => (
            <button key={key} onClick={() => setFilterType(key)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${filterType === key ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}>
              {label}
            </button>
          ))}
        </div>

        {/* Importance Filter */}
        <div className="flex gap-2">
          <button
            onClick={() => setShowHighImportance(!showHighImportance)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${showHighImportance ? 'bg-red-100 text-red-700 border border-red-300' : 'bg-white text-gray-600 border border-gray-200'}`}
          >
            <Star size={12} className={showHighImportance ? 'fill-red-500' : ''} />
            仅看高频考点
          </button>
          <button
            onClick={() => setFilterImportance(filterImportance === 'high' ? 'all' : 'high')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${filterImportance === 'high' ? 'bg-amber-100 text-amber-700 border border-amber-300' : 'bg-white text-gray-600 border border-gray-200'}`}
          >
            <Award size={12} />
            重要度筛选
          </button>
        </div>
      </div>

      <div className="px-4 mt-2">
        <p className="text-xs text-gray-400 mb-3">
          找到 {filtered.length} 条法律条款
          {showHighImportance && ' (仅高频考点)'}
        </p>

        <div className="space-y-2">
          {filtered.map(item => {
            const TypeIcon = typeInfo[item.type].icon
            return (
              <button key={item.id} onClick={() => setSelected(item)} className="card w-full text-left p-4 hover:border-primary-200 transition-all">
                <div className="flex items-start gap-3">
                  <div className={`px-2 py-1 rounded-lg text-xs font-bold flex-shrink-0 flex items-center gap-1 ${typeInfo[item.type].color}`}>
                    <TypeIcon size={10} />
                    {item.section}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                      {item.importance === 'high' && (
                        <Star size={12} className="text-red-500 fill-red-500 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{item.summary}</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-300 flex-shrink-0 mt-1" />
                </div>
              </button>
            )
          })}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Search size={32} className="mx-auto mb-2 opacity-30" />
              <p className="text-sm">没有找到匹配的条款</p>
            </div>
          )}
        </div>

        {/* High Importance Quick Access */}
        {!showHighImportance && !search && filterType === 'all' && (
          <div className="mt-6 card p-4 bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
            <div className="flex items-center gap-2 mb-3">
              <Star size={16} className="text-red-600 fill-red-500" />
              <p className="text-sm font-semibold text-red-900">MARA考试高频考点</p>
            </div>
            <div className="space-y-2">
              {highImportanceItems.slice(0, 5).map(item => (
                <button
                  key={item.id}
                  onClick={() => setSelected(item)}
                  className="w-full text-left p-2 bg-white/70 rounded-lg hover:bg-white transition-all"
                >
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${typeInfo[item.type].color}`}>
                      {item.section}
                    </span>
                    <span className="text-xs text-gray-700 truncate">{item.title}</span>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowHighImportance(true)}
              className="w-full mt-3 text-xs text-red-700 font-medium py-2 hover:underline"
            >
              查看全部 {stats.highImportance} 个高频考点 →
            </button>
          </div>
        )}

        {/* External Resources */}
        <div className="mt-6 card p-4 bg-blue-50 border border-blue-200">
          <p className="text-sm font-semibold text-blue-900 mb-3">📚 官方法律数据库</p>
          {[
            { label: 'Migration Act 1958 全文 (AustLII)', url: 'https://www.austlii.edu.au/cgi-bin/viewdb/au/legis/cth/consol_act/ma1958118/' },
            { label: 'Migration Regulations 1994 全文', url: 'https://classic.austlii.edu.au/au/legis/cth/consol_reg/mr1994227/' },
            { label: 'Federal Register of Legislation', url: 'https://www.legislation.gov.au' },
            { label: 'MARA Official Website', url: 'https://www.mara.gov.au' },
            { label: 'LTA Capstone Information', url: 'https://legaltrainingaustralia.com/capstone/' },
          ].map(l => (
            <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-blue-700 hover:text-blue-900 py-1.5 border-b border-blue-100 last:border-0">
              <ExternalLink size={12} className="flex-shrink-0" />{l.label}
            </a>
          ))}
        </div>

        {/* Knowledge Base Info */}
        <div className="mt-4 card p-4 bg-gray-50 border border-gray-200">
          <p className="text-xs text-gray-500 mb-2">📖 本地知识库</p>
          <p className="text-xs text-gray-600">
            完整知识库文件位于项目根目录 <code className="bg-gray-200 px-1 rounded">knowledge_base/</code> 文件夹：
          </p>
          <ul className="text-xs text-gray-600 mt-1 space-y-0.5">
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
