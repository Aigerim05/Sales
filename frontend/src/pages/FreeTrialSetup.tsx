
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProgressIndicator from '@/components/ProgressIndicator';
import { useTheme } from '@/contexts/ThemeContext';

const FreeTrialSetup = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    offering: '',
    background: ''
  });

  const handleContinue = () => {
    // Store form data in localStorage for the simulator flow
    localStorage.setItem('simulatorSetup', JSON.stringify(formData));
    navigate('/free-trial/voice');
  };

  const isFormValid = formData.offering.trim() && formData.background.trim();

  return (
    <div className={`min-h-screen py-12 px-4 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950/30' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      <div className="container mx-auto max-w-2xl">
        <ProgressIndicator currentStep={1} totalSteps={4} />
        
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-bold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Welcome to Your First{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Sales Session
            </span>
          </h1>
          <p className={`text-xl ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Let's get to know your offering so we can tailor the practice.
          </p>
        </div>

        <Card className={`${
          isDark 
            ? 'bg-gray-800/50 border-gray-700' 
            : 'bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg'
        }`}>
          <CardHeader>
            <CardTitle className={`text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Tell Us About You
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="offering" className={isDark ? 'text-gray-200' : 'text-gray-700'}>
                What do you sell?
              </Label>
              <Input
                id="offering"
                placeholder="e.g. Graphic design services, SaaS platform…"
                value={formData.offering}
                onChange={(e) => setFormData(prev => ({ ...prev, offering: e.target.value }))}
                className={
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-black placeholder-gray-500'
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="background" className={isDark ? 'text-gray-200' : 'text-gray-700'}>
                Tell us about your background
              </Label>
              <Textarea
                id="background"
                placeholder="Your role, industry experience, goals…"
                value={formData.background}
                onChange={(e) => setFormData(prev => ({ ...prev, background: e.target.value }))}
                className={`min-h-[120px] ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-black placeholder-gray-500'
                }`}
              />
            </div>

            <Button
              onClick={handleContinue}
              disabled={!isFormValid}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg py-3 h-auto disabled:opacity-50"
            >
              Continue →
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FreeTrialSetup;
