export type Language = 'en' | 'pt'
export type Theme = 'dark' | 'light'
export type ProgrammingLanguage = 'JavaScript' | 'Python' | 'Java' | 'SQL' | 'TypeScript'
export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced'

export interface Settings {
  language: Language
  theme: Theme
  difficulty: Difficulty
  programmingLanguage: ProgrammingLanguage
}

export const translations = {
  en: {
    title: 'CodeType',
    start: 'Start Typing',
    settings: 'Settings',
    language: 'Language',
    theme: 'Theme',
    dark: 'Dark',
    light: 'Light',
    difficulty: 'Difficulty',
    programmingLanguage: 'Programming Language',
    wpm: 'WPM (Words Per Minute)',
    cpm: 'CPM (Characters Per Minute)',
    accuracy: 'Accuracy',
    completed: 'Snippets Completed',
    tryAgain: 'Try Again',
    placeholder: 'Start typing code...',
    stats_explanation: {
      wpm: 'Words Per Minute - Measures typing speed',
      accuracy: 'Accuracy - Percentage of correct keystrokes',
      time: 'Time - Complete snippets to add 15 seconds',
      completed: 'Progress - Number of code snippets completed'
    }
  },
  pt: {
    title: 'CodeType',
    start: 'Começar a Digitar',
    settings: 'Configurações',
    language: 'Idioma',
    theme: 'Tema',
    dark: 'Escuro',
    light: 'Claro',
    difficulty: 'Dificuldade',
    programmingLanguage: 'Linguagem de Programação',
    wpm: 'PPM (Palavras Por Minuto)',
    cpm: 'CPM (Caracteres Por Minuto)',
    accuracy: 'Precisão',
    completed: 'Trechos Completados',
    tryAgain: 'Tentar Novamente',
    placeholder: 'Comece a digitar código...',
    stats_explanation: {
      wpm: 'Palavras Por Minuto - Mede a velocidade de digitação',
      accuracy: 'Precisão - Porcentagem de teclas corretas',
      time: 'Tempo - Complete trechos para ganhar 15 segundos',
      completed: 'Progresso - Número de trechos de código completados'
    }
  }
} 