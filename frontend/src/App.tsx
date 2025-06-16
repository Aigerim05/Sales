
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Account from "./pages/Account";
import FreeTrialSetup from "./pages/FreeTrialSetup";
import FreeTrialVoice from "./pages/FreeTrialVoice";
import FreeTrialScenario from "./pages/FreeTrialScenario";
import FreeTrialChat from "./pages/FreeTrialChat";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/account" element={<Layout><Account /></Layout>} />
            <Route path="/free-trial/setup" element={<FreeTrialSetup />} />
            <Route path="/free-trial/voice" element={<FreeTrialVoice />} />
            <Route path="/free-trial/scenario" element={<FreeTrialScenario />} />
            <Route path="/free-trial/chat" element={<FreeTrialChat />} />
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
