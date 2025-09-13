// src/App.tsx
import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import QuickActions from './components/QuickActions/QuickActions';
import ChatWindow from './components/ChatWindow/ChatWindow';
import ChatInput from './components/ChatInput/ChatInput';
import { Message, Chat, FileAttachment } from './types';
import theme from './theme';
import './App.css';
import img from './assets/hand.png';

// A mock function to simulate sending a message
const sendChatMessage = async (messages: { role: string; content: string }[]): Promise<string> => {
  console.log("Sending messages:", messages);
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("This is a simulated response from the AI.");
    }, 1000);
  });
};

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const updateChatTitle = (chatId: string, firstMessage: string) => {
    const title = firstMessage.length > 30 
      ? firstMessage.substring(0, 30) + '...' 
      : firstMessage;
    
    setChats(prev => prev.map(chat => 
      chat.id === chatId ? { ...chat, title } : chat
    ));
    
    if (currentChat?.id === chatId) {
      setCurrentChat(prev => prev ? { ...prev, title } : null);
    }
  };

  const handleSendMessage = async (content: string, attachments: FileAttachment[]) => {
    if (!content.trim() && attachments.length === 0) return;

    let activeChat = currentChat;
    
    // Create a new chat if one doesn't exist
    if (!activeChat) {
      activeChat = {
        id: generateId(),
        title: 'New Chat',
        messages: [],
        timestamp: new Date()
      };
      setChats(prev => [activeChat!, ...prev]);
      setCurrentChat(activeChat);
    }

    const userMessage: Message = {
      id: generateId(),
      content: content,
      role: 'user',
      timestamp: new Date()
    };
    
    // Update the UI immediately with the user's message
    const updatedMessages = [...activeChat.messages, userMessage];
    const updatedChat = { ...activeChat, messages: updatedMessages };
    
    setCurrentChat(updatedChat);
    setChats(prev => prev.map(c => c.id === activeChat!.id ? updatedChat : c));

    // If this is the first message, update the chat title
    if (activeChat.messages.length === 0) {
      updateChatTitle(activeChat.id, content);
    }

    setIsLoading(true);
    try {
      const chatHistory = updatedMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await sendChatMessage(chatHistory);
      
      const assistantMessage: Message = {
        id: generateId(),
        content: response,
        role: 'assistant',
        timestamp: new Date()
      };
      
      // Add the assistant's response
      const finalMessages = [...updatedMessages, assistantMessage];
      const finalChat = { ...updatedChat, messages: finalMessages };
      
      setCurrentChat(finalChat);
      setChats(prev => prev.map(c => c.id === activeChat!.id ? finalChat : c));
      
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: generateId(),
        content: 'Sorry, I encountered an error. Please try again.',
        role: 'assistant',
        timestamp: new Date()
      };
      const errorMessages = [...updatedMessages, errorMessage];
      const errorChat = { ...updatedChat, messages: errorMessages };
      setCurrentChat(errorChat);
      setChats(prev => prev.map(c => c.id === activeChat!.id ? errorChat : c));
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (message: string) => {
    handleSendMessage(message, []);
  };

  const handleSelectChat = (chat: Chat) => {
    setCurrentChat(chat);
  };

  const handleNewChat = () => {
    setCurrentChat(null); // This will show the welcome screen
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="app">
        <Sidebar
          open={sidebarOpen}
          onToggle={toggleSidebar}
          chats={chats}
          onSelectChat={handleSelectChat}
          currentChatId={currentChat?.id}
        />
        
        <Box className={`main-content ${sidebarOpen ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
          <Header
            onToggleSidebar={toggleSidebar}
            onNewChat={handleNewChat}
            currentModel="Intelliq 1.0"
          />
          
          <Box className="chat-area">
            {!currentChat ? (
              <Box className="welcome-screen">
                <Box className="welcome-content">
                  <Box className="greeting-container">
                    <img src={img} alt="Waving hand emoji" className="hand-emoji" />
                    <h1 className="greeting-text">Hi Laurence!</h1>
                  </Box>
                  <h2 className="welcome-question">
                    What do you want to<br />learn today?
                  </h2>
                  <QuickActions onSelectAction={handleQuickAction} />
                </Box>
              </Box>
            ) : (
              <ChatWindow 
                messages={currentChat.messages} 
                isLoading={isLoading}
              />
            )}
          </Box>
          
          <ChatInput
            onSendMessage={handleSendMessage}
            disabled={isLoading}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;