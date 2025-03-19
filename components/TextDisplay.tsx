import { Theme } from '@/types/settings'

interface TextDisplayProps {
  text: string
  inputValue: string
}

export default function TextDisplay({ text, inputValue }: TextDisplayProps) {
  return (
    <div className="font-mono text-lg leading-relaxed whitespace-pre-wrap select-none">
      {text.split('').map((char, i) => {
        const isTyped = i < inputValue.length
        const isCorrect = isTyped && char === inputValue[i]
        const isWrong = isTyped && char !== inputValue[i]
        const isCurrent = i === inputValue.length

        return (
          <span
            key={i}
            className={`
              ${isTyped && isCorrect ? 'text-green-400' : ''}
              ${isTyped && isWrong ? 'text-red-400' : ''}
              ${!isTyped ? 'text-gray-500' : ''}
              ${isCurrent ? 'bg-[#e2b714] text-[#2c2e31]' : ''}
            `}
          >
            {char}
          </span>
        )
      })}
    </div>
  )
}