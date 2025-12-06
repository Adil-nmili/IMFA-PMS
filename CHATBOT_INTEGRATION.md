# Chatbot Integration Guide

## Overview
The chatbot is now fully integrated with the mock API backend. It provides real-time AI assistance for hotel management tasks including reservations, housekeeping, maintenance, and room status queries.

## Features

✅ **Real API Integration** - Connects to the Flask backend at `http://localhost:5000`
✅ **Chat History** - Automatically loads previous conversations
✅ **Loading States** - Visual feedback while processing messages
✅ **Error Handling** - Graceful error messages if the server is unavailable
✅ **Link Support** - Displays clickable links returned by the API
✅ **Staff Authentication** - Uses PIN or RFID for staff identification

## Setup Instructions

### 1. Start the API Server

Navigate to the mock server folder and start it:

```bash
cd /home/adil/Desktop/Projects/IMFA/pms_chatbot_mock

# Install dependencies (first time only)
pip install flask flask-cors

# Run the server
python app_mock.py
```

The server will start on `http://localhost:5000`

**Alternative: Use Docker**
```bash
docker build -t hotel-chatbot-mock .
docker run -p 5000:5000 hotel-chatbot-mock
```

### 2. Start Your React App

```bash
cd /home/adil/Desktop/Projects/IMFA/IMFA-PMS
npm run dev
```

### 3. Test the Chatbot

Click the floating chat button in the bottom-right corner and try these queries:

- "Show me today's reservations"
- "What's the room status?"
- "I need to check in a guest"
- "Help with housekeeping"
- "Room maintenance needed"

## Test Users

The mock API includes these test users:

| Name  | Role                      | PIN  | RFID       |
|-------|---------------------------|------|------------|
| John  | Receptionist              | 1234 | 5678901234 |
| Sarah | Housekeeping Supervisor   | 5678 | 9876543210 |
| Mike  | Manager                   | 9012 | 1234567890 |

**Current Configuration**: The chatbot is using `John` (PIN: 1234) by default.

## Customization

### Change Staff Credentials

Edit `/src/components/partials/chatbot/ChatBot.tsx` and update the `staffData` object:

```typescript
const staffData = {
  name: 'Sarah',      // Change staff name
  id: '5678',         // Change PIN
  // rfid: '9876543210' // Or use RFID instead
};
```

### Use Real User Authentication

Replace the hardcoded `staffData` with actual authenticated user data from your auth context:

```typescript
const { user } = useAuth();

// Extract staff info from authenticated user
const staffData = {
  name: user?.nomEmp || 'Staff',
  id: user?.code_pin || user?.id,
};
```

## API Endpoints Used

- `POST /api/chat` - Send messages and get AI responses
- `GET /api/chat/history/<staff_id>` - Load conversation history
- `DELETE /api/chat/clear/<staff_id>` - Clear chat history
- `GET /api/health` - Check API status

## Troubleshooting

### Error: "Network error. Please check if the chatbot server is running."

**Solution**: Make sure the Flask server is running on `http://localhost:5000`

```bash
cd /home/adil/Desktop/Projects/IMFA/pms_chatbot_mock
python app_mock.py
```

### Error: "Invalid credentials"

**Solution**: Check that the staff name and PIN/RFID match one of the test users.

### CORS Issues

The Flask server has CORS enabled for all origins. If you encounter CORS errors, verify the server is running and restart it.

## File Structure

```
IMFA-PMS/
├── src/
│   ├── api/
│   │   └── chatbotApi.ts           # API service layer
│   ├── components/
│   │   └── partials/
│   │       └── chatbot/
│   │           └── ChatBot.tsx     # Main chatbot component
│   └── layout.tsx                  # Layout with chatbot integration
```

## Next Steps

1. **Replace Mock Data**: Update `staffData` to use real authenticated user information
2. **Enhance UI**: Add more visual features like timestamps, avatars, etc.
3. **Add Features**: Implement quick actions, voice input, or file uploads
4. **Production API**: Replace the mock server with your production chatbot API endpoint

## API Response Format

The API returns responses in this format:

```json
{
  "message": "Bot's response text to display",
  "data": { /* Optional structured data */ },
  "links": ["http://example.com/link1"],
  "staff_id": "1234",
  "staff_name": "John",
  "staff_role": "Receptionist",
  "auth_method": "CODE_PIN"
}
```

**Important**: Only `message` and `links` are displayed in the UI. Other fields are for backend processing.
