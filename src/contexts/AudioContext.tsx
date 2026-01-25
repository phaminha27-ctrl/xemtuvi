import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from "react";
import backgroundMusic from "@/assets/background-music.mp3";
import buttonClickSound from "@/assets/button-click.mp3";

interface AudioSettings {
  bgMusicEnabled: boolean;
  clickSoundEnabled: boolean;
  bgMusicVolume: number;
  clickSoundVolume: number;
}

interface AudioContextType {
  settings: AudioSettings;
  toggleBgMusic: () => void;
  toggleClickSound: () => void;
  setBgMusicVolume: (volume: number) => void;
  setClickSoundVolume: (volume: number) => void;
  playClickSound: () => void;
  startBgMusic: () => void;
}

const defaultSettings: AudioSettings = {
  bgMusicEnabled: true,
  clickSoundEnabled: true,
  bgMusicVolume: 0.3,
  clickSoundVolume: 0.5,
};

const AudioContext = createContext<AudioContextType | null>(null);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return context;
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AudioSettings>(() => {
    const saved = localStorage.getItem("audioSettings");
    return saved ? JSON.parse(saved) : defaultSettings;
  });
  
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const [bgMusicStarted, setBgMusicStarted] = useState(false);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem("audioSettings", JSON.stringify(settings));
  }, [settings]);

  // Initialize background music
  useEffect(() => {
    bgMusicRef.current = new Audio(backgroundMusic);
    bgMusicRef.current.loop = true;
    bgMusicRef.current.volume = settings.bgMusicVolume;
    
    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current = null;
      }
    };
  }, []);

  // Update volume when settings change
  useEffect(() => {
    if (bgMusicRef.current) {
      bgMusicRef.current.volume = settings.bgMusicVolume;
    }
  }, [settings.bgMusicVolume]);

  // Handle music enable/disable
  useEffect(() => {
    if (bgMusicRef.current && bgMusicStarted) {
      if (settings.bgMusicEnabled) {
        bgMusicRef.current.play().catch(() => {});
      } else {
        bgMusicRef.current.pause();
      }
    }
  }, [settings.bgMusicEnabled, bgMusicStarted]);

  const startBgMusic = useCallback(() => {
    if (bgMusicRef.current && settings.bgMusicEnabled && !bgMusicStarted) {
      bgMusicRef.current.play().catch(() => {});
      setBgMusicStarted(true);
    }
  }, [settings.bgMusicEnabled, bgMusicStarted]);

  const playClickSound = useCallback(() => {
    if (settings.clickSoundEnabled) {
      const audio = new Audio(buttonClickSound);
      audio.volume = settings.clickSoundVolume;
      audio.play().catch(() => {});
    }
  }, [settings.clickSoundEnabled, settings.clickSoundVolume]);

  const toggleBgMusic = useCallback(() => {
    setSettings(prev => ({ ...prev, bgMusicEnabled: !prev.bgMusicEnabled }));
  }, []);

  const toggleClickSound = useCallback(() => {
    setSettings(prev => ({ ...prev, clickSoundEnabled: !prev.clickSoundEnabled }));
  }, []);

  const setBgMusicVolume = useCallback((volume: number) => {
    setSettings(prev => ({ ...prev, bgMusicVolume: volume }));
  }, []);

  const setClickSoundVolume = useCallback((volume: number) => {
    setSettings(prev => ({ ...prev, clickSoundVolume: volume }));
  }, []);

  return (
    <AudioContext.Provider
      value={{
        settings,
        toggleBgMusic,
        toggleClickSound,
        setBgMusicVolume,
        setClickSoundVolume,
        playClickSound,
        startBgMusic,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
