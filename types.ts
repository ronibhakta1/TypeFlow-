
export interface TypingStats {
  wpm: number;
  rawWpm: number;
  accuracy: number;
  errors: number;
  charsTyped: number;
  timeElapsed: number;
}

export interface HistoryResult {
  id: string;
  timestamp: number;
  wpm: number;
  accuracy: number;
  rawWpm: number;
  category: LessonCategory;
  missedChars: Record<string, number>;
}

export type TypingMode = 'time' | 'words' | 'quote' | 'zen';
export type LessonCategory = 'Standard' | 'Coding' | 'Literature';

export interface Lesson {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: LessonCategory;
  description?: string;
  text: string;
}

export enum GameState {
  IDLE = 'IDLE',
  TYPING = 'TYPING',
  FINISHED = 'FINISHED'
}
