import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import IconButton from "@/components/IconButton";
import FestiveButton from "@/components/FestiveButton";
import { Textarea } from "@/components/ui/textarea";
import tarotBackground from "@/assets/tarot-background.jpg";
import tarotMen from "@/assets/tarot-men.png";
import { useAudio } from "@/contexts/AudioContext";
import { Sparkles } from "lucide-react";

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

      {/* Content - Centered tarot men with form */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16">
        <motion.div
          className="relative w-full max-w-[320px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Tarot men image */}
          <img
            src={tarotMen}
            alt="Tarot Reader"
            className="w-full h-auto"
          />
          
          {/* Form overlay positioned on white area */}
          <div className="absolute left-[14%] right-[14%] top-[36%] bottom-[5.5%] flex flex-col p-2">
            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Nhập câu hỏi của bạn..."
              className="flex-1 bg-transparent border-none text-foreground/80 placeholder:text-muted-foreground/60 resize-none focus:ring-0 focus-visible:ring-0 text-base leading-relaxed"
              maxLength={300}
            />
            <p className="text-muted-foreground text-xs text-right mt-1">
              {question.length}/300
            </p>
          </div>
        </motion.div>
        
        {/* Button separated below image */}
        <motion.div
          className="w-full max-w-[320px] mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FestiveButton
            icon={Sparkles}
            onClick={handleContinue}
            compact
            variant="purple"
            className="w-full"
          >
            Xem Bài
          </FestiveButton>
        </motion.div>
      </div>
    </div>
  );
};

export default TarotQuestionPage;
