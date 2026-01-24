import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import loadingMascot from "@/assets/loading-mascot.png";
import formBackground from "@/assets/form-background.jpg";

const LoadingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [progress, setProgress] = useState(0);

  const scanType = location.state?.type || "form";

  useEffect(() => {
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
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [navigate, scanType]);

  return (
    <div className="fixed inset-0 z-50">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${formBackground})` }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Loading mascot with floating animation */}
        <motion.div 
          className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 mb-8"
          animate={{ 
            y: [0, -15, 0],
            scale: [1, 1.02, 1]
          }}
          transition={{ 
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <img
            src={loadingMascot}
            alt="Loading mascot"
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </motion.div>

        {/* Loading text */}
        <div className="text-center mb-6">
          <motion.h2
            className="text-festive-gold text-2xl sm:text-3xl font-bold mb-2"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ĐANG LUẬN GIẢI
          </motion.h2>
          <p className="text-festive-cream text-base sm:text-lg">
            Xin chờ một chút...
          </p>
        </div>

        {/* Progress bar - red to yellow gradient */}
        <div className="w-64 sm:w-72 md:w-80 h-3 bg-black/40 rounded-full overflow-hidden border border-festive-gold/50">
          <motion.div
            className="h-full bg-gradient-to-r from-festive-red to-festive-gold"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Percentage */}
        <p className="text-festive-gold font-bold text-sm mt-2">{progress}%</p>
      </div>
    </div>
  );
};

export default LoadingPage;
