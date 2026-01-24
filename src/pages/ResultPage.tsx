import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Heart, Briefcase, DollarSign, Activity, GraduationCap, Users, Share2, Home } from "lucide-react";
import FestiveLayout from "@/components/FestiveLayout";
import FestiveButton from "@/components/FestiveButton";
import { toast } from "sonner";

interface FormData {
  name: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  gender: string;
  birthHour: string;
}

const detailedResults = {
  overall: {
    title: "Tổng Quan Năm Bính Ngọ 2026",
    content: "Năm Bính Ngọ 2026 đánh dấu một bước ngoặt quan trọng trong cuộc đời bạn. Với sự kết hợp của ngũ hành và can chi, đây là năm thuận lợi để phát triển sự nghiệp và mở rộng các mối quan hệ. Hãy nắm bắt cơ hội và tiến về phía trước!",
    score: 85,
  },
  categories: [
    {
      icon: Briefcase,
      title: "Sự Nghiệp",
      score: 90,
      content: "Năm nay sự nghiệp phát triển mạnh mẽ. Có nhiều cơ hội thăng tiến và được cấp trên tin tưởng. Quý nhân xuất hiện vào tháng 3 và tháng 8. Tuy nhiên cần tránh tranh cãi với đồng nghiệp vào tháng 6.",
      advice: "Hãy mạnh dạn đề xuất ý tưởng mới và thể hiện năng lực của mình.",
      iconBg: "from-blue-500 to-blue-700",
    },
    {
      icon: Heart,
      title: "Tình Duyên",
      score: 80,
      content: "Tình duyên năm nay khá tốt. Người độc thân có cơ hội gặp người ý hợp tâm đầu vào tháng 5 hoặc tháng 10. Người đã có đôi tình cảm thêm gắn bó, có thể tiến tới hôn nhân.",
      advice: "Hãy mở lòng và tham gia các hoạt động xã hội để mở rộng mối quan hệ.",
      iconBg: "from-pink-500 to-rose-600",
    },
    {
      icon: DollarSign,
      title: "Tài Lộc",
      score: 75,
      content: "Tài lộc năm nay ổn định. Thu nhập chính tăng trưởng tốt. Có một số khoản chi bất ngờ vào giữa năm nhưng không ảnh hưởng lớn. Tránh đầu tư mạo hiểm vào tháng 7.",
      advice: "Nên tiết kiệm và đầu tư dài hạn thay vì các khoản lợi nhanh.",
      iconBg: "from-yellow-500 to-amber-600",
    },
    {
      icon: Activity,
      title: "Sức Khỏe",
      score: 70,
      content: "Sức khỏe cần được chú ý nhiều hơn năm nay. Có thể gặp vấn đề về giấc ngủ và tiêu hóa. Tháng 4 và tháng 9 là thời điểm cần cẩn thận với tai nạn nhỏ.",
      advice: "Duy trì thói quen tập thể dục đều đặn và ăn uống khoa học.",
      iconBg: "from-green-500 to-emerald-600",
    },
    {
      icon: GraduationCap,
      title: "Học Vấn",
      score: 88,
      content: "Năm thuận lợi cho việc học hành và thi cử. Khả năng tiếp thu kiến thức mới rất tốt. Đây là thời điểm thích hợp để học thêm kỹ năng mới hoặc lấy bằng cấp cao hơn.",
      advice: "Đăng ký các khóa học nâng cao kỹ năng chuyên môn.",
      iconBg: "from-purple-500 to-violet-600",
    },
    {
      icon: Users,
      title: "Gia Đình",
      score: 82,
      content: "Quan hệ gia đình hòa thuận, ấm áp. Có tin vui từ người thân vào cuối năm. Nên dành nhiều thời gian cho gia đình, đặc biệt là cha mẹ.",
      advice: "Tổ chức các buổi sum họp gia đình để gắn kết tình cảm.",
      iconBg: "from-orange-500 to-red-500",
    },
  ],
  luckyInfo: {
    numbers: [3, 8, 15, 23, 38],
    colors: ["Đỏ", "Vàng", "Xanh lá"],
    directions: ["Đông Nam", "Nam"],
    months: ["Tháng 3", "Tháng 8", "Tháng 10"],
  },
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

const ResultPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<FormData | null>(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem("tuViFormData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-700";
    if (score >= 70) return "text-amber-600";
    return "text-red-700";
  };

  const handleShare = async () => {
    const shareData = {
      title: "Tử Vi Tết Bính Ngọ 2026",
      text: `Xem kết quả tử vi năm Bính Ngọ 2026 của ${userData?.name || "tôi"}! Điểm vận mệnh: ${detailedResults.overall.score}/100`,
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
              Kết Quả Tử Vi
            </h1>
            {userData && (
              <p className="text-festive-cream mt-2 font-sans">
                Xin chào, <span className="font-bold">{userData.name}</span>!
              </p>
            )}
          </motion.div>

          {/* Overall score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <ScrollResultCard title={detailedResults.overall.title}>
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-festive-gold to-festive-brown border-4 border-festive-brown shadow-lg">
                  <span className="text-3xl font-bold text-white drop-shadow">
                    {detailedResults.overall.score}
                  </span>
                </div>
                <p className="text-sm text-festive-brown mt-2 font-sans">Điểm vận mệnh</p>
              </div>
              <p className="text-gray-700 text-center leading-relaxed font-sans">
                {detailedResults.overall.content}
              </p>
            </ScrollResultCard>
          </motion.div>

          {/* Category details */}
          {detailedResults.categories.map((category, index) => (
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
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-festive-brown text-lg font-sans">
                        {category.title}
                      </h3>
                      <span className={`font-bold text-lg ${getScoreColor(category.score)} font-sans`}>
                        {category.score}/100
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2 font-sans">{category.content}</p>
                    <p className="text-sm text-green-700 italic font-sans">
                      💡 {category.advice}
                    </p>
                  </div>
                </div>
              </ScrollResultCard>
            </motion.div>
          ))}

          {/* Lucky info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mb-6"
          >
            <ScrollResultCard title="Thông Tin May Mắn">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-festive-brown text-sm mb-1 font-sans">🔢 Số may mắn</h4>
                  <p className="text-sm text-gray-700 font-sans">{detailedResults.luckyInfo.numbers.join(", ")}</p>
                </div>
                <div>
                  <h4 className="font-bold text-festive-brown text-sm mb-1 font-sans">🎨 Màu may mắn</h4>
                  <p className="text-sm text-gray-700 font-sans">{detailedResults.luckyInfo.colors.join(", ")}</p>
                </div>
                <div>
                  <h4 className="font-bold text-festive-brown text-sm mb-1 font-sans">🧭 Hướng tốt</h4>
                  <p className="text-sm text-gray-700 font-sans">{detailedResults.luckyInfo.directions.join(", ")}</p>
                </div>
                <div>
                  <h4 className="font-bold text-festive-brown text-sm mb-1 font-sans">📅 Tháng đẹp</h4>
                  <p className="text-sm text-gray-700 font-sans">{detailedResults.luckyInfo.months.join(", ")}</p>
                </div>
              </div>
            </ScrollResultCard>
          </motion.div>

          {/* Actions - Two buttons side by side */}
          <motion.div
            className="flex gap-3 pb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
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

export default ResultPage;
