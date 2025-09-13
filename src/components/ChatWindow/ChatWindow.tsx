import React, { useRef, useEffect } from 'react';
import { Box, Typography, Avatar, Paper } from '@mui/material';
import { Message } from '../../types';
import './ChatWindow.css';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <Box className="chat-window">
      <Box className="messages-container">
        {messages.map((message) => (
          <Box
            key={message.id}
            className={`message-wrapper ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
          >
            <Box className="message-content">
              <Avatar 
                className={`message-avatar ${message.role}-avatar`}
                sx={{ 
                  bgcolor: message.role === 'user' ? '#4285f4' : '#34a853',
                  width: 32,
                  height: 32
                }}
              >
                {message.role === 'user' ? 'You' : 'AI'}
              </Avatar>
              <Paper className="message-bubble" elevation={0}>
                <Typography 
                  variant="body1" 
                  className="message-text"
                  component="div"
                >
                  {message.content}
                </Typography>
                <Typography variant="caption" className="message-time">
                  {formatTime(message.timestamp)}
                </Typography>
              </Paper>
            </Box>
          </Box>
        ))}
        
        {isLoading && (
          <Box className="message-wrapper assistant-message">
            <Box className="message-content">
              <Avatar 
                className="message-avatar assistant-avatar"
                sx={{ bgcolor: '#34a853', width: 32, height: 32 }}
              >
                AI
              </Avatar>
              <Paper className="message-bubble typing-indicator" elevation={0}>
                <Box className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </Box>
              </Paper>
            </Box>
          </Box>
        )}
        
        <div ref={messagesEndRef} />
      </Box>
    </Box>
  );
};

export default ChatWindow;
