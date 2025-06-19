import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProgressIndicator from '@/components/ProgressIndicator';
import { Message } from '@/types/Message';
import ChatMessage from './ChatMessage';
import EndSessionDialog from './EndSessionDialog';
import RecordControls from './RecordControls';
import { useSimulatorStore } from '@/store/useSimulatorStore';

const FreeTrialChat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [simulatorData, setSimulatorData] = useState<any>(null);
  const [sessionStartTime] = useState(Date.now());
  const [showEndSessionDialog, setShowEndSessionDialog] = useState(false);
  const [sessionName, setSessionName] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const { config, reset } = useSimulatorStore();
  alert(JSON.stringify(config))

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
      date: new Date(sessionStartTime).toLocaleDateString(),
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
    <div className={"min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"}>
      <div className="container mx-auto max-w-4xl py-6 flex-1 flex flex-col">
        <ProgressIndicator currentStep={4} totalSteps={4} />
        {/* Top Bar */}
        <div className="flex items-center justify-between p-4 rounded-lg mb-6 bg-white/80 border border-gray-200">
          <Button
            onClick={handleBack}
            variant="outline"
            className="flex items-center gap-2 border-gray-600 text-white bg-gray-800 hover:bg-gray-900"
          >
            {/* @ts-ignore */}
            <span className="w-4 h-4">←</span>
            Back
          </Button>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👤</span>
              <span className="text-gray-700">
                {simulatorData.voice || 'Male Voice'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">
                Persona: "{simulatorData.scenario || 'Budget Shopper'}"
              </span>
            </div>
          </div>
          <Button 
            onClick={handleEndSession}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            End Session
          </Button>
        </div>
        {/* Chat Window - Main Column */}
        <Card className="flex-1 flex flex-col mb-6 bg-white/80 border-gray-200">
          <CardContent className="flex-1 flex flex-col p-6">
            <div className="flex-1 overflow-y-auto space-y-4">
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
        </Card>
        {/* Body Helper Text */}
        <div className="text-center mb-4">
          <p className="text-sm text-gray-600">
            Press Record, speak your pitch, then Send to listen and get feedback.
          </p>
        </div>
        {/* Record Controls - Fixed Bottom Bar */}
        <RecordControls
          transcript={transcript}
          isRecording={isRecording}
          onToggleRecording={handleToggleRecording}
          getButtonText={getButtonText}
        />
      </div>
      {/* End Session Dialog */}
      <EndSessionDialog
        open={showEndSessionDialog}
        onOpenChange={setShowEndSessionDialog}
        sessionName={sessionName}
        setSessionName={setSessionName}
        onSave={handleSaveSession}
        onCancel={() => setShowEndSessionDialog(false)}
      />
    </div>
  );
};

export default FreeTrialChat;
