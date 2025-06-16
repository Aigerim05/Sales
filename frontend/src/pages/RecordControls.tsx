import { Button } from '@/components/ui/button';

interface RecordControlsProps {
  transcript: string;
  isRecording: boolean;
  onToggleRecording: () => void;
  getButtonText: () => string;
}

const RecordControls = ({ transcript, isRecording, onToggleRecording, getButtonText }: RecordControlsProps) => (
  <div className="p-6 rounded-lg bg-white/80 border border-gray-200">
    {transcript && (
      <div className="p-3 rounded-lg border-2 border-dashed mb-4 border-gray-300 bg-gray-100 text-gray-900">
        <p className="text-sm font-medium mb-1">Your message:</p>
        <p>{transcript}</p>
      </div>
    )}
    <div className="flex justify-center">
      <Button
        onClick={onToggleRecording}
        className={`bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-medium ${
          isRecording ? 'animate-pulse' : ''
        }`}
      >
        {getButtonText()}
      </Button>
    </div>
  </div>
);

export default RecordControls; 