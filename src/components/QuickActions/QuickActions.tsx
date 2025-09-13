// src/components/QuickActions/QuickActions.tsx
import React, { useState } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import StarIcon from '../StarIcon';
import './QuickActions.css';

interface QuickActionsProps {
  onSelectAction: (message: string) => void;
}

const quickActions = [
  {
    id: 1,
    text: "Give me a concise summary of this meeting transcript",
  },
  {
    id: 2,
    text: "Write a product description for a minimalist smartwatch",
  },
  {
    id: 3,
    text: "Provide a polite response to a customer asking for a refund",
  }
];

const QuickActions: React.FC<QuickActionsProps> = ({ onSelectAction }) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <Box className="quick-actions-container">
      {quickActions.map((action) => (
        <Card 
          key={action.id}
          className={`quick-action-card ${hoveredId === action.id ? 'active' : ''}`}
          onClick={() => onSelectAction(action.text)}
          onMouseEnter={() => setHoveredId(action.id)}
          onMouseLeave={() => setHoveredId(null)}
          elevation={0}
        >
          <CardContent className="quick-action-content">
            <Box className={`action-icon ${hoveredId === action.id ? 'active' : ''}`}>
              <StarIcon />
            </Box>
            <Typography variant="body2" className="action-text">
              {action.text}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default QuickActions;