import { useState, useEffect, useCallback } from "react";
import {
  TarotCard,
  fetchTarotCards,
  shuffleCards,
  drawCardsWithReversed,
  getCardImageUrlByName,
} from "@/services/tarotService";

// Re-export types and utilities from service
export type { TarotCard };
export { shuffleCards, drawCardsWithReversed };

// Get image URL for a card (handles both full cards and partial cards from URL)
export const getCardImageUrl = (card: TarotCard | { name: string; name_short: string; isReversed?: boolean }): string => {
  // If card has imageUrl, use it directly
  if ('imageUrl' in card && card.imageUrl) {
    return card.imageUrl;
  }
  // Otherwise, reconstruct from name (for shared links)
  return getCardImageUrlByName(card.name, card.name_short);
};

export const useTarotCards = () => {
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCards = async () => {
      try {
        setLoading(true);
        const fetchedCards = await fetchTarotCards();
        setCards(fetchedCards);
        setError(null);
      } catch (err) {
        console.error("Error fetching tarot cards:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    loadCards();
  }, []);

  const getShuffledCards = useCallback(() => {
    return shuffleCards(cards);
  }, [cards]);

  const drawCards = useCallback(
    (count: number) => {
      return drawCardsWithReversed(cards, count);
    },
    [cards]
  );

  return {
    cards,
    loading,
    error,
    getShuffledCards,
    drawCards,
    getCardImageUrl,
  };
};
