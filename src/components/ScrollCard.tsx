import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollCardProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

const ScrollCard = ({ children, className = "", title }: ScrollCardProps) => {
  return (
    <motion.div
      className={`scroll-card p-6 ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      {title && (
        <div className="red-banner px-4 py-2 rounded-lg mb-4 text-center">
          <h3 className="text-festive-cream font-bold text-lg uppercase tracking-wide">
            {title}
          </h3>
        </div>
      )}
      {children}
    </motion.div>
  );
};

export default ScrollCard;
