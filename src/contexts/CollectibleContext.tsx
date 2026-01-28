import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const LETTERS = ["B", "L", "U", "E", "T", "E", "C", "H"] as const;
const STORAGE_KEY = "bluetech-collected";
const POSITIONS_KEY = "bluetech-positions";

// Define EDGE zones for each letter position (corners and edges only - avoid center UI)
// Zones: top-left, top-right, bottom-left, bottom-right corners and left/right edges
const EDGE_ZONES = [
  // Top corners (safe from top navigation buttons)
  { minTop: 12, maxTop: 25, minLeft: 2, maxLeft: 15 },   // Top-left edge
  { minTop: 12, maxTop: 25, minLeft: 85, maxLeft: 96 },  // Top-right edge
  // Left edge (middle area)
  { minTop: 30, maxTop: 50, minLeft: 2, maxLeft: 10 },   // Left edge mid
  // Right edge (middle area)  
  { minTop: 30, maxTop: 50, minLeft: 90, maxLeft: 96 },  // Right edge mid
  // Bottom corners (safe from bottom action buttons)
  { minTop: 70, maxTop: 85, minLeft: 2, maxLeft: 15 },   // Bottom-left edge
  { minTop: 70, maxTop: 85, minLeft: 85, maxLeft: 96 },  // Bottom-right edge
  // Additional edge spots
  { minTop: 55, maxTop: 70, minLeft: 2, maxLeft: 10 },   // Lower-left edge
  { minTop: 55, maxTop: 70, minLeft: 90, maxLeft: 96 },  // Lower-right edge
];

interface LetterPosition {
  top: string;
  left: string;
}

interface CollectibleContextType {
  collectedLetters: string[];
  collectLetter: (letter: string, index: number) => void;
  isLetterCollected: (index: number) => boolean;
  totalLetters: number;
  isComplete: boolean;
  resetCollection: () => void;
  showCongrats: boolean;
  setShowCongrats: (show: boolean) => void;
  getLetterPosition: (index: number) => LetterPosition;
}

const CollectibleContext = createContext<CollectibleContextType | null>(null);

export const useCollectible = () => {
  const context = useContext(CollectibleContext);
  if (!context) {
    throw new Error("useCollectible must be used within CollectibleProvider");
  }
  return context;
};

// Generate random position within a zone
const generateRandomPosition = (zone: typeof EDGE_ZONES[0]): LetterPosition => {
  const top = zone.minTop + Math.random() * (zone.maxTop - zone.minTop);
  const left = zone.minLeft + Math.random() * (zone.maxLeft - zone.minLeft);
  return {
    top: `${top}%`,
    left: `${left}%`,
  };
};

// Generate all positions for a new player
const generateAllPositions = (): LetterPosition[] => {
  return EDGE_ZONES.map(zone => generateRandomPosition(zone));
};

interface CollectibleProviderProps {
  children: ReactNode;
}

export const CollectibleProvider = ({ children }: CollectibleProviderProps) => {
  const [collectedIndices, setCollectedIndices] = useState<number[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  
  const [positions, setPositions] = useState<LetterPosition[]>(() => {
    const saved = localStorage.getItem(POSITIONS_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    // Generate new random positions for new player
    const newPositions = generateAllPositions();
    localStorage.setItem(POSITIONS_KEY, JSON.stringify(newPositions));
    return newPositions;
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
    // Also regenerate positions on reset
    const newPositions = generateAllPositions();
    setPositions(newPositions);
    localStorage.setItem(POSITIONS_KEY, JSON.stringify(newPositions));
  };

  const getLetterPosition = (index: number): LetterPosition => {
    return positions[index] || { top: "50%", left: "50%" };
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
        getLetterPosition,
      }}
    >
      {children}
    </CollectibleContext.Provider>
  );
};
