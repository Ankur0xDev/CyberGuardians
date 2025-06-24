export interface User {
  id: string;
  name: string;
  totalScore: number;
  badges: Badge[];
  completedLevels: number[];
  currentLevel: number;
  selectedCharacter: CharacterType;
}

export interface Badge {
  id: string;
  name: 'Survivor' | 'Warrior' | 'King';
  description: string;
  icon: string;
  color: string;
  requirement: number;
}

export interface Level {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  scenarios: Scenario[];
  isUnlocked: boolean;
  isCompleted: boolean;
  bestScore: number;
  sceneType: SceneType;
  introDialogue: string[];
  completionDialogue: string[];
}

export interface Scenario {
  id: string;
  type: 'email' | 'website' | 'message' | 'download' | 'social' | 'network';
  content: {
    subject?: string;
    sender?: string;
    body?: string;
    url?: string;
    siteName?: string;
    message?: string;
    filename?: string;
    platform?: string;
  };
  options: Option[];
  correctAnswer: string;
  explanation: string;
  points: number;
  characterThought?: string;
}

export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface GameState {
  user: User;
  currentLevel: Level | null;
  currentScenario: Scenario | null;
  score: number;
  lives: number;
  showTips: boolean;
  gamePhase: 'character-select' | 'dashboard' | 'level-select' | 'level-intro' | 'playing' | 'complete';
  showDialogue: boolean;
  currentDialogue: string[];
  dialogueIndex: number;
}

export type CharacterType = 'student' | 'intern' | 'cyberbot';

export type SceneType = 'office' | 'lab' | 'terminal' | 'home' | 'cafe' | 'server-room' | 'control-center';