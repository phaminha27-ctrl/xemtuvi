import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCollectible } from "@/contexts/CollectibleContext";
import { X } from "lucide-react";
import loichucImage from "@/assets/loichuc.png";

interface Particle {
  x: number;
  y: number;
  color: string;
  velocity: { x: number; y: number };
  alpha: number;
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  color: string;
  speed: number;
  exploded: boolean;
}

const COLORS = ["#FF3F8E", "#04C2C9", "#2E5BFF", "#FFAC00", "#FFFFFF", "#A020F0"];

const CongratulationsModal = () => {
  const { showCongrats, setShowCongrats } = useCollectible();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const rocketsRef = useRef<Rocket[]>([]);
  const startTimeRef = useRef<number>(0);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    if (!showCongrats) {
      setShowImage(false);
      return;
    }

    // Show image after a short delay
    const imageTimer = setTimeout(() => setShowImage(true), 300);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    particlesRef.current = [];
    rocketsRef.current = [];

    const explode = (x: number, y: number, color: string) => {
      const count = 60;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 / count) * i;
        const speed = Math.random() * 4 + 2;
        particlesRef.current.push({
          x,
          y,
          color,
          velocity: {
            x: Math.cos(angle) * speed,
            y: Math.sin(angle) * speed,
          },
          alpha: 1,
        });
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Launch rockets infinitely with low frequency
      if (Math.random() < 0.02) {
        const randomX = Math.random() * canvas.width;
        const randomY = Math.random() * (canvas.height * 0.6);
        rocketsRef.current.push({
          x: randomX,
          y: canvas.height,
          targetY: randomY,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          speed: 4,
          exploded: false,
        });
      }

      // Update and draw rockets
      rocketsRef.current = rocketsRef.current.filter((rocket) => {
        rocket.y -= rocket.speed;
        if (rocket.y <= rocket.targetY && !rocket.exploded) {
          rocket.exploded = true;
          explode(rocket.x, rocket.y, rocket.color);
          return false;
        }

        ctx.beginPath();
        ctx.arc(rocket.x, rocket.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = rocket.color;
        ctx.fill();

        return !rocket.exploded;
      });

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.velocity.x *= 0.95;
        particle.velocity.y *= 0.95;
        particle.velocity.y += 0.1;
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;
        particle.alpha -= 0.015;

        if (particle.alpha <= 0) return false;

        ctx.save();
        ctx.globalAlpha = particle.alpha;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        ctx.restore();

        return true;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      clearTimeout(imageTimer);
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [showCongrats]);

  const handleClose = () => {
    setShowCongrats(false);
  };

  return (
    <AnimatePresence>
      {showCongrats && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Canvas for fireworks - behind image */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none"
          />

          {/* Image with scale animation - in front of fireworks */}
          <AnimatePresence>
            {showImage && (
              <motion.img
                src={loichucImage}
                alt="Lời chúc năm mới"
                className="absolute inset-0 z-10 w-full h-full object-cover"
                style={{
                  filter: "drop-shadow(0 0 30px rgba(255, 215, 0, 0.5))",
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 20,
                }}
              />
            )}
          </AnimatePresence>

          {/* Close button at bottom */}
          <motion.button
            className="absolute bottom-8 z-20 flex items-center gap-2 px-6 py-3 rounded-full font-bold"
            style={{
              background: "linear-gradient(135deg, #8B0000 0%, #DC143C 50%, #8B0000 100%)",
              border: "3px solid #F5D27B",
              color: "#F5D27B",
              boxShadow: "0 4px 20px rgba(0,0,0,0.4), 0 0 20px rgba(255, 215, 0, 0.3)",
            }}
            onClick={handleClose}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-5 h-5" />
            Đóng
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CongratulationsModal;
