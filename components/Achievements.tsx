import { UserStats } from '@/types/types'

interface Achievement {
  id: string
  name: string
  description: string
  requirement: (stats: UserStats) => boolean
  icon: string
}

interface AchievementsProps {
  stats: UserStats
  achievements: Record<string, Achievement>
}

export default function Achievements({ stats, achievements }: AchievementsProps) {
  const unlockedAchievements = Object.values(achievements).filter(achievement => 
    achievement.requirement(stats)
  )

  if (unlockedAchievements.length === 0) {
    return null
  }

  return (
    <div>
      <h3 className="text-xs text-[#646669] opacity-50 mb-4">achievements unlocked</h3>
      <div className="flex flex-wrap gap-4">
        {unlockedAchievements.map(achievement => (
          <div 
            key={achievement.id}
            className="flex items-center gap-3"
          >
            <span className="text-xl text-[#d1d0c5]">{achievement.icon}</span>
            <div className="text-[#646669]">
              <div className="text-sm font-medium">{achievement.name}</div>
              <div className="text-xs opacity-50">{achievement.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 