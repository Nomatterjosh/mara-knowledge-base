import { Home, BookOpen, HelpCircle, Scale, BarChart2 } from 'lucide-react'
import type { Tab } from '../App'

interface NavbarProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
}

const tabs: { id: Tab; label: string; Icon: React.FC<{ size?: number }> }[] = [
  { id: 'home', label: '首页', Icon: Home },
  { id: 'topics', label: '知识点', Icon: BookOpen },
  { id: 'quiz', label: '模拟题', Icon: HelpCircle },
  { id: 'legal', label: '法条库', Icon: Scale },
  { id: 'progress', label: '学习进度', Icon: BarChart2 },
]

export default function Navbar({ activeTab, onTabChange }: NavbarProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-t border-gray-200 safe-area-bottom">
      <div className="max-w-screen-lg mx-auto px-2 py-2">
        <div className="flex justify-around">
          {tabs.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`nav-item flex-1 ${activeTab === id ? 'active' : ''}`}
            >
              <Icon size={22} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
