import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, VolumeX, Music, MousePointerClick } from "lucide-react";
import { useAudio } from "@/contexts/AudioContext";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const { 
    settings, 
    toggleBgMusic, 
    toggleClickSound, 
    setBgMusicVolume, 
    setClickSoundVolume,
    playClickSound 
  } = useAudio();

  const handleClose = () => {
    playClickSound();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          
          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-sm rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(180deg, #FFF8E7 0%, #F5E6D3 100%)",
                border: "4px solid #F5D27B",
                boxShadow: "0px 8px 0px 0px #8B5E34, 0px 12px 30px rgba(0,0,0,0.4)",
              }}
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              transition={{ type: "spring", duration: 0.4 }}
            >
              {/* Header */}
              <div 
                className="relative py-4 px-5 flex items-center justify-between"
                style={{
                  background: "linear-gradient(180deg, #C92A2A 0%, #A61E1E 100%)",
                  borderBottom: "3px solid #F5D27B",
                }}
              >
                <h2 
                  className="text-lg font-bold uppercase"
                  style={{ 
                    color: "#FFF9C4",
                    textShadow: "1px 2px 3px rgba(0, 0, 0, 0.4)",
                  }}
                >
                  Cài Đặt Âm Thanh
                </h2>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(180deg, #F5D27B 0%, #C49A45 100%)",
                    border: "2px solid #8B5E34",
                  }}
                >
                  <X className="w-5 h-5" style={{ color: "#5d3e21" }} />
                </button>
              </div>

              {/* Content */}
              <div className="p-5 space-y-5">
                {/* Background Music Toggle */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Music className="w-5 h-5" style={{ color: "#8B5E34" }} />
                      <span className="font-semibold" style={{ color: "#5d3e21" }}>
                        Nhạc nền
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        playClickSound();
                        toggleBgMusic();
                      }}
                      className="w-14 h-7 rounded-full relative transition-colors duration-200"
                      style={{
                        background: settings.bgMusicEnabled 
                          ? "linear-gradient(180deg, #00A396 0%, #007D75 100%)"
                          : "linear-gradient(180deg, #9CA3AF 0%, #6B7280 100%)",
                        border: "2px solid #8B5E34",
                      }}
                    >
                      <motion.div
                        className="absolute top-0.5 w-5 h-5 rounded-full"
                        style={{
                          background: "linear-gradient(180deg, #F5D27B 0%, #C49A45 100%)",
                          border: "1px solid #8B5E34",
                        }}
                        animate={{ left: settings.bgMusicEnabled ? "calc(100% - 22px)" : "2px" }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </button>
                  </div>
                  
                  {/* Volume Slider */}
                  <div className="flex items-center gap-3">
                    <VolumeX className="w-4 h-4 flex-shrink-0" style={{ color: "#8B5E34" }} />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={settings.bgMusicVolume}
                      onChange={(e) => setBgMusicVolume(parseFloat(e.target.value))}
                      className="flex-1 h-2 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #00A396 0%, #00A396 ${settings.bgMusicVolume * 100}%, #D1D5DB ${settings.bgMusicVolume * 100}%, #D1D5DB 100%)`,
                      }}
                    />
                    <Volume2 className="w-4 h-4 flex-shrink-0" style={{ color: "#8B5E34" }} />
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, #C49A45, transparent)" }} />

                {/* Click Sound Toggle */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MousePointerClick className="w-5 h-5" style={{ color: "#8B5E34" }} />
                      <span className="font-semibold" style={{ color: "#5d3e21" }}>
                        Âm thanh click
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        playClickSound();
                        toggleClickSound();
                      }}
                      className="w-14 h-7 rounded-full relative transition-colors duration-200"
                      style={{
                        background: settings.clickSoundEnabled 
                          ? "linear-gradient(180deg, #00A396 0%, #007D75 100%)"
                          : "linear-gradient(180deg, #9CA3AF 0%, #6B7280 100%)",
                        border: "2px solid #8B5E34",
                      }}
                    >
                      <motion.div
                        className="absolute top-0.5 w-5 h-5 rounded-full"
                        style={{
                          background: "linear-gradient(180deg, #F5D27B 0%, #C49A45 100%)",
                          border: "1px solid #8B5E34",
                        }}
                        animate={{ left: settings.clickSoundEnabled ? "calc(100% - 22px)" : "2px" }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    </button>
                  </div>
                  
                  {/* Volume Slider */}
                  <div className="flex items-center gap-3">
                    <VolumeX className="w-4 h-4 flex-shrink-0" style={{ color: "#8B5E34" }} />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={settings.clickSoundVolume}
                      onChange={(e) => setClickSoundVolume(parseFloat(e.target.value))}
                      className="flex-1 h-2 rounded-full appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #00A396 0%, #00A396 ${settings.clickSoundVolume * 100}%, #D1D5DB ${settings.clickSoundVolume * 100}%, #D1D5DB 100%)`,
                      }}
                    />
                    <Volume2 className="w-4 h-4 flex-shrink-0" style={{ color: "#8B5E34" }} />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SettingsModal;
