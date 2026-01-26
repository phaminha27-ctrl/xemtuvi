import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import IconButton from "@/components/IconButton";
import FestiveButton from "@/components/FestiveButton";
import { Textarea } from "@/components/ui/textarea";
import tarotBackground from "@/assets/tarot-background.jpg";
import { useAudio } from "@/contexts/AudioContext";

const TarotQuestionPage = () => {
  const navigate = useNavigate();
  const { playClickSound, startBgMusic } = useAudio();
  const [question, setQuestion] = useState("");

  const handleContinue = () => {
    playClickSound();
    startBgMusic();
    
    // Store question (default to general reading if empty)
    sessionStorage.setItem("tarotQuestion", question.trim() || "Xem tổng quan cuộc sống");
    
    navigate("/tarot/shuffle");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background image */}
      <img
        src={tarotBackground}
        alt="Background"
        className="fixed inset-0 w-full h-full object-cover object-center"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Back button */}
      <div className="absolute top-3 left-4 z-20">
        <IconButton onClick={() => navigate("/")} label="QUAY LẠI">
          <svg 
            className="w-7 h-7" 
            viewBox="0 0 24 24"
            style={{ 
              fill: "#FFF9C4",
              filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.5))"
            }}
          >
            <path d="M19 11H7.83l4.88-4.88L11 4l-8 8 8 8 1.71-1.71L7.83 13H19v-2z"/>
          </svg>
        </IconButton>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16">
        <motion.div
          className="w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-festive-gold to-festive-brown flex items-center justify-center border-4 border-festive-gold/50 shadow-2xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
        >
          <Sparkles className="w-10 h-10 text-festive-cream" />
        </motion.div>

        <motion.h1
          className="text-festive-gold text-2xl sm:text-3xl font-bold text-center mb-2 drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Bói Bài Tarot
        </motion.h1>
        <motion.p
          className="text-festive-cream text-sm mb-8 text-center max-w-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Hãy tập trung suy nghĩ về điều bạn muốn hỏi
        </motion.p>

        <div className="w-full max-w-sm space-y-6">
          {/* Question input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-festive-gold text-sm font-semibold mb-2">
              Câu hỏi của bạn
            </label>
            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ví dụ: Tình hình công việc sắp tới như thế nào? Mối quan hệ của tôi sẽ đi về đâu?..."
              className="bg-black/30 border-festive-gold/50 text-festive-cream placeholder:text-festive-cream/40 min-h-[120px] resize-none focus:border-festive-gold text-base"
              maxLength={300}
            />
            <p className="text-festive-cream/50 text-xs mt-1 text-right">
              {question.length}/300
            </p>
            <p className="text-festive-cream/60 text-xs mt-2 text-center italic">
              Bạn có thể để trống để xem tổng quan cuộc sống
            </p>
          </motion.div>

          {/* Continue button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="pt-4"
          >
            <FestiveButton
              icon={Sparkles}
              onClick={handleContinue}
              compact
              className="w-full"
            >
              Xem Bài
            </FestiveButton>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TarotQuestionPage;
