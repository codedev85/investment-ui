import React, { createContext, useState } from 'react';

type MessageContextType = {
  messages: string[];
  type: 'error' | 'success' | '';
  displayError: (msgs: string | string[] | Record<string, string[]>) => void;
  displaySuccess: (msg: string) => void;
};

export const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [type, setType] = useState<'error' | 'success' | ''>('');

  const displayError = (msgs: string | string[] | Record<string, string[]>) => {
    if (typeof msgs === 'object' && !Array.isArray(msgs)) {
      const flatMessages: string[] = [];
      for (const key in msgs) {
        if (Array.isArray(msgs[key])) {
          msgs[key].forEach((msg) => flatMessages.push(`${key}: ${msg}`));
        }
      }
      setMessages(flatMessages);
    } else if (Array.isArray(msgs)) {
      setMessages(msgs);
    } else {
      setMessages([msgs]);
    }
    setType('error');
    setTimeout(() => {
      setMessages([]);
      setType('');
    }, 3000);
  };

  const displaySuccess = (msg: string) => {
    setMessages([msg]);
    setType('success');
    setTimeout(() => {
      setMessages([]);
      setType('');
    }, 3000);
  };

  return (
    <MessageContext.Provider value={{ messages, type, displayError, displaySuccess }}>
      {children}
    </MessageContext.Provider>
  );
};
