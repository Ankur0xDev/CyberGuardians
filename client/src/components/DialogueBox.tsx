
import { motion, AnimatePresence } from 'framer-motion';

interface DialogueBoxProps {
  text: string;
  isVisible: boolean;
  onNext?: () => void;
  onSkip?: () => void;
  showControls?: boolean;
}

export default function DialogueBox({ text, isVisible, onNext, onSkip, showControls = true }: DialogueBoxProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 max-w-2xl w-full mx-4"
        >
          <div className="bg-gray-900/95 backdrop-blur border-2 border-cyan-500 rounded-xl p-6 shadow-2xl">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-white text-lg leading-relaxed mb-4"
            >
              {text}
            </motion.p>
            
            {showControls && (
              <div className="flex justify-between items-center">
                <button
                  onClick={onSkip}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Skip
                </button>
                
                <button
                  onClick={onNext}
                  className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-bold transition-all transform hover:scale-105"
                >
                  Continue
                </button>
              </div>
            )}
          </div>
          
          {/* Speech bubble tail */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
            <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[15px] border-l-transparent border-r-transparent border-t-cyan-500"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}