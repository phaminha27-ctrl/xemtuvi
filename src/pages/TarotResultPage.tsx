import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Share2, Home, Sparkles, Loader2 } from "lucide-react";
import FestiveButton from "@/components/FestiveButton";
import { toast } from "sonner";
import resultBackground from "@/assets/result-background.jpg";
import { TarotCard, getCardImageUrl } from "@/hooks/useTarotCards";
import { supabase } from "@/integrations/supabase/client";

const categoryNames: { [key: string]: string } = {
  love: "Tình Yêu",
  career: "Sự Nghiệp",
  finance: "Tài Chính",
  family: "Gia Đình",
  health: "Sức Khỏe",
};

const categoryContext: { [key: string]: string } = {
  love: "Tình yêu",
  career: "Sự nghiệp",
  finance: "Tài chính",
  family: "Gia đình",
  health: "Sức khỏe",
};

const cardPositionLabels = ["Quá Khứ", "Hiện Tại", "Tương Lai"];
const cardIcons = ["🌙", "☀️", "⭐"];

// Translate tarot card meanings using AI
const translateTarotMeanings = async (
  cards: TarotCard[],
  category: string
): Promise<string[]> => {
  try {
    const { data, error } = await supabase.functions.invoke("translate-tarot", {
      body: {
        cards: cards.map((card, index) => ({
          name: card.name,
          meaning_up: card.meaning_up,
          meaning_rev: card.meaning_rev,
          isReversed: card.isReversed || false,
          position: cardPositionLabels[index],
          category: categoryContext[category] || "Cuộc sống",
        })),
      },
    });

    if (error) {
      console.error("Translation error:", error);
      throw error;
    }

    const interpretations = data.interpretations || [];
    return cards.map((_, index) => {
      const found = interpretations.find((i: { index: number; interpretation: string }) => i.index === index);
      return found?.interpretation || "";
    });
  } catch (error) {
    console.error("Failed to translate tarot meanings:", error);
    throw error;
  }
};

// Fallback interpretation
const getFallbackInterpretation = (card: TarotCard, category: string, position: string): string => {
  const meaning = card.isReversed ? card.meaning_rev : card.meaning_up;
  const reversedNote = card.isReversed ? " (Lá ngược)" : "";
  return `${position}: Lá ${card.name}${reversedNote} mang thông điệp: "${meaning}".`;
};

const ScrollResultCard = ({ 
  children, 
  title,
  className = "" 
}: { 
  children: React.ReactNode; 
  title?: string;
  className?: string;
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className="relative z-10 h-6 rounded-full bg-gradient-to-b from-festive-gold via-festive-brown to-festive-gold border-2 border-festive-brown shadow-md" />
      <div className="relative -mt-3 -mb-3 mx-3 bg-gradient-to-b from-[#FFF7E0] to-[#FCEEC7] border-2 border-festive-brown px-4 py-6">
        <div className="absolute top-4 left-2 w-4 h-4 border-l-2 border-t-2 border-festive-brown opacity-60" />
        <div className="absolute top-4 right-2 w-4 h-4 border-r-2 border-t-2 border-festive-brown opacity-60" />
        <div className="absolute bottom-4 left-2 w-4 h-4 border-l-2 border-b-2 border-festive-brown opacity-60" />
        <div className="absolute bottom-4 right-2 w-4 h-4 border-r-2 border-b-2 border-festive-brown opacity-60" />
        {title && (
          <h3 className="text-festive-red font-bold text-lg text-center mb-3 font-sans">
            {title}
          </h3>
        )}
        {children}
      </div>
      <div className="relative z-10 h-6 rounded-full bg-gradient-to-b from-festive-gold via-festive-brown to-festive-gold border-2 border-festive-brown shadow-md" />
    </div>
  );
};

const TarotResultPage = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [category, setCategory] = useState("love");
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [aiInterpretations, setAiInterpretations] = useState<string[]>([]);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [aiError, setAiError] = useState(false);

  useEffect(() => {
    const storedCards = sessionStorage.getItem("tarotCards");
    const storedCategory = sessionStorage.getItem("tarotCategory");
    
    let parsedCards: TarotCard[] = [];
    let parsedCategory = "love";
    
    if (storedCards) {
      parsedCards = JSON.parse(storedCards);
      setCards(parsedCards);
    }
    if (storedCategory) {
      parsedCategory = storedCategory;
      setCategory(parsedCategory);
    }

    // Call AI to translate meanings
    if (parsedCards.length > 0) {
      setIsLoadingAi(true);
      setAiError(false);
      translateTarotMeanings(parsedCards, parsedCategory)
        .then((interpretations) => {
          setAiInterpretations(interpretations);
          setIsLoadingAi(false);
        })
        .catch((error) => {
          console.error("AI translation failed:", error);
          setAiError(true);
          setIsLoadingAi(false);
          toast.error("Không thể kết nối AI. Hiển thị ý nghĩa gốc.");
        });
    }
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: "Kết Quả Bói Bài Tarot",
      text: `Xem kết quả bói bài Tarot về ${categoryNames[category]} của tôi!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text}\n${window.location.href}`);
        toast.success("Đã sao chép link để chia sẻ!");
      }
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        toast.error("Không thể chia sẻ. Vui lòng thử lại!");
      }
    }
  };

  const handleImageError = (nameShort: string) => {
    setImageErrors(prev => new Set(prev).add(nameShort));
  };

  // Get interpretation for a card (AI or fallback)
  const getInterpretation = (card: TarotCard, index: number): string => {
    if (aiInterpretations[index]) {
      return aiInterpretations[index];
    }
    return getFallbackInterpretation(card, category, cardPositionLabels[index]);
  };

  return (
    <div className="relative min-h-screen">
      <img 
        src={resultBackground} 
        alt="" 
        className="fixed inset-0 w-full h-full object-cover"
      />
      
      <div className="relative z-10 min-h-screen px-4 sm:px-6 md:px-8 py-6 sm:py-8 font-sans">
        <div className="max-w-xs sm:max-w-sm md:max-w-lg mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-festive-gold drop-shadow-lg">
              Luận Giải Tarot
            </h1>
            <p className="text-festive-cream mt-2 font-sans">
              Chủ đề: <span className="font-bold text-festive-gold">{categoryNames[category]}</span>
            </p>
          </motion.div>

          {/* Cards Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <ScrollResultCard title="Các Lá Bài Của Bạn">
              <div className="flex justify-center gap-3 flex-wrap">
                {cards.map((card, index) => {
                  const hasImageError = imageErrors.has(card.name_short);
                  return (
                    <div key={card.name_short} className="text-center">
                      <div 
                        className={`w-16 h-24 rounded-lg border-2 border-festive-gold mb-2 mx-auto shadow-lg overflow-hidden ${
                          card.isReversed ? "rotate-180" : ""
                        }`}
                      >
                        {!hasImageError ? (
                          <img
                            src={getCardImageUrl(card)}
                            alt={card.name}
                            className="w-full h-full object-cover"
                            onError={() => handleImageError(card.name_short)}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center">
                            <span className="text-2xl">{cardIcons[index]}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-festive-brown text-xs font-bold">{card.name}</p>
                      <p className="text-festive-brown/60 text-[10px]">
                        {cardPositionLabels[index]} {card.isReversed && "(Ngược)"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </ScrollResultCard>
          </motion.div>

          {/* AI Loading Indicator */}
          {isLoadingAi && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4"
            >
              <ScrollResultCard>
                <div className="flex items-center justify-center gap-3 py-4">
                  <Loader2 className="w-6 h-6 text-festive-gold animate-spin" />
                  <p className="text-festive-brown font-sans">Đang phân tích bài Tarot với AI...</p>
                </div>
              </ScrollResultCard>
            </motion.div>
          )}

          {/* Overall Interpretation */}
          {!isLoadingAi && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-4"
            >
              <ScrollResultCard title="Luận Giải Tổng Quan">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-festive-red to-festive-brown flex items-center justify-center flex-shrink-0 border-2 border-festive-gold/30 shadow-lg">
                    <Sparkles className="w-6 h-6 text-festive-cream" />
                  </div>
                  <p className="text-sm text-festive-brown font-sans leading-relaxed">
                    Với bộ ba lá bài {cards.map(c => c.name).join(", ")}, 
                    tổng quan về {categoryNames[category].toLowerCase()} của bạn cho thấy một hành trình 
                    từ quá khứ đến tương lai đầy ý nghĩa. Mỗi lá bài mang thông điệp riêng, 
                    kết hợp lại sẽ vẽ nên bức tranh toàn cảnh cho lĩnh vực này.
                  </p>
                </div>
              </ScrollResultCard>
            </motion.div>
          )}

          {/* Individual Card Interpretations */}
          {!isLoadingAi && cards.map((card, index) => {
            const hasImageError = imageErrors.has(card.name_short);
            return (
              <motion.div
                key={card.name_short}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.15 }}
                className="mb-4"
              >
                <ScrollResultCard>
                  <div className="flex items-start gap-3">
                    <div 
                      className={`w-14 h-20 rounded-lg border-2 border-festive-gold flex-shrink-0 shadow-lg overflow-hidden ${
                        card.isReversed ? "rotate-180" : ""
                      }`}
                    >
                      {!hasImageError ? (
                        <img
                          src={getCardImageUrl(card)}
                          alt={card.name}
                          className="w-full h-full object-cover"
                          onError={() => handleImageError(card.name_short)}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center">
                          <span className="text-xl">{cardIcons[index]}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-festive-gold text-xs font-semibold bg-festive-brown/20 px-2 py-0.5 rounded">
                          {cardPositionLabels[index]}
                        </span>
                        {card.isReversed && (
                          <span className="text-festive-red text-xs font-semibold bg-festive-red/10 px-2 py-0.5 rounded">
                            Lá Ngược
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-festive-brown text-base font-sans">
                        {card.name}
                      </h3>
                      <p className="text-sm text-festive-brown/80 font-sans mt-2 leading-relaxed">
                        {getInterpretation(card, index)}
                      </p>
                    </div>
                  </div>
                </ScrollResultCard>
              </motion.div>
            );
          })}

          {/* Advice */}
          {!isLoadingAi && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mb-6"
            >
              <ScrollResultCard title="Lời Khuyên">
                <p className="text-sm text-festive-brown text-center leading-relaxed font-sans">
                  Hãy nhớ rằng Tarot chỉ là công cụ hướng dẫn, không phải định mệnh cố định. 
                  Bạn có quyền tự do lựa chọn và thay đổi cuộc sống của mình. 
                  Hãy lấy những thông điệp này làm nguồn cảm hứng để hành động tích cực! 🌟
                </p>
              </ScrollResultCard>
            </motion.div>
          )}

          {/* Actions */}
          <motion.div
            className="flex gap-3 pb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <FestiveButton
              onClick={() => navigate("/")}
              icon={Home}
              compact
              variant="secondary"
              className="flex-1 whitespace-nowrap"
            >
              Trang chủ
            </FestiveButton>

            <FestiveButton 
              onClick={handleShare}
              icon={Share2}
              compact
              className="flex-1"
            >
              Chia sẻ
            </FestiveButton>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TarotResultPage;
