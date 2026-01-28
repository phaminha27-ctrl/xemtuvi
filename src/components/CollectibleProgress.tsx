import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, X } from "lucide-react";
import { useCollectible } from "@/contexts/CollectibleContext";

const LETTERS = ["B", "L", "U", "E", "T", "E", "C", "H"] as const;

const CollectibleProgress = () => {
  const { collectedLetters, totalLetters, isComplete, isLetterCollected } = useCollectible();
  const [showPopup, setShowPopup] = useState(false);
  const count = collectedLetters.length;

  if (count === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-4 left-4 z-[60]"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.div
          className="flex items-center gap-2 px-3 py-2 rounded-full cursor-pointer"
          style={{
            background: "linear-gradient(135deg, rgba(139, 94, 52, 0.95) 0%, rgba(93, 62, 33, 0.95) 100%)",
            border: "2px solid #F5D27B",
            boxShadow: "0 4px 15px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.1)",
          }}
          animate={isComplete ? {
            boxShadow: [
              "0 4px 15px rgba(0,0,0,0.3)",
              "0 4px 25px rgba(255, 215, 0, 0.6)",
              "0 4px 15px rgba(0,0,0,0.3)",
            ]
          } : {}}
          transition={{ duration: 1, repeat: isComplete ? Infinity : 0 }}
          onClick={() => setShowPopup(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
              border: "2px solid #8B5E34",
            }}
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 0.3 }}
            key={count}
          >
            <Gift className="w-4 h-4" style={{ color: "#5d3e21" }} />
          </motion.div>
          
          <div className="flex items-center gap-1">
            <motion.span
              className="font-bold text-lg"
              style={{ color: "#F5D27B" }}
              key={count}
              initial={{ scale: 1.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              {count}
            </motion.span>
            <span style={{ color: "#F5D27B" }}>/</span>
            <span style={{ color: "#F5D27B" }}>{totalLetters}</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Letter Progress Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowPopup(false)}
            />
            
            {/* Popup */}
            <motion.div
              className="relative z-10 rounded-2xl p-4 sm:p-6 mx-4 max-w-[90vw] sm:max-w-sm"
              style={{
                background: "linear-gradient(135deg, rgba(139, 94, 52, 0.98) 0%, rgba(93, 62, 33, 0.98) 100%)",
                border: "3px solid #F5D27B",
                boxShadow: "0 10px 40px rgba(0,0,0,0.5), inset 0 2px 10px rgba(255,255,255,0.1)",
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              {/* Close button */}
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" style={{ color: "#F5D27B" }} />
              </button>

              <h3
                className="text-center text-base sm:text-lg font-bold mb-3 sm:mb-4"
                style={{ color: "#F5D27B" }}
              >
                Thu thập chữ cái
              </h3>

              {/* Letter slots - responsive grid */}
              <div className="flex gap-1.5 sm:gap-2 justify-center flex-wrap">
                {LETTERS.map((letter, index) => {
                  const collected = isLetterCollected(index);
                  return (
                    <motion.div
                      key={index}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-bold text-base sm:text-lg"
                      style={{
                        background: collected 
                          ? "linear-gradient(135deg, #8B0000 0%, #DC143C 50%, #8B0000 100%)"
                          : "rgba(0,0,0,0.3)",
                        border: collected ? "2px solid #F5D27B" : "2px dashed rgba(245, 210, 123, 0.4)",
                        boxShadow: collected ? "0 0 10px rgba(255, 215, 0, 0.5)" : "none",
                      }}
                      initial={collected ? { scale: 0 } : {}}
                      animate={collected ? { scale: 1 } : {}}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    >
                      {collected ? (
                        <span
                          style={{
                            color: "#DC143C",
                            WebkitTextStroke: "1px #F5D27B",
                            textShadow: "0 0 8px rgba(255, 215, 0, 0.8), 0 2px 4px rgba(0,0,0,0.5)",
                            fontWeight: 800,
                          }}
                        >
                          {letter}
                        </span>
                      ) : (
                        <span style={{ color: "rgba(245, 210, 123, 0.3)" }}>?</span>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <p
                className="text-center text-xs sm:text-sm mt-3 sm:mt-4"
                style={{ color: "#FFF9C4" }}
              >
                {count}/{totalLetters} chữ cái đã tìm thấy
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};

export default CollectibleProgress;
