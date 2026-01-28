import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCollectible } from "@/contexts/CollectibleContext";
import { Sparkles, PartyPopper } from "lucide-react";
import FestiveButton from "./FestiveButton";

interface Firework {
  id: number;
  x: number;
  y: number;
  color: string;
  particles: { angle: number; distance: number; size: number }[];
}

const COLORS = ["#FFD700", "#FF6B6B", "#4ECDC4", "#FF69B4", "#87CEEB", "#FFA500", "#98D8C8"];

const CongratulationsModal = () => {
  const { showCongrats, setShowCongrats } = useCollectible();
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const [showFireworks, setShowFireworks] = useState(true);

  useEffect(() => {
    if (!showCongrats) {
      setShowFireworks(true);
      setFireworks([]);
      return;
    }

    // Create fireworks for 5 seconds
    let fireworkId = 0;
    const createFirework = () => {
      const newFirework: Firework = {
        id: fireworkId++,
        x: 10 + Math.random() * 80,
        y: 20 + Math.random() * 50,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        particles: Array.from({ length: 12 }, (_, i) => ({
          angle: (i * 30) + Math.random() * 15,
          distance: 50 + Math.random() * 50,
          size: 3 + Math.random() * 4,
        })),
      };
      
      setFireworks(prev => [...prev, newFirework]);
      
      // Remove firework after animation
      setTimeout(() => {
        setFireworks(prev => prev.filter(f => f.id !== newFirework.id));
      }, 1500);
    };

    // Launch fireworks rapidly for first 3 seconds
    const rapidInterval = setInterval(createFirework, 200);
    
    // Slow down after 3 seconds
    setTimeout(() => {
      clearInterval(rapidInterval);
      const slowInterval = setInterval(createFirework, 500);
      
      // Stop completely after 5 seconds
      setTimeout(() => {
        clearInterval(slowInterval);
        setShowFireworks(false);
      }, 2000);
    }, 3000);

    return () => {
      clearInterval(rapidInterval);
    };
  }, [showCongrats]);

  const handleClose = () => {
    setShowCongrats(false);
  };

  return (
    <AnimatePresence>
      {showCongrats && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          {/* Fireworks */}
          <AnimatePresence>
            {showFireworks && fireworks.map((firework) => (
              <div
                key={firework.id}
                className="absolute pointer-events-none"
                style={{
                  left: `${firework.x}%`,
                  top: `${firework.y}%`,
                }}
              >
                {/* Center burst */}
                <motion.div
                  className="absolute w-4 h-4 rounded-full"
                  style={{
                    backgroundColor: firework.color,
                    boxShadow: `0 0 20px ${firework.color}, 0 0 40px ${firework.color}`,
                    left: "-8px",
                    top: "-8px",
                  }}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: [0, 2, 0], opacity: [1, 1, 0] }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
                
                {/* Particles */}
                {firework.particles.map((particle, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: particle.size,
                      height: particle.size,
                      backgroundColor: firework.color,
                      boxShadow: `0 0 6px ${firework.color}`,
                      left: -particle.size / 2,
                      top: -particle.size / 2,
                    }}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{
                      x: Math.cos((particle.angle * Math.PI) / 180) * particle.distance,
                      y: Math.sin((particle.angle * Math.PI) / 180) * particle.distance + 30,
                      opacity: [1, 1, 0],
                      scale: [1, 1.2, 0],
                    }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                ))}
                
                {/* Sparkle trails */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={`sparkle-${i}`}
                    className="absolute text-xs"
                    style={{ left: 0, top: 0 }}
                    initial={{ x: 0, y: 0, opacity: 1 }}
                    animate={{
                      x: (Math.random() - 0.5) * 100,
                      y: (Math.random() - 0.5) * 100 + 20,
                      opacity: [1, 0],
                      rotate: Math.random() * 360,
                    }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                  >
                    ✦
                  </motion.div>
                ))}
              </div>
            ))}
          </AnimatePresence>
          
          {/* Confetti background */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl pointer-events-none"
              initial={{ 
                top: "50%",
                left: "50%",
                opacity: 1,
              }}
              animate={{ 
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0,
                rotate: Math.random() * 720,
              }}
              transition={{ 
                duration: 2,
                delay: i * 0.05,
                ease: "easeOut",
              }}
            >
              {["🎉", "🎊", "✨", "⭐", "🌟"][i % 5]}
            </motion.div>
          ))}
          
          {/* Modal */}
          <motion.div
            className="relative z-10 max-w-sm w-full mx-4 rounded-2xl p-6 text-center"
            style={{
              background: "linear-gradient(135deg, #8B0000 0%, #B22222 50%, #8B0000 100%)",
              border: "4px solid #F5D27B",
              boxShadow: "0 0 40px rgba(255, 215, 0, 0.4), inset 0 2px 10px rgba(255,255,255,0.1)",
            }}
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Decorative corners */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#F5D27B] rounded-tl-lg" />
            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#F5D27B] rounded-tr-lg" />
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#F5D27B] rounded-bl-lg" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#F5D27B] rounded-br-lg" />
            
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
            >
              <PartyPopper className="w-16 h-16 mx-auto mb-4" style={{ color: "#F5D27B" }} />
            </motion.div>
            
            <h2 
              className="text-2xl font-bold mb-2"
              style={{ 
                color: "#F5D27B",
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              }}
            >
              🎉 Chúc Mừng! 🎉
            </h2>
            
            <p 
              className="mb-4"
              style={{ color: "#FFF9C4" }}
            >
              Bạn đã tìm được tất cả các chữ cái!
            </p>
            
            <motion.div
              className="flex justify-center gap-2 mb-6 text-3xl font-bold"
            >
              {["B", "L", "U", "E", "T", "E", "C", "H"].map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20, scale: 0 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
                  style={{
                    color: "#DC143C",
                    WebkitTextStroke: "1.5px #F5D27B",
                    textShadow: "0 0 10px rgba(255, 215, 0, 0.8), 0 2px 4px rgba(0,0,0,0.5)",
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
            
            <FestiveButton
              icon={Sparkles}
              onClick={handleClose}
              compact
            >
              Tuyệt vời!
            </FestiveButton>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CongratulationsModal;
