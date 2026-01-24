import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Camera, Sparkles } from "lucide-react";
import FestiveButton from "@/components/FestiveButton";
import IconButton from "@/components/IconButton";
import scanBackground from "@/assets/scan-background.jpg";

const FaceScanPage = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

  const analyzeFace = useCallback(() => {
    if (capturedImage) {
      sessionStorage.setItem("capturedFace", capturedImage);
      navigate("/loading", { state: { type: "face" } });
    }
  }, [capturedImage, navigate]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${scanBackground})` }}
    >
      {/* Top buttons */}
      <div className="absolute top-6 left-4 right-4 flex justify-between items-start z-10">
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

      {/* Camera Frame - Smaller */}
      <motion.div
        className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-8 border-festive-gold shadow-2xl mb-8"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-parchment flex items-center justify-center">
          {!isStreaming && !capturedImage && (
            <div className="text-center p-4">
              <Camera className="w-12 h-12 mx-auto text-festive-brown/50 mb-2" />
              <p className="text-festive-brown/70 text-xs">
                Nhấn nút bên dưới để bắt đầu
              </p>
            </div>
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
            className="absolute inset-0 border-4 border-festive-gold rounded-full"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(255, 215, 0, 0.4)",
                "0 0 0 20px rgba(255, 215, 0, 0)",
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
          className="text-festive-red bg-parchment px-4 py-2 rounded-lg mb-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.p>
      )}

      {/* Action buttons */}
      <div className="flex flex-col gap-4 w-full max-w-xs">
        {!isStreaming && !capturedImage && (
          <FestiveButton icon={Camera} onClick={() => startCamera()}>
            Mở Camera
          </FestiveButton>
        )}

        {isStreaming && (
          <FestiveButton icon={Sparkles} onClick={capturePhoto}>
            Chụp Ảnh
          </FestiveButton>
        )}

        {capturedImage && (
          <>
            <FestiveButton icon={Sparkles} onClick={analyzeFace}>
              Xem Tử Vi
            </FestiveButton>
            <FestiveButton
              icon={Sparkles}
              variant="secondary"
              onClick={retake}
            >
              Chụp Lại
            </FestiveButton>
          </>
        )}
      </div>
    </div>
  );
};

export default FaceScanPage;
