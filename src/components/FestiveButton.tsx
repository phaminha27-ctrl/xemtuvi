import { motion } from "framer-motion";
import { ReactNode, useCallback } from "react";
import { LucideIcon } from "lucide-react";
import buttonClickSound from "@/assets/button-click.mp3";

interface FestiveButtonProps {
  children: ReactNode;
  onClick?: () => void;
  icon?: LucideIcon;
  variant?: "primary" | "secondary" | "gold";
  compact?: boolean;
  className?: string;
}

const FestiveButton = ({
  children,
  onClick,
  icon: Icon,
  variant = "primary",
  compact = false,
  className = "",
}: FestiveButtonProps) => {
  // Wave pattern SVG as data URI
  const wavePattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='20' viewBox='0 0 40 20'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1' stroke-opacity='0.2'%3E%3Cpath d='M0 20 A20 20 0 0 1 40 20'/%3E%3Cpath d='M5 20 A15 15 0 0 1 35 20'/%3E%3Cpath d='M10 20 A10 10 0 0 1 30 20'/%3E%3Cpath d='M15 20 A5 5 0 0 1 25 20'/%3E%3C/g%3E%3C/svg%3E")`;

  const gradients = {
    primary: "linear-gradient(180deg, #00A396 0%, #007D75 100%)",
    secondary: "linear-gradient(180deg, #C92A2A 0%, #A61E1E 100%)",
    gold: "linear-gradient(180deg, #F5D27B 0%, #C49A45 100%)",
  };

  const textColors = {
    primary: "#FFF9C4",
    secondary: "#FFF9C4",
    gold: "#5d3e21",
  };

  return (
    <motion.button
      className={`
        relative flex items-center justify-center w-full cursor-pointer rounded-full overflow-hidden
        border-[3px] border-[#F5D27B] outline-none
        ${compact ? 'px-3 py-1' : 'px-4 sm:px-6 py-2'}
        ${className}
      `}
      style={{
        backgroundImage: `${wavePattern}, ${gradients[variant]}`,
        backgroundSize: "35px 18px, 100% 100%",
        backgroundRepeat: "repeat",
        boxShadow: "0px 6px 0px 0px #8B5E34",
      }}
      onClick={() => {
        const audio = new Audio(buttonClickSound);
        audio.volume = 0.5;
        audio.play().catch(() => {});
        onClick?.();
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98, y: 3, boxShadow: "0px 3px 0px 0px #8B5E34" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Inner border */}
      <div
        className="absolute inset-[1px] rounded-full pointer-events-none"
        style={{ border: "1.5px solid rgba(0, 50, 45, 0.3)" }}
      />

      {/* Icon box */}
      {Icon && (
        <div
          className={`${compact ? 'w-8 h-8' : 'w-10 h-10 sm:w-[50px] sm:h-[50px]'} rounded-full flex items-center justify-center mr-2 sm:mr-3 z-10 flex-shrink-0`}
          style={{
            backgroundColor: "#F5D27B",
            border: "2px solid #8B5E34",
            boxShadow: "inset 0 0 5px rgba(0,0,0,0.1)",
          }}
        >
          <Icon className={`${compact ? 'w-4 h-4' : 'w-5 h-5 sm:w-7 sm:h-7'}`} style={{ color: "#5d3e21" }} />
        </div>
      )}

      {/* Text - single line for compact mode */}
      {compact ? (
        <span
          className="font-extrabold uppercase leading-tight text-sm z-10"
          style={{
            color: textColors[variant],
            textShadow: variant === "gold" ? "none" : "1px 2px 3px rgba(0, 0, 0, 0.4)",
          }}
        >
          {children}
        </span>
      ) : (
        <div className="flex flex-col text-left z-10 min-w-0">
          <span
            className="font-extrabold uppercase leading-tight text-sm sm:text-base"
            style={{
              color: textColors[variant],
              textShadow: variant === "gold" ? "none" : "1px 2px 3px rgba(0, 0, 0, 0.4)",
            }}
          >
            XEM TỬ VI
          </span>
          <span
            className="font-extrabold uppercase leading-tight text-base sm:text-lg truncate"
            style={{
              color: textColors[variant],
              textShadow: variant === "gold" ? "none" : "1px 2px 3px rgba(0, 0, 0, 0.4)",
            }}
          >
            {children}
          </span>
        </div>
      )}
    </motion.button>
  );
};

export default FestiveButton;
