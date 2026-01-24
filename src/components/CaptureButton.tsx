import { motion } from "framer-motion";
import { Camera, Sparkles } from "lucide-react";

interface CaptureButtonProps {
  onClick: () => void;
  icon?: "camera" | "sparkles";
  label?: string;
}

const wavePattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='20' viewBox='0 0 40 20'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1' stroke-opacity='0.15'%3E%3Cpath d='M0 20 A20 20 0 0 1 40 20'/%3E%3Cpath d='M5 20 A15 15 0 0 1 35 20'/%3E%3Cpath d='M10 20 A10 10 0 0 1 30 20'/%3E%3Cpath d='M15 20 A5 5 0 0 1 25 20'/%3E%3C/g%3E%3C/svg%3E")`;

const CaptureButton = ({ onClick, icon = "camera", label = "CHỤP ẢNH" }: CaptureButtonProps) => {
  const IconComponent = icon === "camera" ? Camera : Sparkles;
  
  return (
    <motion.div
      className="relative"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Outer ring with 3D base */}
      <div
        className="w-[120px] h-[120px] rounded-full flex justify-center items-center relative"
        style={{
          border: "4px solid #F5D27B",
          background: "linear-gradient(180deg, #E63946, #9B1B1B)",
          boxShadow: "0px 6px 0px 0px #8B5E34, 0px 10px 16px rgba(0,0,0,0.6)",
        }}
      >
        {/* 4 Diamond Gems */}
        <div
          className="absolute w-[12px] h-[12px] rounded-[2px] z-10"
          style={{
            backgroundColor: "#00A396",
            border: "2px solid #F5D27B",
            boxShadow: "1px 1px 0px #8B5E34",
            transform: "rotate(45deg)",
            top: "-8px",
            left: "calc(50% - 8px)",
          }}
        />
        <div
          className="absolute w-[12px] h-[12px] rounded-[2px] z-10"
          style={{
            backgroundColor: "#00A396",
            border: "2px solid #F5D27B",
            boxShadow: "1px 1px 0px #8B5E34",
            transform: "rotate(45deg)",
            bottom: "-8px",
            left: "calc(50% - 8px)",
          }}
        />
        <div
          className="absolute w-[12px] h-[12px] rounded-[2px] z-10"
          style={{
            backgroundColor: "#00A396",
            border: "2px solid #F5D27B",
            boxShadow: "1px 1px 0px #8B5E34",
            transform: "rotate(45deg)",
            left: "-8px",
            top: "calc(50% - 8px)",
          }}
        />
        <div
          className="absolute w-[12px] h-[12px] rounded-[2px] z-10"
          style={{
            backgroundColor: "#00A396",
            border: "2px solid #F5D27B",
            boxShadow: "1px 1px 0px #8B5E34",
            transform: "rotate(45deg)",
            right: "-8px",
            top: "calc(50% - 8px)",
          }}
        />

        {/* Inner capture button */}
        <motion.button
          onClick={onClick}
          className="w-[105px] h-[105px] rounded-full flex flex-col justify-center items-center relative overflow-hidden outline-none cursor-pointer"
          style={{
            border: "2.2px solid #F5D27B",
            backgroundImage: `${wavePattern}, linear-gradient(180deg, #E63946, #9B1B1B)`,
            backgroundSize: "35px, 100%",
            boxShadow: "inset 0px 5px 10px rgba(255, 215, 0, 0.4)",
          }}
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.02 }}
        >
          {/* Light overlay from top gem */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: `radial-gradient(
                ellipse 90% 80% at 50% -15%,
                rgba(255, 235, 90, 0.9) 0%,
                rgba(255, 210, 50, 0.4) 45%,
                rgba(255, 210, 50, 0) 85%
              )`,
              mixBlendMode: "hard-light",
            }}
          />

          {/* Icon */}
          <IconComponent
            className="w-9 h-9 mb-1 relative z-10"
            style={{
              color: "#FFF9C4",
              filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.3)) sepia(30%) hue-rotate(5deg)",
            }}
          />

          {/* Label */}
          <span
            className="text-[13px] font-black uppercase relative z-10"
            style={{
              color: "#FFF9C4",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)",
            }}
          >
            {label}
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CaptureButton;
