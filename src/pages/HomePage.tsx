import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Camera, Calendar } from "lucide-react";
import FestiveLayout from "@/components/FestiveLayout";
import FestiveButton from "@/components/FestiveButton";
import horseMascot from "@/assets/horse-mascot.png";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <FestiveLayout>
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
        {/* Title */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-festive text-5xl md:text-7xl gold-text mb-2 text-shadow-festive">
            Tử Vi Tết
          </h1>
          <h2 className="font-festive text-4xl md:text-6xl text-festive-red text-shadow-festive">
            Bính Ngọ
          </h2>
          <motion.p
            className="text-6xl md:text-8xl font-bold text-festive-gold mt-2"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            2026
          </motion.p>
        </motion.div>

        {/* Mascot */}
        <motion.div
          className="w-48 h-48 md:w-64 md:h-64 mb-10"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.img
            src={horseMascot}
            alt="Linh vật ngựa Bính Ngọ"
            className="w-full h-full object-contain drop-shadow-2xl"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Buttons */}
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <FestiveButton
              icon={Camera}
              onClick={() => navigate("/scan")}
              className="w-full"
            >
              Xem Tử Vi<br />Qua Khuôn Mặt
            </FestiveButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <FestiveButton
              icon={Calendar}
              variant="secondary"
              onClick={() => navigate("/form")}
              className="w-full"
            >
              Xem Tử Vi<br />Theo Ngày Sinh
            </FestiveButton>
          </motion.div>
        </div>

        {/* Footer decoration */}
        <motion.div
          className="absolute bottom-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-festive-cream/80 text-sm font-medium">
            🧧 Chúc Mừng Năm Mới 🧧
          </p>
        </motion.div>
      </div>
    </FestiveLayout>
  );
};

export default HomePage;
