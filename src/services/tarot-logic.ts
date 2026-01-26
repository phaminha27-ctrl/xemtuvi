// Vietnamese Tarot Logic - The Intelligent Tarot Engine
// 78 Card Data with Meaning_Matrix (6 categories) + Keywords + Vibe scoring

export type CategoryType = 'love' | 'career' | 'finance' | 'self' | 'health' | 'family';

export interface MeaningMatrix {
  love: string;
  career: string;
  finance: string;
  self: string;
  health: string;
  family: string;
}

export interface CardData {
  name_vi: string;        // Vietnamese name (e.g., "Pháp Sư", "Bốn Cốc")
  vibe: number;           // +1 = Positive, 0 = Neutral, -1 = Negative
  meaning_matrix_up: MeaningMatrix;
  meaning_matrix_rev: MeaningMatrix;
  keywords_up: string[];  // 3-5 action keywords for upright
  keywords_rev: string[]; // 3-5 action keywords for reversed
  summary_up: string;     // Short summary for synthesis
  summary_rev: string;    // Short summary for synthesis (reversed)
}

// ============= MAJOR ARCANA (22 cards) =============
const majorArcana: Record<string, CardData> = {
  "The Fool": {
    name_vi: "Gã Khờ",
    vibe: 1,
    meaning_matrix_up: {
      love: "Một mối quan hệ mới đang bắt đầu hoặc bạn cần mạo hiểm hơn trong tình yêu. Đừng sợ bước ra khỏi vùng an toàn.",
      career: "Cơ hội mới xuất hiện, có thể là công việc mới hoặc dự án thú vị. Tin vào bản năng và dám thử.",
      finance: "Đừng quá lo lắng về tiền bạc lúc này. Đôi khi cần đầu tư mạo hiểm để có kết quả.",
      self: "Bạn đang sẵn sàng cho hành trình khám phá bản thân mới. Hãy cởi mở và tò mò.",
      health: "Thử một chế độ tập luyện hoặc ăn uống mới. Đừng sợ thay đổi thói quen.",
      family: "Sẵn sàng làm quen với thành viên mới hoặc bắt đầu chương mới trong gia đình."
    },
    meaning_matrix_rev: {
      love: "Bạn đang do dự, không dám mở lòng hoặc đang hành động thiếu suy nghĩ trong tình cảm.",
      career: "Cẩn thận với những quyết định vội vàng. Đừng nhảy việc khi chưa chuẩn bị kỹ.",
      finance: "Đang liều lĩnh quá mức với tiền bạc hoặc ngược lại - quá sợ rủi ro.",
      self: "Thiếu định hướng, lạc lõng hoặc đang hành động ngẫu hứng mà không suy nghĩ.",
      health: "Cẩn thận với những thử nghiệm mạo hiểm. Đừng bỏ qua các dấu hiệu cảnh báo.",
      family: "Đang hành động thiếu trách nhiệm hoặc không nghĩ đến gia đình."
    },
    keywords_up: ["bắt đầu", "mạo hiểm", "tin tưởng", "tự do", "lạc quan"],
    keywords_rev: ["dừng lại", "suy nghĩ kỹ", "lập kế hoạch", "cẩn thận"],
    summary_up: "sẵn sàng bắt đầu điều mới với năng lượng tích cực",
    summary_rev: "do dự hoặc hành động thiếu suy nghĩ"
  },
  "The Magician": {
    name_vi: "Pháp Sư",
    vibe: 1,
    meaning_matrix_up: {
      love: "Bạn có khả năng tạo ra mối quan hệ mình muốn. Chủ động và tự tin trong tình yêu.",
      career: "Đủ kỹ năng và nguồn lực để thành công. Tập trung và hành động quyết đoán.",
      finance: "Có khả năng tạo ra tiền từ nhiều nguồn. Sử dụng tài năng để kiếm thêm thu nhập.",
      self: "Bạn có tiềm năng lớn. Tin vào khả năng của mình và biến ý tưởng thành hiện thực.",
      health: "Có đủ ý chí để thay đổi thói quen. Tập trung vào mục tiêu sức khỏe.",
      family: "Có thể giúp đỡ và dẫn dắt gia đình. Kỹ năng giao tiếp tốt."
    },
    meaning_matrix_rev: {
      love: "Đang lãng phí tiềm năng trong tình yêu hoặc không thành thật với người khác.",
      career: "Thiếu tập trung, phân tán năng lượng hoặc chưa phát huy hết khả năng.",
      finance: "Đang sử dụng tiền không hiệu quả hoặc bỏ lỡ cơ hội kiếm tiền.",
      self: "Chưa tin vào bản thân hoặc đang lãng phí tài năng vào việc vô ích.",
      health: "Thiếu ý chí để duy trì thói quen tốt. Dễ bỏ cuộc.",
      family: "Không tận dụng được khả năng để giúp đỡ gia đình."
    },
    keywords_up: ["hành động", "tập trung", "sáng tạo", "tự tin", "thực hiện"],
    keywords_rev: ["xem lại", "tập trung", "dừng phân tán", "trung thực"],
    summary_up: "có đủ khả năng để đạt được mục tiêu",
    summary_rev: "đang lãng phí tiềm năng hoặc thiếu tập trung"
  },
  "The High Priestess": {
    name_vi: "Nữ Tư Tế",
    vibe: 1,
    meaning_matrix_up: {
      love: "Tin vào trực giác về mối quan hệ. Có điều đối phương chưa nói hết, hãy quan sát.",
      career: "Lắng nghe linh cảm về công việc. Đừng vội quyết định, chờ thêm thông tin.",
      finance: "Có điều chưa rõ ràng về tiền bạc. Đừng đầu tư khi chưa hiểu rõ.",
      self: "Kết nối với nội tâm, dành thời gian yên tĩnh để hiểu mình hơn.",
      health: "Lắng nghe cơ thể. Có thể cần kiểm tra sức khỏe định kỳ.",
      family: "Có bí mật trong gia đình hoặc điều chưa được nói ra."
    },
    meaning_matrix_rev: {
      love: "Đang phớt lờ trực giác hoặc không thành thật với cảm xúc của mình.",
      career: "Bỏ qua dấu hiệu quan trọng trong công việc. Không tin vào linh cảm.",
      finance: "Quyết định tài chính thiếu cân nhắc. Bỏ qua những cảnh báo.",
      self: "Mất kết nối với bản thân, không hiểu mình muốn gì.",
      health: "Phớt lờ tín hiệu từ cơ thể. Cần chú ý hơn.",
      family: "Đang giấu giếm hoặc không chia sẻ với gia đình."
    },
    keywords_up: ["lắng nghe", "chờ đợi", "quan sát", "suy ngẫm"],
    keywords_rev: ["đối mặt", "thành thật", "mở lòng", "kết nối"],
    summary_up: "cần lắng nghe trực giác và chờ đợi",
    summary_rev: "đang phớt lờ cảm xúc thật của mình"
  },
  "The Empress": {
    name_vi: "Hoàng Hậu",
    vibe: 1,
    meaning_matrix_up: {
      love: "Tình yêu đang nở rộ, có thể là khởi đầu mối quan hệ mới hoặc giai đoạn ngọt ngào.",
      career: "Dự án đang phát triển tốt. Sáng tạo và nuôi dưỡng ý tưởng.",
      finance: "Giai đoạn sung túc, tiền bạc dồi dào. Có thể nhận được quà hoặc bonus.",
      self: "Yêu thương bản thân, chăm sóc bản thân tốt hơn.",
      health: "Sức khỏe tốt, có thể liên quan đến thai sản hoặc sinh sản.",
      family: "Gia đình hòa thuận, có thể đón thêm thành viên mới."
    },
    meaning_matrix_rev: {
      love: "Thiếu sự chăm sóc trong mối quan hệ hoặc quá phụ thuộc.",
      career: "Dự án bị đình trệ, thiếu sáng tạo hoặc quá kiệt sức.",
      finance: "Chi tiêu quá tay hoặc cạn kiệt tài chính.",
      self: "Không chăm sóc bản thân đủ, kiệt sức hoặc tự ti.",
      health: "Cần chú ý đến sức khỏe sinh sản hoặc dinh dưỡng.",
      family: "Căng thẳng trong gia đình, thiếu sự quan tâm lẫn nhau."
    },
    keywords_up: ["nuôi dưỡng", "sáng tạo", "phát triển", "tận hưởng"],
    keywords_rev: ["tự chăm sóc", "nghỉ ngơi", "cân bằng", "buông bỏ"],
    summary_up: "giai đoạn sung túc và phát triển",
    summary_rev: "cần chăm sóc bản thân và nghỉ ngơi"
  },
  "The Emperor": {
    name_vi: "Hoàng Đế",
    vibe: 1,
    meaning_matrix_up: {
      love: "Cần sự ổn định và cam kết trong mối quan hệ. Người đàn ông có ảnh hưởng.",
      career: "Thời điểm để lãnh đạo và thiết lập quy tắc. Kỷ luật dẫn đến thành công.",
      finance: "Quản lý tiền bạc có hệ thống. Đầu tư an toàn và dài hạn.",
      self: "Cần kỷ luật và tự chủ. Đặt mục tiêu rõ ràng và tuân thủ.",
      health: "Duy trì thói quen tập luyện đều đặn. Kỷ luật trong ăn uống.",
      family: "Vai trò người trụ cột, bảo vệ và cung cấp cho gia đình."
    },
    meaning_matrix_rev: {
      love: "Quá kiểm soát hoặc cứng nhắc trong tình yêu. Thiếu linh hoạt.",
      career: "Lạm dụng quyền lực hoặc thiếu khả năng lãnh đạo.",
      finance: "Quản lý tiền bạc quá chặt hoặc quá lỏng lẻo.",
      self: "Thiếu kỷ luật hoặc quá nghiêm khắc với bản thân.",
      health: "Căng thẳng do áp lực. Cần thư giãn hơn.",
      family: "Độc đoán hoặc thiếu trách nhiệm với gia đình."
    },
    keywords_up: ["tổ chức", "kỷ luật", "lãnh đạo", "cam kết"],
    keywords_rev: ["linh hoạt", "lắng nghe", "buông bỏ kiểm soát", "cân bằng"],
    summary_up: "cần kỷ luật và tổ chức để thành công",
    summary_rev: "đang quá cứng nhắc hoặc thiếu kiểm soát"
  },
  "The Hierophant": {
    name_vi: "Giáo Hoàng",
    vibe: 1,
    meaning_matrix_up: {
      love: "Mối quan hệ truyền thống, có thể liên quan đến hôn nhân hoặc cam kết chính thức.",
      career: "Học hỏi từ mentor, tuân theo quy trình đã được chứng minh.",
      finance: "Đầu tư an toàn, theo lời khuyên của chuyên gia.",
      self: "Tìm kiếm ý nghĩa cuộc sống, học hỏi từ những người đi trước.",
      health: "Theo phương pháp điều trị truyền thống, nghe lời bác sĩ.",
      family: "Giữ gìn truyền thống gia đình, kết nối với thế hệ trước."
    },
    meaning_matrix_rev: {
      love: "Thách thức những kỳ vọng truyền thống, muốn tự do hơn.",
      career: "Không hài lòng với hệ thống, muốn làm theo cách riêng.",
      finance: "Thử phương pháp đầu tư phi truyền thống.",
      self: "Tìm con đường riêng, không theo số đông.",
      health: "Thử liệu pháp thay thế hoặc phương pháp mới.",
      family: "Phá vỡ truyền thống gia đình, xung đột thế hệ."
    },
    keywords_up: ["học hỏi", "tuân theo", "kết nối", "truyền thống"],
    keywords_rev: ["độc lập", "thử nghiệm", "tự quyết", "đổi mới"],
    summary_up: "cần học hỏi từ người có kinh nghiệm",
    summary_rev: "đang muốn tìm con đường riêng"
  },
  "The Lovers": {
    name_vi: "Người Yêu",
    vibe: 1,
    meaning_matrix_up: {
      love: "Mối quan hệ sâu sắc, tình yêu đích thực hoặc lựa chọn quan trọng về tình cảm.",
      career: "Hợp tác tốt đẹp, quyết định quan trọng về nghề nghiệp.",
      finance: "Cần cân nhắc kỹ trước khi chi tiêu lớn. Lựa chọn tài chính quan trọng.",
      self: "Hiểu rõ giá trị của mình, lựa chọn sống theo đúng bản thân.",
      health: "Cân bằng giữa thể chất và tinh thần. Lựa chọn lối sống lành mạnh.",
      family: "Hòa hợp gia đình, có thể có quyết định lớn liên quan đến gia đình."
    },
    meaning_matrix_rev: {
      love: "Xung đột trong mối quan hệ, khó đưa ra lựa chọn hoặc không trung thực.",
      career: "Mâu thuẫn với đồng nghiệp, khó quyết định hướng đi.",
      finance: "Quyết định tài chính sai lầm hoặc đang phân vân.",
      self: "Mất kết nối với giá trị bản thân, sống không đúng với mình.",
      health: "Mất cân bằng, cần xem lại lối sống.",
      family: "Bất đồng trong gia đình, cần giải quyết xung đột."
    },
    keywords_up: ["lựa chọn", "cam kết", "kết nối", "đồng điệu"],
    keywords_rev: ["trò chuyện", "giải quyết", "thành thật", "cân nhắc"],
    summary_up: "đang có kết nối sâu sắc hoặc lựa chọn quan trọng",
    summary_rev: "đang gặp xung đột hoặc khó quyết định"
  },
  "The Chariot": {
    name_vi: "Chiến Xa",
    vibe: 1,
    meaning_matrix_up: {
      love: "Quyết tâm theo đuổi tình yêu, vượt qua trở ngại để đến với nhau.",
      career: "Tiến về phía trước mạnh mẽ, vượt qua thử thách để thành công.",
      finance: "Kiếm tiền bằng nỗ lực và quyết tâm. Có thể có tiến bộ tài chính.",
      self: "Tự tin và có động lực mạnh mẽ. Kiểm soát được cuộc sống.",
      health: "Ý chí mạnh mẽ để cải thiện sức khỏe. Có thể hoàn thành mục tiêu.",
      family: "Bảo vệ gia đình, vượt qua khó khăn cùng nhau."
    },
    meaning_matrix_rev: {
      love: "Mất kiểm soát trong tình yêu, quá hung hăng hoặc thiếu quyết tâm.",
      career: "Mất phương hướng, thiếu động lực hoặc bị cản trở.",
      finance: "Nỗ lực không đi đến đâu, tiền bạc bị đình trệ.",
      self: "Thiếu tự tin, mất kiểm soát cảm xúc.",
      health: "Thiếu ý chí để duy trì thói quen tốt.",
      family: "Xung đột trong việc bảo vệ gia đình."
    },
    keywords_up: ["tiến lên", "quyết tâm", "kiểm soát", "chiến thắng"],
    keywords_rev: ["dừng lại", "xem lại hướng đi", "bình tĩnh", "tập trung"],
    summary_up: "có quyết tâm mạnh mẽ để vượt qua thử thách",
    summary_rev: "đang mất phương hướng hoặc thiếu động lực"
  },
  "Strength": {
    name_vi: "Sức Mạnh",
    vibe: 1,
    meaning_matrix_up: {
      love: "Kiên nhẫn và dịu dàng trong tình yêu. Vượt qua khó khăn bằng sự thấu hiểu.",
      career: "Đối mặt thử thách bằng sự bình tĩnh và kiên trì.",
      finance: "Kiên nhẫn trong đầu tư dài hạn. Không hoảng loạn khi thị trường biến động.",
      self: "Sức mạnh nội tại, kiểm soát được bản năng và cảm xúc.",
      health: "Có đủ sức mạnh để vượt qua bệnh tật hoặc duy trì lối sống lành mạnh.",
      family: "Là điểm tựa tinh thần cho gia đình, kiên nhẫn với người thân."
    },
    meaning_matrix_rev: {
      love: "Thiếu kiên nhẫn, dễ nổi nóng hoặc mất niềm tin vào mối quan hệ.",
      career: "Nghi ngờ bản thân, thiếu tự tin để đối mặt thử thách.",
      finance: "Hoảng loạn khi gặp khó khăn tài chính, thiếu bình tĩnh.",
      self: "Tự nghi ngờ, để cảm xúc tiêu cực kiểm soát.",
      health: "Thiếu sức mạnh ý chí, dễ bỏ cuộc.",
      family: "Thiếu kiên nhẫn với người thân, dễ xung đột."
    },
    keywords_up: ["kiên nhẫn", "bình tĩnh", "tin tưởng", "chịu đựng"],
    keywords_rev: ["tự yêu thương", "nghỉ ngơi", "tìm hỗ trợ", "chấp nhận"],
    summary_up: "có đủ nội lực để đối mặt mọi thử thách",
    summary_rev: "đang thiếu tự tin hoặc kiệt sức"
  },
  "The Hermit": {
    name_vi: "Ẩn Sĩ",
    vibe: 0,
    meaning_matrix_up: {
      love: "Cần thời gian một mình để suy nghĩ về mối quan hệ.",
      career: "Làm việc độc lập, tìm hiểu sâu hoặc cần nghỉ ngơi.",
      finance: "Cân nhắc kỹ trước khi chi tiêu, không vội vàng đầu tư.",
      self: "Thời gian tự vấn, tìm hiểu bản thân sâu hơn.",
      health: "Nghỉ ngơi, thiền định, chăm sóc tinh thần.",
      family: "Cần không gian riêng, tạm rời xa gia đình để suy nghĩ."
    },
    meaning_matrix_rev: {
      love: "Cô đơn quá mức, trốn tránh mối quan hệ.",
      career: "Tách biệt quá mức với đồng nghiệp, bỏ lỡ cơ hội hợp tác.",
      finance: "Bảo thủ quá mức, bỏ lỡ cơ hội kiếm tiền.",
      self: "Cô lập bản thân, trầm cảm hoặc trốn tránh thực tế.",
      health: "Cô đơn ảnh hưởng sức khỏe tinh thần.",
      family: "Xa cách gia đình, thiếu kết nối."
    },
    keywords_up: ["suy ngẫm", "nghỉ ngơi", "tìm kiếm", "một mình"],
    keywords_rev: ["kết nối", "mở lòng", "tham gia", "chia sẻ"],
    summary_up: "cần thời gian một mình để tìm câu trả lời",
    summary_rev: "đang cô lập bản thân quá mức"
  },
  "Wheel of Fortune": {
    name_vi: "Bánh Xe Vận Mệnh",
    vibe: 1,
    meaning_matrix_up: {
      love: "Vận may trong tình yêu, có thể gặp người mới hoặc mối quan hệ chuyển biến tốt.",
      career: "Cơ hội mới đến, thay đổi tích cực trong công việc.",
      finance: "May mắn về tiền bạc, có thể có thu nhập bất ngờ.",
      self: "Cuộc sống đang thay đổi tích cực, đi theo dòng chảy.",
      health: "Sức khỏe cải thiện, may mắn trong điều trị.",
      family: "Thay đổi tích cực trong gia đình, tin tốt."
    },
    meaning_matrix_rev: {
      love: "Vận xui trong tình yêu, có thể gặp trở ngại hoặc chia ly tạm thời.",
      career: "Gặp khó khăn bất ngờ, thay đổi không mong muốn.",
      finance: "Thua lỗ bất ngờ, cẩn thận với cờ bạc và đầu cơ.",
      self: "Giai đoạn khó khăn, cần chấp nhận thay đổi.",
      health: "Cần cẩn thận, có thể có vấn đề sức khỏe bất ngờ.",
      family: "Biến cố trong gia đình, cần thích nghi."
    },
    keywords_up: ["nắm bắt", "tin tưởng", "thay đổi", "may mắn"],
    keywords_rev: ["kiên nhẫn", "chấp nhận", "thích nghi", "chờ đợi"],
    summary_up: "may mắn và cơ hội đang đến",
    summary_rev: "đang trải qua giai đoạn khó khăn tạm thời"
  },
  "Justice": {
    name_vi: "Công Lý",
    vibe: 1,
    meaning_matrix_up: {
      love: "Mối quan hệ công bằng, cân bằng cho-nhận. Có thể liên quan đến pháp lý.",
      career: "Được công nhận xứng đáng, kết quả phản ánh nỗ lực.",
      finance: "Nhận được những gì xứng đáng, có thể liên quan đến kiện tụng.",
      self: "Sống trung thực, chịu trách nhiệm với hành động của mình.",
      health: "Cân bằng trong lối sống, nhận hậu quả của thói quen.",
      family: "Công bằng trong gia đình, giải quyết tranh chấp."
    },
    meaning_matrix_rev: {
      love: "Bất công trong mối quan hệ, một bên cho nhiều hơn.",
      career: "Không được đánh giá đúng, kết quả không công bằng.",
      finance: "Thua thiệt tài chính không công bằng.",
      self: "Trốn tránh trách nhiệm, không trung thực với bản thân.",
      health: "Không chịu trách nhiệm với sức khỏe của mình.",
      family: "Bất công trong gia đình, thiên vị."
    },
    keywords_up: ["trung thực", "cân bằng", "chịu trách nhiệm", "công bằng"],
    keywords_rev: ["xem lại", "chấp nhận", "tìm công bằng", "đối mặt"],
    summary_up: "sự công bằng sẽ được thực thi",
    summary_rev: "đang đối mặt với sự bất công"
  },
  "The Hanged Man": {
    name_vi: "Người Treo Ngược",
    vibe: 0,
    meaning_matrix_up: {
      love: "Cần nhìn mối quan hệ từ góc độ khác, tạm dừng để suy nghĩ.",
      career: "Đình trệ có chủ đích, chờ đợi thời điểm tốt hơn.",
      finance: "Không phải lúc hành động, chờ đợi và quan sát.",
      self: "Buông bỏ để nhận được, hy sinh ngắn hạn cho lợi ích dài hạn.",
      health: "Nghỉ ngơi, để cơ thể tự chữa lành.",
      family: "Nhìn vấn đề gia đình từ góc độ khác."
    },
    meaning_matrix_rev: {
      love: "Đình trệ quá lâu, cần hành động hoặc buông bỏ.",
      career: "Bị kẹt, không tiến không lùi được.",
      finance: "Hy sinh vô ích, cần thay đổi chiến lược.",
      self: "Kháng cự thay đổi, không chịu buông bỏ.",
      health: "Tình trạng sức khỏe bị treo lơ lửng.",
      family: "Tình huống gia đình bế tắc."
    },
    keywords_up: ["chờ đợi", "buông bỏ", "nhìn khác", "hy sinh"],
    keywords_rev: ["hành động", "quyết định", "tiến lên", "thay đổi"],
    summary_up: "cần tạm dừng và nhìn từ góc độ khác",
    summary_rev: "đang bị kẹt và cần phải hành động"
  },
  "Death": {
    name_vi: "Tử Thần",
    vibe: 0,
    meaning_matrix_up: {
      love: "Kết thúc một giai đoạn, có thể là chia tay hoặc chuyển đổi mối quan hệ.",
      career: "Kết thúc công việc cũ để bắt đầu mới, chuyển đổi nghề nghiệp.",
      finance: "Kết thúc cách quản lý tiền cũ, bắt đầu phương pháp mới.",
      self: "Phiên bản cũ của bạn đang chết đi, sẵn sàng cho sự thay đổi.",
      health: "Kết thúc thói quen xấu, bắt đầu lối sống mới.",
      family: "Thay đổi lớn trong gia đình, kết thúc một chương."
    },
    meaning_matrix_rev: {
      love: "Kháng cự kết thúc, bám víu vào mối quan hệ đã hết.",
      career: "Sợ thay đổi, không dám rời bỏ công việc không phù hợp.",
      finance: "Bám víu cách làm cũ không hiệu quả.",
      self: "Sợ thay đổi, không chịu buông bỏ quá khứ.",
      health: "Không chịu thay đổi thói quen dù biết có hại.",
      family: "Không chấp nhận thay đổi trong gia đình."
    },
    keywords_up: ["buông bỏ", "chấp nhận", "bắt đầu mới", "chuyển đổi"],
    keywords_rev: ["đối mặt", "chấp nhận thay đổi", "tiến lên", "buông"],
    summary_up: "kết thúc cũ để bắt đầu mới",
    summary_rev: "đang kháng cự thay đổi cần thiết"
  },
  "Temperance": {
    name_vi: "Điều Độ",
    vibe: 1,
    meaning_matrix_up: {
      love: "Cân bằng trong mối quan hệ, hòa hợp và kiên nhẫn.",
      career: "Cân bằng công việc và cuộc sống, làm việc bền vững.",
      finance: "Chi tiêu cân đối, không thái quá về hướng nào.",
      self: "Tìm sự cân bằng trong cuộc sống, điều độ trong mọi việc.",
      health: "Cân bằng trong ăn uống và tập luyện, lối sống lành mạnh.",
      family: "Hòa hợp gia đình, cân bằng giữa các mối quan hệ."
    },
    meaning_matrix_rev: {
      love: "Mất cân bằng, một bên cho quá nhiều hoặc quá ít.",
      career: "Mất cân bằng công việc-cuộc sống, kiệt sức.",
      finance: "Chi tiêu thái quá hoặc quá tiết kiệm.",
      self: "Sống thái quá, thiếu điều độ.",
      health: "Ăn uống, tập luyện thiếu cân bằng.",
      family: "Thiên vị trong gia đình, mất cân bằng."
    },
    keywords_up: ["cân bằng", "kiên nhẫn", "hài hòa", "điều độ"],
    keywords_rev: ["điều chỉnh", "xem lại", "cân đối", "giảm bớt"],
    summary_up: "cần cân bằng và điều độ",
    summary_rev: "đang mất cân bằng trong cuộc sống"
  },
  "The Devil": {
    name_vi: "Ác Quỷ",
    vibe: -1,
    meaning_matrix_up: {
      love: "Bị ràng buộc bởi mối quan hệ độc hại hoặc ham muốn.",
      career: "Bị trói buộc bởi công việc không thích, làm vì tiền.",
      finance: "Tham lam, nghiện mua sắm hoặc cờ bạc.",
      self: "Bị kiểm soát bởi thói quen xấu, nghiện ngập hoặc nỗi sợ.",
      health: "Nghiện ngập ảnh hưởng sức khỏe, cần cai nghiện.",
      family: "Mối quan hệ gia đình độc hại, bị kiểm soát."
    },
    meaning_matrix_rev: {
      love: "Đang thoát khỏi mối quan hệ độc hại, nhận ra vấn đề.",
      career: "Bắt đầu thoát khỏi công việc không phù hợp.",
      finance: "Nhận ra và sửa chữa thói quen tài chính xấu.",
      self: "Đang vượt qua nghiện ngập hoặc thói quen xấu.",
      health: "Đang cai nghiện, cải thiện sức khỏe.",
      family: "Thoát khỏi sự kiểm soát của gia đình."
    },
    keywords_up: ["nhận diện", "thoát ra", "kiểm soát", "thay đổi"],
    keywords_rev: ["tiếp tục", "kiên trì", "tự do", "chữa lành"],
    summary_up: "đang bị ràng buộc bởi thói quen xấu hoặc nỗi sợ",
    summary_rev: "đang bắt đầu thoát khỏi ràng buộc"
  },
  "The Tower": {
    name_vi: "Tháp",
    vibe: -1,
    meaning_matrix_up: {
      love: "Sụp đổ bất ngờ, chia tay hoặc sự thật bị phơi bày.",
      career: "Mất việc đột ngột, dự án thất bại hoặc thay đổi lớn.",
      finance: "Thua lỗ bất ngờ, khủng hoảng tài chính.",
      self: "Sụp đổ niềm tin, thức tỉnh đau đớn nhưng cần thiết.",
      health: "Vấn đề sức khỏe bất ngờ, tai nạn.",
      family: "Khủng hoảng gia đình, bí mật bị tiết lộ."
    },
    meaning_matrix_rev: {
      love: "Tránh được chia tay hoặc đang phục hồi sau sụp đổ.",
      career: "Tránh được thất bại hoặc đang xây dựng lại.",
      finance: "Hồi phục sau khủng hoảng hoặc tránh được thua lỗ.",
      self: "Đang phục hồi sau khủng hoảng cá nhân.",
      health: "Phục hồi sau bệnh tật hoặc tai nạn.",
      family: "Đang xây dựng lại sau khủng hoảng gia đình."
    },
    keywords_up: ["chấp nhận", "xây dựng lại", "học hỏi", "thích nghi"],
    keywords_rev: ["tiếp tục hồi phục", "kiên trì", "xây dựng", "tin tưởng"],
    summary_up: "thay đổi đột ngột, cần xây dựng lại",
    summary_rev: "đang phục hồi sau khủng hoảng"
  },
  "The Star": {
    name_vi: "Ngôi Sao",
    vibe: 1,
    meaning_matrix_up: {
      love: "Hy vọng trong tình yêu, chữa lành sau tổn thương.",
      career: "Tương lai tươi sáng, cảm hứng và hy vọng mới.",
      finance: "Triển vọng tài chính tốt, hy vọng cải thiện.",
      self: "Chữa lành, tìm lại niềm tin và hy vọng.",
      health: "Hồi phục sức khỏe, chữa lành thể chất và tinh thần.",
      family: "Hy vọng mới trong gia đình, hòa giải."
    },
    meaning_matrix_rev: {
      love: "Mất niềm tin vào tình yêu, thất vọng.",
      career: "Mất hy vọng về công việc, không thấy tương lai.",
      finance: "Bi quan về tài chính, mất niềm tin.",
      self: "Trầm cảm, mất hy vọng vào cuộc sống.",
      health: "Sức khỏe tinh thần suy giảm, cần hỗ trợ.",
      family: "Mất hy vọng về gia đình."
    },
    keywords_up: ["tin tưởng", "hy vọng", "chữa lành", "lạc quan"],
    keywords_rev: ["tìm hỗ trợ", "kiên nhẫn", "nhỏ bước", "chấp nhận"],
    summary_up: "hy vọng và chữa lành đang đến",
    summary_rev: "đang mất niềm tin và cần hỗ trợ"
  },
  "The Moon": {
    name_vi: "Mặt Trăng",
    vibe: -1,
    meaning_matrix_up: {
      love: "Có điều chưa rõ ràng trong mối quan hệ, lừa dối hoặc hiểu lầm.",
      career: "Tình huống mơ hồ, không biết thực hư thế nào.",
      finance: "Cẩn thận với lừa đảo, đừng tin những gì thấy bề ngoài.",
      self: "Lo lắng, sợ hãi hoặc có điều chưa đối mặt trong tiềm thức.",
      health: "Chẩn đoán chưa rõ ràng, cần kiểm tra thêm.",
      family: "Bí mật trong gia đình, không ai nói thật."
    },
    meaning_matrix_rev: {
      love: "Sự thật được phơi bày, hiểu rõ hơn về mối quan hệ.",
      career: "Tình huống trở nên rõ ràng hơn.",
      finance: "Phát hiện lừa đảo hoặc hiểu rõ tình hình tài chính.",
      self: "Đối mặt với nỗi sợ, hiểu rõ bản thân hơn.",
      health: "Chẩn đoán rõ ràng hơn.",
      family: "Bí mật được tiết lộ, sự thật sáng tỏ."
    },
    keywords_up: ["cẩn thận", "chờ đợi", "kiểm tra", "nghi ngờ"],
    keywords_rev: ["tin tưởng", "hành động", "sáng tỏ", "tiến lên"],
    summary_up: "có điều chưa rõ ràng, cần cẩn thận",
    summary_rev: "sự thật đang dần sáng tỏ"
  },
  "The Sun": {
    name_vi: "Mặt Trời",
    vibe: 1,
    meaning_matrix_up: {
      love: "Hạnh phúc trong tình yêu, mối quan hệ tươi sáng.",
      career: "Thành công, được công nhận, tương lai sáng lạn.",
      finance: "Thịnh vượng, tiền bạc dồi dào.",
      self: "Vui vẻ, lạc quan, tự tin và năng lượng tích cực.",
      health: "Sức khỏe tốt, tràn đầy năng lượng.",
      family: "Gia đình hạnh phúc, tin vui."
    },
    meaning_matrix_rev: {
      love: "Niềm vui bị che mờ, vấn đề nhỏ trong mối quan hệ.",
      career: "Thành công bị trì hoãn, cần kiên nhẫn.",
      finance: "Tài chính ổn nhưng chưa đạt kỳ vọng.",
      self: "Thiếu tự tin tạm thời, cần tìm lại niềm vui.",
      health: "Sức khỏe ổn nhưng thiếu năng lượng.",
      family: "Niềm vui gia đình bị ảnh hưởng nhẹ."
    },
    keywords_up: ["tận hưởng", "chia sẻ", "tỏa sáng", "lạc quan"],
    keywords_rev: ["kiên nhẫn", "tìm niềm vui", "lạc quan", "tin tưởng"],
    summary_up: "thành công và hạnh phúc",
    summary_rev: "niềm vui bị che mờ tạm thời"
  },
  "Judgement": {
    name_vi: "Phán Xét",
    vibe: 1,
    meaning_matrix_up: {
      love: "Đánh giá lại mối quan hệ, quyết định quan trọng.",
      career: "Được đánh giá, có thể là thăng tiến hoặc kết quả quan trọng.",
      finance: "Đánh giá lại tài chính, quyết định lớn.",
      self: "Thức tỉnh, nhìn lại cuộc sống và thay đổi.",
      health: "Đánh giá lại sức khỏe, quyết định thay đổi lối sống.",
      family: "Đánh giá lại mối quan hệ gia đình."
    },
    meaning_matrix_rev: {
      love: "Phán xét quá khắc nghiệt, không tha thứ.",
      career: "Bị đánh giá không công bằng, trốn tránh kết quả.",
      finance: "Không chịu nhìn nhận thực tế tài chính.",
      self: "Tự phán xét quá khắc nghiệt, không tha thứ cho mình.",
      health: "Phớt lờ lời khuyên về sức khỏe.",
      family: "Không chịu hòa giải với gia đình."
    },
    keywords_up: ["đánh giá", "quyết định", "thay đổi", "thức tỉnh"],
    keywords_rev: ["tha thứ", "chấp nhận", "buông bỏ", "hòa giải"],
    summary_up: "thời điểm đánh giá lại và quyết định quan trọng",
    summary_rev: "cần tha thứ cho bản thân và người khác"
  },
  "The World": {
    name_vi: "Thế Giới",
    vibe: 1,
    meaning_matrix_up: {
      love: "Hoàn thành, mối quan hệ viên mãn hoặc đạt được mục tiêu tình yêu.",
      career: "Thành công lớn, hoàn thành dự án quan trọng.",
      finance: "Đạt được mục tiêu tài chính, thịnh vượng.",
      self: "Hoàn thành một chương quan trọng trong cuộc sống.",
      health: "Sức khỏe hoàn hảo, cân bằng thể chất-tinh thần.",
      family: "Gia đình viên mãn, đạt được mục tiêu chung."
    },
    meaning_matrix_rev: {
      love: "Gần đạt mục tiêu nhưng còn thiếu điều gì đó.",
      career: "Dự án gần hoàn thành, cần thêm nỗ lực cuối.",
      finance: "Gần đạt mục tiêu tài chính.",
      self: "Cảm giác chưa trọn vẹn, cần hoàn thành điều gì.",
      health: "Gần đạt mục tiêu sức khỏe.",
      family: "Gia đình gần đạt mục tiêu chung."
    },
    keywords_up: ["ăn mừng", "tri ân", "bắt đầu mới", "chia sẻ"],
    keywords_rev: ["hoàn thành", "nỗ lực cuối", "kiên trì", "đừng bỏ cuộc"],
    summary_up: "hoàn thành và viên mãn",
    summary_rev: "gần đạt mục tiêu, cần thêm nỗ lực"
  }
};

// ============= MINOR ARCANA - WANDS (14 cards) =============
const wands: Record<string, CardData> = {
  "Ace of Wands": {
    name_vi: "Át Gậy",
    vibe: 1,
    meaning_matrix_up: {
      love: "Bắt đầu mối quan hệ mới đầy đam mê hoặc tình yêu được thổi bùng.",
      career: "Ý tưởng mới, dự án mới bắt đầu với năng lượng cao.",
      finance: "Cơ hội kiếm tiền mới, nguồn thu nhập mới.",
      self: "Cảm hứng mới, động lực mạnh mẽ.",
      health: "Năng lượng dồi dào, bắt đầu tập luyện mới.",
      family: "Khởi đầu mới trong gia đình, có thể là thành viên mới."
    },
    meaning_matrix_rev: {
      love: "Chần chừ bắt đầu mối quan hệ, thiếu đam mê.",
      career: "Ý tưởng bị chặn, dự án chậm bắt đầu.",
      finance: "Cơ hội kiếm tiền bị bỏ lỡ.",
      self: "Thiếu động lực, ý tưởng không thành hành động.",
      health: "Thiếu năng lượng để bắt đầu.",
      family: "Khởi đầu mới bị trì hoãn."
    },
    keywords_up: ["bắt đầu", "hành động", "đam mê", "sáng tạo"],
    keywords_rev: ["lập kế hoạch", "kiên nhẫn", "tìm động lực", "chuẩn bị"],
    summary_up: "khởi đầu mới đầy năng lượng",
    summary_rev: "khởi đầu bị trì hoãn, thiếu động lực"
  },
  "Two of Wands": {
    name_vi: "Hai Gậy",
    vibe: 1,
    meaning_matrix_up: {
      love: "Cân nhắc tương lai của mối quan hệ, lập kế hoạch.",
      career: "Lên kế hoạch cho bước tiến tiếp theo.",
      finance: "Đánh giá cơ hội đầu tư, mở rộng.",
      self: "Suy nghĩ về hướng đi, lập kế hoạch cuộc sống.",
      health: "Lập kế hoạch chăm sóc sức khỏe dài hạn.",
      family: "Lên kế hoạch cho tương lai gia đình."
    },
    meaning_matrix_rev: {
      love: "Sợ cam kết, không dám nghĩ xa.",
      career: "Thiếu tầm nhìn, không có kế hoạch.",
      finance: "Không dám mở rộng, bỏ lỡ cơ hội.",
      self: "Không có mục tiêu rõ ràng.",
      health: "Không có kế hoạch sức khỏe.",
      family: "Không nghĩ đến tương lai gia đình."
    },
    keywords_up: ["lên kế hoạch", "mở rộng", "quyết định", "tầm nhìn"],
    keywords_rev: ["bắt đầu nhỏ", "tập trung", "xác định mục tiêu", "cam kết"],
    summary_up: "đang lên kế hoạch và cân nhắc tương lai",
    summary_rev: "thiếu tầm nhìn và kế hoạch"
  },
  "Three of Wands": {
    name_vi: "Ba Gậy",
    vibe: 1,
    meaning_matrix_up: {
      love: "Mở rộng mối quan hệ, bước sang giai đoạn mới.",
      career: "Dự án đang phát triển, chờ kết quả tốt.",
      finance: "Đầu tư đang sinh lợi, mở rộng kinh doanh.",
      self: "Tiến bộ rõ rệt, đang đi đúng hướng.",
      health: "Nỗ lực chăm sóc sức khỏe đang có kết quả.",
      family: "Gia đình phát triển, mở rộng."
    },
    meaning_matrix_rev: {
      love: "Kết quả không như mong đợi, thất vọng.",
      career: "Dự án bị chậm tiến độ.",
      finance: "Đầu tư chậm sinh lợi.",
      self: "Tiến bộ chậm, cần kiên nhẫn.",
      health: "Kết quả sức khỏe chậm đến.",
      family: "Kế hoạch gia đình bị trì hoãn."
    },
    keywords_up: ["kiên nhẫn chờ", "tin tưởng", "tiếp tục", "mở rộng"],
    keywords_rev: ["đánh giá lại", "điều chỉnh", "kiên nhẫn", "linh hoạt"],
    summary_up: "tiến bộ tốt, chờ đợi kết quả",
    summary_rev: "tiến độ chậm, cần kiên nhẫn"
  },
  "Four of Wands": {
    name_vi: "Bốn Gậy",
    vibe: 1,
    meaning_matrix_up: {
      love: "Ăn mừng mối quan hệ, có thể là đính hôn, kết hôn.",
      career: "Đạt cột mốc quan trọng, ăn mừng thành tích.",
      finance: "Ổn định tài chính, có thể mua nhà.",
      self: "Hoàn thành giai đoạn quan trọng, ăn mừng.",
      health: "Đạt mục tiêu sức khỏe, cảm giác ổn định.",
      family: "Sum họp gia đình, lễ kỷ niệm."
    },
    meaning_matrix_rev: {
      love: "Thiếu sự ổn định trong mối quan hệ.",
      career: "Chưa đạt cột mốc mong muốn.",
      finance: "Chưa ổn định về tài chính.",
      self: "Cảm giác chưa trọn vẹn.",
      health: "Chưa đạt mục tiêu sức khỏe.",
      family: "Căng thẳng trong gia đình."
    },
    keywords_up: ["ăn mừng", "tri ân", "chia sẻ", "tận hưởng"],
    keywords_rev: ["xây dựng", "kiên nhẫn", "nỗ lực", "kết nối"],
    summary_up: "ăn mừng thành tích và sự ổn định",
    summary_rev: "chưa đạt được sự ổn định mong muốn"
  },
  "Five of Wands": {
    name_vi: "Năm Gậy",
    vibe: -1,
    meaning_matrix_up: {
      love: "Xung đột, cạnh tranh trong tình yêu.",
      career: "Cạnh tranh gay gắt, xung đột đồng nghiệp.",
      finance: "Cạnh tranh về tiền bạc, tranh chấp.",
      self: "Xung đột nội tâm, không biết chọn gì.",
      health: "Căng thẳng do xung đột.",
      family: "Tranh cãi trong gia đình."
    },
    meaning_matrix_rev: {
      love: "Xung đột được giải quyết hoặc tránh được.",
      career: "Hợp tác thay vì cạnh tranh.",
      finance: "Tìm được giải pháp hòa giải.",
      self: "Xung đột nội tâm được giải quyết.",
      health: "Căng thẳng giảm bớt.",
      family: "Gia đình hòa giải."
    },
    keywords_up: ["đối thoại", "hợp tác", "lắng nghe", "thỏa hiệp"],
    keywords_rev: ["duy trì hòa bình", "tránh xung đột", "hợp tác", "nhẫn nhịn"],
    summary_up: "đang có xung đột và cạnh tranh",
    summary_rev: "xung đột đang được giải quyết"
  },
  "Six of Wands": {
    name_vi: "Sáu Gậy",
    vibe: 1,
    meaning_matrix_up: {
      love: "Được công nhận trong tình yêu, tự hào về mối quan hệ.",
      career: "Thắng lợi, được công nhận, thăng tiến.",
      finance: "Thành công tài chính, được thưởng.",
      self: "Tự tin, được người khác ngưỡng mộ.",
      health: "Chiến thắng bệnh tật, đạt mục tiêu.",
      family: "Được gia đình tự hào."
    },
    meaning_matrix_rev: {
      love: "Thiếu sự công nhận, cảm thấy bị bỏ quên.",
      career: "Nỗ lực không được ghi nhận.",
      finance: "Không được thưởng xứng đáng.",
      self: "Thiếu tự tin, nghi ngờ bản thân.",
      health: "Chưa đạt mục tiêu.",
      family: "Cảm thấy không được gia đình đánh giá cao."
    },
    keywords_up: ["tận hưởng", "khiêm tốn", "chia sẻ", "tiếp tục"],
    keywords_rev: ["tự tin", "ghi nhận bản thân", "kiên trì", "không so sánh"],
    summary_up: "chiến thắng và được công nhận",
    summary_rev: "nỗ lực chưa được ghi nhận"
  },
  "Seven of Wands": {
    name_vi: "Bảy Gậy",
    vibe: 0,
    meaning_matrix_up: {
      love: "Bảo vệ mối quan hệ trước áp lực bên ngoài.",
      career: "Đứng vững trước thử thách, cạnh tranh.",
      finance: "Bảo vệ tài sản, đối mặt áp lực tài chính.",
      self: "Kiên định với quan điểm của mình.",
      health: "Chiến đấu với bệnh tật.",
      family: "Bảo vệ gia đình."
    },
    meaning_matrix_rev: {
      love: "Kiệt sức vì bảo vệ mối quan hệ.",
      career: "Bị áp đảo, mất vị trí.",
      finance: "Không giữ được tài chính.",
      self: "Bỏ cuộc, thiếu kiên định.",
      health: "Kiệt sức vì chống chọi.",
      family: "Không bảo vệ được gia đình."
    },
    keywords_up: ["kiên định", "đứng vững", "chiến đấu", "bảo vệ"],
    keywords_rev: ["nghỉ ngơi", "tìm đồng minh", "chọn trận đánh", "buông bỏ"],
    summary_up: "đang đứng vững trước thử thách",
    summary_rev: "kiệt sức vì chiến đấu liên tục"
  },
  "Eight of Wands": {
    name_vi: "Tám Gậy",
    vibe: 1,
    meaning_matrix_up: {
      love: "Mọi thứ diễn ra nhanh, có thể có tin nhắn quan trọng.",
      career: "Dự án tiến triển nhanh, nhiều việc đến cùng lúc.",
      finance: "Tiền vào nhanh, giao dịch chóng vánh.",
      self: "Cuộc sống bận rộn, nhiều thay đổi nhanh.",
      health: "Hồi phục nhanh.",
      family: "Tin tức nhanh từ gia đình."
    },
    meaning_matrix_rev: {
      love: "Chờ đợi, trì hoãn trong tình yêu.",
      career: "Dự án bị đình trệ.",
      finance: "Tiền chậm đến.",
      self: "Mọi thứ chậm lại.",
      health: "Hồi phục chậm.",
      family: "Chờ tin từ gia đình."
    },
    keywords_up: ["hành động nhanh", "nắm bắt", "linh hoạt", "sẵn sàng"],
    keywords_rev: ["kiên nhẫn", "chuẩn bị", "không vội", "chờ đợi"],
    summary_up: "mọi thứ diễn ra nhanh chóng",
    summary_rev: "đang bị trì hoãn"
  },
  "Nine of Wands": {
    name_vi: "Chín Gậy",
    vibe: 0,
    meaning_matrix_up: {
      love: "Kiên trì dù mệt mỏi, gần đến đích.",
      career: "Kiệt sức nhưng gần thành công.",
      finance: "Cố gắng cuối cùng về tài chính.",
      self: "Mệt nhưng không bỏ cuộc.",
      health: "Kiệt sức, cần nghỉ ngơi nhưng phải tiếp tục.",
      family: "Kiên trì vì gia đình."
    },
    meaning_matrix_rev: {
      love: "Quá mệt mỏi, muốn bỏ cuộc.",
      career: "Kiệt sức, cần nghỉ ngơi.",
      finance: "Không còn sức chiến đấu.",
      self: "Cần nghỉ ngơi gấp.",
      health: "Cơ thể đang kiệt sức.",
      family: "Quá mệt để lo cho gia đình."
    },
    keywords_up: ["kiên trì", "nghỉ ngơi khi cần", "gần đến đích", "tiếp tục"],
    keywords_rev: ["nghỉ ngơi", "xin giúp đỡ", "buông bớt", "tự chăm sóc"],
    summary_up: "kiệt sức nhưng kiên trì",
    summary_rev: "cần nghỉ ngơi ngay"
  },
  "Ten of Wands": {
    name_vi: "Mười Gậy",
    vibe: -1,
    meaning_matrix_up: {
      love: "Gánh nặng trong mối quan hệ, quá nhiều trách nhiệm.",
      career: "Quá tải công việc, gánh vác quá nhiều.",
      finance: "Áp lực tài chính nặng nề.",
      self: "Kiệt sức vì gánh quá nhiều.",
      health: "Cơ thể quá tải, cần giảm bớt.",
      family: "Gánh nặng gia đình."
    },
    meaning_matrix_rev: {
      love: "Bắt đầu giảm bớt gánh nặng.",
      career: "Ủy thác công việc, giảm tải.",
      finance: "Giảm áp lực tài chính.",
      self: "Học cách từ chối, buông bỏ.",
      health: "Bắt đầu hồi phục.",
      family: "Chia sẻ gánh nặng với gia đình."
    },
    keywords_up: ["ủy thác", "từ chối", "ưu tiên", "giảm bớt"],
    keywords_rev: ["tiếp tục giảm tải", "nghỉ ngơi", "chia sẻ", "buông bỏ"],
    summary_up: "đang gánh quá nhiều, cần giảm tải",
    summary_rev: "đang học cách buông bỏ"
  },
  "Page of Wands": {
    name_vi: "Thị Đồng Gậy",
    vibe: 1,
    meaning_matrix_up: {
      love: "Tin tức về tình yêu, bắt đầu mới.",
      career: "Cơ hội mới, tin tốt về công việc.",
      finance: "Tin tức về tiền bạc, cơ hội nhỏ.",
      self: "Khám phá đam mê mới.",
      health: "Bắt đầu thói quen mới.",
      family: "Tin tức từ gia đình."
    },
    meaning_matrix_rev: {
      love: "Tin xấu hoặc không có tin gì.",
      career: "Cơ hội bị trì hoãn.",
      finance: "Tin không tốt về tài chính.",
      self: "Thiếu động lực khám phá.",
      health: "Khó bắt đầu thói quen mới.",
      family: "Tin xấu từ gia đình."
    },
    keywords_up: ["khám phá", "thử nghiệm", "học hỏi", "hào hứng"],
    keywords_rev: ["kiên nhẫn", "chuẩn bị", "tập trung", "không nản"],
    summary_up: "tin tốt và khởi đầu mới",
    summary_rev: "tin tức bị trì hoãn"
  },
  "Knight of Wands": {
    name_vi: "Hiệp Sĩ Gậy",
    vibe: 1,
    meaning_matrix_up: {
      love: "Theo đuổi tình yêu mạnh mẽ, đam mê.",
      career: "Hành động nhanh, theo đuổi mục tiêu.",
      finance: "Kiếm tiền nhanh, mạo hiểm.",
      self: "Tràn đầy năng lượng và đam mê.",
      health: "Năng động, hoạt động thể chất cao.",
      family: "Hành động vì gia đình."
    },
    meaning_matrix_rev: {
      love: "Hấp tấp trong tình yêu, thiếu cam kết.",
      career: "Hành động thiếu suy nghĩ.",
      finance: "Mạo hiểm quá mức.",
      self: "Bồng bột, thiếu kiên nhẫn.",
      health: "Hoạt động quá mức gây chấn thương.",
      family: "Hấp tấp trong quyết định gia đình."
    },
    keywords_up: ["tiến lên", "dám làm", "năng động", "tự tin"],
    keywords_rev: ["suy nghĩ kỹ", "kiên nhẫn", "lập kế hoạch", "bình tĩnh"],
    summary_up: "hành động mạnh mẽ và đam mê",
    summary_rev: "hấp tấp và thiếu suy nghĩ"
  },
  "Queen of Wands": {
    name_vi: "Hoàng Hậu Gậy",
    vibe: 1,
    meaning_matrix_up: {
      love: "Tự tin trong tình yêu, thu hút.",
      career: "Lãnh đạo có ảnh hưởng, tự tin.",
      finance: "Quản lý tiền bạc độc lập, sáng tạo.",
      self: "Tự tin, quyến rũ, có sức ảnh hưởng.",
      health: "Sức khỏe tốt, năng lượng cao.",
      family: "Trụ cột gia đình, truyền cảm hứng."
    },
    meaning_matrix_rev: {
      love: "Độc đoán hoặc ghen tuông trong tình yêu.",
      career: "Quá kiểm soát hoặc thiếu tự tin.",
      finance: "Chi tiêu phô trương.",
      self: "Thiếu tự tin hoặc quá tự cao.",
      health: "Năng lượng không ổn định.",
      family: "Kiểm soát gia đình quá mức."
    },
    keywords_up: ["tỏa sáng", "tự tin", "lãnh đạo", "truyền cảm hứng"],
    keywords_rev: ["khiêm tốn", "lắng nghe", "linh hoạt", "cân bằng"],
    summary_up: "tự tin và có sức ảnh hưởng",
    summary_rev: "cần cân bằng giữa tự tin và khiêm tốn"
  },
  "King of Wands": {
    name_vi: "Hoàng Đế Gậy",
    vibe: 1,
    meaning_matrix_up: {
      love: "Người yêu/đối tác có tầm nhìn, lãnh đạo.",
      career: "Lãnh đạo xuất sắc, tầm nhìn xa.",
      finance: "Quản lý tài chính như doanh nhân.",
      self: "Có tầm nhìn và khả năng lãnh đạo.",
      health: "Có ý chí mạnh mẽ về sức khỏe.",
      family: "Trụ cột gia đình, người dẫn dắt."
    },
    meaning_matrix_rev: {
      love: "Độc đoán, không lắng nghe.",
      career: "Lãnh đạo kém hiệu quả.",
      finance: "Quyết định tài chính vội vàng.",
      self: "Thiếu tầm nhìn hoặc quá tự phụ.",
      health: "Bỏ bê sức khỏe vì công việc.",
      family: "Độc đoán với gia đình."
    },
    keywords_up: ["lãnh đạo", "tầm nhìn", "quyết đoán", "truyền cảm hứng"],
    keywords_rev: ["lắng nghe", "linh hoạt", "khiêm tốn", "cân nhắc"],
    summary_up: "lãnh đạo có tầm nhìn",
    summary_rev: "cần lắng nghe và linh hoạt hơn"
  }
};

// ============= MINOR ARCANA - CUPS (14 cards) =============
const cups: Record<string, CardData> = {
  "Ace of Cups": {
    name_vi: "Át Cốc",
    vibe: 1,
    meaning_matrix_up: {
      love: "Tình yêu mới bắt đầu, cảm xúc dâng trào.",
      career: "Cơ hội mới mang lại niềm vui.",
      finance: "Thu nhập từ công việc yêu thích.",
      self: "Tình yêu bản thân, mở lòng.",
      health: "Sức khỏe tinh thần tốt.",
      family: "Tình yêu gia đình nở rộ."
    },
    meaning_matrix_rev: {
      love: "Kìm nén cảm xúc, không dám yêu.",
      career: "Thiếu đam mê với công việc.",
      finance: "Không hài lòng dù có tiền.",
      self: "Không yêu thương bản thân.",
      health: "Cảm xúc bị kìm nén.",
      family: "Khó thể hiện tình cảm với gia đình."
    },
    keywords_up: ["mở lòng", "đón nhận", "yêu thương", "cảm nhận"],
    keywords_rev: ["chữa lành", "mở lòng", "tự yêu thương", "buông bỏ"],
    summary_up: "tình yêu mới và cảm xúc dồi dào",
    summary_rev: "đang kìm nén cảm xúc"
  },
  "Two of Cups": {
    name_vi: "Hai Cốc",
    vibe: 1,
    meaning_matrix_up: {
      love: "Kết nối sâu sắc, tình yêu hỗ tương.",
      career: "Hợp tác tốt đẹp.",
      finance: "Hợp tác kinh doanh có lợi.",
      self: "Cân bằng nội tâm.",
      health: "Mối quan hệ tốt hỗ trợ sức khỏe.",
      family: "Hòa thuận trong gia đình."
    },
    meaning_matrix_rev: {
      love: "Mất cân bằng trong mối quan hệ.",
      career: "Hợp tác không suôn sẻ.",
      finance: "Bất đồng về tiền với đối tác.",
      self: "Mất cân bằng nội tâm.",
      health: "Mối quan hệ ảnh hưởng sức khỏe.",
      family: "Bất hòa trong gia đình."
    },
    keywords_up: ["kết nối", "hợp tác", "chia sẻ", "đồng điệu"],
    keywords_rev: ["giao tiếp", "cân bằng", "lắng nghe", "thỏa hiệp"],
    summary_up: "kết nối sâu sắc và hòa hợp",
    summary_rev: "mất cân bằng trong mối quan hệ"
  },
  "Three of Cups": {
    name_vi: "Ba Cốc",
    vibe: 1,
    meaning_matrix_up: {
      love: "Tình bạn hỗ trợ tình yêu, vui vẻ.",
      career: "Làm việc nhóm vui vẻ.",
      finance: "Chia sẻ thành công với bạn bè.",
      self: "Niềm vui từ bạn bè.",
      health: "Sức khỏe tốt nhờ giao tiếp xã hội.",
      family: "Sum họp gia đình vui vẻ."
    },
    meaning_matrix_rev: {
      love: "Bạn bè can thiệp vào tình yêu.",
      career: "Xung đột trong nhóm.",
      finance: "Tranh chấp tiền bạc với bạn.",
      self: "Cô đơn giữa đám đông.",
      health: "Thiếu giao tiếp xã hội.",
      family: "Căng thẳng trong sum họp gia đình."
    },
    keywords_up: ["ăn mừng", "kết nối", "chia sẻ", "tận hưởng"],
    keywords_rev: ["chọn bạn", "ranh giới", "tự chăm sóc", "độc lập"],
    summary_up: "niềm vui và kết nối bạn bè",
    summary_rev: "xung đột trong nhóm bạn"
  },
  "Four of Cups": {
    name_vi: "Bốn Cốc",
    vibe: -1,
    meaning_matrix_up: {
      love: "Chán nản trong tình yêu, không thấy hứng thú.",
      career: "Mất động lực, chán công việc.",
      finance: "Không quan tâm đến cơ hội tài chính.",
      self: "Buồn chán, mất phương hướng.",
      health: "Trầm cảm nhẹ, thiếu động lực.",
      family: "Thờ ơ với gia đình."
    },
    meaning_matrix_rev: {
      love: "Nhận ra cơ hội mới trong tình yêu.",
      career: "Tìm lại động lực.",
      finance: "Nhận ra cơ hội đã bỏ qua.",
      self: "Thoát khỏi trầm cảm.",
      health: "Tìm lại năng lượng.",
      family: "Quan tâm lại đến gia đình."
    },
    keywords_up: ["nhìn quanh", "mở mắt", "đánh giá lại", "tri ân"],
    keywords_rev: ["nắm bắt", "hành động", "mở lòng", "thay đổi"],
    summary_up: "đang chán nản và bỏ qua cơ hội",
    summary_rev: "bắt đầu nhận ra cơ hội mới"
  },
  "Five of Cups": {
    name_vi: "Năm Cốc",
    vibe: -1,
    meaning_matrix_up: {
      love: "Đau buồn về mất mát trong tình yêu.",
      career: "Thất vọng về công việc.",
      finance: "Thua lỗ, mất mát tài chính.",
      self: "Đau buồn, tiếc nuối quá khứ.",
      health: "Cảm xúc ảnh hưởng sức khỏe.",
      family: "Mất mát trong gia đình."
    },
    meaning_matrix_rev: {
      love: "Bắt đầu vượt qua nỗi đau.",
      career: "Học từ thất bại.",
      finance: "Hồi phục sau thua lỗ.",
      self: "Chữa lành và tiến về phía trước.",
      health: "Sức khỏe tinh thần cải thiện.",
      family: "Vượt qua mất mát cùng gia đình."
    },
    keywords_up: ["chấp nhận", "khóc", "để tang", "nhìn về phía trước"],
    keywords_rev: ["tiến lên", "tha thứ", "chữa lành", "biết ơn"],
    summary_up: "đang đau buồn và tiếc nuối",
    summary_rev: "đang vượt qua nỗi đau"
  },
  "Six of Cups": {
    name_vi: "Sáu Cốc",
    vibe: 1,
    meaning_matrix_up: {
      love: "Tình yêu từ quá khứ, hoài niệm ngọt ngào.",
      career: "Gặp lại đồng nghiệp cũ, cơ hội từ quá khứ.",
      finance: "Nhận quà hoặc tiền từ người quen.",
      self: "Hoài niệm, kết nối với tuổi thơ.",
      health: "Nghỉ ngơi, thư giãn như trẻ con.",
      family: "Đoàn tụ gia đình, hoài niệm."
    },
    meaning_matrix_rev: {
      love: "Bám víu quá khứ, không tiến lên.",
      career: "Sống trong quá khứ thay vì tiến lên.",
      finance: "Dựa dẫm vào người khác.",
      self: "Không trưởng thành.",
      health: "Sống trong hoài niệm không lành mạnh.",
      family: "Mâu thuẫn về quá khứ gia đình."
    },
    keywords_up: ["hoài niệm", "tri ân", "kết nối", "chia sẻ"],
    keywords_rev: ["tiến lên", "trưởng thành", "độc lập", "buông quá khứ"],
    summary_up: "hoài niệm ngọt ngào về quá khứ",
    summary_rev: "đang bám víu quá khứ"
  },
  "Seven of Cups": {
    name_vi: "Bảy Cốc",
    vibe: 0,
    meaning_matrix_up: {
      love: "Nhiều lựa chọn, khó quyết định.",
      career: "Nhiều cơ hội nhưng cần chọn.",
      finance: "Nhiều ý tưởng kiếm tiền nhưng chưa thực tế.",
      self: "Ảo tưởng, mơ mộng nhiều.",
      health: "Cần tập trung vào một phương pháp.",
      family: "Nhiều kế hoạch gia đình chưa thực hiện."
    },
    meaning_matrix_rev: {
      love: "Đã chọn được đúng người.",
      career: "Tập trung vào một cơ hội.",
      finance: "Quyết định đầu tư cụ thể.",
      self: "Thực tế hơn, bớt mơ mộng.",
      health: "Cam kết với một kế hoạch.",
      family: "Quyết định rõ ràng cho gia đình."
    },
    keywords_up: ["tập trung", "chọn lọc", "thực tế", "quyết định"],
    keywords_rev: ["thực hiện", "cam kết", "hành động", "tập trung"],
    summary_up: "nhiều lựa chọn, cần tập trung",
    summary_rev: "đã có quyết định rõ ràng"
  },
  "Eight of Cups": {
    name_vi: "Tám Cốc",
    vibe: 0,
    meaning_matrix_up: {
      love: "Rời bỏ mối quan hệ không còn ý nghĩa.",
      career: "Từ bỏ công việc để tìm điều tốt hơn.",
      finance: "Từ bỏ nguồn thu nhập không đáng.",
      self: "Rời bỏ để tìm kiếm ý nghĩa.",
      health: "Thay đổi lối sống hoàn toàn.",
      family: "Rời xa gia đình để phát triển."
    },
    meaning_matrix_rev: {
      love: "Sợ rời bỏ, bám víu.",
      career: "Ở lại công việc không hạnh phúc.",
      finance: "Không dám thay đổi nguồn thu.",
      self: "Sợ thay đổi, bám víu hiện tại.",
      health: "Không dám thay đổi thói quen.",
      family: "Không dám rời xa gia đình."
    },
    keywords_up: ["dũng cảm rời đi", "tìm kiếm", "buông bỏ", "khám phá"],
    keywords_rev: ["đối mặt", "quyết định", "dũng cảm", "thay đổi"],
    summary_up: "rời bỏ để tìm điều ý nghĩa hơn",
    summary_rev: "đang sợ thay đổi và bám víu"
  },
  "Nine of Cups": {
    name_vi: "Chín Cốc",
    vibe: 1,
    meaning_matrix_up: {
      love: "Hài lòng trong tình yêu, ước nguyện thành.",
      career: "Thỏa mãn với thành tựu công việc.",
      finance: "Giàu có, đầy đủ.",
      self: "Hạnh phúc, mãn nguyện.",
      health: "Sức khỏe tốt, hài lòng.",
      family: "Gia đình hạnh phúc."
    },
    meaning_matrix_rev: {
      love: "Không hài lòng dù có mọi thứ.",
      career: "Thành công nhưng không vui.",
      finance: "Có tiền nhưng không hạnh phúc.",
      self: "Tham lam, không bao giờ đủ.",
      health: "Ăn uống quá độ.",
      family: "Gia đình đầy đủ nhưng thiếu hạnh phúc."
    },
    keywords_up: ["tận hưởng", "tri ân", "chia sẻ", "hài lòng"],
    keywords_rev: ["xem lại giá trị", "tri ân", "đủ", "buông bỏ tham lam"],
    summary_up: "hạnh phúc và mãn nguyện",
    summary_rev: "có mọi thứ nhưng không hài lòng"
  },
  "Ten of Cups": {
    name_vi: "Mười Cốc",
    vibe: 1,
    meaning_matrix_up: {
      love: "Tình yêu viên mãn, hạnh phúc gia đình.",
      career: "Công việc mang lại hạnh phúc.",
      finance: "Đủ đầy, an tâm.",
      self: "Hạnh phúc trọn vẹn.",
      health: "Sức khỏe tốt, hài hòa.",
      family: "Gia đình hạnh phúc hoàn hảo."
    },
    meaning_matrix_rev: {
      love: "Mâu thuẫn trong gia đình.",
      career: "Công việc ảnh hưởng hạnh phúc.",
      finance: "Tiền bạc gây mâu thuẫn.",
      self: "Thiếu hạnh phúc nội tâm.",
      health: "Căng thẳng gia đình ảnh hưởng sức khỏe.",
      family: "Gia đình không hài hòa."
    },
    keywords_up: ["tri ân", "chia sẻ", "nuôi dưỡng", "tận hưởng"],
    keywords_rev: ["giao tiếp", "hòa giải", "ưu tiên", "chữa lành"],
    summary_up: "hạnh phúc gia đình viên mãn",
    summary_rev: "cần hòa giải trong gia đình"
  },
  "Page of Cups": {
    name_vi: "Thị Đồng Cốc",
    vibe: 1,
    meaning_matrix_up: {
      love: "Tin tức về tình yêu, lời tỏ tình.",
      career: "Cơ hội sáng tạo mới.",
      finance: "Tin tức tốt về tiền.",
      self: "Cảm hứng sáng tạo.",
      health: "Cảm xúc tích cực.",
      family: "Tin vui từ con cái hoặc người trẻ."
    },
    meaning_matrix_rev: {
      love: "Tin buồn về tình yêu.",
      career: "Ý tưởng sáng tạo bị chặn.",
      finance: "Tin không tốt về tiền.",
      self: "Cảm xúc trẻ con.",
      health: "Cảm xúc không ổn định.",
      family: "Tin buồn từ con cái."
    },
    keywords_up: ["mở lòng", "sáng tạo", "lắng nghe trực giác", "vui vẻ"],
    keywords_rev: ["trưởng thành", "cân bằng", "thực tế", "kiểm soát"],
    summary_up: "tin tốt về cảm xúc và sáng tạo",
    summary_rev: "cảm xúc chưa trưởng thành"
  },
  "Knight of Cups": {
    name_vi: "Hiệp Sĩ Cốc",
    vibe: 1,
    meaning_matrix_up: {
      love: "Người theo đuổi lãng mạn, lời cầu hôn.",
      career: "Theo đuổi đam mê.",
      finance: "Đầu tư theo đam mê.",
      self: "Lãng mạn, sáng tạo.",
      health: "Cân bằng cảm xúc.",
      family: "Người mang tin vui đến gia đình."
    },
    meaning_matrix_rev: {
      love: "Mơ mộng không thực tế, hứa suông.",
      career: "Theo đuổi không thực tế.",
      finance: "Đầu tư theo cảm xúc.",
      self: "Quá mơ mộng.",
      health: "Cảm xúc thất thường.",
      family: "Hứa hẹn không thực hiện."
    },
    keywords_up: ["theo đuổi", "lãng mạn", "sáng tạo", "lắng nghe trái tim"],
    keywords_rev: ["thực tế", "cam kết", "hành động", "trách nhiệm"],
    summary_up: "theo đuổi đam mê và lãng mạn",
    summary_rev: "mơ mộng không thực tế"
  },
  "Queen of Cups": {
    name_vi: "Hoàng Hậu Cốc",
    vibe: 1,
    meaning_matrix_up: {
      love: "Yêu thương vô điều kiện, thấu hiểu.",
      career: "Sử dụng trực giác trong công việc.",
      finance: "Quản lý tiền bằng trực giác.",
      self: "Trực giác mạnh, thấu cảm.",
      health: "Chăm sóc sức khỏe tinh thần.",
      family: "Người mẹ, người chăm sóc."
    },
    meaning_matrix_rev: {
      love: "Quá phụ thuộc cảm xúc.",
      career: "Cảm xúc ảnh hưởng công việc.",
      finance: "Chi tiêu theo cảm xúc.",
      self: "Dễ bị tổn thương, quá nhạy cảm.",
      health: "Cảm xúc ảnh hưởng sức khỏe.",
      family: "Quá lo lắng cho gia đình."
    },
    keywords_up: ["lắng nghe", "thấu cảm", "chăm sóc", "tin trực giác"],
    keywords_rev: ["ranh giới", "tự chăm sóc", "cân bằng", "mạnh mẽ"],
    summary_up: "thấu cảm và yêu thương",
    summary_rev: "quá nhạy cảm, cần ranh giới"
  },
  "King of Cups": {
    name_vi: "Hoàng Đế Cốc",
    vibe: 1,
    meaning_matrix_up: {
      love: "Người yêu/đối tác trưởng thành về cảm xúc.",
      career: "Lãnh đạo bằng trái tim và lý trí.",
      finance: "Quản lý tài chính bình tĩnh.",
      self: "Kiểm soát cảm xúc, trưởng thành.",
      health: "Sức khỏe tinh thần ổn định.",
      family: "Người cha/chồng tốt."
    },
    meaning_matrix_rev: {
      love: "Kìm nén cảm xúc hoặc thao túng.",
      career: "Cảm xúc thất thường ảnh hưởng lãnh đạo.",
      finance: "Quyết định tài chính bị cảm xúc chi phối.",
      self: "Kìm nén hoặc mất kiểm soát cảm xúc.",
      health: "Căng thẳng tinh thần.",
      family: "Xa cách cảm xúc với gia đình."
    },
    keywords_up: ["cân bằng", "lãnh đạo", "thấu hiểu", "bình tĩnh"],
    keywords_rev: ["thể hiện cảm xúc", "kết nối", "buông bỏ", "chữa lành"],
    summary_up: "trưởng thành về cảm xúc",
    summary_rev: "cần cân bằng cảm xúc"
  }
};

// ============= MINOR ARCANA - SWORDS (14 cards) =============
const swords: Record<string, CardData> = {
  "Ace of Swords": {
    name_vi: "Át Kiếm",
    vibe: 1,
    meaning_matrix_up: {
      love: "Sự thật trong tình yêu, giao tiếp rõ ràng.",
      career: "Ý tưởng mới, quyết định đúng đắn.",
      finance: "Sáng suốt trong tài chính.",
      self: "Sáng suốt, tư duy rõ ràng.",
      health: "Chẩn đoán rõ ràng, quyết định sức khỏe.",
      family: "Giao tiếp thẳng thắn với gia đình."
    },
    meaning_matrix_rev: {
      love: "Hiểu lầm, giao tiếp kém.",
      career: "Ý tưởng bị chặn, không rõ ràng.",
      finance: "Quyết định tài chính mơ hồ.",
      self: "Tư duy rối loạn.",
      health: "Chẩn đoán chưa rõ.",
      family: "Thiếu giao tiếp với gia đình."
    },
    keywords_up: ["nói thẳng", "quyết định", "sáng suốt", "hành động"],
    keywords_rev: ["làm rõ", "giao tiếp", "suy nghĩ kỹ", "chờ thông tin"],
    summary_up: "sáng suốt và quyết định đúng đắn",
    summary_rev: "tư duy mơ hồ, cần làm rõ"
  },
  "Two of Swords": {
    name_vi: "Hai Kiếm",
    vibe: 0,
    meaning_matrix_up: {
      love: "Bế tắc, cần quyết định trong tình yêu.",
      career: "Đang cân nhắc, chưa quyết định.",
      finance: "Chưa biết chọn phương án tài chính nào.",
      self: "Xung đột nội tâm, cần thời gian.",
      health: "Căng thẳng do không quyết định được.",
      family: "Bế tắc trong vấn đề gia đình."
    },
    meaning_matrix_rev: {
      love: "Đã có quyết định hoặc bị ép chọn.",
      career: "Bị ép quyết định.",
      finance: "Phải chọn dù không muốn.",
      self: "Không thể trì hoãn thêm.",
      health: "Cần quyết định về sức khỏe.",
      family: "Bị ép đứng về một bên."
    },
    keywords_up: ["thu thập thông tin", "cân nhắc", "kiên nhẫn", "trực giác"],
    keywords_rev: ["quyết định", "chấp nhận", "đối mặt", "hành động"],
    summary_up: "đang cân nhắc và chưa quyết định",
    summary_rev: "bị ép phải đưa ra quyết định"
  },
  "Three of Swords": {
    name_vi: "Ba Kiếm",
    vibe: -1,
    meaning_matrix_up: {
      love: "Đau khổ, tan vỡ, phản bội.",
      career: "Thất vọng về công việc.",
      finance: "Mất mát tài chính đau đớn.",
      self: "Đau lòng, tổn thương.",
      health: "Đau tim, căng thẳng cảm xúc.",
      family: "Đau khổ trong gia đình."
    },
    meaning_matrix_rev: {
      love: "Đang hồi phục sau đau khổ.",
      career: "Vượt qua thất vọng.",
      finance: "Hồi phục sau mất mát.",
      self: "Chữa lành vết thương.",
      health: "Hồi phục sức khỏe tinh thần.",
      family: "Hàn gắn sau đau khổ."
    },
    keywords_up: ["để tang", "khóc", "chấp nhận", "tìm hỗ trợ"],
    keywords_rev: ["tiến lên", "tha thứ", "chữa lành", "học từ đau"],
    summary_up: "đau khổ và tổn thương",
    summary_rev: "đang chữa lành và hồi phục"
  },
  "Four of Swords": {
    name_vi: "Bốn Kiếm",
    vibe: 0,
    meaning_matrix_up: {
      love: "Cần nghỉ ngơi khỏi mối quan hệ.",
      career: "Nghỉ ngơi, tạm dừng công việc.",
      finance: "Tạm dừng chi tiêu, tích lũy.",
      self: "Nghỉ ngơi, thiền định.",
      health: "Nghỉ dưỡng, hồi phục.",
      family: "Thời gian yên tĩnh với gia đình."
    },
    meaning_matrix_rev: {
      love: "Trở lại sau thời gian nghỉ.",
      career: "Quay lại công việc.",
      finance: "Bắt đầu chi tiêu lại.",
      self: "Kết thúc giai đoạn nghỉ ngơi.",
      health: "Đã nghỉ đủ, sẵn sàng hoạt động.",
      family: "Trở lại cuộc sống gia đình bận rộn."
    },
    keywords_up: ["nghỉ ngơi", "thiền định", "hồi phục", "tĩnh lặng"],
    keywords_rev: ["quay lại", "năng lượng mới", "hành động", "bắt đầu"],
    summary_up: "cần nghỉ ngơi và hồi phục",
    summary_rev: "đã sẵn sàng quay lại"
  },
  "Five of Swords": {
    name_vi: "Năm Kiếm",
    vibe: -1,
    meaning_matrix_up: {
      love: "Xung đột, thắng mà không vui.",
      career: "Cạnh tranh không lành mạnh.",
      finance: "Kiếm tiền bằng cách không đẹp.",
      self: "Thắng nhưng mất mát.",
      health: "Căng thẳng do xung đột.",
      family: "Tranh cãi trong gia đình."
    },
    meaning_matrix_rev: {
      love: "Hòa giải sau xung đột.",
      career: "Nhận ra sai lầm, hòa giải.",
      finance: "Thay đổi cách kiếm tiền.",
      self: "Học từ xung đột.",
      health: "Giảm căng thẳng.",
      family: "Hòa giải gia đình."
    },
    keywords_up: ["xem lại", "hòa giải", "nhường nhịn", "buông bỏ ego"],
    keywords_rev: ["học từ sai lầm", "hòa giải", "tha thứ", "tiến lên"],
    summary_up: "xung đột và thắng không trọn vẹn",
    summary_rev: "học từ xung đột và hòa giải"
  },
  "Six of Swords": {
    name_vi: "Sáu Kiếm",
    vibe: 0,
    meaning_matrix_up: {
      love: "Rời bỏ mối quan hệ khó khăn.",
      career: "Chuyển việc, thay đổi môi trường.",
      finance: "Chuyển đổi tài chính.",
      self: "Chuyển đổi, tiến về tương lai.",
      health: "Hồi phục, chuyển sang giai đoạn tốt hơn.",
      family: "Di chuyển gia đình, thay đổi."
    },
    meaning_matrix_rev: {
      love: "Không dám rời bỏ mối quan hệ khó.",
      career: "Sợ thay đổi công việc.",
      finance: "Không dám chuyển đổi tài chính.",
      self: "Bám víu quá khứ.",
      health: "Hồi phục chậm.",
      family: "Gia đình không muốn thay đổi."
    },
    keywords_up: ["tiến lên", "buông bỏ", "di chuyển", "chấp nhận"],
    keywords_rev: ["đối mặt", "dũng cảm", "thay đổi", "quyết định"],
    summary_up: "chuyển đổi sang giai đoạn tốt hơn",
    summary_rev: "khó khăn trong việc rời bỏ"
  },
  "Seven of Swords": {
    name_vi: "Bảy Kiếm",
    vibe: -1,
    meaning_matrix_up: {
      love: "Lừa dối, không trung thực trong tình yêu.",
      career: "Ai đó không trung thực, cẩn thận.",
      finance: "Cẩn thận với lừa đảo.",
      self: "Đang tự lừa dối bản thân.",
      health: "Không trung thực về sức khỏe.",
      family: "Ai đó trong gia đình không nói thật."
    },
    meaning_matrix_rev: {
      love: "Sự thật được phơi bày.",
      career: "Lừa dối bị phát hiện.",
      finance: "Lừa đảo bị bại lộ.",
      self: "Đối mặt với sự thật.",
      health: "Nhận ra vấn đề sức khỏe thực sự.",
      family: "Bí mật gia đình được tiết lộ."
    },
    keywords_up: ["cẩn thận", "kiểm tra", "trung thực", "đề phòng"],
    keywords_rev: ["đối mặt", "thành thật", "sửa chữa", "minh bạch"],
    summary_up: "có sự không trung thực xung quanh",
    summary_rev: "sự thật đang được phơi bày"
  },
  "Eight of Swords": {
    name_vi: "Tám Kiếm",
    vibe: -1,
    meaning_matrix_up: {
      love: "Cảm giác bị mắc kẹt trong mối quan hệ.",
      career: "Bị giới hạn, không có lối thoát.",
      finance: "Bế tắc tài chính.",
      self: "Tự giới hạn bản thân, bị mắc kẹt.",
      health: "Căng thẳng do cảm giác bị mắc kẹt.",
      family: "Bị trói buộc bởi gia đình."
    },
    meaning_matrix_rev: {
      love: "Nhận ra có lối thoát.",
      career: "Tìm được cách thoát khỏi giới hạn.",
      finance: "Tìm được giải pháp tài chính.",
      self: "Nhận ra xiềng xích là tự tạo.",
      health: "Thoát khỏi căng thẳng.",
      family: "Tìm được tự do trong gia đình."
    },
    keywords_up: ["tìm lối thoát", "nhờ giúp đỡ", "thay đổi góc nhìn", "hành động nhỏ"],
    keywords_rev: ["hành động", "tự do", "dũng cảm", "quyết định"],
    summary_up: "cảm giác bị mắc kẹt không lối thoát",
    summary_rev: "đang tìm được lối thoát"
  },
  "Nine of Swords": {
    name_vi: "Chín Kiếm",
    vibe: -1,
    meaning_matrix_up: {
      love: "Lo lắng về mối quan hệ, mất ngủ.",
      career: "Stress công việc, ác mộng.",
      finance: "Lo lắng về tiền bạc.",
      self: "Lo âu, ác mộng, suy nghĩ tiêu cực.",
      health: "Mất ngủ, lo âu ảnh hưởng sức khỏe.",
      family: "Lo lắng về gia đình."
    },
    meaning_matrix_rev: {
      love: "Bắt đầu bớt lo lắng.",
      career: "Stress giảm.",
      finance: "Bớt lo về tiền.",
      self: "Thoát khỏi suy nghĩ tiêu cực.",
      health: "Ngủ tốt hơn.",
      family: "Bớt lo về gia đình."
    },
    keywords_up: ["chia sẻ", "tìm hỗ trợ", "nghỉ ngơi", "thiền định"],
    keywords_rev: ["tiếp tục chữa lành", "kiên trì", "tin tưởng", "lạc quan"],
    summary_up: "lo âu và suy nghĩ tiêu cực",
    summary_rev: "đang thoát khỏi lo âu"
  },
  "Ten of Swords": {
    name_vi: "Mười Kiếm",
    vibe: -1,
    meaning_matrix_up: {
      love: "Kết thúc đau đớn, chạm đáy.",
      career: "Thất bại nặng nề, bị sa thải.",
      finance: "Phá sản, mất hết.",
      self: "Chạm đáy, không thể tệ hơn.",
      health: "Tình trạng sức khỏe tệ nhất.",
      family: "Khủng hoảng gia đình."
    },
    meaning_matrix_rev: {
      love: "Bắt đầu hồi phục sau tan vỡ.",
      career: "Bắt đầu lại từ đầu.",
      finance: "Hồi phục sau phá sản.",
      self: "Đang đứng dậy từ đáy.",
      health: "Bắt đầu hồi phục.",
      family: "Gia đình bắt đầu hồi phục."
    },
    keywords_up: ["chấp nhận", "để tang", "tin vào bình minh", "buông bỏ"],
    keywords_rev: ["xây dựng lại", "kiên cường", "học hỏi", "tiến lên"],
    summary_up: "kết thúc đau đớn, chạm đáy",
    summary_rev: "đang đứng dậy và hồi phục"
  },
  "Page of Swords": {
    name_vi: "Thị Đồng Kiếm",
    vibe: 0,
    meaning_matrix_up: {
      love: "Tin tức về mối quan hệ, tò mò.",
      career: "Ý tưởng mới, học hỏi.",
      finance: "Tin tức về tài chính.",
      self: "Tò mò, ham học hỏi.",
      health: "Tìm hiểu về sức khỏe.",
      family: "Tin tức từ gia đình."
    },
    meaning_matrix_rev: {
      love: "Tin đồn, nói xấu.",
      career: "Ý tưởng không thực tế.",
      finance: "Tin sai về tài chính.",
      self: "Tò mò quá mức, xoi mói.",
      health: "Thông tin sức khỏe sai.",
      family: "Tin đồn trong gia đình."
    },
    keywords_up: ["tìm hiểu", "học hỏi", "đặt câu hỏi", "suy nghĩ"],
    keywords_rev: ["kiểm tra nguồn", "im lặng", "cẩn thận lời nói", "suy nghĩ trước khi nói"],
    summary_up: "tin tức mới và tò mò",
    summary_rev: "cẩn thận với tin đồn"
  },
  "Knight of Swords": {
    name_vi: "Hiệp Sĩ Kiếm",
    vibe: 0,
    meaning_matrix_up: {
      love: "Theo đuổi mạnh mẽ, nói thẳng.",
      career: "Hành động nhanh, quyết đoán.",
      finance: "Quyết định tài chính nhanh.",
      self: "Tham vọng, hành động mạnh.",
      health: "Hành động quyết liệt về sức khỏe.",
      family: "Bảo vệ gia đình mạnh mẽ."
    },
    meaning_matrix_rev: {
      love: "Quá vội vàng, gây tổn thương.",
      career: "Hấp tấp, gây sai lầm.",
      finance: "Quyết định tài chính vội.",
      self: "Hung hăng, thiếu kiên nhẫn.",
      health: "Hành động thiếu suy nghĩ.",
      family: "Gây xung đột trong gia đình."
    },
    keywords_up: ["hành động", "quyết đoán", "tập trung", "tiến lên"],
    keywords_rev: ["bình tĩnh", "suy nghĩ", "kiên nhẫn", "lắng nghe"],
    summary_up: "hành động nhanh và quyết đoán",
    summary_rev: "quá vội vàng, cần bình tĩnh"
  },
  "Queen of Swords": {
    name_vi: "Hoàng Hậu Kiếm",
    vibe: 1,
    meaning_matrix_up: {
      love: "Độc lập, thông minh trong tình yêu.",
      career: "Lãnh đạo bằng trí tuệ.",
      finance: "Quản lý tài chính thông minh.",
      self: "Độc lập, sáng suốt.",
      health: "Quyết định sức khỏe sáng suốt.",
      family: "Người phụ nữ thông minh trong gia đình."
    },
    meaning_matrix_rev: {
      love: "Quá lạnh lùng, thiếu cảm xúc.",
      career: "Quá khắc nghiệt.",
      finance: "Quá tính toán.",
      self: "Cay đắng, cô đơn.",
      health: "Quá lý trí, bỏ qua cảm xúc.",
      family: "Lạnh lùng với gia đình."
    },
    keywords_up: ["sáng suốt", "độc lập", "trung thực", "quyết đoán"],
    keywords_rev: ["mở lòng", "thấu cảm", "mềm mỏng", "kết nối"],
    summary_up: "sáng suốt và độc lập",
    summary_rev: "quá lạnh lùng, cần mở lòng"
  },
  "King of Swords": {
    name_vi: "Hoàng Đế Kiếm",
    vibe: 1,
    meaning_matrix_up: {
      love: "Người yêu/đối tác lý trí, công bằng.",
      career: "Lãnh đạo bằng logic và công bằng.",
      finance: "Quản lý tài chính có hệ thống.",
      self: "Tư duy sáng suốt, lãnh đạo.",
      health: "Quyết định sức khỏe dựa trên logic.",
      family: "Người đàn ông lý trí trong gia đình."
    },
    meaning_matrix_rev: {
      love: "Quá lý trí, thiếu cảm xúc.",
      career: "Lạm dụng quyền lực, độc đoán.",
      finance: "Thao túng tài chính.",
      self: "Kiêu ngạo, lạnh lùng.",
      health: "Bỏ qua sức khỏe tinh thần.",
      family: "Độc đoán với gia đình."
    },
    keywords_up: ["sáng suốt", "công bằng", "lãnh đạo", "quyết đoán"],
    keywords_rev: ["thấu cảm", "lắng nghe", "mềm mỏng", "khiêm tốn"],
    summary_up: "lãnh đạo sáng suốt và công bằng",
    summary_rev: "quá lý trí, cần thấu cảm hơn"
  }
};

// ============= MINOR ARCANA - PENTACLES (14 cards) =============
const pentacles: Record<string, CardData> = {
  "Ace of Pentacles": {
    name_vi: "Át Xu",
    vibe: 1,
    meaning_matrix_up: {
      love: "Khởi đầu mới ổn định trong tình yêu.",
      career: "Cơ hội việc làm mới, khởi nghiệp.",
      finance: "Cơ hội kiếm tiền mới, đầu tư.",
      self: "Khởi đầu mới về vật chất.",
      health: "Bắt đầu chế độ sức khỏe mới.",
      family: "Khởi đầu ổn định cho gia đình."
    },
    meaning_matrix_rev: {
      love: "Khởi đầu bị trì hoãn.",
      career: "Cơ hội bị bỏ lỡ.",
      finance: "Mất cơ hội tài chính.",
      self: "Chậm khởi đầu.",
      health: "Khó bắt đầu thói quen mới.",
      family: "Kế hoạch gia đình bị hoãn."
    },
    keywords_up: ["nắm bắt", "đầu tư", "bắt đầu", "cam kết"],
    keywords_rev: ["chuẩn bị", "kiên nhẫn", "xem lại kế hoạch", "chờ thời"],
    summary_up: "cơ hội mới về vật chất",
    summary_rev: "cơ hội bị trì hoãn"
  },
  "Two of Pentacles": {
    name_vi: "Hai Xu",
    vibe: 0,
    meaning_matrix_up: {
      love: "Cân bằng giữa tình yêu và cuộc sống.",
      career: "Nhiều việc cùng lúc, cần cân bằng.",
      finance: "Quản lý nhiều nguồn thu chi.",
      self: "Linh hoạt, đa nhiệm.",
      health: "Cân bằng các khía cạnh sức khỏe.",
      family: "Cân bằng công việc và gia đình."
    },
    meaning_matrix_rev: {
      love: "Mất cân bằng, không có thời gian cho tình yêu.",
      career: "Quá tải, không cân bằng được.",
      finance: "Tài chính lộn xộn.",
      self: "Mất cân bằng cuộc sống.",
      health: "Căng thẳng do mất cân bằng.",
      family: "Bỏ bê gia đình."
    },
    keywords_up: ["ưu tiên", "linh hoạt", "tổ chức", "cân bằng"],
    keywords_rev: ["giảm bớt", "tập trung", "nói không", "nghỉ ngơi"],
    summary_up: "đang cân bằng nhiều việc",
    summary_rev: "mất cân bằng, quá tải"
  },
  "Three of Pentacles": {
    name_vi: "Ba Xu",
    vibe: 1,
    meaning_matrix_up: {
      love: "Xây dựng mối quan hệ cùng nhau.",
      career: "Làm việc nhóm hiệu quả, được công nhận.",
      finance: "Hợp tác kinh doanh tốt.",
      self: "Phát triển kỹ năng.",
      health: "Hợp tác với chuyên gia sức khỏe.",
      family: "Gia đình cùng xây dựng."
    },
    meaning_matrix_rev: {
      love: "Thiếu hợp tác trong mối quan hệ.",
      career: "Làm việc nhóm kém.",
      finance: "Hợp tác không suôn sẻ.",
      self: "Không phát triển được kỹ năng.",
      health: "Không tuân theo lời khuyên chuyên gia.",
      family: "Gia đình không đồng lòng."
    },
    keywords_up: ["hợp tác", "học hỏi", "xây dựng", "kiên nhẫn"],
    keywords_rev: ["giao tiếp", "lắng nghe", "hợp tác", "khiêm tốn"],
    summary_up: "hợp tác xây dựng thành công",
    summary_rev: "thiếu hợp tác và giao tiếp"
  },
  "Four of Pentacles": {
    name_vi: "Bốn Xu",
    vibe: 0,
    meaning_matrix_up: {
      love: "Bảo vệ mối quan hệ, có thể quá sở hữu.",
      career: "Giữ vị trí, an toàn.",
      finance: "Tiết kiệm, giữ tiền chặt.",
      self: "Kiểm soát, an toàn.",
      health: "Ổn định, bảo thủ.",
      family: "Bảo vệ gia đình, có thể quá kiểm soát."
    },
    meaning_matrix_rev: {
      love: "Buông bỏ, chia sẻ hơn.",
      career: "Chấp nhận rủi ro.",
      finance: "Chi tiêu, đầu tư.",
      self: "Buông bỏ kiểm soát.",
      health: "Thử phương pháp mới.",
      family: "Bớt kiểm soát gia đình."
    },
    keywords_up: ["cân nhắc", "cân bằng", "chia sẻ", "linh hoạt"],
    keywords_rev: ["tiếp tục buông bỏ", "mở lòng", "tin tưởng", "mạo hiểm"],
    summary_up: "giữ chặt tài sản và an toàn",
    summary_rev: "học cách buông bỏ và chia sẻ"
  },
  "Five of Pentacles": {
    name_vi: "Năm Xu",
    vibe: -1,
    meaning_matrix_up: {
      love: "Cô đơn, thiếu thốn trong tình yêu.",
      career: "Mất việc, khó khăn công việc.",
      finance: "Khó khăn tài chính, nghèo khó.",
      self: "Cô đơn, thiếu thốn.",
      health: "Sức khỏe kém, thiếu chăm sóc.",
      family: "Gia đình gặp khó khăn."
    },
    meaning_matrix_rev: {
      love: "Tìm được hỗ trợ, phục hồi.",
      career: "Tìm được việc mới.",
      finance: "Bắt đầu hồi phục tài chính.",
      self: "Tìm được sự hỗ trợ.",
      health: "Được chăm sóc, hồi phục.",
      family: "Gia đình vượt qua khó khăn."
    },
    keywords_up: ["tìm hỗ trợ", "không cô đơn", "kiên trì", "hy vọng"],
    keywords_rev: ["đón nhận giúp đỡ", "tri ân", "tiếp tục phục hồi", "lạc quan"],
    summary_up: "khó khăn và thiếu thốn",
    summary_rev: "đang tìm được hỗ trợ"
  },
  "Six of Pentacles": {
    name_vi: "Sáu Xu",
    vibe: 1,
    meaning_matrix_up: {
      love: "Cho và nhận trong tình yêu.",
      career: "Được hỗ trợ hoặc hỗ trợ người khác.",
      finance: "Cho vay hoặc nhận được giúp đỡ.",
      self: "Hào phóng, cân bằng cho-nhận.",
      health: "Nhận được sự chăm sóc.",
      family: "Hỗ trợ lẫn nhau trong gia đình."
    },
    meaning_matrix_rev: {
      love: "Cho-nhận mất cân bằng.",
      career: "Bị lợi dụng hoặc lợi dụng người khác.",
      finance: "Cho vay không được trả hoặc nợ nần.",
      self: "Cho quá nhiều hoặc quá ít.",
      health: "Không nhận được sự chăm sóc cần thiết.",
      family: "Bất bình đẳng trong gia đình."
    },
    keywords_up: ["chia sẻ", "tri ân", "cân bằng", "hào phóng"],
    keywords_rev: ["ranh giới", "cân bằng", "công bằng", "tự bảo vệ"],
    summary_up: "cho và nhận cân bằng",
    summary_rev: "mất cân bằng trong cho-nhận"
  },
  "Seven of Pentacles": {
    name_vi: "Bảy Xu",
    vibe: 0,
    meaning_matrix_up: {
      love: "Đánh giá mối quan hệ, xem có đáng không.",
      career: "Đánh giá kết quả công việc.",
      finance: "Xem xét đầu tư, chờ kết quả.",
      self: "Đánh giá lại cuộc sống.",
      health: "Xem xét kết quả của nỗ lực sức khỏe.",
      family: "Đánh giá công sức dành cho gia đình."
    },
    meaning_matrix_rev: {
      love: "Nỗ lực không được đáp lại.",
      career: "Kết quả không như mong đợi.",
      finance: "Đầu tư không sinh lợi.",
      self: "Thiếu kiên nhẫn.",
      health: "Nỗ lực chưa thấy kết quả.",
      family: "Công sức cho gia đình không được đáp lại."
    },
    keywords_up: ["kiên nhẫn", "đánh giá", "tiếp tục", "chờ đợi"],
    keywords_rev: ["thay đổi chiến lược", "xem lại", "linh hoạt", "chấp nhận"],
    summary_up: "đánh giá và chờ đợi kết quả",
    summary_rev: "nỗ lực chưa được đền đáp"
  },
  "Eight of Pentacles": {
    name_vi: "Tám Xu",
    vibe: 1,
    meaning_matrix_up: {
      love: "Nỗ lực xây dựng mối quan hệ.",
      career: "Chăm chỉ, rèn luyện kỹ năng.",
      finance: "Làm việc chăm chỉ kiếm tiền.",
      self: "Rèn luyện, phát triển bản thân.",
      health: "Kiên trì tập luyện.",
      family: "Nỗ lực cho gia đình."
    },
    meaning_matrix_rev: {
      love: "Làm việc quá nhiều, bỏ bê tình yêu.",
      career: "Làm việc không hiệu quả.",
      finance: "Làm việc nhiều mà không kiếm được.",
      self: "Cầu toàn thái quá.",
      health: "Tập luyện không đúng cách.",
      family: "Bỏ bê gia đình vì công việc."
    },
    keywords_up: ["kiên trì", "rèn luyện", "tập trung", "cam kết"],
    keywords_rev: ["cân bằng", "nghỉ ngơi", "đánh giá", "thay đổi cách làm"],
    summary_up: "chăm chỉ và rèn luyện",
    summary_rev: "làm việc không hiệu quả"
  },
  "Nine of Pentacles": {
    name_vi: "Chín Xu",
    vibe: 1,
    meaning_matrix_up: {
      love: "Độc lập, tự tin trong tình yêu.",
      career: "Thành công nhờ nỗ lực, độc lập.",
      finance: "Giàu có, sung túc nhờ nỗ lực.",
      self: "Tự lập, thành công.",
      health: "Sức khỏe tốt nhờ tự chăm sóc.",
      family: "Cung cấp tốt cho gia đình."
    },
    meaning_matrix_rev: {
      love: "Quá độc lập, khó kết nối.",
      career: "Thành công nhưng cô đơn.",
      finance: "Có tiền nhưng không hạnh phúc.",
      self: "Cô đơn dù thành công.",
      health: "Bỏ bê sức khỏe vì công việc.",
      family: "Xa cách gia đình dù sung túc."
    },
    keywords_up: ["tận hưởng", "tri ân", "chia sẻ", "cân bằng"],
    keywords_rev: ["kết nối", "cân bằng", "mở lòng", "chia sẻ"],
    summary_up: "thành công và độc lập",
    summary_rev: "thành công nhưng cô đơn"
  },
  "Ten of Pentacles": {
    name_vi: "Mười Xu",
    vibe: 1,
    meaning_matrix_up: {
      love: "Hôn nhân, gia đình bền vững.",
      career: "Thành công lâu dài, di sản.",
      finance: "Giàu có bền vững, thừa kế.",
      self: "Thành tựu lâu dài.",
      health: "Sức khỏe tốt lâu dài.",
      family: "Gia đình thịnh vượng nhiều thế hệ."
    },
    meaning_matrix_rev: {
      love: "Xung đột về tài sản trong gia đình.",
      career: "Mất mát lâu dài.",
      finance: "Tranh chấp thừa kế.",
      self: "Lo lắng về tương lai.",
      health: "Vấn đề sức khỏe di truyền.",
      family: "Xung đột tài chính gia đình."
    },
    keywords_up: ["tri ân", "bảo tồn", "chia sẻ", "lập kế hoạch"],
    keywords_rev: ["giải quyết", "hòa giải", "ưu tiên gia đình", "buông bỏ vật chất"],
    summary_up: "thịnh vượng và bền vững",
    summary_rev: "xung đột về tài sản"
  },
  "Page of Pentacles": {
    name_vi: "Thị Đồng Xu",
    vibe: 1,
    meaning_matrix_up: {
      love: "Khởi đầu mới thực tế trong tình yêu.",
      career: "Cơ hội học hỏi, việc làm mới.",
      finance: "Tin tức tốt về tiền, cơ hội nhỏ.",
      self: "Ham học hỏi, thực tế.",
      health: "Bắt đầu thói quen sức khỏe.",
      family: "Tin tốt về gia đình, có thể có thêm thành viên."
    },
    meaning_matrix_rev: {
      love: "Chậm tiến triển trong tình yêu.",
      career: "Cơ hội bị trì hoãn.",
      finance: "Tin xấu về tài chính.",
      self: "Thiếu động lực học hỏi.",
      health: "Khó bắt đầu thói quen mới.",
      family: "Tin không tốt về gia đình."
    },
    keywords_up: ["học hỏi", "bắt đầu", "kiên nhẫn", "thực tế"],
    keywords_rev: ["kiên nhẫn", "chuẩn bị", "không nản", "tập trung"],
    summary_up: "cơ hội mới và ham học",
    summary_rev: "cơ hội bị trì hoãn"
  },
  "Knight of Pentacles": {
    name_vi: "Hiệp Sĩ Xu",
    vibe: 1,
    meaning_matrix_up: {
      love: "Người yêu đáng tin cậy, ổn định.",
      career: "Làm việc chăm chỉ, đáng tin cậy.",
      finance: "Kiếm tiền ổn định, không mạo hiểm.",
      self: "Kiên nhẫn, đáng tin cậy.",
      health: "Duy trì thói quen đều đặn.",
      family: "Đáng tin cậy với gia đình."
    },
    meaning_matrix_rev: {
      love: "Quá nhàm chán, thiếu đam mê.",
      career: "Làm việc quá chậm, bảo thủ.",
      finance: "Quá cẩn thận, bỏ lỡ cơ hội.",
      self: "Bướng bỉnh, không thay đổi.",
      health: "Quá cứng nhắc về thói quen.",
      family: "Quá nghiêm khắc với gia đình."
    },
    keywords_up: ["kiên trì", "tin cậy", "ổn định", "cam kết"],
    keywords_rev: ["linh hoạt", "mạo hiểm", "thay đổi", "vui vẻ"],
    summary_up: "đáng tin cậy và ổn định",
    summary_rev: "quá bảo thủ, cần linh hoạt"
  },
  "Queen of Pentacles": {
    name_vi: "Hoàng Hậu Xu",
    vibe: 1,
    meaning_matrix_up: {
      love: "Người yêu/đối tác chăm sóc, thực tế.",
      career: "Quản lý tốt, thành công thực tế.",
      finance: "Quản lý tài chính giỏi, sung túc.",
      self: "Chăm sóc tốt bản thân và người khác.",
      health: "Sức khỏe tốt, biết chăm sóc.",
      family: "Người mẹ/vợ tốt, chăm sóc gia đình."
    },
    meaning_matrix_rev: {
      love: "Quá bận rộn, bỏ bê tình yêu.",
      career: "Kiểm soát quá mức.",
      finance: "Chi tiêu thiếu cân nhắc.",
      self: "Bỏ bê bản thân vì lo cho người khác.",
      health: "Không chăm sóc sức khỏe.",
      family: "Kiểm soát gia đình quá mức."
    },
    keywords_up: ["chăm sóc", "cân bằng", "nuôi dưỡng", "thực tế"],
    keywords_rev: ["tự chăm sóc", "buông bỏ", "ranh giới", "cân bằng"],
    summary_up: "chăm sóc và thực tế",
    summary_rev: "cần chăm sóc bản thân hơn"
  },
  "King of Pentacles": {
    name_vi: "Hoàng Đế Xu",
    vibe: 1,
    meaning_matrix_up: {
      love: "Người yêu/đối tác thành đạt, đáng tin.",
      career: "Thành công lớn, lãnh đạo.",
      finance: "Giàu có, quản lý tài chính xuất sắc.",
      self: "Thành đạt, ổn định.",
      health: "Sức khỏe tốt, ổn định.",
      family: "Người cha/chồng thành đạt, trụ cột."
    },
    meaning_matrix_rev: {
      love: "Quá coi trọng tiền bạc.",
      career: "Tham công tiếc việc.",
      finance: "Tham lam, không bao giờ đủ.",
      self: "Chỉ nghĩ đến vật chất.",
      health: "Bỏ bê sức khỏe vì tiền.",
      family: "Xa cách gia đình vì công việc."
    },
    keywords_up: ["thành công", "lãnh đạo", "chia sẻ", "cân bằng"],
    keywords_rev: ["cân bằng", "giá trị", "gia đình", "sức khỏe"],
    summary_up: "thành đạt và đáng tin cậy",
    summary_rev: "quá coi trọng vật chất"
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

// Get Vietnamese name for a card
export const getVietnameseName = (englishName: string): string => {
  return allCardMeanings[englishName]?.name_vi || englishName;
};

// Get interpretation based on category and position
export const getInterpretation = (
  cardName: string,
  isReversed: boolean,
  position: string,
  category: CategoryType
): string => {
  const card = allCardMeanings[cardName];
  if (!card) return "Không tìm thấy thông tin lá bài.";
  
  const matrix = isReversed ? card.meaning_matrix_rev : card.meaning_matrix_up;
  return matrix[category] || matrix.self;
};

// Get actionable advice
export const getAdvice = (cardName: string, isReversed: boolean): string => {
  const card = allCardMeanings[cardName];
  if (!card) return "";
  
  const keywords = isReversed ? card.keywords_rev : card.keywords_up;
  return keywords.join(", ");
};

// Get keywords for a card
export const getKeywords = (cardName: string, isReversed: boolean): string[] => {
  const card = allCardMeanings[cardName];
  if (!card) return [];
  return isReversed ? card.keywords_rev : card.keywords_up;
};

// ============= QUESTION ANALYSIS =============
type QuestionType = 'when' | 'should' | 'why' | 'how' | 'what' | 'general';

const analyzeQuestion = (question: string): QuestionType => {
  const lowerQ = question.toLowerCase();
  if (lowerQ.includes('khi nào') || lowerQ.includes('bao giờ') || lowerQ.includes('lúc nào')) return 'when';
  if (lowerQ.includes('có nên') || lowerQ.includes('nên không') || lowerQ.includes('liệu có')) return 'should';
  if (lowerQ.includes('tại sao') || lowerQ.includes('vì sao') || lowerQ.includes('nguyên nhân')) return 'why';
  if (lowerQ.includes('làm sao') || lowerQ.includes('làm thế nào') || lowerQ.includes('cách nào')) return 'how';
  if (lowerQ.includes('là gì') || lowerQ.includes('điều gì')) return 'what';
  return 'general';
};

const getQuestionLead = (questionType: QuestionType): string => {
  switch (questionType) {
    case 'when': return 'Về thời điểm bạn hỏi,';
    case 'should': return 'Để trả lời câu hỏi có nên hay không,';
    case 'why': return 'Để hiểu nguyên nhân,';
    case 'how': return 'Về cách thức thực hiện,';
    case 'what': return 'Để làm rõ vấn đề,';
    default: return 'Dựa trên câu hỏi của bạn,';
  }
};

// ============= VIBE CALCULATION =============
const getVibeConclusion = (totalVibe: number): { conclusion: string; energy: string } => {
  if (totalVibe >= 2) {
    return {
      conclusion: "rất khả quan và tích cực",
      energy: "Năng lượng rất tốt"
    };
  } else if (totalVibe === 1) {
    return {
      conclusion: "đang có chuyển biến tốt",
      energy: "Năng lượng khá thuận lợi"
    };
  } else if (totalVibe === 0 || totalVibe === -1) {
    return {
      conclusion: "đang trong giai đoạn biến động, cần thận trọng",
      energy: "Năng lượng trung tính, cần cẩn thận"
    };
  } else {
    return {
      conclusion: "đang có thử thách lớn, cần thay đổi hướng đi",
      energy: "Năng lượng cần điều chỉnh"
    };
  }
};

// ============= CATEGORY NAMES =============
const categoryNamesVi: Record<CategoryType, string> = {
  love: "Tình yêu",
  career: "Công việc", 
  finance: "Tài chính",
  self: "Bản thân",
  health: "Sức khỏe",
  family: "Gia đình"
};

// ============= SYNTHESIS FRAMEWORK =============
export interface SynthesisResult {
  part1_overview: string;      // Tổng quan & Trả lời trực diện
  part2_past: string;          // Lý giải Quá khứ
  part3_present: string;       // Lý giải Hiện tại
  part4_future: string;        // Lý giải Tương lai
  part5_advice: string;        // Lời khuyên hành động
  totalVibe: number;
  vibeDescriptor: string;
}

export const synthesizeReading = (
  cards: Array<{ name: string; isReversed?: boolean }>,
  category: CategoryType,
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

  // Calculate vibe (reversed flips the sign)
  const vibe1 = cards[0].isReversed ? -card1.vibe : card1.vibe;
  const vibe2 = cards[1].isReversed ? -card2.vibe : card2.vibe;
  const vibe3 = cards[2].isReversed ? -card3.vibe : card3.vibe;
  const totalVibe = vibe1 + vibe2 + vibe3;

  const { conclusion, energy } = getVibeConclusion(totalVibe);
  const questionType = analyzeQuestion(question);
  const questionLead = getQuestionLead(questionType);
  const categoryName = categoryNamesVi[category];

  // Get summaries
  const summary1 = cards[0].isReversed ? card1.summary_rev : card1.summary_up;
  const summary2 = cards[1].isReversed ? card2.summary_rev : card2.summary_up;
  const summary3 = cards[2].isReversed ? card3.summary_rev : card3.summary_up;

  // Get interpretations
  const interp1 = cards[0].isReversed ? card1.meaning_matrix_rev[category] : card1.meaning_matrix_up[category];
  const interp2 = cards[1].isReversed ? card2.meaning_matrix_rev[category] : card2.meaning_matrix_up[category];
  const interp3 = cards[2].isReversed ? card3.meaning_matrix_rev[category] : card3.meaning_matrix_up[category];

  // Get keywords for advice (prioritize future card)
  const keywords3 = cards[2].isReversed ? card3.keywords_rev : card3.keywords_up;
  const avoidKeywords = cards.find(c => {
    const cardData = allCardMeanings[c.name];
    const vibe = c.isReversed ? -cardData.vibe : cardData.vibe;
    return vibe < 0;
  });
  
  let avoidAction = "";
  if (avoidKeywords) {
    const negCard = allCardMeanings[avoidKeywords.name];
    const negKeywords = avoidKeywords.isReversed ? negCard.keywords_up : negCard.keywords_rev;
    if (negKeywords.length > 0) {
      avoidAction = negKeywords[0];
    }
  }

  // ===== PART 1: Overview =====
  const part1_overview = `${questionLead} về câu hỏi "${question}" trong chủ đề ${categoryName}, các lá bài cho thấy năng lượng ${conclusion}. ${energy}. Trước đây bạn đã ${summary1}, hiện tại đang ${summary2}, dẫn đến tương lai có thể ${summary3}.`;

  // ===== PART 2: Past =====
  const part2_past = `**Quá Khứ**: Lá **${card1.name_vi}** (${cards[0].isReversed ? 'Ngược' : 'Xuôi'}). ${interp1} Lá này xuất hiện vì nó phản ánh những gì bạn đã trải qua, cho thấy nền tảng của tình huống hiện tại.`;

  // ===== PART 3: Present =====
  const part3_present = `**Hiện Tại**: Lá **${card2.name_vi}** (${cards[1].isReversed ? 'Ngược' : 'Xuôi'}). ${interp2} Đây là năng lượng bạn đang sống trong lúc này, nó ảnh hưởng trực tiếp đến cách bạn xử lý vấn đề.`;

  // ===== PART 4: Future =====
  const part4_future = `**Tương Lai**: Lá **${card3.name_vi}** (${cards[2].isReversed ? 'Ngược' : 'Xuôi'}). ${interp3} Đây là hướng đi có thể xảy ra nếu bạn tiếp tục con đường hiện tại.`;

  // ===== PART 5: Advice =====
  const actionStr = keywords3.join(", ");
  let part5_advice = `**Lời khuyên hành động**: Dựa trên toàn bộ trải bài, bạn nên tập trung vào: **${actionStr}**.`;
  
  if (avoidAction) {
    part5_advice += ` Tránh ${avoidAction} vào lúc này.`;
  }

  // Determine vibe descriptor
  let vibeDescriptor = "trung tính";
  if (totalVibe >= 2) vibeDescriptor = "rất tích cực";
  else if (totalVibe === 1) vibeDescriptor = "tích cực";
  else if (totalVibe === 0) vibeDescriptor = "trung tính";
  else if (totalVibe === -1) vibeDescriptor = "cần lưu ý";
  else vibeDescriptor = "thử thách";

  return {
    part1_overview,
    part2_past,
    part3_present,
    part4_future,
    part5_advice,
    totalVibe,
    vibeDescriptor
  };
};
