import React from 'react';
import { motion } from 'framer-motion';
import type { SceneType } from '../types/game';
import { Monitor, Server, Coffee, Home, Building, Shield, Cpu } from 'lucide-react';
 
interface SceneBackgroundProps {
  sceneType: SceneType;
  children: React.ReactNode;
}

const sceneConfigs = {
  office: {
    gradient: 'from-blue-900 via-gray-800 to-slate-900',
    icon: Building,
    elements: [
      { icon: Monitor, position: 'top-20 left-20', size: 'w-8 h-8', color: 'text-blue-400' },
      { icon: Monitor, position: 'top-32 right-32', size: 'w-6 h-6', color: 'text-blue-300' },
    ]
  },
  lab: {
    gradient: 'from-green-900 via-teal-800 to-cyan-900',
    icon: Cpu,
    elements: [
      { icon: Server, position: 'top-16 left-16', size: 'w-10 h-10', color: 'text-green-400' },
      { icon: Cpu, position: 'bottom-20 right-20', size: 'w-8 h-8', color: 'text-teal-400' },
    ]
  },
  terminal: {
    gradient: 'from-purple-900 via-indigo-800 to-blue-900',
    icon: Monitor,
    elements: [
      { icon: Monitor, position: 'top-24 left-24', size: 'w-12 h-12', color: 'text-purple-400' },
      { icon: Shield, position: 'top-40 right-40', size: 'w-8 h-8', color: 'text-indigo-400' },
    ]
  },
  home: {
    gradient: 'from-orange-900 via-red-800 to-pink-900',
    icon: Home,
    elements: [
      { icon: Monitor, position: 'top-28 left-28', size: 'w-8 h-8', color: 'text-orange-400' },
      { icon: Coffee, position: 'bottom-32 left-32', size: 'w-6 h-6', color: 'text-red-400' },
    ]
  },
  cafe: {
    gradient: 'from-amber-900 via-yellow-800 to-orange-900',
    icon: Coffee,
    elements: [
      { icon: Coffee, position: 'top-20 right-20', size: 'w-8 h-8', color: 'text-amber-400' },
      { icon: Monitor, position: 'bottom-24 left-24', size: 'w-6 h-6', color: 'text-yellow-400' },
    ]
  },
  'server-room': {
    gradient: 'from-red-900 via-gray-800 to-black',
    icon: Server,
    elements: [
      { icon: Server, position: 'top-16 left-16', size: 'w-12 h-12', color: 'text-red-400' },
      { icon: Server, position: 'top-20 right-20', size: 'w-10 h-10', color: 'text-red-300' },
      { icon: Cpu, position: 'bottom-16 left-32', size: 'w-8 h-8', color: 'text-gray-400' },
    ]
  },
  'control-center': {
    gradient: 'from-cyan-900 via-blue-800 to-purple-900',
    icon: Shield,
    elements: [
      { icon: Shield, position: 'top-20 left-20', size: 'w-10 h-10', color: 'text-cyan-400' },
      { icon: Monitor, position: 'top-32 right-24', size: 'w-8 h-8', color: 'text-blue-400' },
      { icon: Server, position: 'bottom-20 right-32', size: 'w-8 h-8', color: 'text-purple-400' },
    ]
  }
};

export default function SceneBackground({ sceneType, children }: SceneBackgroundProps) {
  const config = sceneConfigs[sceneType];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${config.gradient} relative overflow-hidden`}>
      {/* Animated background elements */}
      {config.elements.map((element, index) => {
        const ElementIcon = element.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ 
              delay: index * 0.2, 
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 3 + index
            }}
            className={`absolute ${element.position} ${element.color} ${element.size}`}
          >
            <ElementIcon className="w-full h-full" />
          </motion.div>
        );
      })}

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}