# Chat Interface Frontend

## Setup Instructions

1. Clone this project
2. Run `npm install`
3. Create `.env` in root with:
   ```
   REACT_APP_GROQ_API_KEY=your_api_key_here
   ```
4. Run dev server:
   ```
   npm run dev
   ```
   Open http://localhost:3000

## Notes
- Sidebar collapsible with search (filters dummy chats).
- Three quick action cards send preset messages.
- Chat input supports drag-drop and paste attachments.
- Attachments can be removed individually (-) or all cleared (bin).
- Messages are displayed and placeholder bot responses are added.
- Groq integration placeholder included (`groq-sdk`).
