import React from 'react';
import { Compass, CheckSquare, Sparkles } from 'lucide-react';

const LearningRecommendationsSection = ({ recommendedTopics = [], learningPlan = [] }) => {
  const recommendations = recommendedTopics.length > 0 ? recommendedTopics : learningPlan;

  return (
    <div className="dashboard-widget-card" style={{ gridColumn: '1 / -1' }}>
      <div className="widget-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Compass size={20} color="#38bdf8" />
          <h3>Recommended Next Steps</h3>
        </div>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Personalized Plan</span>
      </div>

      {recommendations && recommendations.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {recommendations.slice(0, 4).map((item, index) => (
            <div 
              key={index} 
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '10px',
                padding: '1rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.75rem'
              }}
            >
              <div style={{
                background: 'rgba(56, 189, 248, 0.15)',
                color: '#38bdf8',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.85rem',
                flexShrink: 0
              }}>
                {index + 1}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#e5e7eb', lineHeight: '1.4' }}>
                {item}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem', color: '#818cf8', fontWeight: 600 }}>
            <Sparkles size={16} /> Ready to start learning?
          </div>
          Attempt mock interviews or select a target job role to generate your custom learning path.
        </div>
      )}
    </div>
  );
};

export default LearningRecommendationsSection;
