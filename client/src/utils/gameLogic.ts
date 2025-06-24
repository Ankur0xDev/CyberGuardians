import type { User, Badge, Level } from '../types/game';
import { badges } from '../data/gameData';

export function calculateBadges(user: User): Badge[] {
  const earnedBadges: Badge[] = [];
  const completedCount = user.completedLevels.length;

  badges.forEach((badge) => {
    if (completedCount >= badge.requirement) {
      earnedBadges.push(badge);
    }
  });

  return earnedBadges;
}

export function unlockNextLevel(levels: Level[], completedLevelId: number): Level[] {
  return levels.map((level) => {
    if (level.id === completedLevelId + 1) {
      return { ...level, isUnlocked: true };
    }
    return level;
  });
}

export function updateLevelCompletion(levels: Level[], levelId: number, score: number): Level[] {
  return levels.map((level) => {
    if (level.id === levelId) {
      return {
        ...level,
        isCompleted: true,
        bestScore: Math.max(level.bestScore, score)
      };
    }
    return level;
  });
}

export function generateRandomScenarios(scenarios: any[], count: number = 3) {
  const shuffled = [...scenarios].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function calculateFinalScore(correctAnswers: number, totalQuestions: number, timeBonus: number = 0): number {
  const baseScore = (correctAnswers / totalQuestions) * 100;
  return Math.round(baseScore + timeBonus);
}