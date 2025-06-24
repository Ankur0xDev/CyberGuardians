import React from 'react';
import { motion } from 'framer-motion';
import type  { CharacterType } from '../types/game'
import { User, Bot, GraduationCap } from 'lucide-react';

interface CharacterSelectProps {
  onSelectCharacter: (character: CharacterType) => void;
}

const characters = [
  {
    type: 'student' as CharacterType,
    name: 'Alex the Student',
    description: 'A curious student learning cybersecurity',
    icon: GraduationCap,
    color: '#4F46E5'
  },
  {
    type: 'intern' as CharacterType,
    name: 'Sam the Intern',
    description: 'A tech intern protecting the company',
    icon: User,
    color: '#059669'
  },
  {
    type: 'cyberbot' as CharacterType,
    name: 'CyberBot',
    description: 'An AI guardian of digital security',
    icon: Bot,
    color: '#DC2626'
  }
];

export default function CharacterSelect({ onSelectCharacter }: CharacterSelectProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl mx-auto px-4"
      >
        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
        >
          Choose Your Guardian
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-xl text-gray-300 mb-12"
        >
          Select your character to begin your cybersecurity adventure
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {characters.map((character, index) => {
            const IconComponent = character.icon;
            return (
              <motion.div
                key={character.type}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.2, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelectCharacter(character.type)}
                className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-8 cursor-pointer hover:border-cyan-500 transition-all duration-300"
              >
                <div
                  className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center border-4"
                  style={{ 
                    borderColor: character.color,
                    backgroundColor: character.color + '20'
                  }}
                >
                  <IconComponent 
                    className="w-12 h-12" 
                    style={{ color: character.color }}
                  />
                </div>
                
                <h3 className="text-2xl font-bold mb-3">{character.name}</h3>
                <p className="text-gray-300">{character.description}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}