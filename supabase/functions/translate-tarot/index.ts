import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface TarotCardInput {
  name: string;
  meaning_up: string;
  meaning_rev: string;
  isReversed?: boolean;
  position: string;
  category: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { cards } = await req.json() as { cards: TarotCardInput[] };
    
    if (!cards || cards.length === 0) {
      return new Response(
        JSON.stringify({ error: "No cards provided" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Translating ${cards.length} tarot cards...`);

    // Build prompt for all cards at once
    const cardsText = cards.map((card, index) => {
      const meaning = card.isReversed ? card.meaning_rev : card.meaning_up;
      return `Lá bài ${index + 1} - ${card.name} (Vị trí: ${card.position}, Chủ đề: ${card.category}${card.isReversed ? ', Lá ngược' : ''}):\n"${meaning}"`;
    }).join("\n\n");

    const systemPrompt = `Bạn là một chuyên gia Tarot kỳ bí và uyên bác. Nhiệm vụ của bạn là dịch và viết lại các đoạn mô tả ý nghĩa lá bài Tarot sang tiếng Việt theo phong cách:
- Huyền bí, truyền cảm hứng và sâu sắc
- Kết nối ý nghĩa lá bài với chủ đề và vị trí (Quá Khứ/Hiện Tại/Tương Lai)
- Giữ nguyên tên lá bài tiếng Anh
- Đưa ra lời khuyên cụ thể và tích cực
- Mỗi luận giải khoảng 3-4 câu

Trả về JSON array với format: [{"index": 0, "interpretation": "Luận giải tiếng Việt..."}, ...]`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: cardsText }
        ],
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Đang có quá nhiều yêu cầu, vui lòng thử lại sau." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Dịch vụ AI cần được nạp thêm credits." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Lỗi dịch vụ AI" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content || "";
    
    console.log("AI response received:", content.substring(0, 200));

    // Parse JSON from response
    let interpretations: { index: number; interpretation: string }[] = [];
    try {
      // Try to extract JSON array from response
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        interpretations = JSON.parse(jsonMatch[0]);
      } else {
        // Fallback: create simple interpretations
        interpretations = cards.map((_, index) => ({
          index,
          interpretation: content
        }));
      }
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", parseError);
      // Return the raw content split by cards
      interpretations = cards.map((_, index) => ({
        index,
        interpretation: content
      }));
    }

    console.log(`Successfully translated ${interpretations.length} cards`);

    return new Response(
      JSON.stringify({ interpretations }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in translate-tarot function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
