import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import FestiveLayout from "@/components/FestiveLayout";
import horseMascot from "@/assets/horse-mascot.png";

const loadingMessages = [
  "Đang phân tích vận mệnh...",
  "Xem xét ngũ hành...",
  "Tính toán lá số tử vi...",
  "Dự đoán tài lộc...",
  "Phân tích tình duyên...",
  "Hoàn tất kết quả...",
];

const LoadingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const scanType = location.state?.type || "form";

  useEffect(() => {
    // Update message every 800ms
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 800);

    // Update progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 2, 100));
    }, 100);

    // Navigate after 5 seconds
    const timeout = setTimeout(() => {
      if (scanType === "face") {
        navigate("/face-result");
      } else {
        navigate("/result");
      }
    }, 5000);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [navigate, scanType]);

  return (
    <FestiveLayout>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
        {/* Spinning circles */}
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 mb-6 sm:mb-8">
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-festive-gold border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Middle ring */}
          <motion.div
            className="absolute inset-4 rounded-full border-4 border-festive-red border-b-transparent"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Inner ring */}
          <motion.div
            className="absolute inset-8 rounded-full border-4 border-festive-green border-t-transparent border-l-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />

          {/* Mascot in center */}
          <motion.div
            className="absolute inset-12 flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <img
              src={horseMascot}
              alt="Loading mascot"
              className="w-full h-full object-contain"
            />
          </motion.div>
        </div>

        {/* Loading text */}
        <motion.p
          key={messageIndex}
          className="text-festive-cream text-lg sm:text-xl md:text-2xl font-medium text-center mb-4 sm:mb-6 px-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {loadingMessages[messageIndex]}
        </motion.p>

        {/* Progress bar */}
        <div className="w-56 sm:w-64 md:w-80 h-3 sm:h-4 bg-parchment rounded-full overflow-hidden border-2 border-festive-gold">
          <motion.div
            className="h-full bg-gradient-to-r from-festive-red via-festive-gold to-festive-green"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Percentage */}
        <p className="text-festive-gold font-bold text-lg mt-2">{progress}%</p>

        {/* Decorative sparkles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-festive-gold rounded-full"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    </FestiveLayout>
  );
};

export default LoadingPage;
