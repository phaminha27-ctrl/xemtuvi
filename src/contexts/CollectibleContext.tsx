import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const LETTERS = ["B", "L", "U", "E", "T", "E", "C", "H"] as const;
const STORAGE_KEY = "bluetech-collected";

interface CollectibleContextType {
  collectedLetters: string[];
  collectLetter: (letter: string, index: number) => void;
  isLetterCollected: (index: number) => boolean;
  totalLetters: number;
  isComplete: boolean;
  resetCollection: () => void;
  showCongrats: boolean;
  setShowCongrats: (show: boolean) => void;
}

const CollectibleContext = createContext<CollectibleContextType | null>(null);

export const useCollectible = () => {
  const context = useContext(CollectibleContext);
  if (!context) {
    throw new Error("useCollectible must be used within CollectibleProvider");
  }
  return context;
};

interface CollectibleProviderProps {
  children: ReactNode;
}

export const CollectibleProvider = ({ children }: CollectibleProviderProps) => {
  const [collectedIndices, setCollectedIndices] = useState<number[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [showCongrats, setShowCongrats] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collectedIndices));
  }, [collectedIndices]);

  const collectLetter = (letter: string, index: number) => {
    if (!collectedIndices.includes(index)) {
      const newIndices = [...collectedIndices, index];
      setCollectedIndices(newIndices);
      
      // Check if complete
      if (newIndices.length === LETTERS.length) {
        setTimeout(() => setShowCongrats(true), 800);
      }
    }
  };

  const isLetterCollected = (index: number) => collectedIndices.includes(index);

  const resetCollection = () => {
    setCollectedIndices([]);
    setShowCongrats(false);
  };

  const collectedLetters = collectedIndices.map(i => LETTERS[i]);

  return (
    <CollectibleContext.Provider
      value={{
        collectedLetters,
        collectLetter,
        isLetterCollected,
        totalLetters: LETTERS.length,
        isComplete: collectedIndices.length === LETTERS.length,
        resetCollection,
        showCongrats,
        setShowCongrats,
      }}
    >
      {children}
    </CollectibleContext.Provider>
  );
};
