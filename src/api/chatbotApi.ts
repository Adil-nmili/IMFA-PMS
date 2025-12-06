import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export interface ChatMessage {
  message: string;
  staff_name: string;
  staff_id?: string;
  rfid?: string;
}

export interface ChatResponse {
  message: string;
  data?: any;
  links?: string[];
  staff_id: string;
  rfid: string;
  staff_name: string;
  staff_role: string;
  auth_method: string;
}

export interface ChatHistoryItem {
  timestamp: string;
  user: string;
  assistant: string;
  type: string;
}

export interface ChatHistoryResponse {
  staff_id: string;
  staff_name: string;
  history: ChatHistoryItem[];
  total_messages: number;
}

export const chatbotApi = {
  // Send a chat message
  sendMessage: async (payload: ChatMessage): Promise<ChatResponse> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/chat`, payload);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error || error.response.data.message || 'Failed to send message');
      }
      throw new Error('Network error. Please check if the chatbot server is running.');
    }
  },

  // Get chat history for a staff member
  getChatHistory: async (staffId: string): Promise<ChatHistoryResponse> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/chat/history/${staffId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error || 'Failed to fetch chat history');
      }
      throw new Error('Network error. Please check if the chatbot server is running.');
    }
  },

  // Clear chat history
  clearChatHistory: async (staffId: string): Promise<{ message: string }> => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/chat/clear/${staffId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error || 'Failed to clear chat history');
      }
      throw new Error('Network error. Please check if the chatbot server is running.');
    }
  },

  // Health check
  healthCheck: async (): Promise<{ status: string; service: string }> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/health`);
      return response.data;
    } catch (error) {
      throw new Error('Chatbot service is unavailable');
    }
  },
};
