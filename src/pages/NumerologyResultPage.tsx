import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Hash, Heart, Briefcase, Star, Target, Compass, Share2, Home } from "lucide-react";
import FestiveButton from "@/components/FestiveButton";
import { toast } from "sonner";
import resultBackground from "@/assets/result-background.jpg";

interface FormData {
  name: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
}

// Calculate Life Path Number
const calculateLifePathNumber = (day: string, month: string, year: string): number => {
  const dateStr = day + month + year;
  let sum = dateStr.split("").reduce((acc, digit) => acc + parseInt(digit), 0);
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split("").reduce((acc, digit) => acc + parseInt(digit), 0);
  }
  return sum;
};

// Calculate Expression Number from name
const calculateExpressionNumber = (name: string): number => {
  const letterValues: { [key: string]: number } = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
    j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
    s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8,
  };
  const cleanName = name.toLowerCase().replace(/[^a-z]/g, "");
  let sum = cleanName.split("").reduce((acc, letter) => acc + (letterValues[letter] || 0), 0);
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split("").reduce((acc, digit) => acc + parseInt(digit), 0);
  }
  return sum;
};

// Calculate Soul Urge Number (vowels only)
const calculateSoulUrgeNumber = (name: string): number => {
  const vowels = "aeiou";
  const letterValues: { [key: string]: number } = {
    a: 1, e: 5, i: 9, o: 6, u: 3,
  };
  const cleanName = name.toLowerCase().replace(/[^a-z]/g, "");
  let sum = cleanName.split("").filter(l => vowels.includes(l)).reduce((acc, letter) => acc + (letterValues[letter] || 0), 0);
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split("").reduce((acc, digit) => acc + parseInt(digit), 0);
  }
  return sum;
};

const lifePathMeanings: { [key: number]: { title: string; description: string } } = {
  1: { title: "Người Tiên Phong", description: "Bạn có tố chất lãnh đạo bẩm sinh, độc lập và đầy tham vọng. Bạn sinh ra để dẫn đầu và tạo ra những điều mới mẻ." },
  2: { title: "Người Hòa Giải", description: "Bạn nhạy cảm, ngoại giao và có khả năng hợp tác tuyệt vời. Bạn là cầu nối giữa mọi người và mang lại sự hài hòa." },
  3: { title: "Người Sáng Tạo", description: "Bạn có năng khiếu nghệ thuật, biểu đạt và giao tiếp. Bạn lan tỏa niềm vui và cảm hứng đến mọi người xung quanh." },
  4: { title: "Người Xây Dựng", description: "Bạn thực tế, đáng tin cậy và có tổ chức. Bạn xây dựng nền móng vững chắc cho bản thân và những người xung quanh." },
  5: { title: "Người Tự Do", description: "Bạn yêu thích sự thay đổi, phiêu lưu và tự do. Bạn thích khám phá thế giới và trải nghiệm mọi điều cuộc sống mang lại." },
  6: { title: "Người Nuôi Dưỡng", description: "Bạn có trái tim yêu thương, trách nhiệm và quan tâm đến gia đình. Bạn là trụ cột tinh thần cho những người thân yêu." },
  7: { title: "Người Tìm Kiếm", description: "Bạn có trí tuệ sâu sắc, thích suy ngẫm và tìm kiếm chân lý. Bạn luôn đào sâu để hiểu bản chất của mọi thứ." },
  8: { title: "Người Thành Đạt", description: "Bạn có tham vọng lớn, khả năng kinh doanh và lãnh đạo. Bạn hướng đến thành công vật chất và quyền lực." },
  9: { title: "Người Nhân Đạo", description: "Bạn có tầm nhìn rộng lớn, lòng nhân ái và mong muốn cống hiến cho xã hội. Bạn quan tâm đến lợi ích của tập thể." },
  11: { title: "Bậc Thầy Trực Giác", description: "Số chủ đạo 11 - Bạn có trực giác siêu việt, khả năng truyền cảm hứng và tâm linh cao. Bạn là người dẫn đường cho người khác." },
  22: { title: "Bậc Thầy Xây Dựng", description: "Số chủ đạo 22 - Bạn có khả năng biến những ý tưởng lớn thành hiện thực. Bạn là kiến trúc sư của những công trình vĩ đại." },
  33: { title: "Bậc Thầy Dạy Dỗ", description: "Số chủ đạo 33 - Bạn có lòng từ bi vô hạn và khả năng chữa lành. Bạn dành cả đời để phụng sự và nâng đỡ người khác." },
};

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
      <div className="relative z-10 h-6 rounded-full bg-gradient-to-b from-festive-gold via-festive-brown to-festive-gold border-2 border-festive-brown shadow-md" />
      <div className="relative -mt-3 -mb-3 mx-3 bg-gradient-to-b from-[#FFF7E0] to-[#FCEEC7] border-2 border-festive-brown px-4 py-6">
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
      <div className="relative z-10 h-6 rounded-full bg-gradient-to-b from-festive-gold via-festive-brown to-festive-gold border-2 border-festive-brown shadow-md" />
    </div>
  );
};

const NumerologyResultPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<FormData | null>(null);
  const [numbers, setNumbers] = useState({ lifePath: 0, expression: 0, soulUrge: 0 });

  useEffect(() => {
    const storedData = sessionStorage.getItem("numerologyFormData");
    if (storedData) {
      const data = JSON.parse(storedData) as FormData;
      setUserData(data);
      setNumbers({
        lifePath: calculateLifePathNumber(data.birthDay, data.birthMonth, data.birthYear),
        expression: calculateExpressionNumber(data.name),
        soulUrge: calculateSoulUrgeNumber(data.name),
      });
    }
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: "Kết Quả Thần Số Học",
      text: `Xem kết quả thần số học của ${userData?.name || "tôi"}! Số chủ đạo: ${numbers.lifePath}`,
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

  const lifePathInfo = lifePathMeanings[numbers.lifePath] || lifePathMeanings[1];

  const numberCategories = [
    {
      icon: Hash,
      title: "Số Chủ Đạo (Life Path)",
      number: numbers.lifePath,
      meaning: lifePathInfo.title,
      description: lifePathInfo.description,
      iconBg: "from-purple-500 to-violet-700",
    },
    {
      icon: Star,
      title: "Số Biểu Đạt (Expression)",
      number: numbers.expression,
      meaning: "Con Đường Thể Hiện",
      description: "Số này cho thấy tài năng, khả năng và tiềm năng bạn được ban tặng. Đây là cách bạn thể hiện bản thân với thế giới.",
      iconBg: "from-amber-500 to-orange-600",
    },
    {
      icon: Heart,
      title: "Số Linh Hồn (Soul Urge)",
      number: numbers.soulUrge,
      meaning: "Khát Vọng Sâu Thẳm",
      description: "Số này tiết lộ những mong muốn, động lực và khát vọng sâu thẳm nhất trong tâm hồn bạn.",
      iconBg: "from-pink-500 to-rose-600",
    },
  ];

  const predictions = [
    { icon: Briefcase, title: "Sự Nghiệp", content: "Năm 2026 mang đến nhiều cơ hội phát triển nghề nghiệp. Hãy tập trung vào việc phát huy điểm mạnh của số chủ đạo.", iconBg: "from-blue-500 to-blue-700" },
    { icon: Target, title: "Mục Tiêu", content: "Đây là thời điểm tốt để đặt ra những mục tiêu dài hạn và kiên trì theo đuổi. Số biểu đạt sẽ hỗ trợ bạn.", iconBg: "from-green-500 to-emerald-600" },
    { icon: Compass, title: "Hướng Đi", content: "Lắng nghe tiếng nói của số linh hồn để tìm ra hướng đi đúng đắn. Hãy theo đuổi những gì khiến bạn hạnh phúc.", iconBg: "from-teal-500 to-cyan-600" },
  ];

  return (
    <div className="relative min-h-screen">
      <img 
        src={resultBackground} 
        alt="" 
        className="fixed inset-0 w-full h-full object-cover"
      />
      
      <div className="relative z-10 min-h-screen px-4 sm:px-6 md:px-8 py-6 sm:py-8 font-sans">
        <div className="max-w-xs sm:max-w-sm md:max-w-lg mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-festive-gold drop-shadow-lg">
              Thần Số Học
            </h1>
            {userData && (
              <p className="text-festive-cream mt-2 font-sans">
                Kết quả của <span className="font-bold">{userData.name}</span>
              </p>
            )}
          </motion.div>

          {/* Number Cards */}
          {numberCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.15 }}
              className="mb-4"
            >
              <ScrollResultCard>
                <div className="flex items-start gap-3">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${category.iconBg} flex items-center justify-center flex-shrink-0 border-2 border-white/30 shadow-lg`}>
                    <span className="text-2xl font-bold text-white">{category.number}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-festive-brown text-base font-sans mb-1">
                      {category.title}
                    </h3>
                    <p className="text-festive-red font-semibold text-sm mb-1">{category.meaning}</p>
                    <p className="text-sm text-gray-700 font-sans">{category.description}</p>
                  </div>
                </div>
              </ScrollResultCard>
            </motion.div>
          ))}

          {/* Predictions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-4"
          >
            <ScrollResultCard title="Dự Báo Năm 2026">
              <div className="space-y-4">
                {predictions.map((pred) => (
                  <div key={pred.title} className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${pred.iconBg} flex items-center justify-center flex-shrink-0 border-2 border-white/30 shadow-lg`}>
                      <pred.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-festive-brown text-sm">{pred.title}</h4>
                      <p className="text-sm text-gray-700">{pred.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollResultCard>
          </motion.div>

          {/* Lucky Numbers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="mb-6"
          >
            <ScrollResultCard title="Số May Mắn Năm 2026">
              <div className="flex justify-center gap-3 flex-wrap">
                {[numbers.lifePath, numbers.expression, numbers.soulUrge, (numbers.lifePath + numbers.expression) % 9 + 1, (numbers.soulUrge + 3) % 9 + 1].map((num, i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-festive-gold to-festive-brown flex items-center justify-center border-2 border-festive-brown shadow-lg">
                    <span className="text-white font-bold">{num}</span>
                  </div>
                ))}
              </div>
            </ScrollResultCard>
          </motion.div>

          {/* Actions */}
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
    </div>
  );
};

export default NumerologyResultPage;
