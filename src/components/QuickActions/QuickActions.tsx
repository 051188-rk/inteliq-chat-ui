import React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import './QuickActions.css';

interface QuickActionsProps {
  onSelectAction: (message: string) => void;
}

const quickActions = [
  {
    id: 1,
    text: "Give me a concise summary of this meeting transcript",
    icon: <RefreshIcon />
  },
  {
    id: 2,
    text: "Write a product description for a minimalist smartwatch",
    icon: <RefreshIcon />
  },
  {
    id: 3,
    text: "Provide a polite response to a customer asking for a refund",
    icon: <RefreshIcon />
  }
];

const QuickActions: React.FC<QuickActionsProps> = ({ onSelectAction }) => {
  return (
    <Box className="quick-actions-container">
      {quickActions.map((action) => (
        <Card 
          key={action.id}
          className="quick-action-card"
          onClick={() => onSelectAction(action.text)}
        >
          <CardContent className="quick-action-content">
            <Box className="action-icon">
              {action.icon}
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
