import { useState, useEffect, useCallback } from 'react'
import { questionsData, type QuestionType } from '../data/questions'

export interface AnswerRecord {
  questionId: string
  questionType: QuestionType
  topic: string
  difficulty: string
  isCorrect: boolean
  timestamp: number
}

export interface AnalyticsData {
  totalAnswered: number
  correctCount: number
  incorrectCount: number
  byType: Record<QuestionType, { total: number; correct: number }>
  byTopic: Record<string, { total: number; correct: number }>
  byDifficulty: Record<string, { total: number; correct: number }>
  recentActivity: AnswerRecord[]
  weakTopics: { topic: string; accuracy: number; total: number }[]
  weakTypes: { type: QuestionType; accuracy: number; total: number }[]
}

const STORAGE_KEY = 'mara_analytics_data'
const MAX_RECENT = 50

function getInitialData(): AnalyticsData {
  return {
    totalAnswered: 0,
    correctCount: 0,
    incorrectCount: 0,
    byType: {
      mcq: { total: 0, correct: 0 },
      short: { total: 0, correct: 0 },
      case: { total: 0, correct: 0 },
    },
    byTopic: {},
    byDifficulty: {
      easy: { total: 0, correct: 0 },
      medium: { total: 0, correct: 0 },
      hard: { total: 0, correct: 0 },
    },
    recentActivity: [],
    weakTopics: [],
    weakTypes: [],
  }
}

function loadAnalytics(): AnalyticsData {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      // 计算弱项
      parsed.weakTopics = calculateWeakTopics(parsed)
      parsed.weakTypes = calculateWeakTypes(parsed)
      return parsed
    }
  } catch {
    // ignore
  }
  return getInitialData()
}

function saveAnalytics(data: AnalyticsData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // ignore
  }
}

function calculateWeakTopics(data: AnalyticsData) {
  const topicStats: Record<string, { correct: number; total: number }> = {}
  for (const [topic, stats] of Object.entries(data.byTopic)) {
    topicStats[topic] = stats
  }
  return Object.entries(topicStats)
    .filter(([, stats]) => stats.total >= 2)
    .map(([topic, stats]) => ({
      topic,
      accuracy: Math.round((stats.correct / stats.total) * 100),
      total: stats.total,
    }))
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 5)
}

function calculateWeakTypes(data: AnalyticsData) {
  return Object.entries(data.byType)
    .filter(([, stats]) => stats.total >= 2)
    .map(([type, stats]) => ({
      type: type as QuestionType,
      accuracy: Math.round((stats.correct / stats.total) * 100),
      total: stats.total,
    }))
    .sort((a, b) => a.accuracy - b.accuracy)
}

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData>(loadAnalytics)

  useEffect(() => {
    saveAnalytics(analytics)
  }, [analytics])

  const recordAnswer = useCallback((
    questionId: string,
    questionType: QuestionType,
    topic: string,
    difficulty: string,
    isCorrect: boolean
  ) => {
    setAnalytics(prev => {
      const newData = { ...prev }

      // 更新总数
      newData.totalAnswered += 1
      if (isCorrect) {
        newData.correctCount += 1
      } else {
        newData.incorrectCount += 1
      }

      // 更新类型统计
      if (!newData.byType[questionType]) {
        newData.byType[questionType] = { total: 0, correct: 0 }
      }
      newData.byType[questionType].total += 1
      if (isCorrect) {
        newData.byType[questionType].correct += 1
      }

      // 更新话题统计
      if (!newData.byTopic[topic]) {
        newData.byTopic[topic] = { total: 0, correct: 0 }
      }
      newData.byTopic[topic].total += 1
      if (isCorrect) {
        newData.byTopic[topic].correct += 1
      }

      // 更新难度统计
      if (!newData.byDifficulty[difficulty]) {
        newData.byDifficulty[difficulty] = { total: 0, correct: 0 }
      }
      newData.byDifficulty[difficulty].total += 1
      if (isCorrect) {
        newData.byDifficulty[difficulty].correct += 1
      }

      // 更新最近活动
      const record: AnswerRecord = {
        questionId,
        questionType,
        topic,
        difficulty,
        isCorrect,
        timestamp: Date.now(),
      }
      newData.recentActivity = [record, ...prev.recentActivity].slice(0, MAX_RECENT)

      // 重新计算弱项
      newData.weakTopics = calculateWeakTopics(newData)
      newData.weakTypes = calculateWeakTypes(newData)

      return newData
    })
  }, [])

  const getOverallAccuracy = useCallback(() => {
    if (analytics.totalAnswered === 0) return 0
    return Math.round((analytics.correctCount / analytics.totalAnswered) * 100)
  }, [analytics])

  const getTypeAccuracy = useCallback((type: QuestionType) => {
    const stats = analytics.byType[type]
    if (!stats || stats.total === 0) return 0
    return Math.round((stats.correct / stats.total) * 100)
  }, [analytics])

  const getTopicAccuracy = useCallback((topic: string) => {
    const stats = analytics.byTopic[topic]
    if (!stats || stats.total === 0) return 0
    return Math.round((stats.correct / stats.total) * 100)
  }, [analytics])

  const resetAnalytics = useCallback(() => {
    const initial = getInitialData()
    setAnalytics(initial)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return {
    analytics,
    recordAnswer,
    getOverallAccuracy,
    getTypeAccuracy,
    getTopicAccuracy,
    resetAnalytics,
  }
}

// 格式化话题名称
export function formatTopicName(topic: string): string {
  const topicNames: Record<string, string> = {
    law: '法律基础',
    visa: '签证类别',
    ethics: '职业道德',
    review: '复议审查',
    procedure: '申请程序',
    sponsorship: '担保义务',
  }
  return topicNames[topic] || topic
}

// 格式化题型名称
export function formatTypeName(type: QuestionType): string {
  const typeNames: Record<QuestionType, string> = {
    mcq: '选择题',
    short: '简答题',
    case: '案例分析',
  }
  return typeNames[type]
}
