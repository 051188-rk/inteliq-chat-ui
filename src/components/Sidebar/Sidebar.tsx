import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, IconButton, TextField, List, ListItem, ListItemText, Button, Avatar, InputAdornment } from '@mui/material';
import { Chat } from '../../types';
import './Sidebar.css';
import { IntelliqLogo, CollapseIcon, ChatIcon, LibraryIcon, HistoryIcon, ExploreIcon, RocketIcon, SettingsIcon, SearchIcon as CollapsedSearchIcon, FolderIcon, HeartIcon } from './SidebarIcons';

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
  chats: Chat[];
  onSelectChat: (chat: Chat) => void;
  currentChatId?: string;
}

const dummyChats: Chat[] = [
    { id: '1', title: 'Write a Shakespearean sonnet about a cat that...', messages: [], timestamp: new Date() },
    { id: '2', title: 'If cereal commercials were directed by Christopher...', messages: [], timestamp: new Date() },
    { id: '3', title: 'Renewable Energy Trends', messages: [], timestamp: new Date() },
    { id: '4', title: 'Describe a medieval jousting tournament when...', messages: [], timestamp: new Date() },
    { id: '5', title: 'What would a job interview be like if aliens were...', messages: [], timestamp: new Date() },
];

const Sidebar: React.FC<SidebarProps> = ({ open, onToggle, chats, onSelectChat, currentChatId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredChats, setFilteredChats] = useState<Chat[]>([]);
  const [allChats] = useState<Chat[]>([...chats, ...dummyChats]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredChats(allChats);
    } else {
      const filtered = allChats.filter(chat =>
        chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.lastMessage?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredChats(filtered);
    }
  }, [searchQuery, allChats]);

  const truncateText = (text: string, maxLength: number = 40) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const ExpandedView = React.memo(() => (
    <Box className="sidebar-content">
      <Box className="sidebar-header">
        <Box className="logo-section">
          <Avatar className="logo-avatar"><IntelliqLogo /></Avatar>
          <Typography className="logo-text">Inteliq</Typography>
        </Box>
      </Box>

      <Box className="sidebar-section">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for chats..."
          size="small"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CollapsedSearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <Box className="sidebar-section nav-section">
        <List className="nav-list">
          <ListItem button className="nav-item active">
            <ChatIcon active />
            <Typography>Home</Typography>
            <span>⌘H</span>
          </ListItem>
          <ListItem button className="nav-item">
            <LibraryIcon />
            <Typography>Library</Typography>
            <span>⌘T</span>
          </ListItem>
          <ListItem button className="nav-item">
            <HistoryIcon />
            <Typography>History</Typography>
            <span>⌘G</span>
          </ListItem>
          <ListItem button className="nav-item">
            <ExploreIcon />
            <Typography>Explore</Typography>
            <span>⌘L</span>
          </ListItem>
        </List>
      </Box>

      <Box className="sidebar-section chats-section">
        <Typography className="section-title">Recent Chats</Typography>
        <List className="chat-list">
          {filteredChats.slice(0, 5).map((chat) => (
            <ListItem button key={chat.id} onClick={() => onSelectChat(chat)} className={`chat-item ${currentChatId === chat.id ? 'active' : ''}`}>
              <ListItemText primary={chat.title} />
            </ListItem>
          ))}
        </List>
        <Button className="view-all-button" fullWidth>View All →</Button>
      </Box>

      <Box className="sidebar-footer">
        <Box className="pro-section">
          <Box className="pro-content">
            <Typography className="pro-title">Try Pro!</Typography>
            <Typography className="pro-description">Upgrade for smarter AI and more...</Typography>
          </Box>
          <Avatar className="pro-icon"><RocketIcon /></Avatar>
        </Box>
        <Box className="user-section">
          <Avatar className="user-avatar" src="https://i.pravatar.cc/40?img=1" />
          <Typography className="user-name">Lawrence Cruz</Typography>
          <IconButton size="small" className="user-menu-button">
            <svg width="16" height="16" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z" fill="currentColor"/></svg>
          </IconButton>
        </Box>
      </Box>
    </Box>
  ));

  const CollapsedView = () => (
    <Box className="sidebar-content-collapsed">
        <Box className="collapsed-top">
            <IconButton className="collapsed-icon-button active"><SettingsIcon /></IconButton>
            <IconButton className="collapsed-icon-button"><CollapsedSearchIcon /></IconButton>
            <IconButton className="collapsed-icon-button"><ChatIcon /></IconButton>
            <IconButton className="collapsed-icon-button"><FolderIcon /></IconButton>
            <IconButton className="collapsed-icon-button"><HistoryIcon /></IconButton>
            <IconButton className="collapsed-icon-button"><HeartIcon /></IconButton>
        </Box>
        <Box className="collapsed-bottom">
            <Button className="pro-button-collapsed">Try Pro!</Button>
            <Avatar className="user-avatar-collapsed" src="https://i.pravatar.cc/40?img=1" />
        </Box>
    </Box>
  );

  return (
    <Box className={`sidebar-container ${open ? 'expanded' : 'collapsed'}`}>
      <IconButton 
        className={`sidebar-toggle ${!open ? 'collapsed' : ''}`} 
        size="small" 
        onClick={onToggle}
        onMouseDown={(e) => e.preventDefault()}
      >
        <CollapseIcon />
      </IconButton>
      {open ? <ExpandedView /> : <CollapsedView />}
    </Box>
  );
};

export default React.memo(Sidebar);
