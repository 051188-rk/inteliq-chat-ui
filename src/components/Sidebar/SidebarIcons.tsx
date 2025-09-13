import React from 'react';
import aiLogo from '../../assets/ai.png';
import exploreIcon from '../../assets/explore.svg';
import heartIcon from '../../assets/heart.svg';
import historyIcon from '../../assets/history.svg';
import homeIcon from '../../assets/home.svg';
import libraryIcon from '../../assets/libary.svg';
import rocketIcon from '../../assets/rocket.svg';

// Base icon component with consistent styling
const BaseIcon = ({ src, alt, active = false }: { src: string; alt: string; active?: boolean }) => (
  <img 
    src={src} 
    alt={alt} 
    style={{
      width: '24px',
      height: '24px',
      filter: active 
        ? 'invert(38%) sepia(98%) saturate(7487%) hue-rotate(218deg) brightness(97%) contrast(90%)' /* Blue color */
        : 'invert(60%) sepia(0%) saturate(1%) hue-rotate(120deg) brightness(90%) contrast(89%)' /* Grey color */
    }} 
  />
);

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
export const HomeIcon = ({ active = false }: { active?: boolean }) => (
  <BaseIcon src={homeIcon} alt="Home" active={active} />
);

// Chat Icon (Using home icon as per your design)
export const ChatIcon = ({ active = false }: { active?: boolean }) => (
  <BaseIcon src={homeIcon} alt="Chat" active={active} />
);

// Library Icon
export const LibraryIcon = ({ active = false }: { active?: boolean }) => (
  <BaseIcon src={libraryIcon} alt="Library" active={active} />
);

// History Icon
export const HistoryIcon = ({ active = false }: { active?: boolean }) => (
  <BaseIcon src={historyIcon} alt="History" active={active} />
);

// Explore Icon
export const ExploreIcon = ({ active = false }: { active?: boolean }) => (
  <BaseIcon src={exploreIcon} alt="Explore" active={active} />
);

// Heart Icon
export const HeartIcon = ({ active = false }: { active?: boolean }) => (
  <BaseIcon src={heartIcon} alt="Favorites" active={active} />
);

// Rocket Icon (For Pro section)
export const RocketIcon = ({ active = false }: { active?: boolean }) => (
  <div style={{
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <img 
      src={rocketIcon} 
      alt="Pro" 
      style={{
        width: '100%',
        height: '100%',
        filter: 'invert(88%) sepia(17%) saturate(1016%) hue-rotate(181deg) brightness(100%) contrast(102%)' /* #e8f1ff */
      }} 
    />
  </div>
);

// Search Icon
export const SearchIcon = ({ active = false }: { active?: boolean }) => (
  <BaseIcon 
    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E" 
    alt="Search" 
    active={active}
  />
);

// Folder Icon
export const FolderIcon = ({ active = false }: { active?: boolean }) => (
  <BaseIcon 
    src={libraryIcon} 
    alt="Folder"
    active={active}
  />
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
