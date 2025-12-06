import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { chatbotApi } from '@/api/chatbotApi';
import { useAuth } from '@/context/AuthContext';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  links?: string[];
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your PMS assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  // For demo purposes, using mock staff data
  // TODO: Replace with actual authenticated user data
  const staffData = {
    name: 'John',
    id: '1234', // PIN code
    // rfid: '5678901234' // Alternative: use RFID
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Load chat history when component opens
    if (isOpen && staffData.id) {
      loadChatHistory();
    }
  }, [isOpen]);

  const loadChatHistory = async () => {
    try {
      const history = await chatbotApi.getChatHistory(staffData.id);
      
      if (history.history && history.history.length > 0) {
        const loadedMessages: Message[] = history.history.flatMap((item, index) => [
          {
            id: index * 2 + 1,
            text: item.user,
            sender: 'user' as const,
            timestamp: new Date(item.timestamp),
          },
          {
            id: index * 2 + 2,
            text: item.assistant,
            sender: 'bot' as const,
            timestamp: new Date(item.timestamp),
          },
        ]);
        
        setMessages([
          {
            id: 0,
            text: "Hi! I'm your PMS assistant. How can I help you today?",
            sender: 'bot',
            timestamp: new Date(),
          },
          ...loadedMessages,
        ]);
      }
    } catch (err) {
      console.error('Failed to load chat history:', err);
      // Continue with default welcome message
    }
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      // Call the chatbot API
      const response = await chatbotApi.sendMessage({
        message: currentInput,
        staff_name: staffData.name,
        staff_id: staffData.id,
        // rfid: staffData.rfid, // Use this if using RFID authentication
      });

      const botResponse: Message = {
        id: messages.length + 2,
        text: response.message,
        sender: 'bot',
        timestamp: new Date(),
        links: response.links,
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
      
      // Add error message to chat
      const errorMessage: Message = {
        id: messages.length + 2,
        text: 'Sorry, I encountered an error. Please make sure the chatbot server is running (http://localhost:5000) and try again.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-[#C8956B] hover:bg-[#B07D55] z-50 flex items-center justify-center"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[380px] h-[600px] bg-white rounded-lg shadow-2xl flex flex-col z-50 border border-gray-200">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-[#C8956B] to-[#B07D55] text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="h-5 w-5" />
              </div>
              <span className="font-semibold">Chat</span>
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F5F5F5]">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-[#C8956B] text-white rounded-br-sm'
                      : 'bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line leading-relaxed">
                    {message.text}
                  </p>
                  {message.links && message.links.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {message.links.map((link, idx) => (
                        <a
                          key={idx}
                          href={link}
                          className="text-xs text-blue-600 hover:underline block"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 rounded-2xl rounded-bl-sm px-4 py-2 shadow-sm border border-gray-100">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200 rounded-b-lg">
            {error && (
              <div className="mb-2 text-xs text-red-600 bg-red-50 p-2 rounded">
                {error}
              </div>
            )}
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                disabled={isLoading}
                className="flex-1 border-gray-300 focus:border-[#C8956B] focus:ring-[#C8956B]"
              />
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || inputValue.trim() === ''}
                className="bg-[#C8956B] hover:bg-[#B07D55] text-white px-4 disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
