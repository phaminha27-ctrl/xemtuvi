import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Camera, RotateCcw, Sparkles } from "lucide-react";
import FestiveButton from "@/components/FestiveButton";
import scanBackground from "@/assets/scan-background.jpg";

const FaceScanPage = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 640, height: 480 },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (err) {
      console.error("Camera error:", err);
      setError("Không thể truy cập camera. Vui lòng cấp quyền truy cập.");
    }
  }, []);

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
    // Store captured image for result page
    if (capturedImage) {
      sessionStorage.setItem("capturedFace", capturedImage);
      navigate("/loading", { state: { type: "face" } });
    }
  }, [capturedImage, navigate]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${scanBackground})` }}
    >

        {/* Camera Frame */}
        <motion.div
          className="relative w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-festive-gold shadow-2xl mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-parchment flex items-center justify-center">
            {!isStreaming && !capturedImage && (
              <div className="text-center p-4">
                <Camera className="w-16 h-16 mx-auto text-festive-brown/50 mb-2" />
                <p className="text-festive-brown/70 text-sm">
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
            <FestiveButton icon={Camera} onClick={startCamera}>
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
                icon={RotateCcw}
                variant="secondary"
                onClick={retake}
              >
                Chụp Lại
              </FestiveButton>
            </>
          )}
        </div>

        {/* Back button */}
        <motion.button
          className="mt-6 text-festive-cream underline"
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.05 }}
        >
        ← Quay lại trang chủ
        </motion.button>
    </div>
  );
};

export default FaceScanPage;
