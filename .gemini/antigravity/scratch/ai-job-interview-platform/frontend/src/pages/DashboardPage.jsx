import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/dashboard/StatCard';
import RecentInterviewsTable from '../components/dashboard/RecentInterviewsTable';
import TopicPerformanceSection from '../components/dashboard/TopicPerformanceSection';
import SkillGapSummarySection from '../components/dashboard/SkillGapSummarySection';
import LearningRecommendationsSection from '../components/dashboard/LearningRecommendationsSection';
import QuickActionsSection from '../components/dashboard/QuickActionsSection';
import { dashboardService } from '../services/dashboardService';
import { PlayCircle, Award, Trophy, FileText, AlertTriangle, RefreshCw, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardSummary();
  }, []);

  const fetchDashboardSummary = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dashboardService.getSummary();
      setSummary(data || {
        totalInterviews: 0,
        averageScore: 0.0,
        bestScore: 0.0,
        resumeAnalyzed: false,
        targetRole: 'Java Full Stack Developer',
        recentInterviews: [],
        topicPerformance: [],
        strongTopics: [],
        weakTopics: [],
        matchedSkills: [],
        missingSkills: [],
        recommendedTopics: [],
        learningPlan: []
      });
    } catch (err) {
      console.error('Failed to fetch dashboard summary:', err);
      setError('Unable to load your dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <div className="spinner" style={{ margin: '0 auto 1.5rem auto', width: '40px', height: '40px', border: '3px solid rgba(99,102,241,0.2)', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Loading your real-time performance summary...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '3rem 2rem', textAlign: 'center', background: 'rgba(239,68,68,0.08)', borderRadius: '12px', border: '1px solid rgba(239,68,68,0.2)', margin: '2rem 0' }}>
        <AlertTriangle size={48} color="#f87171" style={{ marginBottom: '1rem' }} />
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#f87171' }}>{error}</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Please check your network connection or backend server status.</p>
        <button 
          className="btn-primary" 
          style={{ width: 'auto', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.5rem' }}
          onClick={fetchDashboardSummary}
        >
          <RefreshCw size={16} /> Retry
        </button>
      </div>
    );
  }

  const hasInterviews = summary && summary.totalInterviews > 0;

  return (
    <div>
      {/* Header Welcome Section */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="dashboard-title" style={{ fontSize: '1.8rem', fontWeight: 800 }}>
          Welcome back, <span style={{ background: 'var(--primary-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{user?.name || 'Developer'}</span>! 👋
        </h1>
        <p className="dashboard-subtitle" style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: '0.3rem 0 0 0' }}>
          Track your interview preparation and improve your skills.
        </p>
      </div>

      {/* 4 Real Summary Cards */}
      <div className="metrics-grid" style={{ marginBottom: '2rem' }}>
        <StatCard
          icon={PlayCircle}
          title="Total Interviews"
          value={summary.totalInterviews}
          subtitle="Real DB History"
          iconColor="#818cf8"
          iconBg="rgba(99, 102, 241, 0.15)"
        />

        <StatCard
          icon={Award}
          title="Average Score"
          value={hasInterviews ? `${summary.averageScore} / 10` : '—'}
          subtitle={hasInterviews ? 'Real-time average' : 'No interviews yet'}
          iconColor="#c084fc"
          iconBg="rgba(168, 85, 247, 0.15)"
        />

        <StatCard
          icon={Trophy}
          title="Best Score"
          value={hasInterviews ? `${summary.bestScore} / 10` : '—'}
          subtitle={hasInterviews ? 'Personal highest score' : 'No interviews yet'}
          iconColor="#22c55e"
          iconBg="rgba(34, 197, 94, 0.15)"
        />

        <div className="metric-card">
          <div className="metric-icon" style={{ background: summary.resumeAnalyzed ? 'rgba(34, 197, 94, 0.15)' : 'rgba(234, 179, 8, 0.15)', color: summary.resumeAnalyzed ? '#4ade80' : '#facc15' }}>
            <FileText size={24} />
          </div>
          <div className="metric-info" style={{ width: '100%' }}>
            <h4>Resume Status</h4>
            <p style={{ fontSize: '1.2rem' }}>{summary.resumeAnalyzed ? 'Analyzed' : 'Not analyzed'}</p>
            {!summary.resumeAnalyzed && (
              <button 
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  color: '#818cf8', 
                  fontSize: '0.78rem', 
                  fontWeight: 600, 
                  padding: 0, 
                  marginTop: '0.3rem', 
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.2rem'
                }}
                onClick={() => navigate('/resume-analyzer')}
              >
                Analyze Resume <ArrowRight size={12} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid: Topic Performance & Skill Gap Summary */}
      <div className="dashboard-widgets-grid" style={{ marginBottom: '2rem' }}>
        <TopicPerformanceSection
          topicPerformance={summary.topicPerformance}
          strongTopics={summary.strongTopics}
          weakTopics={summary.weakTopics}
          totalInterviews={summary.totalInterviews}
        />

        <SkillGapSummarySection
          targetRole={summary.targetRole}
          matchedSkills={summary.matchedSkills}
          missingSkills={summary.missingSkills}
        />
      </div>

      {/* Recent Interviews Table */}
      <RecentInterviewsTable interviews={summary.recentInterviews} />

      {/* Learning Recommendations Section */}
      <div style={{ marginTop: '2rem' }}>
        <LearningRecommendationsSection
          recommendedTopics={summary.recommendedTopics}
          learningPlan={summary.learningPlan}
        />
      </div>

      {/* Quick Actions Section */}
      <QuickActionsSection />
    </div>
  );
};

export default DashboardPage;
