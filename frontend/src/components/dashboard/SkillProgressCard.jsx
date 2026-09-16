import React from 'react';
import { Target } from 'lucide-react';

const SkillProgressCard = ({ skills }) => {
  return (
    <div className="dashboard-widget-card">
      <div className="widget-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Target size={20} color="#8b5cf6" />
          <h3>Skill Progress</h3>
        </div>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>AI Assessed</span>
      </div>

      <div className="skills-list">
        {skills.map((skill, index) => (
          <div key={index} className="skill-item">
            <div className="skill-info">
              <span className="skill-name">{skill.name}</span>
              <span className="skill-percentage">{skill.percentage}%</span>
            </div>
            <div className="progress-bar-bg">
              <div 
                className="progress-bar-fill" 
                style={{ 
                  width: `${skill.percentage}%`,
                  background: skill.color || 'var(--primary-gradient)' 
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillProgressCard;
