import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import FestiveButton from "@/components/FestiveButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    "Tý (23h-1h)",
    "Sửu (1h-3h)",
    "Dần (3h-5h)",
    "Mão (5h-7h)",
    "Thìn (7h-9h)",
    "Tỵ (9h-11h)",
    "Ngọ (11h-13h)",
    "Mùi (13h-15h)",
    "Thân (15h-17h)",
    "Dậu (17h-19h)",
    "Tuất (19h-21h)",
    "Hợi (21h-23h)",
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

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center py-4">
        {/* Form area - centered in the scroll area of background */}
        <div className="flex flex-col items-center px-4 sm:px-6 md:px-8 mt-[28vh] sm:mt-[32vh]">
          <motion.div
            className="w-full max-w-[220px] sm:max-w-[260px] md:max-w-[300px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Form fields without frame */}
            <div className="space-y-1.5 sm:space-y-2">
              {/* Name */}
              <div>
                <Label className="text-festive-brown font-semibold text-sm sm:text-base">Họ và tên</Label>
                <Input
                  placeholder="Nhập họ tên của bạn"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 bg-parchment-light/90 border-festive-brown/40 text-festive-brown placeholder:text-festive-brown/50"
                />
              </div>

              {/* Birth date */}
              <div>
                <Label className="text-festive-brown font-semibold text-sm sm:text-base">Ngày sinh (Dương lịch)</Label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  <Select
                    value={formData.birthDay}
                    onValueChange={(value) => setFormData({ ...formData, birthDay: value })}
                  >
                    <SelectTrigger className="bg-parchment-light/90 border-festive-brown/40 text-festive-brown">
                      <SelectValue placeholder="Ngày" />
                    </SelectTrigger>
                    <SelectContent>
                      {days.map((day) => (
                        <SelectItem key={day} value={day}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={formData.birthMonth}
                    onValueChange={(value) => setFormData({ ...formData, birthMonth: value })}
                  >
                    <SelectTrigger className="bg-parchment-light/90 border-festive-brown/40 text-festive-brown">
                      <SelectValue placeholder="Tháng" />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((month) => (
                        <SelectItem key={month} value={month}>
                          Tháng {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={formData.birthYear}
                    onValueChange={(value) => setFormData({ ...formData, birthYear: value })}
                  >
                    <SelectTrigger className="bg-parchment-light/90 border-festive-brown/40 text-festive-brown">
                      <SelectValue placeholder="Năm" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Gender */}
              <div>
                <Label className="text-festive-brown font-semibold text-sm sm:text-base">Giới tính</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => setFormData({ ...formData, gender: value })}
                >
                  <SelectTrigger className="mt-1 bg-parchment-light/90 border-festive-brown/40 text-festive-brown">
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
                <Label className="text-festive-brown font-semibold text-sm sm:text-base">Giờ sinh (tùy chọn)</Label>
                <Select
                  value={formData.birthHour}
                  onValueChange={(value) => setFormData({ ...formData, birthHour: value })}
                >
                  <SelectTrigger className="mt-1 bg-parchment-light/90 border-festive-brown/40 text-festive-brown">
                    <SelectValue placeholder="Chọn giờ sinh" />
                  </SelectTrigger>
                  <SelectContent>
                    {hours.map((hour) => (
                      <SelectItem key={hour} value={hour}>
                        {hour}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Submit button */}
              <div className="pt-2">
                <FestiveButton
                  icon={Sparkles}
                  onClick={handleSubmit}
                  className="w-full"
                >
                  Xem Tử Vi
                </FestiveButton>
              </div>

              <button
                onClick={() => navigate("/")}
                className="w-full text-center text-festive-brown font-medium underline text-sm sm:text-base"
              >
                ← Quay lại trang chủ
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
