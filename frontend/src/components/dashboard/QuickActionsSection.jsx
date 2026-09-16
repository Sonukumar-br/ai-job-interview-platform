import React from 'react';
import { PlayCircle, FileText, Target, History, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickActionsSection = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Start Mock Interview',
      description: 'Practice real-time AI questions with instant scoring',
      icon: PlayCircle,
      color: '#818cf8',
      bg: 'rgba(99, 102, 241, 0.15)',
      route: '/interview',
      btnText: 'Start Interview'
    },
    {
      title: 'Analyze Resume',
      description: 'Upload PDF resume for AI skill & gap extraction',
      icon: FileText,
      color: '#c084fc',
      bg: 'rgba(168, 85, 247, 0.15)',
      route: '/resume-analyzer',
      btnText: 'Analyze Resume'
    },
    {
      title: 'Check Job Match',
      description: 'Compare your profile against target industry roles',
      icon: Target,
      color: '#22d3ee',
      bg: 'rgba(6, 182, 212, 0.15)',
      route: '/job-matcher',
      btnText: 'Check Match'
    },
    {
      title: 'Interview History',
      description: 'Review your detailed past evaluations & answers',
      icon: History,
      color: '#4ade80',
      bg: 'rgba(34, 197, 94, 0.15)',
      route: '/history',
      btnText: 'View History'
    }
  ];

  return (
    <div style={{ marginTop: '2.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <Sparkles size={20} color="#d946ef" />
        <h3 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 700 }}>Quick Actions</h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        {actions.map((act, index) => {
          const Icon = act.icon;
          return (
            <div 
              key={index}
              className="action-card"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                transition: 'transform 0.2s ease, border-color 0.2s ease',
                cursor: 'pointer'
              }}
              onClick={() => navigate(act.route)}
            >
              <div>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: act.bg,
                  color: act.color,
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  marginBottom: '1rem'
                }}>
                  <Icon size={22} />
                </div>
                <h4 style={{ margin: '0 0 0.4rem 0', fontSize: '1.05rem', fontWeight: 600, color: '#fff' }}>
                  {act.title}
                </h4>
                <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                  {act.description}
                </p>
              </div>

              <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: act.color, fontSize: '0.85rem', fontWeight: 600 }}>
                {act.btnText} <ArrowRight size={14} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActionsSection;
