import React from 'react';
import { History, ChevronRight, CheckCircle2, PlayCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RecentInterviewsTable = ({ interviews = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-widget-card" style={{ gridColumn: '1 / -1' }}>
      <div className="widget-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <History size={20} color="#ec4899" />
          <h3>Recent Mock Interviews</h3>
        </div>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Real Database History</span>
      </div>

      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Topic</th>
              <th>Difficulty</th>
              <th>Score</th>
              <th>Correctness / Summary</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {interviews && interviews.length > 0 ? (
              interviews.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: '#fff' }}>{item.topic}</div>
                    {item.question && (
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', maxWdith: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.question}
                      </div>
                    )}
                  </td>
                  <td>
                    <span style={{
                      padding: '0.2rem 0.6rem',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      background: item.difficulty === 'Hard' ? 'rgba(239, 68, 68, 0.2)' : item.difficulty === 'Medium' ? 'rgba(234, 179, 8, 0.2)' : 'rgba(34, 197, 94, 0.2)',
                      color: item.difficulty === 'Hard' ? '#f87171' : item.difficulty === 'Medium' ? '#facc15' : '#4ade80'
                    }}>
                      {item.difficulty || 'Medium'}
                    </span>
                  </td>
                  <td>
                    <span 
                      className="score-badge"
                      style={{
                        background: item.score >= 8 ? 'rgba(34, 197, 94, 0.15)' : item.score >= 5 ? 'rgba(234, 179, 8, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                        color: item.score >= 8 ? '#4ade80' : item.score >= 5 ? '#facc15' : '#f87171',
                        border: item.score >= 8 ? '1px solid rgba(34, 197, 94, 0.3)' : item.score >= 5 ? '1px solid rgba(234, 179, 8, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)'
                      }}
                    >
                      {item.score} / 10
                    </span>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.85rem', color: '#e5e7eb', maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.correctness || 'Answer evaluated'}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Clock size={12} />
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recent'}
                    </div>
                  </td>
                  <td>
                    <button 
                      className="btn-table-action"
                      onClick={() => navigate(`/history/${item.id}`)}
                    >
                      View <ChevronRight size={14} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
                  <div style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.95rem' }}>
                    No interviews yet. Complete your first technical session to see real-time scores!
                  </div>
                  <button 
                    className="btn-primary"
                    style={{ width: 'auto', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.25rem' }}
                    onClick={() => navigate('/interview')}
                  >
                    <PlayCircle size={16} /> Start Interview
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentInterviewsTable;
