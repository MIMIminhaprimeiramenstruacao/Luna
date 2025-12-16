export enum Screen {
  HOME = 'HOME',
  LEARN = 'LEARN',
  CALENDAR = 'CALENDAR',
  JOURNAL = 'JOURNAL',
  CHAT = 'CHAT',
  QUIZ = 'QUIZ'
}

export interface Note {
  id: string;
  date: string;
  content: string;
  mood: string;
}

export type FlowLevel = 'light' | 'medium' | 'heavy';

export interface DayLog {
  hasPeriod: boolean;
  flow?: FlowLevel;
  hadCramps?: boolean;
}

export interface CalendarDay {
  date: string; // ISO date string YYYY-MM-DD
  isPeriod: boolean;
  flowLevel?: 'light' | 'medium' | 'heavy';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface Reminder {
  id: string;
  label: string;
  type: 'water' | 'pad' | 'mood' | 'journal' | 'quiz';
  active: boolean;
  lastChecked?: number;
}

export enum Emotion {
  HAPPY = '😊',
  SAD = '😢',
  TIRED = '😴',
  ANXIOUS = '😰',
  ANGRY = '😠',
  CALM = '😌'
}