import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Mail, Globe, Download, MessageSquare, Wifi, Users } from 'lucide-react';

interface ThreatPopupProps {
  type: 'email' | 'website' | 'download' | 'message' | 'network' | 'social';
  isVisible: boolean;
  title: string;
  description: string;
  onClose?: () => void;
}

const threatIcons = {
  email: Mail,
  website: Globe,
  download: Download,
  message: MessageSquare,
  network: Wifi,
  social: Users
};

const threatColors = {
  email: 'border-red-500 bg-red-900/30',
  website: 'border-yellow-500 bg-yellow-900/30',
  download: 'border-purple-500 bg-purple-900/30',
  message: 'border-orange-500 bg-orange-900/30',
  network: 'border-blue-500 bg-blue-900/30',
  social: 'border-pink-500 bg-pink-900/30'
};

export default function ThreatPopup({ type, isVisible, title, description, onClose }: ThreatPopupProps) {
  const ThreatIcon = threatIcons[type];
  const colorClass = threatColors[type];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -50 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
            rotate: [0, -1, 1, -1, 0],
          }}
          exit={{ opacity: 0, scale: 0.8, y: -50 }}
          transition={{ 
            duration: 0.5,
            rotate: {
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 2
            }
          }}
          className={`fixed top-20 right-8 z-40 max-w-sm p-4 rounded-xl border-2 ${colorClass} backdrop-blur shadow-2xl`}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center"
              >
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </motion.div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <ThreatIcon className="w-4 h-4 text-white" />
                <h4 className="font-bold text-white text-sm">{title}</h4>
              </div>
              <p className="text-gray-300 text-xs leading-relaxed">{description}</p>
            </div>
            
            {onClose && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ×
              </button>
            )}
          </div>
          
          {/* Glowing border animation */}
          <motion.div
            className="absolute inset-0 rounded-xl border-2 border-red-400"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}