import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { interviewService } from '../services/interviewService';
import { History, ChevronRight, PlayCircle, AlertCircle, Sparkles } from 'lucide-react';

const InterviewHistoryPage = () => {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await interviewService.getHistory();
      setHistory(data || []);
    } catch (err) {
      console.error('Failed to fetch interview history:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to load interview history. Please check your connection.');
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

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="dashboard-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <History color="#ec4899" size={32} />
          Interview History
        </h1>
        <p className="dashboard-subtitle">
          Review all your past AI mock interview sessions, scores, and detailed evaluation feedback.
        </p>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="interview-loading-card">
          <div className="spinner-glow" />
          <p style={{ color: 'var(--text-muted)' }}>Loading your saved interview history...</p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="interview-error-card">
          <AlertCircle size={48} color="#f87171" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem' }}>Failed to Load History</h3>
          <p style={{ color: '#fca5a5', marginBottom: '1.5rem' }}>{error}</p>
          <button className="btn-primary" style={{ width: 'auto' }} onClick={fetchHistory}>
            Try Again
          </button>
        </div>
      )}

      {/* Empty History State */}
      {!loading && !error && history.length === 0 && (
        <div className="dashboard-widget-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <Sparkles size={48} color="#8b5cf6" style={{ marginBottom: '1rem', opacity: 0.8 }} />
          <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '0.5rem' }}>
            You haven't completed any mock interviews yet.
          </h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.75rem', maxWidth: '500px', margin: '0 auto 1.75rem' }}>
            Start your first AI technical interview session to practice questions, receive instant scoring, and track your progress here!
          </p>
          <button className="btn-primary" style={{ width: 'auto', padding: '0.75rem 2rem' }} onClick={() => navigate('/interview')}>
            Start First Practice Session
          </button>
        </div>
      )}

      {/* History Table */}
      {!loading && !error && history.length > 0 && (
        <div className="dashboard-widget-card">
          <div className="widget-header">
            <h3>Completed Sessions ({history.length})</h3>
            <button className="btn-secondary-action" onClick={() => navigate('/interview')}>
              + Practice New Session
            </button>
          </div>

          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Topic</th>
                  <th>Difficulty</th>
                  <th>Question Preview</th>
                  <th>Score</th>
                  <th>Completed Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr key={item.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/history/${item.id}`)}>
                    <td>
                      <span className="meta-badge-topic">{item.topic}</span>
                    </td>
                    <td>
                      <span className="meta-badge-difficulty">{item.difficulty}</span>
                    </td>
                    <td style={{ maxWidth: '300px' }}>
                      <div style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontWeight: 600,
                        color: '#fff'
                      }}>
                        {item.question}
                      </div>
                    </td>
                    <td>
                      <span
                        className="score-badge"
                        style={{
                          background: item.score >= 8 ? 'rgba(34, 197, 94, 0.15)' : (item.score >= 5 ? 'rgba(234, 179, 8, 0.15)' : 'rgba(239, 68, 68, 0.15)'),
                          color: item.score >= 8 ? '#4ade80' : (item.score >= 5 ? '#facc15' : '#f87171')
                        }}
                      >
                        {item.score} / 10
                      </span>
                    </td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      {formatDate(item.createdAt)}
                    </td>
                    <td>
                      <button className="btn-table-action" onClick={(e) => { e.stopPropagation(); navigate(`/history/${item.id}`); }}>
                        Review <ChevronRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewHistoryPage;
