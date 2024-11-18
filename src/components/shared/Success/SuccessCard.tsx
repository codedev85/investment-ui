import React from 'react';

type SuccessCardProps = {
  message: string; 
};

const SuccessCard: React.FC<SuccessCardProps> = ({ message }) => {
  return (
    <div className="success-card">
      <strong>Success:</strong> {message}
    </div>
  );
};

export default SuccessCard;
