import React from 'react';

const StatCard = ({ icon: Icon, title, value, subtitle, iconColor, iconBg }) => {
  return (
    <div className="metric-card">
      <div 
        className="metric-icon" 
        style={{ 
          background: iconBg || 'rgba(99, 102, 241, 0.15)', 
          color: iconColor || '#818cf8' 
        }}
      >
        {Icon && <Icon size={26} />}
      </div>
      <div className="metric-info">
        <h4>{title}</h4>
        <p>{value}</p>
        {subtitle && <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{subtitle}</span>}
      </div>
    </div>
  );
};

export default StatCard;
