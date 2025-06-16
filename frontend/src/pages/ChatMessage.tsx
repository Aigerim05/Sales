import { User, Bot, Lightbulb } from 'lucide-react';
import { Message } from '@/types/Message';

const ChatMessage = ({ message }: { message: Message }) => {
  if (message.type === 'tip') {
    return (
      <div className="flex justify-center my-4">
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-2 rounded-full flex items-center gap-2 max-w-md">
          <Lightbulb className="w-4 h-4" />
          <span className="text-sm font-medium">[Tip] {message.content}</span>
        </div>
      </div>
    );
  }
  return (
    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[70%] p-4 rounded-lg flex items-start gap-3 ${
        message.type === 'user'
          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
          : 'bg-gray-100 text-gray-900'
      }`}>
        {message.type === 'user' ? (
          <User className="w-5 h-5 mt-0.5 flex-shrink-0" />
        ) : (
          <Bot className="w-5 h-5 mt-0.5 flex-shrink-0" />
        )}
        <span>{message.content}</span>
      </div>
    </div>
  );
};

export default ChatMessage; 