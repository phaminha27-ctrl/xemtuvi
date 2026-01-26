import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Camera, Calendar, Settings, Hash, Sparkles } from "lucide-react";
import FestiveButton from "@/components/FestiveButton";
import IconButton from "@/components/IconButton";
import SettingsModal from "@/components/SettingsModal";
import homeBackground from "@/assets/home-background.png";

const HomePage = () => {
  const navigate = useNavigate();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col relative">
      <img
        src={homeBackground}
        alt=""
        className="fixed inset-0 w-full h-full object-cover object-center"
        aria-hidden="true"
      />

      <div className="absolute top-3 right-4 z-20">
        <IconButton onClick={() => setIsSettingsOpen(true)} label="CÀI ĐẶT">
          <Settings 
            className="w-7 h-7" 
            style={{ 
              color: "#FFF9C4",
              filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.5))"
            }}
          />
        </IconButton>
      </div>
      
      <div className="flex-1 relative z-10" />
      
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 relative z-10">
        <div className="flex flex-col gap-3 w-full max-w-xs sm:max-w-sm md:max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FestiveButton
              icon={Camera}
              onClick={() => navigate("/scan")}
              className="w-full"
            >
              Qua Khuôn Mặt
            </FestiveButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <FestiveButton
              icon={Calendar}
              variant="secondary"
              onClick={() => navigate("/form")}
              className="w-full"
            >
              Theo Ngày Sinh
            </FestiveButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <FestiveButton
              icon={Hash}
              variant="orange"
              onClick={() => navigate("/numerology")}
              className="w-full"
            >
              Xem Thần Số Học
            </FestiveButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <FestiveButton
              icon={Sparkles}
              variant="purple"
              onClick={() => navigate("/tarot")}
              className="w-full"
            >
              Xem Tarot
            </FestiveButton>
          </motion.div>
        </div>
      </div>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
};

export default HomePage;
