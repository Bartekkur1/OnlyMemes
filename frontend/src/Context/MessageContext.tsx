import { FC, PropsWithChildren, createContext, useState } from "react";

type MessageType = 'error' | 'warning' | 'info' | 'success';

export interface Message {
  id: number;
  content: string;
  type: MessageType;
  pulled: boolean;
}

interface MessageContextType {
  messages: Message[];
  push: (content: string, type: MessageType) => void;
  removeMessage: (index: number) => void;
}

const MessageContext = createContext<MessageContextType>({} as MessageContextType);

const MessageProvider: FC<PropsWithChildren> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const push = (content: string, type: MessageType) => {
    setMessages(messages => [...messages, { content, type, pulled: false, id: Date.now() }]);
  };

  const removeMessage = (id: number) => {
    setMessages(messages => messages.filter(m => m.id !== id));
  }

  const contextValue: MessageContextType = {
    messages,
    push,
    removeMessage
  };

  return (
    <MessageContext.Provider value={contextValue}>{children}</MessageContext.Provider>
  )
};

export default MessageProvider;
export { MessageContext }