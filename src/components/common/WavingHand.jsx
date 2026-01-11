import React from 'react';

const WavingHand = ({ size = 40 }) => {
  return (
    <span
      className="inline-block animate-wave"
      style={{
        fontSize: `${size}px`,
        transformOrigin: '70% 70%',
      }}
      role="img"
      aria-label="mano saludando"
    >
      👋
    </span>
  );
};

export default WavingHand;
