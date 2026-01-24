import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import FestiveButton from "@/components/FestiveButton";
import IconButton from "@/components/IconButton";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        {/* Form area - centered in the scroll area of background */}
        <div className="flex flex-col items-center px-4 sm:px-6 md:px-8">
          <motion.div
            className="w-full max-w-[200px] sm:max-w-[220px] md:max-w-[260px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Form fields */}
            <div className="space-y-1">
              {/* Name */}
              <div>
                <span className="text-festive-brown font-semibold text-xs">Họ và tên</span>
                <Input
                  placeholder="Nhập họ tên"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-7 text-xs bg-parchment-light/90 border-festive-brown/40 text-festive-brown placeholder:text-festive-brown/50"
                />
              </div>

              {/* Birth date */}
              <div>
                <span className="text-festive-brown font-semibold text-xs">Ngày sinh (Dương lịch)</span>
                <div className="grid grid-cols-3 gap-1">
                  <Select
                    value={formData.birthDay}
                    onValueChange={(value) => setFormData({ ...formData, birthDay: value })}
                  >
                    <SelectTrigger className="h-7 text-xs bg-parchment-light/90 border-festive-brown/40 text-festive-brown">
                      <SelectValue placeholder="Ngày" />
                    </SelectTrigger>
                    <SelectContent>
                      {days.map((day) => (
                        <SelectItem key={day} value={day}>{day}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={formData.birthMonth}
                    onValueChange={(value) => setFormData({ ...formData, birthMonth: value })}
                  >
                    <SelectTrigger className="h-7 text-xs bg-parchment-light/90 border-festive-brown/40 text-festive-brown">
                      <SelectValue placeholder="Tháng" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month} value={month}>Tháng {month}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={formData.birthYear}
                    onValueChange={(value) => setFormData({ ...formData, birthYear: value })}
                  >
                    <SelectTrigger className="h-7 text-xs bg-parchment-light/90 border-festive-brown/40 text-festive-brown">
                      <SelectValue placeholder="Năm" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Gender */}
              <div>
                <span className="text-festive-brown font-semibold text-xs">Giới tính</span>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => setFormData({ ...formData, gender: value })}
                >
                  <SelectTrigger className="h-7 text-xs bg-parchment-light/90 border-festive-brown/40 text-festive-brown">
                    <SelectValue placeholder="Chọn giới tính" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Nam</SelectItem>
                    <SelectItem value="female">Nữ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Birth hour */}
              <div>
                <span className="text-festive-brown font-semibold text-xs">Giờ sinh (tùy chọn)</span>
                <Select
                  value={formData.birthHour}
                  onValueChange={(value) => setFormData({ ...formData, birthHour: value })}
                >
                  <SelectTrigger className="h-7 text-xs bg-parchment-light/90 border-festive-brown/40 text-festive-brown">
                    <SelectValue placeholder="Chọn giờ sinh" />
                  </SelectTrigger>
                  <SelectContent>
                    {hours.map((hour) => (
                      <SelectItem key={hour} value={hour}>{hour}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Submit button */}
              <div className="pt-1">
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
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
