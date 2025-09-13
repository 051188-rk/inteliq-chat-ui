import React from 'react';
import aiLogo from '../../assets/ai.png';
import exploreIcon from '../../assets/explore.svg';
import heartIcon from '../../assets/heart.svg';
import historyIcon from '../../assets/history.svg';
import homeIcon from '../../assets/home.svg';
import libraryIcon from '../../assets/libary.svg';
import rocketIcon from '../../assets/rocket.svg';

// IntelliQ Logo with circular container
export const IntelliqLogo = () => (
  <div style={{
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  }}>
    <img 
      src={aiLogo} 
      alt="IntelliQ Logo" 
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }}
    />
  </div>
);

// Home Icon
export const HomeIcon = () => (
  <img src={homeIcon} alt="Home" width="24" height="24" />
);

// Chat Icon
export const ChatIcon = () => (
  <img src={homeIcon} alt="Chat" width="24" height="24" />
);

// Library Icon
export const LibraryIcon = () => (
  <img src={libraryIcon} alt="Library" width="24" height="24" />
);

// History Icon
export const HistoryIcon = () => (
  <img src={historyIcon} alt="History" width="24" height="24" />
);

// Explore Icon
export const ExploreIcon = () => (
  <img src={exploreIcon} alt="Explore" width="24" height="24" />
);

// Heart Icon
export const HeartIcon = () => (
  <img src={heartIcon} alt="Favorites" width="24" height="24" />
);

// Rocket Icon (For Pro section)
export const RocketIcon = () => (
  <img src={rocketIcon} alt="Pro" width="24" height="24" />
);

// Search Icon
export const SearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Folder Icon
export const FolderIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 11v6a2 2 0 01-2 2H4a2 2 0 01-2-2V7a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Settings Icon with circular AI logo
export const SettingsIcon = () => (
  <div style={{
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  }}>
    <img 
      src={aiLogo} 
      alt="AI Settings" 
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }}
    />
  </div>
);

// Collapse Icon (Chevron)
export const CollapseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
