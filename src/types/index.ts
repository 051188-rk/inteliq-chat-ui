export interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
  }
  
  export interface Chat {
    id: string;
    title: string;
    messages: Message[];
    lastMessage?: string;
    timestamp: Date;
  }
  
  export interface FileAttachment {
    id: string;
    name: string;
    size: number;
    type: string;
    file: File;
  }
  