import { useEffect, useCallback } from 'react'

export interface KeyboardShortcut {
  key: string
  ctrl?: boolean
  shift?: boolean
  alt?: boolean
  handler: () => void
  description: string
}

interface UseKeyboardShortcutsOptions {
  enabled?: boolean
  preventDefault?: boolean
}

export function useKeyboardShortcuts(
  shortcuts: KeyboardShortcut[],
  options: UseKeyboardShortcutsOptions = {}
) {
  const { enabled = true, preventDefault = true } = options

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!enabled) return

    // 忽略在输入框中的按键（除了特定的全局快捷键）
    const target = e.target as HTMLElement
    const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable

    for (const shortcut of shortcuts) {
      const keyMatch = e.key.toLowerCase() === shortcut.key.toLowerCase()
      const ctrlMatch = shortcut.ctrl ? (e.ctrlKey || e.metaKey) : !(e.ctrlKey || e.metaKey)
      const shiftMatch = shortcut.shift ? e.shiftKey : !e.shiftKey
      const altMatch = shortcut.alt ? e.altKey : !e.altKey

      if (keyMatch && ctrlMatch && shiftMatch && altMatch) {
        // 如果在输入框中，只允许 ESC
        if (isInput && shortcut.key.toLowerCase() !== 'escape') {
          continue
        }

        if (preventDefault) {
          e.preventDefault()
        }
        shortcut.handler()
        break
      }
    }
  }, [shortcuts, enabled, preventDefault])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}

// 常用的快捷键定义
export const SHORTCUT_DEFINITIONS = {
  // 导航
  GO_HOME: { key: '1', handler: () => {}, description: '前往首页' },
  GO_TOPICS: { key: '2', handler: () => {}, description: '前往知识点' },
  GO_QUIZ: { key: '3', handler: () => {}, description: '前往题库' },
  GO_LEGAL: { key: '4', handler: () => {}, description: '前往法条库' },
  GO_PROGRESS: { key: '5', handler: () => {}, description: '前往学习进度' },

  // 搜索
  OPEN_SEARCH: { key: '/', handler: () => {}, description: '打开搜索' },
  CLOSE_SEARCH: { key: 'Escape', handler: () => {}, description: '关闭搜索' },

  // 深色模式
  TOGGLE_THEME: { key: 'd', ctrl: true, handler: () => {}, description: '切换深色模式' },

  // 题目操作（在做题页面）
  NEXT_QUESTION: { key: 'n', handler: () => {}, description: '下一题' },
  PREV_QUESTION: { key: 'p', handler: () => {}, description: '上一题' },
  SHOW_ANSWER: { key: 's', handler: () => {}, description: '显示答案' },
  BOOKMARK: { key: 'b', handler: () => {}, description: '收藏题目' },
}

// 快捷键提示组件
interface ShortcutHintProps {
  shortcuts: Array<{ key: string; description: string }>
}

export function ShortcutHints({ shortcuts }: ShortcutHintProps) {
  return (
    <div className="flex flex-wrap gap-2 text-xs text-gray-500">
      {shortcuts.map((s, i) => (
        <span key={i} className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 bg-gray-100 rounded font-mono">{s.key}</kbd>
          <span>{s.description}</span>
        </span>
      ))}
    </div>
  )
}
