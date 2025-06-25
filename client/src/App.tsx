import   { useState, useEffect } from 'react';
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

const LOCAL_STORAGE_KEY = 'cyberGuardiansGameState';
const LOCAL_STORAGE_LEVELS_KEY = 'cyberGuardiansLevels';
const LOCAL_STORAGE_TIMESTAMP_KEY = 'cyberGuardiansTimestamp';
const EXPIRY_DAYS = 7;
const MS_IN_DAY = 24 * 60 * 60 * 1000;
 
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
    // Load state from localStorage on mount
    const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    const savedLevels = localStorage.getItem(LOCAL_STORAGE_LEVELS_KEY);
    const savedTimestamp = localStorage.getItem(LOCAL_STORAGE_TIMESTAMP_KEY);
    const now = Date.now();
    if (savedState && savedLevels && savedTimestamp) {
      const age = now - parseInt(savedTimestamp, 10);
      if (age < EXPIRY_DAYS * MS_IN_DAY) {
        try {
          setGameState(JSON.parse(savedState));
          setLevels(JSON.parse(savedLevels));
          return;
        } catch (e) {
          // Fallback to default if parsing fails
        }
      } else {
        // Expired, clear old data
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        localStorage.removeItem(LOCAL_STORAGE_LEVELS_KEY);
        localStorage.removeItem(LOCAL_STORAGE_TIMESTAMP_KEY);
      }
    }
    // If no valid saved state, initialize levels as before
    const levelsWithScenarios = initialLevels.map(level => ({
      ...level,
      scenarios: scenariosByLevel[level.id] || []
    }));
    setLevels(levelsWithScenarios);
  }, []);

  useEffect(() => {
    // Save state to localStorage on relevant changes
    if (levels.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(gameState));
      localStorage.setItem(LOCAL_STORAGE_LEVELS_KEY, JSON.stringify(levels));
      localStorage.setItem(LOCAL_STORAGE_TIMESTAMP_KEY, Date.now().toString());
    }
  }, [gameState, levels]);

  useEffect(() => {
    // Check for new badges when levels change
    const earnedBadges = calculateBadges(gameState.user);
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