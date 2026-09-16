import React from 'react';
import { TrendingUp, CheckCircle, AlertCircle, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TopicPerformanceSection = ({ topicPerformance = [], strongTopics = [], weakTopics = [], totalInterviews = 0 }) => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-widget-card">
      <div className="widget-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <TrendingUp size={20} color="#8b5cf6" />
          <h3>Topic Performance</h3>
        </div>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>From DB History</span>
      </div>

      {totalInterviews === 0 || topicPerformance.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)' }}>
          <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem' }}>
            Complete your first interview to see topic performance.
          </p>
          <button 
            className="btn-primary" 
            style={{ width: 'auto', padding: '0.5rem 1rem', fontSize: '0.85rem' }}
            onClick={() => navigate('/interview')}
          >
            <PlayCircle size={15} /> Practice Now
          </button>
        </div>
      ) : (
        <div>
          {/* Progress Bars per topic */}
          <div className="skills-list" style={{ marginBottom: '1.5rem' }}>
            {topicPerformance.map((item, idx) => {
              const pct = Math.min(100, Math.round((item.averageScore / 10) * 100));
              const color = item.averageScore >= 7.5 ? 'linear-gradient(90deg, #22c55e, #10b981)' : item.averageScore >= 5.0 ? 'linear-gradient(90deg, #6366f1, #8b5cf6)' : 'linear-gradient(90deg, #f59e0b, #ef4444)';

              return (
                <div key={idx} className="skill-item">
                  <div className="skill-info">
                    <span className="skill-name">{item.topic} <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({item.interviewCount} sessions)</span></span>
                    <span className="skill-percentage" style={{ fontWeight: 700, color: item.averageScore >= 7 ? '#4ade80' : '#facc15' }}>
                      {item.averageScore.toFixed(1)} / 10
                    </span>
                  </div>
                  <div className="progress-bar-bg">
                    <div 
                      className="progress-bar-fill" 
                      style={{ 
                        width: `${pct}%`,
                        background: color 
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Strong & Weak Topics Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 600, color: '#4ade80', marginBottom: '0.5rem' }}>
                <CheckCircle size={14} /> Strong Topics
              </div>
              {strongTopics && strongTopics.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {strongTopics.map((t, i) => (
                    <span key={i} style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', border: '1px solid rgba(34, 197, 94, 0.3)', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.78rem', fontWeight: 500 }}>
                      {t}
                    </span>
                  ))}
                </div>
              ) : (
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No strong topics identified yet.</span>
              )}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', fontWeight: 600, color: '#fbbf24', marginBottom: '0.5rem' }}>
                <AlertCircle size={14} /> Needs Improvement
              </div>
              {weakTopics && weakTopics.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {weakTopics.map((t, i) => (
                    <span key={i} style={{ background: 'rgba(234, 179, 8, 0.15)', color: '#fbbf24', border: '1px solid rgba(234, 179, 8, 0.3)', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.78rem', fontWeight: 500 }}>
                      {t}
                    </span>
                  ))}
                </div>
              ) : (
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Keep practicing to highlight growth areas.</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicPerformanceSection;
