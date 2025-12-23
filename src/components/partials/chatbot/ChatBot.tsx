// src/components/ChatBot.tsx
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { chatbotApi } from '@/api/chatbotApi';
import useAppState from '@/stores/authStore';

// Support richer link format from backend
interface LinkItem {
  text: string;
  url: string;
  entity_id?: string;
  entity_type?: string;
}

// Inside ChatBot.tsx
interface EnrichedRoom extends RoomData {
  url?: string;
}

interface RoomData {
  id: number;
  numChambre: number;
  typeChambre: string;
  pricePerNight: number;
  image: string;
  equipements: string[];
  vue: string;
  status: string;
  capacity: number;
  bathrooms: number;
  surface: number;
}

interface Message {
  id: number;
  text: string | Record<string, unknown>;
  sender: 'user' | 'bot';
  timestamp: Date;
  links?: (string | LinkItem)[];
  roomData?: EnrichedRoom[];
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

  const { user: staffProfile, hydrate} = useAppState();

console.log("hydrate:", hydrate);
console.log("staffProfile:", staffProfile);
console.log("sessionStorage user:", sessionStorage.getItem("user"));

  if (!hydrate) {
    return null; // or a loading spinner
  }

  const hasValidStaffData = staffProfile?.nomEmp && (staffProfile.code_pin || staffProfile.rfid);

  if (!hasValidStaffData) {
    return null;
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      if (!hasValidStaffData) {
        setError('Chatbot unavailable: missing staff credentials. Please log in properly.');
        return;
      }
      loadChatHistory();
    }
  }, [isOpen, hasValidStaffData]);

  const loadChatHistory = async () => {
    if (!hasValidStaffData) return;

    const staffId = staffProfile.code_pin || staffProfile.rfid;
    if (!staffId) return;

    try {
      const history = await chatbotApi.getChatHistory(staffId);

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
    }
  };

  const handleSendMessage = async () => {
    if (!hasValidStaffData || inputValue.trim() === '' || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await chatbotApi.sendMessage({
        message: currentInput,
        staff_name: staffProfile.nomEmp,
        staff_id: staffProfile.code_pin,
        rfid: staffProfile.rfid,
      });

      let roomData: RoomData[] | undefined = undefined;
      if (Array.isArray(response.data) && response.data.length > 0 && typeof response.data[0] === 'object' && 'numChambre' in response.data[0] && 'pricePerNight' in response.data[0]) {
        roomData = response.data as RoomData[];
      }

      let enrichedRoomData: EnrichedRoom[] | undefined = undefined;

      if (
        Array.isArray(response.data) &&
        response.data.length > 0 &&
        typeof response.data[0] === 'object' &&
        'numChambre' in response.data[0]
      ) {
        const rooms = response.data as RoomData[];
        const links = Array.isArray(response.links) ? response.links : [];

        enrichedRoomData = rooms.map((room, index) => {
          let url = '#';
          if (links[index] && typeof links[index] === 'object' && 'url' in links[index]) {
            url = (links[index] as LinkItem).url;
          } else if (typeof links[index] === 'string') {
            url = links[index];
          }
          return { ...room, url };
        });
      }



      // Safely convert message to string
      const messageText = typeof response.message === 'string'
        ? response.message
        : JSON.stringify(response.message, null, 2);

      const botResponse: Message = {
        id: messages.length + 2,
        text: messageText,
        sender: 'bot',
        timestamp: new Date(),
        links: response.links || [],
        roomData: enrichedRoomData,
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'Failed to send message';
      setError(errMsg);

      const errorMessage: Message = {
        id: messages.length + 2,
        text: 'Sorry, I encountered an error. Please make sure the chatbot server is running and try again.',
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



  // Helper to safely render a link
  const renderLink = (link: string | LinkItem, idx: number) => {
    if (typeof link === 'string') {
      return (
        <a
          key={idx}
          href={link}
          className="text-xs text-blue-600 hover:underline block"
          target="_blank"
          rel="noopener noreferrer"
        >
          {link}
        </a>
      );
    } else if (link && typeof link === 'object') {
      return (
        <a
          key={idx}
          href={String(link.url)}
          className="text-xs text-blue-600 hover:underline block"
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.text || String(link.url)}
        </a>
      );
    } else {
      return (
        <span key={idx} className="text-xs text-gray-500">
          {String(link)}
        </span>
      );
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
        <div className="fixed bottom-6 right-6 w-[400px] h-[600px] 
          bg-white dark:bg-neutral-800 
          rounded-lg shadow-2xl flex flex-col z-50 
          border border-gray-200 dark:border-neutral-700">

          {/* Header */}
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

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F5F5F5] dark:bg-neutral-900">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${message.sender === 'user'
                    ? 'bg-[#C8956B] text-white rounded-br-sm'
                    : 'bg-white dark:bg-neutral-800 text-gray-800 dark:text-gray-100 rounded-bl-sm shadow-sm border border-gray-100 dark:border-neutral-700'
                    }`}
                >
                  <p className="text-sm whitespace-pre-line leading-relaxed">
                    {typeof message.text === 'string'
                      ? message.text
                      : JSON.stringify(message.text, null, 2)}
                  </p>
                  {/* Room Carousel (if roomData exists) */}
                  {message.roomData && message.roomData.length > 0 && (
                    <div className="mt-3">
                      <div className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-2">
                        Available Rooms:
                      </div>
                      <div className="flex space-x-3 overflow-x-auto pb-1 scrollbar-hide">
                        {message.roomData.map((room) => (
                          <a
                            key={room.id}
                            href={room.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 w-48 bg-white dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                          >
                            {/* Image */}
                            <div className="h-24 overflow-hidden">
                              <img
                                src={room.image?.trim() || 'https://placehold.co/400?text=No+Image'}
                                alt={`Room ${room.numChambre}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://placehold.co/400?text=No+Image';
                                }}
                              />
                            </div>

                            {/* Content */}
                            <div className="p-2">
                              <div className="font-semibold text-sm text-gray-900 dark:text-white">
                                Room {room.numChambre}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {room.typeChambre} • {room.vue} view
                              </div>
                              <div className="mt-1 text-xs">
                                <span className="font-medium text-green-600 dark:text-green-400">
                                  €{room.pricePerNight}/night
                                </span>
                              </div>
                              <div className="mt-1 flex flex-wrap gap-1">
                                {room.equipements.slice(0, 2).map((eq, i) => (
                                  <span
                                    key={i}
                                    className="px-1.5 py-0.5 bg-gray-100 dark:bg-neutral-700 text-[10px] rounded text-gray-700 dark:text-gray-300"
                                  >
                                    {eq}
                                  </span>
                                ))}
                                {room.equipements.length > 2 && (
                                  <span className="text-[10px] text-gray-500 dark:text-gray-400">
                                    +{room.equipements.length - 2}
                                  </span>
                                )}
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  {message.links && message.links.length > 0 && !message.roomData &&(
                    <div className="mt-2 space-y-1">
                      {message.links.map(renderLink)}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-neutral-800 text-gray-800 dark:text-gray-100 rounded-2xl rounded-bl-sm px-4 py-2 shadow-sm border border-gray-100 dark:border-neutral-700">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white dark:bg-neutral-800 border-t border-gray-200 dark:border-neutral-700 rounded-b-lg">
            {error && (
              <div className="mb-2 text-xs text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400 p-2 rounded">
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
                className="flex-1 
                  border-gray-300 dark:border-neutral-600 
                  focus:border-[#C8956B] focus:ring-[#C8956B] 
                  bg-white dark:bg-neutral-800 
                  text-gray-900 dark:text-white"
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