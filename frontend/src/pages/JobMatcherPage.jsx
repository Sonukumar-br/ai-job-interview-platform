import React, { useEffect, useState } from 'react';
import { jobRoleService } from '../services/jobRoleService';
import { Target, Sparkles, CheckCircle2, AlertTriangle, RefreshCw, Award, BookOpen, ListOrdered, FolderGit2, ArrowRight, Lightbulb, BarChart3, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JobMatcherPage = () => {
  const navigate = useNavigate();

  const [roles, setRoles] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState('java-full-stack');
  
  // UI States: 'IDLE' | 'LOADING' | 'MATCHED' | 'ERROR'
  const [status, setStatus] = useState('IDLE');
  const [matchResult, setMatchResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchJobRoles();
  }, []);

  const fetchJobRoles = async () => {
    try {
      const data = await jobRoleService.getJobRoles();
      if (data && data.length > 0) {
        setRoles(data);
        setSelectedRoleId(data[0].id);
      }
    } catch (err) {
      console.error('Failed to fetch job roles list:', err);
      // Default local fallback roles list if endpoint fails
      setRoles([
        { id: 'java-full-stack', name: 'Java Full Stack Developer', description: 'Java, Spring Boot, React, MySQL' },
        { id: 'java-backend', name: 'Java Backend Developer', description: 'Java, Microservices, Security, Databases' },
        { id: 'frontend-developer', name: 'Frontend Developer', description: 'React, JavaScript, ES6+, Web APIs' },
        { id: 'software-engineer', name: 'Software Engineer', description: 'DSA, System Design, Core Java, SQL' },
      ]);
    }
  };

  const handleAnalyzeProfile = async () => {
    setStatus('LOADING');
    setErrorMessage('');
    setMatchResult(null);

    try {
      const result = await jobRoleService.matchJobRole(selectedRoleId);
      setMatchResult(result);
      setStatus('MATCHED');
    } catch (err) {
      console.error('Failed to match job role profile:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage('Failed to connect to job matching server. Please try again.');
      }
      setStatus('ERROR');
    }
  };

  const handleReset = () => {
    setStatus('IDLE');
    setMatchResult(null);
    setErrorMessage('');
  };

  const getMatchColor = (pct) => {
    if (pct >= 80) return { bg: 'rgba(34, 197, 94, 0.2)', text: '#4ade80', border: 'rgba(34, 197, 94, 0.4)' };
    if (pct >= 50) return { bg: 'rgba(234, 179, 8, 0.2)', text: '#facc15', border: 'rgba(234, 179, 8, 0.4)' };
    return { bg: 'rgba(239, 68, 68, 0.2)', text: '#f87171', border: 'rgba(239, 68, 68, 0.4)' };
  };

  return (
    <div className="interview-page-container">
      {/* Page Header */}
      <div className="interview-page-header">
        <div>
          <h1 className="dashboard-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Target color="#6366f1" size={32} />
            Job Role & Skill Matcher
          </h1>
          <p className="dashboard-subtitle">
            Compare your resume skills and database interview performance against target industry software engineering roles.
          </p>
        </div>

        {status === 'MATCHED' && (
          <button className="btn-secondary-action" onClick={handleReset}>
            <RefreshCw size={16} /> Select Another Role
          </button>
        )}
      </div>

      {/* STATE 1: IDLE ROLE SELECTION */}
      {status === 'IDLE' && (
        <div className="interview-setup-card">
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '1.5rem' }}>
            Select Target Job Role to Analyze
          </h3>

          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label style={{ fontSize: '0.95rem', fontWeight: 600, color: '#e5e7eb', marginBottom: '0.875rem' }}>
              Target Role
            </label>
            <div className="topic-select-grid">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className={`topic-select-card ${selectedRoleId === role.id ? 'active' : ''}`}
                  onClick={() => setSelectedRoleId(role.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span className="topic-card-title">{role.name}</span>
                    <Target size={18} color={selectedRoleId === role.id ? '#6366f1' : '#9ca3af'} />
                  </div>
                  <span className="topic-card-desc">{role.description}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            className="btn-primary"
            style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
            onClick={handleAnalyzeProfile}
          >
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <Sparkles size={20} /> Analyze My Profile & Interview Performance
            </span>
          </button>
        </div>
      )}

      {/* STATE 2: LOADING STATE */}
      {status === 'LOADING' && (
        <div className="interview-loading-card">
          <div className="spinner-glow" />
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
            Analyzing Your Profile & Database History...
          </h3>
          <p style={{ color: 'var(--text-muted)' }}>
            Performing deterministic skill set comparison and processing real interview statistics.
          </p>
        </div>
      )}

      {/* STATE 3: ERROR STATE */}
      {status === 'ERROR' && (
        <div className="interview-error-card">
          <AlertTriangle size={48} color="#f87171" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
            Job Match Failed
          </h3>
          <p style={{ color: '#fca5a5', marginBottom: '1.5rem', textAlign: 'center', maxWidth: '500px' }}>
            {errorMessage || 'Unable to generate job match report.'}
          </p>
          <button className="btn-primary" style={{ width: 'auto', padding: '0.75rem 1.5rem' }} onClick={handleAnalyzeProfile}>
            <RefreshCw size={16} /> Retry Analysis
          </button>
        </div>
      )}

      {/* STATE 4: MATCH REPORT DISPLAY */}
      {status === 'MATCHED' && matchResult && (
        <div className="evaluation-results-container">
          {/* Target Role & Match Percentage Banner */}
          <div className="question-prompt-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: '#818cf8', fontWeight: 700, textTransform: 'uppercase' }}>
                Job Match Report
              </span>
              <h2 style={{ fontSize: '1.6rem', color: '#fff', marginTop: '0.25rem', marginBottom: 0 }}>
                {matchResult.roleName}
              </h2>
            </div>

            <div style={{
              background: getMatchColor(matchResult.matchPercentage).bg,
              border: `2px solid ${getMatchColor(matchResult.matchPercentage).border}`,
              color: getMatchColor(matchResult.matchPercentage).text,
              padding: '0.65rem 1.4rem',
              borderRadius: '9999px',
              fontWeight: 800,
              fontSize: '1.25rem'
            }}>
              {matchResult.matchPercentage}% Match
            </div>
          </div>

          {/* Matched & Missing Required Skills Grid */}
          <div className="evaluation-details-grid">
            {/* Matched Skills */}
            <div className="eval-detail-card strengths">
              <div className="eval-card-header">
                <CheckCircle2 size={20} color="#4ade80" />
                <h4 style={{ color: '#4ade80' }}>Matched Skills ({matchResult.matchedSkills ? matchResult.matchedSkills.length : 0})</h4>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {matchResult.matchedSkills && matchResult.matchedSkills.length > 0 ? (
                  matchResult.matchedSkills.map((sk, idx) => (
                    <span key={idx} className="meta-badge-topic" style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80' }}>
                      ✓ {sk}
                    </span>
                  ))
                ) : (
                  <span style={{ color: 'var(--text-muted)' }}>No skills matched yet.</span>
                )}
              </div>
            </div>

            {/* Missing Required Skills */}
            <div className="eval-detail-card improvements">
              <div className="eval-card-header">
                <AlertTriangle size={20} color="#f87171" />
                <h4 style={{ color: '#f87171' }}>Missing Role Skills ({matchResult.missingSkills ? matchResult.missingSkills.length : 0})</h4>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {matchResult.missingSkills && matchResult.missingSkills.length > 0 ? (
                  matchResult.missingSkills.map((sk, idx) => (
                    <span key={idx} className="meta-badge-topic" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#f87171' }}>
                      ⚠ {sk}
                    </span>
                  ))
                ) : (
                  <span style={{ color: '#4ade80', fontWeight: 600 }}>100% of required role skills matched!</span>
                )}
              </div>
            </div>
          </div>

          {/* Real Database Interview Performance Card */}
          {matchResult.interviewPerformance && (
            <div className="dashboard-widget-card">
              <div className="widget-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <BarChart3 size={20} color="#ec4899" />
                  <h3>Real Database Interview Performance</h3>
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Verified History Data</span>
              </div>

              <div className="metrics-grid" style={{ marginBottom: '1.25rem' }}>
                <div className="metric-card" style={{ background: 'rgba(255, 255, 255, 0.03)' }}>
                  <div className="metric-icon" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
                    <BookOpen size={22} />
                  </div>
                  <div className="metric-info">
                    <h4>Total Interviews</h4>
                    <p>{matchResult.interviewPerformance.totalInterviews}</p>
                  </div>
                </div>

                <div className="metric-card" style={{ background: 'rgba(255, 255, 255, 0.03)' }}>
                  <div className="metric-icon" style={{ background: 'rgba(234, 179, 8, 0.15)', color: '#facc15' }}>
                    <Award size={22} />
                  </div>
                  <div className="metric-info">
                    <h4>Average Score</h4>
                    <p>{matchResult.interviewPerformance.averageScore} / 10</p>
                  </div>
                </div>
              </div>

              <div className="evaluation-details-grid">
                <div>
                  <h5 style={{ color: '#4ade80', marginBottom: '0.5rem', fontWeight: 700 }}>Strong Topics (Avg &ge; 7.0)</h5>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {matchResult.interviewPerformance.strongTopics && matchResult.interviewPerformance.strongTopics.length > 0 ? (
                      matchResult.interviewPerformance.strongTopics.map((top, idx) => (
                        <span key={idx} className="meta-badge-topic" style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80' }}>
                          ✓ {top}
                        </span>
                      ))
                    ) : (
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No strong topics recorded yet.</span>
                    )}
                  </div>
                </div>

                <div>
                  <h5 style={{ color: '#facc15', marginBottom: '0.5rem', fontWeight: 700 }}>Topics to Practice/Improve</h5>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {matchResult.interviewPerformance.weakTopics && matchResult.interviewPerformance.weakTopics.length > 0 ? (
                      matchResult.interviewPerformance.weakTopics.map((top, idx) => (
                        <span key={idx} className="meta-badge-topic" style={{ background: 'rgba(234, 179, 8, 0.15)', color: '#facc15' }}>
                          • {top}
                        </span>
                      ))
                    ) : (
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>All topics meet benchmark!</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Recommendations */}
          <div className="eval-detail-card" style={{ border: '1px solid rgba(139, 92, 246, 0.3)' }}>
            <div className="eval-card-header">
              <Lightbulb size={20} color="#a78bfa" />
              <h4 style={{ color: '#a78bfa' }}>AI Recommendations</h4>
            </div>
            <ul className="eval-list">
              {matchResult.recommendations && matchResult.recommendations.map((rec, idx) => (
                <li key={idx}><span className="bullet-icon">•</span> {rec}</li>
              ))}
            </ul>
          </div>

          {/* Learning Plan */}
          <div className="ideal-answer-card">
            <div className="ideal-header" style={{ color: '#c084fc' }}>
              <ListOrdered size={20} color="#c084fc" />
              <span>Recommended Learning Order</span>
            </div>
            <ul className="eval-list">
              {matchResult.learningPlan && matchResult.learningPlan.map((step, idx) => (
                <li key={idx} style={{ fontSize: '1rem', color: '#f3f4f6' }}>
                  <span style={{ fontWeight: 800, color: '#c084fc', minWidth: '24px' }}>{idx + 1}.</span> {step}
                </li>
              ))}
            </ul>
          </div>

          {/* Suggested Project Ideas */}
          <div className="dashboard-widget-card" style={{ border: '1px solid rgba(6, 182, 212, 0.3)' }}>
            <div className="eval-card-header">
              <FolderGit2 size={20} color="#06b6d4" />
              <h4 style={{ color: '#06b6d4' }}>Suggested Project Ideas</h4>
            </div>
            <ul className="eval-list">
              {matchResult.projectIdeas && matchResult.projectIdeas.map((proj, idx) => (
                <li key={idx}><span style={{ color: '#06b6d4' }}>✦</span> {proj}</li>
              ))}
            </ul>
          </div>

          {/* Action Navigation */}
          <div className="evaluation-actions">
            <button className="btn-secondary-action" onClick={() => navigate('/dashboard')}>
              Back to Dashboard
            </button>
            <button className="btn-primary" style={{ width: 'auto' }} onClick={() => navigate('/interview')}>
              Start Practice Interview Session <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobMatcherPage;
