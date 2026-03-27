import { BookOpen, HelpCircle, Scale, Trophy, ChevronRight, Calendar, AlertCircle, CheckCircle } from 'lucide-react'
import type { Tab, StudyState } from '../App'
import { topicsData, CATEGORIES, DIFFICULTY } from '../data/topics'
import { questionsData } from '../data/questions'

interface HomePageProps {
  studyState: StudyState
  onNavigate: (tab: Tab) => void
}

export default function HomePage({ studyState, onNavigate }: HomePageProps) {
  const completedCount = studyState.completedTopics.length
  const totalTopics = topicsData.length
  const progress = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0

  const totalQuestions = questionsData.length
  const attemptedQuizzes = Object.keys(studyState.quizScores).length

  const essentialTopics = topicsData.filter(t => t.difficulty === 'essential')
  const completedEssential = essentialTopics.filter(t => studyState.completedTopics.includes(t.id)).length

  const examDate = new Date('2026-05-31')
  const today = new Date()
  const daysLeft = Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  const recentTopics = topicsData
    .filter(t => studyState.lastStudied[t.id])
    .sort((a, b) => new Date(studyState.lastStudied[b.id]).getTime() - new Date(studyState.lastStudied[a.id]).getTime())
    .slice(0, 3)

  return (
    <div className="pb-24 px-4 pt-6 fade-in">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-700 to-accent-600 bg-clip-text text-transparent dark:from-primary-500 dark:to-accent-400">
              MARA 知识库 山
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">Migration Agent Registration Assessment</p>
          </div>
          <div className="flex flex-col items-center bg-gradient-to-br from-primary-600 to-accent-600 text-white rounded-2xl px-3 py-2 shadow-lg">
            <span className="text-2xl font-bold leading-none">{daysLeft}</span>
            <span className="text-xs opacity-90">天后考试</span>
          </div>
        </div>
      </div>

      {/* Exam Info Banner */}
      <div className="card p-4 mb-5 border-l-4 border-primary-500 bg-gradient-to-r from-primary-50 to-white dark:from-primary-900/30 dark:to-gray-800">
        <div className="flex items-start gap-3">
          <AlertCircle size={20} className="text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-primary-900 dark:text-primary-300">考试结构提醒</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              笔试 Part 1: 10道选择题 + 2道简答题 (3小时) · Part 2: 1道案例分析
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              口试: 1小时面试 · 及格线: 各部分均须 ≥65%  · 开卷考试
            </p>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="card p-4 dark:bg-gray-800/95 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
              <BookOpen size={16} className="text-primary-600 dark:text-primary-400" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">知识点进度</span>
          </div>
          <div className="mb-2">
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
              <span>{completedCount}/{totalTopics} 已完成</span>
              <span className="font-semibold text-primary-600 dark:text-primary-400">{progress}%</span>
            </div>
            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500">必考项: {completedEssential}/{essentialTopics.length}</p>
        </div>

        <div className="card p-4 dark:bg-gray-800/95 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-accent-100 dark:bg-accent-900/30 rounded-lg flex items-center justify-center">
              <HelpCircle size={16} className="text-accent-600 dark:text-accent-400" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">题目练习</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{attemptedQuizzes}</div>
          <p className="text-xs text-gray-500 dark:text-gray-400">已练习 / 共{totalQuestions}题</p>
          <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent-500 to-pink-400 rounded-full"
              style={{ width: `${totalQuestions > 0 ? (attemptedQuizzes / totalQuestions) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-5">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">快速开始</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              tab: 'topics' as Tab,
              title: '浏览知识点',
              desc: `${totalTopics}个考点，分类整理`,
              icon: BookOpen,
              gradient: 'from-blue-500 to-primary-600',
              bg: 'bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800',
              text: 'text-blue-700 dark:text-blue-400',
            },
            {
              tab: 'quiz' as Tab,
              title: '做模拟题',
              desc: `${totalQuestions}道题，含案例分析`,
              icon: HelpCircle,
              gradient: 'from-purple-500 to-accent-600',
              bg: 'bg-purple-50 dark:bg-purple-900/20 dark:border-purple-800',
              text: 'text-purple-700 dark:text-purple-400',
            },
            {
              tab: 'legal' as Tab,
              title: '查法条',
              desc: 'Act + Regulations 快查',
              icon: Scale,
              gradient: 'from-green-500 to-teal-600',
              bg: 'bg-green-50 dark:bg-green-900/20 dark:border-green-800',
              text: 'text-green-700 dark:text-green-400',
            },
            {
              tab: 'progress' as Tab,
              title: '学习报告',
              desc: '掌握情况一览',
              icon: Trophy,
              gradient: 'from-orange-500 to-amber-500',
              bg: 'bg-orange-50 dark:bg-orange-900/20 dark:border-orange-800',
              text: 'text-orange-700 dark:text-orange-400',
            },
          ].map(({ tab, title, desc, icon: Icon, bg, text }) => (
            <button
              key={tab}
              onClick={() => onNavigate(tab)}
              className={`card p-4 text-left hover:scale-[1.02] active:scale-[0.98] transition-transform ${bg}`}
            >
              <Icon size={20} className={`${text} mb-2`} />
              <p className={`text-sm font-semibold ${text}`}>{title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Essential Topics */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">必考核心考点</h2>
          <button onClick={() => onNavigate('topics')} className="text-xs text-primary-600 dark:text-primary-400 flex items-center gap-0.5">
            全部 <ChevronRight size={14} />
          </button>
        </div>
        <div className="space-y-2">
          {essentialTopics.slice(0, 5).map(topic => {
            const completed = studyState.completedTopics.includes(topic.id)
            const cat = CATEGORIES[topic.category]
            return (
              <button
                key={topic.id}
                onClick={() => onNavigate('topics')}
                className="card w-full text-left p-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${cat.color}`}>
                  {cat.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{topic.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{topic.subtitle}</p>
                </div>
                {completed ? (
                  <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600 flex-shrink-0" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Recent Activity */}
      {recentTopics.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">最近学习</h2>
          <div className="space-y-2">
            {recentTopics.map(topic => (
              <div key={topic.id} className="card p-3 flex items-center gap-3 dark:bg-gray-800/95 dark:border-gray-700">
                <Calendar size={16} className="text-gray-400" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{topic.title}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {new Date(studyState.lastStudied[topic.id]).toLocaleDateString('zh-CN')}
                  </p>
                </div>
                <span className={`badge ${DIFFICULTY[topic.difficulty].color}`}>
                  {DIFFICULTY[topic.difficulty].label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Exam Tips */}
      <div className="card p-4 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 dark:from-amber-900/20 dark:to-orange-900/20 dark:border-amber-800">
        <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-300 mb-2">💡 Capstone 备考要点</h3>
        <ul className="space-y-1.5 text-xs text-amber-800 dark:text-amber-400">
          <li>• 开卷考试 — 但须熟悉法条位置，不能全靠翻查</li>
          <li>• 口试重点：能否用英语流利解释法律概念给"客户"</li>
          <li>• 掌握OCS职业能力标准的9个能力单元</li>
          <li>• 重点：Code of Conduct + s.65 + s.116 + s.501</li>
          <li>• 案例分析须同时考虑法律依据和职业道德</li>
        </ul>
      </div>

      {/* Bottom padding for navbar */}
      <div className="h-4" />
    </div>
  )
}
