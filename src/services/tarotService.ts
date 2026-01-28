// Tarot Service - Fetches cards from API and maps to Wikimedia Commons images

export interface TarotCardRaw {
  name_short: string;
  name: string;
  value: string;
  value_int: number;
  type: string;
  meaning_up: string;
  meaning_rev: string;
  desc: string;
}

export interface TarotCard extends TarotCardRaw {
  imageUrl: string;
  nameVi: string;
  isReversed?: boolean;
}

// Wikimedia Commons Rider-Waite deck image mappings
const WIKIMEDIA_BASE = "https://upload.wikimedia.org/wikipedia/commons";

// Major Arcana image URLs from Wikimedia Commons
const majorArcanaImages: Record<string, string> = {
  "The Fool": `${WIKIMEDIA_BASE}/9/90/RWS_Tarot_00_Fool.jpg`,
  "The Magician": `${WIKIMEDIA_BASE}/d/de/RWS_Tarot_01_Magician.jpg`,
  "The High Priestess": `${WIKIMEDIA_BASE}/8/88/RWS_Tarot_02_High_Priestess.jpg`,
  "The Empress": `${WIKIMEDIA_BASE}/d/d2/RWS_Tarot_03_Empress.jpg`,
  "The Emperor": `${WIKIMEDIA_BASE}/c/c3/RWS_Tarot_04_Emperor.jpg`,
  "The Hierophant": `${WIKIMEDIA_BASE}/8/8d/RWS_Tarot_05_Hierophant.jpg`,
  "The Lovers": `${WIKIMEDIA_BASE}/3/3a/RWS_Tarot_06_Lovers.jpg`,
  "The Chariot": `${WIKIMEDIA_BASE}/9/9b/RWS_Tarot_07_Chariot.jpg`,
  "Strength": `${WIKIMEDIA_BASE}/f/f5/RWS_Tarot_08_Strength.jpg`,
  "The Hermit": `${WIKIMEDIA_BASE}/4/4d/RWS_Tarot_09_Hermit.jpg`,
  "Wheel of Fortune": `${WIKIMEDIA_BASE}/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg`,
  "Justice": `${WIKIMEDIA_BASE}/e/e0/RWS_Tarot_11_Justice.jpg`,
  "The Hanged Man": `${WIKIMEDIA_BASE}/2/2b/RWS_Tarot_12_Hanged_Man.jpg`,
  "Death": `${WIKIMEDIA_BASE}/d/d7/RWS_Tarot_13_Death.jpg`,
  "Temperance": `${WIKIMEDIA_BASE}/f/f8/RWS_Tarot_14_Temperance.jpg`,
  "The Devil": `${WIKIMEDIA_BASE}/5/55/RWS_Tarot_15_Devil.jpg`,
  "The Tower": `${WIKIMEDIA_BASE}/5/53/RWS_Tarot_16_Tower.jpg`,
  "The Star": `${WIKIMEDIA_BASE}/d/db/RWS_Tarot_17_Star.jpg`,
  "The Moon": `${WIKIMEDIA_BASE}/7/7f/RWS_Tarot_18_Moon.jpg`,
  "The Sun": `${WIKIMEDIA_BASE}/1/17/RWS_Tarot_19_Sun.jpg`,
  "Judgement": `${WIKIMEDIA_BASE}/d/dd/RWS_Tarot_20_Judgement.jpg`,
  "The World": `${WIKIMEDIA_BASE}/f/ff/RWS_Tarot_21_World.jpg`,
};

// Minor Arcana suit mappings
const suitImagePaths: Record<string, string> = {
  wands: "Wands",
  cups: "Cups",
  swords: "Swords",
  pentacles: "Pentacles",
};

// Value to number mapping for Minor Arcana
const valueToNumber: Record<string, string> = {
  ace: "01",
  two: "02",
  three: "03",
  four: "04",
  five: "05",
  six: "06",
  seven: "07",
  eight: "08",
  nine: "09",
  ten: "10",
  page: "11",
  knight: "12",
  queen: "13",
  king: "14",
};

// Vietnamese name translations
const majorArcanaVi: Record<string, string> = {
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

const suitsVi: Record<string, string> = {
  wands: "Gậy",
  cups: "Cốc",
  swords: "Kiếm",
  pentacles: "Tiền",
};

const valuesVi: Record<string, string> = {
  ace: "Át",
  two: "Hai",
  three: "Ba",
  four: "Bốn",
  five: "Năm",
  six: "Sáu",
  seven: "Bảy",
  eight: "Tám",
  nine: "Chín",
  ten: "Mười",
  page: "Thị Đồng",
  knight: "Kỵ Sĩ",
  queen: "Hoàng Hậu",
  king: "Vua",
};

// Get suit from name_short (e.g., "wapa" -> "wands")
const getSuitFromShort = (nameShort: string): string => {
  const suitMap: Record<string, string> = {
    wa: "wands",
    cu: "cups",
    sw: "swords",
    pe: "pentacles",
  };
  const prefix = nameShort.substring(0, 2);
  return suitMap[prefix] || "wands";
};

// Get image URL for a card
const getCardImageUrl = (card: TarotCardRaw): string => {
  // Major Arcana
  if (card.type === "major") {
    return majorArcanaImages[card.name] || `${WIKIMEDIA_BASE}/9/90/RWS_Tarot_00_Fool.jpg`;
  }

  // Minor Arcana
  const suit = getSuitFromShort(card.name_short);
  const suitPath = suitImagePaths[suit];
  const valueNum = valueToNumber[card.value.toLowerCase()];
  
  return `${WIKIMEDIA_BASE}/thumb/${getMinorArcanaPath(suitPath, valueNum)}`;
};

// Helper to construct Minor Arcana image paths
const getMinorArcanaPath = (suit: string, num: string): string => {
  // Wikimedia Commons paths for Minor Arcana
  const minorPaths: Record<string, Record<string, string>> = {
    Wands: {
      "01": "1/11/Wands01.jpg/200px-Wands01.jpg",
      "02": "0/0f/Wands02.jpg/200px-Wands02.jpg",
      "03": "f/ff/Wands03.jpg/200px-Wands03.jpg",
      "04": "a/a4/Wands04.jpg/200px-Wands04.jpg",
      "05": "9/9d/Wands05.jpg/200px-Wands05.jpg",
      "06": "3/3b/Wands06.jpg/200px-Wands06.jpg",
      "07": "e/e4/Wands07.jpg/200px-Wands07.jpg",
      "08": "6/6b/Wands08.jpg/200px-Wands08.jpg",
      "09": "4/4d/Wands09.jpg/200px-Wands09.jpg",
      "10": "0/0b/Wands10.jpg/200px-Wands10.jpg",
      "11": "6/6a/Wands11.jpg/200px-Wands11.jpg",
      "12": "1/16/Wands12.jpg/200px-Wands12.jpg",
      "13": "0/0d/Wands13.jpg/200px-Wands13.jpg",
      "14": "c/ce/Wands14.jpg/200px-Wands14.jpg",
    },
    Cups: {
      "01": "3/36/Cups01.jpg/200px-Cups01.jpg",
      "02": "f/f8/Cups02.jpg/200px-Cups02.jpg",
      "03": "7/7a/Cups03.jpg/200px-Cups03.jpg",
      "04": "3/35/Cups04.jpg/200px-Cups04.jpg",
      "05": "d/d7/Cups05.jpg/200px-Cups05.jpg",
      "06": "1/17/Cups06.jpg/200px-Cups06.jpg",
      "07": "a/ae/Cups07.jpg/200px-Cups07.jpg",
      "08": "6/60/Cups08.jpg/200px-Cups08.jpg",
      "09": "2/24/Cups09.jpg/200px-Cups09.jpg",
      "10": "8/84/Cups10.jpg/200px-Cups10.jpg",
      "11": "a/ad/Cups11.jpg/200px-Cups11.jpg",
      "12": "f/fa/Cups12.jpg/200px-Cups12.jpg",
      "13": "6/62/Cups13.jpg/200px-Cups13.jpg",
      "14": "0/04/Cups14.jpg/200px-Cups14.jpg",
    },
    Swords: {
      "01": "1/1a/Swords01.jpg/200px-Swords01.jpg",
      "02": "9/9e/Swords02.jpg/200px-Swords02.jpg",
      "03": "0/02/Swords03.jpg/200px-Swords03.jpg",
      "04": "b/bf/Swords04.jpg/200px-Swords04.jpg",
      "05": "2/23/Swords05.jpg/200px-Swords05.jpg",
      "06": "2/29/Swords06.jpg/200px-Swords06.jpg",
      "07": "3/34/Swords07.jpg/200px-Swords07.jpg",
      "08": "a/a7/Swords08.jpg/200px-Swords08.jpg",
      "09": "2/2f/Swords09.jpg/200px-Swords09.jpg",
      "10": "d/d4/Swords10.jpg/200px-Swords10.jpg",
      "11": "4/4c/Swords11.jpg/200px-Swords11.jpg",
      "12": "b/b0/Swords12.jpg/200px-Swords12.jpg",
      "13": "d/d4/Swords13.jpg/200px-Swords13.jpg",
      "14": "3/33/Swords14.jpg/200px-Swords14.jpg",
    },
    Pentacles: {
      "01": "f/fd/Pents01.jpg/200px-Pents01.jpg",
      "02": "9/9f/Pents02.jpg/200px-Pents02.jpg",
      "03": "4/42/Pents03.jpg/200px-Pents03.jpg",
      "04": "3/35/Pents04.jpg/200px-Pents04.jpg",
      "05": "9/96/Pents05.jpg/200px-Pents05.jpg",
      "06": "a/a6/Pents06.jpg/200px-Pents06.jpg",
      "07": "6/6a/Pents07.jpg/200px-Pents07.jpg",
      "08": "4/49/Pents08.jpg/200px-Pents08.jpg",
      "09": "f/f0/Pents09.jpg/200px-Pents09.jpg",
      "10": "4/42/Pents10.jpg/200px-Pents10.jpg",
      "11": "e/ec/Pents11.jpg/200px-Pents11.jpg",
      "12": "d/d5/Pents12.jpg/200px-Pents12.jpg",
      "13": "8/88/Pents13.jpg/200px-Pents13.jpg",
      "14": "1/1c/Pents14.jpg/200px-Pents14.jpg",
    },
  };

  return minorPaths[suit]?.[num] || "1/11/Wands01.jpg/200px-Wands01.jpg";
};

// Get Vietnamese name for a card
const getVietnameseName = (card: TarotCardRaw): string => {
  if (card.type === "major") {
    return majorArcanaVi[card.name] || card.name;
  }

  const suit = getSuitFromShort(card.name_short);
  const suitVi = suitsVi[suit] || "";
  const valueVi = valuesVi[card.value.toLowerCase()] || card.value;

  return `${valueVi} ${suitVi}`;
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

// Draw cards with isReversed property (50/50 chance)
export const drawCardsWithReversed = (cards: TarotCard[], count: number): TarotCard[] => {
  const shuffled = shuffleCards(cards);
  return shuffled.slice(0, count).map(card => ({
    ...card,
    isReversed: Math.random() < 0.5,
  }));
};

// Fetch all tarot cards from API
export const fetchTarotCards = async (): Promise<TarotCard[]> => {
  const response = await fetch("https://tarotapi.dev/api/v1/cards");

  if (!response.ok) {
    throw new Error("Failed to fetch tarot cards");
  }

  const data = await response.json();

  // Map cards with image URLs and Vietnamese names
  const cards: TarotCard[] = data.cards.map((card: TarotCardRaw) => ({
    ...card,
    imageUrl: getCardImageUrl(card),
    nameVi: getVietnameseName(card),
  }));

  return cards;
};

// Export helper for getting image URL
export { getCardImageUrl };

// Get image URL by card name (for reconstructing from shared links)
export const getCardImageUrlByName = (name: string, nameShort: string): string => {
  // Check if it's a Major Arcana
  if (majorArcanaImages[name]) {
    return majorArcanaImages[name];
  }

  // Minor Arcana - determine suit and value from name_short
  const suit = getSuitFromShort(nameShort);
  const suitPath = suitImagePaths[suit];
  
  // Extract value from name (e.g., "Two of Wands" -> "two")
  const valuePart = name.split(' ')[0].toLowerCase();
  const valueNum = valueToNumber[valuePart];
  
  if (suitPath && valueNum) {
    return `${WIKIMEDIA_BASE}/thumb/${getMinorArcanaPath(suitPath, valueNum)}`;
  }
  
  // Fallback
  return `${WIKIMEDIA_BASE}/9/90/RWS_Tarot_00_Fool.jpg`;
};
