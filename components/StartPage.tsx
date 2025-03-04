import { Settings, translations } from '@/types/settings'

interface StartPageProps {
  onStart: () => void
  settings: Settings
  onSettingsChange: (settings: Settings) => void
}

export default function StartPage({ onStart, settings, onSettingsChange }: StartPageProps) {
  const t = translations[settings.language]
  
  return (
    <div className={`min-h-screen ${
      settings.theme === 'dark' ? 'bg-[#282c34] text-[#abb2bf]' : 'bg-[#f5f5f5] text-[#2c2e31]'
    } flex flex-col items-center justify-center p-8`}>
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-mono font-bold mb-8">{t.title}</h1>
          <p className="text-lg mb-8 font-mono">
            {settings.language === 'en' 
              ? 'Test your coding typing speed'
              : 'Teste sua velocidade de digitação de código'}
          </p>
        </div>

        <div className={`p-6 rounded-lg mb-8 ${
          settings.theme === 'dark' ? 'bg-[#2c2e31]' : 'bg-white'
        }`}>
          <h2 className="font-mono font-bold mb-4">
            {settings.language === 'en' ? 'How it works:' : 'Como funciona:'}
          </h2>
          <ul className="space-y-2 font-mono text-sm">
            {Object.values(t.stats_explanation).map((explanation, index) => (
              <li key={index} className="flex items-start gap-2">
                <span>•</span>
                <span>{explanation}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center">
            <span className="font-mono">{t.language}</span>
            <select
              value={settings.language}
              onChange={(e) => onSettingsChange({ ...settings, language: e.target.value as 'en' | 'pt' })}
              className={`p-2 rounded font-mono ${
                settings.theme === 'dark' 
                  ? 'bg-[#2c2e31] text-[#abb2bf]' 
                  : 'bg-white text-[#2c2e31]'
              }`}
            >
              <option value="en">English</option>
              <option value="pt">Português</option>
            </select>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-mono">{t.theme}</span>
            <select
              value={settings.theme}
              onChange={(e) => onSettingsChange({ ...settings, theme: e.target.value as 'dark' | 'light' })}
              className={`p-2 rounded font-mono ${
                settings.theme === 'dark' 
                  ? 'bg-[#2c2e31] text-[#abb2bf]' 
                  : 'bg-white text-[#2c2e31]'
              }`}
            >
              <option value="dark">{t.dark}</option>
              <option value="light">{t.light}</option>
            </select>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-mono">{t.difficulty}</span>
            <select
              value={settings.difficulty}
              onChange={(e) => onSettingsChange({ ...settings, difficulty: e.target.value as 'Beginner' | 'Intermediate' | 'Advanced' })}
              className={`p-2 rounded font-mono ${
                settings.theme === 'dark' 
                  ? 'bg-[#2c2e31] text-[#abb2bf]' 
                  : 'bg-white text-[#2c2e31]'
              }`}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-mono">{t.programmingLanguage}</span>
            <select
              value={settings.programmingLanguage}
              onChange={(e) => onSettingsChange({ ...settings, programmingLanguage: e.target.value as 'JavaScript' | 'Python' | 'Java' | 'SQL' | 'TypeScript' })}
              className={`p-2 rounded font-mono ${
                settings.theme === 'dark' 
                  ? 'bg-[#2c2e31] text-[#abb2bf]' 
                  : 'bg-white text-[#2c2e31]'
              }`}
            >
              <option value="JavaScript">JavaScript</option>
              <option value="TypeScript">TypeScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="SQL">SQL</option>
            </select>
          </div>
        </div>

        <button
          onClick={onStart}
          className={`w-full p-4 rounded font-mono text-lg ${
            settings.theme === 'dark'
              ? 'bg-[#e2b714] text-[#282c34] hover:bg-[#d4a90f]'
              : 'bg-[#2c2e31] text-white hover:bg-[#3a3c3f]'
          } transition-colors`}
        >
          {t.start}
        </button>
      </div>
    </div>
  )
} 