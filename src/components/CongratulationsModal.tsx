import { motion, AnimatePresence } from "framer-motion";
import { useCollectible } from "@/contexts/CollectibleContext";
import { Sparkles, PartyPopper } from "lucide-react";
import FestiveButton from "./FestiveButton";

const CongratulationsModal = () => {
  const { showCongrats, setShowCongrats, resetCollection } = useCollectible();

  const handleClose = () => {
    setShowCongrats(false);
  };

  const handleReset = () => {
    resetCollection();
  };

  return (
    <AnimatePresence>
      {showCongrats && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          {/* Confetti */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
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
              style={{ 
                color: "#FFD700",
                textShadow: "0 0 10px rgba(255, 215, 0, 0.5)",
              }}
            >
              {["B", "L", "U", "E", "T", "E", "C", "H"].map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.div>
            
            <div className="flex flex-col gap-2">
              <FestiveButton
                icon={Sparkles}
                onClick={handleClose}
                compact
              >
                Tuyệt vời!
              </FestiveButton>
              
              <button
                onClick={handleReset}
                className="text-sm underline opacity-70 hover:opacity-100 transition-opacity"
                style={{ color: "#FFF9C4" }}
              >
                Chơi lại từ đầu
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CongratulationsModal;
