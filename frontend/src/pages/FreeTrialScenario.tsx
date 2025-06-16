import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProgressIndicator from '@/components/ProgressIndicator';
import { useTheme } from '@/contexts/ThemeContext';
import { ArrowLeft } from 'lucide-react';

const FreeTrialScenario = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [selectedScenario, setSelectedScenario] = useState<string>('');

  const scenarios = [
    {
      id: 'budget-shopper',
      title: 'Budget Shopper',
      description: 'Seeks the lowest price; asks for discounts.'
    },
    {
      id: 'wary-buyer',
      title: 'Wary Buyer',
      description: 'Had a bad past experience; distrustful.'
    },
    {
      id: 'curious-inquirer',
      title: 'Curious Inquirer',
      description: 'Anxious & curious; fires rapid questions.'
    }
  ];

  const handleBack = () => {
    navigate('/free-trial/voice');
  };

  const handleStartChat = () => {
    // Store scenario selection in localStorage
    const existingData = JSON.parse(localStorage.getItem('simulatorSetup') || '{}');
    localStorage.setItem('simulatorSetup', JSON.stringify({
      ...existingData,
      scenario: selectedScenario
    }));
    navigate('/free-trial/chat');
  };

  return (
    <div className={`min-h-screen py-12 px-4 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950/30' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      <div className="container mx-auto max-w-6xl">
        <ProgressIndicator currentStep={3} totalSteps={4} />
        
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={handleBack}
            variant="outline"
            className="flex items-center gap-2 border-gray-600 text-white hover:bg-gray-800"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          
          <h1 className={`text-4xl font-bold ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Pick a Customer Behavior to{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Practice Against
            </span>
          </h1>
          
          <div />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {scenarios.map((scenario, index) => {
            const isSelected = selectedScenario === scenario.id;
            
            return (
              <Card
                key={scenario.id}
                className={`cursor-pointer transition-all h-full ${
                  isSelected
                    ? 'ring-2 ring-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20'
                    : isDark
                      ? 'bg-gray-800/50 border-gray-700 hover:bg-gray-800'
                      : 'bg-white/80 backdrop-blur-sm border-gray-200 hover:shadow-lg'
                }`}
                onClick={() => setSelectedScenario(scenario.id)}
              >
                <CardHeader>
                  <CardTitle className={`text-xl ${
                    isSelected 
                      ? 'text-blue-600' 
                      : isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {index + 1}. {scenario.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    "{scenario.description}"
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <p className={`mb-6 text-lg ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Select one scenario to launch your live role-play.
          </p>
          
          <Button
            onClick={handleStartChat}
            disabled={!selectedScenario}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-3 h-auto disabled:opacity-50"
          >
            Start Chat →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FreeTrialScenario;
