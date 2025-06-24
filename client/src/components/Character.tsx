import React from 'react';
import { motion } from 'framer-motion';
import type { CharacterType } from '../types/game';
import { User, Bot, GraduationCap } from 'lucide-react';

interface CharacterProps {
  type: CharacterType;
  position: 'left' | 'center' | 'right';
  emotion: 'neutral' | 'thinking' | 'happy' | 'concerned' | 'confident';
  size?: 'small' | 'medium' | 'large';
}

const characterIcons = {
  student: GraduationCap,
  intern: User,
  cyberbot: Bot
};

const characterColors = {
  student: '#4F46E5',
  intern: '#059669',
  cyberbot: '#DC2626'
};

const emotionAnimations = {
  neutral: { scale: 1, rotate: 0 },
  thinking: { scale: 1.05, rotate: -2 },
  happy: { scale: 1.1, rotate: 5 },
  concerned: { scale: 0.95, rotate: -5 },
  confident: { scale: 1.15, rotate: 0 }
};

const positionClasses = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end'
};

const sizeClasses = {
  small: 'w-16 h-16',
  medium: 'w-24 h-24',
  large: 'w-32 h-32'
};

export default function Character({ type, position, emotion, size = 'medium' }: CharacterProps) {
  const IconComponent = characterIcons[type];
  const color = characterColors[type];

  return (
    <div className={`flex ${positionClasses[position]} mb-4`}>
      <motion.div
        animate={emotionAnimations[emotion]}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`${sizeClasses[size]} rounded-full border-4 flex items-center justify-center relative`}
        style={{ 
          borderColor: color,
          backgroundColor: color + '20'
        }}
      >
        <IconComponent 
          className={`${size === 'small' ? 'w-8 h-8' : size === 'large' ? 'w-16 h-16' : 'w-12 h-12'}`}
          style={{ color }}
        />
        
        {/* Emotion indicators */}
        {emotion === 'thinking' && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center"
          >
            <span className="text-xs">💭</span>
          </motion.div>
        )}
        
        {emotion === 'happy' && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
          >
            <span className="text-xs">😊</span>
          </motion.div>
        )}
        
        {emotion === 'concerned' && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center"
          >
            <span className="text-xs">🤔</span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}