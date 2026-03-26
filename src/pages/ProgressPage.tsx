import { RotateCcw, BookOpen, HelpCircle, Trophy, TrendingUp, Target, AlertCircle, BarChart3, Clock } from 'lucide-react'
import type { Tab, StudyState } from '../App'
import { topicsData, CATEGORIES, DIFFICULTY } from '../data/topics'
import { questionsData } from '../data/questions'
import { useAnalytics, formatTopicName, formatTypeName } from '../hooks/useAnalytics'

interface ProgressPageProps {
  studyState: StudyState
  onNavigate: (tab: Tab) => void
}

export default function ProgressPage({ studyState, onNavigate }: ProgressPageProps) {
  const { analytics, resetAnalytics, getOverallAccuracy, getTypeAccuracy } = useAnalytics()

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
      localStorage.removeItem('mara_analytics_data')
      window.location.reload()
    }
  }

  const examDate = new Date('2026-05-31')
  const today = new Date()
  const daysLeft = Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  const weeksLeft = Math.floor(daysLeft / 7)

  const overallAccuracy = getOverallAccuracy()

  return (
    <div className="pb-24 px-4 pt-6 fade-in">
      <div className="flex items-center justify-between mb-1">
        <h1 className="section-title">学习进度</h1>
        <button onClick={handleReset} className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-400 py-1 px-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
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
            <div className="text-3xl font-bold">{overallAccuracy > 0 ? overallAccuracy + '%' : avgScore > 0 ? avgScore + '%' : '--'}</div>
            <div className="text-xs opacity-80 mt-0.5">正确率</div>
          </div>
          <div>
            <div className={`text-3xl font-bold ${overallAccuracy >= 65 || overallAccuracy === 0 ? 'text-green-300' : 'text-red-300'}`}>
              {overallAccuracy === 0 && avgScore === 0 ? '?' : overallAccuracy >= 65 || avgScore >= 65 ? '✓' : '✗'}
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
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">知识点</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{completedTopics}</div>
          <div className="text-xs text-gray-400 dark:text-gray-500">/ {totalTopics} 个已完成</div>
          <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-blue-400 rounded-full" style={{ width: `${topicPct}%` }} />
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle size={16} className="text-purple-500" />
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">练习题</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{totalCorrect}</div>
          <div className="text-xs text-gray-400 dark:text-gray-500">/ {totalAttempted} 题答对</div>
          <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
            <div className={`h-full rounded-full ${avgScore >= 65 ? 'bg-green-400' : 'bg-red-400'}`} style={{ width: `${avgScore}%` }} />
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target size={16} className="text-red-500" />
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">必考项</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{completedEssential}</div>
          <div className="text-xs text-gray-400 dark:text-gray-500">/ {essentialTopics.length} 必考完成</div>
          <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-red-400 rounded-full" style={{ width: `${essentialTopics.length > 0 ? (completedEssential / essentialTopics.length) * 100 : 0}%` }} />
          </div>
        </div>

        <div className="card p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-green-500" />
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">总题目数</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{totalQuestions}</div>
          <div className="text-xs text-gray-400 dark:text-gray-500">MCQ {mcqQuestions.length} / 其他 {totalQuestions - mcqQuestions.length}</div>
          <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-green-400 rounded-full" style={{ width: `${totalAttempted > 0 ? Math.min((totalAttempted / totalQuestions) * 100, 100) : 0}%` }} />
          </div>
        </div>
      </div>

      {/* Analytics Section - Usage Statistics */}
      {analytics.totalAnswered > 0 && (
        <>
          {/* Accuracy by Type */}
          <div className="card p-4 mb-4">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
              <BarChart3 size={14} className="text-primary-500" /> 题型正确率分析
            </h3>
            <div className="space-y-3">
              {(['mcq', 'short', 'case'] as const).map(type => {
                const stats = analytics.byType[type]
                if (!stats || stats.total === 0) return null
                const accuracy = Math.round((stats.correct / stats.total) * 100)
                return (
                  <div key={type}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        {type === 'mcq' ? '📝 选择题' : type === 'short' ? '✍️ 简答题' : '📋 案例分析'}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {stats.correct}/{stats.total} ({accuracy}%)
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${accuracy >= 65 ? 'bg-green-400' : 'bg-red-400'}`}
                        style={{ width: `${accuracy}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Weak Topics */}
          {analytics.weakTopics.length > 0 && (
            <div className="card p-4 mb-4 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/10">
              <h3 className="text-sm font-semibold text-orange-800 dark:text-orange-300 mb-3 flex items-center gap-2">
                <AlertCircle size={14} /> 需要加强的知识点
              </h3>
              <div className="space-y-2">
                {analytics.weakTopics.slice(0, 3).map((wt, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-xs text-orange-700 dark:text-orange-400">
                      {formatTopicName(wt.topic)} ({wt.total}题)
                    </span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      wt.accuracy < 50 ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                      'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {wt.accuracy}%
                    </span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => onNavigate('quiz')}
                className="mt-3 text-xs text-orange-700 dark:text-orange-400 font-medium underline"
              >
                去练习 →
              </button>
            </div>
          )}

          {/* Recent Activity */}
          {analytics.recentActivity.length > 0 && (
            <div className="card p-4 mb-4">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                <Clock size={14} className="text-primary-500" /> 最近答题
              </h3>
              <div className="space-y-2">
                {analytics.recentActivity.slice(0, 5).map((record, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 dark:text-gray-400">
                      {record.questionId.slice(0, 4)} - {formatTypeName(record.questionType)}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full ${
                      record.isCorrect
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {record.isCorrect ? '✓ 正确' : '✗ 错误'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Category Breakdown */}
      <div className="card p-4 mb-4">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <BookOpen size={14} className="text-primary-500" /> 按类别进度
        </h3>
        <div className="space-y-3">
          {categoryStats.map(({ key, cat, total, completed }) => {
            const pct = total > 0 ? Math.round((completed / total) * 100) : 0
            return (
              <div key={key}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{cat.icon} {cat.label}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{completed}/{total}</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
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
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
          <Target size={14} className="text-primary-500" /> 按难度进度
        </h3>
        <div className="space-y-3">
          {diffStats.map(({ key, diff, total, completed }) => {
            const pct = total > 0 ? Math.round((completed / total) * 100) : 0
            return (
              <div key={key}>
                <div className="flex items-center justify-between mb-1">
                  <span className={`badge ${diff.color} text-xs`}>{diff.label}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{completed}/{total} ({pct}%)</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
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
      <div className="card p-4 mb-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800">
        <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-300 mb-3">📅 建议学习计划</h3>
        <div className="space-y-2 text-xs text-amber-800 dark:text-amber-400">
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
        <div className="card p-4 mb-4 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10">
          <h3 className="text-sm font-semibold text-red-800 dark:text-red-300 mb-2">⚠️ 未完成的必考项</h3>
          <div className="space-y-1">
            {essentialTopics
              .filter(t => !studyState.completedTopics.includes(t.id))
              .map(t => (
                <div key={t.id} className="text-xs text-red-700 dark:text-red-400 flex items-center gap-1.5">
                  <span>•</span> {t.title}
                </div>
              ))}
          </div>
          <button
            onClick={() => onNavigate('topics')}
            className="mt-3 text-xs text-red-700 dark:text-red-400 font-medium underline"
          >
            前往学习 →
          </button>
        </div>
      )}

      {completedEssential === essentialTopics.length && essentialTopics.length > 0 && (
        <div className="card p-4 mb-4 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10 text-center">
          <div className="text-2xl mb-1">🎉</div>
          <p className="text-sm font-semibold text-green-800 dark:text-green-300">所有必考项已完成！</p>
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">继续完成重要和进阶考点，保持好状态</p>
        </div>
      )}
    </div>
  )
}
