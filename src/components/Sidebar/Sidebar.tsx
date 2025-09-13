import React, { useState, useEffect } from 'react';
import { 
  Drawer, 
  Box, 
  Typography, 
  IconButton, 
  TextField, 
  List, 
  ListItem, 
  ListItemText,
  Button,
  Avatar,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import HistoryIcon from '@mui/icons-material/History';
import ExploreIcon from '@mui/icons-material/Explore';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Chat } from '../../types';
import './Sidebar.css';

interface SidebarProps {
  open: boolean;
  chats: Chat[];
  onSelectChat: (chat: Chat) => void;
  currentChatId?: string;
}

const dummyChats: Chat[] = [
  {
    id: '1',
    title: 'Write a Shakespearean sonnet about a cat that...',
    messages: [],
    lastMessage: 'Write a Shakespearean sonnet about a cat that...',
    timestamp: new Date(Date.now() - 1000 * 60 * 30)
  },
  {
    id: '2',
    title: 'If cereal commercials were directed by Christopher...',
    messages: [],
    lastMessage: 'If cereal commercials were directed by Christopher...',
    timestamp: new Date(Date.now() - 1000 * 60 * 60)
  },
  {
    id: '3',
    title: 'Renewable Energy Trends',
    messages: [],
    lastMessage: 'What are the latest renewable energy trends?',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2)
  },
  {
    id: '4',
    title: 'Describe a medieval jousting tournament when...',
    messages: [],
    lastMessage: 'Describe a medieval jousting tournament where...',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3)
  },
  {
    id: '5',
    title: 'What would a job interview be like if aliens were...',
    messages: [],
    lastMessage: 'What would a job interview be like if aliens...',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4)
  },
  {
    id: '6',
    title: 'Generate a rap battle between a sentient toaster...',
    messages: [],
    lastMessage: 'Generate a rap battle between a sentient...',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5)
  },
  {
    id: '7',
    title: 'What if oxygen was actually a hallucinogen and...',
    messages: [],
    lastMessage: 'What if oxygen was actually a hallucinogen...',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6)
  },
  {
    id: '8',
    title: 'Pitch a reality TV show where ghosts haunt influencers...',
    messages: [],
    lastMessage: 'Pitch a reality TV show where ghosts haunt...',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 7)
  },
  {
    id: '9',
    title: 'Create a business plan for selling dreams...',
    messages: [],
    lastMessage: 'Create a business plan for selling dreams...',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8)
  },
  {
    id: '10',
    title: 'Design a social media platform for pets...',
    messages: [],
    lastMessage: 'Design a social media platform for pets...',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 9)
  }
];

const navigationItems = [
  { icon: HomeIcon, label: 'Home', shortcut: '⌘H', active: true },
  { icon: LibraryBooksIcon, label: 'Library', shortcut: '⌘T', active: false },
  { icon: HistoryIcon, label: 'History', shortcut: '⌘G', active: false },
  { icon: ExploreIcon, label: 'Explore', shortcut: '⌘L', active: false }
];

const Sidebar: React.FC<SidebarProps> = ({ open, chats, onSelectChat, currentChatId }) => {
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

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      className="sidebar-drawer"
      classes={{ paper: 'sidebar-paper' }}
    >
      <Box className="sidebar-content">
        {/* Header with Logo */}
        <Box className="sidebar-header">
          <Box className="logo-section">
            <Avatar className="logo-avatar">
              <Box className="star-icon">✦</Box>
            </Avatar>
            <Typography className="logo-text">Intelliq</Typography>
          </Box>
          <IconButton className="back-button" size="small">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
          </IconButton>
        </Box>

        {/* Search Section */}
        <Box className="search-section">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            className="search-input"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon className="search-icon" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Navigation Section */}
        <Box className="navigation-section">
          <List className="nav-list">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <ListItem
                  key={item.label}
                  button
                  className={`nav-item ${item.active ? 'active' : ''}`}
                >
                  <Box className="nav-item-content">
                    <Box className="nav-item-left">
                      <IconComponent className="nav-icon" />
                      <Typography className="nav-text">{item.label}</Typography>
                    </Box>
                    <Typography className="nav-shortcut">{item.shortcut}</Typography>
                  </Box>
                </ListItem>
              );
            })}
          </List>
        </Box>

        {/* Recent Chats Section */}
        <Box className="chats-section">
          <Typography className="section-title">
            Recent Chats
          </Typography>
          <Box className="chat-list-container">
            <List className="chat-list">
              {filteredChats.map((chat) => (
                <ListItem
                  button
                  key={chat.id}
                  onClick={() => onSelectChat(chat)}
                  className={`chat-item ${currentChatId === chat.id ? 'active' : ''}`}
                >
                  <ListItemText
                    primary={truncateText(chat.title)}
                    className="chat-text"
                  />
                </ListItem>
              ))}
            </List>
          </Box>
          <Button className="view-all-button" fullWidth endIcon={<span>→</span>}>
            View All
          </Button>
        </Box>

        {/* Try Pro Section */}
        <Box className="pro-section">
          <Box className="pro-header">
            <Typography className="pro-title">Try Pro!</Typography>
            <Box className="pro-icon">🚀</Box>
          </Box>
          <Typography className="pro-description">
            Upgrade for smarter AI and more...
          </Typography>
          <Box className="user-section">
            <Avatar className="user-avatar" src="/api/placeholder/24/24">LC</Avatar>
            <Typography className="user-name">Lawrence Cruz</Typography>
            <KeyboardArrowDownIcon className="dropdown-icon" />
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
