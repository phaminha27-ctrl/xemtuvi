import { ReactNode } from "react";
import { motion } from "framer-motion";
import festiveBackground from "@/assets/festive-background.jpg";

interface FestiveLayoutProps {
  children: ReactNode;
}

const FestiveLayout = ({ children }: FestiveLayoutProps) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image - Responsive */}
      <img
        src={festiveBackground}
        alt=""
        className="fixed inset-0 w-full h-full object-cover object-center"
        aria-hidden="true"
      />
      
      {/* Overlay for readability */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
      
      {/* Floating decorations */}
      <motion.div
        className="fixed top-10 left-5 w-8 h-8 rounded-full bg-festive-gold opacity-60"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="fixed top-20 right-10 w-6 h-6 rounded-full bg-festive-gold opacity-50"
        animate={{
          y: [0, -15, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
      <motion.div
        className="fixed top-32 left-1/4 w-4 h-4 rounded-full bg-festive-gold opacity-40"
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default FestiveLayout;
