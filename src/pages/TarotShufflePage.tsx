import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Shuffle } from "lucide-react";
import FestiveButton from "@/components/FestiveButton";
import formBackground from "@/assets/form-background.jpg";

const TarotShufflePage = () => {
  const navigate = useNavigate();
  const [isShuffling, setIsShuffling] = useState(false);
  const [shuffleComplete, setShuffleComplete] = useState(false);
  const [cardPositions, setCardPositions] = useState<{ x: number; y: number; rotate: number }[]>([]);

  // Initialize cards in deck
  useEffect(() => {
    const initialPositions = Array.from({ length: 22 }, (_, i) => ({
      x: 0,
      y: i * -1.5,
      rotate: 0,
    }));
    setCardPositions(initialPositions);
  }, []);

  const handleShuffle = () => {
    setIsShuffling(true);
    
    // Shuffle animation - cards fly around
    const shuffleInterval = setInterval(() => {
      setCardPositions(prev => prev.map(() => ({
        x: (Math.random() - 0.5) * 200,
        y: (Math.random() - 0.5) * 300,
        rotate: (Math.random() - 0.5) * 360,
      })));
    }, 200);

    // Stop shuffling after 2 seconds
    setTimeout(() => {
      clearInterval(shuffleInterval);
      
      // Bring cards back to deck
      setCardPositions(prev => prev.map((_, i) => ({
        x: 0,
        y: i * -1.5,
        rotate: 0,
      })));
      
      setTimeout(() => {
        setIsShuffling(false);
        setShuffleComplete(true);
      }, 500);
    }, 2000);
  };

  const handleDealCards = () => {
    navigate("/tarot/deal");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background image */}
      <img
        src={formBackground}
        alt="Background"
        className="fixed inset-0 w-full h-full object-cover object-center"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <motion.h1
          className="text-festive-gold text-2xl sm:text-3xl font-bold text-center mb-2 drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Tráo Bài Tarot
        </motion.h1>
        <motion.p
          className="text-festive-cream text-sm mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {isShuffling ? "Đang tráo bài..." : shuffleComplete ? "Bài đã được tráo xong!" : "Nhấn nút để tráo bài"}
        </motion.p>

        {/* Card deck */}
        <div className="relative w-32 h-48 mb-12">
          <AnimatePresence>
            {cardPositions.map((pos, index) => (
              <motion.div
                key={index}
                className="absolute inset-0 w-32 h-48 rounded-lg shadow-xl"
                style={{
                  background: "linear-gradient(135deg, #2D1B4E 0%, #1A0F2E 100%)",
                  border: "2px solid #F5D27B",
                  zIndex: cardPositions.length - index,
                }}
                animate={{
                  x: pos.x,
                  y: pos.y,
                  rotate: pos.rotate,
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
              >
                {/* Card back design */}
                <div className="absolute inset-2 rounded border border-festive-gold/30 flex items-center justify-center">
                  <div className="w-16 h-24 rounded border-2 border-festive-gold/50 flex items-center justify-center">
                    <motion.div
                      className="text-festive-gold text-3xl"
                      animate={isShuffling ? { rotate: 360 } : {}}
                      transition={{ duration: 0.5, repeat: isShuffling ? Infinity : 0 }}
                    >
                      ✦
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Buttons */}
        <div className="w-full max-w-xs space-y-3">
          {!shuffleComplete ? (
            <FestiveButton
              icon={Shuffle}
              onClick={handleShuffle}
              compact
              className="w-full"
            >
              {isShuffling ? "Đang tráo..." : "Tráo Bài"}
            </FestiveButton>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <FestiveButton
                onClick={handleDealCards}
                compact
                className="w-full"
              >
                Trải Bài
              </FestiveButton>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TarotShufflePage;
