import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import IconButton from "@/components/IconButton";
import FestiveButton from "@/components/FestiveButton";
import HiddenLetter from "@/components/HiddenLetter";
import tarotBackground from "@/assets/tarot-background.jpg";
import { useAudio } from "@/contexts/AudioContext";

// Character images
import cmenImg from "@/assets/cmen.jpg";
import minhaImg from "@/assets/minha.jpg";
import atuanImg from "@/assets/atuan.jpg";
import alyImg from "@/assets/aly.jpg";

interface Character {
  id: string;
  name: string;
  previewImage: string;
  formImage: string;
}

const characters: Character[] = [
  { id: "men", name: "Mến Thần Bài", previewImage: cmenImg, formImage: "tarot-men" },
  { id: "ha", name: "Hà Vũ Trụ", previewImage: minhaImg, formImage: "tarot-ha" },
  { id: "tuan", name: "Tuấn Thiên Cơ", previewImage: atuanImg, formImage: "tarot-tuan" },
  { id: "ly", name: "Ly Vận Mệnh", previewImage: alyImg, formImage: "tarot-ly" },
];

const TarotCharacterSelectPage = () => {
  const navigate = useNavigate();
  const { playClickSound, startBgMusic } = useAudio();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    playClickSound();
    setCurrentIndex((prev) => (prev === 0 ? characters.length - 1 : prev - 1));
  };

  const handleNext = () => {
    playClickSound();
    setCurrentIndex((prev) => (prev === characters.length - 1 ? 0 : prev + 1));
  };

  const handleSelectCharacter = () => {
    playClickSound();
    startBgMusic();
    
    // Store selected character
    sessionStorage.setItem("tarotCharacter", characters[currentIndex].formImage);
    sessionStorage.setItem("tarotCharacterName", characters[currentIndex].name);
    
    navigate("/tarot/question");
  };

  const currentCharacter = characters[currentIndex];

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

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16">
        {/* Title */}
        <motion.h1
          className="text-2xl font-bold text-center mb-6"
          style={{
            color: "#FFF9C4",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Chọn Thầy Bói
        </motion.h1>

        {/* Slider Container */}
        <motion.div
          className="relative w-full max-w-[300px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Character Frame */}
          <div 
            className="relative rounded-2xl p-4 mx-auto"
            style={{
              background: "linear-gradient(180deg, rgba(123, 75, 175, 0.9) 0%, rgba(94, 58, 140, 0.9) 100%)",
              border: "3px solid #F5D27B",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 0 20px rgba(255,255,255,0.1)",
            }}
          >
            {/* Character Name */}
            <div 
              className="text-center py-2 mb-3 rounded-lg"
              style={{
                background: "linear-gradient(180deg, #F5D27B 0%, #C49A45 100%)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentCharacter.name}
                  className="font-bold text-lg"
                  style={{ color: "#5d3e21" }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {currentCharacter.name}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Character Image */}
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentCharacter.id}
                  src={currentCharacter.previewImage}
                  alt={currentCharacter.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
              style={{
                background: "linear-gradient(180deg, #F5D27B 0%, #C49A45 100%)",
                border: "2px solid #8B5E34",
                boxShadow: "0 3px 6px rgba(0,0,0,0.3)",
              }}
            >
              <ChevronLeft className="w-6 h-6" style={{ color: "#5d3e21" }} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
              style={{
                background: "linear-gradient(180deg, #F5D27B 0%, #C49A45 100%)",
                border: "2px solid #8B5E34",
                boxShadow: "0 3px 6px rgba(0,0,0,0.3)",
              }}
            >
              <ChevronRight className="w-6 h-6" style={{ color: "#5d3e21" }} />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {characters.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    playClickSound();
                    setCurrentIndex(index);
                  }}
                  className="w-3 h-3 rounded-full transition-all"
                  style={{
                    background: index === currentIndex 
                      ? "linear-gradient(180deg, #F5D27B 0%, #C49A45 100%)"
                      : "rgba(255,255,255,0.3)",
                    border: index === currentIndex ? "1px solid #8B5E34" : "none",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Select Button */}
        <motion.div
          className="w-full max-w-[300px] mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FestiveButton
            icon={Sparkles}
            onClick={handleSelectCharacter}
            compact
            variant="purple"
            className="w-full"
          >
            Chọn Thầy Bói
          </FestiveButton>
        </motion.div>

        {/* Hidden letter E */}
        <HiddenLetter letter="E" index={3} position={{ bottom: "8%", right: "8%" }} />
      </div>
    </div>
  );
};

export default TarotCharacterSelectPage;
