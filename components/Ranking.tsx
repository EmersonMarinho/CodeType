import { Ranking as RankingType } from '@/types/types'

interface RankingProps {
  rankings: RankingType[];
}

export default function Ranking({ rankings }: RankingProps) {
  return (
    <div>
      <h3 className="text-xs text-[#646669] opacity-50 mb-4">top rankings</h3>
      <div className="space-y-2">
        {rankings.map((rank, index) => (
          <div
            key={rank.id}
            className="flex items-center justify-between py-2 text-sm text-[#646669]"
          >
            <div className="flex items-center gap-4">
              <span className="text-[#d1d0c5]">#{index + 1}</span>
              <span>Anonymous</span>
            </div>
            <div className="flex gap-6">
              <span>{rank.wpm} wpm</span>
              <span>{rank.accuracy}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 