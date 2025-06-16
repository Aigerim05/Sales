export interface Message {
  type: 'user' | 'ai' | 'tip';
  content: string;
  timestamp: number;
} 