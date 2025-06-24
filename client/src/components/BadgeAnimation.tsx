import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '../types/game';
import { Shield, Award, Trophy } from 'lucide-react';

interface BadgeAnimationProps {
  badge: Badge;
  isVisible: boolean;
  onComplete: () => void;
}

const badgeIcons = {
  Shield,
  Sword: Award,
  Crown: Trophy
};

export default function BadgeAnimation({ badge, isVisible, onComplete }: BadgeAnimationProps) {
  const IconComponent = badgeIcons[badge.icon as keyof typeof badgeIcons] || Shield;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur"
        >
          <motion.div
            initial={{ y: -100, rotate: -180 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 20,
              delay: 0.2 
            }}
            className="text-center"
          >
            {/* Badge container */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
              }}
              className="relative mb-6"
            >
              {/* Glowing background */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity
                }}
                className="absolute inset-0 rounded-full blur-xl"
                style={{ backgroundColor: badge.color }}
              />
              
              {/* Badge */}
              <div
                className="relative w-32 h-32 rounded-full border-8 flex items-center justify-center"
                style={{ 
                  borderColor: badge.color,
                  backgroundColor: badge.color + '20'
                }}
              >
                <IconComponent 
                  className="w-16 h-16 text-white"
                />
              </div>
              
              {/* Sparkles */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    transformOrigin: '0 0'
                  }}
                  animate={{
                    x: [0, Math.cos(i * 45 * Math.PI / 180) * 80],
                    y: [0, Math.sin(i * 45 * Math.PI / 180) * 80],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                />
              ))}
            </motion.div>
            
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-white"
            >
              <h2 className="text-4xl font-bold mb-2">Badge Earned!</h2>
              <h3 className="text-2xl font-bold mb-2" style={{ color: badge.color }}>
                {badge.name}
              </h3>
              <p className="text-gray-300 max-w-md mx-auto">
                {badge.description}
              </p>
            </motion.div>
            
            {/* Continue button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onComplete}
              className="mt-8 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-xl font-bold text-lg transition-all"
            >
              Continue Adventure
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}