import React from 'react';
import { X, Shield, Lock, Users, Wifi, Download, Settings, AlertTriangle } from 'lucide-react';
import { securityTips } from '../data/gameData';

interface TipsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TipsModal({ isOpen, onClose }: TipsModalProps) {
  if (!isOpen) return null;

  const categoryIcons = {
    'Phishing': AlertTriangle,
    'Passwords': Lock,
    'Social Engineering': Users,
    'Network Security': Wifi,
    'Safe Downloads': Download,
    'Privacy Settings': Settings
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-cyan-400" />
            <h2 className="text-2xl font-bold text-white">Cybersecurity Tips</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid gap-8">
            {securityTips.map((category) => {
              const IconComponent = categoryIcons[category.category as keyof typeof categoryIcons] || Shield;
              
              return (
                <div key={category.category} className="bg-gray-800/50 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{category.category}</h3>
                  </div>
                  
                  <ul className="space-y-3">
                    {category.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                        <p className="text-gray-300">{tip}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Quick Reference */}
          <div className="mt-8 p-6 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg border border-purple-500">
            <h3 className="text-xl font-bold text-white mb-4">Quick Security Checklist</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-gray-300">Use unique passwords for every account</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-gray-300">Enable 2FA whenever possible</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-gray-300">Keep software updated</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-gray-300">Verify suspicious emails</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-gray-300">Use secure networks only</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-gray-300">Download from official sources</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-gray-300">Review privacy settings regularly</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-gray-300">Back up important data</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}