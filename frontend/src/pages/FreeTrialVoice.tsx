import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProgressIndicator from '@/components/ProgressIndicator';
import { Play, User, UserCheck, ArrowLeft } from 'lucide-react';
import { useSimulatorStore, Voice, Persona } from '@/store/useSimulatorStore';
import { useState } from 'react';

const FreeTrialVoice = () => {
  const navigate = useNavigate();
  const { setConfig } = useSimulatorStore();
  const [voice, setVoice] = useState<Voice>('male');
  const [persona, setPersona] = useState<Persona>('aggressive');

  const voices = [
    { id: 'male', name: 'Male Voice', icon: User },
    { id: 'female', name: 'Female Voice', icon: UserCheck }
  ];

  const personas = [
    { id: 'aggressive', name: 'Aggressive', emoji: '😡', description: 'Direct and demanding' },
    { id: 'passive', name: 'Passive', emoji: '😐', description: 'Reserved and hesitant' },
    { id: 'busy', name: 'Busy', emoji: '⏰', description: 'Time-conscious and rushed' }
  ];

  const handleBack = () => {
    // setStep(1);
    navigate('/free-trial/setup');
  };

  const handleContinue = () => {
    // setStep(3);
    setConfig({ voice: voice, persona: persona });
    navigate('/free-trial/scenario');
  };

  const isSelectionComplete = voice && persona;

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto max-w-4xl">
        <ProgressIndicator currentStep={2} totalSteps={4} />

        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={handleBack}
            variant="outline"
            className="flex items-center gap-2 border-gray-600 text-white bg-gray-800 hover:bg-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <h1 className="text-4xl font-bold text-gray-900">
            Choose Your AI Client's{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Voice & Character
            </span>
          </h1>

          <div />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Voice Selection */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Voice Selection</h2>
            <div className="space-y-4">
              {voices.map((v) => {
                const Icon = v.icon;
                const isSelected = voice === v.id;

                return (
                  <Card
                    key={v.id}
                    className={`cursor-pointer transition-all ${
                      isSelected
                        ? 'ring-2 ring-blue-500 bg-gradient-to-r from-blue-50 to-purple-50'
                        : 'bg-white/80 backdrop-blur-sm border-gray-200 hover:shadow-md'
                    }`}
                    onClick={() => setVoice(v.id as Voice)}
                  >
                    <CardContent className="flex items-center p-4">
                      <Icon className={`w-8 h-8 mr-4 ${isSelected ? 'text-blue-600' : 'text-gray-600'}`} />
                      <span className={`font-medium ${isSelected ? 'text-blue-600' : 'text-gray-900'}`}>{v.name}</span>
                      <Play className={`w-5 h-5 ml-auto ${isSelected ? 'text-blue-600' : 'text-gray-500'}`} />
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Persona Selection */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Client Persona</h2>
            <div className="space-y-4">
              {personas.map((p) => {
                const isSelected = persona === p.id;

                return (
                  <Card
                    key={p.id}
                    className={`cursor-pointer transition-all ${
                      isSelected
                        ? 'ring-2 ring-purple-500 bg-gradient-to-r from-purple-50 to-blue-50'
                        : 'bg-white/80 backdrop-blur-sm border-gray-200 hover:shadow-md'
                    }`}
                    onClick={() => setPersona(p.id as Persona)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-3">{p.emoji}</span>
                        <span className={`font-medium ${isSelected ? 'text-purple-600' : 'text-gray-900'}`}>{p.name}</span>
                      </div>
                      <p className="text-sm text-gray-600">{p.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="mb-6 text-lg text-gray-600">
            Select one voice and one persona to start your tailored conversation.
          </p>

          <Button
            onClick={handleContinue}
            disabled={!isSelectionComplete}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-3 h-auto disabled:opacity-50"
          >
            Continue →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FreeTrialVoice;
