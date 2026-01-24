import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Camera, Calendar } from "lucide-react";
import FestiveButton from "@/components/FestiveButton";
import homeBackground from "@/assets/home-background.png";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${homeBackground})` }}
    >
      {/* Top half - empty for background */}
      <div className="flex-1" />
      
      {/* Bottom half - buttons centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="flex flex-col gap-4 w-full max-w-sm">
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
            transition={{ duration: 0.5, delay: 0.4 }}
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
        </div>
      </div>
    </div>
  );
};

export default HomePage;
