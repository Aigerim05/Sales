import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Mic, Square, Send, User, Bot, Lightbulb, ArrowLeft } from 'lucide-react';
import ProgressIndicator from '@/components/ProgressIndicator';
import { useTheme } from '@/contexts/ThemeContext';

interface Message {
  type: 'user' | 'ai' | 'tip';
  content: string;
  timestamp: number;
}

const FreeTrialChat = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [simulatorData, setSimulatorData] = useState<any>(null);
  const [sessionStartTime] = useState(Date.now());
  const [showEndSessionDialog, setShowEndSessionDialog] = useState(false);
  const [sessionName, setSessionName] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const handleBack = () => {
    navigate('/free-trial/scenario');
  };

  useEffect(() => {
    // Load simulator setup data
    const data = localStorage.getItem('simulatorSetup');
    if (data) {
      setSimulatorData(JSON.parse(data));
    }

    // Add initial AI message
    setMessages([{
      type: 'ai',
      content: "Hello! I'm interested in learning more about your offering. Can you tell me what you're selling?",
      timestamp: Date.now()
    }]);

    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        setTranscript(finalTranscript + interimTranscript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleToggleRecording = () => {
    if (!isRecording && !transcript) {
      // Start recording
      if (!recognitionRef.current) {
        alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
        return;
      }
      
      setIsRecording(true);
      setTranscript('');
      recognitionRef.current.start();
    } else if (isRecording) {
      // Stop recording
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
    } else if (transcript && !isRecording) {
      // Send message
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (!transcript.trim()) return;

    const userMessage: Message = {
      type: 'user',
      content: transcript,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "That sounds interesting. What makes your graphic design services different from others?",
        "I see. How much do your services typically cost?",
        "I've had bad experiences with designers before. How do I know you're reliable?",
        "That's quite expensive. Do you offer any discounts?"
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      setMessages(prev => [...prev, {
        type: 'ai',
        content: randomResponse,
        timestamp: Date.now()
      }]);

      // Sometimes add a coaching tip
      if (Math.random() > 0.7) {
        setTimeout(() => {
          const tips = [
            "Try emphasizing value before discussing price",
            "Ask questions to understand their specific needs",
            "Share a success story to build trust",
            "Focus on ROI rather than cost"
          ];
          
          setMessages(prev => [...prev, {
            type: 'tip',
            content: tips[Math.floor(Math.random() * tips.length)],
            timestamp: Date.now()
          }]);
        }, 1000);
      }
    }, 1500);

    setTranscript('');
  };

  const handleEndSession = () => {
    setShowEndSessionDialog(true);
  };

  const handleSaveSession = () => {
    if (!sessionName.trim()) return;

    // Calculate session duration
    const duration = Math.round((Date.now() - sessionStartTime) / 1000 / 60);
    
    // Get scenario mapping
    const scenarioMap: { [key: string]: string } = {
      'budget-shopper': 'Budget Shopper',
      'wary-buyer': 'Wary Buyer',
      'curious-inquirer': 'Curious Inquirer'
    };

    const personaMap: { [key: string]: string } = {
      'aggressive': 'Aggressive',
      'passive': 'Passive',
      'busy': 'Busy'
    };

    const voiceMap: { [key: string]: string } = {
      'male': 'Male Voice',
      'female': 'Female Voice'
    };
    
    // Save simulation to history - including tips
    const simulationRecord = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      duration: `${duration} minutes`,
      scenario: sessionName.trim(),
      transcript: messages.map(m => {
        if (m.type === 'tip') {
          return `[Tip] ${m.content}`;
        }
        return `${m.type === 'user' ? 'You' : 'AI Client'}: ${m.content}`;
      }),
      createdAt: Date.now(),
      voice: voiceMap[simulatorData?.voice] || simulatorData?.voice || 'Not specified',
      persona: personaMap[simulatorData?.persona] || simulatorData?.persona || 'Not specified',
      customerScenario: scenarioMap[simulatorData?.scenario] || simulatorData?.scenario || 'Not specified'
    };

    // Get existing simulations
    const existingSimulations = JSON.parse(localStorage.getItem('simulationHistory') || '[]');
    
    // Add new simulation
    const updatedSimulations = [simulationRecord, ...existingSimulations];
    
    // Save to localStorage
    localStorage.setItem('simulationHistory', JSON.stringify(updatedSimulations));
    
    // Navigate to account page
    navigate('/account');
  };

  const getButtonText = () => {
    if (isRecording) return 'Stop recording';
    if (transcript && !isRecording) return 'Send';
    return 'Record';
  };

  if (!simulatorData) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`min-h-screen flex flex-col ${
      isDark 
        ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950/30' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      <div className="container mx-auto max-w-4xl py-6 flex-1 flex flex-col">
        <ProgressIndicator currentStep={4} totalSteps={4} />
        
        {/* Top Bar */}
        <div className={`flex items-center justify-between p-4 rounded-lg mb-6 ${
          isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/80 backdrop-blur-sm border border-gray-200'
        }`}>
          <Button
            onClick={handleBack}
            variant="outline"
            className="flex items-center gap-2 border-gray-600 text-white hover:bg-gray-800"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👤</span>
              <span className={isDark ? 'text-gray-200' : 'text-gray-700'}>
                {simulatorData.voice || 'Male Voice'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                Persona: "{simulatorData.scenario || 'Budget Shopper'}"
              </span>
            </div>
          </div>
          
          <Button 
            onClick={handleEndSession}
            className="bg-black hover:bg-gray-800 text-white"
          >
            End Session
          </Button>
        </div>

        {/* Chat Window - Main Column */}
        <Card className={`flex-1 flex flex-col mb-6 ${
          isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white/80 backdrop-blur-sm border-gray-200'
        }`}>
          <CardContent className="flex-1 flex flex-col p-6">
            <div className="flex-1 overflow-y-auto space-y-4">
              {messages.map((message, index) => (
                <div key={index}>
                  {message.type === 'tip' ? (
                    // Agent Coach Tips - Helper bubbles
                    <div className="flex justify-center my-4">
                      <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-2 rounded-full flex items-center gap-2 max-w-md">
                        <Lightbulb className="w-4 h-4" />
                        <span className="text-sm font-medium">[Tip] {message.content}</span>
                      </div>
                    </div>
                  ) : (
                    // Conversation Bubbles
                    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] p-4 rounded-lg flex items-start gap-3 ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          : isDark 
                            ? 'bg-gray-700 text-gray-200' 
                            : 'bg-gray-100 text-gray-800'
                      }`}>
                        {message.type === 'user' ? (
                          <User className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        ) : (
                          <Bot className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        )}
                        <span>{message.content}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
        </Card>

        {/* Body Helper Text */}
        <div className="text-center mb-4">
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Press Record, speak your pitch, then Send to listen and get feedback.
          </p>
        </div>

        {/* Record Controls - Fixed Bottom Bar */}
        <div className={`p-6 rounded-lg ${
          isDark ? 'bg-gray-800/50 border border-gray-700' : 'bg-white/80 backdrop-blur-sm border border-gray-200'
        }`}>
          {transcript && (
            <div className={`p-3 rounded-lg border-2 border-dashed mb-4 ${
              isDark ? 'border-gray-600 bg-gray-700 text-gray-200' : 'border-gray-300 bg-gray-50 text-gray-800'
            }`}>
              <p className="text-sm font-medium mb-1">Your message:</p>
              <p>{transcript}</p>
            </div>
          )}

          <div className="flex justify-center">
            <Button
              onClick={handleToggleRecording}
              className={`bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-medium ${
                isRecording ? 'animate-pulse' : ''
              }`}
            >
              {getButtonText()}
            </Button>
          </div>
        </div>
      </div>

      {/* End Session Dialog */}
      <Dialog open={showEndSessionDialog} onOpenChange={setShowEndSessionDialog}>
        <DialogContent className={`${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <DialogHeader>
            <DialogTitle className={isDark ? 'text-white' : 'text-gray-900'}>
              Name Your Session
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Enter session name..."
              value={sessionName}
              onChange={(e) => setSessionName(e.target.value)}
              className={`${
                isDark 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowEndSessionDialog(false)}
              className="border-gray-600 text-white hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveSession}
              disabled={!sessionName.trim()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              Save Session
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FreeTrialChat;
