import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { interviewService } from '../services/interviewService';
import { Sparkles, Play, RefreshCw, Send, AlertTriangle, BookOpen, CheckCircle2, ArrowLeft, Award, ThumbsUp, Lightbulb, History } from 'lucide-react';

const TOPICS = [
  { id: 'Java', name: 'Java', desc: 'Core Java, OOPs, Collections, Threads' },
  { id: 'Spring Boot', name: 'Spring Boot', desc: 'REST APIs, JPA, Security, Dependency Injection' },
  { id: 'React', name: 'React', desc: 'Hooks, State Management, Virtual DOM, Components' },
  { id: 'SQL', name: 'SQL', desc: 'Queries, Joins, Indexes, Transactions, Schema Design' },
  { id: 'DSA', name: 'DSA', desc: 'Arrays, Trees, Graphs, Dynamic Programming, Sorting' },
];

const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

const InterviewPage = () => {
  const navigate = useNavigate();

  const [selectedTopic, setSelectedTopic] = useState('Java');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Medium');
  
  // UI Status: 'IDLE' | 'LOADING_QUESTION' | 'ACTIVE' | 'EVALUATING' | 'EVALUATED' | 'ERROR'
  const [status, setStatus] = useState('IDLE');
  const [questionData, setQuestionData] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [evaluationData, setEvaluationData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // 1. Generate AI Technical Question
  const handleStartInterview = async () => {
    setStatus('LOADING_QUESTION');
    setErrorMessage('');
    setQuestionData(null);
    setUserAnswer('');
    setEvaluationData(null);

    try {
      const data = await interviewService.generateQuestion(selectedTopic, selectedDifficulty);
      if (!data || !data.question || data.question.trim() === '') {
        throw new Error('Received empty question from backend. Please try again.');
      }
      setQuestionData(data);
      setStatus('ACTIVE');
    } catch (err) {
      console.error('Failed to generate interview question:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setErrorMessage(err.response.data.message);
      } else if (err.message) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Failed to connect to AI server. Please check your connection and try again.');
      }
      setStatus('ERROR');
    }
  };

  // 2. Submit Answer for AI Evaluation & MySQL Saving
  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    if (!userAnswer.trim() || !questionData) return;

    setStatus('EVALUATING');
    setErrorMessage('');

    try {
      const evaluation = await interviewService.evaluateAnswer(
        questionData.question,
        userAnswer,
        questionData.topic,
        questionData.difficulty || selectedDifficulty
      );
      setEvaluationData(evaluation);
      setStatus('EVALUATED');
    } catch (err) {
      console.error('Failed to evaluate interview answer:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setErrorMessage(err.response.data.message);
      } else if (err.message) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Failed to submit answer for AI evaluation. Please try again.');
      }
      setStatus('ERROR');
    }
  };

  const handleStartNewQuestion = () => {
    setStatus('IDLE');
    setQuestionData(null);
    setUserAnswer('');
    setEvaluationData(null);
  };

  const getScoreColor = (score) => {
    if (score >= 8) return { bg: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.4)', text: '#4ade80' };
    if (score >= 5) return { bg: 'rgba(234, 179, 8, 0.15)', border: 'rgba(234, 179, 8, 0.4)', text: '#facc15' };
    return { bg: 'rgba(239, 68, 68, 0.15)', border: 'rgba(239, 68, 68, 0.4)', text: '#f87171' };
  };

  return (
    <div className="interview-page-container">
      {/* Page Header */}
      <div className="interview-page-header">
        <div>
          <h1 className="dashboard-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Sparkles color="#8b5cf6" size={32} />
            AI Mock Technical Interview
          </h1>
          <p className="dashboard-subtitle">
            Practice technical questions and receive real-time AI scoring, feedback & sample answers.
          </p>
        </div>

        {(status === 'ACTIVE' || status === 'EVALUATED') && (
          <button className="btn-secondary-action" onClick={handleStartNewQuestion}>
            <RefreshCw size={16} /> New Question
          </button>
        )}
      </div>

      {/* STATE 1: IDLE SETUP */}
      {status === 'IDLE' && (
        <div className="interview-setup-card">
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', color: '#fff' }}>
            Select Your Practice Domain & Difficulty
          </h3>

          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label style={{ fontSize: '0.95rem', fontWeight: 600, color: '#e5e7eb', marginBottom: '0.875rem' }}>
              Choose Interview Topic
            </label>
            <div className="topic-select-grid">
              {TOPICS.map((topic) => (
                <div
                  key={topic.id}
                  className={`topic-select-card ${selectedTopic === topic.id ? 'active' : ''}`}
                  onClick={() => setSelectedTopic(topic.id)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span className="topic-card-title">{topic.name}</span>
                    <BookOpen size={18} color={selectedTopic === topic.id ? '#6366f1' : '#9ca3af'} />
                  </div>
                  <span className="topic-card-desc">{topic.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '2.5rem' }}>
            <label style={{ fontSize: '0.95rem', fontWeight: 600, color: '#e5e7eb', marginBottom: '0.875rem' }}>
              Choose Difficulty Level
            </label>
            <div className="difficulty-pills-row">
              {DIFFICULTIES.map((diff) => (
                <button
                  key={diff}
                  type="button"
                  className={`difficulty-pill ${selectedDifficulty === diff ? 'active' : ''}`}
                  onClick={() => setSelectedDifficulty(diff)}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          <button className="btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }} onClick={handleStartInterview}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <Play size={20} /> Start AI Mock Interview
            </span>
          </button>
        </div>
      )}

      {/* STATE 2: LOADING QUESTION OR EVALUATING ANSWER */}
      {(status === 'LOADING_QUESTION' || status === 'EVALUATING') && (
        <div className="interview-loading-card">
          <div className="spinner-glow" />
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
            {status === 'EVALUATING' ? 'AI is Evaluating & Saving Your Answer...' : 'Generating Your AI Question...'}
          </h3>
          <p style={{ color: 'var(--text-muted)' }}>
            {status === 'EVALUATING'
              ? 'Evaluating answer accuracy and persisting results to your database history.'
              : `Analyzing technical topic ${selectedTopic} at ${selectedDifficulty} level.`}
          </p>
        </div>
      )}

      {/* STATE 3: ERROR STATE */}
      {status === 'ERROR' && (
        <div className="interview-error-card">
          <AlertTriangle size={48} color="#f87171" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
            Operation Failed
          </h3>
          <p style={{ color: '#fca5a5', marginBottom: '1.5rem', textAlign: 'center', maxWidth: '500px' }}>
            {errorMessage || 'An error occurred while processing your request.'}
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn-primary" style={{ width: 'auto', padding: '0.75rem 1.5rem' }} onClick={handleStartInterview}>
              <RefreshCw size={16} /> Retry Request
            </button>
            <button className="btn-secondary-action" onClick={handleStartNewQuestion}>
              Change Topic
            </button>
          </div>
        </div>
      )}

      {/* STATE 4: ACTIVE INTERVIEW */}
      {status === 'ACTIVE' && questionData && (
        <div className="interview-active-container">
          <div className="question-meta-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span className="meta-badge-topic">{questionData.topic}</span>
              <span className="meta-badge-difficulty">{questionData.difficulty}</span>
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Sparkles size={14} color="#8b5cf6" /> AI Question
            </span>
          </div>

          <div className="question-prompt-card">
            <div className="question-label">
              <BookOpen size={18} color="#8b5cf6" />
              <span>Technical Question</span>
            </div>
            <h2 className="question-text">{questionData.question}</h2>
          </div>

          <form onSubmit={handleSubmitAnswer} className="answer-form-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <label style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
                Your Answer
              </label>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {userAnswer.length} characters
              </span>
            </div>

            <textarea
              className="answer-textarea"
              rows={8}
              placeholder="Type your technical explanation here..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              required
            />

            <div style={{ marginTop: '1.25rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button type="button" className="btn-secondary-action" onClick={handleStartInterview}>
                Skip / Next Question
              </button>
              <button
                type="submit"
                className="btn-primary"
                style={{ width: 'auto', padding: '0.75rem 2rem' }}
                disabled={!userAnswer.trim()}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Send size={16} /> Submit Answer
                </span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* STATE 5: EVALUATED STATE */}
      {status === 'EVALUATED' && evaluationData && questionData && (
        <div className="evaluation-results-container">
          {/* Persistence Confirmation Toast / Banner */}
          <div style={{
            background: 'rgba(34, 197, 94, 0.15)',
            border: '1px solid rgba(34, 197, 94, 0.4)',
            color: '#4ade80',
            padding: '0.85rem 1.25rem',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            fontSize: '0.9rem',
            fontWeight: 600
          }}>
            <CheckCircle2 size={18} /> Interview result saved successfully to history.
          </div>

          {/* Question Summary Bar */}
          <div className="question-prompt-card" style={{ padding: '1.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#818cf8', fontWeight: 700, textTransform: 'uppercase' }}>
              {questionData.topic} ({questionData.difficulty})
            </span>
            <h3 style={{ fontSize: '1.15rem', color: '#fff', marginTop: '0.4rem', marginBottom: 0 }}>
              {questionData.question}
            </h3>
          </div>

          {/* Score Header Card */}
          <div className="evaluation-score-card">
            <div className="score-badge-circle" style={{
              background: getScoreColor(evaluationData.score).bg,
              border: `2px solid ${getScoreColor(evaluationData.score).border}`,
              color: getScoreColor(evaluationData.score).text
            }}>
              <Award size={36} />
              <div className="score-number">{evaluationData.score} <span style={{ fontSize: '1.2rem', opacity: 0.7 }}>/ 10</span></div>
            </div>

            <div className="score-summary-text">
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#fff', marginBottom: '0.4rem' }}>
                AI Evaluation Result
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0, lineHeight: 1.5 }}>
                {evaluationData.correctness}
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
                {evaluationData.strengths && evaluationData.strengths.map((str, idx) => (
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
                {evaluationData.improvements && evaluationData.improvements.map((imp, idx) => (
                  <li key={idx}><span className="bullet-icon">•</span> {imp}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Ideal Answer Box */}
          <div className="ideal-answer-card">
            <div className="ideal-header">
              <Sparkles size={20} color="#8b5cf6" />
              <span>Model Ideal Answer</span>
            </div>
            <p className="ideal-text">{evaluationData.idealAnswer}</p>
          </div>

          {/* Action Controls */}
          <div className="evaluation-actions">
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn-secondary-action" onClick={() => navigate('/dashboard')}>
                <ArrowLeft size={16} /> Dashboard
              </button>
              <button className="btn-secondary-action" onClick={() => navigate('/history')}>
                <History size={16} /> View All History
              </button>
            </div>
            <button className="btn-primary" style={{ width: 'auto', padding: '0.75rem 2rem' }} onClick={handleStartInterview}>
              <RefreshCw size={16} /> Try Another Question
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewPage;
