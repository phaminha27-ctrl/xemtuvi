// Vietnamese Tarot Logic - 78 Card Translations with Synthesis Engine
// Practical, everyday Vietnamese - no mystical/flowery language

export interface CardMeaning {
  name: string;
  meaning_up_vi: string;
  meaning_rev_vi: string;
  summary_up: string;
  summary_rev: string;
  vibe: number; // -2 to +2 scale
  advice_up: string;
  advice_rev: string;
}

// Major Arcana (22 cards)
const majorArcana: Record<string, CardMeaning> = {
  "The Fool": {
    name: "The Fool",
    meaning_up_vi: "Đây là lúc bạn sẵn sàng bắt đầu điều gì đó mới mẻ. Bạn có năng lượng tích cực và sự tò mò để khám phá những cơ hội chưa biết. Đừng lo lắng quá nhiều về kết quả - hãy cứ bước đi.",
    meaning_rev_vi: "Bạn đang do dự, sợ rủi ro hoặc hành động thiếu suy nghĩ. Có thể bạn đang bỏ lỡ cơ hội vì quá thận trọng, hoặc ngược lại - quá liều lĩnh mà không cân nhắc hậu quả.",
    summary_up: "sẵn sàng bắt đầu mới, đầy năng lượng tích cực",
    summary_rev: "do dự, sợ rủi ro hoặc hành động thiếu suy nghĩ",
    vibe: 1,
    advice_up: "Hãy tin vào bản năng và dám thử điều mới. Đừng để nỗi sợ ngăn cản bạn.",
    advice_rev: "Dừng lại và suy nghĩ kỹ trước khi hành động. Lập kế hoạch rõ ràng hơn."
  },
  "The Magician": {
    name: "The Magician",
    meaning_up_vi: "Bạn có đủ kỹ năng và nguồn lực để đạt được mục tiêu. Đây là thời điểm tốt để biến ý tưởng thành hiện thực. Tập trung vào những gì bạn muốn và hành động.",
    meaning_rev_vi: "Bạn đang lãng phí tiềm năng hoặc sử dụng khả năng sai mục đích. Có thể thiếu tập trung, thiếu kế hoạch, hoặc đang cố gắng lừa dối ai đó.",
    summary_up: "có đủ khả năng để đạt mục tiêu",
    summary_rev: "lãng phí tiềm năng, thiếu tập trung",
    vibe: 2,
    advice_up: "Tận dụng những gì bạn có ngay bây giờ. Hành động quyết đoán.",
    advice_rev: "Xem lại mục tiêu và cách bạn đang sử dụng thời gian, năng lượng."
  },
  "The High Priestess": {
    name: "The High Priestess",
    meaning_up_vi: "Hãy tin vào trực giác của mình. Có những điều bạn cảm nhận được nhưng chưa thể giải thích. Đây là lúc lắng nghe nội tâm thay vì chỉ dựa vào logic.",
    meaning_rev_vi: "Bạn đang bỏ qua trực giác hoặc không kết nối được với cảm xúc thật của mình. Có thể đang che giấu điều gì đó hoặc không thành thật với bản thân.",
    summary_up: "cần lắng nghe trực giác",
    summary_rev: "đang bỏ qua cảm xúc thật của mình",
    vibe: 1,
    advice_up: "Dành thời gian yên tĩnh để suy ngẫm. Đừng vội vàng quyết định.",
    advice_rev: "Đối mặt với sự thật mà bạn đang trốn tránh. Thành thật với chính mình."
  },
  "The Empress": {
    name: "The Empress",
    meaning_up_vi: "Đây là giai đoạn sung túc, sáng tạo và nuôi dưỡng. Bạn có khả năng chăm sóc người khác và tạo ra những điều đẹp đẽ. Cuộc sống đang thuận lợi.",
    meaning_rev_vi: "Bạn đang thiếu sự chăm sóc bản thân hoặc phụ thuộc quá nhiều vào người khác. Có thể cảm thấy cạn kiệt năng lượng hoặc mất kết nối với những gì quan trọng.",
    summary_up: "giai đoạn sung túc, sáng tạo",
    summary_rev: "thiếu chăm sóc bản thân, cạn kiệt năng lượng",
    vibe: 2,
    advice_up: "Tận hưởng những gì bạn có. Chia sẻ và chăm sóc người xung quanh.",
    advice_rev: "Ưu tiên bản thân trước. Học cách nói 'không' khi cần thiết."
  },
  "The Emperor": {
    name: "The Emperor",
    meaning_up_vi: "Bạn cần sự ổn định, kỷ luật và tổ chức. Đây là lúc đặt ra quy tắc rõ ràng và tuân theo kế hoạch. Lãnh đạo bằng sự công bằng và lý trí.",
    meaning_rev_vi: "Bạn đang quá cứng nhắc hoặc thiếu kiểm soát. Có thể đang lạm dụng quyền lực hoặc ngược lại - thiếu kỷ luật để hoàn thành mục tiêu.",
    summary_up: "cần kỷ luật và tổ chức",
    summary_rev: "quá cứng nhắc hoặc thiếu kiểm soát",
    vibe: 1,
    advice_up: "Lập kế hoạch chi tiết và tuân thủ nó. Đặt giới hạn rõ ràng.",
    advice_rev: "Linh hoạt hơn. Lắng nghe ý kiến người khác thay vì áp đặt."
  },
  "The Hierophant": {
    name: "The Hierophant",
    meaning_up_vi: "Đây là lúc học hỏi từ người có kinh nghiệm hoặc tuân theo những giá trị đã được kiểm chứng. Tìm kiếm sự hướng dẫn từ mentor, thầy cô, hoặc truyền thống.",
    meaning_rev_vi: "Bạn đang thách thức những quy tắc cũ hoặc cảm thấy bị gò bó bởi kỳ vọng xã hội. Có thể cần tìm con đường riêng thay vì làm theo số đông.",
    summary_up: "cần học hỏi từ người có kinh nghiệm",
    summary_rev: "đang thách thức quy tắc, muốn tìm con đường riêng",
    vibe: 1,
    advice_up: "Tìm một mentor hoặc tham gia cộng đồng có thể hỗ trợ bạn.",
    advice_rev: "Tin vào quan điểm của mình nhưng đừng bác bỏ hoàn toàn kinh nghiệm người khác."
  },
  "The Lovers": {
    name: "The Lovers",
    meaning_up_vi: "Đây là về sự kết nối sâu sắc và những lựa chọn quan trọng. Có thể liên quan đến tình yêu, nhưng cũng là về việc quyết định điều gì thực sự có ý nghĩa với bạn.",
    meaning_rev_vi: "Bạn đang đối mặt với xung đột trong mối quan hệ hoặc khó đưa ra quyết định quan trọng. Có thể đang không trung thực với chính mình về những gì mình muốn.",
    summary_up: "kết nối sâu sắc, lựa chọn quan trọng",
    summary_rev: "xung đột trong mối quan hệ, khó quyết định",
    vibe: 2,
    advice_up: "Quyết định dựa trên giá trị cốt lõi của bạn, không phải áp lực bên ngoài.",
    advice_rev: "Trò chuyện thẳng thắn về những gì đang làm bạn khó chịu."
  },
  "The Chariot": {
    name: "The Chariot",
    meaning_up_vi: "Bạn có động lực mạnh mẽ và quyết tâm để vượt qua thử thách. Đây là lúc tiến về phía trước với sự tự tin. Kiểm soát cảm xúc và tập trung vào mục tiêu.",
    meaning_rev_vi: "Bạn đang mất phương hướng hoặc thiếu động lực. Có thể đang cố kiểm soát mọi thứ quá mức hoặc ngược lại - buông xuôi hoàn toàn.",
    summary_up: "có động lực mạnh, quyết tâm vượt thử thách",
    summary_rev: "mất phương hướng, thiếu động lực",
    vibe: 2,
    advice_up: "Tiến về phía trước không do dự. Bạn có khả năng chinh phục.",
    advice_rev: "Dừng lại, xác định lại mục tiêu trước khi tiếp tục."
  },
  "Strength": {
    name: "Strength",
    meaning_up_vi: "Sức mạnh thật sự đến từ sự kiên nhẫn và lòng trắc ẩn, không phải sự hung hăng. Bạn có đủ nội lực để đối mặt với khó khăn một cách bình tĩnh.",
    meaning_rev_vi: "Bạn đang thiếu tự tin hoặc để cảm xúc tiêu cực kiểm soát. Có thể đang nghi ngờ bản thân hoặc đối xử quá khắc nghiệt với chính mình.",
    summary_up: "có đủ nội lực để đối mặt khó khăn",
    summary_rev: "thiếu tự tin, để cảm xúc tiêu cực kiểm soát",
    vibe: 2,
    advice_up: "Đối mặt với thử thách bằng sự bình tĩnh. Tin vào sức mạnh nội tại.",
    advice_rev: "Tử tế với bản thân hơn. Tìm nguồn hỗ trợ khi cần."
  },
  "The Hermit": {
    name: "The Hermit",
    meaning_up_vi: "Đây là lúc cần thời gian một mình để suy ngẫm. Tạm rời xa ồn ào để tìm câu trả lời bên trong. Sự cô đơn có chủ đích giúp bạn hiểu rõ hơn về bản thân.",
    meaning_rev_vi: "Bạn đang cô lập quá mức hoặc trốn tránh thực tế. Có thể cần mở lòng với người khác thay vì tự giam mình.",
    summary_up: "cần thời gian một mình để suy ngẫm",
    summary_rev: "cô lập quá mức, trốn tránh thực tế",
    vibe: 0,
    advice_up: "Dành thời gian yên tĩnh mỗi ngày để kết nối với bản thân.",
    advice_rev: "Liên lạc lại với bạn bè hoặc người thân. Đừng tự cô lập."
  },
  "Wheel of Fortune": {
    name: "Wheel of Fortune",
    meaning_up_vi: "Cuộc sống đang thay đổi theo hướng tích cực. Cơ hội mới đang đến. Đây là chu kỳ may mắn - hãy tận dụng nó.",
    meaning_rev_vi: "Bạn đang trải qua giai đoạn khó khăn hoặc vận xui. Đây chỉ là tạm thời - mọi thứ sẽ thay đổi. Đừng cố kiểm soát những gì ngoài tầm tay.",
    summary_up: "cơ hội mới, vận may đang đến",
    summary_rev: "giai đoạn khó khăn tạm thời",
    vibe: 1,
    advice_up: "Nắm bắt cơ hội ngay khi nó xuất hiện. Đừng chần chừ.",
    advice_rev: "Kiên nhẫn chờ đợi. Tập trung vào những gì bạn có thể kiểm soát."
  },
  "Justice": {
    name: "Justice",
    meaning_up_vi: "Sự công bằng sẽ được thực thi. Hành động của bạn sẽ có hậu quả tương xứng. Đây là lúc đưa ra quyết định dựa trên sự thật và lẽ phải.",
    meaning_rev_vi: "Bạn đang đối mặt với sự bất công hoặc tự lừa dối bản thân. Có thể đang trốn tránh trách nhiệm hoặc không chấp nhận hậu quả từ hành động của mình.",
    summary_up: "công bằng được thực thi, hậu quả tương xứng",
    summary_rev: "đối mặt bất công hoặc trốn tránh trách nhiệm",
    vibe: 1,
    advice_up: "Hành động đúng đắn dù khó khăn. Sự thật sẽ được sáng tỏ.",
    advice_rev: "Nhìn nhận trung thực về tình huống. Chịu trách nhiệm với hành động của mình."
  },
  "The Hanged Man": {
    name: "The Hanged Man",
    meaning_up_vi: "Đây là lúc cần tạm dừng và nhìn mọi thứ từ góc độ khác. Đôi khi buông bỏ hoặc chấp nhận chờ đợi là điều cần thiết để tiến lên.",
    meaning_rev_vi: "Bạn đang kháng cự sự thay đổi cần thiết hoặc hy sinh vô ích. Có thể đang bị kẹt vì không chịu từ bỏ điều gì đó.",
    summary_up: "cần tạm dừng, nhìn từ góc độ khác",
    summary_rev: "kháng cự thay đổi, bị kẹt trong tình huống",
    vibe: 0,
    advice_up: "Chấp nhận giai đoạn chờ đợi này. Sử dụng thời gian để suy ngẫm.",
    advice_rev: "Xem xét những gì bạn cần buông bỏ để tiến lên."
  },
  "Death": {
    name: "Death",
    meaning_up_vi: "Một giai đoạn đang kết thúc để nhường chỗ cho điều mới. Đây không phải điều xấu - đó là sự chuyển đổi cần thiết. Hãy để cái cũ ra đi.",
    meaning_rev_vi: "Bạn đang kháng cự sự thay đổi không thể tránh khỏi. Việc bám víu vào quá khứ đang ngăn cản bạn phát triển.",
    summary_up: "kết thúc cũ, bắt đầu mới",
    summary_rev: "kháng cự thay đổi, bám víu quá khứ",
    vibe: 0,
    advice_up: "Chấp nhận kết thúc như một phần tự nhiên. Sẵn sàng cho điều mới.",
    advice_rev: "Xác định điều gì đang níu giữ bạn và tìm cách buông bỏ."
  },
  "Temperance": {
    name: "Temperance",
    meaning_up_vi: "Cân bằng và điều độ là chìa khóa. Đừng đi cực đoan theo bất kỳ hướng nào. Kiên nhẫn kết hợp các yếu tố khác nhau để tạo ra kết quả tốt.",
    meaning_rev_vi: "Bạn đang mất cân bằng - quá nhiều hoặc quá ít ở một khía cạnh nào đó. Có thể đang thiếu kiên nhẫn hoặc hành động thái quá.",
    summary_up: "cần cân bằng và điều độ",
    summary_rev: "mất cân bằng, thiếu kiên nhẫn",
    vibe: 1,
    advice_up: "Tìm điểm giữa trong mọi việc. Kiên nhẫn là đức tính quan trọng lúc này.",
    advice_rev: "Xem lại những gì bạn đang làm quá nhiều hoặc quá ít. Điều chỉnh lại."
  },
  "The Devil": {
    name: "The Devil",
    meaning_up_vi: "Bạn đang bị ràng buộc bởi thói quen xấu, nỗi sợ, hoặc ham muốn vật chất. Nhận ra rằng bạn có quyền tự do hơn bạn nghĩ - xiềng xích phần lớn là tự áp đặt.",
    meaning_rev_vi: "Bạn đang bắt đầu thoát khỏi những gì đã ràng buộc mình. Nhận thức về vấn đề là bước đầu tiên để thay đổi.",
    summary_up: "bị ràng buộc bởi thói quen xấu hoặc nỗi sợ",
    summary_rev: "bắt đầu thoát khỏi ràng buộc",
    vibe: -1,
    advice_up: "Nhận diện điều gì đang kiểm soát bạn. Tìm cách phá vỡ thói quen xấu.",
    advice_rev: "Tiếp tục quá trình giải phóng bản thân. Bạn đang đi đúng hướng."
  },
  "The Tower": {
    name: "The Tower",
    meaning_up_vi: "Một sự thay đổi đột ngột, có thể là sốc ban đầu. Những gì được xây trên nền tảng yếu sẽ sụp đổ. Đây là cơ hội để xây dựng lại tốt hơn.",
    meaning_rev_vi: "Bạn đang trốn tránh một sự thay đổi cần thiết hoặc đang trong quá trình phục hồi sau khủng hoảng. Học bài học từ những gì đã xảy ra.",
    summary_up: "thay đổi đột ngột, sụp đổ để xây dựng lại",
    summary_rev: "trốn tránh thay đổi hoặc đang phục hồi",
    vibe: -2,
    advice_up: "Chấp nhận thực tế mới. Xem đây là cơ hội khởi đầu lại từ đầu.",
    advice_rev: "Cho phép bản thân thời gian hồi phục. Rút kinh nghiệm cho tương lai."
  },
  "The Star": {
    name: "The Star",
    meaning_up_vi: "Hy vọng và niềm tin đang trở lại. Sau giai đoạn khó khăn, bạn đang bước vào thời kỳ chữa lành và bình yên. Tương lai tươi sáng hơn.",
    meaning_rev_vi: "Bạn đang mất niềm tin hoặc cảm thấy thất vọng. Khó nhìn thấy ánh sáng cuối đường hầm. Cần tìm lại hy vọng.",
    summary_up: "hy vọng trở lại, thời kỳ chữa lành",
    summary_rev: "mất niềm tin, cảm thấy thất vọng",
    vibe: 2,
    advice_up: "Tin tưởng vào quá trình. Mọi thứ đang đi đúng hướng.",
    advice_rev: "Tìm những điều nhỏ để biết ơn mỗi ngày. Dần dần xây dựng lại niềm tin."
  },
  "The Moon": {
    name: "The Moon",
    meaning_up_vi: "Có điều gì đó chưa rõ ràng. Đừng vội kết luận khi bạn chưa có đủ thông tin. Cảm xúc có thể đánh lừa bạn lúc này.",
    meaning_rev_vi: "Sự thật đang dần được sáng tỏ. Những lo lắng vô căn cứ đang tan biến. Bạn đang thoát khỏi sự mơ hồ.",
    summary_up: "có điều chưa rõ ràng, đừng vội kết luận",
    summary_rev: "sự thật đang sáng tỏ, lo lắng tan biến",
    vibe: -1,
    advice_up: "Chờ đợi thêm thông tin trước khi quyết định. Đừng tin hoàn toàn vào vẻ bề ngoài.",
    advice_rev: "Tin vào trực giác của bạn - nó đang trở nên rõ ràng hơn."
  },
  "The Sun": {
    name: "The Sun",
    meaning_up_vi: "Thành công, hạnh phúc và sự rõ ràng. Mọi thứ đang diễn ra tốt đẹp. Đây là thời điểm tận hưởng và chia sẻ niềm vui.",
    meaning_rev_vi: "Niềm vui bị che mờ tạm thời. Có thể đang thiếu tự tin hoặc gặp trở ngại nhỏ. Nhưng ánh sáng vẫn ở đó.",
    summary_up: "thành công, hạnh phúc, mọi thứ tốt đẹp",
    summary_rev: "niềm vui bị che mờ tạm thời",
    vibe: 2,
    advice_up: "Tận hưởng khoảnh khắc này. Lan tỏa năng lượng tích cực cho người khác.",
    advice_rev: "Nhớ rằng khó khăn chỉ tạm thời. Tìm lại nguồn năng lượng của bạn."
  },
  "Judgement": {
    name: "Judgement",
    meaning_up_vi: "Đây là thời điểm đánh giá lại và đưa ra quyết định quan trọng. Lắng nghe tiếng gọi bên trong. Sẵn sàng cho một sự thức tỉnh hoặc khởi đầu mới.",
    meaning_rev_vi: "Bạn đang tự phán xét quá khắc nghiệt hoặc không chịu rút kinh nghiệm từ quá khứ. Có thể đang trốn tránh một quyết định quan trọng.",
    summary_up: "thời điểm đánh giá lại, quyết định quan trọng",
    summary_rev: "tự phán xét quá khắc, trốn tránh quyết định",
    vibe: 1,
    advice_up: "Đánh giá trung thực về bản thân và tình huống. Sẵn sàng thay đổi.",
    advice_rev: "Tha thứ cho bản thân về những lỗi lầm cũ. Học và tiến lên."
  },
  "The World": {
    name: "The World",
    meaning_up_vi: "Hoàn thành, thành tựu và sự viên mãn. Bạn đã đạt được mục tiêu quan trọng. Một chu kỳ kết thúc, sẵn sàng cho chu kỳ mới cao hơn.",
    meaning_rev_vi: "Bạn đang gần đến đích nhưng còn thiếu điều gì đó. Có thể cần thêm nỗ lực cuối cùng hoặc đang cảm thấy chưa trọn vẹn.",
    summary_up: "hoàn thành, thành tựu, viên mãn",
    summary_rev: "gần đến đích nhưng còn thiếu điều gì",
    vibe: 2,
    advice_up: "Ăn mừng thành tựu của bạn. Chuẩn bị cho chương tiếp theo.",
    advice_rev: "Xác định điều gì còn thiếu và hoàn thành nó. Đừng bỏ cuộc sát vạch đích."
  }
};

// Minor Arcana - Wands (14 cards)
const wands: Record<string, CardMeaning> = {
  "Ace of Wands": {
    name: "Ace of Wands",
    meaning_up_vi: "Một ý tưởng mới hoặc dự án mới đang bắt đầu. Bạn có nguồn năng lượng và động lực mạnh mẽ. Đây là thời điểm tốt để khởi động.",
    meaning_rev_vi: "Ý tưởng bị chặn hoặc thiếu động lực để bắt đầu. Có thể bạn đang chần chừ hoặc gặp trở ngại ban đầu.",
    summary_up: "ý tưởng mới, động lực mạnh mẽ",
    summary_rev: "ý tưởng bị chặn, thiếu động lực",
    vibe: 2,
    advice_up: "Hành động ngay với ý tưởng của bạn. Năng lượng đang ở đỉnh cao.",
    advice_rev: "Xem lại điều gì đang ngăn cản bạn bắt đầu. Chia nhỏ mục tiêu."
  },
  "Two of Wands": {
    name: "Two of Wands",
    meaning_up_vi: "Bạn đang lên kế hoạch và cân nhắc các lựa chọn. Đây là giai đoạn hoạch định trước khi hành động. Nhìn xa hơn những gì trước mắt.",
    meaning_rev_vi: "Thiếu kế hoạch hoặc sợ bước ra khỏi vùng an toàn. Có thể đang bỏ lỡ cơ hội vì không dám quyết định.",
    summary_up: "đang lên kế hoạch, cân nhắc lựa chọn",
    summary_rev: "thiếu kế hoạch, sợ ra khỏi vùng an toàn",
    vibe: 1,
    advice_up: "Nghiên cứu kỹ các lựa chọn trước khi quyết định. Lập kế hoạch dài hạn.",
    advice_rev: "Đừng để sợ hãi ngăn cản. Đôi khi phải chấp nhận rủi ro."
  },
  "Three of Wands": {
    name: "Three of Wands",
    meaning_up_vi: "Kế hoạch của bạn đang tiến triển. Cơ hội mở rộng đang đến. Đây là lúc mở rộng tầm nhìn và chuẩn bị đón nhận thành quả.",
    meaning_rev_vi: "Kế hoạch bị chậm trễ hoặc gặp trở ngại. Có thể cần điều chỉnh kỳ vọng hoặc thay đổi phương pháp.",
    summary_up: "kế hoạch tiến triển, cơ hội mở rộng",
    summary_rev: "kế hoạch chậm trễ, cần điều chỉnh",
    vibe: 1,
    advice_up: "Tiếp tục theo dõi tiến độ. Sẵn sàng nắm bắt cơ hội lớn hơn.",
    advice_rev: "Đánh giá lại kế hoạch và điều chỉnh nếu cần. Kiên nhẫn."
  },
  "Four of Wands": {
    name: "Four of Wands",
    meaning_up_vi: "Lễ kỷ niệm, hạnh phúc và sự ổn định. Đây là thời điểm tận hưởng thành quả với gia đình và bạn bè. Nền tảng vững chắc.",
    meaning_rev_vi: "Thiếu sự ổn định trong gia đình hoặc căng thẳng trong các mối quan hệ. Có thể chưa sẵn sàng để ăn mừng.",
    summary_up: "lễ kỷ niệm, hạnh phúc, ổn định",
    summary_rev: "thiếu ổn định, căng thẳng quan hệ",
    vibe: 2,
    advice_up: "Dành thời gian với những người thân yêu. Ăn mừng những thành tựu nhỏ.",
    advice_rev: "Giải quyết xung đột trong gia đình trước. Tạo không gian an toàn."
  },
  "Five of Wands": {
    name: "Five of Wands",
    meaning_up_vi: "Xung đột, cạnh tranh hoặc bất đồng ý kiến. Đây có thể là thử thách để bạn chứng minh bản thân. Đừng né tránh mà hãy đối mặt.",
    meaning_rev_vi: "Xung đột được giải quyết hoặc bạn đang tránh đối đầu. Có thể đang mệt mỏi với việc tranh cãi.",
    summary_up: "xung đột, cạnh tranh, cần chứng minh",
    summary_rev: "xung đột giảm hoặc đang tránh đối đầu",
    vibe: -1,
    advice_up: "Đứng lên bảo vệ quan điểm của mình. Cạnh tranh lành mạnh giúp bạn phát triển.",
    advice_rev: "Chọn lọc cuộc chiến nào đáng đánh. Không phải lúc nào cũng cần thắng."
  },
  "Six of Wands": {
    name: "Six of Wands",
    meaning_up_vi: "Chiến thắng, được công nhận và thành công công khai. Nỗ lực của bạn được ghi nhận. Đây là lúc tự hào về những gì đã làm được.",
    meaning_rev_vi: "Thiếu sự công nhận hoặc thất bại tạm thời. Có thể đang tự nghi ngờ hoặc lo lắng về đánh giá của người khác.",
    summary_up: "chiến thắng, được công nhận",
    summary_rev: "thiếu công nhận, tự nghi ngờ",
    vibe: 2,
    advice_up: "Đón nhận sự khen ngợi một cách khiêm tốn. Tiếp tục duy trì đà thắng lợi.",
    advice_rev: "Đừng để ý kiến người khác định nghĩa giá trị của bạn."
  },
  "Seven of Wands": {
    name: "Seven of Wands",
    meaning_up_vi: "Bạn đang phải bảo vệ vị trí hoặc quan điểm của mình. Có áp lực từ nhiều phía nhưng bạn có thể đứng vững nếu kiên định.",
    meaning_rev_vi: "Cảm thấy quá tải bởi áp lực hoặc đang từ bỏ. Có thể đang tự hỏi liệu cuộc chiến có đáng không.",
    summary_up: "phải bảo vệ vị trí, đứng vững dưới áp lực",
    summary_rev: "quá tải áp lực, muốn từ bỏ",
    vibe: 0,
    advice_up: "Giữ vững lập trường. Bạn có quyền bảo vệ những gì mình tin tưởng.",
    advice_rev: "Xem xét liệu đây có phải cuộc chiến đáng đánh. Đôi khi rút lui là chiến lược."
  },
  "Eight of Wands": {
    name: "Eight of Wands",
    meaning_up_vi: "Mọi thứ đang tiến triển nhanh chóng. Tin tức, thông tin hoặc sự kiện đến dồn dập. Đây là lúc hành động nhanh và quyết đoán.",
    meaning_rev_vi: "Sự chậm trễ, trở ngại hoặc thông tin bị tắc nghẽn. Có thể cần kiên nhẫn vì mọi thứ không nhanh như mong đợi.",
    summary_up: "tiến triển nhanh, hành động quyết đoán",
    summary_rev: "chậm trễ, trở ngại, cần kiên nhẫn",
    vibe: 1,
    advice_up: "Tận dụng đà này. Hành động ngay, đừng để cơ hội trôi qua.",
    advice_rev: "Kiên nhẫn chờ đợi thời điểm thích hợp. Chuẩn bị kỹ trong lúc chờ."
  },
  "Nine of Wands": {
    name: "Nine of Wands",
    meaning_up_vi: "Bạn đã trải qua nhiều thử thách và gần đến đích. Mệt mỏi nhưng cần kiên trì thêm một chút nữa. Đừng bỏ cuộc ngay bây giờ.",
    meaning_rev_vi: "Kiệt sức hoặc quá phòng thủ. Có thể đang mang quá nhiều gánh nặng hoặc không tin tưởng ai cả.",
    summary_up: "gần đến đích, cần kiên trì thêm",
    summary_rev: "kiệt sức, quá phòng thủ",
    vibe: 0,
    advice_up: "Cố gắng thêm một chút nữa. Đích đến đã gần, đừng dừng lại.",
    advice_rev: "Nghỉ ngơi khi cần. Tìm người hỗ trợ thay vì gánh vác một mình."
  },
  "Ten of Wands": {
    name: "Ten of Wands",
    meaning_up_vi: "Bạn đang gánh vác quá nhiều trách nhiệm. Áp lực công việc hoặc nghĩa vụ đang đè nặng. Cần xem xét lại và chia sẻ gánh nặng.",
    meaning_rev_vi: "Đang học cách buông bỏ gánh nặng hoặc từ chối thêm trách nhiệm. Nhận ra giới hạn của bản thân.",
    summary_up: "gánh vác quá nhiều, áp lực đè nặng",
    summary_rev: "học cách buông bỏ, nhận ra giới hạn",
    vibe: -1,
    advice_up: "Ưu tiên những gì quan trọng nhất. Học cách nói 'không' và ủy thác.",
    advice_rev: "Tiếp tục buông bỏ những gì không cần thiết. Bạn đang đi đúng hướng."
  },
  "Page of Wands": {
    name: "Page of Wands",
    meaning_up_vi: "Tin tức tốt hoặc cơ hội mới đang đến. Bạn có sự nhiệt tình và sẵn sàng khám phá. Đây là năng lượng của sự khởi đầu.",
    meaning_rev_vi: "Thiếu hướng đi hoặc ý tưởng chưa trưởng thành. Có thể đang nóng vội hoặc hứa suông mà không hành động.",
    summary_up: "tin tức tốt, nhiệt tình khám phá",
    summary_rev: "thiếu hướng đi, nóng vội",
    vibe: 1,
    advice_up: "Đón nhận cơ hội mới với tinh thần cởi mở. Học hỏi từ mọi trải nghiệm.",
    advice_rev: "Biến ý tưởng thành kế hoạch cụ thể. Hành động thay vì chỉ nói."
  },
  "Knight of Wands": {
    name: "Knight of Wands",
    meaning_up_vi: "Hành động nhanh, đam mê và phiêu lưu. Bạn có năng lượng để theo đuổi mục tiêu một cách mạnh mẽ. Đây là lúc tiến lên phía trước.",
    meaning_rev_vi: "Nóng nảy, thiếu kiên nhẫn hoặc hành động bốc đồng. Năng lượng đang bị phân tán hoặc sử dụng sai cách.",
    summary_up: "hành động nhanh, đam mê, tiến lên",
    summary_rev: "nóng nảy, bốc đồng, năng lượng phân tán",
    vibe: 1,
    advice_up: "Theo đuổi đam mê nhưng có kế hoạch. Sử dụng năng lượng đúng mục đích.",
    advice_rev: "Dừng lại và suy nghĩ trước khi hành động. Kiểm soát sự nóng vội."
  },
  "Queen of Wands": {
    name: "Queen of Wands",
    meaning_up_vi: "Tự tin, quyến rũ và có khả năng lãnh đạo. Bạn truyền cảm hứng cho người khác và biết cách tận dụng sức mạnh của mình.",
    meaning_rev_vi: "Thiếu tự tin hoặc sử dụng ảnh hưởng theo cách tiêu cực. Có thể đang ghen tị hoặc kiểm soát người khác.",
    summary_up: "tự tin, lãnh đạo, truyền cảm hứng",
    summary_rev: "thiếu tự tin hoặc kiểm soát người khác",
    vibe: 2,
    advice_up: "Tin vào khả năng của mình. Dẫn dắt bằng sự ấm áp và chân thành.",
    advice_rev: "Tập trung vào bản thân thay vì so sánh với người khác."
  },
  "King of Wands": {
    name: "King of Wands",
    meaning_up_vi: "Lãnh đạo mạnh mẽ, có tầm nhìn và khả năng thực hiện. Bạn có thể dẫn dắt người khác đến thành công với sự tự tin và quyết đoán.",
    meaning_rev_vi: "Lãnh đạo độc đoán hoặc thiếu tầm nhìn. Có thể đang lạm dụng quyền lực hoặc hành động thiếu suy nghĩ.",
    summary_up: "lãnh đạo mạnh mẽ, có tầm nhìn",
    summary_rev: "độc đoán, thiếu tầm nhìn",
    vibe: 2,
    advice_up: "Lãnh đạo bằng gương mẫu. Truyền động lực và tầm nhìn cho đội nhóm.",
    advice_rev: "Lắng nghe phản hồi từ người khác. Lãnh đạo không có nghĩa là kiểm soát."
  }
};

// Minor Arcana - Cups (14 cards)
const cups: Record<string, CardMeaning> = {
  "Ace of Cups": {
    name: "Ace of Cups",
    meaning_up_vi: "Khởi đầu mới về cảm xúc - tình yêu, tình bạn, hoặc sự sáng tạo. Trái tim bạn đang mở rộng để đón nhận điều tốt đẹp.",
    meaning_rev_vi: "Cảm xúc bị kìm nén hoặc khó kết nối với người khác. Có thể đang tự bảo vệ quá mức hoặc sợ bị tổn thương.",
    summary_up: "khởi đầu cảm xúc mới, trái tim mở rộng",
    summary_rev: "cảm xúc bị kìm nén, sợ bị tổn thương",
    vibe: 2,
    advice_up: "Mở lòng đón nhận tình cảm. Cho phép bản thân yêu thương và được yêu thương.",
    advice_rev: "Xem lại những gì khiến bạn đóng cửa trái tim. Chữa lành từng bước."
  },
  "Two of Cups": {
    name: "Two of Cups",
    meaning_up_vi: "Mối quan hệ đối tác, kết nối sâu sắc giữa hai người. Có thể là tình yêu, tình bạn hoặc hợp tác kinh doanh tốt đẹp.",
    meaning_rev_vi: "Mất cân bằng trong mối quan hệ hoặc thiếu kết nối. Có thể có sự hiểu lầm hoặc xung đột giữa hai bên.",
    summary_up: "kết nối sâu sắc, mối quan hệ tốt đẹp",
    summary_rev: "mất cân bằng, thiếu kết nối",
    vibe: 2,
    advice_up: "Đầu tư vào mối quan hệ quan trọng. Giao tiếp cởi mở và chân thành.",
    advice_rev: "Nói chuyện thẳng thắn về những gì đang thiếu. Tìm lại sự cân bằng."
  },
  "Three of Cups": {
    name: "Three of Cups",
    meaning_up_vi: "Lễ kỷ niệm, tình bạn và niềm vui chia sẻ. Đây là lúc tụ họp với những người thân thiết và tận hưởng khoảnh khắc vui vẻ.",
    meaning_rev_vi: "Cô đơn trong đám đông hoặc xung đột trong nhóm bạn. Có thể có drama hoặc gossiping ảnh hưởng đến mối quan hệ.",
    summary_up: "lễ kỷ niệm, tình bạn, niềm vui",
    summary_rev: "cô đơn, xung đột trong nhóm",
    vibe: 2,
    advice_up: "Dành thời gian với bạn bè. Chia sẻ niềm vui nhân đôi niềm vui.",
    advice_rev: "Tránh xa drama. Chọn lọc những người bạn đáng tin cậy."
  },
  "Four of Cups": {
    name: "Four of Cups",
    meaning_up_vi: "Chán nản, thờ ơ hoặc không hài lòng với những gì đang có. Bạn có thể đang bỏ lỡ cơ hội tốt vì quá tập trung vào điều tiêu cực.",
    meaning_rev_vi: "Bắt đầu nhận ra cơ hội xung quanh hoặc thoát khỏi trạng thái thờ ơ. Sẵn sàng thử điều mới.",
    summary_up: "chán nản, bỏ lỡ cơ hội",
    summary_rev: "nhận ra cơ hội, sẵn sàng thử mới",
    vibe: -1,
    advice_up: "Nhìn quanh xem có cơ hội nào bạn đang bỏ qua. Thay đổi góc nhìn.",
    advice_rev: "Nắm bắt cơ hội mới. Đừng để quá khứ ảnh hưởng đến tương lai."
  },
  "Five of Cups": {
    name: "Five of Cups",
    meaning_up_vi: "Thất vọng, mất mát hoặc tiếc nuối. Bạn đang tập trung vào những gì đã mất thay vì những gì còn lại. Đây là giai đoạn đau buồn.",
    meaning_rev_vi: "Bắt đầu hồi phục sau mất mát. Chấp nhận thực tế và sẵn sàng tiến lên. Nhìn thấy ánh sáng cuối đường hầm.",
    summary_up: "thất vọng, tiếc nuối, tập trung vào mất mát",
    summary_rev: "hồi phục, chấp nhận và tiến lên",
    vibe: -2,
    advice_up: "Cho phép bản thân buồn nhưng đừng mắc kẹt. Nhìn vào những gì còn lại.",
    advice_rev: "Tiếp tục quá trình chữa lành. Bạn đang đi đúng hướng."
  },
  "Six of Cups": {
    name: "Six of Cups",
    meaning_up_vi: "Ký ức, hoài niệm và sự ngây thơ. Có thể gặp lại người từ quá khứ hoặc nhớ về thời thơ ấu. Sự đơn giản và chân thành.",
    meaning_rev_vi: "Mắc kẹt trong quá khứ hoặc nhìn quá khứ qua lăng kính màu hồng. Cần sống với hiện tại hơn.",
    summary_up: "hoài niệm, ký ức đẹp, sự chân thành",
    summary_rev: "mắc kẹt trong quá khứ",
    vibe: 1,
    advice_up: "Trân trọng những ký ức tốt đẹp nhưng đừng sống trong đó.",
    advice_rev: "Buông bỏ quá khứ và tập trung vào hiện tại. Tạo kỷ niệm mới."
  },
  "Seven of Cups": {
    name: "Seven of Cups",
    meaning_up_vi: "Quá nhiều lựa chọn hoặc sống trong ảo tưởng. Bạn đang mơ mộng thay vì hành động. Cần phân biệt giữa thực tế và mong ước.",
    meaning_rev_vi: "Bắt đầu tập trung và đưa ra quyết định rõ ràng. Thoát khỏi ảo tưởng để thấy thực tế.",
    summary_up: "quá nhiều lựa chọn, sống trong ảo tưởng",
    summary_rev: "tập trung hơn, nhìn rõ thực tế",
    vibe: 0,
    advice_up: "Dừng mơ mộng và bắt đầu hành động. Chọn một mục tiêu và theo đuổi.",
    advice_rev: "Tốt lắm, tiếp tục tập trung vào những gì thực sự quan trọng."
  },
  "Eight of Cups": {
    name: "Eight of Cups",
    meaning_up_vi: "Rời bỏ điều gì đó không còn phục vụ bạn. Dù khó khăn nhưng bạn biết đã đến lúc tiến lên. Tìm kiếm ý nghĩa sâu sắc hơn.",
    meaning_rev_vi: "Sợ rời bỏ hoặc mắc kẹt trong tình huống không hạnh phúc. Có thể đang trốn tránh quyết định khó khăn.",
    summary_up: "rời bỏ để tìm điều tốt hơn",
    summary_rev: "sợ rời bỏ, mắc kẹt",
    vibe: 0,
    advice_up: "Dũng cảm rời bỏ những gì không còn phù hợp. Điều tốt hơn đang chờ.",
    advice_rev: "Đối mặt với sự thật về tình huống hiện tại. Quyết định là cần thiết."
  },
  "Nine of Cups": {
    name: "Nine of Cups",
    meaning_up_vi: "Ước mơ thành hiện thực, sự hài lòng và mãn nguyện. Bạn đang có những gì mình mong muốn. Đây là thời điểm biết ơn.",
    meaning_rev_vi: "Thất vọng vì kỳ vọng không thành hoặc hạnh phúc hời hợt. Có thể đang thiếu điều gì đó dù bề ngoài có vẻ đủ đầy.",
    summary_up: "ước mơ thành hiện thực, mãn nguyện",
    summary_rev: "thất vọng, hạnh phúc hời hợt",
    vibe: 2,
    advice_up: "Tận hưởng và biết ơn những gì bạn có. Chia sẻ hạnh phúc với người khác.",
    advice_rev: "Xem xét lại những gì thực sự quan trọng với bạn. Hạnh phúc thật đến từ đâu?"
  },
  "Ten of Cups": {
    name: "Ten of Cups",
    meaning_up_vi: "Hạnh phúc gia đình, sự hòa thuận và tình yêu trọn vẹn. Đây là trạng thái viên mãn trong các mối quan hệ. Ước mơ về gia đình thành hiện thực.",
    meaning_rev_vi: "Xung đột gia đình hoặc kỳ vọng không thực tế về hạnh phúc. Có thể đang thiếu sự hòa thuận trong quan hệ thân thiết.",
    summary_up: "hạnh phúc gia đình, tình yêu trọn vẹn",
    summary_rev: "xung đột gia đình, kỳ vọng không thực tế",
    vibe: 2,
    advice_up: "Trân trọng gia đình và những người thân yêu. Đây là tài sản quý giá nhất.",
    advice_rev: "Làm việc để hàn gắn mối quan hệ gia đình. Điều chỉnh kỳ vọng thực tế hơn."
  },
  "Page of Cups": {
    name: "Page of Cups",
    meaning_up_vi: "Tin tức về cảm xúc, sự sáng tạo hoặc trực giác mới. Một cơ hội để khám phá cảm xúc với sự tò mò của người mới bắt đầu.",
    meaning_rev_vi: "Cảm xúc chưa trưởng thành hoặc sáng tạo bị chặn. Có thể đang quá nhạy cảm hoặc không kết nối được với trực giác.",
    summary_up: "tin tức cảm xúc, sáng tạo, tò mò",
    summary_rev: "cảm xúc chưa trưởng thành, sáng tạo bị chặn",
    vibe: 1,
    advice_up: "Lắng nghe trực giác và cho phép sáng tạo tự do. Đón nhận cảm xúc mới.",
    advice_rev: "Làm việc với cảm xúc của mình thay vì trốn tránh. Thử các hoạt động sáng tạo."
  },
  "Knight of Cups": {
    name: "Knight of Cups",
    meaning_up_vi: "Lãng mạn, sáng tạo và theo đuổi ước mơ. Bạn được dẫn dắt bởi trái tim. Có thể có lời mời hoặc đề nghị hấp dẫn.",
    meaning_rev_vi: "Ảo tưởng, thất thường về cảm xúc hoặc lời hứa không thực hiện. Cần thực tế hơn về mong đợi.",
    summary_up: "lãng mạn, theo đuổi ước mơ",
    summary_rev: "ảo tưởng, lời hứa không thực hiện",
    vibe: 1,
    advice_up: "Theo đuổi đam mê nhưng giữ chân trên mặt đất. Cân bằng tim và lý trí.",
    advice_rev: "Xem xét kỹ các lời hứa và đề nghị. Đừng để cảm xúc che mờ phán đoán."
  },
  "Queen of Cups": {
    name: "Queen of Cups",
    meaning_up_vi: "Trực giác mạnh mẽ, chăm sóc và hiểu biết cảm xúc sâu sắc. Bạn có khả năng kết nối với người khác ở mức độ sâu.",
    meaning_rev_vi: "Cảm xúc quá tải hoặc quá phụ thuộc vào người khác. Có thể đang bỏ bê nhu cầu của bản thân.",
    summary_up: "trực giác mạnh, chăm sóc, hiểu cảm xúc",
    summary_rev: "cảm xúc quá tải, bỏ bê bản thân",
    vibe: 1,
    advice_up: "Tin vào trực giác và khả năng đồng cảm của mình. Dùng nó để giúp người khác.",
    advice_rev: "Chăm sóc bản thân trước khi chăm sóc người khác. Đặt ranh giới cảm xúc."
  },
  "King of Cups": {
    name: "King of Cups",
    meaning_up_vi: "Kiểm soát cảm xúc, khôn ngoan và cân bằng giữa lý trí và trái tim. Bạn có thể xử lý tình huống cảm xúc phức tạp một cách bình tĩnh.",
    meaning_rev_vi: "Kìm nén cảm xúc hoặc lạnh lùng. Có thể đang dùng cảm xúc để thao túng hoặc mất kiểm soát cảm xúc.",
    summary_up: "kiểm soát cảm xúc, khôn ngoan, cân bằng",
    summary_rev: "kìm nén hoặc mất kiểm soát cảm xúc",
    vibe: 1,
    advice_up: "Dẫn dắt bằng sự đồng cảm và bình tĩnh. Cân bằng cảm xúc và logic.",
    advice_rev: "Cho phép bản thân cảm nhận. Đừng kìm nén quá nhiều."
  }
};

// Minor Arcana - Swords (14 cards)
const swords: Record<string, CardMeaning> = {
  "Ace of Swords": {
    name: "Ace of Swords",
    meaning_up_vi: "Sự rõ ràng trong suy nghĩ, ý tưởng đột phá hoặc sự thật được tiết lộ. Đây là thời điểm tốt để đưa ra quyết định quan trọng.",
    meaning_rev_vi: "Suy nghĩ rối loạn, thông tin sai lệch hoặc quyết định sai lầm. Cần làm rõ trước khi hành động.",
    summary_up: "sự rõ ràng, ý tưởng đột phá",
    summary_rev: "suy nghĩ rối loạn, cần làm rõ",
    vibe: 1,
    advice_up: "Sử dụng sự rõ ràng này để đưa ra quyết định quan trọng. Nói sự thật.",
    advice_rev: "Dừng lại và làm rõ thông tin trước khi quyết định. Đừng vội vàng."
  },
  "Two of Swords": {
    name: "Two of Swords",
    meaning_up_vi: "Bế tắc, không thể quyết định hoặc từ chối nhìn thấy sự thật. Bạn đang tránh một lựa chọn khó khăn.",
    meaning_rev_vi: "Bắt đầu thấy rõ hơn hoặc bị buộc phải quyết định. Sự trì hoãn không còn là lựa chọn.",
    summary_up: "bế tắc, không thể quyết định",
    summary_rev: "bắt đầu thấy rõ, bị buộc quyết định",
    vibe: -1,
    advice_up: "Đối mặt với quyết định thay vì trốn tránh. Thu thập thông tin cần thiết.",
    advice_rev: "Đưa ra quyết định dù khó. Trì hoãn chỉ làm tình huống tệ hơn."
  },
  "Three of Swords": {
    name: "Three of Swords",
    meaning_up_vi: "Đau lòng, phản bội hoặc mất mát. Đây là nỗi đau cần được cảm nhận để chữa lành. Sự thật đau đớn đang được tiết lộ.",
    meaning_rev_vi: "Bắt đầu hồi phục sau đau thương hoặc đang kìm nén nỗi đau. Cần thời gian để chữa lành hoàn toàn.",
    summary_up: "đau lòng, phản bội, sự thật đau đớn",
    summary_rev: "hồi phục sau đau thương, cần thời gian",
    vibe: -2,
    advice_up: "Cho phép bản thân đau buồn. Đây là bước cần thiết để chữa lành.",
    advice_rev: "Tiếp tục quá trình chữa lành. Đừng vội vàng hoặc kìm nén cảm xúc."
  },
  "Four of Swords": {
    name: "Four of Swords",
    meaning_up_vi: "Nghỉ ngơi, phục hồi và suy ngẫm. Sau giai đoạn căng thẳng, bạn cần thời gian để hồi phục sức lực và tinh thần.",
    meaning_rev_vi: "Bồn chồn, không thể nghỉ ngơi hoặc bị ép phải hoạt động trở lại trước khi sẵn sàng.",
    summary_up: "nghỉ ngơi, phục hồi, suy ngẫm",
    summary_rev: "không thể nghỉ ngơi, bồn chồn",
    vibe: 0,
    advice_up: "Dành thời gian nghỉ ngơi thực sự. Đừng cảm thấy tội lỗi vì cần thời gian cho bản thân.",
    advice_rev: "Tìm cách thư giãn dù lịch trình bận rộn. Sức khỏe là ưu tiên hàng đầu."
  },
  "Five of Swords": {
    name: "Five of Swords",
    meaning_up_vi: "Xung đột, thắng lợi với cái giá đắt hoặc thất bại. Có thể có người hành xử không công bằng. Chiến đấu không đáng.",
    meaning_rev_vi: "Muốn hòa giải sau xung đột hoặc học từ thất bại. Nhận ra rằng chiến thắng bằng mọi giá không đáng.",
    summary_up: "xung đột, thắng lợi với cái giá đắt",
    summary_rev: "muốn hòa giải, học từ thất bại",
    vibe: -2,
    advice_up: "Xem xét liệu cuộc chiến này có đáng không. Đôi khi rút lui là chiến thắng.",
    advice_rev: "Mở lòng hòa giải. Học bài học và tiến lên."
  },
  "Six of Swords": {
    name: "Six of Swords",
    meaning_up_vi: "Chuyển đổi, rời bỏ khó khăn để đến nơi tốt hơn. Dù còn buồn về những gì để lại, bạn đang đi đúng hướng.",
    meaning_rev_vi: "Khó khăn trong việc tiến lên hoặc mắc kẹt trong tình huống xấu. Có thể đang kháng cự sự thay đổi cần thiết.",
    summary_up: "chuyển đổi tích cực, rời bỏ khó khăn",
    summary_rev: "khó tiến lên, mắc kẹt",
    vibe: 1,
    advice_up: "Tiếp tục hành trình dù có chút buồn. Nơi tốt hơn đang chờ phía trước.",
    advice_rev: "Xác định điều gì đang giữ bạn lại. Tìm sự hỗ trợ để tiến lên."
  },
  "Seven of Swords": {
    name: "Seven of Swords",
    meaning_up_vi: "Hành động lén lút, chiến lược hoặc cần thận trọng. Có thể ai đó không hoàn toàn trung thực. Cũng có thể bạn cần hành động khéo léo.",
    meaning_rev_vi: "Sự thật bị phơi bày hoặc muốn sống trung thực hơn. Hối hận về hành vi không thành thật trước đó.",
    summary_up: "cần thận trọng, có thể có sự không trung thực",
    summary_rev: "sự thật phơi bày, muốn sống trung thực",
    vibe: -1,
    advice_up: "Cẩn thận với những gì bạn chia sẻ. Xem xét động cơ của người khác.",
    advice_rev: "Sống trung thực hơn. Sửa chữa những sai lầm nếu có thể."
  },
  "Eight of Swords": {
    name: "Eight of Swords",
    meaning_up_vi: "Cảm giác bị mắc kẹt, giới hạn bản thân hoặc suy nghĩ tiêu cực. Nhưng thực tế bạn có nhiều lựa chọn hơn bạn nghĩ.",
    meaning_rev_vi: "Bắt đầu thấy lối thoát hoặc giải phóng bản thân khỏi giới hạn tự áp đặt. Sẵn sàng hành động.",
    summary_up: "cảm giác mắc kẹt, tự giới hạn",
    summary_rev: "thấy lối thoát, giải phóng bản thân",
    vibe: -1,
    advice_up: "Xem xét lại niềm tin đang giới hạn bạn. Bạn có nhiều sức mạnh hơn bạn nghĩ.",
    advice_rev: "Tiếp tục phá vỡ những rào cản trong tâm trí. Bạn đang tiến bộ."
  },
  "Nine of Swords": {
    name: "Nine of Swords",
    meaning_up_vi: "Lo lắng, mất ngủ hoặc suy nghĩ quá nhiều. Nỗi sợ có thể đang bị phóng đại trong tâm trí bạn. Đây là lúc đối mặt với lo âu.",
    meaning_rev_vi: "Bắt đầu vượt qua lo lắng hoặc tìm được cách đối phó. Ánh sáng đang chiếu vào bóng tối.",
    summary_up: "lo lắng, mất ngủ, suy nghĩ quá nhiều",
    summary_rev: "bắt đầu vượt qua lo lắng",
    vibe: -2,
    advice_up: "Chia sẻ nỗi lo với người tin tưởng. Phân biệt lo lắng thực tế và tưởng tượng.",
    advice_rev: "Tiếp tục các phương pháp đang giúp bạn. Bạn đang đi đúng hướng."
  },
  "Ten of Swords": {
    name: "Ten of Swords",
    meaning_up_vi: "Kết thúc đau đớn, chạm đáy hoặc phản bội. Đây là điểm thấp nhất nhưng cũng có nghĩa là mọi thứ chỉ có thể tốt lên từ đây.",
    meaning_rev_vi: "Bắt đầu hồi phục sau khủng hoảng. Điều tồi tệ nhất đã qua. Từ chối chấp nhận kết thúc.",
    summary_up: "kết thúc đau đớn, chạm đáy",
    summary_rev: "bắt đầu hồi phục, điều tồi tệ đã qua",
    vibe: -2,
    advice_up: "Chấp nhận kết thúc này. Từ đáy, bạn chỉ có thể đi lên.",
    advice_rev: "Cho phép bản thân hồi phục hoàn toàn. Đừng vội quay lại quá sớm."
  },
  "Page of Swords": {
    name: "Page of Swords",
    meaning_up_vi: "Tò mò, ham học hỏi và sẵn sàng giao tiếp. Tin tức hoặc thông tin mới đang đến. Cách tiếp cận mới mẻ với vấn đề.",
    meaning_rev_vi: "Tin đồn, giao tiếp kém hoặc ý tưởng chưa chín. Có thể đang nói mà không suy nghĩ hoặc thiếu thông tin.",
    summary_up: "tò mò, ham học, thông tin mới",
    summary_rev: "tin đồn, giao tiếp kém",
    vibe: 1,
    advice_up: "Đặt câu hỏi và tìm kiếm thông tin. Giao tiếp rõ ràng và trực tiếp.",
    advice_rev: "Xác minh thông tin trước khi chia sẻ. Suy nghĩ trước khi nói."
  },
  "Knight of Swords": {
    name: "Knight of Swords",
    meaning_up_vi: "Hành động nhanh, quyết đoán và theo đuổi sự thật. Bạn có động lực mạnh mẽ để đạt mục tiêu. Đôi khi quá nhanh.",
    meaning_rev_vi: "Hấp tấp, thiếu kế hoạch hoặc hung hăng. Hành động mà không suy nghĩ về hậu quả.",
    summary_up: "hành động nhanh, quyết đoán",
    summary_rev: "hấp tấp, thiếu kế hoạch",
    vibe: 1,
    advice_up: "Hành động quyết đoán nhưng có kế hoạch. Tốc độ cần đi kèm với sự khôn ngoan.",
    advice_rev: "Chậm lại và suy nghĩ. Tốc độ không phải lúc nào cũng là điều tốt."
  },
  "Queen of Swords": {
    name: "Queen of Swords",
    meaning_up_vi: "Thông minh, độc lập và thẳng thắn. Bạn có khả năng nhìn thấy sự thật qua màn sương và giao tiếp trực tiếp.",
    meaning_rev_vi: "Lạnh lùng, chỉ trích hoặc cay đắng. Có thể đang dùng lời nói để làm tổn thương hoặc tự cô lập.",
    summary_up: "thông minh, độc lập, thẳng thắn",
    summary_rev: "lạnh lùng, chỉ trích, cay đắng",
    vibe: 1,
    advice_up: "Sử dụng sự thông minh và thẳng thắn một cách xây dựng. Nói sự thật với lòng trắc ẩn.",
    advice_rev: "Xem xét tác động của lời nói. Thẳng thắn không có nghĩa là tàn nhẫn."
  },
  "King of Swords": {
    name: "King of Swords",
    meaning_up_vi: "Lý trí, công bằng và có thẩm quyền trong giao tiếp. Bạn có thể đưa ra quyết định dựa trên logic và sự thật, không để cảm xúc chi phối.",
    meaning_rev_vi: "Lạm dụng quyền lực trí tuệ, thao túng hoặc quá độc đoán. Thiếu sự đồng cảm trong giao tiếp.",
    summary_up: "lý trí, công bằng, có thẩm quyền",
    summary_rev: "lạm dụng quyền lực, độc đoán",
    vibe: 1,
    advice_up: "Quyết định dựa trên logic và công bằng. Giao tiếp với sự rõ ràng.",
    advice_rev: "Lắng nghe góc nhìn của người khác. Quyền lực đi kèm trách nhiệm."
  }
};

// Minor Arcana - Pentacles (14 cards)
const pentacles: Record<string, CardMeaning> = {
  "Ace of Pentacles": {
    name: "Ace of Pentacles",
    meaning_up_vi: "Cơ hội tài chính mới, khởi đầu vật chất hoặc nền tảng vững chắc. Đây là thời điểm tốt để đầu tư vào tương lai.",
    meaning_rev_vi: "Cơ hội tài chính bị bỏ lỡ hoặc kế hoạch tài chính kém. Cần cẩn thận với tiền bạc.",
    summary_up: "cơ hội tài chính mới, nền tảng vững",
    summary_rev: "bỏ lỡ cơ hội, kế hoạch kém",
    vibe: 2,
    advice_up: "Nắm bắt cơ hội tài chính. Xây dựng nền tảng cho sự ổn định lâu dài.",
    advice_rev: "Xem lại kế hoạch tài chính. Đừng bỏ qua cơ hội vì thiếu chuẩn bị."
  },
  "Two of Pentacles": {
    name: "Two of Pentacles",
    meaning_up_vi: "Cân bằng giữa nhiều việc, quản lý tài chính hoặc thích ứng với thay đổi. Bạn đang phải làm nhiều việc cùng lúc.",
    meaning_rev_vi: "Mất cân bằng, quá tải hoặc quản lý tài chính kém. Cần ưu tiên và đơn giản hóa.",
    summary_up: "cân bằng nhiều việc, thích ứng thay đổi",
    summary_rev: "mất cân bằng, quá tải",
    vibe: 0,
    advice_up: "Duy trì sự linh hoạt. Ưu tiên những gì quan trọng nhất.",
    advice_rev: "Giảm bớt gánh nặng. Không thể làm tất cả cùng lúc."
  },
  "Three of Pentacles": {
    name: "Three of Pentacles",
    meaning_up_vi: "Làm việc nhóm, hợp tác và được công nhận về kỹ năng. Chất lượng công việc của bạn được đánh giá cao.",
    meaning_rev_vi: "Thiếu hợp tác, xung đột trong công việc hoặc công việc không được công nhận. Cần cải thiện giao tiếp nhóm.",
    summary_up: "làm việc nhóm tốt, được công nhận",
    summary_rev: "thiếu hợp tác, không được công nhận",
    vibe: 1,
    advice_up: "Hợp tác với người khác. Chia sẻ kiến thức và học hỏi từ đồng nghiệp.",
    advice_rev: "Cải thiện giao tiếp trong nhóm. Xem xét lại vai trò của bạn."
  },
  "Four of Pentacles": {
    name: "Four of Pentacles",
    meaning_up_vi: "An toàn tài chính, tiết kiệm hoặc giữ chặt những gì mình có. Cần cân nhắc giữa an toàn và sự keo kiệt.",
    meaning_rev_vi: "Quá keo kiệt hoặc ngược lại - chi tiêu quá tay. Mất cân bằng trong việc quản lý tài sản.",
    summary_up: "an toàn tài chính, tiết kiệm",
    summary_rev: "quá keo kiệt hoặc chi tiêu quá",
    vibe: 0,
    advice_up: "Tiết kiệm là tốt nhưng đừng để nó thành ám ảnh. Cân bằng giữa giữ và cho đi.",
    advice_rev: "Xem lại thói quen chi tiêu. Tìm điểm cân bằng phù hợp."
  },
  "Five of Pentacles": {
    name: "Five of Pentacles",
    meaning_up_vi: "Khó khăn tài chính, cảm giác bị bỏ rơi hoặc thiếu thốn. Có thể đang bỏ qua sự giúp đỡ có sẵn.",
    meaning_rev_vi: "Bắt đầu phục hồi sau khó khăn tài chính. Tìm được sự hỗ trợ hoặc cách vượt qua.",
    summary_up: "khó khăn tài chính, cảm giác thiếu thốn",
    summary_rev: "bắt đầu phục hồi, tìm được hỗ trợ",
    vibe: -2,
    advice_up: "Tìm kiếm sự giúp đỡ - nó có sẵn nếu bạn chịu nhìn. Đây chỉ là giai đoạn tạm thời.",
    advice_rev: "Tiếp tục nỗ lực phục hồi. Đừng ngại nhận sự giúp đỡ."
  },
  "Six of Pentacles": {
    name: "Six of Pentacles",
    meaning_up_vi: "Cho và nhận, sự hào phóng và cân bằng tài chính. Có thể đang cho đi hoặc nhận được sự giúp đỡ.",
    meaning_rev_vi: "Mất cân bằng trong cho và nhận. Có thể đang bị lợi dụng hoặc có điều kiện khi cho đi.",
    summary_up: "cho và nhận cân bằng, hào phóng",
    summary_rev: "mất cân bằng, bị lợi dụng",
    vibe: 1,
    advice_up: "Cho đi khi có thể, nhận khi cần. Duy trì sự cân bằng trong các mối quan hệ tài chính.",
    advice_rev: "Xem xét lại các mối quan hệ cho-nhận. Đặt ranh giới rõ ràng."
  },
  "Seven of Pentacles": {
    name: "Seven of Pentacles",
    meaning_up_vi: "Đánh giá tiến độ, kiên nhẫn chờ đợi kết quả. Công sức đã bỏ ra sẽ có kết quả nhưng cần thời gian.",
    meaning_rev_vi: "Nóng vội muốn có kết quả hoặc thất vọng với tiến độ. Có thể cần thay đổi chiến lược.",
    summary_up: "đánh giá tiến độ, kiên nhẫn chờ kết quả",
    summary_rev: "nóng vội, thất vọng với tiến độ",
    vibe: 0,
    advice_up: "Kiên nhẫn - kết quả sẽ đến. Sử dụng thời gian chờ đợi để đánh giá và điều chỉnh.",
    advice_rev: "Xem lại liệu chiến lược hiện tại có hiệu quả. Điều chỉnh nếu cần."
  },
  "Eight of Pentacles": {
    name: "Eight of Pentacles",
    meaning_up_vi: "Chăm chỉ, hoàn thiện kỹ năng và chú ý đến chi tiết. Đây là thời điểm tập trung vào việc làm tốt công việc.",
    meaning_rev_vi: "Làm việc qua loa, thiếu động lực hoặc hoàn thiện quá mức. Cần tìm lại đam mê trong công việc.",
    summary_up: "chăm chỉ, hoàn thiện kỹ năng",
    summary_rev: "làm qua loa, thiếu động lực",
    vibe: 1,
    advice_up: "Tiếp tục rèn luyện kỹ năng. Chất lượng đến từ sự chú ý đến chi tiết.",
    advice_rev: "Tìm lại mục đích trong công việc. Đừng để nó trở thành việc máy móc."
  },
  "Nine of Pentacles": {
    name: "Nine of Pentacles",
    meaning_up_vi: "Độc lập tài chính, tự do và tận hưởng thành quả. Bạn đã xây dựng được cuộc sống ổn định nhờ nỗ lực.",
    meaning_rev_vi: "Quá phụ thuộc vào người khác hoặc sống quá xa hoa. Cần cân nhắc về sự độc lập thực sự.",
    summary_up: "độc lập tài chính, tận hưởng thành quả",
    summary_rev: "phụ thuộc người khác, sống quá xa hoa",
    vibe: 2,
    advice_up: "Tận hưởng những gì bạn đã xây dựng. Bạn xứng đáng với điều này.",
    advice_rev: "Xem xét lại sự độc lập tài chính của bạn. Xây dựng nền tảng riêng."
  },
  "Ten of Pentacles": {
    name: "Ten of Pentacles",
    meaning_up_vi: "Thành công lâu dài, di sản gia đình và sự ổn định vững chắc. Đây là kết quả của nhiều thế hệ nỗ lực.",
    meaning_rev_vi: "Xung đột gia đình về tài sản hoặc mất mát tài chính. Có thể có vấn đề với di sản hoặc thừa kế.",
    summary_up: "thành công lâu dài, di sản gia đình",
    summary_rev: "xung đột về tài sản, mất mát",
    vibe: 2,
    advice_up: "Trân trọng những gì gia đình đã xây dựng. Tiếp tục di sản tốt đẹp.",
    advice_rev: "Giải quyết xung đột gia đình về tài chính. Tiền bạc không quan trọng bằng mối quan hệ."
  },
  "Page of Pentacles": {
    name: "Page of Pentacles",
    meaning_up_vi: "Học hỏi, cơ hội mới về tài chính hoặc sự nghiệp. Bạn đang ở giai đoạn đầu của một dự án thực tế.",
    meaning_rev_vi: "Thiếu tập trung, bỏ dở giữa chừng hoặc cơ hội bị lỡ. Cần cam kết nhiều hơn.",
    summary_up: "học hỏi, cơ hội mới về sự nghiệp",
    summary_rev: "thiếu tập trung, bỏ dở giữa chừng",
    vibe: 1,
    advice_up: "Đầu tư vào việc học. Cơ hội tốt đang đến - hãy sẵn sàng.",
    advice_rev: "Cam kết hoàn thành những gì đã bắt đầu. Tập trung vào một mục tiêu."
  },
  "Knight of Pentacles": {
    name: "Knight of Pentacles",
    meaning_up_vi: "Làm việc chăm chỉ, đáng tin cậy và tiến bộ chắc chắn. Bạn đang tiến về phía trước một cách ổn định.",
    meaning_rev_vi: "Quá cứng nhắc, tiến độ quá chậm hoặc lười biếng. Cần tìm cân bằng giữa cẩn thận và hành động.",
    summary_up: "chăm chỉ, đáng tin cậy, tiến bộ chắc",
    summary_rev: "cứng nhắc, quá chậm, lười biếng",
    vibe: 1,
    advice_up: "Tiếp tục làm việc kiên trì. Thành công đến từ sự nhất quán.",
    advice_rev: "Linh hoạt hơn trong cách tiếp cận. Đôi khi cần mạo hiểm."
  },
  "Queen of Pentacles": {
    name: "Queen of Pentacles",
    meaning_up_vi: "Chăm sóc, thực tế và tạo ra sự thoải mái cho người khác. Bạn biết cách quản lý gia đình và tài chính.",
    meaning_rev_vi: "Quá tập trung vào vật chất hoặc bỏ bê bản thân vì chăm sóc người khác. Cần cân bằng.",
    summary_up: "chăm sóc, thực tế, quản lý tốt",
    summary_rev: "quá tập trung vật chất, bỏ bê bản thân",
    vibe: 1,
    advice_up: "Tiếp tục chăm sóc nhưng đừng quên bản thân. Cân bằng công việc và gia đình.",
    advice_rev: "Chăm sóc bản thân trước. Bạn không thể cho đi từ cốc rỗng."
  },
  "King of Pentacles": {
    name: "King of Pentacles",
    meaning_up_vi: "Thành công tài chính, ổn định và khả năng lãnh đạo trong kinh doanh. Bạn đã xây dựng được nền tảng vững chắc.",
    meaning_rev_vi: "Tham lam, quá tập trung vào tiền bạc hoặc quản lý tài chính kém. Cần xem lại giá trị.",
    summary_up: "thành công tài chính, lãnh đạo kinh doanh",
    summary_rev: "tham lam, quá tập trung tiền bạc",
    vibe: 2,
    advice_up: "Sử dụng thành công để giúp đỡ người khác. Chia sẻ kinh nghiệm.",
    advice_rev: "Nhớ rằng tiền bạc là công cụ, không phải mục đích. Cân bằng lại giá trị."
  }
};

// Combine all cards
export const allCardMeanings: Record<string, CardMeaning> = {
  ...majorArcana,
  ...wands,
  ...cups,
  ...swords,
  ...pentacles
};

// Get Vietnamese meaning for a card
export const getCardMeaning = (cardName: string, isReversed: boolean): CardMeaning | null => {
  const meaning = allCardMeanings[cardName];
  if (!meaning) return null;
  return meaning;
};

// Get interpretation text
export const getInterpretation = (
  cardName: string, 
  isReversed: boolean, 
  position: string,
  category: string
): string => {
  const meaning = allCardMeanings[cardName];
  if (!meaning) return `Không tìm thấy thông tin cho lá ${cardName}`;
  
  const positionText = isReversed 
    ? meaning.meaning_rev_vi 
    : meaning.meaning_up_vi;
  
  return positionText;
};

// Get actionable advice
export const getAdvice = (cardName: string, isReversed: boolean): string => {
  const meaning = allCardMeanings[cardName];
  if (!meaning) return "";
  return isReversed ? meaning.advice_rev : meaning.advice_up;
};

// Category-specific connectors
const categoryConnectors: Record<string, {
  pastIntro: string;
  presentIntro: string;
  futureIntro: string;
  connector1: string;
  connector2: string;
}> = {
  love: {
    pastIntro: "Trong tình yêu trước đây, bạn đã",
    presentIntro: "Hiện tại trong chuyện tình cảm, bạn đang",
    futureIntro: "Sắp tới về mặt tình cảm, bạn có thể",
    connector1: "Điều này đã dẫn đến việc",
    connector2: "Từ đó, triển vọng cho thấy"
  },
  career: {
    pastIntro: "Về sự nghiệp trước đây, bạn đã",
    presentIntro: "Hiện tại trong công việc, bạn đang",
    futureIntro: "Trong tương lai gần, công việc của bạn có thể",
    connector1: "Kinh nghiệm đó đã giúp bạn",
    connector2: "Với đà này, có thể dự đoán"
  },
  finance: {
    pastIntro: "Về tài chính trước đây, bạn đã trải qua",
    presentIntro: "Hiện tại về tiền bạc, bạn đang",
    futureIntro: "Triển vọng tài chính sắp tới cho thấy",
    connector1: "Điều này ảnh hưởng đến việc",
    connector2: "Dựa trên xu hướng này"
  },
  family: {
    pastIntro: "Trong gia đình trước đây, bạn đã",
    presentIntro: "Hiện tại với gia đình, bạn đang",
    futureIntro: "Sắp tới trong gia đình, có thể",
    connector1: "Điều này tác động đến",
    connector2: "Từ đó có thể thấy"
  },
  health: {
    pastIntro: "Về sức khỏe trước đây, bạn đã",
    presentIntro: "Hiện tại về sức khỏe, bạn đang",
    futureIntro: "Triển vọng sức khỏe sắp tới",
    connector1: "Điều này liên quan đến",
    connector2: "Với tình hình này"
  }
};

// Vibe descriptors based on total score
const getVibeDescriptor = (totalVibe: number): { descriptor: string; advice: string } => {
  if (totalVibe >= 5) {
    return {
      descriptor: "rất tích cực",
      advice: "Đây là giai đoạn thuận lợi. Hãy tận dụng năng lượng tốt này để hành động."
    };
  } else if (totalVibe >= 2) {
    return {
      descriptor: "khá tích cực",
      advice: "Tình hình đang khá ổn. Tiếp tục duy trì và phát triển những gì đang có."
    };
  } else if (totalVibe >= -1) {
    return {
      descriptor: "trung tính",
      advice: "Đây là giai đoạn chuyển tiếp. Hãy chuẩn bị và thận trọng trong quyết định."
    };
  } else if (totalVibe >= -4) {
    return {
      descriptor: "có thử thách",
      advice: "Sẽ có khó khăn nhưng không phải không vượt qua được. Kiên nhẫn và tìm sự hỗ trợ."
    };
  } else {
    return {
      descriptor: "cần lưu ý",
      advice: "Giai đoạn này cần đặc biệt cẩn trọng. Tập trung giải quyết từng vấn đề một."
    };
  }
};

// Main Synthesis Engine
export interface SynthesisResult {
  overview: string;
  totalVibe: number;
  vibeDescriptor: string;
  generalAdvice: string;
}

export const synthesizeReading = (
  cards: Array<{ name: string; isReversed?: boolean }>,
  category: string
): SynthesisResult => {
  const categoryData = categoryConnectors[category] || categoryConnectors.love;
  
  // Get meanings for each card
  const card1 = allCardMeanings[cards[0]?.name];
  const card2 = allCardMeanings[cards[1]?.name];
  const card3 = allCardMeanings[cards[2]?.name];
  
  if (!card1 || !card2 || !card3) {
    return {
      overview: "Không thể tổng hợp kết quả - thiếu thông tin lá bài.",
      totalVibe: 0,
      vibeDescriptor: "không xác định",
      generalAdvice: "Vui lòng thử lại."
    };
  }
  
  // Calculate vibe
  const vibe1 = cards[0].isReversed ? -card1.vibe : card1.vibe;
  const vibe2 = cards[1].isReversed ? -card2.vibe : card2.vibe;
  const vibe3 = cards[2].isReversed ? -card3.vibe : card3.vibe;
  const totalVibe = vibe1 + vibe2 + vibe3;
  
  const { descriptor, advice } = getVibeDescriptor(totalVibe);
  
  // Get summaries
  const summary1 = cards[0].isReversed ? card1.summary_rev : card1.summary_up;
  const summary2 = cards[1].isReversed ? card2.summary_rev : card2.summary_up;
  const summary3 = cards[2].isReversed ? card3.summary_rev : card3.summary_up;
  
  // Build overview
  const overview = `${categoryData.pastIntro} ${summary1}. ${categoryData.connector1} ${summary2}. ${categoryData.connector2} ${summary3}.`;
  
  return {
    overview,
    totalVibe,
    vibeDescriptor: descriptor,
    generalAdvice: advice
  };
};
