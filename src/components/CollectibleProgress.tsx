import { motion, AnimatePresence } from "framer-motion";
import { Gift } from "lucide-react";
import { useCollectible } from "@/contexts/CollectibleContext";

const CollectibleProgress = () => {
  const { collectedLetters, totalLetters, isComplete } = useCollectible();
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
          className="flex items-center gap-2 px-3 py-2 rounded-full"
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
    </AnimatePresence>
  );
};

export default CollectibleProgress;
