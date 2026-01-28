import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Heart, Briefcase, DollarSign, Activity, Home, Sparkles, GraduationCap, Users } from "lucide-react";
import FestiveButton from "@/components/FestiveButton";
import resultBackground from "@/assets/result-background.jpg";
import { TarotCard, getCardImageUrl } from "@/hooks/useTarotCards";
import { synthesizeReading, SynthesisResult, getVietnameseName } from "@/services/tarot-logic";

const cardPositionLabels = ["Quá Khứ", "Hiện Tại", "Tương Lai"];
const cardIcons = ["🌙", "☀️", "⭐"];

// Face result mock data
const faceResultData = {
  summary: "Khuôn mặt bạn toát lên khí chất vương giả, năm Bính Ngọ 2026 sẽ là năm hanh thông với nhiều cơ hội phát triển sự nghiệp và tình duyên tốt đẹp.",
  categories: [
    {
      icon: Briefcase,
      title: "Sự Nghiệp",
      description: "Vận thế tốt, cần chủ ý rèn chữ nghĩ ngợi. Có quý nhân phù trợ, thuận lợi trong công việc.",
      iconBg: "from-blue-500 to-blue-700",
    },
    {
      icon: Heart,
      title: "Tình Duyên",
      description: "Gặp gỡ người mới, tình cảm tiến triển tốt đẹp. Người đã có đôi sẽ thêm gắn bó.",
      iconBg: "from-pink-500 to-rose-600",
    },
    {
      icon: DollarSign,
      title: "Tài Lộc",
      description: "Tiền tài hanh thông, có cơ hội đầu tư sinh lời. Cần cẩn trọng chi tiêu.",
      iconBg: "from-yellow-500 to-amber-600",
    },
    {
      icon: Activity,
      title: "Sức Khỏe",
      description: "Vận thế tốt, cần chú ý rèn luyện sức khỏe. Tránh làm việc quá sức.",
      iconBg: "from-green-500 to-emerald-600",
    },
  ],
};

// Form result data
const formResultData = {
  overall: {
    title: "Tổng Quan Năm Bính Ngọ 2026",
    content: "Năm Bính Ngọ 2026 đánh dấu một bước ngoặt quan trọng trong cuộc đời bạn. Với sự kết hợp của ngũ hành và can chi, đây là năm thuận lợi để phát triển sự nghiệp và mở rộng các mối quan hệ. Hãy nắm bắt cơ hội và tiến về phía trước!",
    score: 85,
  },
  categories: [
    {
      icon: Briefcase,
      title: "Sự Nghiệp",
      score: 90,
      content: "Năm nay sự nghiệp phát triển mạnh mẽ. Có nhiều cơ hội thăng tiến và được cấp trên tin tưởng.",
      iconBg: "from-blue-500 to-blue-700",
    },
    {
      icon: Heart,
      title: "Tình Duyên",
      score: 80,
      content: "Tình duyên năm nay khá tốt. Người độc thân có cơ hội gặp người ý hợp tâm đầu.",
      iconBg: "from-pink-500 to-rose-600",
    },
    {
      icon: DollarSign,
      title: "Tài Lộc",
      score: 75,
      content: "Tài lộc năm nay ổn định. Thu nhập chính tăng trưởng tốt.",
      iconBg: "from-yellow-500 to-amber-600",
    },
    {
      icon: Activity,
      title: "Sức Khỏe",
      score: 70,
      content: "Sức khỏe cần được chú ý nhiều hơn năm nay.",
      iconBg: "from-green-500 to-emerald-600",
    },
    {
      icon: GraduationCap,
      title: "Học Vấn",
      score: 88,
      content: "Năm thuận lợi cho việc học hành và thi cử.",
      iconBg: "from-purple-500 to-violet-600",
    },
    {
      icon: Users,
      title: "Gia Đình",
      score: 82,
      content: "Quan hệ gia đình hòa thuận, ấm áp.",
      iconBg: "from-orange-500 to-red-500",
    },
  ],
  luckyInfo: {
    numbers: [3, 8, 15, 23, 38],
    colors: ["Đỏ", "Vàng", "Xanh lá"],
    directions: ["Đông Nam", "Nam"],
    months: ["Tháng 3", "Tháng 8", "Tháng 10"],
  },
};

interface FormData {
  name: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  gender: string;
}

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

const SharedResultPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type"); // "face", "tarot", or "form"
  
  // Tarot states
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [question, setQuestion] = useState("Xem tổng quan");
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [synthesis, setSynthesis] = useState<SynthesisResult | null>(null);
  
  // Form states
  const [formData, setFormData] = useState<FormData | null>(null);

  useEffect(() => {
    if (type === "tarot") {
      // Parse tarot data from URL
      const cardsParam = searchParams.get("cards");
      const questionParam = searchParams.get("q");
      
      if (cardsParam) {
        try {
          const parsedCards = JSON.parse(decodeURIComponent(cardsParam));
          setCards(parsedCards);
          
          if (questionParam) {
            setQuestion(decodeURIComponent(questionParam));
          }
          
          if (parsedCards.length >= 3) {
            const result = synthesizeReading(
              parsedCards.map((c: TarotCard) => ({ name: c.name, isReversed: c.isReversed })),
              questionParam ? decodeURIComponent(questionParam) : "Xem tổng quan"
            );
            setSynthesis(result);
          }
        } catch (e) {
          console.error("Failed to parse shared tarot data:", e);
        }
      }
    } else if (type === "form") {
      // Parse form data from URL
      const dataParam = searchParams.get("data");
      if (dataParam) {
        try {
          const parsedData = JSON.parse(decodeURIComponent(dataParam));
          setFormData(parsedData);
        } catch (e) {
          console.error("Failed to parse shared form data:", e);
        }
      }
    }
  }, [type, searchParams]);

  const handleImageError = (nameShort: string) => {
    setImageErrors(prev => new Set(prev).add(nameShort));
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-700";
    if (score >= 70) return "text-amber-600";
    return "text-red-700";
  };

  const cardParts = synthesis ? [synthesis.part2_past, synthesis.part3_present, synthesis.part4_future] : [];

  const renderFaceResult = () => (
    <>
      {/* Header */}
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-festive-gold drop-shadow-lg">
          Kết Quả Xem Tướng
        </h1>
        <p className="text-festive-cream/80 mt-2 text-sm sm:text-base font-sans">Năm Bính Ngọ 2026</p>
      </motion.div>

      {/* Summary card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <ScrollResultCard title="Tử Vi Bính Ngọ">
          <p className="text-gray-700 text-center leading-relaxed font-sans">
            {faceResultData.summary}
          </p>
        </ScrollResultCard>
      </motion.div>

      {/* Category cards */}
      {faceResultData.categories.map((category, index) => (
        <motion.div
          key={category.title}
          initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + index * 0.1 }}
          className="mb-4"
        >
          <ScrollResultCard>
            <div className="flex items-start gap-3">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${category.iconBg} flex items-center justify-center flex-shrink-0 border-2 border-white/30 shadow-lg`}>
                <category.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-festive-brown text-lg mb-1 font-sans">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-700 font-sans">
                  {category.description}
                </p>
              </div>
            </div>
          </ScrollResultCard>
        </motion.div>
      ))}
    </>
  );

  const renderTarotResult = () => (
    <>
      {/* Header */}
      <motion.div className="text-center mb-6" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-festive-gold drop-shadow-lg">Luận Giải Tarot</h1>
        {question !== "Xem tổng quan cuộc sống" && question !== "Xem tổng quan" && (
          <p className="text-festive-cream/80 mt-2 text-sm italic max-w-sm mx-auto">"{question}"</p>
        )}
      </motion.div>

      {/* Cards Display */}
      {cards.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-4">
          <ScrollResultCard title="Các Lá Bài">
            <div className="flex justify-center gap-3 flex-wrap">
              {cards.map((card, index) => {
                const hasImageError = imageErrors.has(card.name_short);
                return (
                  <div key={card.name_short} className="text-center">
                    <div className={`w-16 h-24 rounded-lg border-2 border-festive-gold mb-2 mx-auto shadow-lg overflow-hidden ${card.isReversed ? "rotate-180" : ""}`}>
                      {!hasImageError ? (
                        <img src={getCardImageUrl(card)} alt={card.name} className="w-full h-full object-cover" onError={() => handleImageError(card.name_short)} />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center">
                          <span className="text-2xl">{cardIcons[index]}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-festive-brown text-xs font-bold">{getVietnameseName(card.name)}</p>
                    <p className="text-festive-brown/60 text-[10px]">{cardPositionLabels[index]} {card.isReversed && "(Ngược)"}</p>
                  </div>
                );
              })}
            </div>
          </ScrollResultCard>
        </motion.div>
      )}

      {/* Synthesis */}
      {synthesis && (
        <>
          {/* Part 1: Overview */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-4">
            <ScrollResultCard title="Tổng Quan">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-festive-red to-festive-brown flex items-center justify-center flex-shrink-0 border-2 border-festive-gold/30 shadow-lg">
                  <Sparkles className="w-6 h-6 text-festive-cream" />
                </div>
                <div>
                  <p className="text-sm text-festive-brown font-sans leading-relaxed">{synthesis.part1_overview}</p>
                  <p className="text-xs text-festive-brown/70 font-sans mt-2">
                    Năng lượng: <span className="font-semibold text-festive-red">{synthesis.vibeDescriptor}</span>
                  </p>
                </div>
              </div>
            </ScrollResultCard>
          </motion.div>

          {/* Parts 2-4: Past, Present, Future */}
          {cardParts.map((part, index) => (
            <motion.div key={index} initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + index * 0.15 }} className="mb-4">
              <ScrollResultCard title={cardPositionLabels[index]}>
                <div className="flex items-start gap-3">
                  <div className={`w-14 h-20 rounded-lg border-2 border-festive-gold flex-shrink-0 shadow-lg overflow-hidden ${cards[index]?.isReversed ? "rotate-180" : ""}`}>
                    {cards[index] && !imageErrors.has(cards[index].name_short) ? (
                      <img src={getCardImageUrl(cards[index])} alt={cards[index].name} className="w-full h-full object-cover" onError={() => handleImageError(cards[index].name_short)} />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center">
                        <span className="text-xl">{cardIcons[index]}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-festive-brown font-sans leading-relaxed whitespace-pre-line">{part}</p>
                  </div>
                </div>
              </ScrollResultCard>
            </motion.div>
          ))}

          {/* Part 5: Advice */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="mb-6">
            <ScrollResultCard title="Lời Khuyên">
              <p className="text-sm text-festive-brown text-center leading-relaxed font-sans">
                💡 {synthesis.part5_advice}
              </p>
            </ScrollResultCard>
          </motion.div>
        </>
      )}
    </>
  );

  const renderFormResult = () => (
    <>
      {/* Header */}
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-festive-gold drop-shadow-lg">
          Kết Quả Tử Vi
        </h1>
        {formData && (
          <p className="text-festive-cream mt-2 font-sans">
            Kết quả của <span className="font-bold">{formData.name}</span>
          </p>
        )}
      </motion.div>

      {/* Overall score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <ScrollResultCard title={formResultData.overall.title}>
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-festive-gold to-festive-brown border-4 border-festive-brown shadow-lg">
              <span className="text-3xl font-bold text-white drop-shadow">
                {formResultData.overall.score}
              </span>
            </div>
            <p className="text-sm text-festive-brown mt-2 font-sans">Điểm vận mệnh</p>
          </div>
          <p className="text-gray-700 text-center leading-relaxed font-sans">
            {formResultData.overall.content}
          </p>
        </ScrollResultCard>
      </motion.div>

      {/* Category details */}
      {formResultData.categories.map((category, index) => (
        <motion.div
          key={category.title}
          initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 + index * 0.1 }}
          className="mb-4"
        >
          <ScrollResultCard>
            <div className="flex items-start gap-3">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${category.iconBg} flex items-center justify-center flex-shrink-0 border-2 border-white/30 shadow-lg`}>
                <category.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-festive-brown text-lg font-sans">
                    {category.title}
                  </h3>
                  <span className={`font-bold text-lg ${getScoreColor(category.score)} font-sans`}>
                    {category.score}/100
                  </span>
                </div>
                <p className="text-sm text-gray-700 font-sans">{category.content}</p>
              </div>
            </div>
          </ScrollResultCard>
        </motion.div>
      ))}

      {/* Lucky info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mb-6"
      >
        <ScrollResultCard title="Thông Tin May Mắn">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-bold text-festive-brown text-sm mb-1 font-sans">🔢 Số may mắn</h4>
              <p className="text-sm text-gray-700 font-sans">{formResultData.luckyInfo.numbers.join(", ")}</p>
            </div>
            <div>
              <h4 className="font-bold text-festive-brown text-sm mb-1 font-sans">🎨 Màu may mắn</h4>
              <p className="text-sm text-gray-700 font-sans">{formResultData.luckyInfo.colors.join(", ")}</p>
            </div>
            <div>
              <h4 className="font-bold text-festive-brown text-sm mb-1 font-sans">🧭 Hướng tốt</h4>
              <p className="text-sm text-gray-700 font-sans">{formResultData.luckyInfo.directions.join(", ")}</p>
            </div>
            <div>
              <h4 className="font-bold text-festive-brown text-sm mb-1 font-sans">📅 Tháng đẹp</h4>
              <p className="text-sm text-gray-700 font-sans">{formResultData.luckyInfo.months.join(", ")}</p>
            </div>
          </div>
        </ScrollResultCard>
      </motion.div>
    </>
  );

  const renderContent = () => {
    switch (type) {
      case "face":
        return renderFaceResult();
      case "form":
        return renderFormResult();
      case "tarot":
      default:
        return renderTarotResult();
    }
  };

  return (
    <div className="relative min-h-screen">
      <img src={resultBackground} alt="" className="fixed inset-0 w-full h-full object-cover" />
      
      <div className="relative z-10 min-h-screen px-4 sm:px-6 md:px-8 py-6 sm:py-8 font-sans">
        <div className="max-w-xs sm:max-w-sm md:max-w-lg mx-auto">
          {renderContent()}

          {/* CTA Button */}
          <motion.div
            className="pb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <FestiveButton 
              onClick={() => navigate("/")} 
              icon={Home} 
              variant="primary"
              className="w-full"
            >
              Tôi cũng muốn thử!
            </FestiveButton>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SharedResultPage;
