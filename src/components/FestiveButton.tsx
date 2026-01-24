import { motion } from "framer-motion";
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface FestiveButtonProps {
  children: ReactNode;
  onClick?: () => void;
  icon?: LucideIcon;
  variant?: "primary" | "secondary";
  className?: string;
}

const FestiveButton = ({
  children,
  onClick,
  icon: Icon,
  variant = "primary",
  className = "",
}: FestiveButtonProps) => {
  // Wave pattern SVG as data URI
  const wavePattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='20' viewBox='0 0 40 20'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1' stroke-opacity='0.2'%3E%3Cpath d='M0 20 A20 20 0 0 1 40 20'/%3E%3Cpath d='M5 20 A15 15 0 0 1 35 20'/%3E%3Cpath d='M10 20 A10 10 0 0 1 30 20'/%3E%3Cpath d='M15 20 A5 5 0 0 1 25 20'/%3E%3C/g%3E%3C/svg%3E")`;

  const gradients = {
    primary: "linear-gradient(180deg, #00A396 0%, #007D75 100%)",
    secondary: "linear-gradient(180deg, #C92A2A 0%, #A61E1E 100%)",
  };

  return (
    <motion.button
      className={`
        relative flex items-center px-6 py-2 cursor-pointer rounded-full overflow-hidden
        border-[3px] border-[#F5D27B] outline-none
        ${className}
      `}
      style={{
        backgroundImage: `${wavePattern}, ${gradients[variant]}`,
        backgroundSize: "35px 18px, 100% 100%",
        backgroundRepeat: "repeat",
        boxShadow: "0px 6px 0px 0px #8B5E34",
      }}
      onClick={onClick}
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
          className="w-[50px] h-[50px] rounded-full flex items-center justify-center mr-4 z-10"
          style={{
            backgroundColor: "#F5D27B",
            border: "2px solid #8B5E34",
            boxShadow: "inset 0 0 5px rgba(0,0,0,0.1)",
          }}
        >
          <Icon className="w-7 h-7" style={{ color: "#5d3e21" }} />
        </div>
      )}

      {/* Text group */}
      <div className="flex flex-col text-left z-10">
        <span
          className="font-extrabold uppercase leading-tight"
          style={{
            color: "#FFF9C4",
            fontSize: "20px",
            textShadow: "1px 2px 3px rgba(0, 0, 0, 0.4)",
          }}
        >
          XEM TỬ VI
        </span>
        <span
          className="font-extrabold uppercase leading-tight"
          style={{
            color: "#FFF9C4",
            fontSize: "24px",
            textShadow: "1px 2px 3px rgba(0, 0, 0, 0.4)",
          }}
        >
          {children}
        </span>
      </div>
    </motion.button>
  );
};

export default FestiveButton;
