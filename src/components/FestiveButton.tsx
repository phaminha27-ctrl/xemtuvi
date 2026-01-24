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
  const baseStyles = `
    flex items-center justify-center gap-3 px-8 py-4 rounded-full
    font-bold text-lg uppercase tracking-wide
    border-4 shadow-lg
    transition-all duration-300
  `;

  const variantStyles = {
    primary: `
      bg-gradient-to-br from-festive-green to-emerald-800
      border-festive-gold text-festive-cream
      hover:from-emerald-600 hover:to-emerald-900
    `,
    secondary: `
      bg-gradient-to-br from-festive-red to-red-800
      border-festive-gold text-festive-cream
      hover:from-red-600 hover:to-red-900
    `,
  };

  return (
    <motion.button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {Icon && (
        <div className="w-10 h-10 flex items-center justify-center bg-parchment rounded-lg">
          <Icon className="w-6 h-6 text-festive-brown" />
        </div>
      )}
      <span className="text-shadow-festive">{children}</span>
    </motion.button>
  );
};

export default FestiveButton;
