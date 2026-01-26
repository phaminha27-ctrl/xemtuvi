import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Heart, Briefcase, DollarSign, Users, Activity } from "lucide-react";
import IconButton from "@/components/IconButton";
import formBackground from "@/assets/form-background.jpg";
import { useAudio } from "@/contexts/AudioContext";

const categories = [
  { id: "love", icon: Heart, title: "Tình Yêu", color: "from-pink-500 to-rose-600", description: "Tình cảm, hôn nhân, mối quan hệ" },
  { id: "career", icon: Briefcase, title: "Sự Nghiệp", color: "from-blue-500 to-indigo-600", description: "Công việc, thăng tiến, cơ hội" },
  { id: "finance", icon: DollarSign, title: "Tài Chính", color: "from-yellow-500 to-amber-600", description: "Tiền bạc, đầu tư, tài lộc" },
  { id: "family", icon: Users, title: "Gia Đình", color: "from-orange-500 to-red-500", description: "Cha mẹ, con cái, người thân" },
  { id: "health", icon: Activity, title: "Sức Khỏe", color: "from-green-500 to-emerald-600", description: "Thể chất, tinh thần, sức sống" },
];

const TarotCategoryPage = () => {
  const navigate = useNavigate();
  const { playClickSound, startBgMusic } = useAudio();

  const handleSelectCategory = (categoryId: string) => {
    playClickSound();
    startBgMusic();
    sessionStorage.setItem("tarotCategory", categoryId);
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
          Chọn Chủ Đề Bói Bài
        </motion.h1>
        <motion.p
          className="text-festive-cream text-sm mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Hãy chọn lĩnh vực bạn muốn khám phá
        </motion.p>

        <div className="w-full max-w-sm space-y-3">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => handleSelectCategory(category.id)}
              className="w-full p-4 rounded-xl border-2 border-festive-gold/50 bg-black/30 backdrop-blur-sm flex items-center gap-4 hover:bg-black/50 transition-all"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center flex-shrink-0 border-2 border-white/30 shadow-lg`}>
                <category.icon className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-festive-gold font-bold text-lg">{category.title}</h3>
                <p className="text-festive-cream/80 text-sm">{category.description}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TarotCategoryPage;
