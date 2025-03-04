export type Language = 'en' | 'pt'
export type Theme = 'light' | 'dark'
export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced'

export interface TranslationSettings {
  language: string
  theme: string
  dark: string
  light: string
  difficulty: string
  beginner: 'Beginner' | 'Iniciante'
  intermediate: 'Intermediate' | 'Intermediário'
  advanced: 'Advanced' | 'Avançado'
  programmingLanguage: string
}

export interface TranslationAnalysis {
  title: string
  rawWpm: string
  netWpm: string
  accuracy: string
  time: string
}

export interface Translation {
  title: string
  subtitle: string
  wpm: string
  cpm: string
  accuracy: string
  time: string
  completed: string
  placeholder: string
  back: string
  tryAgain: string
  startTyping: string
  settings: TranslationSettings
  analysis: TranslationAnalysis
}

export const translations: Record<Language, Translation> = {
  en: {
    title: 'CodeType',
    subtitle: 'Test your coding typing speed',
    wpm: 'WPM',
    cpm: 'CPM',
    accuracy: 'Accuracy',
    time: 'Time',
    completed: 'completed',
    placeholder: 'Start typing...',
    back: '← Back',
    tryAgain: 'Try Again',
    startTyping: 'Start Typing',
    settings: {
      language: 'Language',
      theme: 'Theme',
      dark: 'Dark',
      light: 'Light',
      difficulty: 'Difficulty',
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
      programmingLanguage: 'Programming Language'
    },
    analysis: {
      title: 'Analysis',
      rawWpm: 'Raw WPM',
      netWpm: 'Net WPM',
      accuracy: 'Accuracy',
      time: 'Time'
    }
  },
  pt: {
    title: 'CodeType',
    subtitle: 'Teste sua velocidade de digitação de código',
    wpm: 'PPM',
    cpm: 'CPM',
    accuracy: 'Precisão',
    time: 'Tempo',
    completed: 'completado',
    placeholder: 'Comece a digitar...',
    back: '← Voltar',
    tryAgain: 'Tentar Novamente',
    startTyping: 'Começar',
    settings: {
      language: 'Idioma',
      theme: 'Tema',
      dark: 'Escuro',
      light: 'Claro',
      difficulty: 'Dificuldade',
      beginner: 'Iniciante',
      intermediate: 'Intermediário',
      advanced: 'Avançado',
      programmingLanguage: 'Linguagem de Programação'
    },
    analysis: {
      title: 'Análise',
      rawWpm: 'PPM Bruto',
      netWpm: 'PPM Líquido',
      accuracy: 'Precisão',
      time: 'Tempo'
    }
  }
} 