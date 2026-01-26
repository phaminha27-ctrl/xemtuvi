import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import FestiveButton from "@/components/FestiveButton";
import IconButton from "@/components/IconButton";
import formBackground from "@/assets/form-background.jpg";

const NumerologyFormPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.birthDay || !formData.birthMonth || !formData.birthYear) {
      return;
    }
    sessionStorage.setItem("numerologyFormData", JSON.stringify(formData));
    navigate("/loading", { state: { type: "numerology" } });
  };

  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"));
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
  const years = Array.from({ length: 100 }, (_, i) => String(2026 - i));

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background image */}
      <img
        src={formBackground}
        alt="Background"
        className="fixed inset-0 w-full h-full object-cover object-center"
      />

      {/* Back button */}
      <div className="absolute top-3 left-4 z-20">
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
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        {/* Scroll container with float animation */}
        <motion.div
          className="w-full max-w-[340px]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            animation: "float 4s ease-in-out infinite",
          }}
        >
          {/* Top wood roller */}
          <div 
            className="h-7 rounded-full relative z-10"
            style={{
              background: "linear-gradient(to bottom, #5d3e21, #a67c52, #5d3e21)",
              border: "1px solid #3d2516",
              boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
            }}
          >
            <div 
              className="absolute top-1/2 -translate-y-1/2 -left-2.5 w-8 h-8 rounded-full"
              style={{
                background: "radial-gradient(circle, #d4a76a, #8b5e34, #3d2516)",
                border: "2px solid #22150c",
              }}
            />
            <div 
              className="absolute top-1/2 -translate-y-1/2 -right-2.5 w-8 h-8 rounded-full"
              style={{
                background: "radial-gradient(circle, #d4a76a, #8b5e34, #3d2516)",
                border: "2px solid #22150c",
              }}
            />
          </div>

          {/* Scroll body */}
          <div 
            className="mx-4 -my-1 px-6 py-8 relative"
            style={{
              background: "#f9f1e0",
              backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.05) 0%, transparent 5%, transparent 95%, rgba(0,0,0,0.05) 100%)",
              boxShadow: "inset 0 20px 30px rgba(0,0,0,0.05), inset 0 -20px 30px rgba(0,0,0,0.05)",
              borderLeft: "1px solid rgba(139, 94, 52, 0.2)",
              borderRight: "1px solid rgba(139, 94, 52, 0.2)",
            }}
          >
            {/* Title */}
            <h2 
              className="text-center mb-5 text-2xl font-bold"
              style={{ color: "#830000" }}
            >
              Thần Số Học
            </h2>

            {/* Form fields */}
            <div className="flex flex-col gap-4">
              {/* Name */}
              <input
                type="text"
                placeholder="Họ và tên đầy đủ"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-3 border-0 border-b outline-none transition-all text-sm"
                style={{
                  borderBottomColor: "#d4a76a",
                  background: "rgba(255, 255, 255, 0.3)",
                  color: "#4a3420",
                }}
              />

              {/* Birth date row */}
              <div className="flex gap-2">
                <select
                  value={formData.birthDay}
                  onChange={(e) => setFormData({ ...formData, birthDay: e.target.value })}
                  className="flex-1 px-2 py-3 border-0 border-b outline-none transition-all text-sm"
                  style={{
                    borderBottomColor: "#d4a76a",
                    background: "rgba(255, 255, 255, 0.3)",
                    color: "#4a3420",
                  }}
                >
                  <option value="">Ngày</option>
                  {days.map((day) => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>

                <select
                  value={formData.birthMonth}
                  onChange={(e) => setFormData({ ...formData, birthMonth: e.target.value })}
                  className="flex-1 px-2 py-3 border-0 border-b outline-none transition-all text-sm"
                  style={{
                    borderBottomColor: "#d4a76a",
                    background: "rgba(255, 255, 255, 0.3)",
                    color: "#4a3420",
                  }}
                >
                  <option value="">Tháng</option>
                  {months.map((month) => (
                    <option key={month} value={month}>Tháng {month}</option>
                  ))}
                </select>

                <select
                  value={formData.birthYear}
                  onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
                  className="flex-1 px-2 py-3 border-0 border-b outline-none transition-all text-sm"
                  style={{
                    borderBottomColor: "#d4a76a",
                    background: "rgba(255, 255, 255, 0.3)",
                    color: "#4a3420",
                  }}
                >
                  <option value="">Năm</option>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <FestiveButton
                  icon={Sparkles}
                  onClick={handleSubmit}
                  compact
                  className="w-full"
                >
                  Xem Thần Số Học
                </FestiveButton>
              </div>
            </div>
          </div>

          {/* Bottom wood roller */}
          <div 
            className="h-7 rounded-full relative z-10"
            style={{
              background: "linear-gradient(to bottom, #5d3e21, #a67c52, #5d3e21)",
              border: "1px solid #3d2516",
              boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
            }}
          >
            <div 
              className="absolute top-1/2 -translate-y-1/2 -left-2.5 w-8 h-8 rounded-full"
              style={{
                background: "radial-gradient(circle, #d4a76a, #8b5e34, #3d2516)",
                border: "2px solid #22150c",
              }}
            />
            <div 
              className="absolute top-1/2 -translate-y-1/2 -right-2.5 w-8 h-8 rounded-full"
              style={{
                background: "radial-gradient(circle, #d4a76a, #8b5e34, #3d2516)",
                border: "2px solid #22150c",
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NumerologyFormPage;
