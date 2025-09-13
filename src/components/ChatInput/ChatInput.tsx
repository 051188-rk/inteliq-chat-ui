import React, { useState, useRef } from 'react';
import { 
  Box, 
  TextField, 
  IconButton, 
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DescriptionIcon from '@mui/icons-material/Description';
import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Uploady from '@rpldy/uploady';
import UploadDropZone from '@rpldy/upload-drop-zone';
import withPasteUpload from '@rpldy/upload-paste';
import { FileAttachment } from '../../types';
import './ChatInput.css';

const PasteUploadDropZone = withPasteUpload(UploadDropZone);

interface ChatInputProps {
  onSendMessage: (message: string, attachments: FileAttachment[]) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);
  const [showFileDialog, setShowFileDialog] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (message.trim() || attachments.length > 0) {
      onSendMessage(message.trim(), attachments);
      setMessage('');
      setAttachments([]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (files: FileList | null) => {
    if (files) {
      const newAttachments: FileAttachment[] = Array.from(files).map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        file
      }));
      setAttachments(prev => [...prev, ...newAttachments]);
    }
  };

  const handleUploadySelect = (files: any) => {
    const fileObjects = files.map((fileItem: any) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: fileItem.file.name,
      size: fileItem.file.size,
      type: fileItem.file.type,
      file: fileItem.file
    }));
    setAttachments(prev => [...prev, ...fileObjects]);
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(att => att.id !== id));
  };

  const clearAllAttachments = () => {
    setAttachments([]);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return <ImageIcon className="file-type-icon" />;
    if (fileType === 'application/pdf') return <PictureAsPdfIcon className="file-type-icon" />;
    return <DescriptionIcon className="file-type-icon" />;
  };

  const openFileDialog = () => {
    setShowFileDialog(true);
  };

  const handleAddFiles = () => {
    fileInputRef.current?.click();
  };

  const handleFileDialogSelect = (files: FileList | null) => {
    if (files) {
      handleFileSelect(files);
    }
  };

  return (
    <Box className="chat-input-container">
      <Uploady
        destination={{ url: 'dummy' }}
        autoUpload={false}
      >
        <PasteUploadDropZone
          onDragOverClassName="drag-over"
          onSelect={handleUploadySelect}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={() => setIsDragOver(false)}
        >
          <Paper 
            className={`input-container ${isDragOver ? 'drag-over' : ''}`}
            elevation={0}
          >
            {isDragOver && (
              <Box className="drag-overlay">
                <Typography className="drag-text">
                  Drop files here to attach
                </Typography>
              </Box>
            )}
            
            <Box className="input-wrapper">
              <TextField
                fullWidth
                multiline
                maxRows={4}
                variant="standard"
                placeholder="Analyze these files."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={disabled}
                className="message-input"
                InputProps={{
                  disableUnderline: true,
                }}
              />
              
              <Box className="input-actions">
                <IconButton
                  onClick={openFileDialog}
                  className="attach-button"
                  size="small"
                >
                  <AttachFileIcon />
                </IconButton>
                
                <IconButton
                  className="camera-button"
                  size="small"
                  disabled
                >
                  <PhotoCameraIcon />
                </IconButton>
                
                <Typography className="char-count">
                  {message.length}/1000
                </Typography>
                
                <IconButton
                  onClick={handleSend}
                  disabled={disabled || (!message.trim() && attachments.length === 0)}
                  className="send-button"
                  size="small"
                >
                  <SendIcon />
                </IconButton>
              </Box>
            </Box>
          </Paper>
        </PasteUploadDropZone>
      </Uploady>

      {/* File Upload Dialog */}
      <Dialog
        open={showFileDialog}
        onClose={() => setShowFileDialog(false)}
        maxWidth="sm"
        fullWidth
        className="file-dialog"
        PaperProps={{
          className: "file-dialog-paper"
        }}
      >
        <DialogTitle className="file-dialog-title">
          <Box className="dialog-title-content">
            <Box className="title-left">
              <AttachFileIcon className="dialog-icon" />
              <Typography className="dialog-title-text">
                Attached Files
              </Typography>
            </Box>
            <IconButton 
              size="small" 
              onClick={() => setShowFileDialog(false)}
              className="dialog-close-button"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        </DialogTitle>

        <Divider />

        <DialogContent className="file-dialog-content">
          {attachments.length === 0 ? (
            <Box className="empty-state">
              <AttachFileIcon className="empty-icon" />
              <Typography className="empty-text">
                No files attached yet
              </Typography>
              <Typography className="empty-subtext">
                Click "Add" to attach files or drag and drop them here
              </Typography>
            </Box>
          ) : (
            <List className="attachment-list">
              {attachments.map((attachment) => (
                <ListItem key={attachment.id} className="attachment-item">
                  <ListItemIcon className="attachment-icon">
                    {getFileIcon(attachment.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={attachment.name}
                    secondary={formatFileSize(attachment.size)}
                    className="attachment-text"
                  />
                  <IconButton 
                    size="small" 
                    onClick={() => removeAttachment(attachment.id)}
                    className="remove-button"
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>

        <Divider />

        <DialogActions className="file-dialog-actions">
          <Button
            onClick={handleAddFiles}
            startIcon={<AddIcon />}
            className="add-files-button"
            variant="outlined"
          >
            Add
          </Button>
          <Button
            onClick={clearAllAttachments}
            startIcon={<DeleteIcon />}
            className="delete-all-button"
            variant="outlined"
            disabled={attachments.length === 0}
          >
            Delete All
          </Button>
          <Button
            onClick={() => setShowFileDialog(false)}
            className="done-button"
            variant="contained"
          >
            Done
          </Button>
        </DialogActions>

        {/* Hidden file input */}
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={(e) => handleFileDialogSelect(e.target.files)}
          style={{ display: 'none' }}
        />
      </Dialog>
    </Box>
  );
};

export default ChatInput;
