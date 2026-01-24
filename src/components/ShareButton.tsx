import { Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface ShareButtonProps {
  title?: string;
  text?: string;
}

const ShareButton = ({
  title = "Tử Vi Tết Bính Ngọ 2026",
  text = "Xem kết quả tử vi của tôi!",
}: ShareButtonProps) => {
  const handleShare = async () => {
    const shareData = {
      title,
      text,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(
          `${text}\n${window.location.href}`
        );
        toast.success("Đã sao chép link để chia sẻ!");
      }
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        toast.error("Không thể chia sẻ. Vui lòng thử lại!");
      }
    }
  };

  return (
    <motion.button
      onClick={handleShare}
      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-festive-gold to-festive-gold-dark 
                 text-festive-brown font-bold rounded-full border-2 border-festive-brown
                 shadow-lg hover:shadow-xl transition-shadow"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Share2 className="w-5 h-5" />
      <span>Chia sẻ</span>
    </motion.button>
  );
};

export default ShareButton;
