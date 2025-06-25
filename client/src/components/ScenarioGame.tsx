import  { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type{  Level, CharacterType } from '../types/game';
import { Heart, Shield, AlertTriangle, CheckCircle, X } from 'lucide-react';
import Character from './Character';
import DialogueBox from './DialogueBox';
import SceneBackground from './SceneBackground';
import ThreatPopup from './ThreatPopup';

interface ScenarioGameProps {
  level: Level;
  characterType: CharacterType;
  onComplete: (score: number) => void;
  onBack: () => void;
}

export default function ScenarioGame({ level, characterType, onComplete, onBack }: ScenarioGameProps) {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [scenarios, setScenarios] = useState(level.scenarios);
  const [showThreatPopup, setShowThreatPopup] = useState(false);
  const [characterEmotion, setCharacterEmotion] = useState<'neutral' | 'thinking' | 'happy' | 'concerned' | 'confident'>('neutral');
  const [showCharacterThought, setShowCharacterThought] = useState(false);

  useEffect(() => {
    // Shuffle scenarios for randomization
    const shuffled = [...level.scenarios].sort(() => Math.random() - 0.5);
    setScenarios(shuffled);
  }, [level]);

  useEffect(() => {
    // Show threat popup when scenario loads
    if (currentScenario) {
      setShowThreatPopup(true);
      setCharacterEmotion('thinking');
      
      // Show character thought after a delay
      setTimeout(() => {
        setShowCharacterThought(true);
      }, 1000);
      
      // Hide threat popup after some time
      setTimeout(() => {
        setShowThreatPopup(false);
      }, 3000);
    }
  }, [currentScenarioIndex]);

  const currentScenario = scenarios[currentScenarioIndex];

  const handleAnswerSelect = (optionId: string) => {
    setSelectedAnswer(optionId);
    setShowExplanation(true);
    setShowCharacterThought(false);

    const isCorrect = optionId === currentScenario.correctAnswer;
    
    if (isCorrect) {
      setScore(prev => prev + currentScenario.points);
      setCharacterEmotion('happy');
    } else {
      setLives(prev => prev - 1);
      setCharacterEmotion('concerned');
    }

    // Auto-advance after showing explanation
    setTimeout(() => {
      if (currentScenarioIndex < scenarios.length - 1) {
        setCurrentScenarioIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setCharacterEmotion('neutral');
      } else {
        setGameCompleted(true);
        setCharacterEmotion('confident');
      }
    }, 3000);
  };

  const handleRetry = () => {
    // Reshuffle scenarios for retry
    const shuffled = [...level.scenarios].sort(() => Math.random() - 0.5);
    setScenarios(shuffled);
    setCurrentScenarioIndex(0);
    setScore(0);
    setLives(3);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setGameCompleted(false);
    setCharacterEmotion('neutral');
    setShowCharacterThought(false);
  };

  if (lives === 0 && !gameCompleted) {
    return (
      <SceneBackground sceneType={level.sceneType}>
        <div className="min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-8 bg-gray-800/50 rounded-xl border border-red-500 max-w-md"
          >
            <Character type={characterType} position="center" emotion="concerned" size="large" />
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4 text-white">Mission Failed</h2>
            <p className="text-gray-300 mb-6">Don't worry! Learning from mistakes makes you stronger.</p>
            <p className="text-lg mb-8 text-white">Final Score: <span className="text-cyan-400 font-bold">{score}</span></p>
            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRetry}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-bold transition-all"
              >
                Try Again
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBack}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg font-bold transition-colors"
              >
                Back to Levels
              </motion.button>
            </div>
          </motion.div>
        </div>
      </SceneBackground>
    );
  }

  if (gameCompleted) {
    const isPerfectScore = score === scenarios.length * 100;
    return (
      <SceneBackground sceneType={level.sceneType}>
        <div className="min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-8 bg-gray-800/50 rounded-xl border border-green-500 max-w-md"
          >
            <Character type={characterType} position="center" emotion="happy" size="large" />
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4 text-white">Mission Complete!</h2>
            <p className="text-gray-300 mb-6">
              {isPerfectScore ? 'Perfect score! You\'re a true CyberGuardian!' : 'Well done! You\'ve strengthened your cyber defenses.'}
            </p>
            <p className="text-2xl mb-8 text-white">Final Score: <span className="text-cyan-400 font-bold">{score}</span></p>
            <div className="flex gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onComplete(score)}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-cyan-600 hover:from-green-600 hover:to-cyan-700 rounded-lg font-bold transition-all"
              >
                Continue
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRetry}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-lg font-bold transition-all"
              >
                Play Again
              </motion.button>
            </div>
          </motion.div>
        </div>
      </SceneBackground>
    );
  }

  return (
    <SceneBackground sceneType={level.sceneType}>
      <div className="container mx-auto px-4 py-8 min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            ← Back
          </motion.button>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" />
              <span className="font-bold text-white">{score} pts</span>
            </div>
            
            <div className="flex gap-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <Heart
                  key={i}
                  className={`w-6 h-6 ${
                    i < lives ? 'text-red-500 fill-red-500' : 'text-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Character */}
        <div className="flex justify-center mb-6">
          <Character 
            type={characterType} 
            position="center" 
            emotion={characterEmotion}
            size="medium"
          />
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2 text-white">
            <span>{level.title}</span>
            <span>{currentScenarioIndex + 1} / {scenarios.length}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentScenarioIndex + 1) / scenarios.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Scenario */}
        <motion.div
          key={currentScenarioIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gray-800/50 rounded-xl p-8 mb-8 border border-gray-700">
            {currentScenario.type === 'email' && (
              <div className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 border-l-4 border-red-500">
                  <div className="text-sm text-gray-400 mb-2">From: {currentScenario.content.sender}</div>
                  <div className="font-bold mb-3 text-white">Subject: {currentScenario.content.subject}</div>
                  <div className="text-gray-200">{currentScenario.content.body}</div>
                </div>
              </div>
            )}

            {currentScenario.type === 'website' && (
              <div className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 border border-yellow-500">
                  <div className="text-sm text-gray-400 mb-2">Website URL:</div>
                  <div className="font-mono text-yellow-400 text-lg mb-4">{currentScenario.content.url}</div>
                  <div className="text-center p-8 bg-blue-900/30 rounded border-2 border-blue-500">
                    <h3 className="text-2xl font-bold text-blue-400">{currentScenario.content.siteName}</h3>
                    <p className="text-gray-300 mt-2">Login to your account</p>
                  </div>
                </div>
              </div>
            )}

            {currentScenario.type === 'message' && (
              <div className="text-center p-6">
                <h3 className="text-2xl font-bold mb-4 text-white">{currentScenario.content.message}</h3>
              </div>
            )}

            {currentScenario.type === 'download' && (
              <div className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 border border-purple-500">
                  <div className="text-sm text-gray-400 mb-2">Download File:</div>
                  <div className="font-mono text-purple-400 text-lg mb-4">{currentScenario.content.filename}</div>
                  <div className="text-gray-200">{currentScenario.content.message}</div>
                </div>
              </div>
            )}

            {currentScenario.type === 'social' && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-pink-900/30 to-purple-900/30 rounded-lg p-4 border border-pink-500">
                  <div className="text-sm text-gray-400 mb-2">{currentScenario.content.platform}</div>
                  <div className="text-gray-200">{currentScenario.content.message}</div>
                </div>
              </div>
            )}
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentScenario.options.map((option, index) => {
              const isSelected = selectedAnswer === option.id;
              const isCorrect = option.isCorrect;
              const showResult = showExplanation && isSelected;

              return (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={!showExplanation ? { scale: 1.02 } : {}}
                  whileTap={!showExplanation ? { scale: 0.98 } : {}}
                  onClick={() => !showExplanation && handleAnswerSelect(option.id)}
                  disabled={showExplanation}
                  className={`p-6 rounded-xl border-2 text-left transition-all duration-300 ${
                    showResult
                      ? isCorrect
                        ? 'border-green-500 bg-green-900/30'
                        : 'border-red-500 bg-red-900/30'
                      : isSelected
                      ? 'border-cyan-500 bg-cyan-900/30'
                      : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
                  } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center gap-3">
                    {showResult && (
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        isCorrect ? 'bg-green-500' : 'bg-red-500'
                      }`}>
                        {isCorrect ? <CheckCircle className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      </div>
                    )}
                    <span className="font-medium text-white">{option.text}</span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8 p-6 bg-blue-900/30 rounded-xl border border-blue-500"
              >
                <h4 className="font-bold text-lg mb-2 text-white">Explanation</h4>
                <p className="text-gray-200">{currentScenario.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Threat Popup */}
        <ThreatPopup
          type={currentScenario.type}
          isVisible={showThreatPopup}
          title="Cyber Threat Detected!"
          description="Analyze this scenario carefully and choose the safest response."
        />

        {/* Character Thought */}
        <DialogueBox
          text={currentScenario.characterThought || "Let me think about this carefully..."}
          isVisible={showCharacterThought}
          showControls={false}
        />
      </div>
    </SceneBackground>
  );
}