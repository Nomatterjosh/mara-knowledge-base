import { useState, useEffect } from 'react'
import './index.css'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import TopicsPage from './pages/TopicsPage'
import QuizPage from './pages/QuizPage'
import LegalPage from './pages/LegalPage'
import ProgressPage from './pages/ProgressPage'

export type Tab = 'home' | 'topics' | 'quiz' | 'legal' | 'progress'

export interface StudyState {
  completedTopics: string[]
  quizScores: Record<string, { correct: number; total: number }>
  lastStudied: Record<string, string>
}

const DEFAULT_STATE: StudyState = {
  completedTopics: [],
  quizScores: {},
  lastStudied: {},
}

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home')
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

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage studyState={studyState} onNavigate={setActiveTab} />
      case 'topics':
        return <TopicsPage studyState={studyState} onMarkComplete={markTopicComplete} />
      case 'quiz':
        return <QuizPage studyState={studyState} onRecordScore={recordQuizScore} />
      case 'legal':
        return <LegalPage />
      case 'progress':
        return <ProgressPage studyState={studyState} onNavigate={setActiveTab} />
      default:
        return <HomePage studyState={studyState} onNavigate={setActiveTab} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-screen-lg mx-auto">
        {renderPage()}
        <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  )
}

export default App
