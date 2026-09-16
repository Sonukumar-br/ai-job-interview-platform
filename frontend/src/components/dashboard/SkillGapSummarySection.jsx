import React from 'react';
import { Target, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SkillGapSummarySection = ({ targetRole, matchedSkills = [], missingSkills = [] }) => {
  const navigate = useNavigate();

  const hasSkillsData = matchedSkills.length > 0 || missingSkills.length > 0;

  return (
    <div className="dashboard-widget-card">
      <div className="widget-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Target size={20} color="#06b6d4" />
          <h3>Skill Gap Summary</h3>
        </div>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Target Match</span>
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Current Target Role</div>
        <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#38bdf8' }}>
          {targetRole || 'Java Full Stack Developer'}
        </div>
      </div>

      {!hasSkillsData ? (
        <div style={{ textAlign: 'center', padding: '1.5rem 1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px border-dashed rgba(255,255,255,0.1)' }}>
          <p style={{ margin: '0 0 1rem 0', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Set your target role and analyze your skill match.
          </p>
          <button 
            className="btn-primary" 
            style={{ width: 'auto', padding: '0.5rem 1rem', fontSize: '0.85rem' }}
            onClick={() => navigate('/job-matcher')}
          >
            Analyze Job Match
          </button>
        </div>
      ) : (
        <div>
          {/* Matched Skills */}
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#4ade80', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <CheckCircle2 size={14} /> Your Matched Skills ({matchedSkills.length})
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {matchedSkills.map((skill, i) => (
                <span key={i} style={{ background: 'rgba(34, 197, 94, 0.12)', color: '#86efac', border: '1px solid rgba(34, 197, 94, 0.25)', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.78rem' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Missing Skills */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f87171', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <XCircle size={14} /> Skills to Improve ({missingSkills.length})
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {missingSkills.map((skill, i) => (
                <span key={i} style={{ background: 'rgba(239, 68, 68, 0.12)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.25)', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.78rem' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation link */}
          <button 
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: '#818cf8', 
              fontSize: '0.85rem', 
              fontWeight: 600, 
              cursor: 'pointer', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.3rem', 
              padding: 0 
            }}
            onClick={() => navigate('/job-matcher')}
          >
            View Full Skill Analysis <ArrowRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default SkillGapSummarySection;
