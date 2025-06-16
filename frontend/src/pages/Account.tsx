import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, MessageSquare, Calendar, Clock, Send, Lightbulb } from 'lucide-react';

interface SimulationRecord {
  id: string;
  date: string;
  duration: string;
  scenario: string;
  transcript: string[];
  createdAt: number;
  voice?: string;
  persona?: string;
  customerScenario?: string;
}

const Account = () => {
  const navigate = useNavigate();
  const [simulations, setSimulations] = useState<SimulationRecord[]>([]);
  const [selectedSimulation, setSelectedSimulation] = useState<SimulationRecord | null>(null);

  useEffect(() => {
    // Load simulation history from localStorage
    const savedSimulations = localStorage.getItem('simulationHistory');
    if (savedSimulations) {
      setSimulations(JSON.parse(savedSimulations));
    }
  }, []);

  const handleNewSimulation = () => {
    navigate('/free-trial/setup');
  };

  const handleViewTranscript = (simulation: SimulationRecord) => {
    setSelectedSimulation(simulation);
  };

  const handleBackToList = () => {
    setSelectedSimulation(null);
  };

  const getMessageStyle = (message: string) => {
    if (message.startsWith('You:')) {
      return 'bg-gray-100 border-2 border-blue-500 text-gray-800';
    } else if (message.startsWith('AI Client:')) {
      return 'bg-gray-100 border-2 border-purple-500 text-gray-800';
    } else if (message.startsWith('[Tip]')) {
      return 'bg-yellow-100 border border-yellow-300 text-yellow-800';
    }
    return 'bg-gray-50 text-gray-800';
  };

  const renderMessage = (message: string, index: number) => {
    if (message.startsWith('[Tip]')) {
      return (
        <div key={index} className="flex justify-center my-4">
          <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-2 rounded-full flex items-center gap-2 max-w-md">
            <Lightbulb className="w-4 h-4" />
            <span className="text-sm font-medium">{message}</span>
          </div>
        </div>
      );
    }

    const isUserMessage = message.startsWith('You:');
    
    return (
      <div 
        key={index} 
        className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div 
          className={`p-4 rounded-lg max-w-[80%] ${getMessageStyle(message)}`}
        >
          <p>{message}</p>
        </div>
      </div>
    );
  };

  if (selectedSimulation) {
    return (
      <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <Button 
              onClick={handleBackToList}
              variant="outline"
              className="border-gray-300 text-white bg-gray-800 hover:bg-gray-900"
            >
              ← Back to Simulations
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">
              Simulation Script
            </h1>
            <div />
          </div>

          <Card className="bg-white/80 border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">
                {selectedSimulation.scenario} - {selectedSimulation.date}
              </CardTitle>
              <p className="text-gray-600">
                Duration: {selectedSimulation.duration}
              </p>
              {/* Simulation Settings */}
              <div className="mt-4 p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold mb-2 text-gray-900">
                  Simulation Settings:
                </h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><span className="font-medium">Voice:</span> {selectedSimulation.voice || 'Not specified'}</p>
                  <p><span className="font-medium">Persona:</span> {selectedSimulation.persona || 'Not specified'}</p>
                  <p><span className="font-medium">Customer Scenario:</span> {selectedSimulation.customerScenario || 'Not specified'}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedSimulation.transcript.map((message, index) => 
                  renderMessage(message, index)
                )}
              </div>
            </CardContent>
          </Card>

          {/* Send Script Button - Fixed at bottom right */}
          <div className="fixed bottom-6 right-6">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 flex items-center gap-2">
              <Send className="w-5 h-5" />
              Send Script
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            My <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Simulations
            </span>
          </h1>
          <Button 
            onClick={handleNewSimulation}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Simulation
          </Button>
        </div>

        {simulations.length === 0 ? (
          <div className="text-center py-16">
            <MessageSquare className="w-24 h-24 mx-auto mb-6 text-gray-600" />
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              No simulations yet
            </h2>
            <p className="text-lg mb-8 text-gray-600">
              Start your first AI sales simulation to begin building your conversation history.
            </p>
            <Button 
              onClick={handleNewSimulation}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-3 h-auto"
            >
              Start Your First Simulation
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {simulations.map((simulation) => (
              <Card 
                key={simulation.id}
                className="cursor-pointer transition-all hover:shadow-lg bg-white/80 border-gray-200 hover:bg-white"
                onClick={() => handleViewTranscript(simulation)}
              >
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900">
                    {simulation.scenario}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{simulation.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{simulation.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MessageSquare className="w-4 h-4" />
                      <span>{simulation.transcript.length} messages</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
