// Vietnamese Tarot Logic - The Intelligent Tarot Engine
// 78 Card Data with general meanings + Keywords + Vibe scoring

export interface CardData {
  name_vi: string;
  vibe: number;           // +1 = Positive, 0 = Neutral, -1 = Negative
  meaning_up: string;     // General meaning upright
  meaning_rev: string;    // General meaning reversed
  keywords_up: string[];
  keywords_rev: string[];
  summary_up: string;
  summary_rev: string;
  why_appear_up: string;  // Why this card appears (upright)
  why_appear_rev: string; // Why this card appears (reversed)
}

// ============= MAJOR ARCANA (22 cards) =============
const majorArcana: Record<string, CardData> = {
  "The Fool": {
    name_vi: "Gã Khờ",
    vibe: 1,
    meaning_up: "Đây là lúc bạn sẵn sàng bắt đầu điều gì đó mới mẻ. Bạn có năng lượng tích cực và sự tò mò để khám phá những cơ hội chưa biết. Đừng lo lắng quá nhiều về kết quả - hãy cứ bước đi.",
    meaning_rev: "Bạn đang do dự, sợ rủi ro hoặc hành động thiếu suy nghĩ. Có thể bạn đang bỏ lỡ cơ hội vì quá thận trọng, hoặc ngược lại - quá liều lĩnh mà không cân nhắc hậu quả.",
    keywords_up: ["bắt đầu", "mạo hiểm", "tin tưởng", "tự do"],
    keywords_rev: ["dừng lại", "suy nghĩ kỹ", "lập kế hoạch"],
    summary_up: "sẵn sàng bắt đầu điều mới",
    summary_rev: "do dự hoặc hành động thiếu suy nghĩ",
    why_appear_up: "Lá bài này xuất hiện vì bạn đang ở ngưỡng cửa của một hành trình mới. Vũ trụ đang khuyến khích bạn tin vào bản năng và dám bước ra khỏi vùng an toàn.",
    why_appear_rev: "Lá bài này xuất hiện để cảnh báo bạn cần cẩn thận hơn. Có thể bạn đang quá vội vàng hoặc ngược lại - quá sợ hãi để hành động."
  },
  "The Magician": {
    name_vi: "Pháp Sư",
    vibe: 1,
    meaning_up: "Bạn có đủ kỹ năng và nguồn lực để đạt được mục tiêu. Đây là thời điểm tốt để biến ý tưởng thành hiện thực. Tập trung vào những gì bạn muốn và hành động.",
    meaning_rev: "Bạn đang lãng phí tiềm năng hoặc sử dụng khả năng sai mục đích. Có thể thiếu tập trung, thiếu kế hoạch, hoặc đang cố gắng lừa dối ai đó.",
    keywords_up: ["hành động", "tập trung", "sáng tạo", "tự tin"],
    keywords_rev: ["xem lại", "tập trung", "trung thực"],
    summary_up: "có đủ khả năng để đạt mục tiêu",
    summary_rev: "đang lãng phí tiềm năng",
    why_appear_up: "Lá bài này xuất hiện để nhắc nhở bạn rằng bạn có đủ mọi thứ cần thiết. Hãy tin vào khả năng của mình và bắt tay vào thực hiện.",
    why_appear_rev: "Lá bài này xuất hiện vì bạn đang không phát huy hết tiềm năng. Cần xem lại cách bạn đang sử dụng thời gian và năng lượng."
  },
  "The High Priestess": {
    name_vi: "Nữ Tư Tế",
    vibe: 1,
    meaning_up: "Hãy tin vào trực giác của mình. Có những điều bạn cảm nhận được nhưng chưa thể giải thích. Đây là lúc lắng nghe nội tâm thay vì chỉ dựa vào logic.",
    meaning_rev: "Bạn đang bỏ qua trực giác hoặc không kết nối được với cảm xúc thật của mình. Có thể đang che giấu điều gì đó hoặc không thành thật với bản thân.",
    keywords_up: ["lắng nghe", "chờ đợi", "quan sát"],
    keywords_rev: ["đối mặt", "thành thật", "mở lòng"],
    summary_up: "cần lắng nghe trực giác",
    summary_rev: "đang phớt lờ cảm xúc thật",
    why_appear_up: "Lá bài này xuất hiện vì có điều gì đó bạn cần nhìn sâu hơn. Câu trả lời nằm bên trong bạn - hãy dành thời gian lắng nghe.",
    why_appear_rev: "Lá bài này xuất hiện để cảnh báo bạn đang tự lừa dối mình. Hãy dũng cảm đối mặt với những gì bạn đang cố tránh né."
  },
  "The Empress": {
    name_vi: "Hoàng Hậu",
    vibe: 1,
    meaning_up: "Đây là giai đoạn sung túc, sáng tạo và nuôi dưỡng. Bạn có khả năng chăm sóc người khác và tạo ra những điều đẹp đẽ. Cuộc sống đang thuận lợi.",
    meaning_rev: "Bạn đang thiếu sự chăm sóc bản thân hoặc phụ thuộc quá nhiều vào người khác. Có thể cảm thấy cạn kiệt năng lượng.",
    keywords_up: ["nuôi dưỡng", "sáng tạo", "tận hưởng"],
    keywords_rev: ["tự chăm sóc", "nghỉ ngơi", "buông bỏ"],
    summary_up: "giai đoạn sung túc và sáng tạo",
    summary_rev: "cần chăm sóc bản thân",
    why_appear_up: "Lá bài này xuất hiện để nhắc bạn tận hưởng những gì đang có. Đây là thời điểm để sáng tạo và chia sẻ.",
    why_appear_rev: "Lá bài này xuất hiện vì bạn đang cho đi quá nhiều mà quên chăm sóc bản thân. Hãy ưu tiên sức khỏe và hạnh phúc của chính mình."
  },
  "The Emperor": {
    name_vi: "Hoàng Đế",
    vibe: 1,
    meaning_up: "Bạn cần sự ổn định, kỷ luật và tổ chức. Đây là lúc đặt ra quy tắc rõ ràng và tuân theo kế hoạch. Lãnh đạo bằng sự công bằng và lý trí.",
    meaning_rev: "Bạn đang quá cứng nhắc hoặc thiếu kiểm soát. Có thể đang lạm dụng quyền lực hoặc ngược lại - thiếu kỷ luật.",
    keywords_up: ["tổ chức", "kỷ luật", "lãnh đạo"],
    keywords_rev: ["linh hoạt", "lắng nghe", "cân bằng"],
    summary_up: "cần kỷ luật và tổ chức",
    summary_rev: "quá cứng nhắc hoặc thiếu kiểm soát",
    why_appear_up: "Lá bài này xuất hiện vì bạn cần thiết lập cấu trúc và kỷ luật trong cuộc sống. Đã đến lúc hành động có kế hoạch.",
    why_appear_rev: "Lá bài này xuất hiện để cảnh báo bạn đang quá kiểm soát hoặc thiếu trách nhiệm. Cần tìm sự cân bằng."
  },
  "The Hierophant": {
    name_vi: "Giáo Hoàng",
    vibe: 1,
    meaning_up: "Đây là lúc học hỏi từ người có kinh nghiệm hoặc tuân theo những giá trị đã được kiểm chứng. Tìm kiếm sự hướng dẫn từ mentor hoặc truyền thống.",
    meaning_rev: "Bạn đang thách thức những quy tắc cũ hoặc cảm thấy bị gò bó. Có thể cần tìm con đường riêng thay vì làm theo số đông.",
    keywords_up: ["học hỏi", "tuân theo", "truyền thống"],
    keywords_rev: ["độc lập", "thử nghiệm", "đổi mới"],
    summary_up: "cần học hỏi từ người có kinh nghiệm",
    summary_rev: "đang muốn tìm con đường riêng",
    why_appear_up: "Lá bài này xuất hiện vì bạn cần sự hướng dẫn. Hãy tìm kiếm những người đi trước hoặc những kiến thức đã được kiểm chứng.",
    why_appear_rev: "Lá bài này xuất hiện vì bạn đang cảm thấy bị trói buộc bởi kỳ vọng. Đôi khi phá vỡ quy tắc là cần thiết để phát triển."
  },
  "The Lovers": {
    name_vi: "Người Yêu",
    vibe: 1,
    meaning_up: "Đây là về sự kết nối sâu sắc và những lựa chọn quan trọng. Có thể liên quan đến tình yêu, nhưng cũng là về việc quyết định điều gì thực sự có ý nghĩa với bạn.",
    meaning_rev: "Bạn đang đối mặt với xung đột hoặc khó đưa ra quyết định quan trọng. Có thể đang không trung thực với chính mình.",
    keywords_up: ["lựa chọn", "kết nối", "đồng điệu"],
    keywords_rev: ["trò chuyện", "giải quyết", "thành thật"],
    summary_up: "kết nối sâu sắc hoặc lựa chọn quan trọng",
    summary_rev: "đang gặp xung đột hoặc khó quyết định",
    why_appear_up: "Lá bài này xuất hiện vì bạn đang đứng trước một quyết định quan trọng. Hãy chọn theo trái tim và giá trị của mình.",
    why_appear_rev: "Lá bài này xuất hiện để chỉ ra sự mâu thuẫn trong bạn. Cần đối mặt thành thật với những gì bạn thực sự muốn."
  },
  "The Chariot": {
    name_vi: "Chiến Xa",
    vibe: 1,
    meaning_up: "Bạn có động lực mạnh mẽ và quyết tâm để vượt qua thử thách. Đây là lúc tiến về phía trước với sự tự tin.",
    meaning_rev: "Bạn đang mất phương hướng hoặc thiếu động lực. Có thể đang cố kiểm soát mọi thứ quá mức.",
    keywords_up: ["tiến lên", "quyết tâm", "chiến thắng"],
    keywords_rev: ["dừng lại", "xem lại hướng đi", "bình tĩnh"],
    summary_up: "có quyết tâm vượt qua thử thách",
    summary_rev: "mất phương hướng hoặc thiếu động lực",
    why_appear_up: "Lá bài này xuất hiện để khẳng định bạn có đủ sức mạnh để chiến thắng. Hãy tiến lên không do dự.",
    why_appear_rev: "Lá bài này xuất hiện vì bạn đang mất kiểm soát. Dừng lại, xác định lại mục tiêu trước khi tiếp tục."
  },
  "Strength": {
    name_vi: "Sức Mạnh",
    vibe: 1,
    meaning_up: "Sức mạnh thật sự đến từ sự kiên nhẫn và lòng trắc ẩn. Bạn có đủ nội lực để đối mặt với khó khăn một cách bình tĩnh.",
    meaning_rev: "Bạn đang thiếu tự tin hoặc để cảm xúc tiêu cực kiểm soát. Có thể đang nghi ngờ bản thân.",
    keywords_up: ["kiên nhẫn", "bình tĩnh", "tin tưởng"],
    keywords_rev: ["tự yêu thương", "nghỉ ngơi", "tìm hỗ trợ"],
    summary_up: "có đủ nội lực đối mặt khó khăn",
    summary_rev: "đang thiếu tự tin",
    why_appear_up: "Lá bài này xuất hiện để nhắc nhở bạn rằng sức mạnh thật sự đến từ bên trong. Bạn có thể vượt qua.",
    why_appear_rev: "Lá bài này xuất hiện vì bạn đang tự nghi ngờ mình. Hãy tử tế với bản thân và tìm nguồn hỗ trợ."
  },
  "The Hermit": {
    name_vi: "Ẩn Sĩ",
    vibe: 0,
    meaning_up: "Đây là lúc cần thời gian một mình để suy ngẫm. Tạm rời xa ồn ào để tìm câu trả lời bên trong.",
    meaning_rev: "Bạn đang cô lập quá mức hoặc trốn tránh thực tế. Có thể cần mở lòng với người khác.",
    keywords_up: ["suy ngẫm", "nghỉ ngơi", "tìm kiếm"],
    keywords_rev: ["kết nối", "mở lòng", "chia sẻ"],
    summary_up: "cần thời gian một mình suy ngẫm",
    summary_rev: "đang cô lập quá mức",
    why_appear_up: "Lá bài này xuất hiện vì bạn cần thời gian yên tĩnh để hiểu rõ hơn về tình huống. Câu trả lời nằm trong sự tĩnh lặng.",
    why_appear_rev: "Lá bài này xuất hiện để cảnh báo bạn đang xa cách mọi người quá lâu. Đôi khi chúng ta cần người khác."
  },
  "Wheel of Fortune": {
    name_vi: "Bánh Xe Vận Mệnh",
    vibe: 1,
    meaning_up: "Cuộc sống đang thay đổi theo hướng tích cực. Cơ hội mới đang đến. Đây là chu kỳ may mắn.",
    meaning_rev: "Bạn đang trải qua giai đoạn khó khăn. Đây chỉ là tạm thời - mọi thứ sẽ thay đổi.",
    keywords_up: ["nắm bắt", "tin tưởng", "thay đổi"],
    keywords_rev: ["kiên nhẫn", "chấp nhận", "thích nghi"],
    summary_up: "may mắn và cơ hội đang đến",
    summary_rev: "giai đoạn khó khăn tạm thời",
    why_appear_up: "Lá bài này xuất hiện để báo hiệu vận may đang đến. Hãy sẵn sàng nắm bắt cơ hội.",
    why_appear_rev: "Lá bài này xuất hiện để nhắc nhở bạn rằng khó khăn chỉ là tạm thời. Bánh xe sẽ quay - hãy kiên nhẫn."
  },
  "Justice": {
    name_vi: "Công Lý",
    vibe: 1,
    meaning_up: "Sự công bằng sẽ được thực thi. Hành động của bạn sẽ có hậu quả tương xứng.",
    meaning_rev: "Bạn đang đối mặt với sự bất công hoặc trốn tránh trách nhiệm.",
    keywords_up: ["trung thực", "cân bằng", "chịu trách nhiệm"],
    keywords_rev: ["xem lại", "chấp nhận", "đối mặt"],
    summary_up: "công bằng sẽ được thực thi",
    summary_rev: "đối mặt với bất công",
    why_appear_up: "Lá bài này xuất hiện để khẳng định sự thật sẽ được sáng tỏ. Hãy hành động đúng đắn.",
    why_appear_rev: "Lá bài này xuất hiện vì có sự mất cân bằng cần được giải quyết. Hãy nhìn nhận trung thực."
  },
  "The Hanged Man": {
    name_vi: "Người Treo Ngược",
    vibe: 0,
    meaning_up: "Đây là lúc cần tạm dừng và nhìn mọi thứ từ góc độ khác. Đôi khi buông bỏ là cần thiết.",
    meaning_rev: "Bạn đang kháng cự sự thay đổi hoặc bị kẹt trong tình huống.",
    keywords_up: ["chờ đợi", "buông bỏ", "nhìn khác"],
    keywords_rev: ["hành động", "quyết định", "tiến lên"],
    summary_up: "cần tạm dừng, nhìn từ góc độ khác",
    summary_rev: "đang bị kẹt và cần hành động",
    why_appear_up: "Lá bài này xuất hiện vì bạn cần thay đổi cách nhìn. Đôi khi hy sinh ngắn hạn mang lại lợi ích dài hạn.",
    why_appear_rev: "Lá bài này xuất hiện vì bạn đang trì hoãn quá lâu. Đã đến lúc phải quyết định."
  },
  "Death": {
    name_vi: "Tử Thần",
    vibe: 0,
    meaning_up: "Một giai đoạn đang kết thúc để nhường chỗ cho điều mới. Đây là sự chuyển đổi cần thiết.",
    meaning_rev: "Bạn đang kháng cự sự thay đổi không thể tránh khỏi.",
    keywords_up: ["buông bỏ", "chấp nhận", "bắt đầu mới"],
    keywords_rev: ["đối mặt", "chấp nhận thay đổi", "tiến lên"],
    summary_up: "kết thúc cũ để bắt đầu mới",
    summary_rev: "đang kháng cự thay đổi",
    why_appear_up: "Lá bài này xuất hiện để báo hiệu một kết thúc cần thiết. Đừng sợ - cái mới đang chờ đón.",
    why_appear_rev: "Lá bài này xuất hiện vì bạn đang bám víu vào điều đã hết. Buông bỏ để tiến lên."
  },
  "Temperance": {
    name_vi: "Điều Độ",
    vibe: 1,
    meaning_up: "Cân bằng và điều độ là chìa khóa. Đừng đi cực đoan theo bất kỳ hướng nào.",
    meaning_rev: "Bạn đang mất cân bằng - quá nhiều hoặc quá ít ở một khía cạnh nào đó.",
    keywords_up: ["cân bằng", "kiên nhẫn", "hài hòa"],
    keywords_rev: ["điều chỉnh", "xem lại", "cân đối"],
    summary_up: "cần cân bằng và điều độ",
    summary_rev: "đang mất cân bằng",
    why_appear_up: "Lá bài này xuất hiện để nhắc nhở về sự cân bằng. Kiên nhẫn kết hợp các yếu tố để có kết quả tốt.",
    why_appear_rev: "Lá bài này xuất hiện vì bạn đang sống thái quá. Cần điều chỉnh lại."
  },
  "The Devil": {
    name_vi: "Ác Quỷ",
    vibe: -1,
    meaning_up: "Bạn đang bị ràng buộc bởi thói quen xấu, nỗi sợ, hoặc ham muốn. Nhận ra rằng bạn có quyền tự do hơn bạn nghĩ.",
    meaning_rev: "Bạn đang bắt đầu thoát khỏi những gì đã ràng buộc mình.",
    keywords_up: ["nhận diện", "thoát ra", "thay đổi"],
    keywords_rev: ["tiếp tục", "tự do", "chữa lành"],
    summary_up: "bị ràng buộc bởi thói quen xấu",
    summary_rev: "đang thoát khỏi ràng buộc",
    why_appear_up: "Lá bài này xuất hiện để cảnh báo về những gì đang kiểm soát bạn. Bước đầu tiên là nhận ra.",
    why_appear_rev: "Lá bài này xuất hiện để khẳng định bạn đang trên đường giải phóng. Tiếp tục đi."
  },
  "The Tower": {
    name_vi: "Tháp",
    vibe: -1,
    meaning_up: "Một sự thay đổi đột ngột đang đến. Những gì được xây trên nền tảng yếu sẽ sụp đổ - đây là cơ hội xây dựng lại tốt hơn.",
    meaning_rev: "Bạn đang trốn tránh thay đổi hoặc đang trong quá trình phục hồi sau khủng hoảng.",
    keywords_up: ["chấp nhận", "xây dựng lại", "học hỏi"],
    keywords_rev: ["tiếp tục hồi phục", "kiên trì", "tin tưởng"],
    summary_up: "thay đổi đột ngột, cần xây dựng lại",
    summary_rev: "đang phục hồi sau khủng hoảng",
    why_appear_up: "Lá bài này xuất hiện để chuẩn bị bạn cho biến động. Đôi khi phải phá bỏ để xây mới.",
    why_appear_rev: "Lá bài này xuất hiện để xác nhận bạn đang trong giai đoạn phục hồi. Tiếp tục kiên trì."
  },
  "The Star": {
    name_vi: "Ngôi Sao",
    vibe: 1,
    meaning_up: "Hy vọng và niềm tin đang trở lại. Sau giai đoạn khó khăn, bạn đang bước vào thời kỳ chữa lành.",
    meaning_rev: "Bạn đang mất niềm tin hoặc cảm thấy thất vọng. Cần tìm lại hy vọng.",
    keywords_up: ["tin tưởng", "hy vọng", "chữa lành"],
    keywords_rev: ["tìm hỗ trợ", "kiên nhẫn", "lạc quan"],
    summary_up: "hy vọng và chữa lành đang đến",
    summary_rev: "đang mất niềm tin",
    why_appear_up: "Lá bài này xuất hiện để mang đến hy vọng. Bạn đang trên đường chữa lành - hãy tin tưởng.",
    why_appear_rev: "Lá bài này xuất hiện vì bạn cần tìm lại niềm tin. Bắt đầu từ những điều nhỏ để biết ơn."
  },
  "The Moon": {
    name_vi: "Mặt Trăng",
    vibe: -1,
    meaning_up: "Có điều gì đó chưa rõ ràng. Đừng vội kết luận khi chưa có đủ thông tin. Cảm xúc có thể đánh lừa bạn.",
    meaning_rev: "Sự thật đang dần được sáng tỏ. Những lo lắng vô căn cứ đang tan biến.",
    keywords_up: ["cẩn thận", "chờ đợi", "kiểm tra"],
    keywords_rev: ["tin tưởng", "hành động", "sáng tỏ"],
    summary_up: "có điều chưa rõ ràng, cần cẩn thận",
    summary_rev: "sự thật đang sáng tỏ",
    why_appear_up: "Lá bài này xuất hiện để cảnh báo về sự mơ hồ. Đừng tin hoàn toàn vào vẻ bề ngoài.",
    why_appear_rev: "Lá bài này xuất hiện để báo hiệu sự thật đang dần lộ diện. Bạn sẽ sớm hiểu rõ hơn."
  },
  "The Sun": {
    name_vi: "Mặt Trời",
    vibe: 1,
    meaning_up: "Thành công, hạnh phúc và sự rõ ràng. Mọi thứ đang diễn ra tốt đẹp. Đây là thời điểm tận hưởng.",
    meaning_rev: "Niềm vui bị che mờ tạm thời. Nhưng ánh sáng vẫn ở đó.",
    keywords_up: ["tận hưởng", "chia sẻ", "lạc quan"],
    keywords_rev: ["kiên nhẫn", "tìm niềm vui", "tin tưởng"],
    summary_up: "thành công và hạnh phúc",
    summary_rev: "niềm vui bị che mờ tạm thời",
    why_appear_up: "Lá bài này xuất hiện để mang đến tin vui. Hãy tận hưởng và lan tỏa năng lượng tích cực.",
    why_appear_rev: "Lá bài này xuất hiện để nhắc nhở rằng khó khăn chỉ tạm thời. Ánh sáng sẽ trở lại."
  },
  "Judgement": {
    name_vi: "Phán Xét",
    vibe: 1,
    meaning_up: "Đây là thời điểm đánh giá lại và đưa ra quyết định quan trọng. Lắng nghe tiếng gọi bên trong.",
    meaning_rev: "Bạn đang tự phán xét quá khắc nghiệt hoặc trốn tránh quyết định quan trọng.",
    keywords_up: ["đánh giá", "quyết định", "thức tỉnh"],
    keywords_rev: ["tha thứ", "chấp nhận", "hòa giải"],
    summary_up: "thời điểm đánh giá lại và quyết định",
    summary_rev: "cần tha thứ cho bản thân",
    why_appear_up: "Lá bài này xuất hiện vì bạn đang ở ngã rẽ quan trọng. Hãy lắng nghe tiếng gọi bên trong.",
    why_appear_rev: "Lá bài này xuất hiện vì bạn đang quá khắc nghiệt với bản thân. Hãy tha thứ và tiến lên."
  },
  "The World": {
    name_vi: "Thế Giới",
    vibe: 1,
    meaning_up: "Hoàn thành, thành tựu và sự viên mãn. Bạn đã đạt được mục tiêu quan trọng. Sẵn sàng cho chu kỳ mới.",
    meaning_rev: "Bạn đang gần đến đích nhưng còn thiếu điều gì đó. Cần thêm nỗ lực cuối cùng.",
    keywords_up: ["ăn mừng", "tri ân", "bắt đầu mới"],
    keywords_rev: ["hoàn thành", "nỗ lực cuối", "đừng bỏ cuộc"],
    summary_up: "hoàn thành và viên mãn",
    summary_rev: "gần đạt mục tiêu",
    why_appear_up: "Lá bài này xuất hiện để chúc mừng thành tựu của bạn. Hãy ăn mừng và chuẩn bị cho chương tiếp.",
    why_appear_rev: "Lá bài này xuất hiện để khích lệ bạn không bỏ cuộc. Chỉ còn một chút nữa thôi."
  }
};

// ============= MINOR ARCANA - WANDS (14 cards) =============
const wands: Record<string, CardData> = {
  "Ace of Wands": {
    name_vi: "Át Gậy",
    vibe: 1,
    meaning_up: "Một ý tưởng mới hoặc dự án mới đang bắt đầu. Bạn có nguồn năng lượng và động lực mạnh mẽ.",
    meaning_rev: "Ý tưởng bị chặn, thiếu động lực hoặc khởi đầu bị trì hoãn.",
    keywords_up: ["bắt đầu", "hành động", "đam mê"],
    keywords_rev: ["lập kế hoạch", "tìm động lực", "chuẩn bị"],
    summary_up: "khởi đầu mới đầy năng lượng",
    summary_rev: "khởi đầu bị trì hoãn",
    why_appear_up: "Lá bài này xuất hiện để báo hiệu nguồn năng lượng mới. Hãy nắm bắt và hành động.",
    why_appear_rev: "Lá bài này xuất hiện vì có rào cản cần vượt qua trước khi bắt đầu. Hãy chuẩn bị kỹ hơn."
  },
  "Two of Wands": {
    name_vi: "Hai Gậy",
    vibe: 1,
    meaning_up: "Bạn đang lên kế hoạch và cân nhắc cho tương lai. Có tiềm năng lớn đang chờ đợi.",
    meaning_rev: "Thiếu tầm nhìn, sợ cam kết hoặc không có kế hoạch rõ ràng.",
    keywords_up: ["lên kế hoạch", "mở rộng", "tầm nhìn"],
    keywords_rev: ["bắt đầu nhỏ", "xác định mục tiêu", "cam kết"],
    summary_up: "đang lên kế hoạch tương lai",
    summary_rev: "thiếu tầm nhìn và kế hoạch",
    why_appear_up: "Lá bài này xuất hiện vì bạn có nhiều lựa chọn. Hãy tập trung và quyết định hướng đi.",
    why_appear_rev: "Lá bài này xuất hiện vì bạn đang thiếu mục tiêu rõ ràng. Hãy dành thời gian suy nghĩ."
  },
  "Three of Wands": {
    name_vi: "Ba Gậy",
    vibe: 1,
    meaning_up: "Tiến bộ rõ rệt, đang đi đúng hướng. Kết quả tốt đang đến.",
    meaning_rev: "Tiến bộ chậm, kết quả không như mong đợi.",
    keywords_up: ["kiên nhẫn", "tin tưởng", "mở rộng"],
    keywords_rev: ["đánh giá lại", "điều chỉnh", "linh hoạt"],
    summary_up: "tiến bộ tốt, chờ đợi kết quả",
    summary_rev: "tiến độ chậm",
    why_appear_up: "Lá bài này xuất hiện để khẳng định bạn đang đi đúng hướng. Kiên nhẫn chờ đợi.",
    why_appear_rev: "Lá bài này xuất hiện vì cần điều chỉnh chiến lược. Xem lại cách tiếp cận."
  },
  "Four of Wands": {
    name_vi: "Bốn Gậy",
    vibe: 1,
    meaning_up: "Đạt cột mốc quan trọng, ăn mừng thành tích. Ổn định và hạnh phúc.",
    meaning_rev: "Chưa đạt cột mốc mong muốn, thiếu sự ổn định.",
    keywords_up: ["ăn mừng", "tri ân", "tận hưởng"],
    keywords_rev: ["xây dựng", "kiên nhẫn", "nỗ lực"],
    summary_up: "ăn mừng thành tích",
    summary_rev: "chưa đạt được sự ổn định",
    why_appear_up: "Lá bài này xuất hiện để chúc mừng thành tựu. Hãy tận hưởng khoảnh khắc này.",
    why_appear_rev: "Lá bài này xuất hiện vì bạn đang cần thêm nỗ lực để đạt mục tiêu."
  },
  "Five of Wands": {
    name_vi: "Năm Gậy",
    vibe: -1,
    meaning_up: "Xung đột, cạnh tranh gay gắt. Cần tìm cách hợp tác thay vì đối đầu.",
    meaning_rev: "Xung đột được giải quyết hoặc tránh được.",
    keywords_up: ["đối thoại", "hợp tác", "thỏa hiệp"],
    keywords_rev: ["duy trì hòa bình", "tránh xung đột"],
    summary_up: "đang có xung đột và cạnh tranh",
    summary_rev: "xung đột đang được giải quyết",
    why_appear_up: "Lá bài này xuất hiện vì có sự căng thẳng cần giải quyết. Tìm cách hợp tác.",
    why_appear_rev: "Lá bài này xuất hiện để báo hiệu xung đột đang lắng xuống. Tiếp tục duy trì hòa khí."
  },
  "Six of Wands": {
    name_vi: "Sáu Gậy",
    vibe: 1,
    meaning_up: "Thắng lợi, được công nhận và ngưỡng mộ. Tự tin vào thành công.",
    meaning_rev: "Nỗ lực không được ghi nhận, thiếu tự tin.",
    keywords_up: ["tận hưởng", "khiêm tốn", "tiếp tục"],
    keywords_rev: ["tự tin", "ghi nhận bản thân", "kiên trì"],
    summary_up: "chiến thắng và được công nhận",
    summary_rev: "nỗ lực chưa được ghi nhận",
    why_appear_up: "Lá bài này xuất hiện để khẳng định thành công của bạn. Hãy tự hào nhưng khiêm tốn.",
    why_appear_rev: "Lá bài này xuất hiện vì bạn cần tin vào giá trị của mình, dù người khác chưa thấy."
  },
  "Seven of Wands": {
    name_vi: "Bảy Gậy",
    vibe: 0,
    meaning_up: "Đứng vững trước thử thách, bảo vệ vị trí của mình.",
    meaning_rev: "Kiệt sức vì chiến đấu liên tục, cần nghỉ ngơi.",
    keywords_up: ["kiên định", "đứng vững", "bảo vệ"],
    keywords_rev: ["nghỉ ngơi", "tìm đồng minh", "buông bỏ"],
    summary_up: "đứng vững trước thử thách",
    summary_rev: "kiệt sức vì chiến đấu",
    why_appear_up: "Lá bài này xuất hiện vì bạn đang đối mặt với áp lực. Hãy kiên định.",
    why_appear_rev: "Lá bài này xuất hiện vì bạn cần nghỉ ngơi. Không thể chiến đấu mãi được."
  },
  "Eight of Wands": {
    name_vi: "Tám Gậy",
    vibe: 1,
    meaning_up: "Mọi thứ diễn ra nhanh chóng. Tin tức, thay đổi đang đến.",
    meaning_rev: "Chờ đợi, trì hoãn, mọi thứ chậm lại.",
    keywords_up: ["hành động nhanh", "nắm bắt", "sẵn sàng"],
    keywords_rev: ["kiên nhẫn", "chuẩn bị", "chờ đợi"],
    summary_up: "mọi thứ diễn ra nhanh",
    summary_rev: "đang bị trì hoãn",
    why_appear_up: "Lá bài này xuất hiện để báo hiệu tốc độ. Sẵn sàng cho sự thay đổi nhanh.",
    why_appear_rev: "Lá bài này xuất hiện vì bạn đang phải chờ đợi. Hãy kiên nhẫn."
  },
  "Nine of Wands": {
    name_vi: "Chín Gậy",
    vibe: 0,
    meaning_up: "Kiệt sức nhưng gần đến đích. Kiên trì thêm một chút.",
    meaning_rev: "Quá mệt mỏi, cần nghỉ ngơi gấp.",
    keywords_up: ["kiên trì", "gần đến đích", "tiếp tục"],
    keywords_rev: ["nghỉ ngơi", "xin giúp đỡ", "tự chăm sóc"],
    summary_up: "kiệt sức nhưng kiên trì",
    summary_rev: "cần nghỉ ngơi ngay",
    why_appear_up: "Lá bài này xuất hiện để khích lệ bạn. Chỉ còn một chút nữa thôi - đừng bỏ cuộc.",
    why_appear_rev: "Lá bài này xuất hiện để cảnh báo bạn đang quá tải. Nghỉ ngơi là cần thiết."
  },
  "Ten of Wands": {
    name_vi: "Mười Gậy",
    vibe: -1,
    meaning_up: "Gánh nặng quá nhiều, quá tải. Cần giảm bớt trách nhiệm.",
    meaning_rev: "Bắt đầu giảm bớt gánh nặng, học cách từ chối.",
    keywords_up: ["ủy thác", "từ chối", "ưu tiên"],
    keywords_rev: ["tiếp tục giảm tải", "nghỉ ngơi", "buông bỏ"],
    summary_up: "đang gánh quá nhiều",
    summary_rev: "đang học cách buông bỏ",
    why_appear_up: "Lá bài này xuất hiện vì bạn đang ôm đồm quá nhiều. Hãy chia sẻ gánh nặng.",
    why_appear_rev: "Lá bài này xuất hiện để xác nhận bạn đang trên đường nhẹ gánh. Tiếp tục buông bỏ."
  },
  "Page of Wands": {
    name_vi: "Thị Đồng Gậy",
    vibe: 1,
    meaning_up: "Tin tức tốt, cơ hội mới. Khám phá đam mê.",
    meaning_rev: "Tin xấu hoặc cơ hội bị trì hoãn.",
    keywords_up: ["khám phá", "học hỏi", "hào hứng"],
    keywords_rev: ["kiên nhẫn", "chuẩn bị", "không nản"],
    summary_up: "tin tốt và khởi đầu mới",
    summary_rev: "tin tức bị trì hoãn",
    why_appear_up: "Lá bài này xuất hiện để báo tin vui hoặc cơ hội mới. Hãy đón nhận với sự hào hứng.",
    why_appear_rev: "Lá bài này xuất hiện vì tin tức đang chậm đến. Hãy kiên nhẫn chờ đợi."
  },
  "Knight of Wands": {
    name_vi: "Hiệp Sĩ Gậy",
    vibe: 1,
    meaning_up: "Hành động nhanh, đam mê, theo đuổi mục tiêu mạnh mẽ.",
    meaning_rev: "Hấp tấp, thiếu suy nghĩ, thiếu kiên nhẫn.",
    keywords_up: ["tiến lên", "dám làm", "tự tin"],
    keywords_rev: ["suy nghĩ kỹ", "kiên nhẫn", "bình tĩnh"],
    summary_up: "hành động mạnh mẽ",
    summary_rev: "hấp tấp và thiếu suy nghĩ",
    why_appear_up: "Lá bài này xuất hiện để khuyến khích bạn hành động. Đam mê sẽ dẫn lối.",
    why_appear_rev: "Lá bài này xuất hiện để cảnh báo bạn đang quá vội vàng. Bình tĩnh lại."
  },
  "Queen of Wands": {
    name_vi: "Hoàng Hậu Gậy",
    vibe: 1,
    meaning_up: "Tự tin, quyến rũ, có sức ảnh hưởng. Truyền cảm hứng cho người khác.",
    meaning_rev: "Quá kiểm soát hoặc thiếu tự tin.",
    keywords_up: ["tỏa sáng", "tự tin", "truyền cảm hứng"],
    keywords_rev: ["khiêm tốn", "lắng nghe", "cân bằng"],
    summary_up: "tự tin và có sức ảnh hưởng",
    summary_rev: "cần cân bằng",
    why_appear_up: "Lá bài này xuất hiện để nhắc nhở bạn về sức mạnh bên trong. Hãy tỏa sáng.",
    why_appear_rev: "Lá bài này xuất hiện vì bạn cần điều chỉnh cách thể hiện bản thân."
  },
  "King of Wands": {
    name_vi: "Hoàng Đế Gậy",
    vibe: 1,
    meaning_up: "Lãnh đạo có tầm nhìn, quyết đoán và truyền cảm hứng.",
    meaning_rev: "Độc đoán, thiếu tầm nhìn hoặc không lắng nghe.",
    keywords_up: ["lãnh đạo", "tầm nhìn", "quyết đoán"],
    keywords_rev: ["lắng nghe", "linh hoạt", "khiêm tốn"],
    summary_up: "lãnh đạo có tầm nhìn",
    summary_rev: "cần lắng nghe hơn",
    why_appear_up: "Lá bài này xuất hiện để khẳng định khả năng lãnh đạo của bạn. Hãy dẫn dắt.",
    why_appear_rev: "Lá bài này xuất hiện để cảnh báo bạn đang quá độc đoán. Hãy lắng nghe người khác."
  }
};

// ============= MINOR ARCANA - CUPS (14 cards) =============
const cups: Record<string, CardData> = {
  "Ace of Cups": {
    name_vi: "Át Cốc",
    vibe: 1,
    meaning_up: "Tình yêu mới, cảm xúc dâng trào, mở lòng đón nhận.",
    meaning_rev: "Kìm nén cảm xúc, không dám yêu thương.",
    keywords_up: ["mở lòng", "đón nhận", "yêu thương"],
    keywords_rev: ["chữa lành", "tự yêu thương", "buông bỏ"],
    summary_up: "tình yêu mới và cảm xúc dồi dào",
    summary_rev: "đang kìm nén cảm xúc",
    why_appear_up: "Lá bài này xuất hiện để báo hiệu tình cảm mới. Hãy mở lòng đón nhận.",
    why_appear_rev: "Lá bài này xuất hiện vì bạn đang đóng cửa trái tim. Hãy tự chữa lành trước."
  },
  "Two of Cups": {
    name_vi: "Hai Cốc",
    vibe: 1,
    meaning_up: "Kết nối sâu sắc, tình yêu hỗ tương, hợp tác tốt đẹp.",
    meaning_rev: "Mất cân bằng trong mối quan hệ.",
    keywords_up: ["kết nối", "hợp tác", "đồng điệu"],
    keywords_rev: ["giao tiếp", "cân bằng", "thỏa hiệp"],
    summary_up: "kết nối sâu sắc",
    summary_rev: "mất cân bằng trong quan hệ",
    why_appear_up: "Lá bài này xuất hiện để khẳng định mối liên kết mạnh mẽ. Trân trọng nó.",
    why_appear_rev: "Lá bài này xuất hiện vì mối quan hệ cần được điều chỉnh. Hãy giao tiếp."
  },
  "Three of Cups": {
    name_vi: "Ba Cốc",
    vibe: 1,
    meaning_up: "Niềm vui, ăn mừng, tình bạn và kết nối xã hội.",
    meaning_rev: "Cô đơn hoặc xung đột trong nhóm bạn.",
    keywords_up: ["ăn mừng", "kết nối", "chia sẻ"],
    keywords_rev: ["chọn bạn", "ranh giới", "độc lập"],
    summary_up: "niềm vui và kết nối",
    summary_rev: "cô đơn hoặc xung đột",
    why_appear_up: "Lá bài này xuất hiện để nhắc bạn tận hưởng tình bạn và niềm vui.",
    why_appear_rev: "Lá bài này xuất hiện vì bạn đang cảm thấy xa cách. Hãy kết nối lại."
  },
  "Four of Cups": {
    name_vi: "Bốn Cốc",
    vibe: -1,
    meaning_up: "Chán nản, mất động lực, bỏ qua cơ hội trước mắt.",
    meaning_rev: "Nhận ra cơ hội mới, thoát khỏi trầm cảm.",
    keywords_up: ["nhìn quanh", "đánh giá lại", "tri ân"],
    keywords_rev: ["nắm bắt", "hành động", "mở lòng"],
    summary_up: "chán nản và bỏ qua cơ hội",
    summary_rev: "nhận ra cơ hội mới",
    why_appear_up: "Lá bài này xuất hiện vì bạn đang không thấy những gì đang được trao. Nhìn lại.",
    why_appear_rev: "Lá bài này xuất hiện để báo hiệu bạn đang tỉnh dậy. Hãy nắm bắt cơ hội."
  },
  "Five of Cups": {
    name_vi: "Năm Cốc",
    vibe: -1,
    meaning_up: "Đau buồn, tiếc nuối, tập trung vào mất mát.",
    meaning_rev: "Bắt đầu vượt qua nỗi đau, nhìn về phía trước.",
    keywords_up: ["chấp nhận", "để tang", "nhìn về phía trước"],
    keywords_rev: ["tiến lên", "tha thứ", "chữa lành"],
    summary_up: "đau buồn và tiếc nuối",
    summary_rev: "đang vượt qua nỗi đau",
    why_appear_up: "Lá bài này xuất hiện để thừa nhận nỗi đau của bạn. Nhưng đừng quên những gì còn lại.",
    why_appear_rev: "Lá bài này xuất hiện để khẳng định bạn đang chữa lành. Tiếp tục tiến lên."
  },
  "Six of Cups": {
    name_vi: "Sáu Cốc",
    vibe: 1,
    meaning_up: "Hoài niệm, ký ức ngọt ngào, kết nối với quá khứ.",
    meaning_rev: "Bám víu quá khứ, không tiến lên được.",
    keywords_up: ["hoài niệm", "tri ân", "kết nối"],
    keywords_rev: ["tiến lên", "trưởng thành", "buông quá khứ"],
    summary_up: "hoài niệm ngọt ngào",
    summary_rev: "bám víu quá khứ",
    why_appear_up: "Lá bài này xuất hiện để kết nối bạn với những ký ức đẹp. Trân trọng nhưng đừng mắc kẹt.",
    why_appear_rev: "Lá bài này xuất hiện vì bạn đang sống trong quá khứ. Hãy hướng về phía trước."
  },
  "Seven of Cups": {
    name_vi: "Bảy Cốc",
    vibe: 0,
    meaning_up: "Nhiều lựa chọn, ảo tưởng, cần tập trung vào thực tế.",
    meaning_rev: "Đã có quyết định rõ ràng, thực tế hơn.",
    keywords_up: ["tập trung", "chọn lọc", "thực tế"],
    keywords_rev: ["thực hiện", "cam kết", "hành động"],
    summary_up: "nhiều lựa chọn, cần tập trung",
    summary_rev: "đã có quyết định rõ ràng",
    why_appear_up: "Lá bài này xuất hiện vì bạn đang mơ mộng quá nhiều. Hãy chọn một thứ và tập trung.",
    why_appear_rev: "Lá bài này xuất hiện để khẳng định bạn đã rõ ràng hơn. Bây giờ hãy hành động."
  },
  "Eight of Cups": {
    name_vi: "Tám Cốc",
    vibe: 0,
    meaning_up: "Rời bỏ để tìm điều ý nghĩa hơn. Dũng cảm ra đi.",
    meaning_rev: "Sợ thay đổi, bám víu vào điều không còn phù hợp.",
    keywords_up: ["rời đi", "tìm kiếm", "buông bỏ"],
    keywords_rev: ["đối mặt", "dũng cảm", "thay đổi"],
    summary_up: "rời bỏ để tìm điều tốt hơn",
    summary_rev: "sợ thay đổi",
    why_appear_up: "Lá bài này xuất hiện vì bạn biết đã đến lúc ra đi. Hãy dũng cảm bước tiếp.",
    why_appear_rev: "Lá bài này xuất hiện vì bạn đang bám víu. Hãy đối mặt với nỗi sợ."
  },
  "Nine of Cups": {
    name_vi: "Chín Cốc",
    vibe: 1,
    meaning_up: "Hài lòng, mãn nguyện, ước nguyện thành hiện thực.",
    meaning_rev: "Không hài lòng dù có mọi thứ, tham lam.",
    keywords_up: ["tận hưởng", "tri ân", "hài lòng"],
    keywords_rev: ["xem lại giá trị", "tri ân", "đủ"],
    summary_up: "hạnh phúc và mãn nguyện",
    summary_rev: "có mọi thứ nhưng không hài lòng",
    why_appear_up: "Lá bài này xuất hiện để chúc mừng. Ước nguyện đang thành hiện thực.",
    why_appear_rev: "Lá bài này xuất hiện vì bạn đang không biết đủ. Hãy tri ân những gì đang có."
  },
  "Ten of Cups": {
    name_vi: "Mười Cốc",
    vibe: 1,
    meaning_up: "Hạnh phúc viên mãn, gia đình hòa thuận, tình yêu trọn vẹn.",
    meaning_rev: "Mâu thuẫn, gia đình không hài hòa.",
    keywords_up: ["tri ân", "nuôi dưỡng", "tận hưởng"],
    keywords_rev: ["giao tiếp", "hòa giải", "ưu tiên"],
    summary_up: "hạnh phúc viên mãn",
    summary_rev: "cần hòa giải",
    why_appear_up: "Lá bài này xuất hiện để báo hiệu hạnh phúc đang đến hoặc cần được trân trọng.",
    why_appear_rev: "Lá bài này xuất hiện vì gia đình cần sự quan tâm. Hãy hòa giải."
  },
  "Page of Cups": {
    name_vi: "Thị Đồng Cốc",
    vibe: 1,
    meaning_up: "Tin tức về tình cảm, cảm hứng sáng tạo, trực giác.",
    meaning_rev: "Tin buồn, cảm xúc chưa trưởng thành.",
    keywords_up: ["mở lòng", "sáng tạo", "vui vẻ"],
    keywords_rev: ["trưởng thành", "cân bằng", "kiểm soát"],
    summary_up: "tin tốt về cảm xúc",
    summary_rev: "cảm xúc chưa trưởng thành",
    why_appear_up: "Lá bài này xuất hiện để mang đến tin vui về tình cảm hoặc sáng tạo.",
    why_appear_rev: "Lá bài này xuất hiện vì cần trưởng thành hơn trong cách xử lý cảm xúc."
  },
  "Knight of Cups": {
    name_vi: "Hiệp Sĩ Cốc",
    vibe: 1,
    meaning_up: "Lãng mạn, theo đuổi đam mê, lắng nghe trái tim.",
    meaning_rev: "Mơ mộng không thực tế, hứa suông.",
    keywords_up: ["theo đuổi", "lãng mạn", "lắng nghe trái tim"],
    keywords_rev: ["thực tế", "cam kết", "trách nhiệm"],
    summary_up: "theo đuổi đam mê",
    summary_rev: "mơ mộng không thực tế",
    why_appear_up: "Lá bài này xuất hiện để khuyến khích bạn theo đuổi điều mình yêu thích.",
    why_appear_rev: "Lá bài này xuất hiện để cảnh báo đừng chỉ mơ - hãy hành động thực tế."
  },
  "Queen of Cups": {
    name_vi: "Hoàng Hậu Cốc",
    vibe: 1,
    meaning_up: "Thấu cảm, yêu thương, trực giác mạnh mẽ.",
    meaning_rev: "Quá nhạy cảm, phụ thuộc cảm xúc.",
    keywords_up: ["lắng nghe", "thấu cảm", "chăm sóc"],
    keywords_rev: ["ranh giới", "tự chăm sóc", "mạnh mẽ"],
    summary_up: "thấu cảm và yêu thương",
    summary_rev: "quá nhạy cảm",
    why_appear_up: "Lá bài này xuất hiện để nhắc bạn tin vào trực giác và lòng trắc ẩn.",
    why_appear_rev: "Lá bài này xuất hiện vì bạn cần bảo vệ bản thân khỏi bị tổn thương."
  },
  "King of Cups": {
    name_vi: "Hoàng Đế Cốc",
    vibe: 1,
    meaning_up: "Trưởng thành về cảm xúc, cân bằng, thấu hiểu.",
    meaning_rev: "Kìm nén cảm xúc hoặc mất kiểm soát.",
    keywords_up: ["cân bằng", "thấu hiểu", "bình tĩnh"],
    keywords_rev: ["thể hiện cảm xúc", "kết nối", "buông bỏ"],
    summary_up: "trưởng thành về cảm xúc",
    summary_rev: "cần cân bằng cảm xúc",
    why_appear_up: "Lá bài này xuất hiện để khẳng định sự trưởng thành trong cách xử lý cảm xúc.",
    why_appear_rev: "Lá bài này xuất hiện vì bạn đang kìm nén hoặc mất kiểm soát cảm xúc."
  }
};

// ============= MINOR ARCANA - SWORDS (14 cards) =============
const swords: Record<string, CardData> = {
  "Ace of Swords": {
    name_vi: "Át Kiếm",
    vibe: 1,
    meaning_up: "Sáng suốt, sự thật, quyết định đúng đắn.",
    meaning_rev: "Hiểu lầm, tư duy mơ hồ, giao tiếp kém.",
    keywords_up: ["nói thẳng", "quyết định", "sáng suốt"],
    keywords_rev: ["làm rõ", "giao tiếp", "suy nghĩ kỹ"],
    summary_up: "sáng suốt và quyết định đúng",
    summary_rev: "tư duy mơ hồ",
    why_appear_up: "Lá bài này xuất hiện vì bạn đang có sự sáng suốt. Hãy hành động theo sự thật.",
    why_appear_rev: "Lá bài này xuất hiện vì có sự hiểu lầm cần được làm rõ."
  },
  "Two of Swords": {
    name_vi: "Hai Kiếm",
    vibe: 0,
    meaning_up: "Bế tắc, cần quyết định nhưng chưa đủ thông tin.",
    meaning_rev: "Bị ép phải quyết định, không thể trì hoãn.",
    keywords_up: ["thu thập thông tin", "cân nhắc", "kiên nhẫn"],
    keywords_rev: ["quyết định", "đối mặt", "hành động"],
    summary_up: "chưa quyết định được",
    summary_rev: "bị ép phải quyết định",
    why_appear_up: "Lá bài này xuất hiện vì bạn đang cần thêm thông tin trước khi quyết định.",
    why_appear_rev: "Lá bài này xuất hiện vì không thể trì hoãn thêm. Hãy quyết định."
  },
  "Three of Swords": {
    name_vi: "Ba Kiếm",
    vibe: -1,
    meaning_up: "Đau khổ, tổn thương, tan vỡ.",
    meaning_rev: "Đang hồi phục, vượt qua nỗi đau.",
    keywords_up: ["để tang", "chấp nhận", "tìm hỗ trợ"],
    keywords_rev: ["tiến lên", "tha thứ", "chữa lành"],
    summary_up: "đau khổ và tổn thương",
    summary_rev: "đang chữa lành",
    why_appear_up: "Lá bài này xuất hiện để thừa nhận nỗi đau. Cho phép mình buồn.",
    why_appear_rev: "Lá bài này xuất hiện để xác nhận bạn đang vượt qua. Tiếp tục tiến lên."
  },
  "Four of Swords": {
    name_vi: "Bốn Kiếm",
    vibe: 0,
    meaning_up: "Nghỉ ngơi, hồi phục, cần tạm dừng.",
    meaning_rev: "Đã nghỉ đủ, sẵn sàng quay lại.",
    keywords_up: ["nghỉ ngơi", "thiền định", "hồi phục"],
    keywords_rev: ["quay lại", "năng lượng mới", "bắt đầu"],
    summary_up: "cần nghỉ ngơi",
    summary_rev: "sẵn sàng quay lại",
    why_appear_up: "Lá bài này xuất hiện vì bạn cần nghỉ ngơi. Đừng ép bản thân.",
    why_appear_rev: "Lá bài này xuất hiện vì đã đến lúc quay lại. Bạn đã sẵn sàng."
  },
  "Five of Swords": {
    name_vi: "Năm Kiếm",
    vibe: -1,
    meaning_up: "Xung đột, thắng nhưng mất mát, cạnh tranh không lành mạnh.",
    meaning_rev: "Hòa giải, học từ xung đột.",
    keywords_up: ["xem lại", "hòa giải", "buông bỏ ego"],
    keywords_rev: ["học từ sai lầm", "tha thứ", "tiến lên"],
    summary_up: "xung đột và mất mát",
    summary_rev: "học từ xung đột",
    why_appear_up: "Lá bài này xuất hiện để cảnh báo về xung đột. Chiến thắng không đáng giá.",
    why_appear_rev: "Lá bài này xuất hiện vì đã đến lúc hòa giải và học từ sai lầm."
  },
  "Six of Swords": {
    name_vi: "Sáu Kiếm",
    vibe: 0,
    meaning_up: "Chuyển đổi, rời bỏ khó khăn, tiến về tương lai.",
    meaning_rev: "Khó rời bỏ, bám víu quá khứ.",
    keywords_up: ["tiến lên", "buông bỏ", "di chuyển"],
    keywords_rev: ["đối mặt", "dũng cảm", "thay đổi"],
    summary_up: "chuyển đổi sang giai đoạn tốt hơn",
    summary_rev: "khó khăn trong việc rời bỏ",
    why_appear_up: "Lá bài này xuất hiện để xác nhận bạn đang rời bỏ khó khăn. Tiếp tục đi.",
    why_appear_rev: "Lá bài này xuất hiện vì bạn đang khó rời bỏ. Hãy dũng cảm."
  },
  "Seven of Swords": {
    name_vi: "Bảy Kiếm",
    vibe: -1,
    meaning_up: "Có sự không trung thực, lừa dối hoặc chiến thuật.",
    meaning_rev: "Sự thật được phơi bày.",
    keywords_up: ["cẩn thận", "kiểm tra", "trung thực"],
    keywords_rev: ["đối mặt", "thành thật", "sửa chữa"],
    summary_up: "có sự không trung thực",
    summary_rev: "sự thật được phơi bày",
    why_appear_up: "Lá bài này xuất hiện để cảnh báo về sự lừa dối. Hãy cẩn thận.",
    why_appear_rev: "Lá bài này xuất hiện vì sự thật đang lộ ra. Hãy đối mặt trung thực."
  },
  "Eight of Swords": {
    name_vi: "Tám Kiếm",
    vibe: -1,
    meaning_up: "Cảm giác bị mắc kẹt, giới hạn tự áp đặt.",
    meaning_rev: "Nhận ra có lối thoát, tự giải phóng.",
    keywords_up: ["tìm lối thoát", "nhờ giúp đỡ", "thay đổi góc nhìn"],
    keywords_rev: ["hành động", "tự do", "dũng cảm"],
    summary_up: "cảm giác bị mắc kẹt",
    summary_rev: "tìm được lối thoát",
    why_appear_up: "Lá bài này xuất hiện vì bạn đang tự giới hạn mình. Lối thoát có sẵn.",
    why_appear_rev: "Lá bài này xuất hiện để khẳng định bạn đang tự giải phóng. Tiếp tục."
  },
  "Nine of Swords": {
    name_vi: "Chín Kiếm",
    vibe: -1,
    meaning_up: "Lo âu, suy nghĩ tiêu cực, mất ngủ.",
    meaning_rev: "Bắt đầu bớt lo, thoát khỏi suy nghĩ tiêu cực.",
    keywords_up: ["chia sẻ", "tìm hỗ trợ", "nghỉ ngơi"],
    keywords_rev: ["tiếp tục chữa lành", "kiên trì", "lạc quan"],
    summary_up: "lo âu và suy nghĩ tiêu cực",
    summary_rev: "đang thoát khỏi lo âu",
    why_appear_up: "Lá bài này xuất hiện vì bạn đang lo lắng quá nhiều. Hãy chia sẻ với ai đó.",
    why_appear_rev: "Lá bài này xuất hiện để khẳng định bạn đang bớt lo. Tiếp tục như vậy."
  },
  "Ten of Swords": {
    name_vi: "Mười Kiếm",
    vibe: -1,
    meaning_up: "Kết thúc đau đớn, chạm đáy. Nhưng đây là đáy - chỉ có thể đi lên.",
    meaning_rev: "Đang hồi phục, đứng dậy từ đáy.",
    keywords_up: ["chấp nhận", "tin vào bình minh", "buông bỏ"],
    keywords_rev: ["xây dựng lại", "kiên cường", "tiến lên"],
    summary_up: "chạm đáy",
    summary_rev: "đang đứng dậy",
    why_appear_up: "Lá bài này xuất hiện để nói rằng đây là đáy. Từ đây chỉ có thể đi lên.",
    why_appear_rev: "Lá bài này xuất hiện để khẳng định bạn đang đứng dậy. Tiếp tục kiên cường."
  },
  "Page of Swords": {
    name_vi: "Thị Đồng Kiếm",
    vibe: 0,
    meaning_up: "Tin tức, tò mò, ý tưởng mới.",
    meaning_rev: "Tin đồn, nói xấu, ý tưởng không thực tế.",
    keywords_up: ["tìm hiểu", "học hỏi", "suy nghĩ"],
    keywords_rev: ["kiểm tra nguồn", "cẩn thận lời nói", "thực tế"],
    summary_up: "tin tức mới",
    summary_rev: "cẩn thận với tin đồn",
    why_appear_up: "Lá bài này xuất hiện để báo tin hoặc ý tưởng mới sắp đến.",
    why_appear_rev: "Lá bài này xuất hiện để cảnh báo về tin đồn. Kiểm tra trước khi tin."
  },
  "Knight of Swords": {
    name_vi: "Hiệp Sĩ Kiếm",
    vibe: 0,
    meaning_up: "Hành động nhanh, quyết đoán, theo đuổi sự thật.",
    meaning_rev: "Quá vội vàng, gây tổn thương.",
    keywords_up: ["hành động", "quyết đoán", "tập trung"],
    keywords_rev: ["bình tĩnh", "suy nghĩ", "kiên nhẫn"],
    summary_up: "hành động quyết đoán",
    summary_rev: "quá vội vàng",
    why_appear_up: "Lá bài này xuất hiện để khuyến khích hành động nhanh và quyết đoán.",
    why_appear_rev: "Lá bài này xuất hiện để cảnh báo bạn đang quá vội. Bình tĩnh lại."
  },
  "Queen of Swords": {
    name_vi: "Hoàng Hậu Kiếm",
    vibe: 1,
    meaning_up: "Sáng suốt, độc lập, trung thực không khoan nhượng.",
    meaning_rev: "Quá lạnh lùng, thiếu cảm thông.",
    keywords_up: ["sáng suốt", "độc lập", "trung thực"],
    keywords_rev: ["mở lòng", "thấu cảm", "mềm mỏng"],
    summary_up: "sáng suốt và độc lập",
    summary_rev: "quá lạnh lùng",
    why_appear_up: "Lá bài này xuất hiện để khẳng định sự sáng suốt của bạn. Tin vào phán đoán.",
    why_appear_rev: "Lá bài này xuất hiện vì bạn cần mềm mỏng hơn. Logic không phải là tất cả."
  },
  "King of Swords": {
    name_vi: "Hoàng Đế Kiếm",
    vibe: 1,
    meaning_up: "Lãnh đạo bằng logic, công bằng, sáng suốt.",
    meaning_rev: "Quá lý trí, độc đoán, thiếu cảm xúc.",
    keywords_up: ["sáng suốt", "công bằng", "lãnh đạo"],
    keywords_rev: ["thấu cảm", "lắng nghe", "khiêm tốn"],
    summary_up: "lãnh đạo sáng suốt",
    summary_rev: "quá lý trí",
    why_appear_up: "Lá bài này xuất hiện để khẳng định khả năng lãnh đạo và sự công bằng.",
    why_appear_rev: "Lá bài này xuất hiện vì bạn cần cân bằng giữa logic và cảm xúc."
  }
};

// ============= MINOR ARCANA - PENTACLES (14 cards) =============
const pentacles: Record<string, CardData> = {
  "Ace of Pentacles": {
    name_vi: "Át Xu",
    vibe: 1,
    meaning_up: "Cơ hội mới về vật chất, khởi đầu thịnh vượng.",
    meaning_rev: "Cơ hội bị bỏ lỡ hoặc trì hoãn.",
    keywords_up: ["nắm bắt", "đầu tư", "bắt đầu"],
    keywords_rev: ["chuẩn bị", "kiên nhẫn", "chờ thời"],
    summary_up: "cơ hội mới về vật chất",
    summary_rev: "cơ hội bị trì hoãn",
    why_appear_up: "Lá bài này xuất hiện để báo hiệu cơ hội vật chất. Hãy nắm bắt.",
    why_appear_rev: "Lá bài này xuất hiện vì cơ hội đang chậm đến. Hãy chuẩn bị sẵn sàng."
  },
  "Two of Pentacles": {
    name_vi: "Hai Xu",
    vibe: 0,
    meaning_up: "Cân bằng nhiều việc, linh hoạt, đa nhiệm.",
    meaning_rev: "Mất cân bằng, quá tải, lộn xộn.",
    keywords_up: ["ưu tiên", "linh hoạt", "cân bằng"],
    keywords_rev: ["giảm bớt", "tập trung", "nghỉ ngơi"],
    summary_up: "đang cân bằng nhiều việc",
    summary_rev: "mất cân bằng, quá tải",
    why_appear_up: "Lá bài này xuất hiện vì bạn đang xoay sở nhiều thứ. Tiếp tục linh hoạt.",
    why_appear_rev: "Lá bài này xuất hiện vì bạn đang quá tải. Cần giảm bớt."
  },
  "Three of Pentacles": {
    name_vi: "Ba Xu",
    vibe: 1,
    meaning_up: "Hợp tác tốt, được công nhận, xây dựng thành công.",
    meaning_rev: "Thiếu hợp tác, làm việc nhóm kém.",
    keywords_up: ["hợp tác", "học hỏi", "xây dựng"],
    keywords_rev: ["giao tiếp", "lắng nghe", "khiêm tốn"],
    summary_up: "hợp tác xây dựng thành công",
    summary_rev: "thiếu hợp tác",
    why_appear_up: "Lá bài này xuất hiện để khẳng định sự hợp tác tốt đẹp. Tiếp tục xây dựng.",
    why_appear_rev: "Lá bài này xuất hiện vì cần cải thiện làm việc nhóm. Hãy giao tiếp nhiều hơn."
  },
  "Four of Pentacles": {
    name_vi: "Bốn Xu",
    vibe: 0,
    meaning_up: "An toàn, ổn định, nhưng có thể quá bám víu vật chất.",
    meaning_rev: "Buông bỏ, chia sẻ, linh hoạt hơn.",
    keywords_up: ["cân nhắc", "chia sẻ", "linh hoạt"],
    keywords_rev: ["tiếp tục buông bỏ", "mở lòng", "mạo hiểm"],
    summary_up: "an toàn nhưng có thể quá bám víu",
    summary_rev: "học cách buông bỏ",
    why_appear_up: "Lá bài này xuất hiện vì bạn đang nắm giữ quá chặt. Cân nhắc chia sẻ.",
    why_appear_rev: "Lá bài này xuất hiện vì bạn đang học cách buông bỏ. Tốt lắm."
  },
  "Five of Pentacles": {
    name_vi: "Năm Xu",
    vibe: -1,
    meaning_up: "Khó khăn, thiếu thốn, cô đơn.",
    meaning_rev: "Tìm được hỗ trợ, phục hồi.",
    keywords_up: ["tìm hỗ trợ", "kiên trì", "hy vọng"],
    keywords_rev: ["đón nhận giúp đỡ", "tri ân", "lạc quan"],
    summary_up: "khó khăn và thiếu thốn",
    summary_rev: "tìm được hỗ trợ",
    why_appear_up: "Lá bài này xuất hiện vì bạn đang gặp khó khăn. Hãy tìm sự giúp đỡ.",
    why_appear_rev: "Lá bài này xuất hiện vì sự giúp đỡ đang đến. Hãy đón nhận."
  },
  "Six of Pentacles": {
    name_vi: "Sáu Xu",
    vibe: 1,
    meaning_up: "Cho và nhận cân bằng, hào phóng, được giúp đỡ.",
    meaning_rev: "Mất cân bằng trong cho-nhận, bị lợi dụng.",
    keywords_up: ["chia sẻ", "tri ân", "hào phóng"],
    keywords_rev: ["ranh giới", "công bằng", "tự bảo vệ"],
    summary_up: "cho và nhận cân bằng",
    summary_rev: "mất cân bằng trong cho-nhận",
    why_appear_up: "Lá bài này xuất hiện để nhắc về sự hào phóng và đón nhận.",
    why_appear_rev: "Lá bài này xuất hiện vì bạn đang cho quá nhiều hoặc nhận không xứng đáng."
  },
  "Seven of Pentacles": {
    name_vi: "Bảy Xu",
    vibe: 0,
    meaning_up: "Đánh giá kết quả, chờ đợi, xem xét tiến độ.",
    meaning_rev: "Nỗ lực chưa được đền đáp, thiếu kiên nhẫn.",
    keywords_up: ["kiên nhẫn", "đánh giá", "chờ đợi"],
    keywords_rev: ["thay đổi chiến lược", "xem lại", "linh hoạt"],
    summary_up: "đang đánh giá kết quả",
    summary_rev: "nỗ lực chưa được đền đáp",
    why_appear_up: "Lá bài này xuất hiện vì bạn cần đánh giá lại những gì đang làm.",
    why_appear_rev: "Lá bài này xuất hiện vì cần thay đổi cách tiếp cận. Kết quả chưa như ý."
  },
  "Eight of Pentacles": {
    name_vi: "Tám Xu",
    vibe: 1,
    meaning_up: "Chăm chỉ, rèn luyện kỹ năng, tập trung vào công việc.",
    meaning_rev: "Làm việc không hiệu quả, cầu toàn thái quá.",
    keywords_up: ["kiên trì", "rèn luyện", "tập trung"],
    keywords_rev: ["cân bằng", "nghỉ ngơi", "thay đổi cách làm"],
    summary_up: "chăm chỉ và rèn luyện",
    summary_rev: "làm việc không hiệu quả",
    why_appear_up: "Lá bài này xuất hiện để khẳng định nỗ lực của bạn đang đúng hướng.",
    why_appear_rev: "Lá bài này xuất hiện vì cần xem lại cách làm việc. Chất lượng hơn số lượng."
  },
  "Nine of Pentacles": {
    name_vi: "Chín Xu",
    vibe: 1,
    meaning_up: "Thành công, độc lập, tận hưởng thành quả.",
    meaning_rev: "Thành công nhưng cô đơn, quá độc lập.",
    keywords_up: ["tận hưởng", "tri ân", "chia sẻ"],
    keywords_rev: ["kết nối", "cân bằng", "mở lòng"],
    summary_up: "thành công và độc lập",
    summary_rev: "thành công nhưng cô đơn",
    why_appear_up: "Lá bài này xuất hiện để chúc mừng thành quả của bạn. Hãy tận hưởng.",
    why_appear_rev: "Lá bài này xuất hiện vì bạn cần kết nối với người khác, dù đã thành công."
  },
  "Ten of Pentacles": {
    name_vi: "Mười Xu",
    vibe: 1,
    meaning_up: "Thịnh vượng bền vững, gia đình ổn định, di sản.",
    meaning_rev: "Xung đột về tài sản, mất mát gia đình.",
    keywords_up: ["tri ân", "bảo tồn", "chia sẻ"],
    keywords_rev: ["giải quyết", "hòa giải", "ưu tiên gia đình"],
    summary_up: "thịnh vượng và bền vững",
    summary_rev: "xung đột về tài sản",
    why_appear_up: "Lá bài này xuất hiện để báo hiệu sự ổn định lâu dài. Trân trọng điều này.",
    why_appear_rev: "Lá bài này xuất hiện vì có xung đột cần giải quyết, đặc biệt về vật chất."
  },
  "Page of Pentacles": {
    name_vi: "Thị Đồng Xu",
    vibe: 1,
    meaning_up: "Cơ hội học hỏi, tin tức tốt về tài chính, khởi đầu thực tế.",
    meaning_rev: "Cơ hội bị trì hoãn, thiếu tập trung.",
    keywords_up: ["học hỏi", "bắt đầu", "kiên nhẫn"],
    keywords_rev: ["kiên nhẫn", "chuẩn bị", "tập trung"],
    summary_up: "cơ hội mới",
    summary_rev: "cơ hội bị trì hoãn",
    why_appear_up: "Lá bài này xuất hiện để báo tin tốt về cơ hội học hỏi hoặc tài chính.",
    why_appear_rev: "Lá bài này xuất hiện vì cơ hội đang chậm đến. Hãy chuẩn bị sẵn."
  },
  "Knight of Pentacles": {
    name_vi: "Hiệp Sĩ Xu",
    vibe: 1,
    meaning_up: "Đáng tin cậy, kiên nhẫn, làm việc chăm chỉ.",
    meaning_rev: "Quá bảo thủ, nhàm chán, thiếu linh hoạt.",
    keywords_up: ["kiên trì", "tin cậy", "ổn định"],
    keywords_rev: ["linh hoạt", "mạo hiểm", "thay đổi"],
    summary_up: "đáng tin cậy và ổn định",
    summary_rev: "quá bảo thủ",
    why_appear_up: "Lá bài này xuất hiện để khẳng định sự kiên trì của bạn. Tiếp tục đi.",
    why_appear_rev: "Lá bài này xuất hiện vì bạn cần linh hoạt hơn. Đừng quá cứng nhắc."
  },
  "Queen of Pentacles": {
    name_vi: "Hoàng Hậu Xu",
    vibe: 1,
    meaning_up: "Chăm sóc, thực tế, quản lý tốt, sung túc.",
    meaning_rev: "Bỏ bê bản thân, quá lo lắng về vật chất.",
    keywords_up: ["chăm sóc", "cân bằng", "thực tế"],
    keywords_rev: ["tự chăm sóc", "buông bỏ", "ranh giới"],
    summary_up: "chăm sóc và thực tế",
    summary_rev: "cần chăm sóc bản thân",
    why_appear_up: "Lá bài này xuất hiện để nhắc bạn về sự quan trọng của việc chăm sóc.",
    why_appear_rev: "Lá bài này xuất hiện vì bạn đang bỏ bê bản thân. Hãy ưu tiên mình."
  },
  "King of Pentacles": {
    name_vi: "Hoàng Đế Xu",
    vibe: 1,
    meaning_up: "Thành đạt, ổn định, lãnh đạo thực tế.",
    meaning_rev: "Quá coi trọng vật chất, bỏ bê gia đình.",
    keywords_up: ["thành công", "lãnh đạo", "cân bằng"],
    keywords_rev: ["cân bằng", "giá trị", "gia đình"],
    summary_up: "thành đạt và ổn định",
    summary_rev: "quá coi trọng vật chất",
    why_appear_up: "Lá bài này xuất hiện để khẳng định sự thành đạt và ổn định.",
    why_appear_rev: "Lá bài này xuất hiện vì bạn cần cân bằng giữa công việc và cuộc sống."
  }
};

// ============= COMBINE ALL CARDS =============
export const allCardMeanings: Record<string, CardData> = {
  ...majorArcana,
  ...wands,
  ...cups,
  ...swords,
  ...pentacles
};

// ============= HELPER FUNCTIONS =============

export const getVietnameseName = (englishName: string): string => {
  return allCardMeanings[englishName]?.name_vi || englishName;
};

export const getInterpretation = (cardName: string, isReversed: boolean): string => {
  const card = allCardMeanings[cardName];
  if (!card) return "Không tìm thấy thông tin lá bài.";
  return isReversed ? card.meaning_rev : card.meaning_up;
};

export const getWhyAppear = (cardName: string, isReversed: boolean): string => {
  const card = allCardMeanings[cardName];
  if (!card) return "";
  return isReversed ? card.why_appear_rev : card.why_appear_up;
};

export const getAdvice = (cardName: string, isReversed: boolean): string => {
  const card = allCardMeanings[cardName];
  if (!card) return "";
  const keywords = isReversed ? card.keywords_rev : card.keywords_up;
  return keywords.join(", ");
};

export const getKeywords = (cardName: string, isReversed: boolean): string[] => {
  const card = allCardMeanings[cardName];
  if (!card) return [];
  return isReversed ? card.keywords_rev : card.keywords_up;
};

// ============= VIBE CALCULATION =============
const getVibeConclusion = (totalVibe: number): { conclusion: string; descriptor: string } => {
  if (totalVibe >= 2) {
    return { conclusion: "rất khả quan và tích cực", descriptor: "rất tích cực" };
  } else if (totalVibe === 1) {
    return { conclusion: "đang có chuyển biến tốt", descriptor: "tích cực" };
  } else if (totalVibe === 0 || totalVibe === -1) {
    return { conclusion: "đang trong giai đoạn chuyển tiếp, cần thận trọng", descriptor: "cần lưu ý" };
  } else {
    return { conclusion: "đang có thử thách, cần điều chỉnh hướng đi", descriptor: "thử thách" };
  }
};

// ============= SYNTHESIS FRAMEWORK =============
export interface SynthesisResult {
  part1_overview: string;
  part2_past: string;
  part3_present: string;
  part4_future: string;
  part5_advice: string;
  totalVibe: number;
  vibeDescriptor: string;
}

export const synthesizeReading = (
  cards: Array<{ name: string; isReversed?: boolean }>,
  question: string = "Xem tổng quan"
): SynthesisResult => {
  const card1 = allCardMeanings[cards[0]?.name];
  const card2 = allCardMeanings[cards[1]?.name];
  const card3 = allCardMeanings[cards[2]?.name];

  if (!card1 || !card2 || !card3) {
    return {
      part1_overview: "Không thể tổng hợp kết quả - thiếu thông tin lá bài.",
      part2_past: "",
      part3_present: "",
      part4_future: "",
      part5_advice: "",
      totalVibe: 0,
      vibeDescriptor: "không xác định"
    };
  }

  // Calculate vibe
  const vibe1 = cards[0].isReversed ? -card1.vibe : card1.vibe;
  const vibe2 = cards[1].isReversed ? -card2.vibe : card2.vibe;
  const vibe3 = cards[2].isReversed ? -card3.vibe : card3.vibe;
  const totalVibe = vibe1 + vibe2 + vibe3;

  const { conclusion, descriptor } = getVibeConclusion(totalVibe);

  // Get summaries
  const summary1 = cards[0].isReversed ? card1.summary_rev : card1.summary_up;
  const summary2 = cards[1].isReversed ? card2.summary_rev : card2.summary_up;
  const summary3 = cards[2].isReversed ? card3.summary_rev : card3.summary_up;

  // Get meanings
  const meaning1 = cards[0].isReversed ? card1.meaning_rev : card1.meaning_up;
  const meaning2 = cards[1].isReversed ? card2.meaning_rev : card2.meaning_up;
  const meaning3 = cards[2].isReversed ? card3.meaning_rev : card3.meaning_up;

  // Get why appear
  const why1 = cards[0].isReversed ? card1.why_appear_rev : card1.why_appear_up;
  const why2 = cards[1].isReversed ? card2.why_appear_rev : card2.why_appear_up;
  const why3 = cards[2].isReversed ? card3.why_appear_rev : card3.why_appear_up;

  // Get keywords for advice
  const keywords3 = cards[2].isReversed ? card3.keywords_rev : card3.keywords_up;

  // ===== PART 1: Overview - Direct answer =====
  const part1_overview = `Các lá bài cho thấy tình hình ${conclusion}. Trước đây bạn đã ${summary1}, hiện tại đang ${summary2}, và tương lai có xu hướng ${summary3}.`;

  // ===== PART 2: Past =====
  const part2_past = `Lá bài ${card1.name_vi} (${cards[0].isReversed ? 'Ngược' : 'Xuôi'}) có ý nghĩa là: ${meaning1}\n\n${why1}`;

  // ===== PART 3: Present =====
  const part3_present = `Lá bài ${card2.name_vi} (${cards[1].isReversed ? 'Ngược' : 'Xuôi'}) có ý nghĩa là: ${meaning2}\n\n${why2}`;

  // ===== PART 4: Future =====
  const part4_future = `Lá bài ${card3.name_vi} (${cards[2].isReversed ? 'Ngược' : 'Xuôi'}) có ý nghĩa là: ${meaning3}\n\n${why3}`;

  // ===== PART 5: Advice =====
  const actionStr = keywords3.join(", ");
  const part5_advice = `Dựa trên toàn bộ trải bài, lời khuyên dành cho bạn là: ${actionStr}. Hãy tập trung vào những hành động này để đạt được kết quả tốt nhất.`;

  return {
    part1_overview,
    part2_past,
    part3_present,
    part4_future,
    part5_advice,
    totalVibe,
    vibeDescriptor: descriptor
  };
};
