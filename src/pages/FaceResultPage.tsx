import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Heart, Briefcase, DollarSign, Activity, ArrowRight, Share2, Home } from "lucide-react";
import FestiveLayout from "@/components/FestiveLayout";
import FestiveButton from "@/components/FestiveButton";
import { toast } from "sonner";

const faceResultData = {
  summary: "Khuôn mặt bạn toát lên khí chất vương giả, năm Bính Ngọ 2026 sẽ là năm hanh thông với nhiều cơ hội phát triển sự nghiệp và tình duyên tốt đẹp.",
  categories: [
    {
      icon: Briefcase,
      title: "Sự Nghiệp",
      description: "Vận thế tốt, cần chủ ý rèn chữ nghĩ ngợi. Có quý nhân phù trợ, thuận lợi trong công việc.",
      iconBg: "from-blue-500 to-blue-700",
    },
    {
      icon: Heart,
      title: "Tình Duyên",
      description: "Gặp gỡ người mới, tình cảm tiến triển tốt đẹp. Người đã có đôi sẽ thêm gắn bó.",
      iconBg: "from-pink-500 to-rose-600",
    },
    {
      icon: DollarSign,
      title: "Tài Lộc",
      description: "Tiền tài hanh thông, có cơ hội đầu tư sinh lời. Cần cẩn trọng chi tiêu.",
      iconBg: "from-yellow-500 to-amber-600",
    },
    {
      icon: Activity,
      title: "Sức Khỏe",
      description: "Vận thế tốt, cần chú ý rèn luyện sức khỏe. Tránh làm việc quá sức.",
      iconBg: "from-green-500 to-emerald-600",
    },
  ],
};

// Scroll Card Component with traditional scroll design
const ScrollResultCard = ({ 
  children, 
  title,
  className = "" 
}: { 
  children: React.ReactNode; 
  title?: string;
  className?: string;
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Top roller - overlapping the parchment */}
      <div className="relative z-10 h-6 rounded-full bg-gradient-to-b from-festive-gold via-festive-brown to-festive-gold border-2 border-festive-brown shadow-md" />
      
      {/* Parchment body - narrower than rollers, pulled up to go under */}
      <div className="relative -mt-3 -mb-3 mx-3 bg-gradient-to-b from-[#FFF7E0] to-[#FCEEC7] border-2 border-festive-brown px-4 py-6">
        {/* Corner decorations */}
        <div className="absolute top-4 left-2 w-4 h-4 border-l-2 border-t-2 border-festive-brown opacity-60" />
        <div className="absolute top-4 right-2 w-4 h-4 border-r-2 border-t-2 border-festive-brown opacity-60" />
        <div className="absolute bottom-4 left-2 w-4 h-4 border-l-2 border-b-2 border-festive-brown opacity-60" />
        <div className="absolute bottom-4 right-2 w-4 h-4 border-r-2 border-b-2 border-festive-brown opacity-60" />
        
        {title && (
          <h3 className="text-festive-red font-bold text-lg text-center mb-3 font-sans">
            {title}
          </h3>
        )}
        {children}
      </div>
      
      {/* Bottom roller - overlapping the parchment */}
      <div className="relative z-10 h-6 rounded-full bg-gradient-to-b from-festive-gold via-festive-brown to-festive-gold border-2 border-festive-brown shadow-md" />
    </div>
  );
};

const FaceResultPage = () => {
  const navigate = useNavigate();
  const capturedFace = sessionStorage.getItem("capturedFace");

  const handleShare = async () => {
    const shareData = {
      title: "Tử Vi Xem Tướng Bính Ngọ 2026",
      text: "Xem kết quả tử vi khuôn mặt năm Bính Ngọ 2026 của tôi!",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text}\n${window.location.href}`);
        toast.success("Đã sao chép link để chia sẻ!");
      }
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        toast.error("Không thể chia sẻ. Vui lòng thử lại!");
      }
    }
  };

  return (
    <FestiveLayout>
      <div className="min-h-screen px-4 sm:px-6 md:px-8 py-6 sm:py-8 font-sans">
        <div className="max-w-xs sm:max-w-sm md:max-w-lg mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-festive-gold drop-shadow-lg">
              Kết Quả Xem Tướng
            </h1>
            <p className="text-festive-cream/80 mt-2 text-sm sm:text-base font-sans">Năm Bính Ngọ 2026</p>
          </motion.div>

          {/* Face preview */}
          {capturedFace && (
            <motion.div
              className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-festive-gold shadow-lg mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <img
                src={capturedFace}
                alt="Your face"
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}

          {/* Summary card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <ScrollResultCard title="Tử Vi Bính Ngọ">
              <p className="text-gray-700 text-center leading-relaxed font-sans">
                {faceResultData.summary}
              </p>
            </ScrollResultCard>
          </motion.div>

          {/* Category cards */}
          {faceResultData.categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="mb-4"
            >
              <ScrollResultCard>
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${category.iconBg} flex items-center justify-center flex-shrink-0 border-2 border-white/30 shadow-lg`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-festive-brown text-lg mb-1 font-sans">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-700 font-sans">
                      {category.description}
                    </p>
                  </div>
                </div>
              </ScrollResultCard>
            </motion.div>
          ))}

          {/* CTA to detailed result */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-6"
          >
            <FestiveButton
              icon={ArrowRight}
              onClick={() => navigate("/form")}
            >
              Xem Chi Tiết Theo Ngày Sinh
            </FestiveButton>
          </motion.div>

          {/* Actions - Two buttons side by side */}
          <motion.div
            className="flex gap-3 pb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <FestiveButton
              onClick={() => navigate("/")}
              icon={Home}
              compact
              variant="secondary"
              className="flex-1 whitespace-nowrap"
            >
              Trang chủ
            </FestiveButton>

            <FestiveButton 
              onClick={handleShare}
              icon={Share2}
              compact
              className="flex-1"
            >
              Chia sẻ
            </FestiveButton>
          </motion.div>
        </div>
      </div>
    </FestiveLayout>
  );
};

export default FaceResultPage;
