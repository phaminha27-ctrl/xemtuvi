import { useState, useEffect, useCallback } from "react";

export interface TarotCard {
  name_short: string;
  name: string;
  value: string;
  value_int: number;
  type: string;
  arcana: string;
  suit: string;
  meaning_up: string;
  meaning_rev: string;
  desc: string;
  // Vietnamese translations
  nameVi?: string;
}

const IMAGE_BASE_URL = "https://cdn.jsdelivr.net/gh/metabismuth/tarot-json/images";

// Normalize card name for image URL
const normalizeName = (name: string): string => {
  return name.toLowerCase().replace(/ /g, "_").replace(/-/g, "_");
};

// Vietnamese name translations for Major Arcana
const majorArcanaVi: { [key: string]: string } = {
  "The Fool": "Kẻ Ngốc",
  "The Magician": "Pháp Sư",
  "The High Priestess": "Nữ Tư Tế",
  "The Empress": "Hoàng Hậu",
  "The Emperor": "Hoàng Đế",
  "The Hierophant": "Giáo Hoàng",
  "The Lovers": "Tình Nhân",
  "The Chariot": "Cỗ Xe",
  "Strength": "Sức Mạnh",
  "The Hermit": "Ẩn Sĩ",
  "Wheel of Fortune": "Vòng Xoay Số Mệnh",
  "Justice": "Công Lý",
  "The Hanged Man": "Người Treo Ngược",
  "Death": "Tử Thần",
  "Temperance": "Điều Độ",
  "The Devil": "Ác Quỷ",
  "The Tower": "Tòa Tháp",
  "The Star": "Ngôi Sao",
  "The Moon": "Mặt Trăng",
  "The Sun": "Mặt Trời",
  "Judgement": "Phán Xét",
  "The World": "Thế Giới",
};

// Vietnamese name translations for Minor Arcana suits
const suitsVi: { [key: string]: string } = {
  "wands": "Gậy",
  "cups": "Cốc",
  "swords": "Kiếm",
  "pentacles": "Tiền",
};

const valuesVi: { [key: string]: string } = {
  "ace": "Át",
  "two": "Hai",
  "three": "Ba",
  "four": "Bốn",
  "five": "Năm",
  "six": "Sáu",
  "seven": "Bảy",
  "eight": "Tám",
  "nine": "Chín",
  "ten": "Mười",
  "page": "Thị Đồng",
  "knight": "Kỵ Sĩ",
  "queen": "Hoàng Hậu",
  "king": "Vua",
};

// Fisher-Yates shuffle algorithm
export const shuffleCards = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Get image URL for a card
export const getCardImageUrl = (card: TarotCard): string => {
  const base = IMAGE_BASE_URL;
  if (card.arcana === "Major Arcana") {
    return `${base}/major/${normalizeName(card.name)}.png`;
  }
  // Minor arcana - use card.suit directly (lowercase)
  const suit = card.suit.toLowerCase();
  return `${base}/minor/${suit}/${normalizeName(card.name)}.png`;
};

// Get Vietnamese name for a card
const getVietnameseName = (card: TarotCard): string => {
  if (card.type === "major") {
    return majorArcanaVi[card.name] || card.name;
  } else {
    // Minor arcana
    const suit = card.name_short.substring(0, 2);
    const suitName = suit === "wa" ? suitsVi["wands"] :
                    suit === "cu" ? suitsVi["cups"] :
                    suit === "sw" ? suitsVi["swords"] :
                    suit === "pe" ? suitsVi["pentacles"] : "";
    
    const valueLower = card.value.toLowerCase();
    const valueVi = valuesVi[valueLower] || card.value;
    
    return `${valueVi} ${suitName}`;
  }
};

export const useTarotCards = () => {
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://tarotapi.dev/api/v1/cards");
        
        if (!response.ok) {
          throw new Error("Failed to fetch tarot cards");
        }
        
        const data = await response.json();
        
        // Add Vietnamese names to cards
        const cardsWithVi = data.cards.map((card: TarotCard) => ({
          ...card,
          nameVi: getVietnameseName(card),
        }));
        
        setCards(cardsWithVi);
        setError(null);
      } catch (err) {
        console.error("Error fetching tarot cards:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  const getShuffledCards = useCallback(() => {
    return shuffleCards(cards);
  }, [cards]);

  const drawCards = useCallback((count: number) => {
    return shuffleCards(cards).slice(0, count);
  }, [cards]);

  return {
    cards,
    loading,
    error,
    getShuffledCards,
    drawCards,
    getCardImageUrl,
  };
};
