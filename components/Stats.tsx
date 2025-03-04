interface StatsProps {
  stats: {
    wpm: number
    cpm: number
    accuracy: number
  }
}

export default function Stats({ stats }: StatsProps) {
  return (
    <div className="flex justify-center gap-8">
      <div className="text-center">
        <div className="text-2xl font-bold">{stats.wpm}</div>
        <div className="text-sm">wpm</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold">{stats.cpm}</div>
        <div className="text-sm">cpm</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold">{stats.accuracy}</div>
        <div className="text-sm">%</div>
      </div>
    </div>
  )
} 