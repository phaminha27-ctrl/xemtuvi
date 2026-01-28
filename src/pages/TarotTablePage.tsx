import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Eye, RotateCcw } from "lucide-react";
import FestiveButton from "@/components/FestiveButton";
import IconButton from "@/components/IconButton";
import HiddenLetter from "@/components/HiddenLetter";
import tarotBackground from "@/assets/tarot-background.jpg";
import shufflingSound from "@/assets/shuffling-cards.mp3";
import { useAudio } from "@/contexts/AudioContext";
import { useTarotCards, shuffleCards, getCardImageUrl, TarotCard } from "@/hooks/useTarotCards";

type GamePhase = "idle" | "shuffling" | "ready" | "drawing" | "flipping" | "complete";

interface DrawnCard {
  card: TarotCard;
  isFlipped: boolean;
  position: number; // 0, 1, 2 for left, center, right in arc
}

const TarotTablePage = () => {
  const navigate = useNavigate();
  const { playClickSound, settings } = useAudio();
  const { cards, loading, error } = useTarotCards();

  // Shuffle sound ref
  const shuffleAudioRef = useRef<HTMLAudioElement | null>(null);

  // Play shuffle sound
  const playShuffleSound = useCallback(() => {
    if (settings.clickSoundEnabled) {
      shuffleAudioRef.current = new Audio(shufflingSound);
      shuffleAudioRef.current.volume = settings.clickSoundVolume;
      shuffleAudioRef.current.play().catch(() => {});
    }
  }, [settings.clickSoundEnabled, settings.clickSoundVolume]);

  // Stop shuffle sound
  const stopShuffleSound = useCallback(() => {
    if (shuffleAudioRef.current) {
      shuffleAudioRef.current.pause();
      shuffleAudioRef.current = null;
    }
  }, []);
  
  const [phase, setPhase] = useState<GamePhase>("idle");
  const [shuffledDeck, setShuffledDeck] = useState<TarotCard[]>([]);
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [shuffleAnimationCards, setShuffleAnimationCards] = useState<number[]>([]);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  // Handle deck click based on current phase
  const handleDeckClick = useCallback(() => {
    if (loading || cards.length === 0) return;
    playClickSound();

    if (phase === "idle") {
      // Start shuffling
      setPhase("shuffling");
      setShuffleAnimationCards([0, 1, 2, 3, 4, 5, 6, 7]);
      playShuffleSound();
      
      // Shuffle animation for 2 seconds
      setTimeout(() => {
        stopShuffleSound();
        const shuffled = shuffleCards(cards);
        setShuffledDeck(shuffled);
        sessionStorage.setItem("shuffledDeck", JSON.stringify(shuffled));
        setPhase("ready");
        setShuffleAnimationCards([]);
      }, 2000);
    } else if (phase === "ready" || phase === "drawing") {
      // Draw a card
      if (drawnCards.length < 3) {
        const nextCard = shuffledDeck[drawnCards.length];
        setDrawnCards(prev => [...prev, {
          card: nextCard,
          isFlipped: false,
          position: prev.length
        }]);
        
        if (drawnCards.length === 2) {
          // Last card drawn
          setPhase("flipping");
        } else {
          setPhase("drawing");
        }
      }
    }
  }, [phase, cards, loading, shuffledDeck, drawnCards, playClickSound]);

  // Handle card flip
  const handleCardFlip = useCallback((index: number) => {
    if (phase !== "flipping" && phase !== "complete") return;
    
    playClickSound();
    setDrawnCards(prev => prev.map((dc, i) => 
      i === index ? { ...dc, isFlipped: true } : dc
    ));

    // Check if all cards are flipped
    const flippedCount = drawnCards.filter(dc => dc.isFlipped).length;
    if (flippedCount === 2) { // This flip will make it 3
      setTimeout(() => setPhase("complete"), 600);
    }
  }, [phase, drawnCards, playClickSound]);

  const handleViewResult = () => {
    sessionStorage.setItem("tarotCards", JSON.stringify(drawnCards.map(dc => dc.card)));
    navigate("/tarot/result");
  };

  const handleReset = () => {
    setPhase("idle");
    setShuffledDeck([]);
    setDrawnCards([]);
    setShuffleAnimationCards([]);
  };

  const handleImageError = (nameShort: string) => {
    setImageErrors(prev => new Set(prev).add(nameShort));
  };

  // Arc positions for 3 cards (left, center, right) - smaller spread for mobile
  const getArcPosition = (index: number) => {
    const baseY = -10;
    const positions = [
      { x: -70, y: baseY + 10, rotate: -12 }, // Left
      { x: 0, y: baseY, rotate: 0 },           // Center
      { x: 70, y: baseY + 10, rotate: 12 },    // Right
    ];
    return positions[index];
  };

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <img src={tarotBackground} alt="Background" className="fixed inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <motion.div
            className="text-festive-gold text-xl"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Đang tải bộ bài Tarot...
          </motion.div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <img src={tarotBackground} alt="Background" className="fixed inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
          <p className="text-festive-cream text-center mb-4">Không thể tải bộ bài Tarot</p>
          <FestiveButton onClick={() => window.location.reload()} compact>Thử lại</FestiveButton>
        </div>
      </div>
    );
  }

  const allFlipped = drawnCards.length === 3 && drawnCards.every(dc => dc.isFlipped);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <img src={tarotBackground} alt="Background" className="fixed inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/60" />

      {/* Back button */}
      <div className="absolute top-3 left-4 z-20">
        <IconButton onClick={() => navigate("/tarot/question")} label="QUAY LẠI">
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

      {/* 3D Table perspective container */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4"
        style={{ perspective: "1000px" }}
      >
        {/* Title */}
        <motion.h1
          className="text-festive-gold text-xl sm:text-2xl font-bold text-center mb-2 drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {phase === "idle" && "Chạm vào bộ bài để tráo"}
          {phase === "shuffling" && "Đang tráo bài..."}
          {phase === "ready" && "Chạm vào bộ bài để rút lá thứ nhất"}
          {phase === "drawing" && `Chạm để rút lá thứ ${drawnCards.length + 1}`}
          {phase === "flipping" && "Chạm vào từng lá để lật bài"}
          {phase === "complete" && "Đã lật đủ 3 lá bài!"}
        </motion.h1>

        {/* 3D Table surface */}
        <motion.div
          className="relative w-full max-w-md h-72 sm:h-80 rounded-3xl overflow-hidden"
          style={{
            background: "radial-gradient(ellipse at center, #5D3D8E 0%, #4A2D7E 30%, #3A1F5E 60%, #2A0F3E 100%)",
            boxShadow: "0 30px 60px rgba(0,0,0,0.6), inset 0 4px 20px rgba(245, 210, 123, 0.25), 0 0 40px rgba(90, 50, 150, 0.4)",
            transformStyle: "preserve-3d",
            transform: "rotateX(15deg)",
          }}
        >
          {/* Table edge glow */}
          <div 
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              border: "4px solid rgba(245, 210, 123, 0.7)",
              boxShadow: "inset 0 0 50px rgba(245, 210, 123, 0.2), 0 0 30px rgba(245, 210, 123, 0.3)",
            }}
          />

          {/* Decorative corner ornaments */}
          <div className="absolute top-3 left-3 text-festive-gold/70 text-2xl pointer-events-none drop-shadow-lg">✧</div>
          <div className="absolute top-3 right-3 text-festive-gold/70 text-2xl pointer-events-none drop-shadow-lg">✧</div>
          <div className="absolute bottom-3 left-3 text-festive-gold/70 text-2xl pointer-events-none drop-shadow-lg">✧</div>
          <div className="absolute bottom-3 right-3 text-festive-gold/70 text-2xl pointer-events-none drop-shadow-lg">✧</div>

          {/* Center mystical symbol */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="text-festive-gold/25 text-7xl sm:text-8xl drop-shadow-lg"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              ✦
            </motion.div>
          </div>

          {/* Decorative circles */}
          <div 
            className="absolute inset-8 rounded-full pointer-events-none"
            style={{
              border: "2px solid rgba(245, 210, 123, 0.35)",
            }}
          />
          <div 
            className="absolute inset-16 rounded-full pointer-events-none"
            style={{
              border: "1px dashed rgba(245, 210, 123, 0.25)",
            }}
          />

          {/* Subtle zodiac-like decorations on edges */}
          <div className="absolute top-1/2 left-4 -translate-y-1/2 text-festive-gold/50 text-xl pointer-events-none drop-shadow">☽</div>
          <div className="absolute top-1/2 right-4 -translate-y-1/2 text-festive-gold/50 text-xl pointer-events-none drop-shadow">☀</div>

          {/* Drawn cards in arc formation */}
          <AnimatePresence>
            {drawnCards.map((drawnCard, index) => {
              const pos = getArcPosition(index);
              const hasImageError = imageErrors.has(drawnCard.card.name_short);
              
              return (
                <motion.div
                  key={drawnCard.card.name_short}
                  className="absolute cursor-pointer"
                  style={{
                    left: "50%",
                    top: "50%",
                    transformStyle: "preserve-3d",
                  }}
                  initial={{ 
                    x: 80, 
                    y: 60,
                    rotate: 0,
                    scale: 0.8,
                    opacity: 0 
                  }}
                  animate={{ 
                    x: pos.x - 40, // offset for card width
                    y: pos.y - 60, // offset for card height
                    rotate: pos.rotate,
                    scale: 1,
                    opacity: 1 
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 100, 
                    damping: 15,
                    delay: 0.1 
                  }}
                  onClick={() => handleCardFlip(index)}
                  whileHover={!drawnCard.isFlipped ? { scale: 1.05, y: pos.y - 70 } : {}}
                  whileTap={!drawnCard.isFlipped ? { scale: 0.98 } : {}}
                >
                  <motion.div
                    className="relative w-20 sm:w-24 h-32 sm:h-40"
                    animate={{ rotateY: drawnCard.isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Card back */}
                    <div
                      className="absolute inset-0 rounded-lg shadow-xl"
                      style={{
                        background: "linear-gradient(135deg, #2D1B4E 0%, #1A0F2E 100%)",
                        border: "2px solid #F5D27B",
                        backfaceVisibility: "hidden",
                      }}
                    >
                      <div className="absolute inset-1.5 rounded border border-festive-gold/30 flex items-center justify-center">
                        <div className="w-10 sm:w-14 h-16 sm:h-20 rounded border-2 border-festive-gold/50 flex items-center justify-center">
                          <span className="text-festive-gold text-xl sm:text-2xl">✦</span>
                        </div>
                      </div>
                    </div>

                    {/* Card front */}
                    <div
                      className="absolute inset-0 rounded-lg shadow-xl overflow-hidden"
                      style={{
                        border: "2px solid #F5D27B",
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      {!hasImageError ? (
                        <img
                          src={getCardImageUrl(drawnCard.card)}
                          alt={drawnCard.card.name}
                          className="w-full h-full object-cover"
                          onError={() => handleImageError(drawnCard.card.name_short)}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-b from-[#FFF7E0] to-[#FCEEC7] flex flex-col items-center justify-center p-1">
                          <span className="text-2xl mb-1">🔮</span>
                          <span className="text-festive-brown font-bold text-[10px] text-center leading-tight">
                            {drawnCard.card.nameVi || drawnCard.card.name}
                          </span>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-1">
                        <p className="text-white text-[10px] font-bold text-center truncate">
                          {drawnCard.card.nameVi || drawnCard.card.name}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Position label */}
                  {drawnCard.isFlipped && (
                    <motion.div
                      className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-festive-gold text-[10px] whitespace-nowrap"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {index === 0 && "Quá khứ"}
                      {index === 1 && "Hiện tại"}
                      {index === 2 && "Tương lai"}
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Card deck - outside the table */}
        {phase !== "complete" && (
          <motion.div
            className="mt-6 cursor-pointer relative"
            style={{
              width: "90px",
              height: "140px",
            }}
            onClick={handleDeckClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Stacked deck effect */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-16 sm:w-20 h-24 sm:h-32 rounded-lg pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, #2D1B4E 0%, #1A0F2E 100%)",
                  border: "2px solid #F5D27B",
                  bottom: i * 2,
                  left: "50%",
                  transform: `translateX(-50%) translateX(${i * 1}px)`,
                  zIndex: 5 - i,
                }}
                animate={phase === "shuffling" ? {
                  x: [0, (Math.random() - 0.5) * 100, 0],
                  y: [0, (Math.random() - 0.5) * 80, 0],
                  rotate: [0, (Math.random() - 0.5) * 45, 0],
                } : {}}
                transition={{
                  duration: 0.4,
                  repeat: phase === "shuffling" ? 4 : 0,
                  repeatType: "mirror",
                }}
              >
                {i === 0 && (
                  <div className="absolute inset-1.5 rounded border border-festive-gold/30 flex items-center justify-center">
                    <div className="w-8 sm:w-12 h-12 sm:h-18 rounded border-2 border-festive-gold/50 flex items-center justify-center">
                      <motion.span 
                        className="text-festive-gold text-lg sm:text-xl"
                        animate={phase === "shuffling" ? { rotate: 360 } : {}}
                        transition={{ duration: 0.5, repeat: phase === "shuffling" ? Infinity : 0 }}
                      >
                        ✦
                      </motion.span>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
            
            {/* Deck label */}
            <motion.div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-festive-cream text-xs whitespace-nowrap pointer-events-none font-medium"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {phase === "idle" && "Chạm để tráo"}
              {phase === "shuffling" && "Đang tráo..."}
              {(phase === "ready" || phase === "drawing") && `Chạm để rút (${3 - drawnCards.length} lá)`}
            </motion.div>
          </motion.div>
        )}

        {/* Action buttons */}
        <div className="mt-8 flex gap-3">
          {phase === "complete" && allFlipped && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <FestiveButton icon={Eye} onClick={handleViewResult} compact>
                Xem Luận Giải
              </FestiveButton>
            </motion.div>
          )}
          
          {(phase === "complete" || phase === "flipping") && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <FestiveButton 
                icon={RotateCcw} 
                onClick={handleReset} 
                compact
                className="bg-festive-red/80"
              >
                Làm lại
              </FestiveButton>
            </motion.div>
          )}
        </div>

        {/* Hidden letter E (second one, index 5) */}
        <HiddenLetter letter="E" index={5} />
      </div>
    </div>
  );
};

export default TarotTablePage;
