import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Heart, Briefcase, DollarSign, Activity, ArrowRight } from "lucide-react";
import FestiveLayout from "@/components/FestiveLayout";
import ScrollCard from "@/components/ScrollCard";
import ShareButton from "@/components/ShareButton";
import FestiveButton from "@/components/FestiveButton";

const faceResultData = {
  summary: "Khuôn mặt bạn toát lên khí chất vương giả, năm Bính Ngọ 2026 sẽ là năm hanh thông với nhiều cơ hội phát triển sự nghiệp và tình duyên tốt đẹp.",
  categories: [
    {
      icon: Briefcase,
      title: "Sự Nghiệp",
      description: "Vận thế tốt, cần chủ ý rèn chữ nghĩ ngợi. Có quý nhân phù trợ, thuận lợi trong công việc.",
      color: "festive-green",
    },
    {
      icon: Heart,
      title: "Tình Duyên",
      description: "Gặp gỡ người mới, tình cảm tiến triển tốt đẹp. Người đã có đôi sẽ thêm gắn bó.",
      color: "festive-red",
    },
    {
      icon: DollarSign,
      title: "Tài Lộc",
      description: "Tiền tài hanh thông, có cơ hội đầu tư sinh lời. Cần cẩn trọng chi tiêu.",
      color: "festive-gold",
    },
    {
      icon: Activity,
      title: "Sức Khỏe",
      description: "Vận thế tốt, cần chú ý rèn luyện sức khỏe. Tránh làm việc quá sức.",
      color: "festive-green",
    },
  ],
};

const FaceResultPage = () => {
  const navigate = useNavigate();
  const capturedFace = sessionStorage.getItem("capturedFace");

  return (
    <FestiveLayout>
      <div className="min-h-screen px-4 py-8 md:py-12">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-festive text-3xl md:text-4xl text-festive-gold text-shadow-festive">
              Kết Quả Xem Tướng
            </h1>
            <p className="text-festive-cream/80 mt-2">Năm Bính Ngọ 2026</p>
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
          >
            <ScrollCard title="Tử Vi Bính Ngọ" className="mb-6">
              <p className="text-foreground text-center leading-relaxed">
                {faceResultData.summary}
              </p>
            </ScrollCard>
          </motion.div>

          {/* Category cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {faceResultData.categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <ScrollCard className="h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-12 h-12 rounded-full bg-${category.color}/20 flex items-center justify-center mb-2`}>
                      <category.icon className={`w-6 h-6 text-${category.color}`} />
                    </div>
                    <h3 className="font-bold text-festive-brown mb-1">
                      {category.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </ScrollCard>
              </motion.div>
            ))}
          </div>

          {/* Actions */}
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <ShareButton text="Xem kết quả tử vi khuôn mặt năm Bính Ngọ 2026 của tôi!" />
            
            <FestiveButton
              icon={ArrowRight}
              variant="secondary"
              onClick={() => navigate("/form")}
            >
              Xem Chi Tiết Theo Ngày Sinh
            </FestiveButton>

            <button
              onClick={() => navigate("/")}
              className="text-festive-cream underline mt-2"
            >
              ← Về trang chủ
            </button>
          </motion.div>
        </div>
      </div>
    </FestiveLayout>
  );
};

export default FaceResultPage;
