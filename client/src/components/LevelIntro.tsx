import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Level, CharacterType } from '../types/game';
import Character from './Character';
import DialogueBox from './DialogueBox';
import SceneBackground from './SceneBackground';

interface LevelIntroProps {
  level: Level;
  characterType: CharacterType;
  onComplete: () => void;
}

export default function LevelIntro({ level, characterType, onComplete }: LevelIntroProps) {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [showDialogue, setShowDialogue] = useState(true);

  const handleNextDialogue = () => {
    if (dialogueIndex < level.introDialogue.length - 1) {
      setDialogueIndex(prev => prev + 1);
    } else {
      setShowDialogue(false);
      setTimeout(onComplete, 500);
    }
  };

  const handleSkipDialogue = () => {
    setShowDialogue(false);
    setTimeout(onComplete, 500);
  };

  return (
    <SceneBackground sceneType={level.sceneType}>
      <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">{level.title}</h1>
          <p className="text-xl text-gray-300">{level.description}</p>
        </motion.div>

        <div className="flex justify-center mb-8">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Character 
              type={characterType} 
              position="center" 
              emotion="confident"
              size="large"
            />
          </motion.div>
        </div>

        <DialogueBox
          text={level.introDialogue[dialogueIndex]}
          isVisible={showDialogue}
          onNext={handleNextDialogue}
          onSkip={handleSkipDialogue}
        />
      </div>
    </SceneBackground>
  );
}