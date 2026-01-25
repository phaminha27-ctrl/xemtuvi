import { motion } from "framer-motion";
import { useAudio } from "@/contexts/AudioContext";

interface IconButtonProps {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}

const wavePattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='20' viewBox='0 0 40 20'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1' stroke-opacity='0.15'%3E%3Cpath d='M0 20 A20 20 0 0 1 40 20'/%3E%3Cpath d='M5 20 A15 15 0 0 1 35 20'/%3E%3Cpath d='M10 20 A10 10 0 0 1 30 20'/%3E%3Cpath d='M15 20 A5 5 0 0 1 25 20'/%3E%3C/g%3E%3C/svg%3E")`;

const IconButton = ({ onClick, label, children }: IconButtonProps) => {
  const { playClickSound, startBgMusic } = useAudio();
  return (
    <motion.div 
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.button
        onClick={() => {
          playClickSound();
          startBgMusic();
          onClick();
        }}
        className="relative w-[70px] h-[50px] rounded-[20px] cursor-pointer flex justify-center items-center outline-none"
        style={{
          border: "3px solid #F5D27B",
          boxShadow: "0px 5px 0px 0px #8B5E34",
          backgroundImage: `${wavePattern}, linear-gradient(180deg, #00A396, #007D75)`,
          backgroundSize: "30px, 100%",
          backgroundRepeat: "repeat",
        }}
        whileTap={{ y: 3, boxShadow: "0px 2px 0px 0px #8B5E34" }}
        whileHover={{ scale: 1.05 }}
      >
        {/* Inner border */}
        <div 
          className="absolute top-[2px] left-[2px] right-[2px] bottom-[2px] rounded-[16px] pointer-events-none"
          style={{ border: "2px solid rgba(0, 50, 45, 0.4)" }}
        />
        {children}
      </motion.button>
      
      <span 
        className="text-[13px] font-black uppercase tracking-wide"
        style={{ 
          color: "#FFF9C4",
          textShadow: "2px 2px 0px #000, 1px 1px 4px rgba(0,0,0,0.8)"
        }}
      >
        {label}
      </span>
    </motion.div>
  );
};

export default IconButton;
