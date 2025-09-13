import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import QuickActions from './components/QuickActions/QuickActions';
import ChatWindow from './components/ChatWindow/ChatWindow';
import ChatInput from './components/ChatInput/ChatInput';
import { Message, Chat, FileAttachment } from './types';
import { sendChatMessage } from './utils/groqClient';
import theme from './theme';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateChatId = () => Math.random().toString(36).substr(2, 9);
  const generateMessageId = () => Math.random().toString(36).substr(2, 9);

  const createNewChat = () => {
    const newChat: Chat = {
      id: generateChatId(),
      title: 'New Chat',
      messages: [],
      timestamp: new Date()
    };
    setCurrentChat(newChat);
    setChats(prev => [newChat, ...prev]);
  };

  const updateChatTitle = (chatId: string, firstMessage: string) => {
    const title = firstMessage.length > 50 
      ? firstMessage.substring(0, 50) + '...' 
      : firstMessage;
    
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { ...chat, title, lastMessage: firstMessage }
        : chat
    ));
    
    if (currentChat?.id === chatId) {
      setCurrentChat(prev => prev ? { ...prev, title, lastMessage: firstMessage } : null);
    }
  };

  const handleSendMessage = async (content: string, attachments: FileAttachment[]) => {
    if (!content.trim() && attachments.length === 0) return;

    // Create or use current chat
    let chat = currentChat;
    if (!chat) {
      chat = {
        id: generateChatId(),
        title: 'New Chat',
        messages: [],
        timestamp: new Date()
      };
      setCurrentChat(chat);
      setChats(prev => [chat!, ...prev]);
    }

    // Prepare message content
    let messageContent = content;
    if (attachments.length > 0) {
      const fileList = attachments.map(att => `[File: ${att.name}]`).join(' ');
      messageContent = content ? `${content}\n\n${fileList}` : fileList;
    }

    // Add user message
    const userMessage: Message = {
      id: generateMessageId(),
      content: messageContent,
      role: 'user',
      timestamp: new Date()
    };

    const updatedMessages = [...chat.messages, userMessage];
    
    // Update chat with user message
    const updatedChat = { ...chat, messages: updatedMessages };
    setCurrentChat(updatedChat);
    setChats(prev => prev.map(c => c.id === chat!.id ? updatedChat : c));

    // Update title if this is the first message
    if (chat.messages.length === 0) {
      updateChatTitle(chat.id, content || 'File upload');
    }

    // Get AI response
    setIsLoading(true);
    try {
      const chatMessages = updatedMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const response = await sendChatMessage(chatMessages);
      
      const assistantMessage: Message = {
        id: generateMessageId(),
        content: response,
        role: 'assistant',
        timestamp: new Date()
      };

      const finalMessages = [...updatedMessages, assistantMessage];
      const finalChat = { ...updatedChat, messages: finalMessages };
      
      setCurrentChat(finalChat);
      setChats(prev => prev.map(c => c.id === chat!.id ? finalChat : c));
      
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      const errorMessage: Message = {
        id: generateMessageId(),
        content: 'Sorry, I encountered an error while processing your request.',
        role: 'assistant',
        timestamp: new Date()
      };

      const errorMessages = [...updatedMessages, errorMessage];
      const errorChat = { ...updatedChat, messages: errorMessages };
      
      setCurrentChat(errorChat);
      setChats(prev => prev.map(c => c.id === chat!.id ? errorChat : c));
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
    createNewChat();
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
          chats={chats}
          onSelectChat={handleSelectChat}
          currentChatId={currentChat?.id}
        />
        
        <Box className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <Header
            onToggleSidebar={toggleSidebar}
            onNewChat={handleNewChat}
            currentModel="ChatGPT 4"
          />
          
          <Box className="chat-area">
            {!currentChat || currentChat.messages.length === 0 ? (
              <Box className="welcome-screen">
                <Box className="welcome-content">
                  <Box className="greeting">
                    <span className="wave-emoji">👋</span>
                    <h1 className="greeting-text">Hi Laurence!</h1>
                  </Box>
                  <h2 className="welcome-question">What do you want to learn today?</h2>
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
