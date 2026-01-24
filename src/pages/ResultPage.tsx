import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Heart, Briefcase, DollarSign, Activity, GraduationCap, Users } from "lucide-react";
import FestiveLayout from "@/components/FestiveLayout";
import ScrollCard from "@/components/ScrollCard";
import ShareButton from "@/components/ShareButton";
import horseMascot from "@/assets/horse-mascot.png";

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
    },
    {
      icon: Heart,
      title: "Tình Duyên",
      score: 80,
      content: "Tình duyên năm nay khá tốt. Người độc thân có cơ hội gặp người ý hợp tâm đầu vào tháng 5 hoặc tháng 10. Người đã có đôi tình cảm thêm gắn bó, có thể tiến tới hôn nhân.",
      advice: "Hãy mở lòng và tham gia các hoạt động xã hội để mở rộng mối quan hệ.",
    },
    {
      icon: DollarSign,
      title: "Tài Lộc",
      score: 75,
      content: "Tài lộc năm nay ổn định. Thu nhập chính tăng trưởng tốt. Có một số khoản chi bất ngờ vào giữa năm nhưng không ảnh hưởng lớn. Tránh đầu tư mạo hiểm vào tháng 7.",
      advice: "Nên tiết kiệm và đầu tư dài hạn thay vì các khoản lợi nhanh.",
    },
    {
      icon: Activity,
      title: "Sức Khỏe",
      score: 70,
      content: "Sức khỏe cần được chú ý nhiều hơn năm nay. Có thể gặp vấn đề về giấc ngủ và tiêu hóa. Tháng 4 và tháng 9 là thời điểm cần cẩn thận với tai nạn nhỏ.",
      advice: "Duy trì thói quen tập thể dục đều đặn và ăn uống khoa học.",
    },
    {
      icon: GraduationCap,
      title: "Học Vấn",
      score: 88,
      content: "Năm thuận lợi cho việc học hành và thi cử. Khả năng tiếp thu kiến thức mới rất tốt. Đây là thời điểm thích hợp để học thêm kỹ năng mới hoặc lấy bằng cấp cao hơn.",
      advice: "Đăng ký các khóa học nâng cao kỹ năng chuyên môn.",
    },
    {
      icon: Users,
      title: "Gia Đình",
      score: 82,
      content: "Quan hệ gia đình hòa thuận, ấm áp. Có tin vui từ người thân vào cuối năm. Nên dành nhiều thời gian cho gia đình, đặc biệt là cha mẹ.",
      advice: "Tổ chức các buổi sum họp gia đình để gắn kết tình cảm.",
    },
  ],
  luckyInfo: {
    numbers: [3, 8, 15, 23, 38],
    colors: ["Đỏ", "Vàng", "Xanh lá"],
    directions: ["Đông Nam", "Nam"],
    months: ["Tháng 3", "Tháng 8", "Tháng 10"],
  },
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
    if (score >= 85) return "text-festive-green";
    if (score >= 70) return "text-festive-gold";
    return "text-festive-red";
  };

  return (
    <FestiveLayout>
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-festive text-3xl md:text-4xl text-festive-gold text-shadow-festive">
              Kết Quả Tử Vi
            </h1>
            {userData && (
              <p className="text-festive-cream mt-2">
                Xin chào, <span className="font-bold">{userData.name}</span>!
              </p>
            )}
          </motion.div>

          {/* Mascot */}
          <motion.div
            className="w-20 h-20 mx-auto mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <img src={horseMascot} alt="Mascot" className="w-full h-full object-contain" />
          </motion.div>

          {/* Overall score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ScrollCard title={detailedResults.overall.title} className="mb-6">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-festive-gold to-festive-gold-dark">
                  <span className="text-3xl font-bold text-festive-brown">
                    {detailedResults.overall.score}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Điểm vận mệnh</p>
              </div>
              <p className="text-foreground text-center leading-relaxed">
                {detailedResults.overall.content}
              </p>
            </ScrollCard>
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
              <ScrollCard>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-parchment-dark/50 flex items-center justify-center flex-shrink-0">
                    <category.icon className="w-7 h-7 text-festive-brown" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-festive-brown text-lg">
                        {category.title}
                      </h3>
                      <span className={`font-bold text-lg ${getScoreColor(category.score)}`}>
                        {category.score}/100
                      </span>
                    </div>
                    <p className="text-sm text-foreground mb-2">{category.content}</p>
                    <p className="text-sm text-festive-green italic">
                      💡 {category.advice}
                    </p>
                  </div>
                </div>
              </ScrollCard>
            </motion.div>
          ))}

          {/* Lucky info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <ScrollCard title="Thông Tin May Mắn" className="mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-festive-brown text-sm mb-1">🔢 Số may mắn</h4>
                  <p className="text-sm">{detailedResults.luckyInfo.numbers.join(", ")}</p>
                </div>
                <div>
                  <h4 className="font-bold text-festive-brown text-sm mb-1">🎨 Màu may mắn</h4>
                  <p className="text-sm">{detailedResults.luckyInfo.colors.join(", ")}</p>
                </div>
                <div>
                  <h4 className="font-bold text-festive-brown text-sm mb-1">🧭 Hướng tốt</h4>
                  <p className="text-sm">{detailedResults.luckyInfo.directions.join(", ")}</p>
                </div>
                <div>
                  <h4 className="font-bold text-festive-brown text-sm mb-1">📅 Tháng đẹp</h4>
                  <p className="text-sm">{detailedResults.luckyInfo.months.join(", ")}</p>
                </div>
              </div>
            </ScrollCard>
          </motion.div>

          {/* Actions */}
          <motion.div
            className="flex flex-col items-center gap-4 pb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <ShareButton 
              text={`Xem kết quả tử vi năm Bính Ngọ 2026 của ${userData?.name || "tôi"}! Điểm vận mệnh: ${detailedResults.overall.score}/100`} 
            />

            <button
              onClick={() => navigate("/")}
              className="text-festive-cream underline"
            >
              ← Về trang chủ
            </button>
          </motion.div>
        </div>
      </div>
    </FestiveLayout>
  );
};

export default ResultPage;
