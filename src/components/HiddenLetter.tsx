import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCollectible } from "@/contexts/CollectibleContext";
import { useAudio } from "@/contexts/AudioContext";

interface HiddenLetterProps {
  letter: string;
  index: number;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
}

const HiddenLetter = ({ letter, index, position }: HiddenLetterProps) => {
  const { isLetterCollected, collectLetter } = useCollectible();
  const { playClickSound } = useAudio();
  const [isFlying, setIsFlying] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);
  const [flyTarget, setFlyTarget] = useState({ x: 0, y: 0 });

  if (isLetterCollected(index)) return null;

  const handleClick = () => {
    if (isFlying) return;
    
    playClickSound();
    
    // Calculate fly target (bottom left corner)
    if (letterRef.current) {
      const rect = letterRef.current.getBoundingClientRect();
      const targetX = 60 - rect.left - rect.width / 2;
      const targetY = window.innerHeight - 60 - rect.top - rect.height / 2;
      setFlyTarget({ x: targetX, y: targetY });
    }
    
    setIsFlying(true);
    
    setTimeout(() => {
      collectLetter(letter, index);
    }, 600);
  };

  return (
    <AnimatePresence>
      {!isFlying ? (
        <motion.div
          ref={letterRef}
          className="fixed z-50 cursor-pointer select-none"
          style={position}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            scale: { duration: 2, repeat: Infinity },
            rotate: { duration: 3, repeat: Infinity },
          }}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleClick}
        >
          <div
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base"
            style={{
              background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
              boxShadow: "0 0 15px rgba(255, 215, 0, 0.6), inset 0 2px 4px rgba(255,255,255,0.4)",
              border: "2px solid #8B5E34",
              color: "#5d3e21",
              textShadow: "0 1px 2px rgba(255,255,255,0.5)",
            }}
          >
            {letter}
          </div>
          
          {/* Sparkle effect */}
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3"
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ✨
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          className="fixed z-[100] pointer-events-none"
          style={position}
          initial={{ scale: 1, opacity: 1 }}
          animate={{ 
            x: flyTarget.x,
            y: flyTarget.y,
            scale: 0.5,
            opacity: 0,
            rotate: 360,
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base"
            style={{
              background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
              boxShadow: "0 0 20px rgba(255, 215, 0, 0.8)",
              border: "2px solid #8B5E34",
              color: "#5d3e21",
            }}
          >
            {letter}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HiddenLetter;
