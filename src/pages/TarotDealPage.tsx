import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import FestiveButton from "@/components/FestiveButton";
import formBackground from "@/assets/form-background.jpg";
import { useAudio } from "@/contexts/AudioContext";

// Tarot card data (Major Arcana)
const tarotCards = [
  { id: 0, name: "The Fool", nameVi: "Kẻ Ngốc", meaning: "Khởi đầu mới, tự do, ngây thơ" },
  { id: 1, name: "The Magician", nameVi: "Pháp Sư", meaning: "Kỹ năng, tập trung, sáng tạo" },
  { id: 2, name: "The High Priestess", nameVi: "Nữ Tư Tế", meaning: "Trực giác, bí ẩn, tiềm thức" },
  { id: 3, name: "The Empress", nameVi: "Hoàng Hậu", meaning: "Sáng tạo, sung túc, thiên nhiên" },
  { id: 4, name: "The Emperor", nameVi: "Hoàng Đế", meaning: "Quyền lực, cấu trúc, ổn định" },
  { id: 5, name: "The Hierophant", nameVi: "Giáo Hoàng", meaning: "Truyền thống, tâm linh, hướng dẫn" },
  { id: 6, name: "The Lovers", nameVi: "Tình Nhân", meaning: "Tình yêu, hòa hợp, lựa chọn" },
  { id: 7, name: "The Chariot", nameVi: "Cỗ Xe", meaning: "Chiến thắng, quyết tâm, ý chí" },
  { id: 8, name: "Strength", nameVi: "Sức Mạnh", meaning: "Dũng cảm, kiên nhẫn, bình tĩnh" },
  { id: 9, name: "The Hermit", nameVi: "Ẩn Sĩ", meaning: "Nội tâm, tìm kiếm, trí tuệ" },
  { id: 10, name: "Wheel of Fortune", nameVi: "Vòng Xoay", meaning: "Vận may, chu kỳ, thay đổi" },
  { id: 11, name: "Justice", nameVi: "Công Lý", meaning: "Công bằng, sự thật, nhân quả" },
  { id: 12, name: "The Hanged Man", nameVi: "Người Treo", meaning: "Hy sinh, buông bỏ, góc nhìn mới" },
  { id: 13, name: "Death", nameVi: "Tử Thần", meaning: "Kết thúc, chuyển đổi, tái sinh" },
  { id: 14, name: "Temperance", nameVi: "Điều Độ", meaning: "Cân bằng, kiên nhẫn, hài hòa" },
  { id: 15, name: "The Devil", nameVi: "Ác Quỷ", meaning: "Cám dỗ, ràng buộc, ham muốn" },
  { id: 16, name: "The Tower", nameVi: "Tháp", meaning: "Đổ vỡ, biến động, giải phóng" },
  { id: 17, name: "The Star", nameVi: "Ngôi Sao", meaning: "Hy vọng, cảm hứng, bình yên" },
  { id: 18, name: "The Moon", nameVi: "Mặt Trăng", meaning: "Ảo giác, trực giác, tiềm thức" },
  { id: 19, name: "The Sun", nameVi: "Mặt Trời", meaning: "Niềm vui, thành công, sự sống" },
  { id: 20, name: "Judgement", nameVi: "Phán Xét", meaning: "Thức tỉnh, tái sinh, quyết định" },
  { id: 21, name: "The World", nameVi: "Thế Giới", meaning: "Hoàn thành, thành tựu, tròn đầy" },
];

const TarotDealPage = () => {
  const navigate = useNavigate();
  const { playClickSound } = useAudio();
  const [dealtCards, setDealtCards] = useState<typeof tarotCards>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [dealComplete, setDealComplete] = useState(false);

  useEffect(() => {
    // Deal 3 random cards with animation
    const shuffled = [...tarotCards].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 3);
    
    // Deal cards one by one
    selected.forEach((card, index) => {
      setTimeout(() => {
        setDealtCards(prev => [...prev, card]);
        if (index === 2) {
          setTimeout(() => setDealComplete(true), 500);
        }
      }, index * 400);
    });
  }, []);

  const handleFlipCard = (cardId: number) => {
    if (!flippedCards.includes(cardId)) {
      playClickSound();
      setFlippedCards(prev => [...prev, cardId]);
    }
  };

  const handleViewResult = () => {
    sessionStorage.setItem("tarotCards", JSON.stringify(dealtCards));
    navigate("/tarot/result");
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
              const isFlipped = flippedCards.includes(card.id);
              return (
                <motion.div
                  key={card.id}
                  className="relative cursor-pointer perspective-1000"
                  initial={{ opacity: 0, y: -100, rotate: -20 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ delay: index * 0.3, type: "spring", stiffness: 100 }}
                  onClick={() => handleFlipCard(card.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="relative w-24 sm:w-28 h-36 sm:h-44"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Card back */}
                    <div
                      className="absolute inset-0 rounded-lg shadow-xl backface-hidden"
                      style={{
                        background: "linear-gradient(135deg, #2D1B4E 0%, #1A0F2E 100%)",
                        border: "2px solid #F5D27B",
                        backfaceVisibility: "hidden",
                      }}
                    >
                      <div className="absolute inset-2 rounded border border-festive-gold/30 flex items-center justify-center">
                        <div className="w-12 h-16 sm:w-14 sm:h-20 rounded border-2 border-festive-gold/50 flex items-center justify-center">
                          <span className="text-festive-gold text-2xl">✦</span>
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-0 right-0 text-center">
                        <span className="text-festive-cream/60 text-xs">Chạm để lật</span>
                      </div>
                    </div>

                    {/* Card front */}
                    <div
                      className="absolute inset-0 rounded-lg shadow-xl backface-hidden"
                      style={{
                        background: "linear-gradient(180deg, #FFF7E0 0%, #FCEEC7 100%)",
                        border: "2px solid #F5D27B",
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <div className="absolute inset-2 rounded border border-festive-brown/30 flex flex-col items-center justify-center p-2">
                        <span className="text-festive-brown text-3xl sm:text-4xl mb-1">
                          {["🌟", "🔮", "⚡"][index]}
                        </span>
                        <span className="text-festive-red font-bold text-xs sm:text-sm text-center leading-tight">
                          {card.nameVi}
                        </span>
                        <span className="text-festive-brown/70 text-[10px] sm:text-xs text-center mt-1">
                          {card.id}
                        </span>
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
