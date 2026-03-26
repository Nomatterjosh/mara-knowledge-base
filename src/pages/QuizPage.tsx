import { useState } from 'react'
import {
  ChevronRight, CheckCircle, XCircle, BookOpen,
  RotateCcw, Filter, ChevronDown, ChevronUp, Lightbulb
} from 'lucide-react'
import type { StudyState } from '../App'
import { questionsData, type Question } from '../data/questions'

interface QuizPageProps {
  studyState: StudyState
  onRecordScore: (quizId: string, correct: number, total: number) => void
}

type Mode = 'list' | 'practice' | 'result'
type FilterType = 'all' | 'mcq' | 'short' | 'case'

export default function QuizPage({ studyState, onRecordScore }: QuizPageProps) {
  const [mode, setMode] = useState<Mode>('list')
  const [filterType, setFilterType] = useState<FilterType>('all')
  const [filterDiff, setFilterDiff] = useState<string>('all')
  const [currentSet, setCurrentSet] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [sessionAnswers, setSessionAnswers] = useState<Record<string, number | 'shown'>>({})
  const [showAnswer, setShowAnswer] = useState<Record<string, boolean>>({})
  const [sessionCorrect, setSessionCorrect] = useState(0)

  const filtered = questionsData.filter(q => {
    const matchType = filterType === 'all' || q.type === filterType
    const matchDiff = filterDiff === 'all' || q.difficulty === filterDiff
    return matchType && matchDiff
  })

  const mcqCount = filtered.filter(q => q.type === 'mcq').length
  const shortCount = filtered.filter(q => q.type === 'short').length
  const caseCount = filtered.filter(q => q.type === 'case').length

  const startQuiz = (questions: Question[]) => {
    setCurrentSet(questions)
    setCurrentIndex(0)
    setSessionAnswers({})
    setShowAnswer({})
    setSessionCorrect(0)
    setMode('practice')
  }

  const handleAnswer = (question: Question, optionIdx: number) => {
    if (sessionAnswers[question.id] !== undefined) return
    const correct = optionIdx === question.correctIndex
    setSessionAnswers(prev => ({ ...prev, [question.id]: optionIdx }))
    if (correct) setSessionCorrect(prev => prev + 1)
  }

  const handleShowAnswer = (qId: string) => {
    setShowAnswer(prev => ({ ...prev, [qId]: true }))
    if (sessionAnswers[qId] === undefined) {
      setSessionAnswers(prev => ({ ...prev, [qId]: 'shown' }))
    }
  }

  const handleNext = () => {
    if (currentIndex < currentSet.length - 1) {
      setCurrentIndex(i => i + 1)
    } else {
      const mcqs = currentSet.filter(q => q.type === 'mcq')
      onRecordScore(`session_${Date.now()}`, sessionCorrect, mcqs.length)
      setMode('result')
    }
  }

  if (mode === 'result') {
    const mcqs = currentSet.filter(q => q.type === 'mcq')
    const pct = mcqs.length > 0 ? Math.round((sessionCorrect / mcqs.length) * 100) : 0
    return (
      <div className="pb-24 px-4 pt-6 fade-in">
        <h1 className="section-title">练习完成！</h1>
        <div className="card p-6 text-center mb-5">
          <div className={`text-5xl font-bold mb-2 ${pct >= 65 ? 'text-green-600' : 'text-red-500'}`}>{pct}%</div>
          <p className="text-gray-500 text-sm mb-1">选择题得分</p>
          <p className="text-gray-700 font-medium">{sessionCorrect} / {mcqs.length} 题正确</p>
          {pct >= 65
            ? <p className="text-green-600 text-sm mt-2">✅ 超过及格线(65%)，继续保持！</p>
            : <p className="text-red-500 text-sm mt-2">❌ 低于及格线(65%)，需要多加练习</p>}
        </div>
        <div className="space-y-3">
          {currentSet.map(q => {
            const ans = sessionAnswers[q.id]
            const isCorrect = q.type === 'mcq' ? ans === q.correctIndex : undefined
            return (
              <div key={q.id} className={`card p-4 border-l-4 ${
                q.type !== 'mcq' ? 'border-blue-400' :
                isCorrect ? 'border-green-400' : 'border-red-400'
              }`}>
                <p className="text-xs font-medium text-gray-700 mb-1">{typeLabel(q.type)}</p>
                <p className="text-sm text-gray-900 mb-2">{q.question.slice(0, 100)}...</p>
                {q.type === 'mcq' && (
                  <p className={`text-xs font-medium ${isCorrect ? 'text-green-600' : 'text-red-500'}`}>
                    {isCorrect ? '✓ 回答正确' : `✗ 正确答案：${q.answer}`}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-1">📚 {q.reference}</p>
              </div>
            )
          })}
        </div>
        <button onClick={() => setMode('list')} className="btn-primary w-full mt-5 py-3 flex items-center justify-center gap-2">
          <RotateCcw size={16} /> 返回题目列表
        </button>
      </div>
    )
  }

  if (mode === 'practice') {
    const q = currentSet[currentIndex]
    const answered = sessionAnswers[q.id]
    const answerShown = showAnswer[q.id]
    const progress = ((currentIndex + 1) / currentSet.length) * 100

    return (
      <div className="pb-24 px-4 pt-6 fade-in">
        {/* Progress */}
        <div className="flex items-center justify-between mb-2 text-xs text-gray-500">
          <span>{currentIndex + 1} / {currentSet.length}</span>
          <span className={`badge ${
            q.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
            q.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
          }`}>{q.difficulty === 'easy' ? '简单' : q.difficulty === 'medium' ? '中等' : '难'}</span>
        </div>
        <div className="h-1.5 bg-gray-200 rounded-full mb-4 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>

        {/* Question Card */}
        <div className="card p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <span className={`badge ${
              q.type === 'mcq' ? 'bg-blue-100 text-blue-700' :
              q.type === 'short' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'
            }`}>{typeLabel(q.type)}</span>
            <span className="badge bg-gray-100 text-gray-600 text-xs">{q.reference}</span>
          </div>
          <div className="text-sm text-gray-900 leading-relaxed whitespace-pre-wrap">{q.question}</div>
        </div>

        {/* MCQ Options */}
        {q.type === 'mcq' && q.options && (
          <div className="space-y-2 mb-4">
            {q.options.map((opt, idx) => {
              const isSelected = answered === idx
              const isCorrect = idx === q.correctIndex
              const isAnswered = answered !== undefined
              let cls = 'option-btn'
              if (isAnswered) {
                if (isCorrect) cls += ' correct'
                else if (isSelected) cls += ' selected-wrong wrong'
              }
              return (
                <button key={idx} className={cls} onClick={() => handleAnswer(q, idx)} disabled={!!isAnswered}>
                  <span className="font-medium mr-1">{String.fromCharCode(65 + idx)}.</span>
                  {opt.substring(3)}
                  {isAnswered && isCorrect && <CheckCircle size={14} className="inline ml-2 text-green-600" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle size={14} className="inline ml-2 text-red-500" />}
                </button>
              )
            })}
          </div>
        )}

        {/* Short/Case Answer Toggle */}
        {(q.type === 'short' || q.type === 'case') && (
          <div className="mb-4">
            <button
              onClick={() => handleShowAnswer(q.id)}
              className={`w-full py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all ${
                answerShown ? 'bg-gray-100 text-gray-600' : 'btn-primary'
              }`}
            >
              <Lightbulb size={16} />
              {answerShown ? '已显示参考答案' : '显示参考答案'}
            </button>
          </div>
        )}

        {/* Answer/Explanation */}
        {(answered !== undefined || answerShown) && (
          <div className="card p-4 mb-4 bg-blue-50 border-blue-200 fade-in">
            {q.type === 'mcq' && (
              <div className={`flex items-center gap-2 mb-2 text-sm font-semibold ${answered === q.correctIndex ? 'text-green-700' : 'text-red-600'}`}>
                {answered === q.correctIndex ? <CheckCircle size={16} /> : <XCircle size={16} />}
                {answered === q.correctIndex ? '回答正确！' : '回答错误'}
              </div>
            )}
            {(q.type === 'short' || q.type === 'case') && (
              <div>
                <p className="text-xs font-semibold text-blue-800 mb-2">📝 参考答案</p>
                <div className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed mb-3">{q.answer}</div>
              </div>
            )}
            <div className="border-t border-blue-200 pt-3 mt-2">
              <p className="text-xs font-semibold text-gray-600 mb-1">💡 解析</p>
              <p className="text-xs text-gray-700 leading-relaxed">{q.explanation}</p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-2">
          {currentIndex > 0 && (
            <button onClick={() => setCurrentIndex(i => i - 1)} className="btn-secondary flex-shrink-0 flex items-center gap-1">
              <ChevronRight size={16} className="rotate-180" /> 上一题
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={q.type === 'mcq' ? answered === undefined : !answerShown}
            className={`btn-primary flex-1 flex items-center justify-center gap-1 ${
              (q.type === 'mcq' ? answered === undefined : !answerShown) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {currentIndex === currentSet.length - 1 ? '查看结果' : '下一题'}
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    )
  }

  // List Mode
  return (
    <div className="pb-24 fade-in">
      <div className="sticky top-0 bg-gray-50/95 backdrop-blur-sm z-10 px-4 pt-6 pb-3">
        <h1 className="section-title">模拟题库</h1>
        <p className="section-subtitle">{questionsData.length}道题 · 选择题+简答题+案例分析</p>

        {/* Filter row */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {(['all', 'mcq', 'short', 'case'] as FilterType[]).map(type => (
            <FilterChip key={type} active={filterType === type} onClick={() => setFilterType(type)}>
              {type === 'all' ? '全部' : typeLabel(type)}
            </FilterChip>
          ))}
          <div className="w-px bg-gray-200 flex-shrink-0" />
          {['all', 'easy', 'medium', 'hard'].map(d => (
            <FilterChip key={d} active={filterDiff === d} onClick={() => setFilterDiff(d)}>
              {d === 'all' ? '所有难度' : d === 'easy' ? '简单' : d === 'medium' ? '中等' : '难'}
            </FilterChip>
          ))}
        </div>
      </div>

      <div className="px-4 mt-2">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: '选择题', count: mcqCount, color: 'bg-blue-50 border-blue-200', text: 'text-blue-700' },
            { label: '简答题', count: shortCount, color: 'bg-purple-50 border-purple-200', text: 'text-purple-700' },
            { label: '案例分析', count: caseCount, color: 'bg-orange-50 border-orange-200', text: 'text-orange-700' },
          ].map(s => (
            <div key={s.label} className={`card p-3 text-center border ${s.color}`}>
              <div className={`text-xl font-bold ${s.text}`}>{s.count}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Start buttons */}
        <div className="space-y-2 mb-5">
          <button onClick={() => startQuiz(filtered)} className="btn-primary w-full py-3 flex items-center justify-center gap-2">
            开始全部练习 ({filtered.length}题)
          </button>
          {filtered.filter(q => q.type === 'mcq').length > 0 && (
            <button onClick={() => startQuiz(filtered.filter(q => q.type === 'mcq'))} className="btn-secondary w-full py-2.5 flex items-center justify-center gap-2">
              只练习选择题 ({filtered.filter(q => q.type === 'mcq').length}题)
            </button>
          )}
        </div>

        {/* Question List */}
        <div className="space-y-2">
          {filtered.map((q, idx) => (
            <QuestionCard key={q.id} question={q} idx={idx + 1} onStart={() => startQuiz([q])} />
          ))}
        </div>
      </div>
    </div>
  )
}

function QuestionCard({ question: q, idx, onStart }: { question: Question; idx: number; onStart: () => void }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="card p-4">
      <div className="flex items-start gap-3">
        <span className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 flex-shrink-0">
          {idx}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={`badge text-xs ${
              q.type === 'mcq' ? 'bg-blue-100 text-blue-700' :
              q.type === 'short' ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700'
            }`}>{typeLabel(q.type)}</span>
            <span className={`badge text-xs ${
              q.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
              q.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
            }`}>{q.difficulty === 'easy' ? '简单' : q.difficulty === 'medium' ? '中等' : '难'}</span>
          </div>
          <p className={`text-sm text-gray-800 ${expanded ? '' : 'line-clamp-2'}`}>{q.question}</p>
          {!expanded && q.question.length > 120 && (
            <button onClick={() => setExpanded(true)} className="text-xs text-primary-500 mt-1 flex items-center gap-0.5">
              展开 <ChevronDown size={12} />
            </button>
          )}
          {expanded && (
            <button onClick={() => setExpanded(false)} className="text-xs text-gray-400 mt-1 flex items-center gap-0.5">
              收起 <ChevronUp size={12} />
            </button>
          )}
          <p className="text-xs text-gray-400 mt-1">📚 {q.reference}</p>
        </div>
        <button onClick={onStart} className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center hover:bg-primary-200 transition-colors">
          <BookOpen size={14} className="text-primary-700" />
        </button>
      </div>
    </div>
  )
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
      active ? 'bg-primary-600 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
    }`}>
      {children}
    </button>
  )
}

function typeLabel(type: string) {
  return type === 'mcq' ? '选择题' : type === 'short' ? '简答题' : '案例分析'
}
