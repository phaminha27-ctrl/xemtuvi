import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AudioProvider } from "@/contexts/AudioContext";
import HomePage from "./pages/HomePage";
import FaceScanPage from "./pages/FaceScanPage";
import LoadingPage from "./pages/LoadingPage";
import FaceResultPage from "./pages/FaceResultPage";
import FormPage from "./pages/FormPage";
import ResultPage from "./pages/ResultPage";
import NumerologyFormPage from "./pages/NumerologyFormPage";
import NumerologyResultPage from "./pages/NumerologyResultPage";
import TarotCharacterSelectPage from "./pages/TarotCharacterSelectPage";
import TarotQuestionPage from "./pages/TarotQuestionPage";
import TarotTablePage from "./pages/TarotTablePage";
import TarotResultPage from "./pages/TarotResultPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AudioProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/scan" element={<FaceScanPage />} />
            <Route path="/loading" element={<LoadingPage />} />
            <Route path="/face-result" element={<FaceResultPage />} />
            <Route path="/form" element={<FormPage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/numerology" element={<NumerologyFormPage />} />
            <Route path="/numerology/result" element={<NumerologyResultPage />} />
            <Route path="/tarot" element={<TarotCharacterSelectPage />} />
            <Route path="/tarot/question" element={<TarotQuestionPage />} />
            <Route path="/tarot/table" element={<TarotTablePage />} />
            <Route path="/tarot/result" element={<TarotResultPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AudioProvider>
  </QueryClientProvider>
);

export default App;
