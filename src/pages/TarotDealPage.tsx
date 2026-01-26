import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import FestiveButton from "@/components/FestiveButton";
import formBackground from "@/assets/form-background.jpg";
import { useAudio } from "@/contexts/AudioContext";
import { TarotCard, getCardImageUrl, shuffleCards } from "@/hooks/useTarotCards";

const TarotDealPage = () => {
  const navigate = useNavigate();
  const { playClickSound } = useAudio();
  const [dealtCards, setDealtCards] = useState<TarotCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [dealComplete, setDealComplete] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Get shuffled deck from session storage
    const storedDeck = sessionStorage.getItem("shuffledDeck");
    
    if (storedDeck) {
      const deck: TarotCard[] = JSON.parse(storedDeck);
      // Take first 3 cards from shuffled deck
      const selected = deck.slice(0, 3);
      
      // Deal cards one by one with animation
      selected.forEach((card, index) => {
        setTimeout(() => {
          setDealtCards(prev => [...prev, card]);
          if (index === 2) {
            setTimeout(() => setDealComplete(true), 500);
          }
        }, index * 400);
      });
    } else {
      // Fallback: fetch and shuffle cards if no deck in session
      fetch("https://tarotapi.dev/api/v1/cards")
        .then(res => res.json())
        .then(data => {
          const shuffled = shuffleCards(data.cards);
          const selected = shuffled.slice(0, 3);
          
          selected.forEach((card: TarotCard, index: number) => {
            setTimeout(() => {
              setDealtCards(prev => [...prev, card]);
              if (index === 2) {
                setTimeout(() => setDealComplete(true), 500);
              }
            }, index * 400);
          });
        })
        .catch(err => {
          console.error("Failed to fetch cards:", err);
        });
    }
  }, []);

  const handleFlipCard = (cardNameShort: string) => {
    if (!flippedCards.includes(cardNameShort)) {
      playClickSound();
      setFlippedCards(prev => [...prev, cardNameShort]);
    }
  };

  const handleViewResult = () => {
    sessionStorage.setItem("tarotCards", JSON.stringify(dealtCards));
    navigate("/tarot/result");
  };

  const handleImageError = (nameShort: string) => {
    setImageErrors(prev => new Set(prev).add(nameShort));
  };

  const allFlipped = dealtCards.length === 3 && flippedCards.length === 3;

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
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <motion.h1
          className="text-festive-gold text-2xl sm:text-3xl font-bold text-center mb-2 drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Lật Bài Tarot
        </motion.h1>
        <motion.p
          className="text-festive-cream text-sm mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {allFlipped ? "Tất cả bài đã được lật!" : "Chạm vào từng lá bài để lật"}
        </motion.p>

        {/* Card spread */}
        <div className="flex gap-3 sm:gap-4 mb-10 flex-wrap justify-center">
          <AnimatePresence>
            {dealtCards.map((card, index) => {
              const isFlipped = flippedCards.includes(card.name_short);
              const hasImageError = imageErrors.has(card.name_short);
              
              return (
                <motion.div
                  key={card.name_short}
                  className="relative cursor-pointer"
                  style={{ perspective: "1000px" }}
                  initial={{ opacity: 0, y: -100, rotate: -20 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ delay: index * 0.3, type: "spring", stiffness: 100 }}
                  onClick={() => handleFlipCard(card.name_short)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="relative w-24 sm:w-32 h-40 sm:h-52"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
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
                      <div className="absolute inset-2 rounded border border-festive-gold/30 flex items-center justify-center">
                        <div className="w-12 h-16 sm:w-16 sm:h-24 rounded border-2 border-festive-gold/50 flex items-center justify-center">
                          <span className="text-festive-gold text-2xl sm:text-3xl">✦</span>
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-0 right-0 text-center">
                        <span className="text-festive-cream/60 text-xs">Chạm để lật</span>
                      </div>
                    </div>

                    {/* Card front - Real Rider-Waite image */}
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
                          src={getCardImageUrl(card.name_short)}
                          alt={card.name}
                          className="w-full h-full object-cover"
                          onError={() => handleImageError(card.name_short)}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-b from-[#FFF7E0] to-[#FCEEC7] flex flex-col items-center justify-center p-2">
                          <span className="text-3xl mb-2">🔮</span>
                          <span className="text-festive-brown font-bold text-xs text-center leading-tight">
                            {card.nameVi || card.name}
                          </span>
                        </div>
                      )}
                      {/* Card name overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                        <p className="text-white text-xs font-bold text-center truncate">
                          {card.nameVi || card.name}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* View result button */}
        {dealComplete && (
          <motion.div
            className="w-full max-w-xs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: allFlipped ? 1 : 0.5 }}
          >
            <FestiveButton
              icon={Eye}
              onClick={handleViewResult}
              compact
              className="w-full"
            >
              Xem Luận Giải
            </FestiveButton>
            {!allFlipped && (
              <p className="text-festive-cream/60 text-xs text-center mt-2">
                Hãy lật tất cả các lá bài trước
              </p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TarotDealPage;
