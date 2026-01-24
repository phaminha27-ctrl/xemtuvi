import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import FestiveButton from "@/components/FestiveButton";
import IconButton from "@/components/IconButton";
import formBackground from "@/assets/form-background.jpg";

const FormPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    gender: "",
    birthHour: "",
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.birthDay || !formData.birthMonth || !formData.birthYear) {
      return;
    }
    sessionStorage.setItem("tuViFormData", JSON.stringify(formData));
    navigate("/loading", { state: { type: "form" } });
  };

  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"));
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
  const years = Array.from({ length: 100 }, (_, i) => String(2026 - i));
  const hours = [
    "Tý (23h-1h)", "Sửu (1h-3h)", "Dần (3h-5h)", "Mão (5h-7h)",
    "Thìn (7h-9h)", "Tỵ (9h-11h)", "Ngọ (11h-13h)", "Mùi (13h-15h)",
    "Thân (15h-17h)", "Dậu (17h-19h)", "Tuất (19h-21h)", "Hợi (21h-23h)",
    "Không rõ",
  ];

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
            {/* Left knob */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 -left-2.5 w-8 h-8 rounded-full"
              style={{
                background: "radial-gradient(circle, #d4a76a, #8b5e34, #3d2516)",
                border: "2px solid #22150c",
              }}
            />
            {/* Right knob */}
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
              className="text-center mb-5 text-2xl font-bold font-charm"
              style={{
                color: "#830000",
              }}
            >
              Nhập thông tin cá nhân
            </h2>

            {/* Form fields */}
            <div className="flex flex-col gap-4">
              {/* Name */}
              <input
                type="text"
                placeholder="Họ và tên"
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

              {/* Birth hour */}
              <select
                value={formData.birthHour}
                onChange={(e) => setFormData({ ...formData, birthHour: e.target.value })}
                className="w-full px-3 py-3 border-0 border-b outline-none transition-all text-sm"
                style={{
                  borderBottomColor: "#d4a76a",
                  background: "rgba(255, 255, 255, 0.3)",
                  color: "#4a3420",
                }}
              >
                <option value="">Giờ sinh (không bắt buộc)</option>
                {hours.map((hour) => (
                  <option key={hour} value={hour}>{hour}</option>
                ))}
              </select>

              {/* Gender radio buttons */}
              <div 
                className="flex justify-center gap-10 py-2 font-medium text-sm"
                style={{ color: "#4a3420" }}
              >
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-4 h-4"
                    style={{ accentColor: "#830000" }}
                  />
                  Nam
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-4 h-4"
                    style={{ accentColor: "#830000" }}
                  />
                  Nữ
                </label>
              </div>

              {/* Submit button - keep existing FestiveButton */}
              <div className="pt-2">
                <FestiveButton
                  icon={Sparkles}
                  onClick={handleSubmit}
                  compact
                  className="w-full"
                >
                  Xem Tử Vi
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
            {/* Left knob */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 -left-2.5 w-8 h-8 rounded-full"
              style={{
                background: "radial-gradient(circle, #d4a76a, #8b5e34, #3d2516)",
                border: "2px solid #22150c",
              }}
            />
            {/* Right knob */}
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

export default FormPage;
