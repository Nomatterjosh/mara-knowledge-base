import { RotateCcw, BookOpen, HelpCircle, Trophy, TrendingUp, Target } from 'lucide-react'
import type { Tab, StudyState } from '../App'
import { topicsData, CATEGORIES, DIFFICULTY } from '../data/topics'
import { questionsData } from '../data/questions'

interface ProgressPageProps {
  studyState: StudyState
  onNavigate: (tab: Tab) => void
}

export default function ProgressPage({ studyState, onNavigate }: ProgressPageProps) {
  const totalTopics = topicsData.length
  const completedTopics = studyState.completedTopics.length
  const topicPct = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0

  const essentialTopics = topicsData.filter(t => t.difficulty === 'essential')
  const completedEssential = essentialTopics.filter(t => studyState.completedTopics.includes(t.id)).length

  const totalQuestions = questionsData.length
  const mcqQuestions = questionsData.filter(q => q.type === 'mcq')
  const scores = Object.values(studyState.quizScores)
  const totalCorrect = scores.reduce((sum, s) => sum + s.correct, 0)
  const totalAttempted = scores.reduce((sum, s) => sum + s.total, 0)
  const avgScore = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0

  // Category breakdown
  const categoryStats = Object.entries(CATEGORIES).map(([key, cat]) => {
    const catTopics = topicsData.filter(t => t.category === key)
    const catCompleted = catTopics.filter(t => studyState.completedTopics.includes(t.id)).length
    return { key, cat, total: catTopics.length, completed: catCompleted }
  })

  // Difficulty breakdown
  const diffStats = Object.entries(DIFFICULTY).map(([key, diff]) => {
    const diffTopics = topicsData.filter(t => t.difficulty === key)
    const diffCompleted = diffTopics.filter(t => studyState.completedTopics.includes(t.id)).length
    return { key, diff, total: diffTopics.length, completed: diffCompleted }
  })

  const handleReset = () => {
    if (confirm('确定要清除所有学习进度吗？此操作不可撤销。')) {
      localStorage.removeItem('mara_study_state')
      window.location.reload()
    }
  }

  const examDate = new Date('2026-05-31')
  const today = new Date()
  const daysLeft = Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  const weeksLeft = Math.floor(daysLeft / 7)

  return (
    <div className="pb-24 px-4 pt-6 fade-in">
      <div className="flex items-center justify-between mb-1">
        <h1 className="section-title">学习进度</h1>
        <button onClick={handleReset} className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-400 py-1 px-2 rounded-lg hover:bg-red-50 transition-colors">
          <RotateCcw size={12} /> 重置
        </button>
      </div>
      <p className="section-subtitle">距考试还有 {daysLeft} 天（约 {weeksLeft} 周）</p>

      {/* Overall Score Card */}
      <div className="card p-5 mb-4 bg-gradient-to-br from-primary-600 to-accent-600 text-white">
        <div className="flex items-center gap-2 mb-4">
          <Trophy size={18} />
          <span className="font-semibold text-sm">总体备考状态</span>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold">{topicPct}%</div>
            <div className="text-xs opacity-80 mt-0.5">知识点完成率</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{avgScore > 0 ? avgScore + '%' : '--'}</div>
            <div className="text-xs opacity-80 mt-0.5">题目平均分</div>
          </div>
          <div>
            <div className={`text-3xl font-bold ${avgScore >= 65 || avgScore === 0 ? 'text-green-300' : 'text-red-300'}`}>
              {avgScore === 0 ? '?' : avgScore >= 65 ? '✓' : '✗'}
            </div>
            <div className="text-xs opacity-80 mt-0.5">及格线(65%)</div>
          </div>
        </div>

        {/* Radial progress bar simulation */}
        <div className="mt-4 bg-white/20 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-700"
            style={{ width: `${topicPct}%` }}
          />
        </div>
        <div className="flex justify-between text-xs opacity-70 mt-1">
          <span>知识点: {completedTopics}/{totalTopics}</span>
          <span>必考: {completedEssential}/{essentialTopics.length}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="card p-4">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen size={16} className="text-blue-500" />
            <span className="text-xs font-medium text-gray-600">知识点</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{completedTopics}</div>
          <div className="text-xs text-gray-400">/ {totalTopics} 个已完成</div>
          <div className="h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-blue-400 rounded-full" style={{ width: `${topicPct}%` }} />
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle size={16} className="text-purple-500" />
            <span className="text-xs font-medium text-gray-600">练习题</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{totalCorrect}</div>
          <div className="text-xs text-gray-400">/ {totalAttempted} 题答对</div>
          <div className="h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
            <div className={`h-full rounded-full ${avgScore >= 65 ? 'bg-green-400' : 'bg-red-400'}`} style={{ width: `${avgScore}%` }} />
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target size={16} className="text-red-500" />
            <span className="text-xs font-medium text-gray-600">必考项</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{completedEssential}</div>
          <div className="text-xs text-gray-400">/ {essentialTopics.length} 必考完成</div>
          <div className="h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-red-400 rounded-full" style={{ width: `${essentialTopics.length > 0 ? (completedEssential / essentialTopics.length) * 100 : 0}%` }} />
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-green-500" />
            <span className="text-xs font-medium text-gray-600">总题目数</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{totalQuestions}</div>
          <div className="text-xs text-gray-400">MCQ {mcqQuestions.length} / 其他 {totalQuestions - mcqQuestions.length}</div>
          <div className="h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-green-400 rounded-full" style={{ width: `${totalAttempted > 0 ? Math.min((totalAttempted / totalQuestions) * 100, 100) : 0}%` }} />
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="card p-4 mb-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <BookOpen size={14} className="text-primary-500" /> 按类别进度
        </h3>
        <div className="space-y-3">
          {categoryStats.map(({ key, cat, total, completed }) => {
            const pct = total > 0 ? Math.round((completed / total) * 100) : 0
            return (
              <div key={key}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-700">{cat.icon} {cat.label}</span>
                  <span className="text-xs text-gray-500">{completed}/{total}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${pct}%`,
                      background: pct === 100 ? '#10b981' : pct > 50 ? '#6366f1' : '#94a3b8'
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Difficulty Breakdown */}
      <div className="card p-4 mb-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <Target size={14} className="text-primary-500" /> 按难度进度
        </h3>
        <div className="space-y-3">
          {diffStats.map(({ key, diff, total, completed }) => {
            const pct = total > 0 ? Math.round((completed / total) * 100) : 0
            return (
              <div key={key}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`badge ${diff.color} text-xs`}>{diff.label}</span>
                  <span className="text-xs text-gray-500">{completed}/{total} ({pct}%)</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, background: key === 'essential' ? '#ef4444' : key === 'important' ? '#f59e0b' : '#3b82f6' }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Study Plan */}
      <div className="card p-4 mb-4 bg-amber-50 border border-amber-200">
        <h3 className="text-sm font-semibold text-amber-900 mb-3">📅 建议学习计划</h3>
        <div className="space-y-2 text-xs text-amber-800">
          <div className="flex items-start gap-2">
            <span className="font-semibold w-16 flex-shrink-0">第1-2周</span>
            <span>掌握所有必考(🔴)知识点：核心法条(s.65/s.116/s.501)、Code of Conduct</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-semibold w-16 flex-shrink-0">第3-4周</span>
            <span>完成重要(🟡)签证类别：500/189/190/491/482/820；做完所有选择题</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-semibold w-16 flex-shrink-0">第5-6周</span>
            <span>专攻案例分析题；模拟口试；整理个人速查手册</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-semibold w-16 flex-shrink-0">考前1周</span>
            <span>复习所有错题；确认法条位置；练习英文表达</span>
          </div>
        </div>
      </div>

      {/* Uncompleted Essential Topics */}
      {completedEssential < essentialTopics.length && (
        <div className="card p-4 mb-4 border-red-200 bg-red-50">
          <h3 className="text-sm font-semibold text-red-800 mb-2">⚠️ 未完成的必考项</h3>
          <div className="space-y-1">
            {essentialTopics
              .filter(t => !studyState.completedTopics.includes(t.id))
              .map(t => (
                <div key={t.id} className="text-xs text-red-700 flex items-center gap-1.5">
                  <span>•</span> {t.title}
                </div>
              ))}
          </div>
          <button
            onClick={() => onNavigate('topics')}
            className="mt-3 text-xs text-red-700 font-medium underline"
          >
            前往学习 →
          </button>
        </div>
      )}

      {completedEssential === essentialTopics.length && essentialTopics.length > 0 && (
        <div className="card p-4 mb-4 border-green-200 bg-green-50 text-center">
          <div className="text-2xl mb-1">🎉</div>
          <p className="text-sm font-semibold text-green-800">所有必考项已完成！</p>
          <p className="text-xs text-green-600 mt-1">继续完成重要和进阶考点，保持好状态</p>
        </div>
      )}
    </div>
  )
}
