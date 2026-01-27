import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, RotateCcw, Upload } from "lucide-react";
import IconButton from "@/components/IconButton";
import CaptureButton from "@/components/CaptureButton";
import FestiveButton from "@/components/FestiveButton";
import HiddenLetter from "@/components/HiddenLetter";
import scanBackground from "@/assets/scan-background.jpg";
import meocuoi from "@/assets/meocuoi.jpg";

const FaceScanPage = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");

  const startCamera = useCallback(async (mode: "user" | "environment" = facingMode) => {
    try {
      setError(null);
      // Stop existing stream if any
      if (videoRef.current?.srcObject) {
        const existingStream = videoRef.current.srcObject as MediaStream;
        existingStream.getTracks().forEach((track) => track.stop());
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: mode, width: 640, height: 480 },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (err) {
      console.error("Camera error:", err);
      setError("Không thể truy cập camera. Vui lòng cấp quyền truy cập.");
    }
  }, [facingMode]);

  const switchCamera = useCallback(() => {
    const newMode = facingMode === "user" ? "environment" : "user";
    setFacingMode(newMode);
    if (isStreaming) {
      startCamera(newMode);
    }
  }, [facingMode, isStreaming, startCamera]);

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const imageData = canvasRef.current.toDataURL("image/jpeg");
        setCapturedImage(imageData);
        
        // Stop camera stream
        const stream = videoRef.current.srcObject as MediaStream;
        stream?.getTracks().forEach((track) => track.stop());
        setIsStreaming(false);
      }
    }
  }, []);

  const retake = useCallback(() => {
    setCapturedImage(null);
    startCamera();
  }, [startCamera]);

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Vui lòng chọn file ảnh hợp lệ.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        setCapturedImage(imageData);
        // Stop camera if streaming
        if (videoRef.current?.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream;
          stream?.getTracks().forEach((track) => track.stop());
          setIsStreaming(false);
        }
      };
      reader.readAsDataURL(file);
    }
    // Reset input to allow selecting the same file again
    e.target.value = "";
  }, []);

  const analyzeFace = useCallback(() => {
    if (capturedImage) {
      sessionStorage.setItem("capturedFace", capturedImage);
      navigate("/loading", { state: { type: "face" } });
    }
  }, [capturedImage, navigate]);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background Image - Responsive */}
      <img
        src={scanBackground}
        alt=""
        className="fixed inset-0 w-full h-full object-cover object-center"
        aria-hidden="true"
      />
      {/* Top buttons */}
      <div className="absolute top-3 left-4 right-4 flex justify-between items-start z-20">
        {/* Back Button */}
        <IconButton onClick={() => navigate("/")} label="QUAY LẠI">
          <svg 
            className="w-7 h-7" 
            viewBox="0 0 24 24"
            style={{ 
              fill: "#FFF9C4",
              filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.5))"
            }}
          >
            <path d="M19 11H7.83l4.88-4.88L11 4l-8 8 8 8 1.71-1.71L7.83 13H19v-2z"/>
          </svg>
        </IconButton>

        {/* Switch Camera Button */}
        <IconButton onClick={switchCamera} label="ĐỔI CAMERA">
          <svg 
            className="w-7 h-7" 
            viewBox="0 0 24 24"
            style={{ 
              fill: "#FFF9C4",
              stroke: "#FFF9C4",
              strokeWidth: 0.5,
              filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.5))"
            }}
          >
            <path d="M19 8l-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.41 20 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.59 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"/>
          </svg>
        </IconButton>
      </div>

      {/* Center area - Scan frame absolutely centered */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 z-10 pointer-events-none" style={{ marginTop: '-60px' }}>
        {/* Instruction text */}
        <p 
          className="text-sm font-medium mb-4"
          style={{ 
            color: "#FFF9C4",
            textShadow: "0 2px 4px rgba(0,0,0,0.6)"
          }}
        >
          Hãy cười thật đẹp nhé!
        </p>

        {/* Camera Frame - Rounded square with corner accents */}
        <motion.div
          className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 pointer-events-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
        {/* Corner borders with glow effect */}
        <div 
          className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 rounded-tl-2xl"
          style={{ 
            borderColor: "#F5D27B",
              filter: "drop-shadow(0 0 6px rgba(245, 210, 123, 0.8))"
            }} 
        />
        <div 
          className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 rounded-tr-2xl"
          style={{ 
            borderColor: "#F5D27B",
              filter: "drop-shadow(0 0 6px rgba(245, 210, 123, 0.8))"
            }} 
        />
        <div 
          className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 rounded-bl-2xl"
          style={{ 
            borderColor: "#F5D27B",
              filter: "drop-shadow(0 0 6px rgba(245, 210, 123, 0.8))"
            }} 
        />
        <div 
          className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 rounded-br-2xl"
          style={{ 
            borderColor: "#F5D27B",
              filter: "drop-shadow(0 0 6px rgba(245, 210, 123, 0.8))"
            }} 
          />

          {/* Inner content area - light fill */}
          <div 
            className="absolute inset-2 rounded-xl overflow-hidden flex items-center justify-center"
            style={{ backgroundColor: "rgba(255, 250, 240, 0.85)" }}
          >
          {!isStreaming && !capturedImage && (
              <img
                src={meocuoi}
                alt="Mèo cười"
                className="w-full h-full object-cover object-center"
              />
            )}
            
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className={`w-full h-full object-cover ${isStreaming ? "block" : "hidden"}`}
            />
            
            {capturedImage && (
              <img
                src={capturedImage}
                alt="Captured face"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Scanning overlay */}
          {isStreaming && (
            <motion.div
              className="absolute inset-2 rounded-xl"
              style={{ border: "2px solid #F5D27B" }}
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(245, 210, 123, 0.5)",
                  "0 0 0 12px rgba(245, 210, 123, 0)",
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </motion.div>

        {/* Canvas for capture */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Error message */}
        {error && (
          <motion.p
            className="text-festive-red bg-parchment px-4 py-2 rounded-lg mt-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Bottom area - Action buttons */}
      <div className="absolute bottom-16 left-0 right-0 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 z-10">
        {!isStreaming && !capturedImage && (
          <div className="flex flex-row gap-4 items-center justify-center">
            <CaptureButton onClick={() => startCamera()} icon="camera" label="MỞ CAMERA" />
            <CaptureButton onClick={handleUploadClick} icon="upload" label="TẢI ẢNH" />
          </div>
        )}

        {isStreaming && (
          <CaptureButton onClick={capturePhoto} icon="camera" label="CHỤP ẢNH" />
        )}

        {capturedImage && (
          <div className="flex flex-col gap-3 items-center w-full max-w-xs">
            <FestiveButton onClick={analyzeFace} icon={Sparkles} compact variant="primary">
              Xem Tử Vi
            </FestiveButton>
            <FestiveButton onClick={retake} icon={RotateCcw} compact variant="secondary">
              Chụp Lại
            </FestiveButton>
          </div>
        )}
      </div>

      {/* Hidden letter L */}
      <HiddenLetter letter="L" index={1} position={{ bottom: "35%", left: "5%" }} />
    </div>
  );
};

export default FaceScanPage;
