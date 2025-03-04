export interface DetailedStats {
  totalKeystrokes: number;
  correctKeystrokes: number;
  incorrectKeystrokes: number;
  mistakesByCharacter: Record<string, number>;
  timeElapsed: number;
  rawWpm: number;
  netWpm: number;
  accuracy: number;
}

export interface Ranking {
  id: string;
  username: string;
  wpm: number;
  accuracy: number;
  timestamp: Date;
}

export interface TestResult {
  id: string;
  wpm: number;
  accuracy: number;
  timestamp: Date;
  programmingLanguage: string;
  difficulty: string;
}

export interface UserStats {
  wpm: number
  accuracy: number
  totalTime: number
  completedTests: number
}