import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Send, Heart, Briefcase, DollarSign, Users, Activity, User } from "lucide-react";
import IconButton from "@/components/IconButton";
import FestiveButton from "@/components/FestiveButton";
import { Textarea } from "@/components/ui/textarea";
import formBackground from "@/assets/form-background.jpg";
import { useAudio } from "@/contexts/AudioContext";

const categories = [
  { id: "love", icon: Heart, title: "Tình Yêu", color: "from-pink-500 to-rose-600" },
  { id: "career", icon: Briefcase, title: "Công Việc", color: "from-blue-500 to-indigo-600" },
  { id: "finance", icon: DollarSign, title: "Tài Chính", color: "from-yellow-500 to-amber-600" },
  { id: "self", icon: User, title: "Bản Thân", color: "from-purple-500 to-violet-600" },
  { id: "health", icon: Activity, title: "Sức Khỏe", color: "from-green-500 to-emerald-600" },
  { id: "family", icon: Users, title: "Gia Đình", color: "from-orange-500 to-red-500" },
];

const TarotQuestionPage = () => {
  const navigate = useNavigate();
  const { playClickSound, startBgMusic } = useAudio();
  const [question, setQuestion] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelect = (categoryId: string) => {
    playClickSound();
    setSelectedCategory(categoryId);
  };

  const handleContinue = () => {
    if (!selectedCategory) return;
    
    playClickSound();
    startBgMusic();
    
    // Store question and category
    sessionStorage.setItem("tarotQuestion", question.trim() || "Xem tổng quan");
    sessionStorage.setItem("tarotCategory", selectedCategory);
    
    navigate("/tarot/shuffle");
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background image */}
      <img
        src={formBackground}
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
        <motion.h1
          className="text-festive-gold text-2xl sm:text-3xl font-bold text-center mb-2 drop-shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Bói Bài Tarot
        </motion.h1>
        <motion.p
          className="text-festive-cream text-sm mb-6 text-center max-w-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Nhập câu hỏi của bạn và chọn chủ đề
        </motion.p>

        <div className="w-full max-w-sm space-y-5">
          {/* Question input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-festive-gold text-sm font-semibold mb-2">
              Câu hỏi của bạn (không bắt buộc)
            </label>
            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ví dụ: Tình hình công việc của tôi sẽ như thế nào?..."
              className="bg-black/30 border-festive-gold/50 text-festive-cream placeholder:text-festive-cream/40 min-h-[80px] resize-none focus:border-festive-gold"
              maxLength={200}
            />
            <p className="text-festive-cream/50 text-xs mt-1 text-right">
              {question.length}/200
            </p>
          </motion.div>

          {/* Category selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-festive-gold text-sm font-semibold mb-3">
              Chọn chủ đề <span className="text-festive-red">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${
                    selectedCategory === category.id
                      ? "border-festive-gold bg-festive-gold/20"
                      : "border-festive-gold/30 bg-black/30 hover:bg-black/50"
                  }`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center border border-white/20 shadow-lg`}>
                    <category.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className={`text-xs font-medium ${
                    selectedCategory === category.id ? "text-festive-gold" : "text-festive-cream/80"
                  }`}>
                    {category.title}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Continue button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="pt-4"
          >
            <FestiveButton
              icon={Send}
              onClick={handleContinue}
              compact
              className={`w-full ${!selectedCategory ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Tiếp Tục
            </FestiveButton>
            {!selectedCategory && (
              <p className="text-festive-cream/60 text-xs text-center mt-2">
                Vui lòng chọn chủ đề để tiếp tục
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TarotQuestionPage;
