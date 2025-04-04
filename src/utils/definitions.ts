// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
export interface User {
  id: string;
  name: string;
  email: string;
  createAt: string;
  updatedAt: string;
}

export interface Conversation {
  id: string;
  creatorId: string;
  recipientId: string;
  creator: User;
  recipient: User;
  createAt: string;
  messages: Message[];
}

export interface Message {
  content: string;
  createdAt: string;
  conversationId: string;
  sender: User;
}
