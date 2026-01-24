import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Camera, Calendar } from "lucide-react";
import FestiveButton from "@/components/FestiveButton";
import homeBackground from "@/assets/home-background.png";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background Image - Responsive */}
      <img
        src={homeBackground}
        alt=""
        className="fixed inset-0 w-full h-full object-cover object-center"
        aria-hidden="true"
      />
      
      {/* Top half - empty for background */}
      <div className="flex-1 relative z-10" />
      
      {/* Bottom half - buttons centered */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 relative z-10">
        <div className="flex flex-col gap-4 w-full max-w-xs sm:max-w-sm md:max-w-md">
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
