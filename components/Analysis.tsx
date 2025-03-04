import { DetailedStats } from '@/types/types'
import { Language } from '@/types/settings'

interface AnalysisProps {
  stats: DetailedStats
  onRestart: () => void
  language: Language
}

export default function Analysis({ stats, onRestart, language }: AnalysisProps) {
  const t = language === 'en' ? {
    restart: 'Restart',
    stats: 'Test Results',
    descriptions: {
      wpm: 'Words per minute - Number of words typed correctly',
      raw: 'Raw WPM - Total typing speed without error penalty',
      accuracy: 'Accuracy - Percentage of correct keystrokes',
      time: 'Time - Total test duration',
      keystrokes: 'Keystrokes - Total keys pressed',
      correct: 'Correct - Number of correct keystrokes',
      incorrect: 'Incorrect - Number of incorrect keystrokes',
    }
  } : {
    restart: 'Recomeçar',
    stats: 'Resultados do Teste',
    descriptions: {
      wpm: 'Palavras por minuto - Número de palavras digitadas corretamente',
      raw: 'WPM bruto - Velocidade total sem penalidade de erros',
      accuracy: 'Precisão - Porcentagem de teclas corretas',
      time: 'Tempo - Duração total do teste',
      keystrokes: 'Teclas - Total de teclas pressionadas',
      correct: 'Corretas - Número de teclas corretas',
      incorrect: 'Incorretas - Número de teclas incorretas',
    }
  }

  return (
    <div className="bg-[#2c2e31] rounded-lg p-8 shadow-lg">
      <h2 className="text-2xl font-light text-[#d1d0c5] mb-8 text-center">{t.stats}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <StatItem
            label="wpm"
            value={stats.netWpm}
            description={t.descriptions.wpm}
            highlight
          />
          <StatItem
            label="raw"
            value={stats.rawWpm}
            description={t.descriptions.raw}
          />
          <StatItem
            label="accuracy"
            value={`${stats.accuracy}%`}
            description={t.descriptions.accuracy}
            highlight
          />
          <StatItem
            label="time"
            value={`${stats.timeElapsed}s`}
            description={t.descriptions.time}
          />
        </div>
        
        <div className="space-y-6">
          <StatItem
            label="keystrokes"
            value={stats.totalKeystrokes}
            description={t.descriptions.keystrokes}
          />
          <StatItem
            label="correct"
            value={stats.correctKeystrokes}
            description={t.descriptions.correct}
            good
          />
          <StatItem
            label="incorrect"
            value={stats.incorrectKeystrokes}
            description={t.descriptions.incorrect}
            error
          />
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <button
          onClick={onRestart}
          className="bg-[#e2b714] text-[#2c2e31] px-8 py-3 rounded font-medium hover:bg-[#e2b714]/90 transition-colors"
        >
          {t.restart}
        </button>
      </div>
    </div>
  )
}

function StatItem({ 
  label, 
  value, 
  description,
  highlight = false,
  good = false,
  error = false
}: { 
  label: string
  value: number | string
  description: string
  highlight?: boolean
  good?: boolean
  error?: boolean
}) {
  return (
    <div className="group relative bg-[#232528] rounded p-4 hover:bg-[#2a2c30] transition-colors">
      <div className="flex items-baseline justify-between">
        <span className="text-[#646669] text-sm uppercase tracking-wider">{label}</span>
        <span className={`text-2xl font-light ${
          highlight ? 'text-[#e2b714]' :
          good ? 'text-[#4caf50]' :
          error ? 'text-[#f44336]' :
          'text-[#d1d0c5]'
        }`}>{value}</span>
      </div>
      <div className="mt-2 text-sm text-[#646669]">{description}</div>
    </div>
  )
} 