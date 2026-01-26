import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Share2, Home, Sparkles } from "lucide-react";
import FestiveButton from "@/components/FestiveButton";
import { toast } from "sonner";
import resultBackground from "@/assets/result-background.jpg";

interface TarotCard {
  id: number;
  name: string;
  nameVi: string;
  meaning: string;
}

const categoryNames: { [key: string]: string } = {
  love: "Tình Yêu",
  career: "Sự Nghiệp",
  finance: "Tài Chính",
  family: "Gia Đình",
  health: "Sức Khỏe",
};

const categoryInterpretations: { [key: string]: { [cardId: number]: string } } = {
  love: {
    0: "Tình yêu mới đang đến! Hãy mở lòng đón nhận những cơ hội mới trong tình cảm. Đừng sợ bước ra khỏi vùng an toàn.",
    1: "Bạn có khả năng thu hút người khác. Hãy tự tin thể hiện bản thân và tạo ấn tượng tốt với người trong mộng.",
    2: "Lắng nghe trực giác trong tình yêu. Có những điều chưa được nói ra, hãy kiên nhẫn khám phá.",
    3: "Tình yêu đang nở rộ! Đây là thời điểm tuyệt vời để nuôi dưỡng mối quan hệ và tận hưởng hạnh phúc.",
    4: "Mối quan hệ cần sự ổn định và cam kết. Hãy xây dựng nền tảng vững chắc cho tương lai.",
    5: "Giá trị truyền thống trong tình yêu được đề cao. Có thể có người hướng dẫn hoặc mai mối.",
    6: "Tình yêu đích thực đang đến! Đây là lá bài của sự lựa chọn quan trọng trong tình cảm.",
    7: "Chiến thắng trong tình yêu! Vượt qua mọi trở ngại để đến với người mình yêu.",
    8: "Kiên nhẫn và dịu dàng sẽ chinh phục được trái tim người ấy. Đừng vội vàng.",
    9: "Cần thời gian một mình để hiểu rõ bản thân trước khi bước vào mối quan hệ mới.",
    10: "Vận may tình yêu đang đến! Hãy đón nhận những thay đổi tích cực trong tình cảm.",
    11: "Sự công bằng trong mối quan hệ rất quan trọng. Hãy đối xử với người yêu như cách bạn muốn được đối xử.",
    12: "Có thể cần hy sinh hoặc nhìn nhận mối quan hệ từ góc độ khác để hiểu đối phương.",
    13: "Kết thúc một giai đoạn để bắt đầu giai đoạn mới trong tình yêu. Đừng sợ thay đổi.",
    14: "Cần sự cân bằng và kiên nhẫn trong mối quan hệ. Đừng vội vàng đưa ra quyết định.",
    15: "Cảnh giác với những cám dỗ. Đừng để dục vọng chi phối tình yêu chân thật.",
    16: "Có thể có biến động bất ngờ trong tình cảm, nhưng điều này sẽ mang đến sự giải thoát.",
    17: "Hy vọng và cảm hứng trong tình yêu! Tương lai tình cảm rất sáng lạn.",
    18: "Đừng để ảo tưởng che mờ sự thật. Hãy nhìn nhận mối quan hệ một cách khách quan.",
    19: "Niềm vui và hạnh phúc tràn đầy trong tình yêu! Đây là thời điểm tuyệt vời.",
    20: "Thời điểm để đánh giá lại mối quan hệ và đưa ra quyết định quan trọng.",
    21: "Tình yêu viên mãn và trọn vẹn! Bạn đã tìm thấy hoặc sẽ tìm thấy hạnh phúc đích thực.",
  },
  career: {
    0: "Khởi đầu mới trong sự nghiệp! Hãy dũng cảm theo đuổi ước mơ và đừng sợ thất bại.",
    1: "Bạn có đầy đủ kỹ năng để thành công. Hãy tập trung và phát huy tài năng của mình.",
    2: "Tin vào trực giác trong công việc. Có những cơ hội ẩn giấu đang chờ bạn khám phá.",
    3: "Sự sáng tạo sẽ mang lại thành công. Hãy nuôi dưỡng ý tưởng và dự án của mình.",
    4: "Xây dựng nền tảng vững chắc trong sự nghiệp. Sự ổn định và kỷ luật là chìa khóa.",
    5: "Học hỏi từ người đi trước. Có thể có mentor hoặc cơ hội đào tạo quan trọng.",
    6: "Đứng trước lựa chọn nghề nghiệp quan trọng. Hãy chọn con đường đúng với đam mê.",
    7: "Chiến thắng trong sự nghiệp! Vượt qua mọi thử thách và đạt được mục tiêu.",
    8: "Kiên nhẫn và bền bỉ sẽ dẫn đến thành công. Đừng bỏ cuộc khi gặp khó khăn.",
    9: "Cần thời gian suy nghĩ và lên kế hoạch trước khi hành động. Đừng vội vàng.",
    10: "Vận may trong sự nghiệp! Cơ hội mới đang đến, hãy sẵn sàng đón nhận.",
    11: "Công bằng và minh bạch trong công việc. Nỗ lực của bạn sẽ được công nhận.",
    12: "Có thể cần thay đổi góc nhìn hoặc cách tiếp cận công việc để thành công.",
    13: "Kết thúc một giai đoạn để bắt đầu giai đoạn mới. Đừng bám víu vào quá khứ.",
    14: "Cân bằng giữa công việc và cuộc sống. Đừng để áp lực ảnh hưởng đến sức khỏe.",
    15: "Cảnh giác với cám dỗ trong công việc. Đừng đánh đổi đạo đức lấy thành công.",
    16: "Có thể có biến động lớn trong công việc, nhưng điều này mở ra cơ hội mới.",
    17: "Hy vọng và cảm hứng trong sự nghiệp! Tương lai rất hứa hẹn.",
    18: "Đừng để lo lắng và nghi ngờ cản trở bạn. Hãy tin tưởng vào khả năng của mình.",
    19: "Thành công rực rỡ trong sự nghiệp! Đây là thời điểm tỏa sáng.",
    20: "Thời điểm để đánh giá lại con đường sự nghiệp và đưa ra quyết định quan trọng.",
    21: "Thành tựu trọn vẹn trong sự nghiệp! Bạn đang hoặc sẽ đạt được đỉnh cao.",
  },
  finance: {
    0: "Khởi đầu mới trong tài chính! Hãy mạnh dạn đầu tư vào bản thân và ý tưởng.",
    1: "Bạn có khả năng tạo ra tiền bạc. Hãy sử dụng tài năng để cải thiện tài chính.",
    2: "Tin vào trực giác khi đưa ra quyết định tài chính. Có cơ hội ẩn giấu đang chờ.",
    3: "Sự sung túc đang đến! Đầu tư vào sáng tạo sẽ mang lại lợi nhuận.",
    4: "Xây dựng nền tảng tài chính vững chắc. Tiết kiệm và đầu tư có kế hoạch.",
    5: "Học hỏi về tài chính từ người có kinh nghiệm. Có thể có cố vấn tài chính.",
    6: "Đứng trước lựa chọn tài chính quan trọng. Hãy cân nhắc kỹ trước khi quyết định.",
    7: "Chiến thắng trong tài chính! Vượt qua khó khăn và đạt được mục tiêu tiền bạc.",
    8: "Kiên nhẫn trong đầu tư sẽ mang lại kết quả. Đừng tìm kiếm lợi nhuận nhanh.",
    9: "Cần thời gian suy nghĩ và nghiên cứu trước khi đầu tư. Đừng vội vàng.",
    10: "Vận may tài chính! Cơ hội kiếm tiền đang đến, hãy nắm bắt kịp thời.",
    11: "Công bằng trong giao dịch tài chính. Nỗ lực của bạn sẽ được đền đáp xứng đáng.",
    12: "Có thể cần thay đổi quan điểm về tiền bạc. Đôi khi cho đi sẽ nhận lại nhiều hơn.",
    13: "Kết thúc một chu kỳ tài chính để bắt đầu chu kỳ mới. Đừng bám víu vào lỗ.",
    14: "Cân bằng thu chi. Đừng tiêu xài quá mức nhưng cũng đừng quá tiết kiệm.",
    15: "Cảnh giác với cám dỗ tài chính. Đừng tham lam và đầu tư mạo hiểm.",
    16: "Có thể có biến động tài chính, nhưng điều này mở ra cơ hội mới để tái cấu trúc.",
    17: "Hy vọng về tương lai tài chính! Tình hình sẽ cải thiện đáng kể.",
    18: "Đừng để lo lắng về tiền bạc chi phối. Hãy nhìn nhận tình hình một cách khách quan.",
    19: "Thịnh vượng tài chính! Đây là thời điểm tốt để đầu tư và phát triển.",
    20: "Thời điểm để đánh giá lại tình hình tài chính và đưa ra quyết định quan trọng.",
    21: "Sự thịnh vượng trọn vẹn! Bạn đang hoặc sẽ đạt được sự ổn định tài chính.",
  },
  family: {
    0: "Khởi đầu mới trong gia đình! Có thể có thành viên mới hoặc giai đoạn mới.",
    1: "Bạn có khả năng lãnh đạo gia đình. Hãy sử dụng tài năng để giúp đỡ người thân.",
    2: "Tin vào trực giác khi giải quyết vấn đề gia đình. Lắng nghe tiếng nói nội tâm.",
    3: "Sự sung túc và yêu thương tràn đầy trong gia đình. Hãy nuôi dưỡng tình cảm.",
    4: "Xây dựng nền tảng gia đình vững chắc. Sự ổn định và an toàn rất quan trọng.",
    5: "Tôn trọng truyền thống gia đình. Có thể có sự hướng dẫn từ người lớn tuổi.",
    6: "Tình yêu gia đình đang nở rộ! Đây là thời điểm tuyệt vời cho các mối quan hệ.",
    7: "Vượt qua mọi thử thách trong gia đình. Sự đoàn kết sẽ mang lại chiến thắng.",
    8: "Kiên nhẫn và dịu dàng với người thân. Đừng để nóng giận ảnh hưởng đến gia đình.",
    9: "Cần thời gian một mình để suy nghĩ về các vấn đề gia đình. Đừng vội vàng quyết định.",
    10: "Vận may trong gia đình! Tin vui đang đến, hãy sẵn sàng đón nhận.",
    11: "Công bằng trong gia đình. Hãy đối xử công bằng với tất cả các thành viên.",
    12: "Có thể cần nhìn nhận vấn đề gia đình từ góc độ khác để tìm ra giải pháp.",
    13: "Kết thúc một giai đoạn trong gia đình để bắt đầu giai đoạn mới. Chấp nhận thay đổi.",
    14: "Cân bằng trong gia đình. Đừng để công việc ảnh hưởng đến thời gian bên người thân.",
    15: "Cảnh giác với những xung đột trong gia đình. Đừng để cảm xúc chi phối.",
    16: "Có thể có biến động trong gia đình, nhưng điều này sẽ mang đến sự giải phóng.",
    17: "Hy vọng về tương lai gia đình! Mọi thứ sẽ tốt đẹp hơn.",
    18: "Đừng để hiểu lầm gây rắc rối trong gia đình. Hãy giao tiếp cởi mở.",
    19: "Niềm vui và hạnh phúc tràn đầy trong gia đình! Đây là thời điểm sum họp.",
    20: "Thời điểm để đánh giá lại các mối quan hệ gia đình và hàn gắn những rạn nứt.",
    21: "Hạnh phúc gia đình viên mãn! Bạn đang hoặc sẽ có một mái ấm hoàn hảo.",
  },
  health: {
    0: "Khởi đầu mới cho sức khỏe! Hãy bắt đầu lối sống lành mạnh ngay hôm nay.",
    1: "Bạn có khả năng cải thiện sức khỏe. Hãy tập trung vào mục tiêu và hành động.",
    2: "Lắng nghe cơ thể và trực giác. Có những dấu hiệu sức khỏe cần chú ý.",
    3: "Sức khỏe đang sung mãn! Hãy nuôi dưỡng cơ thể và tâm hồn.",
    4: "Xây dựng thói quen sức khỏe tốt. Kỷ luật và đều đặn là chìa khóa.",
    5: "Tìm kiếm lời khuyên từ chuyên gia sức khỏe. Có thể cần khám định kỳ.",
    6: "Cân bằng giữa thể chất và tinh thần. Tình yêu thương cũng là liều thuốc tốt.",
    7: "Vượt qua thử thách sức khỏe. Ý chí mạnh mẽ sẽ giúp bạn hồi phục.",
    8: "Kiên nhẫn trong quá trình chăm sóc sức khỏe. Đừng vội vàng tìm kết quả nhanh.",
    9: "Cần thời gian nghỉ ngơi và phục hồi. Đừng bỏ qua nhu cầu của cơ thể.",
    10: "Vận may sức khỏe! Có thể có tin tốt về sức khỏe hoặc phương pháp mới.",
    11: "Cân bằng trong chế độ ăn uống và tập luyện. Đừng quá cực đoan.",
    12: "Có thể cần thay đổi góc nhìn về sức khỏe. Đôi khi nghỉ ngơi cũng là chữa lành.",
    13: "Kết thúc một thói quen xấu để bắt đầu lối sống lành mạnh. Đừng sợ thay đổi.",
    14: "Cân bằng và điều độ trong mọi thứ. Đừng để căng thẳng ảnh hưởng sức khỏe.",
    15: "Cảnh giác với các thói quen xấu. Đừng để cám dỗ ảnh hưởng sức khỏe.",
    16: "Có thể có biến động sức khỏe, nhưng điều này sẽ là động lực để thay đổi.",
    17: "Hy vọng về sức khỏe! Tình hình sẽ cải thiện, hãy giữ tinh thần lạc quan.",
    18: "Đừng để lo lắng ảnh hưởng sức khỏe tinh thần. Hãy thực hành thư giãn.",
    19: "Sức khỏe tuyệt vời! Năng lượng tràn đầy, hãy tận hưởng cuộc sống.",
    20: "Thời điểm để đánh giá lại lối sống và đưa ra quyết định cho sức khỏe.",
    21: "Sức khỏe toàn diện! Bạn đang hoặc sẽ đạt được sự cân bằng hoàn hảo.",
  },
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

const TarotResultPage = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [category, setCategory] = useState("love");

  useEffect(() => {
    const storedCards = sessionStorage.getItem("tarotCards");
    const storedCategory = sessionStorage.getItem("tarotCategory");
    if (storedCards) {
      setCards(JSON.parse(storedCards));
    }
    if (storedCategory) {
      setCategory(storedCategory);
    }
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: "Kết Quả Bói Bài Tarot",
      text: `Xem kết quả bói bài Tarot về ${categoryNames[category]} của tôi!`,
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

  const cardPositions = ["Quá Khứ", "Hiện Tại", "Tương Lai"];
  const cardIcons = ["🌙", "☀️", "⭐"];

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
              Luận Giải Tarot
            </h1>
            <p className="text-festive-cream mt-2 font-sans">
              Chủ đề: <span className="font-bold text-festive-gold">{categoryNames[category]}</span>
            </p>
          </motion.div>

          {/* Cards Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <ScrollResultCard title="Các Lá Bài Của Bạn">
              <div className="flex justify-center gap-3 flex-wrap">
                {cards.map((card, index) => (
                  <div key={card.id} className="text-center">
                    <div className="w-16 h-24 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-800 border-2 border-festive-gold flex items-center justify-center mb-2 mx-auto shadow-lg">
                      <span className="text-2xl">{cardIcons[index]}</span>
                    </div>
                    <p className="text-festive-brown text-xs font-bold">{card.nameVi}</p>
                    <p className="text-festive-brown/60 text-[10px]">{cardPositions[index]}</p>
                  </div>
                ))}
              </div>
            </ScrollResultCard>
          </motion.div>

          {/* Overall Interpretation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-4"
          >
            <ScrollResultCard title="Luận Giải Tổng Quan">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-700 flex items-center justify-center flex-shrink-0 border-2 border-white/30 shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm text-gray-700 font-sans leading-relaxed">
                  Với bộ ba lá bài {cards.map(c => c.nameVi).join(", ")}, 
                  tổng quan về {categoryNames[category].toLowerCase()} của bạn cho thấy một hành trình 
                  từ quá khứ đến tương lai đầy ý nghĩa. Mỗi lá bài mang thông điệp riêng, 
                  kết hợp lại sẽ vẽ nên bức tranh toàn cảnh cho lĩnh vực này.
                </p>
              </div>
            </ScrollResultCard>
          </motion.div>

          {/* Individual Card Interpretations */}
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.15 }}
              className="mb-4"
            >
              <ScrollResultCard>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-16 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-800 border-2 border-festive-gold flex items-center justify-center flex-shrink-0 shadow-lg">
                    <span className="text-xl">{cardIcons[index]}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-festive-gold text-xs font-semibold bg-festive-brown/20 px-2 py-0.5 rounded">
                        {cardPositions[index]}
                      </span>
                    </div>
                    <h3 className="font-bold text-festive-brown text-base font-sans">
                      {card.nameVi}
                    </h3>
                    <p className="text-festive-red text-xs mb-2">{card.meaning}</p>
                    <p className="text-sm text-gray-700 font-sans">
                      {categoryInterpretations[category]?.[card.id] || card.meaning}
                    </p>
                  </div>
                </div>
              </ScrollResultCard>
            </motion.div>
          ))}

          {/* Advice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mb-6"
          >
            <ScrollResultCard title="Lời Khuyên">
              <p className="text-sm text-gray-700 text-center leading-relaxed font-sans">
                Hãy nhớ rằng Tarot chỉ là công cụ hướng dẫn, không phải định mệnh cố định. 
                Bạn có quyền tự do lựa chọn và thay đổi cuộc sống của mình. 
                Hãy lấy những thông điệp này làm nguồn cảm hứng để hành động tích cực! 🌟
              </p>
            </ScrollResultCard>
          </motion.div>

          {/* Actions */}
          <motion.div
            className="flex gap-3 pb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
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

export default TarotResultPage;
