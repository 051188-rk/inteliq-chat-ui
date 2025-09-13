import React from 'react';
import { Box, IconButton, Typography, Button, Avatar } from '@mui/material';
import openAILogo from '../../assets/openai.png';
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
        <Box className="model-selector">
          <Avatar 
            src={openAILogo} 
            sx={{ 
              width: 20, 
              height: 20, 
              marginRight: 1,
              '& img': {
                objectFit: 'contain'
              }
            }} 
          />
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
