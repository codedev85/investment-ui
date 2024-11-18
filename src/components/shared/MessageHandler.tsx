import React, { useContext } from 'react';
import { MessageContext } from './MessageContext';
import ErrorCard from './Errors/ErrorCard';
import SuccessCard from './Success/SuccessCard';

const MessageHandler: React.FC = () => {
  const messageContext = useContext(MessageContext);

  if (!messageContext) {
    throw new Error('MessageHandler must be used within a MessageProvider');
  }

  const { messages, type } = messageContext;

  return (
    <div>
      {type === 'error' && messages.length > 0 && <ErrorCard messages={messages} />}
      {type === 'success' && messages.length > 0 && <SuccessCard message={messages[0]} />}
    </div>
  );
};

export default MessageHandler;

