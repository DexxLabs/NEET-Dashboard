import React from 'react';

export const Card = ({ title, sub, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg p-6 border-2 border-cream-dark ${className}`}>
      {title && <div className="font-baloo font-bold text-[18px] text-text-dark mb-1">{title}</div>}
      {sub && <div className="text-[12px] text-text-muted font-semibold mb-[18px]">{sub}</div>}
      {children}
    </div>
  );
};
