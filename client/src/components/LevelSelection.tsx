
import  type { Level } from '../types/game';
import { Lock, CheckCircle, Star } from 'lucide-react';
import * as Icons from 'lucide-react';

interface LevelSelectionProps {
  levels: Level[];
  onSelectLevel: (level: Level) => void;
  onBack: () => void;
}

export default function LevelSelection({ levels, onSelectLevel, onBack }: LevelSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            ← Back
          </button>
          <h1 className="text-4xl font-bold">Choose Your Mission</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levels.map((level) => {
            const IconComponent = (Icons[level.icon as keyof typeof Icons] || Icons.Shield) as React.ComponentType<any>;
            
            return (
              <div
                key={level.id}
                className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${
                  level.isUnlocked
                    ? level.isCompleted
                      ? 'border-green-500 bg-gradient-to-br from-green-900/30 to-gray-800/30 hover:border-green-400 cursor-pointer transform hover:scale-105'
                      : 'border-cyan-500 bg-gradient-to-br from-cyan-900/30 to-gray-800/30 hover:border-cyan-400 cursor-pointer transform hover:scale-105'
                    : 'border-gray-600 bg-gradient-to-br from-gray-800/30 to-gray-900/30 cursor-not-allowed opacity-60'
                }`}
                onClick={() => level.isUnlocked && onSelectLevel(level)}
              >
                {/* Level Status Icons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  {level.isCompleted && (
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  )}
                  {!level.isUnlocked && (
                    <Lock className="w-6 h-6 text-gray-400" />
                  )}
                  {level.bestScore > 250 && (
                    <Star className="w-6 h-6 text-yellow-400" />
                  )}
                </div>

                {/* Level Icon */}
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: level.color + '20', border: `2px solid ${level.color}` }}
                >
                  <IconComponent 
                    className="w-8 h-8" 
                    style={{ color: level.color }}
                  />
                </div>

                {/* Level Info */}
                <h3 className="text-xl font-bold mb-2">{level.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{level.description}</p>

                {/* Progress Info */}
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">
                    Level {level.id}
                  </span>
                  {level.bestScore > 0 && (
                    <span className="text-cyan-400 font-bold">
                      Best: {level.bestScore}pts
                    </span>
                  )}
                </div>

                {/* Difficulty Indicator */}
                <div className="mt-3 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < level.id ? 'bg-orange-500' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-12 p-6 bg-gray-800/50 rounded-xl">
          <h3 className="text-lg font-bold mb-4">Legend</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Completed Level</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>High Score (250+ points)</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-gray-400" />
              <span>Locked Level</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}