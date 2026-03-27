import { useState, useEffect, useCallback } from 'react'
import './index.css'
import Navbar from './components/Navbar'
import GlobalSearch, { SearchButton } from './components/GlobalSearch'
import HomePage from './pages/HomePage'
import TopicsPage from './pages/TopicsPage'
import QuizPage from './pages/QuizPage'
import LegalPage from './pages/LegalPage'
import ProgressPage from './pages/ProgressPage'
import { ThemeProvider, ThemeToggle } from './context/ThemeContext'
import { LanguageProvider, LanguageToggle } from './context/LanguageContext'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'

export type Tab = 'home' | 'topics' | 'quiz' | 'legal' | 'progress'

export interface StudyState {
  completedTopics: string[]
  quizScores: Record<string, { correct: number; total: number }>
  lastStudied: Record<string, string>
  bookmarkedQuestions: string[]
}

const DEFAULT_STATE: StudyState = {
  completedTopics: [],
  quizScores: {},
  lastStudied: {},
  bookmarkedQuestions: [],
}

function AppContent() {
  const [activeTab, setActiveTab] = useState<Tab>('home')
  const [searchOpen, setSearchOpen] = useState(false)
  const [studyState, setStudyState] = useState<StudyState>(() => {
    try {
      const saved = localStorage.getItem('mara_study_state')
      return saved ? JSON.parse(saved) : DEFAULT_STATE
    } catch {
      return DEFAULT_STATE
    }
  })

  useEffect(() => {
    localStorage.setItem('mara_study_state', JSON.stringify(studyState))
  }, [studyState])

  const handleNavigate = useCallback((tab: Tab, params?: Record<string, string>) => {
    setActiveTab(tab)
    // 可以在这里处理 params，如跳转后高亮某个题目
  }, [])

  // 键盘快捷键
  useKeyboardShortcuts([
    { key: '/', handler: () => setSearchOpen(true), description: '打开搜索' },
    { key: '1', handler: () => setActiveTab('home'), description: '首页' },
    { key: '2', handler: () => setActiveTab('topics'), description: '知识点' },
    { key: '3', handler: () => setActiveTab('quiz'), description: '题库' },
    { key: '4', handler: () => setActiveTab('legal'), description: '法条库' },
    { key: '5', handler: () => setActiveTab('progress'), description: '进度' },
  ])

  const markTopicComplete = (topicId: string) => {
    setStudyState(prev => ({
      ...prev,
      completedTopics: prev.completedTopics.includes(topicId)
        ? prev.completedTopics.filter(id => id !== topicId)
        : [...prev.completedTopics, topicId],
      lastStudied: { ...prev.lastStudied, [topicId]: new Date().toISOString() },
    }))
  }

  const recordQuizScore = (quizId: string, correct: number, total: number) => {
    setStudyState(prev => ({
      ...prev,
      quizScores: { ...prev.quizScores, [quizId]: { correct, total } },
    }))
  }

  const toggleBookmark = (questionId: string) => {
    setStudyState(prev => ({
      ...prev,
      bookmarkedQuestions: prev.bookmarkedQuestions.includes(questionId)
        ? prev.bookmarkedQuestions.filter(id => id !== questionId)
        : [...prev.bookmarkedQuestions, questionId],
    }))
  }

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage studyState={studyState} onNavigate={handleNavigate} />
      case 'topics':
        return <TopicsPage studyState={studyState} onMarkComplete={markTopicComplete} />
      case 'quiz':
        return <QuizPage studyState={studyState} onRecordScore={recordQuizScore} onToggleBookmark={toggleBookmark} />
      case 'legal':
        return <LegalPage />
      case 'progress':
        return <ProgressPage studyState={studyState} onNavigate={handleNavigate} />
      default:
        return <HomePage studyState={studyState} onNavigate={handleNavigate} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Top Bar */}
      <div className="sticky top-0 z-40 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-screen-lg mx-auto px-4 py-2 flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">MARA 知识库</h1>
          <div className="flex items-center gap-2">
            <SearchButton onClick={() => setSearchOpen(true)} />
            <ThemeToggle />
            <LanguageToggle showLabel />
          </div>
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto">
        {renderPage()}
        <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} onNavigate={handleNavigate} />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App
