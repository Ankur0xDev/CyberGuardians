import React from 'react';
import type { User, Badge } from '../types/game';
import { Shield, Award, Trophy, TrendingUp } from 'lucide-react'; 

interface GameDashboardProps {
  user: User;
  badges: Badge[];
  onStartGame: () => void;
  onShowTips: () => void;
}
export default function GameDashboard({ user, badges, onStartGame, onShowTips }: GameDashboardProps) {
  const earnedBadges = badges.filter(badge => 
    user.badges.some(userBadge => userBadge.id === badge.id)
  );
        
      
  const nextBadge = badges.find(badge => 
    !user.badges.some(userBadge => userBadge.id === badge.id)
  );
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-12 h-12 text-cyan-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              CyberGuardians
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Master cybersecurity through interactive challenges and protect yourself in the digital world
          </p>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6 text-center">
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-green-400">{user.totalScore}</h3>
            <p className="text-gray-300">Total Score</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6 text-center">
            <Award className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-blue-400">{user.completedLevels.length}/7</h3>
            <p className="text-gray-300">Levels Complete</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6 text-center">
            <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <h3 className="text-2xl font-bold text-yellow-400">{earnedBadges.length}/3</h3>
            <p className="text-gray-300">Badges Earned</p>
          </div>
        </div>

        {/* Badges Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Your Achievements</h2>
          <div className="flex justify-center gap-8 flex-wrap">
            {badges.map((badge) => {
              const isEarned = earnedBadges.some(earned => earned.id === badge.id);
              return (
                <div
                  key={badge.id}
                  className={`relative group ${
                    isEarned ? 'scale-110' : 'grayscale opacity-50'
                  } transition-all duration-300`}
                >
                  <div
                    className={`w-24 h-24 rounded-full border-4 flex items-center justify-center ${
                      isEarned 
                        ? `border-[${badge.color}] bg-gradient-to-br from-${badge.color}/20 to-${badge.color}/5`
                        : 'border-gray-600 bg-gray-800'
                    }`}
                    style={{
                      borderColor: isEarned ? badge.color : undefined,
                    }}
                  >
                    <div className={`text-3xl ${isEarned ? 'text-white' : 'text-gray-500'}`}>
                      {badge.icon === 'Shield' && <Shield />}
                      {badge.icon === 'Sword' && <Award />}
                      {badge.icon === 'Crown' && <Trophy />}
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <p className={`font-bold ${isEarned ? 'text-white' : 'text-gray-500'}`}>
                      {badge.name}
                    </p>
                    <p className="text-xs text-gray-400 max-w-32">
                      {badge.description}
                    </p>
                  </div>
                  
                  {isEarned && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {nextBadge && (
            <div className="text-center mt-6">
              <p className="text-gray-300">
                Next badge: <span className="text-cyan-400 font-bold">{nextBadge.name}</span>
              </p>
              <p className="text-sm text-gray-400">{nextBadge.description}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onStartGame}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
          >
            Start Mission
          </button>
          
          <button
            onClick={onShowTips}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
          >
            Security Tips
          </button>
        </div>
      </div>
    </div>
  );
}