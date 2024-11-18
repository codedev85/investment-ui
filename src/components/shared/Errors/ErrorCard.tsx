import React from 'react';

type ErrorCardProps = {
  messages: string[]; // An array of error messages to display
};

const ErrorCard: React.FC<ErrorCardProps> = ({ messages }) => {
  return (
    <div className="error-card">
      <strong>Error:</strong>
      <br />
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorCard;

