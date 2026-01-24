import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import FestiveLayout from "@/components/FestiveLayout";
import ScrollCard from "@/components/ScrollCard";
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
    <FestiveLayout>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-6 sm:py-8">
        <motion.h1
          className="font-festive text-2xl sm:text-3xl md:text-4xl text-festive-gold text-center mb-4 sm:mb-6 text-shadow-festive"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Nhập Thông Tin
        </motion.h1>

        <motion.div
          className="w-full max-w-xs sm:max-w-sm md:max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ScrollCard title="Thông Tin Cá Nhân">
            <div className="space-y-4">
              {/* Name */}
              <div>
                <Label className="text-festive-brown font-medium">Họ và tên</Label>
                <Input
                  placeholder="Nhập họ tên của bạn"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 bg-background/80 border-festive-brown/30"
                />
              </div>

              {/* Birth date */}
              <div>
                <Label className="text-festive-brown font-medium">Ngày sinh (Dương lịch)</Label>
                <div className="grid grid-cols-3 gap-2 mt-1">
                  <Select
                    value={formData.birthDay}
                    onValueChange={(value) => setFormData({ ...formData, birthDay: value })}
                  >
                    <SelectTrigger className="bg-background/80 border-festive-brown/30">
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
                    <SelectTrigger className="bg-background/80 border-festive-brown/30">
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
                    <SelectTrigger className="bg-background/80 border-festive-brown/30">
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
                <Label className="text-festive-brown font-medium">Giới tính</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => setFormData({ ...formData, gender: value })}
                >
                  <SelectTrigger className="mt-1 bg-background/80 border-festive-brown/30">
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
                <Label className="text-festive-brown font-medium">Giờ sinh (tùy chọn)</Label>
                <Select
                  value={formData.birthHour}
                  onValueChange={(value) => setFormData({ ...formData, birthHour: value })}
                >
                  <SelectTrigger className="mt-1 bg-background/80 border-festive-brown/30">
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
            </div>
          </ScrollCard>
        </motion.div>

        {/* Submit button */}
        <motion.div
          className="mt-4 sm:mt-6 w-full max-w-xs sm:max-w-sm md:max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <FestiveButton
            icon={Sparkles}
            onClick={handleSubmit}
            className="w-full"
          >
            Xem Tử Vi
          </FestiveButton>

          <button
            onClick={() => navigate("/")}
            className="w-full text-center text-festive-cream underline mt-4"
          >
            ← Quay lại trang chủ
          </button>
        </motion.div>
      </div>
    </FestiveLayout>
  );
};

export default FormPage;
