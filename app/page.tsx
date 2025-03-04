'use client'

import { useState } from 'react'
import TypingTest from '@/components/TypingTest'
import type { Language, Theme } from '@/types/settings'
import { translations } from '@/types/settings'
import { MoonIcon, SunIcon, PlayIcon } from '@heroicons/react/24/outline'
import { Translation } from './types/settings'

type ProgrammingLanguage = 'JavaScript' | 'Python' | 'Java' | 'SQL' | 'TypeScript'

interface Settings {
  language: Language
  theme: Theme
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  programmingLanguage: ProgrammingLanguage
}

export default function Home() {
  const [settings, setSettings] = useState<Settings>({
    language: 'en',
    theme: 'dark',
    difficulty: 'Beginner',
    programmingLanguage: 'JavaScript'
  })
  const [started, setStarted] = useState(false)
  const t = translations[settings.language] as unknown as Translation

  const instructions = settings.language === 'en' ? [
    'Select your preferred language',
    'Choose a programming language to practice',
    'Click Start Typing to begin the test',
    'Type the code exactly as shown to measure your speed and accuracy'
  ] : [
    'Selecione seu idioma preferido',
    'Escolha uma linguagem de programação para praticar',
    'Clique em Começar para iniciar o teste',
    'Digite o código exatamente como mostrado para medir sua velocidade e precisão'
  ]

  if (started) {
    return <TypingTest settings={settings} onBack={() => setStarted(false)} />
  }

  return (
    <main className={`min-h-screen ${settings.theme === 'dark' ? 'bg-[#323437] text-[#d1d0c5]' : 'bg-white text-gray-900'}`}>
      {/* Header with theme toggle */}
      <div className="fixed top-0 right-0 p-4">
        <button
          onClick={() => setSettings(prev => ({ ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' }))}
          className={`p-2 rounded-lg opacity-50 hover:opacity-100 transition-opacity`}
          aria-label={settings.theme === 'dark' ? t.settings.light : t.settings.dark}
        >
          {settings.theme === 'dark' ? (
            <SunIcon className="w-5 h-5" />
          ) : (
            <MoonIcon className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Main content */}
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
            <p className="text-lg mb-6 opacity-75">{t.subtitle}</p>
            <div className="text-sm space-y-2 max-w-sm mx-auto opacity-50">
              {instructions.map((instruction, index) => (
                <p key={index}>{index + 1}. {instruction}</p>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4">
              <select 
                className={`flex-1 ${settings.theme === 'dark' 
                  ? 'bg-[#2c2e31] text-[#e2b714] border-gray-600' 
                  : 'bg-white text-gray-900 border-gray-300'} 
                  rounded p-2 border focus:outline-none focus:ring-2 focus:ring-[#e2b714]`}
                value={settings.language}
                onChange={e => setSettings(prev => ({ ...prev, language: e.target.value as Language }))}
              >
                <option value="en">English</option>
                <option value="pt">Português</option>
              </select>

              <select 
                className={`flex-1 ${settings.theme === 'dark' 
                  ? 'bg-[#2c2e31] text-[#e2b714] border-gray-600' 
                  : 'bg-white text-gray-900 border-gray-300'} 
                  rounded p-2 border focus:outline-none focus:ring-2 focus:ring-[#e2b714]`}
                value={settings.programmingLanguage}
                onChange={e => setSettings(prev => ({ ...prev, programmingLanguage: e.target.value as ProgrammingLanguage }))}
              >
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="SQL">SQL</option>
                <option value="TypeScript">TypeScript</option>
              </select>
            </div>

            <button
              onClick={() => setStarted(true)}
              className="w-full bg-[#e2b714] text-[#2c2e31] font-bold py-3 rounded hover:bg-[#e2b714]/90 transition-colors flex items-center justify-center gap-2"
            >
              <PlayIcon className="w-5 h-5" />
              {t.startTyping}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
