import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProgressIndicator from '@/components/ProgressIndicator';
import { Play, User, UserCheck, ArrowLeft } from 'lucide-react';

const FreeTrialVoice = () => {
  const navigate = useNavigate();
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [selectedPersona, setSelectedPersona] = useState<string>('');

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
    navigate('/free-trial/setup');
  };

  const handleContinue = () => {
    // Store selections in localStorage
    const existingData = JSON.parse(localStorage.getItem('simulatorSetup') || '{}');
    localStorage.setItem('simulatorSetup', JSON.stringify({
      ...existingData,
      voice: selectedVoice,
      persona: selectedPersona
    }));
    navigate('/free-trial/scenario');
  };

  const isSelectionComplete = selectedVoice && selectedPersona;

  return (
    <div className={"min-h-screen py-12 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"}>
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
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Voice Selection
            </h2>
            <div className="space-y-4">
              {voices.map((voice) => {
                const Icon = voice.icon;
                const isSelected = selectedVoice === voice.id;
                
                return (
                  <Card
                    key={voice.id}
                    className={`cursor-pointer transition-all ${
                      isSelected
                        ? 'ring-2 ring-blue-500 bg-gradient-to-r from-blue-50 to-purple-50'
                        : 'bg-white/80 backdrop-blur-sm border-gray-200 hover:shadow-md'
                    }`}
                    onClick={() => setSelectedVoice(voice.id)}
                  >
                    <CardContent className="flex items-center p-4">
                      <Icon className={`w-8 h-8 mr-4 ${
                        isSelected 
                          ? 'text-blue-600' 
                          : 'text-gray-600'
                      }`} />
                      <span className={`font-medium ${
                        isSelected 
                          ? 'text-blue-600' 
                          : 'text-gray-900'
                      }`}>
                        {voice.name}
                      </span>
                      <Play className={`w-5 h-5 ml-auto ${
                        isSelected 
                          ? 'text-blue-600' 
                          : 'text-gray-500'
                      }`} />
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Persona Selection */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Client Persona
            </h2>
            <div className="space-y-4">
              {personas.map((persona) => {
                const isSelected = selectedPersona === persona.id;
                
                return (
                  <Card
                    key={persona.id}
                    className={`cursor-pointer transition-all ${
                      isSelected
                        ? 'ring-2 ring-purple-500 bg-gradient-to-r from-purple-50 to-blue-50'
                        : 'bg-white/80 backdrop-blur-sm border-gray-200 hover:shadow-md'
                    }`}
                    onClick={() => setSelectedPersona(persona.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-3">{persona.emoji}</span>
                        <span className={`font-medium ${
                          isSelected 
                            ? 'text-purple-600' 
                            : 'text-gray-900'
                        }`}>
                          {persona.name}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {persona.description}
                      </p>
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
