import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { interviewService } from '../services/interviewService';
import { ArrowLeft, Award, ThumbsUp, Lightbulb, Sparkles, BookOpen, User, AlertCircle, RefreshCw } from 'lucide-react';

const InterviewDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchInterviewDetail();
  }, [id]);

  const fetchInterviewDetail = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await interviewService.getInterviewById(id);
      setDetail(data);
    } catch (err) {
      console.error('Failed to fetch interview detail:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Interview session not found or you do not have permission to view it.');
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScoreColor = (score) => {
    if (score >= 8) return { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.4)', text: '#4ade80' };
    if (score >= 5) return { bg: 'rgba(234, 179, 8, 0.15)', border: 'rgba(234, 179, 8, 0.4)', text: '#facc15' };
    return { bg: 'rgba(239, 68, 68, 0.15)', border: 'rgba(239, 68, 68, 0.4)', text: '#f87171' };
  };

  return (
    <div className="interview-page-container">
      {/* Header Controls */}
      <div className="interview-page-header">
        <button className="btn-secondary-action" onClick={() => navigate('/history')}>
          <ArrowLeft size={16} /> Back to History
        </button>
        <button className="btn-primary" style={{ width: 'auto' }} onClick={() => navigate('/interview')}>
          Practice New Session
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="interview-loading-card">
          <div className="spinner-glow" />
          <p style={{ color: 'var(--text-muted)' }}>Fetching interview detail report...</p>
        </div>
      )}

      {/* Error State / Unauthorized Access / Not Found */}
      {!loading && error && (
        <div className="interview-error-card">
          <AlertCircle size={48} color="#f87171" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '0.5rem' }}>Access Denied or Session Not Found</h3>
          <p style={{ color: '#fca5a5', marginBottom: '1.5rem', textAlign: 'center', maxWidth: '500px' }}>{error}</p>
          <button className="btn-primary" style={{ width: 'auto' }} onClick={() => navigate('/history')}>
            Back to History List
          </button>
        </div>
      )}

      {/* Detail Content */}
      {!loading && !error && detail && (
        <div className="evaluation-results-container">
          {/* Question Summary Bar */}
          <div className="question-prompt-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span className="meta-badge-topic">{detail.topic}</span>
                <span className="meta-badge-difficulty">{detail.difficulty}</span>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Attempted on {formatDate(detail.createdAt)}
              </span>
            </div>
            <div className="question-label">
              <BookOpen size={18} color="#8b5cf6" />
              <span>Question #{detail.id}</span>
            </div>
            <h2 className="question-text">{detail.question}</h2>
          </div>

          {/* User's Submitted Answer */}
          <div className="answer-form-card">
            <div className="question-label" style={{ color: '#60a5fa' }}>
              <User size={18} color="#60a5fa" />
              <span>Your Submitted Answer</span>
            </div>
            <p style={{ fontSize: '1rem', color: '#e5e7eb', lineHeight: 1.6, whiteSpace: 'pre-wrap', margin: 0 }}>
              {detail.userAnswer}
            </p>
          </div>

          {/* Score Header Card */}
          <div className="evaluation-score-card">
            <div className="score-badge-circle" style={{
              background: getScoreColor(detail.score).bg,
              border: `2px solid ${getScoreColor(detail.score).border}`,
              color: getScoreColor(detail.score).text
            }}>
              <Award size={36} />
              <div className="score-number">{detail.score} <span style={{ fontSize: '1.2rem', opacity: 0.7 }}>/ 10</span></div>
            </div>

            <div className="score-summary-text">
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', marginBottom: '0.4rem' }}>
                AI Evaluation Overview
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0, lineHeight: 1.5 }}>
                {detail.correctness}
              </p>
            </div>
          </div>

          {/* Strengths & Improvements */}
          <div className="evaluation-details-grid">
            <div className="eval-detail-card strengths">
              <div className="eval-card-header">
                <ThumbsUp size={20} color="#4ade80" />
                <h4 style={{ color: '#4ade80' }}>Key Strengths</h4>
              </div>
              <ul className="eval-list">
                {detail.strengths && detail.strengths.map((str, idx) => (
                  <li key={idx}><span className="check-icon">✓</span> {str}</li>
                ))}
              </ul>
            </div>

            <div className="eval-detail-card improvements">
              <div className="eval-card-header">
                <Lightbulb size={20} color="#facc15" />
                <h4 style={{ color: '#facc15' }}>Areas to Improve</h4>
              </div>
              <ul className="eval-list">
                {detail.improvements && detail.improvements.map((imp, idx) => (
                  <li key={idx}><span className="bullet-icon">•</span> {imp}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Model Ideal Answer */}
          <div className="ideal-answer-card">
            <div className="ideal-header">
              <Sparkles size={20} color="#8b5cf6" />
              <span>Model Ideal Answer</span>
            </div>
            <p className="ideal-text">{detail.idealAnswer}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewDetailPage;
