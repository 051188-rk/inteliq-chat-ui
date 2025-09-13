import React from 'react';
import { Box, IconButton, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShareIcon from '@mui/icons-material/Share';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import './Header.css';

interface HeaderProps {
  onToggleSidebar: () => void;
  onNewChat: () => void;
  currentModel: string;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, onNewChat, currentModel }) => {
  return (
    <Box className="header">
      <Box className="header-left">
        <IconButton onClick={onToggleSidebar} className="menu-button">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className="app-title">
          Intelliq
        </Typography>
        <Box className="model-selector">
          <Typography variant="body2" className="model-text">
            {currentModel}
          </Typography>
        </Box>
      </Box>
      
      <Box className="header-right">
        <IconButton>
          <ShareIcon />
        </IconButton>
        <IconButton>
          <HelpOutlineIcon />
        </IconButton>
        <Button 
          variant="contained" 
          onClick={onNewChat}
          className="new-chat-button"
        >
          + New Chat
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
