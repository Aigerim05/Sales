import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProgressIndicator from '@/components/ProgressIndicator';
import { ArrowLeft } from 'lucide-react';
import { Scenario, useSimulatorStore } from '@/store/useSimulatorStore';
import { useState } from 'react';

const FreeTrialScenario = () => {
  const navigate = useNavigate();
  const { setConfig } = useSimulatorStore();
  const [scenario, setScenario] = useState<Scenario>('budget-shopper');

  const scenarios = [
    { id: 'discount', title: 'Asks for Discount', emoji: '💸', description: 'Client wants a lower price' },
    { id: 'rush', title: 'In a Rush', emoji: '🏃‍♂️', description: 'Client is short on time' },
    { id: 'skeptical', title: 'Skeptical', emoji: '🤨', description: 'Client questions everything' }
  ];

  const handleBack = () => {
    // setStep(2);
    navigate('/free-trial/voice');
  };

  const handleStart = () => {
    // setStep(4);
    setConfig({ scenario: scenario });
    navigate('/free-trial/chat');
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      <div className="container mx-auto max-w-3xl">
        <ProgressIndicator currentStep={3} totalSteps={4} />

        <div className="flex items-center justify-between mb-8">
          <Button onClick={handleBack} variant="outline" className="flex items-center gap-2 border-gray-600 text-white bg-gray-800 hover:bg-gray-900">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <h1 className="text-4xl font-bold text-gray-900 text-center">Choose a <span className="text-purple-600">Sales Scenario</span></h1>

          <div />
        </div>

        <div className="grid grid-cols-1 gap-6">
          {scenarios.map((s) => {
            const isSelected = scenario === s.id;

            return (
              <Card
                key={s.id}
                className={`cursor-pointer transition-all ${
                  isSelected
                    ? 'ring-2 ring-purple-500 bg-gradient-to-r from-purple-50 to-blue-50'
                    : 'bg-white/80 backdrop-blur-sm border-gray-200 hover:shadow-md'
                }`}
                onClick={() => setScenario(s.id as Scenario)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-3">{s.emoji}</span>
                    <span className={`font-medium ${isSelected ? 'text-purple-600' : 'text-gray-900'}`}>{s.title}</span>
                  </div>
                  <p className="text-sm text-gray-600">{s.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Button
            onClick={handleStart}
            disabled={!scenario}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg px-8 py-3 h-auto disabled:opacity-50"
          >
            Start Simulation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FreeTrialScenario;

