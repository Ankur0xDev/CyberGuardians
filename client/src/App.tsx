import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CharacterSelect from './components/CharacterSelect';
import GameDashboard from './components/GameDashboard';
import LevelSelection from './components/LevelSelection';
import LevelIntro from './components/LevelIntro';
import ScenarioGame from './components/ScenarioGame';
import TipsModal from './components/TipsModel'
import BadgeAnimation from './components/BadgeAnimation';
import type { GameState, Level, Badge, CharacterType } from './types/game';
import { badges, levels as initialLevels } from './data/gameData';
import { scenariosByLevel } from './data/scenarios';
import { calculateBadges, unlockNextLevel, updateLevelCompletion } from './utils/gameLogic';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    user: {
      id: '1',
      name: 'CyberGuardian',
      totalScore: 0,
      badges: [],
      completedLevels: [],
      currentLevel: 1,
      selectedCharacter: 'student'
    },
    currentLevel: null,
    currentScenario: null,
    score: 0,
    lives: 3,
    showTips: false,
    gamePhase: 'character-select',
    showDialogue: false,
    currentDialogue: [],
    dialogueIndex: 0
  });

  const [levels, setLevels] = useState<Level[]>([]);
  const [newBadge, setNewBadge] = useState<Badge | null>(null);
  const [showBadgeAnimation, setShowBadgeAnimation] = useState(false);

  useEffect(() => {
    // Initialize levels with scenarios
    const levelsWithScenarios = initialLevels.map(level => ({
      ...level,
      scenarios: scenariosByLevel[level.id] || []
    }));
    setLevels(levelsWithScenarios);
  }, []);

  useEffect(() => {
    // Check for new badges when levels change
    const earnedBadges = calculateBadges(gameState.user, levels);
    const newEarnedBadge = earnedBadges.find(badge => 
      !gameState.user.badges.some(userBadge => userBadge.id === badge.id)
    );

    if (newEarnedBadge) {
      setNewBadge(newEarnedBadge);
      setShowBadgeAnimation(true);
    }

    setGameState(prev => ({
      ...prev,
      user: {
        ...prev.user,
        badges: earnedBadges
      }
    }));
  }, [gameState.user.completedLevels, levels]);

  const handleSelectCharacter = (character: CharacterType) => {
    setGameState(prev => ({
      ...prev,
      user: {
        ...prev.user,
        selectedCharacter: character
      },
      gamePhase: 'dashboard'
    }));
  };

  const handleStartGame = () => {
    setGameState(prev => ({ ...prev, gamePhase: 'level-select' }));
  };

  const handleSelectLevel = (level: Level) => {
    setGameState(prev => ({
      ...prev,
      currentLevel: level,
      gamePhase: 'level-intro',
      score: 0,
      lives: 3
    }));
  };

  const handleLevelIntroComplete = () => {
    setGameState(prev => ({ ...prev, gamePhase: 'playing' }));
  };

  const handleLevelComplete = (score: number) => {
    if (!gameState.currentLevel) return;

    const levelId = gameState.currentLevel.id;
    
    // Update levels
    const updatedLevels = updateLevelCompletion(levels, levelId, score);
    const unlockedLevels = unlockNextLevel(updatedLevels, levelId);
    setLevels(unlockedLevels);

    // Update user
    const newCompletedLevels = [...gameState.user.completedLevels];
    if (!newCompletedLevels.includes(levelId)) {
      newCompletedLevels.push(levelId);
    }

    setGameState(prev => ({
      ...prev,
      user: {
        ...prev.user,
        totalScore: prev.user.totalScore + score,
        completedLevels: newCompletedLevels,
        currentLevel: Math.max(prev.user.currentLevel, levelId + 1)
      },
      gamePhase: 'level-select',
      currentLevel: null
    }));
  };

  const handleBackToDashboard = () => {
    setGameState(prev => ({
      ...prev,
      gamePhase: 'dashboard',
      currentLevel: null
    }));
  };

  const handleBackToLevels = () => {
    setGameState(prev => ({
      ...prev,
      gamePhase: 'level-select',
      currentLevel: null
    }));
  };

  const handleShowTips = () => {
    setGameState(prev => ({ ...prev, showTips: true }));
  };

  const handleCloseTips = () => {
    setGameState(prev => ({ ...prev, showTips: false }));
  };

  const handleBadgeAnimationComplete = () => {
    setShowBadgeAnimation(false);
    setNewBadge(null);
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {gameState.gamePhase === 'character-select' && (
          <motion.div
            key="character-select"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CharacterSelect onSelectCharacter={handleSelectCharacter} />
          </motion.div>
        )}

        {gameState.gamePhase === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GameDashboard
              user={gameState.user}
              badges={badges}
              onStartGame={handleStartGame}
              onShowTips={handleShowTips}
            />
          </motion.div>
        )}

        {gameState.gamePhase === 'level-select' && (
          <motion.div
            key="level-select"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LevelSelection
              levels={levels}
              onSelectLevel={handleSelectLevel}
              onBack={handleBackToDashboard}
            />
          </motion.div>
        )}

        {gameState.gamePhase === 'level-intro' && gameState.currentLevel && (
          <motion.div
            key="level-intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LevelIntro
              level={gameState.currentLevel}
              characterType={gameState.user.selectedCharacter}
              onComplete={handleLevelIntroComplete}
            />
          </motion.div>
        )}

        {gameState.gamePhase === 'playing' && gameState.currentLevel && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ScenarioGame
              level={gameState.currentLevel}
              characterType={gameState.user.selectedCharacter}
              onComplete={handleLevelComplete}
              onBack={handleBackToLevels}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <TipsModal
        isOpen={gameState.showTips}
        onClose={handleCloseTips}
      />

      {newBadge && (
        <BadgeAnimation
          badge={newBadge}
          isVisible={showBadgeAnimation}
          onComplete={handleBadgeAnimationComplete}
        />
      )}
    </div>
  );
}

export default App;